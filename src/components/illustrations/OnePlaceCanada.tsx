/**
 * Illustration for the OnePlace Canada project card, converted from
 * design-kit/illustrations/oneplace-canada.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the OnePlace Canada card. */
export function OnePlaceCanadaIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect className="fill-surface-2 stroke-line" x="40" y="30" width="104" height="140" rx="12" />
      <path className="fill-accent-ink" d="M92 54l-26 11 26 11 26-11z" fillOpacity="0.85" />
      <path className="stroke-accent-ink" d="M74 70v12c0 4 8 7 18 7s18-3 18-7V70" strokeWidth="2" />
      <path className="stroke-accent-ink" d="M118 65v14" strokeWidth="2" strokeLinecap="round" />
      <rect className="fill-ink-2" x="56" y="104" width="72" height="6" rx="3" />
      <rect className="fill-line" x="56" y="118" width="54" height="5" rx="2.5" />
      <rect className="fill-line" x="56" y="130" width="62" height="5" rx="2.5" />
      <rect className="fill-ink-2" x="56" y="146" width="40" height="12" rx="6" fillOpacity="0.4" />
      <path className="stroke-line" d="M144 100h12" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect
        className="stroke-accent-ink fill-surface-2"
        x="160"
        y="34"
        width="160"
        height="40"
        rx="10"
      />
      <rect className="fill-ink-2" x="172" y="44" width="90" height="5" rx="2.5" />
      <rect className="fill-line" x="172" y="58" width="80" height="5" rx="2.5" />
      <rect className="fill-accent-ink" x="172" y="58" width="80" height="5" rx="2.5" />
      <text
        className="fill-line"
        x="266"
        y="63"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
      >
        match
      </text>
      <rect className="fill-surface-2 stroke-line" x="160" y="80" width="160" height="40" rx="10" />
      <rect className="fill-ink-2" x="172" y="90" width="70" height="5" rx="2.5" />
      <rect className="fill-line" x="172" y="104" width="80" height="5" rx="2.5" />
      <rect className="fill-line" x="172" y="104" width="46" height="5" rx="2.5" />
      <text
        className="fill-line"
        x="266"
        y="109"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
      >
        match
      </text>
      <rect
        className="fill-surface-2 stroke-line"
        x="160"
        y="126"
        width="160"
        height="40"
        rx="10"
      />
      <rect className="fill-ink-2" x="172" y="136" width="100" height="5" rx="2.5" />
      <rect className="fill-line" x="172" y="150" width="80" height="5" rx="2.5" />
      <rect className="fill-line" x="172" y="150" width="46" height="5" rx="2.5" />
      <text
        className="fill-line"
        x="266"
        y="155"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
      >
        match
      </text>
    </svg>
  );
}
