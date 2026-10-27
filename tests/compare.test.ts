/**
 * Unit tests for the before/after slider maths in src/lib/compare.ts.
 */
import { describe, expect, it } from "vitest";
import {
  clampPercent,
  COMPARE_START,
  compareValueText,
  percentFromPointer,
  TOUCH_SLOP,
  touchIntent,
} from "@/lib/compare";
import { caseStudy } from "@/content/caseStudy";

describe("compareValueText", () => {
  const template = "{before}% before, {after}% after";

  it("says how much of each cart is showing", () => {
    expect(compareValueText(template, 52)).toBe("52% before, 48% after");
    expect(compareValueText(template, COMPARE_START)).toBe("50% before, 50% after");
  });

  it("covers both ends", () => {
    expect(compareValueText(template, 0)).toBe("0% before, 100% after");
    expect(compareValueText(template, 100)).toBe("100% before, 0% after");
  });

  it("clamps and rounds like the slider, so the two always add up to 100", () => {
    expect(compareValueText(template, 140)).toBe("100% before, 0% after");
    expect(compareValueText(template, 33.6)).toBe("34% before, 66% after");
  });

  it("is used by the case study content with both placeholders", () => {
    expect(caseStudy.sliderValueText).toContain("{before}");
    expect(caseStudy.sliderValueText).toContain("{after}");
  });
});

describe("percentFromPointer", () => {
  const box = { left: 100, width: 400 };

  it.each([
    [100, 0],
    [200, 25],
    [300, 50],
    [500, 100],
    [233, 33],
  ])("pointer at x=%i puts the divider at %i%%", (x, percent) => {
    expect(percentFromPointer(x, box)).toBe(percent);
  });

  it("pins the divider to the edges when the pointer leaves the area", () => {
    expect(percentFromPointer(-500, box)).toBe(0);
    expect(percentFromPointer(5000, box)).toBe(100);
  });

  it("starts in the middle for an area with no width", () => {
    expect(percentFromPointer(10, { left: 0, width: 0 })).toBe(COMPARE_START);
  });
});

describe("touchIntent", () => {
  it.each([
    [0, 0, "undecided"],
    [3, 4, "undecided"],
    [-5, 5, "undecided"],
    [12, 2, "horizontal"],
    [-20, 5, "horizontal"],
    [2, 12, "vertical"],
    [5, -40, "vertical"],
    [10, 10, "vertical"],
  ])("a touch moved (%i, %i) is %s", (dx, dy, intent) => {
    expect(touchIntent(dx, dy)).toBe(intent);
  });

  it("waits for at least TOUCH_SLOP pixels", () => {
    expect(touchIntent(TOUCH_SLOP - 1, 0)).toBe("undecided");
    expect(touchIntent(TOUCH_SLOP, 0)).toBe("horizontal");
  });
});

describe("clampPercent", () => {
  it.each([
    [-10, 0],
    [0, 0],
    [49.6, 50],
    [100, 100],
    [140, 100],
  ])("clamps %d to %i", (value, expected) => {
    expect(clampPercent(value)).toBe(expected);
  });

  it("treats NaN (an unparsable range value) as the start", () => {
    expect(clampPercent(Number.NaN)).toBe(COMPARE_START);
  });
});
