/**
 * Generates the share image and the icons from the built site, so they use
 * the site's own self-hosted Inter and its colour tokens (flat, light mode,
 * burgundy accent):
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

/**
 * Reads the text and colours for the images from the built page, which was
 * rendered from src/content and src/styles/globals.css, so nothing is
 * duplicated here. Colours are the light-mode tokens.
 *
 * @param page - Playwright page showing the built engineer page.
 */
async function readPage(page) {
  const found = await page.evaluate(() => {
    const nameParts = [...document.querySelectorAll("h1 > span")].map((s) => s.textContent?.trim());
    const token = (name) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return {
      name: nameParts.join(" "),
      initial: nameParts[0]?.charAt(0),
      // The job title from the page's structured data (src/lib/seo.ts).
      role: JSON.parse(
        document.querySelector('script[type="application/ld+json"]')?.textContent ?? "{}",
      ).jobTitle,
      // The hero's first line under the name.
      lead: document.querySelector("main h1 + div p")?.textContent?.trim(),
      bg: token("--bg"),
      text: token("--text"),
      text2: token("--text-2"),
      line: token("--line"),
      accent: token("--burgundy"),
      onAccent: token("--on-accent"),
    };
  });
  for (const [key, value] of Object.entries(found)) {
    if (!value)
      throw new Error(`Could not read ${key} from the built page; has the markup changed?`);
  }
  return found;
}

/** The share card: role, name and lead line in Inter on the flat page colour. */
function shareCard(p) {
  return `
<div style="position:fixed;inset:0;background:${p.bg};font-family:var(--font-inter);display:flex;flex-direction:column;justify-content:center;padding:0 96px;gap:28px">
  <div style="font-size:30px;font-weight:500;color:${p.accent}">${esc(p.role)}</div>
  <div style="font-size:112px;font-weight:600;line-height:1;letter-spacing:-0.035em;color:${p.text}">${esc(p.name)}</div>
  <div style="max-width:960px;font-size:34px;line-height:1.35;color:${p.text2}">${esc(p.lead)}</div>
  <div style="position:absolute;left:96px;right:96px;bottom:72px;border-top:2px solid ${p.line}"></div>
</div>`;
}

/**
 * The icon: the first initial of the name in Inter, white on the flat
 * burgundy accent.
 *
 * @param p - Colours and copy from readPage().
 * @param size - Edge length in pixels.
 * @param rounded - Rounded corners for the favicon; iOS rounds the touch icon itself.
 */
function iconCard(p, size, rounded) {
  return `
<div style="position:fixed;left:0;top:0;width:${size}px;height:${size}px;border-radius:${rounded ? Math.round(size * 0.22) : 0}px;background:${p.accent};display:flex;align-items:center;justify-content:center;font-family:var(--font-inter);font-weight:600;font-size:${Math.round(size * 0.6)}px;line-height:1;letter-spacing:-0.03em;color:${p.onAccent}">${esc(p.initial)}</div>`;
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
  const found = await readPage(page);
  await render(page, shareCard(found), { width: 1200, height: 630 }, "public/og.png");
  await render(
    page,
    iconCard(found, 512, true),
    { width: 512, height: 512 },
    "src/app/icon.png",
    true,
  );
  await render(
    page,
    iconCard(found, 180, false),
    { width: 180, height: 180 },
    "src/app/apple-icon.png",
  );
} finally {
  await browser.close();
  server.close();
}
