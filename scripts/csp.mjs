/**
 * Adds a Content Security Policy to every page of the static export.
 *
 * GitHub Pages cannot send HTTP headers, so the policy goes in a
 * <meta http-equiv="Content-Security-Policy"> tag instead. Next.js inlines a
 * few bootstrap scripts into each page (they differ per page), so this script
 * hashes every inline <script> in each HTML file and allows exactly those
 * hashes; any other inline script, including an injected one, is blocked.
 *
 * Runs after `next build` (see the "build" script in package.json).
 * Usage: node scripts/csp.mjs [exportDir]   (defaults to out)
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const OUT_DIR = process.argv[2] ?? "out";

/** Matches a whole <script> element; group 1 is its attributes, group 2 its body. */
const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
/** Any CSP meta tag already in the page, so reruns replace rather than duplicate it. */
const EXISTING_CSP = /<meta http-equiv="Content-Security-Policy"[^>]*>/gi;
/** The charset meta must stay first; the policy goes straight after it. */
const CHARSET = /<meta charSet="utf-8"\s*\/?>/i;

/**
 * Builds the policy for one page.
 *
 * style-src keeps 'unsafe-inline' because React writes style attributes for
 * per-element values (the slider's clip position, confetti sizes and timings),
 * and Next.js inlines font-face styles. Hashes cannot cover style attributes.
 * The risk is low here: the site is fully static with no user-generated
 * content, so there is no way to inject markup, and inline styles cannot run
 * code; script-src, which is what matters against XSS, has no 'unsafe-inline'.
 *
 * @param {string[]} hashes - SHA-256 sources for the page's inline scripts.
 * @returns {string} The policy.
 */
function buildPolicy(hashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${hashes.map((hash) => `'${hash}'`).join(" ")}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/**
 * Hashes the inline scripts in a page. Scripts with a src are covered by
 * 'self'. The hash is over the exact text between the tags, as the browser
 * computes it.
 *
 * @param {string} html - The page.
 * @returns {string[]} Unique "sha256-…" sources, in page order.
 */
function inlineScriptHashes(html) {
  const hashes = [];
  for (const [, attributes, body] of html.matchAll(SCRIPT)) {
    if (/\ssrc\s*=/i.test(attributes)) continue;
    const hash = `sha256-${createHash("sha256").update(body, "utf8").digest("base64")}`;
    if (!hashes.includes(hash)) hashes.push(hash);
  }
  return hashes;
}

/**
 * Writes the policy into one page.
 *
 * @param {string} file - Path to an HTML file.
 * @returns {Promise<number>} How many inline script hashes were allowed.
 */
async function protect(file) {
  const original = await readFile(file, "utf8");
  const html = original.replace(EXISTING_CSP, "");
  const hashes = inlineScriptHashes(html);
  const meta = `<meta http-equiv="Content-Security-Policy" content="${buildPolicy(hashes)}"/>`;
  if (!CHARSET.test(html)) {
    throw new Error(`${file}: no <meta charSet="utf-8"> to place the policy after`);
  }
  // A function replacement, so "$" in the policy is never read as a pattern.
  await writeFile(
    file,
    html.replace(CHARSET, (charset) => `${charset}${meta}`),
  );
  return hashes.length;
}

/** Lists every .html file under a directory. */
async function htmlFiles(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));
}

const files = await htmlFiles(OUT_DIR);
if (files.length === 0) {
  throw new Error(`No HTML files in ${OUT_DIR}/: run next build first.`);
}
for (const file of files) {
  const count = await protect(file);
  process.stdout.write(`csp: ${relative(process.cwd(), file)} (${count} inline script hashes)\n`);
}
