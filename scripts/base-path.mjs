/**
 * Shared by the build helper scripts: reads the site's base path from
 * src/lib/site.ts, its single source of truth, so no script hard-codes it.
 */
import { readFileSync } from "node:fs";

/**
 * Reads BASE_PATH from src/lib/site.ts. The file is read as text because
 * plain Node cannot import TypeScript on every version this project supports.
 *
 * @returns The base path, e.g. "/HassanDev".
 */
export function readBasePath() {
  const source = readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
  const match = source.match(/export const BASE_PATH = "([^"]*)";/);
  if (!match) {
    throw new Error("scripts/base-path.mjs: could not find BASE_PATH in src/lib/site.ts");
  }
  return match[1];
}
