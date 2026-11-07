/**
 * Illustration for the Tevar Identity project card, converted from
 * design-kit/illustrations/tevar-identity.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Tevar Identity card. */
export function TevarIdentityIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <g transform="skewX(-8) translate(14 0)">
        <path className="fill-ink-2" d="M92 50h44l-6 14h-12l-10 62h-14l10-62H86z" />
        <path
          className="fill-ink-2"
          d="M144 50h40l-4 12h-26l-3 14h22l-3 12h-22l-3 16h28l-4 12h-42z"
        />
        <path className="fill-ink-2" d="M194 50h14l6 52 18-52h15l-30 76h-12z" />
        <path className="fill-ink-2" d="M250 126l4-18h18l3 18h14l-12-76h-14l-30 76z" />
        <path
          className="stroke-accent-ink"
          d="M100 136h170"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <rect className="fill-surface-2 stroke-line" x="112" y="160" width="28" height="28" rx="6" />
      <rect className="fill-ink-2" x="148" y="160" width="28" height="28" rx="6" />
      <circle className="fill-surface-2 stroke-accent-ink" cx="198" cy="174" r="14" />
      <path className="fill-accent-ink" d="M120 178l6-12h6l-6 12z" />
      <path className="fill-surface-2" d="M156 178l6-12h6l-6 12z" />
      <path className="fill-accent-ink" d="M193 180l5-12h5l-5 12z" />
    </svg>
  );
}
