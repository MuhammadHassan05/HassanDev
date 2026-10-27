/**
 * Pill switch between the two portfolio tracks. The current page is marked
 * with aria-current so assistive tech announces it, not just the color.
 */
import { tracks, type TrackId } from "@/content/tracks";
import { cx } from "@/lib/cx";
import { BounceText } from "@/components/ui/BounceText";
import { TrackLink } from "./TrackLink";

/** Props for {@link TrackSwitch}. */
export interface TrackSwitchProps {
  /** Track of the page being viewed; null on pages that belong to neither (the 404). */
  current: TrackId | null;
  /** Placement classes from the parent layout. */
  className?: string;
}

/**
 * Renders the Software Engineer / Shopify & Design switch.
 *
 * @param props.current - Track of the page being viewed, or null for none.
 */
export function TrackSwitch({ current, className }: TrackSwitchProps) {
  return (
    <ul
      className={cx(
        // In the two-row nav (below 660px) the options split the width equally instead of wrapping.
        "m-0 flex list-none flex-wrap gap-1 rounded-full bg-recess p-1 max-nav:grid max-nav:grid-cols-2",
        className,
      )}
    >
      {tracks.map((track) => {
        const active = track.id === current;
        return (
          <li key={track.id}>
            {/* The bouncing letters are hidden from screen readers; aria-label names the link. */}
            <TrackLink
              href={track.href}
              aria-label={track.label}
              aria-current={active ? "page" : undefined}
              className={cx(
                "inline-flex min-h-11 items-center rounded-full px-[18px] text-[15px] whitespace-nowrap max-nav:w-full max-nav:justify-center max-nav:px-2",
                active
                  ? "bg-accent font-semibold text-on-accent hover:text-on-accent"
                  : "font-medium text-soft",
              )}
            >
              <BounceText text={track.label} />
            </TrackLink>
          </li>
        );
      })}
    </ul>
  );
}
