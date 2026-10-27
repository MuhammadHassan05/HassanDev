/**
 * Unit tests for the SEO helpers in src/lib/seo.ts and absoluteUrl in src/lib/site.ts.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, personJsonLd, serializeJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";

describe("absoluteUrl", () => {
  it("prefixes the site URL", () => {
    expect(absoluteUrl("/studio/")).toBe("https://muhammadhassan05.github.io/HassanDev/studio/");
    expect(absoluteUrl("/")).toBe(`${SITE_URL}/`);
  });

  it("rejects relative and protocol-relative paths", () => {
    expect(() => absoluteUrl("studio/")).toThrow();
    expect(() => absoluteUrl("//evil.example/")).toThrow();
  });
});

describe("pageMetadata", () => {
  it.each([
    ["engineer", "Muhammad Hassan · Software Engineer", `${SITE_URL}/`],
    ["studio", "Hassan Studio · Shopify, Web and Design", `${SITE_URL}/studio/`],
  ] as const)("gives %s its title and canonical URL", (track, title, url) => {
    const meta = pageMetadata(track);
    expect(meta.title).toBe(title);
    expect(meta.alternates?.canonical).toBe(url);
    expect(meta.openGraph).toMatchObject({ url, title, type: "website" });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title });
  });

  it("uses the absolute 1200x630 share image everywhere", () => {
    const meta = pageMetadata("engineer");
    const expected = { url: `${SITE_URL}/og.png`, width: 1200, height: 630 };
    expect(meta.openGraph?.images).toEqual([expect.objectContaining(expected)]);
    expect(meta.twitter?.images).toEqual([expect.objectContaining(expected)]);
  });

  it("has a description for each page", () => {
    expect(pageMetadata("engineer").description).toMatch(/FAST-NUCES/);
    expect(pageMetadata("studio").description).toMatch(/Shopify/);
  });
});

describe("personJsonLd", () => {
  it("describes Hassan with his profiles", () => {
    expect(personJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Muhammad Hassan",
      jobTitle: "Software Engineer",
      url: `${SITE_URL}/`,
      sameAs: [
        "https://www.linkedin.com/in/muhammad-hassan-6b289426a",
        "https://github.com/MuhammadHassan05",
        "https://www.behance.net/muhammadhassan501",
      ],
    });
  });
});

describe("serializeJsonLd", () => {
  it("escapes < so a value cannot close the script tag", () => {
    const json = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});

describe("JsonLd", () => {
  it("renders a data script with the JSON as raw, parseable text", () => {
    const html = renderToStaticMarkup(createElement(JsonLd, { data: personJsonLd() }));
    const match = html.match(/^<script type="application\/ld\+json">([\s\S]*)<\/script>$/);
    expect(match).not.toBeNull();
    expect(JSON.parse(match?.[1] ?? "")).toEqual(personJsonLd());
  });
});
