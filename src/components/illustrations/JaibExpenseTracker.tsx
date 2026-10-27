/**
 * Illustration for the JAIB Expense Tracker project card, converted from
 * design-kit/illustrations/jaib-expense-tracker.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
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
        className="draw-stroke"
        x="128"
        y="12"
        width="104"
        height="176"
        rx="18"
        fill="#111720"
        stroke="#2A3542"
        strokeWidth="2"
        pathLength={1}
      />
      <rect x="165" y="20" width="30" height="5" rx="2.5" fill="#2A3542" />
      <circle
        className="draw-stroke"
        cx="180"
        cy="78"
        r="28"
        stroke="#2A3542"
        strokeWidth="11"
        pathLength={1}
      />
      <circle
        className="stroke-accent"
        cx="180"
        cy="78"
        r="28"
        strokeWidth="11"
        strokeDasharray="96 80"
        transform="rotate(-90 180 78)"
      />
      <circle
        cx="180"
        cy="78"
        r="28"
        stroke="#C3CCD5"
        strokeWidth="11"
        strokeDasharray="36 140"
        strokeDashoffset="-100"
        transform="rotate(-90 180 78)"
      />
      <circle className="fill-accent" cx="146" cy="128" r="5" />
      <rect x="158" y="125" width="40" height="6" rx="3" fill="#6B7785" />
      <rect x="204" y="125" width="16" height="6" rx="3" fill="#C3CCD5" />
      <circle cx="146" cy="146" r="5" fill="#C3CCD5" />
      <rect x="158" y="143" width="32" height="6" rx="3" fill="#6B7785" />
      <rect x="204" y="143" width="16" height="6" rx="3" fill="#C3CCD5" />
      <circle cx="146" cy="164" r="5" fill="#2A3542" />
      <rect x="158" y="161" width="44" height="6" rx="3" fill="#6B7785" />
      <rect x="204" y="161" width="16" height="6" rx="3" fill="#C3CCD5" />
    </svg>
  );
}
