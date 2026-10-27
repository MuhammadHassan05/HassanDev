/**
 * Illustration for the Tiny Owlets project card, converted from
 * design-kit/illustrations/tiny-owlets.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Tiny Owlets card. */
export function TinyOwletsIllustration({ className }: IllustrationProps) {
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
        x="32"
        y="26"
        width="176"
        height="150"
        rx="12"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <text x="48" y="48" fill="#E8EDF2" fontFamily="JetBrains Mono, monospace" fontSize="11">
        Your cart
      </text>
      <rect x="48" y="60" width="28" height="28" rx="5" fill="#1E2733" />
      <rect x="84" y="64" width="60" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="84" y="76" width="30" height="5" rx="2.5" fill="#6B7785" />
      <rect
        className="draw-stroke"
        x="148"
        y="64"
        width="44"
        height="20"
        rx="10"
        stroke="#2A3542"
        pathLength={1}
      />
      <text x="155" y="78" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        - 1 +
      </text>
      <rect x="48" y="98" width="28" height="28" rx="5" fill="#1E2733" />
      <rect x="84" y="102" width="52" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="84" y="114" width="30" height="5" rx="2.5" fill="#6B7785" />
      <rect
        className="draw-stroke"
        x="148"
        y="102"
        width="44"
        height="20"
        rx="10"
        stroke="#2A3542"
        pathLength={1}
      />
      <text x="155" y="116" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        - 2 +
      </text>
      <rect className="fill-accent" x="48" y="140" width="144" height="24" rx="12" />
      <text
        x="120"
        y="156"
        textAnchor="middle"
        fill="#2A1A00"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        fontWeight="500"
      >
        Place Order
      </text>
      <rect
        className="draw-stroke"
        x="222"
        y="48"
        width="114"
        height="44"
        rx="12"
        fill="#1E2733"
        stroke="#2A3542"
        pathLength={1}
      />
      <circle
        className="stroke-accent draw-stroke"
        cx="240"
        cy="70"
        r="8"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M236 70l3 3 5-5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <text x="254" y="67" fill="#E8EDF2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        Order placed
      </text>
      <text x="254" y="80" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="9">
        via WhatsApp
      </text>
      <rect
        className="draw-stroke"
        x="222"
        y="104"
        width="114"
        height="44"
        rx="12"
        fill="#1E2733"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="stroke-accent draw-stroke"
        x="233"
        y="119"
        width="16"
        height="12"
        rx="2"
        strokeWidth="1.8"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M233 120l8 6 8-6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        pathLength={1}
      />
      <text x="254" y="123" fill="#E8EDF2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        Confirmed
      </text>
      <text x="254" y="136" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="9">
        email sent
      </text>
    </svg>
  );
}
