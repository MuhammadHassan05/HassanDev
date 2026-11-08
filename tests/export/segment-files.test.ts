/**
 * Post-build check of the static export in out/: every page-data file the
 * client router requests on navigation (e.g. studio/__next.studio.__PAGE__.txt)
 * must exist, or GitHub Pages answers with a 404 and Next falls back to a full
 * page load. Run with `npm run test:export` after `npm run build`; CI does so
 * on Ubuntu after its build step.
 */
import { existsSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import {
  convertSegmentPathToStaticExportFilename,
  createSegmentRequestKeyPart,
} from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { describe, expect, it } from "vitest";

const OUT = join(__dirname, "..", "..", "out");
const APP = join(__dirname, "..", "..", "src", "app");

/** Every route in src/app, as its folder segments, e.g. ["case-studies", "[slug]"]. */
const appRoutes = readdirSync(APP, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name === "page.tsx")
  .map((entry) => relative(APP, entry.parentPath).split(sep).filter(Boolean));

/** Next's param type for a dynamic folder name: [x] is "d", [...x] "c", [[...x]] "oc". */
function dynamicSegment(folder: string): [name: string, type: string] | null {
  const match = /^\[(\[)?(\.\.\.)?([^\]]+)\]?\]$/.exec(folder);
  if (!match) return null;
  const [, optional, catchAll, name = ""] = match;
  return [name, optional ? "oc" : catchAll ? "c" : "d"];
}

/**
 * The segment keys the router uses for an exported route folder. Dynamic
 * segments are keyed by their param name ("$d$slug"), not by the value, so the
 * folder is matched to its route in src/app first.
 */
function segmentKeys(segments: string[]): string[] {
  const route = appRoutes.find(
    (candidate) =>
      candidate.length === segments.length &&
      candidate.every((part, i) => part === segments[i] || dynamicSegment(part) !== null),
  );
  return segments.map((value, i) => {
    const dynamic = route ? dynamicSegment(route[i] ?? "") : null;
    // Same function the router uses to build each part of the request.
    return createSegmentRequestKeyPart(dynamic ? [dynamic[0], value, dynamic[1]] : value);
  });
}

/** Every directory under out/, as paths relative to it ("" is out/ itself). */
function directories(dir = OUT): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const full = join(dir, entry.name);
      return [relative(OUT, full), ...directories(full)];
    });
}

// Next.js 16.4.2 writes these files into nested folders when the build runs on
// Windows, because it joins segment paths with backslashes and only converts
// forward slashes: https://github.com/vercel/next.js/issues/85374
// Production builds run on Ubuntu, where this test must pass.
describe.skipIf(process.platform === "win32")("static export page-data files", () => {
  it("has a build to check", () => {
    expect(existsSync(OUT), "out/ is missing: run npm run build first").toBe(true);
  });

  // A route folder is one the router can navigate to: it has a route tree payload.
  const routes = existsSync(OUT)
    ? ["", ...directories()].filter((dir) => existsSync(join(OUT, dir, "__next._tree.txt")))
    : [];

  it("finds the site's routes", () => {
    expect(routes).toEqual(expect.arrayContaining(["", "studio"]));
  });

  it.each(routes.map((route) => [`/${route}`, route]))(
    "%s has the page file the router requests",
    (_label, route) => {
      const segments = route.split(sep).filter(Boolean);
      // Same function the router uses to build the request URL.
      const fileName = convertSegmentPathToStaticExportFilename(
        `/${[...segmentKeys(segments), "__PAGE__"].join("/")}`,
      );
      expect(existsSync(join(OUT, route, fileName)), `missing ${join(route, fileName)}`).toBe(true);
    },
  );

  it("has no nested __next.* folders (the symptom of the bug above)", () => {
    const nested = directories().filter((dir) => dir.split(sep).pop()?.startsWith("__next."));
    expect(nested).toEqual([]);
  });
});
