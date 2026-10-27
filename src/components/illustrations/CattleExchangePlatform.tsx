/**
 * Illustration for the Cattle Exchange Platform project card, converted from
 * design-kit/illustrations/cattle-exchange-platform.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Cattle Exchange Platform card. */
export function CattleExchangePlatformIllustration({ className }: IllustrationProps) {
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
        x="36"
        y="22"
        width="150"
        height="156"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <text x="50" y="44" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        market price
      </text>
      <path
        className="stroke-accent draw-stroke"
        d="M50 140l24-18 20 8 22-30 20 10 30-40"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <path className="draw-stroke" d="M50 150h122" stroke="#2A3542" pathLength={1} />
      <circle className="fill-accent" cx="166" cy="70" r="4" />
      <rect
        className="draw-stroke"
        x="198"
        y="22"
        width="126"
        height="46"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="stroke-accent draw-stroke"
        x="198"
        y="77"
        width="126"
        height="46"
        rx="10"
        fill="#111720"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="198"
        y="132"
        width="126"
        height="46"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="208" y="31" width="28" height="28" rx="6" fill="#1E2733" />
      <rect x="208" y="86" width="28" height="28" rx="6" fill="#1E2733" />
      <rect x="208" y="141" width="28" height="28" rx="6" fill="#1E2733" />
      <rect x="246" y="36" width="56" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="246" y="48" width="30" height="6" rx="3" fill="#6B7785" />
      <rect x="246" y="91" width="50" height="5" rx="2.5" fill="#E8EDF2" />
      <rect className="fill-accent" x="246" y="103" width="30" height="6" rx="3" />
      <rect x="246" y="146" width="60" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="246" y="158" width="30" height="6" rx="3" fill="#6B7785" />
    </svg>
  );
}
