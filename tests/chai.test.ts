/**
 * Unit tests for the chai counter logic in src/lib/chai.ts and the confetti
 * generator in src/lib/confetti.ts.
 */
import { describe, expect, it } from "vitest";
import { chaiCount, cupsForHour, formatChaiLabel, karachiHour } from "@/lib/chai";
import { CONFETTI_COUNT, CONFETTI_LIFETIME_MS, createConfetti } from "@/lib/confetti";

describe("cupsForHour", () => {
  it.each([
    [0, 0],
    [3, 0],
    [6, 0],
    [7, 1],
    [9, 1],
    [10, 2],
    [12, 2],
    [13, 3],
    [16, 4],
    [19, 5],
    [22, 6],
    [23, 6],
  ])("at %i:00 Lahore time it is %i cups", (hour, cups) => {
    expect(cupsForHour(hour)).toBe(cups);
  });

  it("never exceeds 6 from the clock", () => {
    for (let hour = 0; hour < 24; hour++) expect(cupsForHour(hour)).toBeLessThanOrEqual(6);
  });
});

describe("karachiHour", () => {
  // Pakistan is UTC+5 all year, with no daylight saving time.
  it.each([
    ["2026-10-25T00:00:00Z", 5],
    ["2026-10-25T02:00:00Z", 7],
    ["2026-10-25T18:59:00Z", 23],
    ["2026-10-25T19:00:00Z", 0],
    ["2026-06-15T10:30:00Z", 15],
  ])("%s is %i:00 in Lahore", (iso, hour) => {
    expect(karachiHour(new Date(iso))).toBe(hour);
  });
});

describe("chaiCount", () => {
  it("adds the cups brewed with the chai command", () => {
    expect(chaiCount(new Date("2026-10-25T02:00:00Z"), 0)).toBe(1);
    expect(chaiCount(new Date("2026-10-25T02:00:00Z"), 2)).toBe(3);
  });

  it("can go past 6 with commands", () => {
    expect(chaiCount(new Date("2026-10-25T18:00:00Z"), 3)).toBe(9);
  });

  it("is 0 before 7am without commands", () => {
    expect(chaiCount(new Date("2026-10-25T00:30:00Z"), 0)).toBe(0);
  });
});

describe("formatChaiLabel", () => {
  it("fills in the count", () => {
    expect(formatChaiLabel("Chai today: {count}", 4)).toBe("Chai today: 4");
  });
});

describe("createConfetti", () => {
  /** A repeatable pseudo-random sequence. */
  function seeded(seed: number) {
    let state = seed;
    return () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    };
  }

  it("makes 48 pieces by default", () => {
    expect(createConfetti(seeded(1))).toHaveLength(CONFETTI_COUNT);
    expect(CONFETTI_COUNT).toBe(48);
  });

  it("cycles through accent, glow and white", () => {
    expect(createConfetti(seeded(2), 6).map((p) => p.color)).toEqual([
      "accent",
      "glow",
      "ink",
      "accent",
      "glow",
      "ink",
    ]);
  });

  it("keeps sizes and timings in the design's ranges", () => {
    for (const piece of createConfetti(seeded(3), 500)) {
      expect(piece.left).toBeGreaterThanOrEqual(0);
      expect(piece.left).toBeLessThanOrEqual(100);
      expect(piece.width).toBeGreaterThanOrEqual(6);
      expect(piece.width).toBeLessThanOrEqual(12);
      expect(piece.height).toBeGreaterThanOrEqual(10);
      expect(piece.height).toBeLessThanOrEqual(18);
      expect(piece.duration).toBeGreaterThanOrEqual(1.8);
      expect(piece.duration).toBeLessThanOrEqual(3.2);
      expect(piece.delay).toBeGreaterThanOrEqual(0);
      expect(piece.delay).toBeLessThanOrEqual(0.5);
    }
  });

  it("lands every piece before the burst is removed", () => {
    const slowest = Math.max(
      ...createConfetti(seeded(4), 500).map((p) => (p.delay + p.duration) * 1000),
    );
    expect(slowest).toBeLessThanOrEqual(CONFETTI_LIFETIME_MS);
  });
});
