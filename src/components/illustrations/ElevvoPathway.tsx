/**
 * Illustration for the Elevvo Pathway project card, converted from
 * design-kit/illustrations/elevvo-pathway.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Elevvo Pathway card. */
export function ElevvoPathwayIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect className="fill-surface-2 stroke-line" x="38" y="28" width="76" height="144" rx="12" />
      <rect
        className="stroke-accent-ink fill-surface-2"
        x="142"
        y="28"
        width="76"
        height="144"
        rx="12"
      />
      <rect className="fill-surface-2 stroke-line" x="246" y="28" width="76" height="144" rx="12" />
      <rect className="fill-line" x="50" y="46" width="52" height="30" rx="4" />
      <rect className="fill-line" x="50" y="84" width="40" height="5" rx="2.5" />
      <rect className="fill-line" x="50" y="94" width="52" height="5" rx="2.5" />
      <rect className="fill-line" x="50" y="146" width="52" height="14" rx="7" />
      <rect className="stroke-line" x="154" y="46" width="52" height="10" rx="3" />
      <rect className="stroke-line" x="154" y="64" width="52" height="10" rx="3" />
      <rect className="stroke-line" x="154" y="82" width="52" height="10" rx="3" />
      <rect className="fill-accent-ink" x="154" y="146" width="52" height="14" rx="7" />
      <circle className="stroke-accent-ink" cx="284" cy="70" r="14" strokeWidth="2.5" />
      <path
        className="stroke-accent-ink"
        d="M277 70l5 5 9-10"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect className="fill-line" x="262" y="100" width="44" height="5" rx="2.5" />
      <rect className="fill-line" x="268" y="110" width="32" height="5" rx="2.5" />
      <path
        className="stroke-line"
        d="M118 100h18m-5-5 5 5-5 5M222 100h18m-5-5 5 5-5 5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
