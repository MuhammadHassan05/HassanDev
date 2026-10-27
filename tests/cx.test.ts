/**
 * Unit tests for the class name joiner in src/lib/cx.ts.
 */
import { describe, expect, it } from "vitest";
import { cx } from "@/lib/cx";

describe("cx", () => {
  it("joins truthy class names", () => {
    expect(cx("a", "b")).toBe("a b");
  });

  it("skips falsy values", () => {
    expect(cx("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("returns an empty string when nothing is truthy", () => {
    expect(cx(false, undefined)).toBe("");
  });
});
