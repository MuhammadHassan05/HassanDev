/**
 * Illustration for the Al-Ghani Mart project card, converted from
 * design-kit/illustrations/al-ghani-mart.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Al-Ghani Mart card. */
export function AlGhaniMartIllustration({ className }: IllustrationProps) {
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
      <rect className="fill-accent" x="54" y="32" width="54" height="20" rx="10" />
      <rect
        className="draw-stroke"
        x="114"
        y="32"
        width="54"
        height="20"
        rx="10"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="174"
        y="32"
        width="54"
        height="20"
        rx="10"
        stroke="#2A3542"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M276 34h6l4 16h18l4-12h-24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <circle className="fill-accent" cx="290" cy="56" r="2" />
      <circle className="fill-accent" cx="302" cy="56" r="2" />
      <rect x="54" y="66" width="80" height="102" rx="8" fill="#1E2733" />
      <rect x="140" y="66" width="80" height="102" rx="8" fill="#1E2733" />
      <rect x="226" y="66" width="80" height="102" rx="8" fill="#1E2733" />
      <circle className="fill-glow" cx="94" cy="98" r="18" fillOpacity="0.6" />
      <circle className="fill-accent" cx="180" cy="98" r="18" fillOpacity="0.6" />
      <circle cx="266" cy="98" r="18" fill="#C3CCD5" fillOpacity="0.5" />
      <rect x="64" y="126" width="46" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="150" y="126" width="40" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="236" y="126" width="50" height="5" rx="2.5" fill="#9AA6B2" />
      <circle className="fill-accent" cx="116" cy="150" r="9" />
      <path
        className="draw-stroke"
        d="M112 150h8M116 146v8"
        stroke="#2A1A00"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <circle className="fill-accent" cx="202" cy="150" r="9" />
      <path
        className="draw-stroke"
        d="M198 150h8M202 146v8"
        stroke="#2A1A00"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <circle className="fill-accent" cx="288" cy="150" r="9" />
      <path
        className="draw-stroke"
        d="M284 150h8M288 146v8"
        stroke="#2A1A00"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}
