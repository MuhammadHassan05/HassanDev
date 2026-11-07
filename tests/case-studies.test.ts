/**
 * Tests for the case studies: the lookups in src/lib/caseStudies.ts, and the
 * content in src/content/caseStudies.ts against the shape the pages rely on.
 */
import { describe, expect, it } from "vitest";
import { caseStudies, featuredCaseStudies, type CaseStudy } from "@/content/caseStudies";
import { illustrationKeys } from "@/content/illustrations";
import { projects } from "@/content/projects";
import {
  caseStudyForProject,
  caseStudyHref,
  featuredCaseStudies as pickFeatured,
  findCaseStudy,
  listNames,
  nextCaseStudy,
} from "@/lib/caseStudies";
import { linkKind } from "@/lib/links";

/** A minimal case study for the lookup tests. */
const fixture = (slug: string, project = "pikzels"): CaseStudy =>
  ({ slug, project }) as unknown as CaseStudy;
const list = [fixture("a", "pikzels"), fixture("b", "yetti-ai"), fixture("c", "vtest")];

describe("case study lookups", () => {
  it("builds the page route", () => {
    expect(caseStudyHref("yetti-ai")).toBe("/case-studies/yetti-ai/");
  });

  it("finds by slug", () => {
    expect(findCaseStudy(list, "b")?.slug).toBe("b");
    expect(findCaseStudy(list, "z")).toBeUndefined();
  });

  it("goes to the next case study and wraps round at the end", () => {
    expect(nextCaseStudy(list, "a").slug).toBe("b");
    expect(nextCaseStudy(list, "c").slug).toBe("a");
    expect(() => nextCaseStudy(list, "z")).toThrow();
  });

  it("picks featured case studies in order and rejects unknown slugs", () => {
    expect(pickFeatured(list, ["c", "a"]).map((s) => s.slug)).toEqual(["c", "a"]);
    expect(() => pickFeatured(list, ["nope"])).toThrow(/nope/);
  });

  it("finds the case study behind a project card", () => {
    expect(caseStudyForProject(list, "yetti-ai")?.slug).toBe("b");
    expect(caseStudyForProject(list, "talentminer")).toBeUndefined();
  });

  it("joins names as prose", () => {
    expect(listNames([])).toBe("");
    expect(listNames(["A"])).toBe("A");
    expect(listNames(["A", "B"])).toBe("A and B");
    expect(listNames(["A", "B", "C"])).toBe("A, B and C");
  });
});

describe("case study content", () => {
  const slugs = caseStudies.map((study) => study.slug);
  const projectKeys = new Set(projects.map((project) => project.illustration));

  it("has the four case studies, each with a unique, URL-safe slug", () => {
    expect(slugs).toEqual(["yetti-ai", "tiny-owlets", "talentminer", "flatterlab"]);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it.each(caseStudies.map((study) => [study.slug, study] as const))(
    "%s follows the case study shape",
    (_slug, study) => {
      expect(projectKeys.has(study.project), "project must be a real card").toBe(true);
      if (study.cover.kind === "illustration") {
        expect(illustrationKeys).toContain(study.cover.illustration);
      }
      expect(study.stack.length).toBeGreaterThan(0);
      expect(study.challenge.length).toBeGreaterThan(0);
      if (study.work.kind === "bullets") {
        expect(study.work.items.length).toBeGreaterThanOrEqual(3);
        expect(study.work.items.length).toBeLessThanOrEqual(5);
      } else {
        expect(study.work.items.length).toBeGreaterThan(0);
      }
      expect(study.decisions.length).toBeGreaterThanOrEqual(2);
      expect(study.decisions.length).toBeLessThanOrEqual(3);
      expect(study.result.metrics.length).toBeGreaterThanOrEqual(2);
      expect(study.result.metrics.length).toBeLessThanOrEqual(4);
      expect(study.next.length).toBeGreaterThan(0);
      if (study.link) expect(linkKind(study.link.href)).toBe("external");
    },
  );

  it("features only case studies that exist, on the right track", () => {
    for (const [track, featured] of Object.entries(featuredCaseStudies)) {
      for (const study of pickFeatured(caseStudies, featured)) {
        expect(study.track).toBe(track);
      }
    }
    expect(featuredCaseStudies.engineer).toEqual(["yetti-ai", "talentminer", "flatterlab"]);
    expect(featuredCaseStudies.studio).toEqual(["tiny-owlets"]);
  });
});
