/**
 * Illustration for the Son of Oak project card, converted from
 * design-kit/illustrations/son-of-oak.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Son of Oak card. */
export function SonOfOakIllustration({ className }: IllustrationProps) {
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
        x="40"
        y="18"
        width="280"
        height="164"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="56" y="34" width="120" height="132" rx="8" fill="#1E2733" />
      <path
        className="fill-accent"
        d="M116 62c-14 8-22 22-18 40 2 10 10 18 18 24 8-6 16-14 18-24 4-18-4-32-18-40z"
        fillOpacity="0.85"
      />
      <path
        className="draw-stroke"
        d="M116 70v66"
        stroke="#2A1A00"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M116 92l-10-8M116 106l12-8M116 118l-9-7"
        stroke="#2A1A00"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={1}
      />
      <rect x="192" y="40" width="96" height="10" rx="5" fill="#E8EDF2" />
      <rect className="fill-accent" x="192" y="58" width="44" height="8" rx="4" />
      <rect x="192" y="80" width="112" height="5" rx="2.5" fill="#6B7785" />
      <rect x="192" y="90" width="100" height="5" rx="2.5" fill="#6B7785" />
      <rect
        className="draw-stroke"
        x="192"
        y="110"
        width="26"
        height="22"
        rx="5"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="stroke-accent draw-stroke"
        x="224"
        y="110"
        width="26"
        height="22"
        rx="5"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="256"
        y="110"
        width="26"
        height="22"
        rx="5"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect className="fill-accent" x="192" y="144" width="112" height="22" rx="11" />
      <text
        x="248"
        y="159"
        textAnchor="middle"
        fill="#2A1A00"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        fontWeight="500"
      >
        Add to cart
      </text>
    </svg>
  );
}
