/**
 * Frame shared by every page: sets the track theme and places the nav, the
 * main landmark and the footer.
 */
import type { ReactNode } from "react";
import { tracks, type NavSection, type TrackId } from "@/content/tracks";
import { MAIN_CONTENT_ID } from "@/lib/dom-ids";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/** Props for {@link PageShell}. */
export interface PageShellProps {
  /** Colours of the page: the track's accent. */
  track: TrackId;
  /** The nav link to mark as current: the track itself by default, null for none (the 404). */
  current?: NavSection | null;
  children: ReactNode;
}

/**
 * Renders a full page in the given track's colours.
 *
 * @param props.track - Accent colours, and the track page Contact falls back to.
 * @param props.current - The nav link to mark as current.
 * @param props.children - The page's sections.
 */
export function PageShell({ track, current = track, children }: PageShellProps) {
  // Track pages end with a #contact section; other pages send Contact to their track's page.
  const trackHref = tracks.find((t) => t.id === track)?.href ?? "/";
  const contactHref = current === track ? "#contact" : `${trackHref}#contact`;
  return (
    <div data-track={track} className="text-ink">
      <Nav current={current} contactHref={contactHref} />
      {/* tabIndex lets the skip link move focus here; no ring because main is not a control. */}
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer contactHref={contactHref} />
    </div>
  );
}
