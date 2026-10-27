/**
 * Tests for the illustration components: every key renders a decorative
 * 360x200 svg with no leftover color placeholders, and themed parts use the
 * track variables through classes.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { illustrations } from "@/components/illustrations";
import { illustrationKeys } from "@/content/illustrations";

const rendered = illustrationKeys.map(
  (key) => [key, renderToStaticMarkup(createElement(illustrations[key]))] as const,
);

describe("illustrations", () => {
  it("has a component for every key and nothing extra", () => {
    expect(Object.keys(illustrations).sort()).toEqual([...illustrationKeys].sort());
  });

  it.each(rendered)("%s renders a hidden 360x200 svg", (_key, html) => {
    expect(html.startsWith("<svg")).toBe(true);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('viewBox="0 0 360 200"');
  });

  it.each(rendered)("%s has no placeholders or inline styles", (_key, html) => {
    expect(html).not.toMatch(/__ACCENT__|__GLOW__|\{\{|style=/);
  });

  it("passes className through to the root svg", () => {
    const html = renderToStaticMarkup(createElement(illustrations.pikzels, { className: "x" }));
    expect(html).toMatch(/^<svg[^>]*class="x"/);
  });
});
