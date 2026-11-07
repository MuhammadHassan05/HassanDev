/**
 * Post-build check of what GitHub Pages needs in out/: the .nojekyll marker,
 * which stops Pages from running Jekyll and hiding the _next folder (Jekyll
 * skips folders that start with an underscore), the 404 page it serves for
 * missing paths, Google Search Console's ownership file, and a page for the
 * case studies list and every case study. Run with `npm run test:export`
 * after `npm run build`.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies } from "@/content/caseStudies";

const OUT = join(__dirname, "..", "..", "out");
const SEARCH_CONSOLE_FILE = "google17bfe732dc5dcb5b.html";

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

  // Google re-checks this file to keep the site verified, so it must ship
  // byte for byte as Google issued it.
  it("includes the Search Console ownership file unchanged", () => {
    const file = join(OUT, SEARCH_CONSOLE_FILE);
    expect(existsSync(file), `out/${SEARCH_CONSOLE_FILE} is missing`).toBe(true);
    expect(readFileSync(file, "utf8")).toBe(`google-site-verification: ${SEARCH_CONSOLE_FILE}`);
  });

  it.each(["case-studies", ...caseStudies.map((study) => `case-studies/${study.slug}`)])(
    "exports %s/index.html",
    (route) => {
      expect(existsSync(join(OUT, route, "index.html"))).toBe(true);
    },
  );
});
