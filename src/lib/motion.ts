/**
 * Motion helpers for the section fade-up: whether motion may run, and whether
 * the browser can tell when a section enters the viewport. The browser is
 * passed in, so everything here is testable without a DOM and safe to call
 * during prerendering (no window).
 */

/** The part of `window` the media-query checks need. */
export type MediaEnv = Pick<Window, "matchMedia"> | undefined;

/** Media query for users who asked the system for less motion. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

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
 * Whether decorative motion may run at all.
 *
 * @param env - Usually `window`; undefined while prerendering.
 */
export function motionAllowed(env: MediaEnv): boolean {
  return env !== undefined && !prefersReducedMotion(env);
}

/**
 * Whether the page can observe elements entering the viewport.
 *
 * @param env - Usually `window`.
 */
export function supportsIntersectionObserver(env: object | undefined): boolean {
  return env !== undefined && "IntersectionObserver" in env;
}
