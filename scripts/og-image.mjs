/**
 * Generates the share image and the icons from the built site, so they use
 * the site's own self-hosted fonts and colors:
 *   public/og.png          1200x630 Open Graph / Twitter image
 *   src/app/icon.png       512x512 favicon (Next.js adds the <link> tags)
 *   src/app/apple-icon.png 180x180 apple-touch-icon
 *
 * A local tool, like the screenshot script: run `npm run build` first, then
 * `npm run og-image`, check the images, and commit them. The site build never
 * runs this, so it does not depend on a browser.
 */
import { createServer } from "node:http";
import { readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { readBasePath } from "./base-path.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = join(ROOT, "out");
const BASE_PATH = readBasePath();
const PORT = 4179;

/** Design tokens used in the images (from src/styles/globals.css). */
const COLORS = { bg: "#070a10", ink: "#f1f5f9", accent: "#4ade80", glow: "#38bdf8" };

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
};

/** Serves out/ under the base path, so the built page and its fonts load as in production. */
function serveExport() {
  const server = createServer(async (req, res) => {
    const path = new URL(req.url ?? "/", "http://localhost").pathname;
    if (!path.startsWith(BASE_PATH)) return res.writeHead(404).end();
    let file = normalize(join(OUT_DIR, decodeURIComponent(path.slice(BASE_PATH.length))));
    if (!file.startsWith(OUT_DIR)) return res.writeHead(403).end();
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

/** Escapes text for the HTML templates below. */
const esc = (text) =>
  String(text).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

/** A blurred glow orb, as in the site background. */
const orb = (color, css) =>
  `<div style="position:absolute;${css};width:620px;height:620px;border-radius:999px;background:${color};filter:blur(130px);opacity:.45"></div>`;

/**
 * Reads the text for the images from the built page, which was rendered from
 * src/content, so no copy is duplicated here.
 *
 * @param page - Playwright page showing the built engineer page.
 */
async function readCopy(page) {
  const copy = await page.evaluate(() => {
    const nameParts = [...document.querySelectorAll("h1 > span")].map((s) => s.textContent?.trim());
    return {
      firstName: nameParts[0],
      lastName: nameParts[1],
      role: document.querySelector("header nav li a")?.getAttribute("aria-label"),
      logo: document.querySelector("header nav > a")?.textContent?.trim(),
    };
  });
  for (const [key, value] of Object.entries(copy)) {
    if (!value)
      throw new Error(`Could not read ${key} from the built page; has the markup changed?`);
  }
  return copy;
}

/** The share card: name and role on glass over the engineer glow. */
function shareCard({ firstName, lastName, role }) {
  return `
<div style="position:fixed;inset:0;overflow:hidden;background:${COLORS.bg};font-family:var(--font-space-grotesk)">
  ${orb(COLORS.accent, "top:-260px;left:-180px")}
  ${orb(COLORS.glow, "bottom:-300px;right:-160px")}
  <div style="position:absolute;inset:56px;border-radius:28px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px);display:flex;flex-direction:column;justify-content:center;padding:0 80px;gap:10px">
    <div style="font-family:var(--font-bricolage);font-weight:800;font-size:132px;line-height:.95;letter-spacing:-.045em;color:${COLORS.ink}">${esc(firstName)}</div>
    <div style="font-family:var(--font-instrument-serif);font-style:italic;font-size:164px;line-height:.9;letter-spacing:-.01em;color:${COLORS.accent}">${esc(lastName)}</div>
    <div style="margin-top:28px;font-family:var(--font-jetbrains-mono);font-size:34px;color:${COLORS.accent}">${esc(role)}</div>
  </div>
</div>`;
}

/**
 * The icon: the nav logo's initial and accent dot ("h."), on the page
 * background with a hint of the glow.
 *
 * @param logo - The nav logo text, e.g. "hassan.dev".
 * @param size - Edge length in pixels.
 * @param rounded - Rounded corners for the favicon; iOS rounds the touch icon itself.
 */
function iconCard(logo, size, rounded) {
  const initial = logo.charAt(0);
  const dot = logo.includes(".") ? "." : "";
  return `
<div style="position:fixed;left:0;top:0;width:${size}px;height:${size}px;overflow:hidden;border-radius:${rounded ? Math.round(size * 0.22) : 0}px;background:${COLORS.bg};display:flex;align-items:center;justify-content:center;font-family:var(--font-jetbrains-mono);font-weight:500;font-size:${Math.round(size * 0.62)}px;line-height:1">
  <div style="position:absolute;top:${-size * 0.35}px;left:${-size * 0.35}px;width:${size}px;height:${size}px;border-radius:999px;background:${COLORS.accent};filter:blur(${size * 0.25}px);opacity:.35"></div>
  <span style="position:relative;color:${COLORS.ink}">${esc(initial)}</span><span style="position:relative;color:${COLORS.accent}">${esc(dot)}</span>
</div>`;
}

/**
 * Renders HTML inside the built page (for its fonts) and saves a PNG.
 *
 * @param page - Playwright page showing the built site.
 * @param html - Markup to render.
 * @param size - Viewport and image size.
 * @param file - Output path.
 * @param transparent - Keep transparent corners (rounded favicon).
 */
async function render(page, html, size, file, transparent = false) {
  await page.setViewportSize(size);
  await page.evaluate(
    ({ markup, clear }) => {
      document.body.innerHTML = markup;
      if (clear)
        document.documentElement.style.background = document.body.style.background = "transparent";
      return document.fonts.ready;
    },
    { markup: html, clear: transparent },
  );
  await page.waitForTimeout(300);
  const png = await page.screenshot({ omitBackground: transparent, clip: { x: 0, y: 0, ...size } });
  const optimised = await sharp(png).png({ compressionLevel: 9, effort: 10 }).toBuffer();
  await writeFile(join(ROOT, file), optimised);
  process.stdout.write(
    `wrote ${file} (${size.width}x${size.height}, ${Math.round(optimised.length / 1024)} KB)\n`,
  );
}

const server = await serveExport();
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${PORT}${BASE_PATH}/`, { waitUntil: "networkidle" });
  const copy = await readCopy(page);
  await render(page, shareCard(copy), { width: 1200, height: 630 }, "public/og.png");
  await render(
    page,
    iconCard(copy.logo, 512, true),
    { width: 512, height: 512 },
    "src/app/icon.png",
    true,
  );
  await render(
    page,
    iconCard(copy.logo, 180, false),
    { width: 180, height: 180 },
    "src/app/apple-icon.png",
  );
} finally {
  await browser.close();
  server.close();
}
