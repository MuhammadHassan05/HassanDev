/**
 * Illustration for the flatterlab.tech project card, converted from
 * design-kit/illustrations/flatterlab-tech.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the flatterlab.tech card. */
export function FlatterlabTechIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect className="fill-surface-2 stroke-line" x="58" y="34" width="112" height="132" rx="10" />
      <rect className="fill-line" x="72" y="50" width="40" height="6" rx="3" />
      <rect className="stroke-line" x="72" y="62" width="84" height="16" rx="4" />
      <rect className="fill-line" x="72" y="88" width="52" height="6" rx="3" />
      <rect className="stroke-accent-ink" x="72" y="100" width="84" height="16" rx="4" />
      <rect className="fill-accent-ink" x="72" y="128" width="84" height="22" rx="6" />
      <path
        className="stroke-line"
        d="M180 100h14m-6-6 6 6-6 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect className="fill-ink-2" x="204" y="22" width="104" height="156" rx="6" />
      <circle className="fill-line" cx="224" cy="44" r="10" />
      <rect className="fill-surface-2" x="240" y="38" width="50" height="6" rx="3" />
      <rect className="fill-line" x="240" y="48" width="34" height="4" rx="2" />
      <rect className="fill-accent-ink" x="216" y="66" width="80" height="3" rx="1.5" />
      <rect className="fill-line" x="216" y="78" width="80" height="4" rx="2" />
      <rect className="fill-line" x="216" y="87" width="68" height="4" rx="2" />
      <rect className="fill-line" x="216" y="96" width="74" height="4" rx="2" />
      <rect className="fill-surface-2" x="216" y="110" width="40" height="5" rx="2.5" />
      <rect className="fill-line" x="216" y="121" width="80" height="4" rx="2" />
      <rect className="fill-line" x="216" y="130" width="62" height="4" rx="2" />
      <rect className="fill-surface-2" x="216" y="148" width="24" height="12" rx="6" />
      <rect className="fill-surface-2" x="244" y="148" width="30" height="12" rx="6" />
      <rect className="fill-surface-2" x="278" y="148" width="18" height="12" rx="6" />
    </svg>
  );
}
