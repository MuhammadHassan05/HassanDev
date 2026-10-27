/**
 * Post-build check of what GitHub Pages needs in out/: the .nojekyll marker,
 * which stops Pages from running Jekyll and hiding the _next folder (Jekyll
 * skips folders that start with an underscore), and the 404 page it serves
 * for missing paths. Run with `npm run test:export` after `npm run build`.
 */
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const OUT = join(__dirname, "..", "..", "out");

describe("GitHub Pages files", () => {
  it("includes an empty .nojekyll", () => {
    const file = join(OUT, ".nojekyll");
    expect(existsSync(file), "out/.nojekyll is missing: is public/.nojekyll there?").toBe(true);
    expect(statSync(file).size).toBe(0);
  });

  it("includes the _next folder and the 404 page", () => {
    expect(existsSync(join(OUT, "_next"))).toBe(true);
    expect(existsSync(join(OUT, "404.html"))).toBe(true);
  });
});
