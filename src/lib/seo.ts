/**
 * Builds each page's search and sharing metadata (title, description,
 * canonical URL, Open Graph, Twitter card) and the JSON-LD Person data,
 * all from src/content.
 */
import type { Metadata } from "next";
import { caseStudies, caseStudyLabels, type CaseStudy } from "@/content/caseStudies";
import { profile } from "@/content/profile";
import { shareImage, siteMetadata } from "@/content/site";
import { tracks, type TrackId } from "@/content/tracks";
import { CASE_STUDIES_PATH, caseStudyHref, listNames } from "./caseStudies";
import { absoluteUrl } from "./site";

/**
 * Metadata for one track's page.
 *
 * @param track - Which page.
 */
export function pageMetadata(track: TrackId): Metadata {
  const { title, description } = siteMetadata.pages[track];
  const route = tracks.find((t) => t.id === track)?.href ?? "/";
  return buildMetadata(title, description, route);
}

/**
 * Metadata for one case study page: its title and summary, and its own
 * canonical URL.
 *
 * @param study - The case study.
 */
export function caseStudyMetadata(study: CaseStudy): Metadata {
  return buildMetadata(
    `${study.title} · ${profile.fullName}`,
    study.summary,
    caseStudyHref(study.slug),
  );
}

/** Metadata for the case studies list, described by the case studies it holds. */
export function caseStudiesIndexMetadata(): Metadata {
  const clients = listNames(caseStudies.map((study) => study.client));
  return buildMetadata(
    `${caseStudyLabels.listTitle} · ${profile.fullName}`,
    `${caseStudyLabels.listTitle} by ${profile.fullName}: ${clients}.`,
    CASE_STUDIES_PATH,
  );
}

/**
 * The shared shape of every page's metadata. Every URL is absolute, because
 * crawlers and share previews do not resolve relative ones reliably.
 *
 * @param title - Page title.
 * @param description - Search and share description.
 * @param route - Root-relative route, e.g. "/studio/".
 */
function buildMetadata(title: string, description: string, route: string): Metadata {
  const url = absoluteUrl(route);
  const image = {
    url: absoluteUrl(shareImage.path),
    width: shareImage.width,
    height: shareImage.height,
    alt: shareImage.alt,
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: profile.fullName,
      title,
      description,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** schema.org Person data, as embedded in the page. */
export interface PersonJsonLd {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
}

/** Structured data describing Hassan for search engines. */
export function personJsonLd(): PersonJsonLd {
  const engineer = tracks.find((t) => t.id === "engineer");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: engineer?.label ?? "Software Engineer",
    url: absoluteUrl("/"),
    sameAs: [profile.links.linkedin, profile.links.github, profile.links.behance],
  };
}

/**
 * Serialises JSON-LD for a <script> element. "<" is escaped as < (still
 * valid JSON) so no value can ever close the script tag early.
 *
 * @param data - Any JSON-serialisable value.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
