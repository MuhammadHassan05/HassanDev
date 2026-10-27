/**
 * Tests for BounceText: letters render as hidden spans, words stay together,
 * and nothing is lost from the text.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BounceText } from "@/components/ui/BounceText";

const render = (text: string) => renderToStaticMarkup(createElement(BounceText, { text }));

describe("BounceText", () => {
  it("hides the letter spans from assistive tech", () => {
    expect(render("Hassan")).toMatch(/^<span aria-hidden="true">/);
  });

  it("wraps every letter in a bounce span", () => {
    const html = render("Let's talk.");
    expect(html.match(/class="bounce-letter"/g)).toHaveLength("Let'stalk.".length);
  });

  it("keeps the text intact, with spaces between words", () => {
    const visible = render("Hiring for an engineering role?").replace(/<[^>]+>/g, "");
    expect(visible).toBe("Hiring for an engineering role?");
  });

  it("escapes characters like & instead of treating them as markup", () => {
    expect(render("Shopify & Design")).toContain("&amp;");
  });

  it("keeps each word on one line", () => {
    expect(render("Shopify & Design").match(/whitespace-nowrap/g)).toHaveLength(3);
  });
});
