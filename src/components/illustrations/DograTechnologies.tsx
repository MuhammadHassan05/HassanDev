/**
 * Illustration for the Dogra Technologies project card, converted from
 * design-kit/illustrations/dogra-technologies.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Dogra Technologies card. */
export function DograTechnologiesIllustration({ className }: IllustrationProps) {
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
        y="26"
        width="156"
        height="148"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <text x="50" y="48" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        demand
      </text>
      <path
        className="stroke-glow draw-stroke"
        d="M50 140c14-4 20-30 34-30s18 22 32 18 16-50 30-52 18 14 30 10"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
      />
      <path className="draw-stroke" d="M50 150h128" stroke="#2A3542" pathLength={1} />
      <path
        className="stroke-accent"
        d="M50 128c14-2 20-18 34-18s18 14 32 12 16-34 30-36 18 10 30 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <text x="132" y="164" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="9">
        price
      </text>
      <rect
        className="stroke-accent draw-stroke"
        x="200"
        y="26"
        width="124"
        height="148"
        rx="10"
        fill="#111720"
        pathLength={1}
      />
      <text x="212" y="46" fill="#E8EDF2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        Menu
      </text>
      <rect x="210" y="58" width="20" height="20" rx="5" fill="#1E2733" />
      <rect x="238" y="62" width="38" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="238" y="71" width="24" height="4" rx="2" fill="#6B7785" />
      <path
        className="stroke-accent draw-stroke"
        d="M300 72l5-6 5 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="210" y="88" width="20" height="20" rx="5" fill="#1E2733" />
      <rect x="238" y="92" width="38" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="238" y="101" width="24" height="4" rx="2" fill="#6B7785" />
      <path
        className="stroke-glow draw-stroke"
        d="M300 95l5 6 5-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="210" y="118" width="20" height="20" rx="5" fill="#1E2733" />
      <rect x="238" y="122" width="38" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="238" y="131" width="24" height="4" rx="2" fill="#6B7785" />
      <path
        className="stroke-accent draw-stroke"
        d="M300 132l5-6 5 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="210" y="148" width="20" height="20" rx="5" fill="#1E2733" />
      <rect x="238" y="152" width="38" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="238" y="161" width="24" height="4" rx="2" fill="#6B7785" />
      <path
        className="stroke-accent draw-stroke"
        d="M300 162l5-6 5 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  );
}
