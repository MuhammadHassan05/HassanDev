/**
 * Illustration for the Hoodays Streetwear project card, converted from
 * design-kit/illustrations/hoodays-streetwear.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Hoodays Streetwear card. */
export function HoodaysStreetwearIllustration({ className }: IllustrationProps) {
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
        className="fill-accent-ink/40 stroke-surface"
        d="M140 52l22-16q18-8 36 0l22 16 44 22-14 40-22-8v76H132v-76l-22 8-14-40z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path className="stroke-surface fill-accent-ink/40" d="M162 36q18 34 36 0" strokeWidth="3" />
      <path
        className="stroke-surface"
        d="M172 58v22M188 58v22"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="stroke-accent-ink"
        d="M146 116q16-16 34-6t34-8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle className="fill-accent-ink" cx="200" cy="122" r="3" />
      <path
        className="stroke-surface"
        d="M150 150h60l-6 22h-48z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
