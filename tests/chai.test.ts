/**
 * Unit tests for the terminal chai command's clock logic in src/lib/chai.ts.
 */
import { describe, expect, it } from "vitest";
import { chaiCount, cupsForHour, karachiHour } from "@/lib/chai";

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
