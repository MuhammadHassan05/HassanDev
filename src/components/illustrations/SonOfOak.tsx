/**
 * Illustration for the Son of Oak project card, converted from
 * design-kit/illustrations/son-of-oak.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Son of Oak card. */
export function SonOfOakIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect className="fill-surface-2 stroke-line" x="40" y="18" width="280" height="164" rx="10" />
      <rect className="fill-line" x="56" y="34" width="120" height="132" rx="8" />
      <path
        className="fill-accent-ink"
        d="M116 62c-14 8-22 22-18 40 2 10 10 18 18 24 8-6 16-14 18-24 4-18-4-32-18-40z"
        fillOpacity="0.85"
      />
      <path className="stroke-surface" d="M116 70v66" strokeWidth="2" strokeLinecap="round" />
      <path
        className="stroke-surface"
        d="M116 92l-10-8M116 106l12-8M116 118l-9-7"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect className="fill-ink-2" x="192" y="40" width="96" height="10" rx="5" />
      <rect className="fill-accent-ink" x="192" y="58" width="44" height="8" rx="4" />
      <rect className="fill-line" x="192" y="80" width="112" height="5" rx="2.5" />
      <rect className="fill-line" x="192" y="90" width="100" height="5" rx="2.5" />
      <rect className="stroke-line" x="192" y="110" width="26" height="22" rx="5" />
      <rect className="stroke-accent-ink" x="224" y="110" width="26" height="22" rx="5" />
      <rect className="stroke-line" x="256" y="110" width="26" height="22" rx="5" />
      <rect className="fill-accent-ink" x="192" y="144" width="112" height="22" rx="11" />
      <text
        className="fill-surface"
        x="248"
        y="159"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        fontWeight="500"
      >
        Add to cart
      </text>
    </svg>
  );
}
