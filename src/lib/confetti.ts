/**
 * Generates the confetti pieces for the terminal's easter egg. Randomness is
 * injected so the output is testable.
 */

/** Theme color of a piece: track accent, track glow, or the page's white. */
export type ConfettiColor = "accent" | "glow" | "ink";

/** Which falling path a piece takes (three CSS keyframes in globals.css). */
export type ConfettiPath = "a" | "b" | "c";

/** One piece of confetti. */
export interface ConfettiPiece {
  /** Horizontal start, as a percentage of the page width. */
  left: number;
  width: number;
  height: number;
  color: ConfettiColor;
  path: ConfettiPath;
  /** Fall time and start delay, in seconds. */
  duration: number;
  delay: number;
}

/** Pieces per burst, as in the design. */
export const CONFETTI_COUNT = 48;

/** Longest a piece can take to land (max delay plus max duration), in ms. */
export const CONFETTI_LIFETIME_MS = 4000;

const COLORS: readonly ConfettiColor[] = ["accent", "glow", "ink"];
const PATHS: readonly ConfettiPath[] = ["a", "b", "c"];

/** Rounds to two decimals, so the generated CSS stays short. */
const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Creates a burst. Sizes and timings use the design's ranges: 6–12px wide,
 * 10–18px tall, 1.8–3.2s falls, up to 0.5s delay. Colors and paths cycle.
 *
 * @param random - Returns numbers in [0, 1); Math.random in the browser.
 * @param count - Number of pieces.
 */
export function createConfetti(
  random: () => number,
  count: number = CONFETTI_COUNT,
): ConfettiPiece[] {
  return Array.from({ length: count }, (_, index) => ({
    left: round(random() * 100),
    width: Math.round(6 + random() * 6),
    height: Math.round(10 + random() * 8),
    color: COLORS[index % COLORS.length] ?? "accent",
    path: PATHS[index % PATHS.length] ?? "a",
    duration: round(1.8 + random() * 1.4),
    delay: round(random() * 0.5),
  }));
}
