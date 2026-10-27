/**
 * Post-build check of the static export in out/: every page-data file the
 * client router requests on navigation (e.g. studio/__next.studio.__PAGE__.txt)
 * must exist, or GitHub Pages answers with a 404 and Next falls back to a full
 * page load. Run with `npm run test:export` after `npm run build`; CI does so
 * on Ubuntu after its build step.
 */
import { existsSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { describe, expect, it } from "vitest";

const OUT = join(__dirname, "..", "..", "out");

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
        `/${[...segments, "__PAGE__"].join("/")}`,
      );
      expect(existsSync(join(OUT, route, fileName)), `missing ${join(route, fileName)}`).toBe(true);
    },
  );

  it("has no nested __next.* folders (the symptom of the bug above)", () => {
    const nested = directories().filter((dir) => dir.split(sep).pop()?.startsWith("__next."));
    expect(nested).toEqual([]);
  });
});
