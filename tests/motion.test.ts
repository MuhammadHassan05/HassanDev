/**
 * Unit tests for the motion helpers in src/lib/motion.ts.
 */
import { describe, expect, it } from "vitest";
import {
  canTilt,
  FINE_POINTER_QUERY,
  hasFinePointer,
  MAX_TILT_X,
  MAX_TILT_Y,
  motionAllowed,
  prefersReducedMotion,
  REDUCED_MOTION_QUERY,
  supportsIntersectionObserver,
  supportsViewTransitions,
  tiltFromPointer,
  tiltTransform,
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

  it("reads the fine pointer query", () => {
    expect(hasFinePointer(env(FINE_POINTER_QUERY))).toBe(true);
    expect(hasFinePointer(env())).toBe(false);
  });

  it("allows motion unless reduced motion is requested", () => {
    expect(motionAllowed(env())).toBe(true);
    expect(motionAllowed(env(REDUCED_MOTION_QUERY))).toBe(false);
  });

  it("only tilts with a fine pointer and motion allowed", () => {
    expect(canTilt(env(FINE_POINTER_QUERY))).toBe(true);
    expect(canTilt(env())).toBe(false);
    expect(canTilt(env(FINE_POINTER_QUERY, REDUCED_MOTION_QUERY))).toBe(false);
  });

  it("never runs motion without a window (prerendering)", () => {
    expect(motionAllowed(undefined)).toBe(false);
    expect(canTilt(undefined)).toBe(false);
    expect(prefersReducedMotion(undefined)).toBe(false);
  });

  it("treats a window without matchMedia as no match", () => {
    expect(hasFinePointer({} as MediaEnv)).toBe(false);
  });
});

describe("feature detection", () => {
  it("detects IntersectionObserver", () => {
    expect(supportsIntersectionObserver({ IntersectionObserver: class {} })).toBe(true);
    expect(supportsIntersectionObserver({})).toBe(false);
    expect(supportsIntersectionObserver(undefined)).toBe(false);
  });

  it("detects View Transitions", () => {
    expect(supportsViewTransitions({ startViewTransition: () => undefined })).toBe(true);
    expect(supportsViewTransitions({})).toBe(false);
    expect(supportsViewTransitions(undefined)).toBe(false);
  });
});

describe("tiltFromPointer", () => {
  const box = { left: 100, top: 50, width: 400, height: 200 };

  it("is flat with the glint centred when the pointer is in the middle", () => {
    expect(tiltFromPointer(300, 150, box)).toEqual({
      rotateX: 0,
      rotateY: 0,
      glintX: 50,
      glintY: 50,
    });
  });

  it("reaches the design's maximum at the corners", () => {
    const topLeft = tiltFromPointer(100, 50, box);
    expect(topLeft.rotateX).toBeCloseTo(MAX_TILT_X);
    expect(topLeft.rotateY).toBeCloseTo(-MAX_TILT_Y);
    const bottomRight = tiltFromPointer(500, 250, box);
    expect(bottomRight.rotateX).toBeCloseTo(-MAX_TILT_X);
    expect(bottomRight.rotateY).toBeCloseTo(MAX_TILT_Y);
  });

  it("never exceeds the maximum for a pointer outside the card", () => {
    const outside = tiltFromPointer(-1000, 5000, box);
    expect(Math.abs(outside.rotateX)).toBeLessThanOrEqual(MAX_TILT_X);
    expect(Math.abs(outside.rotateY)).toBeLessThanOrEqual(MAX_TILT_Y);
    expect(outside.glintX).toBe(0);
    expect(outside.glintY).toBe(100);
  });

  it("stays flat for a card with no size", () => {
    expect(tiltFromPointer(10, 10, { left: 0, top: 0, width: 0, height: 0 })).toMatchObject({
      rotateX: 0,
      rotateY: 0,
    });
  });

  it("keeps every tilt under 5 degrees", () => {
    expect(Math.max(MAX_TILT_X, MAX_TILT_Y)).toBeLessThanOrEqual(5);
  });
});

describe("tiltTransform", () => {
  it("formats a CSS transform with a 4px lift", () => {
    expect(tiltTransform({ rotateX: 1.234, rotateY: -2, glintX: 0, glintY: 0 })).toBe(
      "perspective(1000px) rotateX(1.23deg) rotateY(-2.00deg) translateY(-4px)",
    );
  });
});
