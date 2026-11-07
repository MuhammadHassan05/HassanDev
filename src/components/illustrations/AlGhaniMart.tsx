/**
 * Illustration for the Al-Ghani Mart project card, converted from
 * design-kit/illustrations/al-ghani-mart.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Al-Ghani Mart card. */
export function AlGhaniMartIllustration({ className }: IllustrationProps) {
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
      <rect className="fill-accent-ink" x="54" y="32" width="54" height="20" rx="10" />
      <rect className="stroke-line" x="114" y="32" width="54" height="20" rx="10" />
      <rect className="stroke-line" x="174" y="32" width="54" height="20" rx="10" />
      <path
        className="stroke-accent-ink"
        d="M276 34h6l4 16h18l4-12h-24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="fill-accent-ink" cx="290" cy="56" r="2" />
      <circle className="fill-accent-ink" cx="302" cy="56" r="2" />
      <rect className="fill-line" x="54" y="66" width="80" height="102" rx="8" />
      <rect className="fill-line" x="140" y="66" width="80" height="102" rx="8" />
      <rect className="fill-line" x="226" y="66" width="80" height="102" rx="8" />
      <circle className="fill-ink-2" cx="94" cy="98" r="18" fillOpacity="0.6" />
      <circle className="fill-accent-ink" cx="180" cy="98" r="18" fillOpacity="0.6" />
      <circle className="fill-ink-2" cx="266" cy="98" r="18" fillOpacity="0.5" />
      <rect className="fill-line" x="64" y="126" width="46" height="5" rx="2.5" />
      <rect className="fill-line" x="150" y="126" width="40" height="5" rx="2.5" />
      <rect className="fill-line" x="236" y="126" width="50" height="5" rx="2.5" />
      <circle className="fill-accent-ink" cx="116" cy="150" r="9" />
      <path
        className="stroke-surface"
        d="M112 150h8M116 146v8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle className="fill-accent-ink" cx="202" cy="150" r="9" />
      <path
        className="stroke-surface"
        d="M198 150h8M202 146v8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle className="fill-accent-ink" cx="288" cy="150" r="9" />
      <path
        className="stroke-surface"
        d="M284 150h8M288 146v8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
