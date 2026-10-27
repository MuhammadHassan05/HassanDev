/**
 * Illustration for the Shopify to Galaxy Middleware project card, converted from
 * design-kit/illustrations/shopify-to-galaxy-middleware.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Shopify to Galaxy Middleware card. */
export function ShopifyToGalaxyMiddlewareIllustration({ className }: IllustrationProps) {
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
        className="stroke-accent"
        d="M110 100h25M225 100h25"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <rect
        className="draw-stroke"
        x="20"
        y="68"
        width="90"
        height="64"
        rx="12"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="stroke-accent draw-stroke"
        x="135"
        y="68"
        width="90"
        height="64"
        rx="12"
        fill="#111720"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="250"
        y="68"
        width="90"
        height="64"
        rx="12"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="50"
        y="88"
        width="30"
        height="24"
        rx="3"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M57 88v-3a8 8 0 0 1 16 0v3"
        stroke="#C3CCD5"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M168 100a12 12 0 0 1 22-7"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M192 100a12 12 0 0 1-22 7"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M191 87v6h-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <path
        className="stroke-accent draw-stroke"
        d="M169 113v-6h6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <ellipse
        className="draw-stroke"
        cx="295"
        cy="88"
        rx="16"
        ry="5"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M279 88v22a16 5 0 0 0 32 0V88"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M279 99a16 5 0 0 0 32 0"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <text
        x="65"
        y="154"
        textAnchor="middle"
        fill="#9AA6B2"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        Shopify
      </text>
      <text
        x="180"
        y="154"
        textAnchor="middle"
        fill="#9AA6B2"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        Middleware
      </text>
      <text
        x="295"
        y="154"
        textAnchor="middle"
        fill="#9AA6B2"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        Galaxy
      </text>
    </svg>
  );
}
