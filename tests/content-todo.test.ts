/**
 * Keeps unfinished content off the live site. Facts that are still missing
 * are written as TODO markers in square brackets. A case study with markers
 * is a draft and is left out of the build, so it may keep them; anything
 * else that ships may not. In GitHub Actions (CI and the deploy, where CI is
 * set) a marker in shipped content fails the run, so the deploy stops before
 * it builds; locally that check is skipped so drafts can be worked on, and
 * markers only have to be well formed.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";
import { publishedCaseStudies } from "@/lib/caseStudies";

const SRC = join(__dirname, "..", "src");
/** Checked as data below instead, because its drafts may hold markers. */
const CASE_STUDIES_FILE = join("content", "caseStudies.ts");
const MARKER = /\[TODO[^\]\n]*\]?/g;

/** Every source file in src/, relative to it, with its text. */
const files = readdirSync(SRC, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(tsx?|css)$/.test(entry.name))
  .map((entry) => {
    const path = join(entry.parentPath, entry.name);
    return { name: relative(SRC, path), text: readFileSync(path, "utf8") };
  });

/** Markers in a text, labelled with where they were found. */
const markersIn = (where: string, text: string) =>
  [...text.matchAll(MARKER)].map(([marker]) => `${where}: ${marker}`);

/** Markers in the case studies that go into the build. */
const publishedMarkers = (list: readonly CaseStudy[]) =>
  publishedCaseStudies(list).flatMap((study) =>
    markersIn(`case study "${study.slug}"`, JSON.stringify(study)),
  );

/** Markers in everything that ships. */
const shipped = [
  ...files
    .filter((file) => file.name !== CASE_STUDIES_FILE)
    .flatMap((file) => markersIn(file.name, file.text)),
  ...publishedMarkers(caseStudies),
];

describe("unfinished content", () => {
  it("writes every marker as [TODO: what is needed], drafts included", () => {
    for (const marker of files.flatMap((file) => markersIn(file.name, file.text))) {
      expect(marker).toMatch(/: \[TODO: [^\]]+\]$/);
    }
  });

  it("catches a marker in a published case study and ignores drafts", () => {
    const study = { slug: "x", title: "[TODO: title]" } as unknown as CaseStudy;
    expect(publishedMarkers([{ ...study, draft: false }])).toEqual([
      'case study "x": [TODO: title]',
    ]);
    expect(publishedMarkers([{ ...study, draft: true }])).toEqual([]);
  });

  it.runIf(Boolean(process.env.CI))("ships no [TODO] markers", () => {
    expect(shipped, `${shipped.length} unfinished:\n${shipped.join("\n")}`).toEqual([]);
  });
});
