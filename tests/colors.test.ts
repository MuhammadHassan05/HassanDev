/**
 * Guards the design rules for colour: every colour comes from a token. No
 * literal colours in components, no colour utility that is not a token, and
 * none of the retired effects (gradients, blur, glass, glow).
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = join(__dirname, "..", "src");

/** Every .ts and .tsx file under src/. */
const sources = readdirSync(SRC, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.tsx?$/.test(entry.name))
  .map((entry) => join(entry.parentPath, entry.name));

const read = (file: string) => readFileSync(file, "utf8");
const name = (file: string) => relative(SRC, file);

/** Tailwind colour names, one per token in globals.css. */
const TOKENS = [
  "bg",
  "surface",
  "surface-2",
  "ink",
  "ink-2",
  "line",
  "accent",
  "accent-ink",
  "on-accent",
  "transparent",
];

/** Utilities with a colour prefix that set something other than colour. */
const NON_COLOUR =
  /^(border-[0-9trblxy]|border-[trblxy]-\d|outline-(none|hidden|\d|offset)|text-\[[\d.]+px\]|text-\[clamp|text-(left|center|right|xs|sm|base|lg|xl|wrap|nowrap|balance|pretty))/;

const COLOUR_UTILITY =
  /(?<=["'`\s:])(?:text|bg|border(?:-[trblxy])?|outline|ring|fill|stroke|caret|accent|decoration|divide|shadow|from|via|to)-[^\s"'`]+/g;

describe("colour usage in src/", () => {
  it.each(sources.map((file) => [name(file), file]))(
    "%s uses no literal colours",
    (_name, file) => {
      const text = read(file);
      expect(text).not.toMatch(/#[0-9a-f]{3,8}\b/i);
      expect(text).not.toMatch(/\b(rgba?|hsla?|oklch|color-mix)\(/i);
      expect(text).not.toMatch(/gradient\(|backdrop-|\bblur-|\bglass\b|\bglow\b/i);
    },
  );

  it.each(sources.map((file) => [name(file), file]))(
    "%s only uses colour utilities that are tokens",
    (_name, file) => {
      for (const utility of read(file).match(COLOUR_UTILITY) ?? []) {
        if (NON_COLOUR.test(utility)) continue;
        const colour = utility.replace(/^[a-z]+(?:-[trblxy])?-/, "").replace(/\/\d+$/, "");
        expect(TOKENS, `${utility} is not a colour token`).toContain(colour);
      }
    },
  );
});

describe("globals.css", () => {
  const css = read(join(SRC, "styles", "globals.css"));

  it("declares literal colours only as token values", () => {
    for (const line of css.split("\n").filter((l) => /#[0-9a-f]{3,8}\b/i.test(l))) {
      expect(line).toMatch(/^\s*--[a-z0-9-]+: #[0-9a-f]{6};$/);
    }
  });

  it("has no gradients, blur, rgba or backdrop filters", () => {
    expect(css).not.toMatch(/gradient\(|backdrop-filter|blur\(|\brgba?\(/i);
  });
});
