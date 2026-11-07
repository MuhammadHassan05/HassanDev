/**
 * Illustration for the JAIB Expense Tracker project card, converted from
 * design-kit/illustrations/jaib-expense-tracker.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the JAIB Expense Tracker card. */
export function JaibExpenseTrackerIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect
        className="fill-surface-2 stroke-line"
        x="128"
        y="12"
        width="104"
        height="176"
        rx="18"
        strokeWidth="2"
      />
      <rect className="fill-line" x="165" y="20" width="30" height="5" rx="2.5" />
      <circle className="stroke-line" cx="180" cy="78" r="28" strokeWidth="11" />
      <circle
        className="stroke-accent-ink"
        cx="180"
        cy="78"
        r="28"
        strokeWidth="11"
        strokeDasharray="96 80"
        transform="rotate(-90 180 78)"
      />
      <circle
        className="stroke-ink-2"
        cx="180"
        cy="78"
        r="28"
        strokeWidth="11"
        strokeDasharray="36 140"
        strokeDashoffset="-100"
        transform="rotate(-90 180 78)"
      />
      <circle className="fill-accent-ink" cx="146" cy="128" r="5" />
      <rect className="fill-line" x="158" y="125" width="40" height="6" rx="3" />
      <rect className="fill-ink-2" x="204" y="125" width="16" height="6" rx="3" />
      <circle className="fill-ink-2" cx="146" cy="146" r="5" />
      <rect className="fill-line" x="158" y="143" width="32" height="6" rx="3" />
      <rect className="fill-ink-2" x="204" y="143" width="16" height="6" rx="3" />
      <circle className="fill-line" cx="146" cy="164" r="5" />
      <rect className="fill-line" x="158" y="161" width="44" height="6" rx="3" />
      <rect className="fill-ink-2" x="204" y="161" width="16" height="6" rx="3" />
    </svg>
  );
}
