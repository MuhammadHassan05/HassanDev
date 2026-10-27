/**
 * Illustration for the CNN vs Transformer Drone Detection project card, converted from
 * design-kit/illustrations/cnn-vs-transformer-drone-detection.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the CNN vs Transformer Drone Detection card. */
export function CnnVsTransformerDroneDetectionIllustration({ className }: IllustrationProps) {
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
        className="draw-stroke"
        d="M40 0v200M80 0v200M120 0v200M160 0v200M200 0v200M240 0v200M280 0v200M320 0v200M0 40h360M0 80h360M0 120h360M0 160h360"
        stroke="#1E2733"
        pathLength={1}
      />
      <path
        className="draw-stroke"
        d="M165 92 145 78M175 92l20-14M165 98l-20 14M175 98l20 14"
        stroke="#C3CCD5"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
      />
      <rect x="160" y="89" width="20" height="12" rx="3" fill="#C3CCD5" />
      <ellipse
        className="draw-stroke"
        cx="145"
        cy="76"
        rx="12"
        ry="3"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <ellipse
        className="draw-stroke"
        cx="195"
        cy="76"
        rx="12"
        ry="3"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <ellipse
        className="draw-stroke"
        cx="145"
        cy="114"
        rx="12"
        ry="3"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <ellipse
        className="draw-stroke"
        cx="195"
        cy="114"
        rx="12"
        ry="3"
        stroke="#C3CCD5"
        strokeWidth="2"
        pathLength={1}
      />
      <rect
        className="stroke-accent draw-stroke"
        x="124"
        y="64"
        width="92"
        height="62"
        strokeWidth="2"
        pathLength={1}
      />
      <rect className="fill-accent" x="123" y="48" width="52" height="16" />
      <text
        x="130"
        y="60"
        fill="#06210F"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        fontWeight="500"
      >
        drone
      </text>
      <path
        className="draw-stroke"
        d="M276 48l-8-5M284 48l8-5M276 54l-8 5M284 54l8 5"
        stroke="#6B7785"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={1}
      />
      <rect x="276" y="47" width="8" height="8" rx="2" fill="#6B7785" />
      <rect
        x="260"
        y="36"
        width="40"
        height="30"
        stroke="#6B7785"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
}
