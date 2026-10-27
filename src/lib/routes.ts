/**
 * Maps a route to its portfolio track, so components that outlive a page
 * (the glow background in the root layout) know which colors to show.
 */
import { tracks, type TrackId } from "@/content/tracks";

/**
 * Finds the track a pathname belongs to. Pathnames are as next/navigation
 * reports them, without the base path. Unknown routes (such as the 404 page)
 * belong to the engineer track, the site's default.
 *
 * @param pathname - e.g. "/studio/" or "/".
 */
export function trackForPathname(pathname: string): TrackId {
  const match = tracks.find((track) => {
    const root = track.href.replace(/\/$/, "");
    return root !== "" && (pathname === root || pathname.startsWith(`${root}/`));
  });
  return match?.id ?? "engineer";
}
