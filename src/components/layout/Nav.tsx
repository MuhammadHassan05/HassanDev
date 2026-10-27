/**
 * Floating glass navigation bar: hassan.dev logo, track switch and the
 * Book a call link.
 */
import { siteChrome } from "@/content/site";
import type { TrackId } from "@/content/tracks";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { TrackSwitch } from "./TrackSwitch";

/** Props for {@link Nav}. */
export interface NavProps {
  /** Track of the page being viewed; null on pages that belong to neither (the 404). */
  current: TrackId | null;
}

/**
 * Renders the site header and its navigation.
 *
 * @param props.current - Track of the page being viewed, or null for none.
 */
export function Nav({ current }: NavProps) {
  const { logo, bookCall } = siteChrome;
  return (
    <header className="mx-auto w-full max-w-nav px-5 pt-5">
      {/* Below 660px: logo and Book a call on row 1, the switch full width on row 2.
          From 660px the design's single row fits and is used unchanged. */}
      <nav className="glass flex flex-wrap items-center justify-between gap-3 rounded-shell py-2 pr-2 pl-6 max-nav:grid max-nav:grid-cols-[1fr_auto] max-nav:gap-2 max-nav:p-2">
        {/* min-h-11 keeps the logo a 44px touch target; the design's text alone is ~24px tall. */}
        <AppLink
          href="/"
          className="inline-flex min-h-11 items-center font-mono text-[15px] font-medium max-nav:justify-self-start max-nav:pl-4"
        >
          {logo.name}
          <span className="text-accent">{logo.suffix}</span>
        </AppLink>
        <TrackSwitch current={current} className="max-nav:col-span-2 max-nav:row-start-2" />
        <Button
          href={bookCall.href}
          variant="outline"
          size="sm"
          className="max-nav:col-start-2 max-nav:row-start-1 max-nav:px-4"
        >
          {bookCall.label}
        </Button>
      </nav>
    </header>
  );
}
