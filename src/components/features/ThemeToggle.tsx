/**
 * The light/dark toggle in the nav. It shows the theme you can switch to (a
 * moon in light mode, a sun in dark mode), and the choice is saved so the
 * inline ThemeScript can apply it before the next page paints.
 *
 * Which icon shows is decided by CSS from the same rules as the colours, so it
 * is right before hydration too; only the label needs JavaScript, and the
 * button does nothing until then anyway.
 */
"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { siteChrome } from "@/content/site";
import { cx } from "@/lib/cx";
import {
  DARK_QUERY,
  effectiveTheme,
  oppositeTheme,
  parseTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

/** Re-renders when the system setting or the applied theme changes. */
function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function currentTheme(): Theme {
  return effectiveTheme(
    parseTheme(document.documentElement.dataset.theme),
    window.matchMedia(DARK_QUERY).matches,
  );
}

// The server cannot know the visitor's theme; React corrects it right after hydration.
const serverTheme = (): Theme => "light";

/** Props for {@link ThemeToggle}. */
export interface ThemeToggleProps {
  className?: string;
}

/**
 * Renders the 44px theme toggle button.
 *
 * @param props.className - Placement classes from the nav.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, currentTheme, serverTheme);
  const { toDark, toLight } = siteChrome.themeToggle;

  const handleClick = () => {
    const next = oppositeTheme(currentTheme());
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage is blocked: the choice still applies, it just is not remembered.
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={theme === "dark" ? toLight : toDark}
      className={cx(
        "theme-toggle inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2",
        className,
      )}
    >
      <span className="theme-icon-moon">
        <MoonIcon />
      </span>
      <span className="theme-icon-sun">
        <SunIcon />
      </span>
    </button>
  );
}
