/**
 * Keeps the fonts self-hosted from committed files. next/font/google downloads
 * fonts during the build, and Google's occasional font URLs without a file
 * extension make Turbopack fail it at random (vercel/next.js#99114), so it must
 * not come back.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");
const FONTS = join(SRC, "styles", "fonts");

const sources = readdirSync(SRC, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(ts|tsx|js|jsx|mjs|css)$/.test(entry.name))
  .map((entry) => join(entry.parentPath, entry.name));

describe("fonts", () => {
  it("never loads fonts from Google during the build", () => {
    for (const file of sources) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/["']next\/font\/google["']/);
    }
  });

  it.each(["inter-latin.woff2", "jetbrains-mono-latin.woff2"])("ships %s as WOFF2", (name) => {
    // Every WOFF2 file starts with the signature "wOF2".
    expect(readFileSync(join(FONTS, name)).subarray(0, 4).toString("latin1")).toBe("wOF2");
  });

  it("keeps each font's licence next to it", () => {
    expect(
      readdirSync(FONTS)
        .filter((name) => name.endsWith("-OFL.txt"))
        .sort(),
    ).toEqual(["Inter-OFL.txt", "JetBrainsMono-OFL.txt"]);
  });
});
