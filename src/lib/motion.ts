/**
 * Motion helpers shared by the interactive features: media-query checks and
 * the tilt maths. The browser is passed in, so everything here is testable
 * without a DOM and safe to call during prerendering (no window).
 */

/** The part of `window` the media-query checks need. */
export type MediaEnv = Pick<Window, "matchMedia"> | undefined;

/** Media query for users who asked the system for less motion. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Media query for a mouse or trackpad: hover exists and the pointer is precise. */
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/** Runs a media query, treating a missing window or matchMedia as "no match". */
function matches(env: MediaEnv, query: string): boolean {
  return typeof env?.matchMedia === "function" && env.matchMedia(query).matches;
}

/**
 * Whether the user prefers reduced motion.
 *
 * @param env - Usually `window`; undefined while prerendering.
 */
export function prefersReducedMotion(env: MediaEnv): boolean {
  return matches(env, REDUCED_MOTION_QUERY);
}

/**
 * Whether the primary pointer can hover precisely (mouse or trackpad, not touch).
 *
 * @param env - Usually `window`; undefined while prerendering.
 */
export function hasFinePointer(env: MediaEnv): boolean {
  return matches(env, FINE_POINTER_QUERY);
}

/**
 * Whether decorative motion may run at all.
 *
 * @param env - Usually `window`; undefined while prerendering.
 */
export function motionAllowed(env: MediaEnv): boolean {
  return env !== undefined && !prefersReducedMotion(env);
}

/**
 * Whether pointer-driven effects such as card tilt may run: motion is allowed
 * and the pointer is a precise, hovering one.
 *
 * @param env - Usually `window`; undefined while prerendering.
 */
export function canTilt(env: MediaEnv): boolean {
  return motionAllowed(env) && hasFinePointer(env);
}

/**
 * Whether the page can observe elements entering the viewport.
 *
 * @param env - Usually `window`.
 */
export function supportsIntersectionObserver(env: object | undefined): boolean {
  return env !== undefined && "IntersectionObserver" in env;
}

/**
 * Whether the browser implements same-document View Transitions.
 *
 * @param doc - Usually `document`.
 */
export function supportsViewTransitions(doc: object | undefined): boolean {
  return (
    doc !== undefined &&
    typeof (doc as { startViewTransition?: unknown }).startViewTransition === "function"
  );
}

/** A card's position and size, as from getBoundingClientRect(). */
export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** How far to tilt a card and where to centre its light glint. */
export interface Tilt {
  /** Degrees around the horizontal axis; positive tips the top edge back. */
  rotateX: number;
  /** Degrees around the vertical axis; positive turns the right edge back. */
  rotateY: number;
  /** Glint centre as a percentage of the card's width and height. */
  glintX: number;
  glintY: number;
}

/** Largest tilt, in degrees, at the card's edges. Values from the design. */
export const MAX_TILT_X = 2.5;
export const MAX_TILT_Y = 3.5;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Tilts a card toward the pointer: the edge nearest the pointer dips toward
 * the viewer. The pointer is clamped to the card, so the tilt never exceeds
 * MAX_TILT_X / MAX_TILT_Y.
 *
 * @param clientX - Pointer x in viewport pixels.
 * @param clientY - Pointer y in viewport pixels.
 * @param box - The card's bounding box.
 */
export function tiltFromPointer(clientX: number, clientY: number, box: Box): Tilt {
  const x = box.width > 0 ? clamp01((clientX - box.left) / box.width) : 0.5;
  const y = box.height > 0 ? clamp01((clientY - box.top) / box.height) : 0.5;
  return {
    rotateX: (0.5 - y) * 2 * MAX_TILT_X,
    rotateY: (x - 0.5) * 2 * MAX_TILT_Y,
    glintX: x * 100,
    glintY: y * 100,
  };
}

/**
 * CSS transform for a tilt; the card also lifts 4px, as in the design.
 *
 * @param tilt - Result of {@link tiltFromPointer}.
 */
export function tiltTransform(tilt: Tilt): string {
  return `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateY(-4px)`;
}
