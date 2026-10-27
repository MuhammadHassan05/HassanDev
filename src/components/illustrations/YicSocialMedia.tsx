/**
 * Illustration for the YIC Social Media project card, converted from
 * design-kit/illustrations/yic-social-media.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the YIC Social Media card. */
export function YicSocialMediaIllustration({ className }: IllustrationProps) {
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
        className="fill-accent"
        x="70"
        y="20"
        width="66"
        height="66"
        rx="8"
        fillOpacity="0.85"
      />
      <rect x="146" y="20" width="66" height="66" rx="8" fill="#1E2733" />
      <rect x="222" y="20" width="66" height="66" rx="8" fill="#1E2733" />
      <rect x="70" y="96" width="66" height="66" rx="8" fill="#1E2733" />
      <rect className="fill-glow" x="146" y="96" width="66" height="66" rx="8" fillOpacity="0.7" />
      <rect x="222" y="96" width="66" height="66" rx="8" fill="#1E2733" />
      <path
        className="draw-stroke"
        d="M160 40h38M160 50h26"
        stroke="#9AA6B2"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
      />
      <circle
        className="draw-stroke"
        cx="255"
        cy="53"
        r="14"
        stroke="#9AA6B2"
        strokeWidth="3"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M90 116l14 14 14-14"
        stroke="#9AA6B2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M236 140l14-18 10 12 8-8 10 14"
        stroke="#9AA6B2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <path
        className="fill-accent"
        d="M96 180c-6-5-10-8-10-12a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 4-4 7-10 12z"
      />
      <rect x="114" y="172" width="40" height="6" rx="3" fill="#6B7785" />
    </svg>
  );
}
