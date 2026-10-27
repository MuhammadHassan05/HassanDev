/**
 * Frame shared by every page: sets the track theme and places the nav, the
 * main landmark and the footer. The glow orbs live in the root layout instead,
 * so they persist (and morph) when navigating between tracks.
 */
import type { ReactNode } from "react";
import type { TrackId } from "@/content/tracks";
import { MAIN_CONTENT_ID } from "@/lib/dom-ids";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/** Props for {@link PageShell}. */
export interface PageShellProps {
  track: TrackId;
  /** False for pages that use a track's colors but are not that track (the 404). */
  isTrackPage?: boolean;
  children: ReactNode;
}

/**
 * Renders a full page in the given track's colors.
 *
 * @param props.track - Theme and, for track pages, the active TrackSwitch entry.
 * @param props.isTrackPage - Whether the TrackSwitch should mark this page as current.
 * @param props.children - The page's sections.
 */
export function PageShell({ track, isTrackPage = true, children }: PageShellProps) {
  return (
    <div data-track={track} className="relative text-ink">
      <Nav current={isTrackPage ? track : null} />
      {/* tabIndex lets the skip link move focus here; no ring because main is not a control. */}
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
