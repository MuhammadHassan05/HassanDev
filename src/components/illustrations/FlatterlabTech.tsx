/**
 * Illustration for the flatterlab.tech project card, converted from
 * design-kit/illustrations/flatterlab-tech.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the flatterlab.tech card. */
export function FlatterlabTechIllustration({ className }: IllustrationProps) {
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
        x="58"
        y="34"
        width="112"
        height="132"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="72" y="50" width="40" height="6" rx="3" fill="#6B7785" />
      <rect
        className="draw-stroke"
        x="72"
        y="62"
        width="84"
        height="16"
        rx="4"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="72" y="88" width="52" height="6" rx="3" fill="#6B7785" />
      <rect
        className="stroke-accent draw-stroke"
        x="72"
        y="100"
        width="84"
        height="16"
        rx="4"
        pathLength={1}
      />
      <rect className="fill-accent" x="72" y="128" width="84" height="22" rx="6" />
      <path
        className="draw-stroke"
        d="M180 100h14m-6-6 6 6-6 6"
        stroke="#6B7785"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="204" y="22" width="104" height="156" rx="6" fill="#E8EDF2" />
      <circle cx="224" cy="44" r="10" fill="#9AA6B2" />
      <rect x="240" y="38" width="50" height="6" rx="3" fill="#0B0F14" />
      <rect x="240" y="48" width="34" height="4" rx="2" fill="#6B7785" />
      <rect className="fill-accent" x="216" y="66" width="80" height="3" rx="1.5" />
      <rect x="216" y="78" width="80" height="4" rx="2" fill="#9AA6B2" />
      <rect x="216" y="87" width="68" height="4" rx="2" fill="#9AA6B2" />
      <rect x="216" y="96" width="74" height="4" rx="2" fill="#9AA6B2" />
      <rect x="216" y="110" width="40" height="5" rx="2.5" fill="#0B0F14" />
      <rect x="216" y="121" width="80" height="4" rx="2" fill="#9AA6B2" />
      <rect x="216" y="130" width="62" height="4" rx="2" fill="#9AA6B2" />
      <rect x="216" y="148" width="24" height="12" rx="6" fill="#0B0F14" />
      <rect x="244" y="148" width="30" height="12" rx="6" fill="#0B0F14" />
      <rect x="278" y="148" width="18" height="12" rx="6" fill="#0B0F14" />
    </svg>
  );
}
