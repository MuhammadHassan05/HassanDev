/**
 * Unit tests for the SEO helpers in src/lib/seo.ts and absoluteUrl in src/lib/site.ts.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { JsonLd } from "@/components/ui/JsonLd";
import sitemap from "@/app/sitemap";
import { caseStudies } from "@/content/caseStudies";
import { listNames, publishedCaseStudies } from "@/lib/caseStudies";
import {
  caseStudiesIndexMetadata,
  caseStudyMetadata,
  pageMetadata,
  personJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
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

describe("case study metadata", () => {
  it.each(caseStudies.map((study) => [study.slug, study] as const))(
    "%s has its own title, description and canonical URL",
    (slug, study) => {
      const meta = caseStudyMetadata(study);
      expect(meta.title).toBe(`${study.title} · Muhammad Hassan`);
      expect(meta.description).toBe(study.summary);
      expect(meta.alternates?.canonical).toBe(`${SITE_URL}/case-studies/${slug}/`);
      expect(meta.openGraph?.url).toBe(`${SITE_URL}/case-studies/${slug}/`);
    },
  );

  it("describes the list by the published case studies in it", () => {
    const meta = caseStudiesIndexMetadata();
    const clients = listNames(publishedCaseStudies(caseStudies).map((study) => study.client));
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/case-studies/`);
    expect(meta.description).toBe(
      clients ? `Case studies by Muhammad Hassan: ${clients}.` : "Case studies by Muhammad Hassan.",
    );
  });
});

describe("sitemap", () => {
  it("lists both pages, then the case studies list and each case study once published", () => {
    const published = publishedCaseStudies(caseStudies);
    expect(sitemap().map((entry) => entry.url)).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/studio/`,
      ...(published.length > 0
        ? [
            `${SITE_URL}/case-studies/`,
            ...published.map((study) => `${SITE_URL}/case-studies/${study.slug}/`),
          ]
        : []),
    ]);
  });

  it("never lists a draft", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const study of caseStudies.filter((s) => s.draft)) {
      expect(urls).not.toContain(`${SITE_URL}/case-studies/${study.slug}/`);
    }
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
