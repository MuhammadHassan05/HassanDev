/**
 * Unit tests for the link classifier in src/lib/links.ts.
 */
import { describe, expect, it } from "vitest";
import { linkKind } from "@/lib/links";

describe("linkKind", () => {
  it.each([
    ["/", "route"],
    ["/studio/", "route"],
    ["/#projects", "route"],
    ["/docs/Muhammad-Hassan-Resume.pdf", "asset"],
    ["/docs/a.pdf#page=2", "asset"],
    ["#contact", "anchor"],
    ["https://calendly.com/hassannawab898/30min", "external"],
    ["mailto:hassannawab898@gmail.com", "external"],
  ])("classifies %s as %s", (href, kind) => {
    expect(linkKind(href)).toBe(kind);
  });

  it.each([
    "javascript:alert(1)",
    "http://example.com",
    "//example.com/x",
    "docs/a.pdf",
    "data:text/html,hi",
    "",
  ])("rejects %s", (href) => {
    expect(() => linkKind(href)).toThrow();
  });
});
