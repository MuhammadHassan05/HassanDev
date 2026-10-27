/**
 * Copies reviewed screenshots from screenshots-pending/ into public/projects/,
 * the only folder the site serves them from. Run it only for images Hassan
 * has approved on the contact sheet.
 *
 * Usage: npm run screenshots:approve -- pikzels yetti-ai
 *
 * Refuses keys that are not capture targets, captures that failed the quality
 * gate, and images that are missing from screenshots-pending/.
 */
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { screenshotTargets } from "../src/content/screenshots.config.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PENDING_DIR = join(ROOT, "screenshots-pending");
const PUBLIC_DIR = join(ROOT, "public", "projects");
const RESULTS_FILE = join(ROOT, "screenshots-review", "results.json");

const keys = process.argv.slice(2);
if (keys.length === 0) {
  throw new Error("Name the approved project keys, e.g. npm run screenshots:approve -- pikzels");
}

const results = JSON.parse(await readFile(RESULTS_FILE, "utf8"));
const problems = keys.flatMap((key) => {
  if (!screenshotTargets.some((t) => t.project === key)) return [`${key}: not a capture target`];
  const result = results.find((r) => r.project === key);
  if (!result?.passed) return [`${key}: did not pass the quality gate`];
  return [];
});
// Check everything before copying anything, so a typo never leaves a half-applied approval.
if (problems.length > 0) {
  throw new Error(`Nothing copied:\n  ${problems.join("\n  ")}`);
}

await mkdir(PUBLIC_DIR, { recursive: true });
for (const key of keys) {
  await copyFile(join(PENDING_DIR, `${key}.webp`), join(PUBLIC_DIR, `${key}.webp`));
  process.stdout.write(`approved ${key} -> public/projects/${key}.webp\n`);
}
