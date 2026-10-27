/**
 * Unit tests for the base path helper in src/lib/site.ts.
 */
import { describe, expect, it } from "vitest";
import { BASE_PATH, SITE_URL, withBasePath } from "@/lib/site";

describe("withBasePath", () => {
  it("prefixes root-relative paths", () => {
    expect(withBasePath("/docs/Muhammad-Hassan-Resume.pdf")).toBe(
      "/HassanDev/docs/Muhammad-Hassan-Resume.pdf",
    );
  });

  it("maps the root to the base path root", () => {
    expect(withBasePath("/")).toBe("/HassanDev/");
  });

  it("does not prefix a path twice", () => {
    expect(withBasePath("/HassanDev/docs/a.pdf")).toBe("/HassanDev/docs/a.pdf");
    expect(withBasePath("/HassanDev")).toBe("/HassanDev");
  });

  it("only treats a whole segment as the base path", () => {
    expect(withBasePath("/HassanDevelopment")).toBe("/HassanDev/HassanDevelopment");
  });

  it("rejects relative and protocol-relative paths", () => {
    expect(() => withBasePath("docs/a.pdf")).toThrow();
    expect(() => withBasePath("//evil.example/a.pdf")).toThrow();
    expect(() => withBasePath("https://example.com")).toThrow();
  });
});

describe("site constants", () => {
  it("keeps the site URL and base path in sync", () => {
    expect(SITE_URL.endsWith(BASE_PATH)).toBe(true);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});
