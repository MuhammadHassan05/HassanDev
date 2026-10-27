/**
 * Captures screenshots of the live project sites listed in
 * src/content/screenshots.config.ts, checks each one, and writes a contact
 * sheet (screenshots-review.html) for manual review.
 *
 * This is a local tool. It is never run in CI or the deploy workflow: images
 * are captured here, reviewed by Hassan, and committed, so the site build
 * never depends on other people's websites being up.
 *
 * Usage:
 *   npm run screenshots              capture every target
 *   npm run screenshots -- pikzels   capture only the listed project keys (retakes)
 *   npm run screenshots -- --sheet-only   rebuild the contact sheet without capturing
 *
 * Nothing this script writes can ship: passing captures go to
 * screenshots-pending/ and rejected ones to screenshots-review/, both
 * gitignored and outside public/. Only `npm run screenshots:approve -- <key>`
 * (scripts/approve-screenshots.mjs) copies a reviewed image into public/projects/.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { screenshotTargets } from "../src/content/screenshots.config.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PENDING_DIR = join(ROOT, "screenshots-pending");
const REVIEW_DIR = join(ROOT, "screenshots-review");
const REVIEW_HTML = join(ROOT, "screenshots-review.html");
const RESULTS_FILE = join(REVIEW_DIR, "results.json");

const VIEWPORT = { width: 1440, height: 900 };
const DEVICE_SCALE = 2;
/** Tallest capture, in CSS pixels; enough for the card's scrolling preview. */
const MAX_HEIGHT = 2400;
const SETTLE_MS = 1500;
const NAVIGATION_TIMEOUT_MS = 45_000;
const IDLE_TIMEOUT_MS = 20_000;

/** Consent buttons on the common cookie banner platforms. */
const CONSENT_SELECTORS = [
  "#onetrust-accept-btn-handler",
  "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
  "#CybotCookiebotDialogBodyButtonAccept",
  ".cky-btn-accept",
  "[data-cky-tag='accept-button']",
  ".cc-allow",
  ".cc-accept",
  "#hs-eu-confirmation-button",
  ".iubenda-cs-accept-btn",
  "#truste-consent-button",
];

/**
 * Exact button labels treated as "accept cookies". Matching whole labels only
 * means the script never clicks anything that submits a form or logs in.
 */
const CONSENT_LABEL =
  /^(accept|accept all|accept all cookies|accept cookies|allow all|allow all cookies|allow cookies|agree|i agree|i accept|got it|ok|okay)$/i;

/** Overlays that never belong in a portfolio screenshot. */
const HIDE_SELECTORS = [
  // Cookie banners that survived the click, or have no accept button.
  "#onetrust-consent-sdk",
  "#CybotCookiebotDialog",
  ".cky-consent-container",
  ".cc-window",
  "#hs-eu-cookie-confirmation",
  "[id*='cookie-banner' i]",
  "[class*='cookie-banner' i]",
  "[id*='cookieconsent' i]",
  "[class*='cookieconsent' i]",
  "[class*='cookiealert' i]",
  // Chat widgets.
  "#intercom-container",
  ".intercom-lightweight-app",
  "#hubspot-messages-iframe-container",
  ".crisp-client",
  "#crisp-chatbox",
  "#tidio-chat",
  "[id^='tidio' i]",
  "#drift-widget",
  ".drift-frame-controller",
  "#launcher",
  "[id*='tawk' i]",
  "iframe[title*='chat' i]",
  "iframe[src*='chat' i]",
  // Popups and newsletter modals.
  "[role='dialog'][aria-modal='true']",
  "[class*='newsletter-popup' i]",
  "[class*='modal-backdrop' i]",
];

/**
 * Checks on the page text. Each one rejects pages that would put the wrong
 * thing on a project card.
 */
const PAGE_PROBLEMS = [
  { pattern: /\b404\b|page not found|not found/i, where: "headings", reason: "shows a 404 page" },
  {
    pattern: /coming soon|launching soon|under construction/i,
    where: "headings",
    reason: 'shows a "coming soon" page',
  },
  {
    pattern: /maintenance|be right back|temporarily unavailable/i,
    where: "headings",
    reason: "shows a maintenance page",
  },
  {
    pattern: /domain (is )?for sale|buy this domain|parked (free|domain)/i,
    where: "text",
    reason: "looks like a parked domain",
  },
];

/** Escapes text for the contact sheet; page titles are untrusted. */
function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

/** Writes a progress line; the project's lint rules forbid console. */
function log(line) {
  process.stdout.write(`${line}\n`);
}

/**
 * Clicks a cookie consent button if one is showing. Only buttons whose whole
 * label is an accept phrase are clicked; nothing is ever typed.
 *
 * @param {import("playwright").Page} page
 * @returns {Promise<string | null>} What was clicked, for the notes.
 */
async function dismissCookieBanner(page) {
  for (const selector of CONSENT_SELECTORS) {
    const button = page.locator(selector).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 3000 }).catch(() => {});
      return selector;
    }
  }
  const byLabel = page.getByRole("button", { name: CONSENT_LABEL }).first();
  if (await byLabel.isVisible().catch(() => false)) {
    const label = (await byLabel.innerText().catch(() => "")).trim();
    await byLabel.click({ timeout: 3000 }).catch(() => {});
    return `button "${label}"`;
  }
  return null;
}

/**
 * Scrolls through the part of the page that will be captured, so lazy-loaded
 * images are fetched, then returns to the top.
 *
 * @param {import("playwright").Page} page
 */
async function loadLazyContent(page) {
  for (let y = 0; y <= MAX_HEIGHT + VIEWPORT.height; y += VIEWPORT.height / 2) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

/**
 * Pauses every video and rewinds it to the start. Without this a capture
 * shows whatever frame the video reached, which differs on every run.
 *
 * @param {import("playwright").Page} page
 */
async function rewindVideos(page) {
  await page.evaluate(() =>
    Promise.all(
      [...document.querySelectorAll("video")].map(
        (video) =>
          new Promise((resolve) => {
            video.pause();
            if (video.currentTime === 0) return resolve();
            video.addEventListener("seeked", resolve, { once: true });
            video.currentTime = 0;
            // Some streams never fire "seeked"; do not let one hang the capture.
            setTimeout(resolve, 3000);
          }),
      ),
    ),
  );
}

/**
 * Reads what the quality gate needs from the page.
 *
 * @param {import("playwright").Page} page
 */
async function readPage(page) {
  return page.evaluate(() => {
    const visible = (el) => el.getClientRects().length > 0;
    const textOf = (selector) =>
      [...document.querySelectorAll(selector)]
        .filter(visible)
        .map((el) => el.innerText.trim())
        .filter(Boolean);
    return {
      title: document.title,
      h1: textOf("h1"),
      headings: textOf("h1, h2"),
      hasPassword: [...document.querySelectorAll("input[type='password']")].some(visible),
      text: document.body.innerText.slice(0, 5000),
      scrollHeight: document.documentElement.scrollHeight,
    };
  });
}

/**
 * Applies the quality gate to the page contents.
 *
 * @returns {string[]} Rejection reasons; empty when the page is fine.
 */
function checkPage(target, info) {
  const reasons = [];
  const keyword = target.expectedKeyword.toLowerCase();
  const inTitleOrHeading = [info.title, ...info.h1].some((t) => t.toLowerCase().includes(keyword));
  if (!inTitleOrHeading) {
    reasons.push(`expected "${target.expectedKeyword}" in the title or main heading`);
  }

  const headings = [info.title, ...info.headings].join("\n");
  for (const { pattern, where, reason } of PAGE_PROBLEMS) {
    if (pattern.test(where === "headings" ? headings : info.text)) {
      reasons.push(reason);
    }
  }

  // A visible password field on a near-empty page, or a sign-in heading, is a login wall.
  const signInHeading = /\b(log ?in|sign ?in)\b/i.test(headings);
  if (info.hasPassword && (signInHeading || info.text.length < 800)) {
    reasons.push("shows a login wall");
  }
  return reasons;
}

/**
 * Measures how blank an image is: the share of pixels close to the most
 * common grey level, on a small greyscale copy.
 *
 * @param {Buffer} png
 * @returns {Promise<{ blank: boolean, dominantShare: number, stdev: number }>}
 */
async function measureBlankness(png) {
  const { data } = await sharp(png)
    .resize({ width: 96 })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const histogram = new Array(256).fill(0);
  let sum = 0;
  for (const value of data) {
    histogram[value] += 1;
    sum += value;
  }
  const mode = histogram.indexOf(Math.max(...histogram));
  let near = 0;
  let squares = 0;
  const mean = sum / data.length;
  for (const value of data) {
    if (Math.abs(value - mode) <= 10) near += 1;
    squares += (value - mean) ** 2;
  }
  const dominantShare = near / data.length;
  const stdev = Math.sqrt(squares / data.length);
  return { blank: dominantShare > 0.95 || stdev < 6, dominantShare, stdev };
}

/**
 * Captures and checks one target.
 *
 * @param {import("playwright").Browser} browser
 * @param {import("../src/content/screenshots.config.ts").ScreenshotTarget} target
 */
async function capture(browser, target) {
  const result = {
    project: target.project,
    url: target.url,
    finalUrl: null,
    status: null,
    title: null,
    passed: false,
    reasons: [],
    notes: [],
    size: null,
    capturedAt: new Date().toISOString(),
  };

  // A new context has no cookies or storage: every capture is a logged-out first visit.
  // bypassCSP lets the hiding stylesheet load on sites with a strict policy.
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
    bypassCSP: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();

  try {
    let response;
    try {
      response = await page.goto(target.url, { waitUntil: "load", timeout: NAVIGATION_TIMEOUT_MS });
    } catch (error) {
      result.reasons.push(`could not load the page (${String(error.message).split("\n")[0]})`);
      return result;
    }
    result.finalUrl = page.url();
    result.status = response?.status() ?? null;
    if (result.status === null || result.status < 200 || result.status > 299) {
      result.reasons.push(`HTTP status ${result.status ?? "unknown"}, expected 2xx`);
    }

    // Analytics and live chat can keep connections open forever, so "idle" is capped.
    await page.waitForLoadState("networkidle", { timeout: IDLE_TIMEOUT_MS }).catch(() => {
      result.notes.push(`network did not go idle within ${IDLE_TIMEOUT_MS / 1000} s`);
    });

    const clicked = await dismissCookieBanner(page);
    if (clicked) result.notes.push(`dismissed cookie banner via ${clicked}`);
    await page.keyboard.press("Escape");

    const hide = [...HIDE_SELECTORS, ...(target.hideSelectors ?? [])];
    await page.addStyleTag({
      content: `${hide.join(",\n")} { display: none !important; }
        html, body { overflow: auto !important; }`,
    });

    await loadLazyContent(page);
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(SETTLE_MS);
    await rewindVideos(page);

    const info = await readPage(page);
    result.title = info.title;
    result.reasons.push(...checkPage(target, info));

    const height = Math.min(info.scrollHeight, MAX_HEIGHT);
    const png = await page.screenshot({
      fullPage: true,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height },
      animations: "disabled",
    });

    const blankness = await measureBlankness(png);
    if (blankness.blank) {
      result.reasons.push(
        `image is mostly blank (${Math.round(blankness.dominantShare * 100)}% one tone)`,
      );
    }

    // sharp drops all metadata (EXIF, ICC, XMP) unless told to keep it.
    const webp = await sharp(png)
      .resize({ width: VIEWPORT.width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true });

    result.passed = result.reasons.length === 0;
    await writeFile(join(ROOT, imagePath(result)), webp.data);
    result.size = { width: webp.info.width, height: webp.info.height, bytes: webp.data.length };
    return result;
  } finally {
    await context.close();
  }
}

/**
 * Where a capture is stored, relative to the repo root: pending review when it
 * passed the gate, the rejects folder when it did not.
 *
 * @param {{ project: string, passed: boolean }} result
 * @returns {string}
 */
function imagePath(result) {
  return `${result.passed ? "screenshots-pending" : "screenshots-review"}/${result.project}.webp`;
}

/**
 * Builds the contact sheet. Images sit in scrollable frames so each full
 * capture can be checked top to bottom.
 *
 * @param {object[]} results
 */
function renderReview(results) {
  const cards = results
    .map((r) => {
      const verdict = r.passed ? "PASS" : "FAIL";
      const reasons = r.reasons.length
        ? `<ul class="reasons">${r.reasons.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
        : "";
      const notes = r.notes.length
        ? `<ul class="notes">${r.notes.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
        : "";
      const image = r.size
        ? `<div class="shot"><img src="${escapeHtml(imagePath(r))}" alt="Capture of ${escapeHtml(r.url)}" width="${r.size.width}" height="${r.size.height}"></div>`
        : `<div class="shot empty">No image: the page could not be captured.</div>`;
      const meta = [
        r.status !== null ? `HTTP ${r.status}` : null,
        // A browser adds "/" to bare domains; only a real change of address is a redirect.
        r.finalUrl && r.finalUrl.replace(/\/$/, "") !== r.url.replace(/\/$/, "")
          ? `redirected to ${escapeHtml(r.finalUrl)}`
          : null,
        r.size ? `${r.size.width}×${r.size.height}, ${Math.round(r.size.bytes / 1024)} KB` : null,
      ]
        .filter(Boolean)
        .join(" · ");
      return `<article class="${verdict.toLowerCase()}">
  <header><span class="verdict">${verdict}</span><h2>${escapeHtml(r.project)}</h2></header>
  <p class="url">${escapeHtml(r.url)}</p>
  <p class="meta">${meta}</p>
  ${r.title ? `<p class="meta">Title: ${escapeHtml(r.title)}</p>` : ""}
  ${reasons}${notes}${image}
  <p class="meta">Captured ${escapeHtml(r.capturedAt)}</p>
</article>`;
    })
    .join("\n");

  const passed = results.filter((r) => r.passed).length;
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Screenshot review</title>
<style>
  body { margin: 0; padding: 24px; background: #070a10; color: #f1f5f9; font: 15px/1.5 system-ui, sans-serif; }
  h1 { margin: 0 0 4px; font-size: 24px; }
  .summary { margin: 0 0 24px; color: #a9b4c2; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(440px, 100%), 1fr)); gap: 20px; }
  article { border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; padding: 16px; background: rgba(255,255,255,0.04); }
  article.fail { border-color: #f87171; }
  header { display: flex; align-items: center; gap: 10px; }
  h2 { margin: 0; font-size: 18px; }
  .verdict { font: 600 12px ui-monospace, monospace; padding: 3px 8px; border-radius: 999px; background: #4ade80; color: #06210f; }
  .fail .verdict { background: #f87171; color: #2a0505; }
  .url, .meta { margin: 6px 0 0; font: 12px ui-monospace, monospace; color: #a9b4c2; word-break: break-all; }
  .reasons { margin: 10px 0 0; padding-left: 18px; color: #fca5a5; }
  .notes { margin: 6px 0 0; padding-left: 18px; color: #a9b4c2; font-size: 13px; }
  .shot { margin-top: 12px; height: 520px; overflow: auto; border-radius: 10px; background: #0e141c; }
  .shot img { display: block; width: 100%; height: auto; }
  .shot.empty { display: grid; place-items: center; color: #a9b4c2; }
</style>
<h1>Screenshot review</h1>
<p class="summary">${passed} of ${results.length} passed the quality gate. Scroll inside each frame to see the whole capture. Nothing is used on the site until approved.</p>
<div class="grid">
${cards}
</div>
</html>
`;
}

/** Loads results from earlier runs, so a retake of one project keeps the others on the sheet. */
async function loadPreviousResults() {
  try {
    return JSON.parse(await readFile(RESULTS_FILE, "utf8"));
  } catch {
    return [];
  }
}

const args = process.argv.slice(2);
const sheetOnly = args.includes("--sheet-only");
const only = args.filter((arg) => !arg.startsWith("--"));
const unknown = only.filter((key) => !screenshotTargets.some((t) => t.project === key));
if (unknown.length > 0) {
  throw new Error(`Unknown project key(s): ${unknown.join(", ")}`);
}
const targets = only.length
  ? screenshotTargets.filter((t) => only.includes(t.project))
  : screenshotTargets;

await mkdir(PENDING_DIR, { recursive: true });
await mkdir(REVIEW_DIR, { recursive: true });

const fresh = [];
if (!sheetOnly) {
  // The installed Chrome is used, so no separate browser download is needed.
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    for (const target of targets) {
      log(`capturing ${target.project} (${target.url})`);
      const result = await capture(browser, target);
      log(`  ${result.passed ? "PASS" : `FAIL: ${result.reasons.join("; ")}`}`);
      fresh.push(result);
    }
  } finally {
    await browser.close();
  }
}

const previous = await loadPreviousResults();
const merged = screenshotTargets
  .map(
    (t) =>
      fresh.find((r) => r.project === t.project) ?? previous.find((r) => r.project === t.project),
  )
  .filter(Boolean);
await writeFile(RESULTS_FILE, `${JSON.stringify(merged, null, 2)}\n`);
await writeFile(REVIEW_HTML, renderReview(merged));
log(`\n${merged.filter((r) => r.passed).length}/${merged.length} passed. Review: ${REVIEW_HTML}`);
