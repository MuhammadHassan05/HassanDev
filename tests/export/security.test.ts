/**
 * Post-build security checks of the static export in out/: every page has
 * the Content Security Policy and referrer meta tags, every inline script is
 * allowed by hash (and nothing else is), and every external link is hardened
 * and goes to an approved destination. Run with `npm run test:export` after
 * `npm run build`, which runs scripts/csp.mjs; CI does so after its build step.
 *
 * Hashes are recomputed here independently of scripts/csp.mjs, so a bug in
 * the script cannot hide itself.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const OUT = join(__dirname, "..", "..", "out");

/** Every exported HTML file, relative to out/. */
const pages = existsSync(OUT)
  ? readdirSync(OUT, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => relative(OUT, join(entry.parentPath, entry.name)))
  : [];

const read = (page: string) => readFileSync(join(OUT, page), "utf8");

/** The policy every page must carry, apart from its own script hashes. */
const EXPECTED_DIRECTIVES = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
];

/** External destinations the site may link to. */
const ALLOWED_EXTERNAL = [
  /^https:\/\/www\.linkedin\.com\/in\/muhammad-hassan-6b289426a$/,
  /^https:\/\/github\.com\/MuhammadHassan05$/,
  /^https:\/\/github\.com\/MuhammadZaighamAsif\/TalentMiner$/,
  /^https:\/\/github\.com\/Zain485576\/City-Pulse$/,
  /^https:\/\/www\.behance\.net\/muhammadhassan501$/,
  /^https:\/\/calendly\.com\/hassannawab898\/30min$/,
  /^https:\/\/flatterlab\.tech$/,
  /^mailto:hassannawab898@gmail\.com(\?subject=[\w%]+)?$/,
  // "Visit site" links on the engineer project cards, from the design kit.
  /^https:\/\/pikzels\.com$/,
  /^https:\/\/yetti\.ai$/,
  /^https:\/\/www\.vtestcorp\.com\/$/,
  /^https:\/\/www\.oneplace\.ca\/$/,
];

/** The CSP meta tags in a page. */
const cspTags = (html: string) =>
  [...html.matchAll(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"\s*\/?>/g)].map(
    (match) => ({ policy: match[1] ?? "", index: match.index }),
  );

/** SHA-256 sources for every inline script, computed the way browsers do. */
const inlineHashes = (html: string) =>
  [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes]) => !/\ssrc\s*=/i.test(attributes ?? ""))
    .map(
      ([, , body]) =>
        `'sha256-${createHash("sha256")
          .update(body ?? "", "utf8")
          .digest("base64")}'`,
    );

/** Every <a> tag's attributes. */
const anchors = (html: string) =>
  [...html.matchAll(/<a\b([^>]*)>/g)].map(([, attributes = ""]) => ({
    href: attributes.match(/\shref="([^"]*)"/)?.[1] ?? "",
    target: attributes.match(/\starget="([^"]*)"/)?.[1],
    rel: attributes.match(/\srel="([^"]*)"/)?.[1] ?? "",
  }));

describe("static export security", () => {
  it("has pages to check", () => {
    expect(existsSync(OUT), "out/ is missing: run npm run build first").toBe(true);
    expect(pages).toEqual(expect.arrayContaining(["index.html", join("studio", "index.html")]));
  });

  describe.each(pages)("%s", (page) => {
    const html = existsSync(OUT) ? read(page) : "";

    it("has exactly one CSP meta tag, before any script", () => {
      const tags = cspTags(html);
      expect(tags).toHaveLength(1);
      const firstScript = html.search(/<script\b/i);
      if (firstScript !== -1) expect(tags[0]?.index).toBeLessThan(firstScript);
    });

    it("has the required policy directives", () => {
      const directives = (cspTags(html)[0]?.policy ?? "").split(";").map((d) => d.trim());
      expect(directives).toEqual(expect.arrayContaining(EXPECTED_DIRECTIVES));
      const scriptSrc = directives.find((d) => d.startsWith("script-src"));
      expect(scriptSrc).toMatch(/^script-src 'self'( 'sha256-[A-Za-z0-9+/=]+')*$/);
    });

    it("allows exactly the page's own inline scripts, nothing else", () => {
      const scriptSrc =
        (cspTags(html)[0]?.policy ?? "")
          .split(";")
          .map((d) => d.trim())
          .find((d) => d.startsWith("script-src")) ?? "";
      const allowed = new Set(scriptSrc.match(/'sha256-[^']+'/g) ?? []);
      expect(allowed).toEqual(new Set(inlineHashes(html)));
    });

    it("sets the referrer policy", () => {
      expect(html).toContain('<meta name="referrer" content="strict-origin-when-cross-origin"/>');
    });

    it("opens no link in a new tab without rel=noopener noreferrer", () => {
      for (const link of anchors(html).filter((a) => a.target === "_blank")) {
        expect(link.rel.split(" "), link.href).toEqual(
          expect.arrayContaining(["noopener", "noreferrer"]),
        );
      }
    });

    it("links only to approved external destinations, with rel=noopener noreferrer", () => {
      const external = anchors(html).filter((a) => /^(https?:|mailto:|\/\/)/.test(a.href));
      for (const link of external) {
        expect(
          ALLOWED_EXTERNAL.some((pattern) => pattern.test(link.href)),
          `unapproved link ${link.href}`,
        ).toBe(true);
        if (!link.href.startsWith("mailto:")) {
          expect(link.rel.split(" "), link.href).toEqual(
            expect.arrayContaining(["noopener", "noreferrer"]),
          );
        }
      }
    });

    it("loads no script, style, font or image from another origin", () => {
      const sources = [...html.matchAll(/<(script|link|img|source)\b([^>]*)>/g)]
        // Canonical and alternate links name the page's own URL for search
        // engines; the browser never fetches them.
        .filter(([, tag, attributes = ""]) => {
          return !(tag === "link" && /\srel="(canonical|alternate)"/.test(attributes));
        })
        .map(([, , attributes = ""]) => attributes.match(/\s(?:src|href)="([^"]*)"/)?.[1] ?? "")
        .filter((url) => /^(https?:)?\/\//.test(url));
      expect(sources).toEqual([]);
    });

    it("points canonical links only at this site", () => {
      for (const [, url] of html.matchAll(/<link rel="canonical" href="([^"]*)"/g)) {
        expect(url).toMatch(/^https:\/\/muhammadhassan05\.github\.io\/HassanDev\//);
      }
    });
  });
});
