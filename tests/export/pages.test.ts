/**
 * Post-build check of what GitHub Pages needs in out/: the .nojekyll marker,
 * which stops Pages from running Jekyll and hiding the _next folder (Jekyll
 * skips folders that start with an underscore), the 404 page it serves for
 * missing paths, Google Search Console's ownership file, and the case study
 * pages: one per published case study, none for drafts, and no draft text
 * anywhere. Run with `npm run test:export` after `npm run build`.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies } from "@/content/caseStudies";
import { publishedCaseStudies } from "@/lib/caseStudies";

const OUT = join(__dirname, "..", "..", "out");
const SEARCH_CONSOLE_FILE = "google17bfe732dc5dcb5b.html";

const published = publishedCaseStudies(caseStudies);
const drafts = caseStudies.filter((study) => study.draft);

/** Every text file in out/ (HTML, scripts, page data). */
const textFiles = readdirSync(OUT, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(html|js|txt|xml|json)$/.test(entry.name))
  .map((entry) => join(entry.parentPath, entry.name));

const html = (route: string) => readFileSync(join(OUT, route, "index.html"), "utf8");

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
});

describe("case study pages", () => {
  it.runIf(published.length > 0).each(published.map((study) => study.slug))(
    "exports the published case study %s",
    (slug) => {
      expect(existsSync(join(OUT, "case-studies", slug, "index.html"))).toBe(true);
    },
  );

  it.runIf(drafts.length > 0).each(drafts.map((study) => study.slug))(
    "exports no page for the draft %s",
    (slug) => {
      expect(existsSync(join(OUT, "case-studies", slug))).toBe(false);
    },
  );

  it("lists the published case studies, or is a 404 while there are none", () => {
    const list = html("case-studies");
    if (published.length > 0) {
      for (const study of published) expect(list).toContain(`/case-studies/${study.slug}/`);
    } else {
      expect(list).toContain('<meta name="robots" content="noindex"/>');
    }
  });

  it("links to no draft and ships no draft text", () => {
    for (const file of textFiles) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toContain("[TODO");
      for (const study of drafts) {
        expect(text, `${file} links to the draft ${study.slug}`).not.toContain(
          `/case-studies/${study.slug}/`,
        );
      }
    }
  });
});

describe("JavaScript", () => {
  // next.config.ts swaps Next's built-in polyfills for src/polyfills.ts. If a
  // Next.js update changes how they are imported, the alias stops matching
  // and they come back as "legacy JavaScript"; this catches that.
  it("ships none of Next's legacy polyfills to modern browsers", () => {
    const chunks = readdirSync(join(OUT, "_next", "static", "chunks"))
      .filter((name) => name.endsWith(".js"))
      .map((name) => join(OUT, "_next", "static", "chunks", name));
    const pages = textFiles.filter((file) => file.endsWith(".html"));
    // Chunks loaded only by browsers without ES modules are exempt.
    const noModule = new Set(
      pages.flatMap((page) =>
        [...readFileSync(page, "utf8").matchAll(/<script src="[^"]*\/([^/"]+\.js)" noModule/g)].map(
          ([, name]) => name,
        ),
      ),
    );
    for (const chunk of chunks.filter((file) => !noModule.has(basename(file)))) {
      const text = readFileSync(chunk, "utf8");
      expect(text, chunk).not.toContain('"trimEnd"in String.prototype');
      expect(text, chunk).not.toContain("Object.hasOwn||");
    }
  });
});
