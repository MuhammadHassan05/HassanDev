/**
 * Keeps unfinished content off the live site. Facts that are still missing
 * are written as "[TODO: what is needed]". In GitHub Actions (CI and the
 * deploy, where CI is set) any marker fails the run, so the deploy stops
 * before it builds; locally the strict test is skipped so drafts can be
 * worked on, and the markers only have to be well formed.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = join(__dirname, "..", "src");

/** Every "[TODO…" in src/, as "file: marker". */
const markers = readdirSync(SRC, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(tsx?|css)$/.test(entry.name))
  .flatMap((entry) => {
    const file = join(entry.parentPath, entry.name);
    const text = readFileSync(file, "utf8");
    return [...text.matchAll(/\[TODO[^\]\n]*\]?/g)].map(
      ([marker]) => `${relative(SRC, file)}: ${marker}`,
    );
  });

describe("unfinished content", () => {
  it("writes every marker as [TODO: what is needed]", () => {
    for (const marker of markers) {
      expect(marker).toMatch(/: \[TODO: [^\]]+\]$/);
    }
  });

  it.runIf(Boolean(process.env.CI))("has no [TODO] markers left before going live", () => {
    expect(markers, `${markers.length} unfinished:\n${markers.join("\n")}`).toEqual([]);
  });
});
