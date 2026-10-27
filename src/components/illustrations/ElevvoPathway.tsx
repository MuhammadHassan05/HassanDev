/**
 * Illustration for the Elevvo Pathway project card, converted from
 * design-kit/illustrations/elevvo-pathway.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
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
      <rect
        className="draw-stroke"
        x="38"
        y="28"
        width="76"
        height="144"
        rx="12"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="stroke-accent draw-stroke"
        x="142"
        y="28"
        width="76"
        height="144"
        rx="12"
        fill="#111720"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="246"
        y="28"
        width="76"
        height="144"
        rx="12"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="50" y="46" width="52" height="30" rx="4" fill="#1E2733" />
      <rect x="50" y="84" width="40" height="5" rx="2.5" fill="#6B7785" />
      <rect x="50" y="94" width="52" height="5" rx="2.5" fill="#6B7785" />
      <rect x="50" y="146" width="52" height="14" rx="7" fill="#2A3542" />
      <rect
        className="draw-stroke"
        x="154"
        y="46"
        width="52"
        height="10"
        rx="3"
        stroke="#6B7785"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="154"
        y="64"
        width="52"
        height="10"
        rx="3"
        stroke="#6B7785"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="154"
        y="82"
        width="52"
        height="10"
        rx="3"
        stroke="#6B7785"
        pathLength={1}
      />
      <rect className="fill-accent" x="154" y="146" width="52" height="14" rx="7" />
      <circle
        className="stroke-accent draw-stroke"
        cx="284"
        cy="70"
        r="14"
        strokeWidth="2.5"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M277 70l5 5 9-10"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="262" y="100" width="44" height="5" rx="2.5" fill="#6B7785" />
      <rect x="268" y="110" width="32" height="5" rx="2.5" fill="#6B7785" />
      <path
        className="draw-stroke"
        d="M118 100h18m-5-5 5 5-5 5M222 100h18m-5-5 5 5-5 5"
        stroke="#9AA6B2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  );
}
