/**
 * Unit tests for the formatters in src/lib/format.ts.
 */
import { describe, expect, it } from "vitest";
import { twoDigits } from "@/lib/format";

describe("twoDigits", () => {
  it.each([
    [0, "00"],
    [2, "02"],
    [14, "14"],
    [120, "120"],
  ])("formats %i as %s", (count, expected) => {
    expect(twoDigits(count)).toBe(expected);
  });
});
