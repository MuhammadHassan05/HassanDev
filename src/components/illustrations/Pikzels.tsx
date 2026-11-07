/**
 * Illustration for the Pikzels project card, converted from
 * design-kit/illustrations/pikzels.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Pikzels card. */
export function PikzelsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect className="fill-surface-2 stroke-line" x="40" y="20" width="280" height="30" rx="15" />
      <path className="fill-accent-ink" d="M58 35l3-7 3 7 7 3-7 3-3 7-3-7-7-3z" />
      <rect className="fill-line" x="78" y="32" width="140" height="6" rx="3" />
      <rect className="fill-accent-ink" x="262" y="26" width="50" height="18" rx="9" />
      <rect className="fill-line" x="40" y="64" width="134" height="76" rx="8" />
      <circle className="fill-line" cx="146" cy="104" r="20" />
      <rect className="fill-accent-ink" x="52" y="78" width="70" height="12" rx="3" />
      <rect className="fill-ink-2" x="52" y="96" width="50" height="12" rx="3" />
      <rect className="fill-line" x="186" y="64" width="134" height="76" rx="8" />
      <circle className="fill-line" cx="214" cy="104" r="20" />
      <rect className="fill-ink-2" x="240" y="80" width="68" height="12" rx="3" />
      <rect className="fill-ink-2" x="250" y="98" width="58" height="12" rx="3" />
      <rect className="fill-line stroke-line" x="40" y="152" width="62" height="34" rx="6" />
      <rect className="fill-line stroke-line" x="112" y="152" width="62" height="34" rx="6" />
      <rect className="fill-line stroke-line" x="186" y="152" width="62" height="34" rx="6" />
      <rect className="fill-line stroke-line" x="258" y="152" width="62" height="34" rx="6" />
    </svg>
  );
}
