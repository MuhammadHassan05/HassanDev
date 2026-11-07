/**
 * Light and dark theme: what the visitor chose, what is showing, and the tiny
 * script that applies a saved choice before the first paint.
 *
 * With no saved choice the page follows the system setting through CSS alone
 * (prefers-color-scheme), so it is right even with JavaScript off. A choice
 * made with the theme toggle is saved and set as data-theme on <html>, which
 * globals.css gives priority over the system setting.
 */

/** A colour theme. */
export type Theme = "light" | "dark";

/** localStorage key for the visitor's chosen theme. */
export const THEME_STORAGE_KEY = "theme";

/** The media query for a system-wide dark preference. */
export const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Reads a saved or applied theme, rejecting anything else, so a tampered or
 * stale value falls back to the system setting.
 *
 * @param value - e.g. a localStorage value or a data-theme attribute.
 */
export function parseTheme(value: unknown): Theme | null {
  return value === "light" || value === "dark" ? value : null;
}

/**
 * The theme on screen: the visitor's choice if any, otherwise the system's.
 *
 * @param chosen - Saved choice, or null for none.
 * @param systemDark - Whether the system asks for dark.
 */
export function effectiveTheme(chosen: Theme | null, systemDark: boolean): Theme {
  return chosen ?? (systemDark ? "dark" : "light");
}

/**
 * The theme a toggle switches to.
 *
 * @param theme - The theme on screen.
 */
export function oppositeTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}

/**
 * Runs inline in <head>, before the body is parsed, so a saved theme is in
 * place on the first paint and there is no flash of the other one. It only
 * copies a valid saved value to data-theme. Reading storage can throw (blocked
 * cookies, some private modes), so it is wrapped in try/catch: the page then
 * simply follows the system setting. scripts/csp.mjs hashes it like every
 * other inline script.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
