/**
 * WCAG AA contrast for every text/background pair of colour tokens the site
 * uses, in light and dark mode and for both track accents. The token values
 * are read from src/styles/globals.css itself, so the test always checks
 * what ships.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CSS = readFileSync(join(__dirname, "..", "src", "styles", "globals.css"), "utf8");

/** The custom properties declared in the first block that follows `selector`. */
function tokenBlock(selector: string): Record<string, string> {
  const start = CSS.indexOf(selector);
  if (start === -1) throw new Error(`globals.css has no ${selector} block`);
  const body = CSS.slice(CSS.indexOf("{", start) + 1, CSS.indexOf("}", start));
  return Object.fromEntries(
    [...body.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6});/gi)].map(([, name = "", value = ""]) => [
      name,
      value.toLowerCase(),
    ]),
  );
}

const light = tokenBlock(":root {");
const darkFromSystem = tokenBlock(':root:not([data-theme="light"]) {');
const darkChosen = tokenBlock(':root[data-theme="dark"] {');

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colours, from 1 to 21. */
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** A mode's tokens with the track accent resolved, as [data-track] does. */
function withTrack(tokens: Record<string, string>, track: "burgundy" | "olive") {
  return { ...tokens, accent: tokens[track], "accent-ink": tokens[`${track}-ink`] };
}

/**
 * Every foreground/background token pair that appears on the site, with the
 * minimum ratio it needs: 4.5 for text, 3 for the focus ring (non-text).
 */
const PAIRS: readonly { fg: string; bg: string; min: number; where: string }[] = [
  ...["bg", "surface", "surface-2"].flatMap((bg) => [
    { fg: "text", bg, min: 4.5, where: "body text" },
    { fg: "text-2", bg, min: 4.5, where: "secondary text" },
    { fg: "accent-ink", bg, min: 4.5, where: "links and accent text" },
    { fg: "accent-ink", bg, min: 3, where: "focus ring" },
  ]),
  { fg: "on-accent", bg: "accent", min: 4.5, where: "primary buttons" },
  { fg: "text", bg: "line", min: 4.5, where: "the old cart's grey button" },
  { fg: "bg", bg: "text", min: 4.5, where: "the skip link" },
];

const MODES = {
  light,
  dark: darkChosen,
} as const;

describe("colour tokens", () => {
  it("are all read from globals.css", () => {
    for (const tokens of [light, darkFromSystem, darkChosen]) {
      expect(Object.keys(tokens)).toEqual(
        expect.arrayContaining(["bg", "surface", "surface-2", "text", "text-2", "line"]),
      );
      expect(Object.keys(tokens)).toEqual(
        expect.arrayContaining(["burgundy", "burgundy-ink", "olive", "olive-ink", "on-accent"]),
      );
    }
  });

  it("are the same for dark from the system setting and dark from the toggle", () => {
    expect(darkFromSystem).toEqual(darkChosen);
  });

  it("use the fills as the accent ink in light mode", () => {
    expect(light["burgundy-ink"]).toBe(light.burgundy);
    expect(light["olive-ink"]).toBe(light.olive);
  });
});

describe.each(Object.entries(MODES))("%s mode", (_mode, tokens) => {
  describe.each(["burgundy", "olive"] as const)("%s track", (track) => {
    const resolved = withTrack(tokens, track);
    it.each(PAIRS.map((pair) => [`${pair.fg} on ${pair.bg} (${pair.where})`, pair] as const))(
      "%s meets WCAG AA",
      (_name, { fg, bg, min }) => {
        const foreground = resolved[fg as keyof typeof resolved];
        const background = resolved[bg as keyof typeof resolved];
        expect(foreground, `no --${fg} token`).toBeDefined();
        expect(background, `no --${bg} token`).toBeDefined();
        const ratio = contrast(foreground as string, background as string);
        expect(ratio, `${fg} ${foreground} on ${bg} ${background}`).toBeGreaterThanOrEqual(min);
      },
    );
  });
});

describe("contrast()", () => {
  it("matches the WCAG reference values", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrast("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
    expect(contrast("#ffffff", "#ffffff")).toBe(1);
  });
});
