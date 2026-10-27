/**
 * Illustration for the ReDish CRM project card, converted from
 * design-kit/illustrations/redish-crm.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the ReDish CRM card. */
export function ReDishCrmIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <text x="40" y="34" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        Lead
      </text>
      <text x="144" y="34" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        Contacted
      </text>
      <text x="248" y="34" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        Won
      </text>
      <rect
        className="draw-stroke"
        x="36"
        y="42"
        width="92"
        height="140"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="140"
        y="42"
        width="92"
        height="140"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="244"
        y="42"
        width="92"
        height="140"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="44" y="52" width="76" height="34" rx="6" fill="#1E2733" />
      <rect x="44" y="94" width="76" height="34" rx="6" fill="#1E2733" />
      <rect x="44" y="136" width="76" height="34" rx="6" fill="#1E2733" />
      <rect
        className="stroke-accent draw-stroke"
        x="148"
        y="52"
        width="76"
        height="34"
        rx="6"
        fill="#1E2733"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M210 58l-6 10h6l-4 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="148" y="94" width="76" height="34" rx="6" fill="#1E2733" />
      <rect
        className="fill-accent"
        x="252"
        y="52"
        width="76"
        height="34"
        rx="6"
        fillOpacity="0.85"
      />
      <rect x="52" y="60" width="44" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="52" y="102" width="52" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="52" y="144" width="38" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="156" y="60" width="40" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="156" y="102" width="50" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="260" y="60" width="48" height="5" rx="2.5" fill="#2A1A00" />
    </svg>
  );
}
