/**
 * Unit tests for the motion helpers in src/lib/motion.ts.
 */
import { describe, expect, it } from "vitest";
import {
  motionAllowed,
  prefersReducedMotion,
  REDUCED_MOTION_QUERY,
  supportsIntersectionObserver,
  type MediaEnv,
} from "@/lib/motion";

/** A fake window whose matchMedia answers true for the listed queries. */
function env(...matching: string[]): MediaEnv {
  return {
    matchMedia: (query: string) => ({ matches: matching.includes(query) }) as MediaQueryList,
  };
}

describe("media checks", () => {
  it("reads prefers-reduced-motion", () => {
    expect(prefersReducedMotion(env(REDUCED_MOTION_QUERY))).toBe(true);
    expect(prefersReducedMotion(env())).toBe(false);
  });

  it("allows motion unless reduced motion is requested", () => {
    expect(motionAllowed(env())).toBe(true);
    expect(motionAllowed(env(REDUCED_MOTION_QUERY))).toBe(false);
  });

  it("never runs motion without a window (prerendering)", () => {
    expect(motionAllowed(undefined)).toBe(false);
    expect(prefersReducedMotion(undefined)).toBe(false);
  });

  it("treats a window without matchMedia as no match", () => {
    expect(prefersReducedMotion({} as MediaEnv)).toBe(false);
  });
});

describe("feature detection", () => {
  it("detects IntersectionObserver", () => {
    expect(supportsIntersectionObserver({ IntersectionObserver: class {} })).toBe(true);
    expect(supportsIntersectionObserver({})).toBe(false);
    expect(supportsIntersectionObserver(undefined)).toBe(false);
  });
});
