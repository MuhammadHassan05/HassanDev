/**
 * The two portfolio tracks (pages) and how the TrackSwitch labels them.
 */

/** Identifier of a track; also the value of the data-track theme attribute. */
export type TrackId = "engineer" | "studio";

/** One entry in the TrackSwitch. */
export interface Track {
  id: TrackId;
  label: string;
  href: string;
}

/** Tracks in the order the switch shows them. */
export const tracks: readonly Track[] = [
  { id: "engineer", label: "Software Engineer", href: "/" },
  { id: "studio", label: "Shopify & Design", href: "/studio/" },
];
