/**
 * sitemap.xml: both portfolio pages, with absolute URLs under the site's
 * base path. Generated at build time into the static export.
 */
import type { MetadataRoute } from "next";
import { tracks } from "@/content/tracks";
import { absoluteUrl } from "@/lib/site";

// Required for output: "export"; the sitemap is written once at build time.
export const dynamic = "force-static";

/** Lists every page that should be indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return tracks.map((track) => ({ url: absoluteUrl(track.href) }));
}
