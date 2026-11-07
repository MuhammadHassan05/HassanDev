/**
 * Illustration for the Shopify to Galaxy Middleware project card, converted from
 * design-kit/illustrations/shopify-to-galaxy-middleware.svg. Colours come from the
 * theme tokens.
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
        className="stroke-accent-ink"
        d="M110 100h25M225 100h25"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <rect className="fill-surface-2 stroke-line" x="20" y="68" width="90" height="64" rx="12" />
      <rect
        className="stroke-accent-ink fill-surface-2"
        x="135"
        y="68"
        width="90"
        height="64"
        rx="12"
      />
      <rect className="fill-surface-2 stroke-line" x="250" y="68" width="90" height="64" rx="12" />
      <rect className="stroke-ink-2" x="50" y="88" width="30" height="24" rx="3" strokeWidth="2" />
      <path
        className="stroke-ink-2"
        d="M57 88v-3a8 8 0 0 1 16 0v3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="stroke-accent-ink"
        d="M168 100a12 12 0 0 1 22-7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="stroke-accent-ink"
        d="M192 100a12 12 0 0 1-22 7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="stroke-accent-ink"
        d="M191 87v6h-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="stroke-accent-ink"
        d="M169 113v-6h6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse className="stroke-ink-2" cx="295" cy="88" rx="16" ry="5" strokeWidth="2" />
      <path className="stroke-ink-2" d="M279 88v22a16 5 0 0 0 32 0V88" strokeWidth="2" />
      <path className="stroke-ink-2" d="M279 99a16 5 0 0 0 32 0" strokeWidth="2" />
      <text
        className="fill-line"
        x="65"
        y="154"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        Shopify
      </text>
      <text
        className="fill-line"
        x="180"
        y="154"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        Middleware
      </text>
      <text
        className="fill-line"
        x="295"
        y="154"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        Galaxy
      </text>
    </svg>
  );
}
