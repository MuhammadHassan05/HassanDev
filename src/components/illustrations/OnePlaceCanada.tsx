/**
 * Illustration for the OnePlace Canada project card, converted from
 * design-kit/illustrations/oneplace-canada.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the OnePlace Canada card. */
export function OnePlaceCanadaIllustration({ className }: IllustrationProps) {
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
        y="30"
        width="104"
        height="140"
        rx="12"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <path className="fill-accent" d="M92 54l-26 11 26 11 26-11z" fillOpacity="0.85" />
      <path
        className="stroke-accent draw-stroke"
        d="M74 70v12c0 4 8 7 18 7s18-3 18-7V70"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M118 65v14"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <rect x="56" y="104" width="72" height="6" rx="3" fill="#E8EDF2" />
      <rect x="56" y="118" width="54" height="5" rx="2.5" fill="#6B7785" />
      <rect x="56" y="130" width="62" height="5" rx="2.5" fill="#6B7785" />
      <rect className="fill-glow" x="56" y="146" width="40" height="12" rx="6" fillOpacity="0.4" />
      <path d="M144 100h12" stroke="#6B7785" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect
        className="stroke-accent draw-stroke"
        x="160"
        y="34"
        width="160"
        height="40"
        rx="10"
        fill="#111720"
        pathLength={1}
      />
      <rect x="172" y="44" width="90" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="172" y="58" width="80" height="5" rx="2.5" fill="#2A3542" />
      <rect className="fill-accent" x="172" y="58" width="80" height="5" rx="2.5" />
      <text x="266" y="63" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="9">
        match
      </text>
      <rect
        className="draw-stroke"
        x="160"
        y="80"
        width="160"
        height="40"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="172" y="90" width="70" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="172" y="104" width="80" height="5" rx="2.5" fill="#2A3542" />
      <rect x="172" y="104" width="46" height="5" rx="2.5" fill="#6B7785" />
      <text x="266" y="109" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="9">
        match
      </text>
      <rect
        className="draw-stroke"
        x="160"
        y="126"
        width="160"
        height="40"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="172" y="136" width="100" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="172" y="150" width="80" height="5" rx="2.5" fill="#2A3542" />
      <rect x="172" y="150" width="46" height="5" rx="2.5" fill="#6B7785" />
      <text x="266" y="155" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="9">
        match
      </text>
    </svg>
  );
}
