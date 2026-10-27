/**
 * robots.txt: allows all crawlers and points them to the sitemap.
 *
 * Crawlers only read robots.txt at a domain's root, and this project site
 * lives under /HassanDev/, so this file is served at /HassanDev/robots.txt
 * and is advisory. Search engines learn about the pages because the sitemap
 * is submitted through Google Search Console.
 */
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Required for output: "export"; the file is written once at build time.
export const dynamic = "force-static";

/** Crawl rules for the site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
