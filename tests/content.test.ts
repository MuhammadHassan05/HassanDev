/**
 * Integrity tests for src/content: illustration keys, links and the counts
 * the design's copy states.
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as caseStudy from "@/content/caseStudy";
import * as clients from "@/content/clients";
import * as education from "@/content/education";
import * as experience from "@/content/experience";
import { illustrationKeys } from "@/content/illustrations";
import * as profile from "@/content/profile";
import * as projectsModule from "@/content/projects";
import { screenshotTargets } from "@/content/screenshots.config";
import * as services from "@/content/services";
import * as site from "@/content/site";
import * as skills from "@/content/skills";
import * as stats from "@/content/stats";
import * as tracks from "@/content/tracks";
import { linkKind } from "@/lib/links";

const { engineerProjects, projects } = projectsModule;

const ROOT = join(__dirname, "..");
const DESIGN_ILLUSTRATIONS = join(ROOT, "design-kit", "illustrations");

const CONTENT_MODULES = {
  caseStudy,
  clients,
  education,
  experience,
  profile,
  projects: projectsModule,
  services,
  site,
  skills,
  stats,
  tracks,
};

/** Collects every string stored under an `href` key, with the path it was found at. */
function collectHrefs(value: unknown, path: string, found: Array<[string, string]>): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectHrefs(item, `${path}[${i}]`, found));
  } else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (key === "href" && typeof child === "string") {
        found.push([`${path}.href`, child]);
      } else {
        collectHrefs(child, `${path}.${key}`, found);
      }
    }
  }
}

const hrefs: Array<[string, string]> = [];
collectHrefs(CONTENT_MODULES, "content", hrefs);

describe("project illustrations", () => {
  it("gives every project a known illustration key", () => {
    for (const project of projects) {
      expect(illustrationKeys, project.title).toContain(project.illustration);
    }
  });

  it("uses every illustration exactly once", () => {
    const used = projects.map((project) => project.illustration).sort();
    expect(used).toEqual([...illustrationKeys].sort());
  });

  it.skipIf(!existsSync(DESIGN_ILLUSTRATIONS))(
    "matches the SVG files in design-kit/illustrations (local only)",
    () => {
      const files = readdirSync(DESIGN_ILLUSTRATIONS)
        .filter((name) => name.endsWith(".svg"))
        .map((name) => name.slice(0, -".svg".length))
        .sort();
      expect([...illustrationKeys].sort()).toEqual(files);
    },
  );
});

describe("links", () => {
  it("finds the links in the content", () => {
    expect(hrefs.length).toBeGreaterThan(30);
  });

  it.each(hrefs)("%s is internal, mailto: or https:", (_path, href) => {
    const kind = linkKind(href);
    if (kind === "external") {
      expect(href).toMatch(/^(https:\/\/|mailto:)/);
    } else {
      expect(["route", "asset", "anchor"]).toContain(kind);
    }
  });

  it.each(hrefs.filter(([, href]) => linkKind(href) === "asset"))(
    "%s points at a file in public/",
    (_path, href) => {
      const file = href.split(/[?#]/, 1)[0] ?? "";
      expect(existsSync(join(ROOT, "public", file))).toBe(true);
    },
  );

  it.each(hrefs.filter(([, href]) => linkKind(href) === "route"))(
    "%s points at a page in the track list",
    (_path, href) => {
      const route = href.split("#", 1)[0];
      expect(tracks.tracks.map((track) => track.href)).toContain(route);
    },
  );
});

describe("screenshot targets", () => {
  it.each(screenshotTargets.map((t) => [t.project, t] as const))(
    "%s is an https URL on the same site as its project link",
    (_key, target) => {
      expect(target.url).toMatch(/^https:\/\//);
      const project = projects.find((p) => p.illustration === target.project);
      expect(project, "no project uses this key").toBeDefined();
      const footer = project?.footer;
      expect(footer?.kind, "project card has no link to compare with").toBe("link");
      if (footer?.kind === "link") {
        const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");
        expect(host(target.url)).toBe(host(footer.href));
      }
    },
  );

  it("only ever has approved capture files in public/projects/", () => {
    const dir = join(ROOT, "public", "projects");
    const files = existsSync(dir) ? readdirSync(dir) : [];
    const allowed = screenshotTargets.map((t) => `${t.project}.webp`);
    for (const file of files) {
      expect(allowed, `unexpected file public/projects/${file}`).toContain(file);
    }
  });

  it("lists each project once", () => {
    const keys = screenshotTargets.map((t) => t.project);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("counts stated in the design copy", () => {
  it("has 14 engineer projects", () => {
    expect(engineerProjects).toHaveLength(14);
    expect(projectsModule.engineerProjectsIntro.section.description).toContain(
      `${engineerProjects.length} projects`,
    );
  });

  it("splits them 6 AI, 6 web, 2 mobile like the filter tabs", () => {
    const count = (category: string) =>
      engineerProjects.filter((project) => project.category === category).length;
    expect([count("ai"), count("web"), count("mobile")]).toEqual([6, 6, 2]);
  });
});
