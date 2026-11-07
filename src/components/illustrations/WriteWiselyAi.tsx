/**
 * Illustration for the WriteWisely AI project card, converted from
 * design-kit/illustrations/writewisely-ai.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the WriteWisely AI card. */
export function WriteWiselyAiIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect className="fill-surface-2 stroke-line" x="40" y="20" width="200" height="160" rx="10" />
      <rect className="fill-ink-2" x="56" y="38" width="90" height="8" rx="4" />
      <rect className="fill-line" x="56" y="60" width="164" height="5" rx="2.5" />
      <rect className="fill-line" x="56" y="72" width="150" height="5" rx="2.5" />
      <rect
        className="fill-accent-ink"
        x="54"
        y="82"
        width="140"
        height="11"
        rx="3"
        fillOpacity="0.22"
      />
      <rect className="fill-ink-2" x="56" y="85" width="132" height="5" rx="2.5" />
      <rect className="fill-line" x="56" y="98" width="158" height="5" rx="2.5" />
      <rect className="fill-line" x="56" y="110" width="120" height="5" rx="2.5" />
      <rect className="fill-line" x="56" y="130" width="160" height="5" rx="2.5" />
      <rect className="fill-line" x="56" y="142" width="96" height="5" rx="2.5" />
      <path className="stroke-accent-ink" d="M194 88h22" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect
        className="stroke-accent-ink fill-line"
        x="216"
        y="64"
        width="112"
        height="76"
        rx="12"
      />
      <path className="fill-accent-ink" d="M232 82l2.5-6 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5z" />
      <text
        className="fill-ink-2"
        x="248"
        y="88"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        Rewrite
      </text>
      <rect className="fill-line" x="228" y="100" width="88" height="5" rx="2.5" />
      <rect className="fill-line" x="228" y="110" width="70" height="5" rx="2.5" />
      <rect className="fill-accent-ink" x="228" y="122" width="40" height="10" rx="5" />
    </svg>
  );
}
