/**
 * sitemap.xml: both portfolio pages, and the case studies list and every
 * case study once published (drafts are left out), with absolute URLs under
 * the site's base path. Generated at build time into the static export.
 */
import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { tracks } from "@/content/tracks";
import { CASE_STUDIES_PATH, caseStudyHref, publishedCaseStudies } from "@/lib/caseStudies";
import { absoluteUrl } from "@/lib/site";

// Required for output: "export"; the sitemap is written once at build time.
export const dynamic = "force-static";

/** Lists every page that should be indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const published = publishedCaseStudies(caseStudies);
  const caseStudyRoutes =
    published.length > 0
      ? [CASE_STUDIES_PATH, ...published.map((study) => caseStudyHref(study.slug))]
      : [];
  return [...tracks.map((track) => track.href), ...caseStudyRoutes].map((route) => ({
    url: absoluteUrl(route),
  }));
}
