/**
 * Illustration for the VTEST project card, converted from
 * design-kit/illustrations/vtest.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the VTEST card. */
export function VtestIllustration({ className }: IllustrationProps) {
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
        y="22"
        width="280"
        height="156"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <text x="58" y="46" fill="#E8EDF2" fontFamily="JetBrains Mono, monospace" fontSize="11">
        Agentic QA run
      </text>
      <path className="fill-accent" d="M180 36l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" />
      <path className="draw-stroke" d="M40 58h280" stroke="#2A3542" pathLength={1} />
      <circle
        className="stroke-accent draw-stroke"
        cx="66"
        cy="78"
        r="8"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M62 78l3 3 5-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="84" y="75" width="150" height="6" rx="3" fill="#9AA6B2" />
      <rect
        className="fill-accent"
        x="262"
        y="70"
        width="40"
        height="16"
        rx="8"
        fillOpacity="0.2"
      />
      <text
        className="fill-accent"
        x="271"
        y="82"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
      >
        pass
      </text>
      <circle
        className="stroke-accent draw-stroke"
        cx="66"
        cy="104"
        r="8"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M62 104l3 3 5-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="84" y="101" width="120" height="6" rx="3" fill="#9AA6B2" />
      <rect
        className="fill-accent"
        x="262"
        y="96"
        width="40"
        height="16"
        rx="8"
        fillOpacity="0.2"
      />
      <text
        className="fill-accent"
        x="271"
        y="108"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
      >
        pass
      </text>
      <circle
        className="stroke-accent draw-stroke"
        cx="66"
        cy="130"
        r="8"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M62 130l3 3 5-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect x="84" y="127" width="164" height="6" rx="3" fill="#9AA6B2" />
      <rect
        className="fill-accent"
        x="262"
        y="122"
        width="40"
        height="16"
        rx="8"
        fillOpacity="0.2"
      />
      <text
        className="fill-accent"
        x="271"
        y="134"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
      >
        pass
      </text>
      <circle
        className="stroke-glow"
        cx="66"
        cy="156"
        r="8"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <rect x="84" y="153" width="104" height="6" rx="3" fill="#9AA6B2" />
      <text
        className="fill-glow"
        x="262"
        y="160"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
      >
        running
      </text>
    </svg>
  );
}
