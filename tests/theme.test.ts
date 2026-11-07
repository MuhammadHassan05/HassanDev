/**
 * Unit tests for the theme helpers in src/lib/theme.ts, including the inline
 * script, which is run in an isolated VM context with fake browser globals.
 */
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import {
  effectiveTheme,
  oppositeTheme,
  parseTheme,
  THEME_SCRIPT,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

/** Runs THEME_SCRIPT against a fake document and storage; returns data-theme. */
function runScript(getItem: (key: string) => string | null): string | undefined {
  const dataset: Record<string, string> = {};
  runInNewContext(THEME_SCRIPT, {
    localStorage: { getItem },
    document: { documentElement: { dataset } },
  });
  return dataset.theme;
}

describe("parseTheme", () => {
  it("accepts light and dark only", () => {
    expect(parseTheme("light")).toBe("light");
    expect(parseTheme("dark")).toBe("dark");
    for (const value of [null, undefined, "", "Dark", "blue", 1]) {
      expect(parseTheme(value)).toBeNull();
    }
  });
});

describe("effectiveTheme", () => {
  it("follows the system when nothing is chosen", () => {
    expect(effectiveTheme(null, true)).toBe("dark");
    expect(effectiveTheme(null, false)).toBe("light");
  });

  it("prefers the visitor's choice over the system", () => {
    expect(effectiveTheme("light", true)).toBe("light");
    expect(effectiveTheme("dark", false)).toBe("dark");
  });
});

describe("oppositeTheme", () => {
  it("switches between the two", () => {
    expect(oppositeTheme("light")).toBe("dark");
    expect(oppositeTheme("dark")).toBe("light");
  });
});

describe("THEME_SCRIPT", () => {
  it("applies a saved theme", () => {
    expect(runScript((key) => (key === THEME_STORAGE_KEY ? "dark" : null))).toBe("dark");
    expect(runScript(() => "light")).toBe("light");
  });

  it("leaves the system setting in charge when nothing valid is saved", () => {
    expect(runScript(() => null)).toBeUndefined();
    expect(runScript(() => "purple")).toBeUndefined();
  });

  it("never throws when storage is blocked", () => {
    expect(
      runScript(() => {
        throw new Error("SecurityError");
      }),
    ).toBeUndefined();
  });

  it("contains no '<', so it can never close its <script> tag early", () => {
    expect(THEME_SCRIPT).not.toContain("<");
  });
});
