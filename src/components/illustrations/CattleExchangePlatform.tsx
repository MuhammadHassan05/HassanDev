/**
 * Illustration for the Cattle Exchange Platform project card, converted from
 * design-kit/illustrations/cattle-exchange-platform.svg. Colours come from the
 * theme tokens.
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
      <rect className="fill-surface-2 stroke-line" x="36" y="22" width="150" height="156" rx="10" />
      <text
        className="fill-line"
        x="50"
        y="44"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        market price
      </text>
      <path
        className="stroke-accent-ink"
        d="M50 140l24-18 20 8 22-30 20 10 30-40"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path className="stroke-line" d="M50 150h122" />
      <circle className="fill-accent-ink" cx="166" cy="70" r="4" />
      <rect className="fill-surface-2 stroke-line" x="198" y="22" width="126" height="46" rx="10" />
      <rect
        className="stroke-accent-ink fill-surface-2"
        x="198"
        y="77"
        width="126"
        height="46"
        rx="10"
      />
      <rect
        className="fill-surface-2 stroke-line"
        x="198"
        y="132"
        width="126"
        height="46"
        rx="10"
      />
      <rect className="fill-line" x="208" y="31" width="28" height="28" rx="6" />
      <rect className="fill-line" x="208" y="86" width="28" height="28" rx="6" />
      <rect className="fill-line" x="208" y="141" width="28" height="28" rx="6" />
      <rect className="fill-line" x="246" y="36" width="56" height="5" rx="2.5" />
      <rect className="fill-line" x="246" y="48" width="30" height="6" rx="3" />
      <rect className="fill-ink-2" x="246" y="91" width="50" height="5" rx="2.5" />
      <rect className="fill-accent-ink" x="246" y="103" width="30" height="6" rx="3" />
      <rect className="fill-line" x="246" y="146" width="60" height="5" rx="2.5" />
      <rect className="fill-line" x="246" y="158" width="30" height="6" rx="3" />
    </svg>
  );
}
