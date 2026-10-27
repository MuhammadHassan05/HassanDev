/**
 * Illustration for the Hoodays Streetwear project card, converted from
 * design-kit/illustrations/hoodays-streetwear.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Hoodays Streetwear card. */
export function HoodaysStreetwearIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <path
        className="draw-stroke"
        d="M140 52l22-16q18-8 36 0l22 16 44 22-14 40-22-8v76H132v-76l-22 8-14-40z"
        fill="#5B1A24"
        stroke="#2A0A10"
        strokeWidth="2"
        strokeLinejoin="round"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M162 36q18 34 36 0"
        stroke="#1A0508"
        strokeWidth="3"
        fill="#3A0E15"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M172 58v22M188 58v22"
        stroke="#1A0508"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M146 116q16-16 34-6t34-8"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
      />
      <circle className="fill-accent" cx="200" cy="122" r="3" />
      <path
        className="draw-stroke"
        d="M150 150h60l-6 22h-48z"
        stroke="#1A0508"
        strokeWidth="2"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  );
}
