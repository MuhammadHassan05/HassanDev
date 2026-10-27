/**
 * Fails when source code uses an API that CLAUDE.md bans for security
 * reasons. ESLint covers these too; this plain text scan is a second line of
 * defence that an eslint-disable comment cannot switch off.
 *
 * Usage: node scripts/check-forbidden.mjs [directory]   (defaults to src)
 */
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

/** Patterns that must never appear, with the reason shown when one does. */
const FORBIDDEN = [
  { pattern: /dangerouslySetInnerHTML/, reason: "renders raw HTML and bypasses React's escaping" },
  { pattern: /\beval\s*\(/, reason: "executes strings as code" },
  { pattern: /\bnew\s+Function\b/, reason: "executes strings as code" },
];

const SCANNED_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts"]);

/**
 * Lists every scannable file under a directory, recursively.
 *
 * @param {string} dir - Directory to walk.
 * @returns {Promise<string[]>} File paths.
 */
async function listSourceFiles(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && SCANNED_EXTENSIONS.has(extname(entry.name)))
    .map((entry) => join(entry.parentPath, entry.name));
}

/**
 * Finds forbidden patterns in a piece of source text.
 *
 * @param {string} text - File contents.
 * @returns {{ line: number, match: string, reason: string }[]} One entry per hit.
 */
function findForbidden(text) {
  const hits = [];
  text.split(/\r?\n/).forEach((lineText, index) => {
    for (const { pattern, reason } of FORBIDDEN) {
      const found = lineText.match(pattern);
      if (found) {
        hits.push({ line: index + 1, match: found[0], reason });
      }
    }
  });
  return hits;
}

const root = process.argv[2] ?? "src";
const files = await listSourceFiles(root);
let total = 0;

for (const file of files) {
  for (const hit of findForbidden(await readFile(file, "utf8"))) {
    total += 1;
    process.stderr.write(
      `${relative(process.cwd(), file)}:${hit.line}  "${hit.match}" is forbidden: ${hit.reason}\n`,
    );
  }
}

process.stdout.write(`check-forbidden: scanned ${files.length} files in ${root}, ${total} hits\n`);
process.exitCode = total > 0 ? 1 : 0;
