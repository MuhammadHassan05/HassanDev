/**
 * Illustration for the ReDish CRM project card, converted from
 * design-kit/illustrations/redish-crm.svg. Colours come from the
 * theme tokens.
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
      <text
        className="fill-line"
        x="40"
        y="34"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        Lead
      </text>
      <text
        className="fill-line"
        x="144"
        y="34"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        Contacted
      </text>
      <text
        className="fill-line"
        x="248"
        y="34"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        Won
      </text>
      <rect className="fill-surface-2 stroke-line" x="36" y="42" width="92" height="140" rx="10" />
      <rect className="fill-surface-2 stroke-line" x="140" y="42" width="92" height="140" rx="10" />
      <rect className="fill-surface-2 stroke-line" x="244" y="42" width="92" height="140" rx="10" />
      <rect className="fill-line" x="44" y="52" width="76" height="34" rx="6" />
      <rect className="fill-line" x="44" y="94" width="76" height="34" rx="6" />
      <rect className="fill-line" x="44" y="136" width="76" height="34" rx="6" />
      <rect className="stroke-accent-ink fill-line" x="148" y="52" width="76" height="34" rx="6" />
      <path
        className="stroke-accent-ink"
        d="M210 58l-6 10h6l-4 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect className="fill-line" x="148" y="94" width="76" height="34" rx="6" />
      <rect
        className="fill-accent-ink"
        x="252"
        y="52"
        width="76"
        height="34"
        rx="6"
        fillOpacity="0.85"
      />
      <rect className="fill-line" x="52" y="60" width="44" height="5" rx="2.5" />
      <rect className="fill-line" x="52" y="102" width="52" height="5" rx="2.5" />
      <rect className="fill-line" x="52" y="144" width="38" height="5" rx="2.5" />
      <rect className="fill-ink-2" x="156" y="60" width="40" height="5" rx="2.5" />
      <rect className="fill-line" x="156" y="102" width="50" height="5" rx="2.5" />
      <rect className="fill-surface" x="260" y="60" width="48" height="5" rx="2.5" />
    </svg>
  );
}
