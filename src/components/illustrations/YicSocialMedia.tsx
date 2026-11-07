/**
 * Illustration for the YIC Social Media project card, converted from
 * design-kit/illustrations/yic-social-media.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the YIC Social Media card. */
export function YicSocialMediaIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect
        className="fill-accent-ink"
        x="70"
        y="20"
        width="66"
        height="66"
        rx="8"
        fillOpacity="0.85"
      />
      <rect className="fill-line" x="146" y="20" width="66" height="66" rx="8" />
      <rect className="fill-line" x="222" y="20" width="66" height="66" rx="8" />
      <rect className="fill-line" x="70" y="96" width="66" height="66" rx="8" />
      <rect className="fill-ink-2" x="146" y="96" width="66" height="66" rx="8" fillOpacity="0.7" />
      <rect className="fill-line" x="222" y="96" width="66" height="66" rx="8" />
      <path
        className="stroke-line"
        d="M160 40h38M160 50h26"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle className="stroke-line" cx="255" cy="53" r="14" strokeWidth="3" />
      <path
        className="stroke-line"
        d="M90 116l14 14 14-14"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="stroke-line"
        d="M236 140l14-18 10 12 8-8 10 14"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="fill-accent-ink"
        d="M96 180c-6-5-10-8-10-12a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 4-4 7-10 12z"
      />
      <rect className="fill-line" x="114" y="172" width="40" height="6" rx="3" />
    </svg>
  );
}
