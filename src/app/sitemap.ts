/**
 * sitemap.xml: both portfolio pages, the case studies list and every case
 * study, with absolute URLs under the site's base path. Generated at build
 * time into the static export.
 */
import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";
import { tracks } from "@/content/tracks";
import { CASE_STUDIES_PATH, caseStudyHref } from "@/lib/caseStudies";
import { absoluteUrl } from "@/lib/site";

// Required for output: "export"; the sitemap is written once at build time.
export const dynamic = "force-static";

/** Lists every page that should be indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...tracks.map((track) => track.href),
    CASE_STUDIES_PATH,
    ...caseStudies.map((study) => caseStudyHref(study.slug)),
  ].map((route) => ({ url: absoluteUrl(route) }));
}
