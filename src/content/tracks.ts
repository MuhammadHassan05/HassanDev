/**
 * The two portfolio tracks (pages) and how the nav labels them.
 */

/** Identifier of a track; also the value of the data-track theme attribute. */
export type TrackId = "engineer" | "studio";

/** A part of the site the nav can mark as current: a track page or the case studies. */
export type NavSection = TrackId | "case-studies";

/** One track. */
export interface Track {
  id: TrackId;
  /** The role the track presents, e.g. the job title in the structured data. */
  label: string;
  /** Short name in the nav. */
  navLabel: string;
  href: string;
}

/** Tracks in the order the nav shows them. Nav labels given by Hassan. */
export const tracks: readonly Track[] = [
  { id: "engineer", label: "Software Engineer", navLabel: "Engineering", href: "/" },
  { id: "studio", label: "Shopify & Design", navLabel: "Studio", href: "/studio/" },
];
