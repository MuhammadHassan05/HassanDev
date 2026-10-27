/**
 * Draws project illustrations in as they scroll into view: outlines first,
 * then fills fade in (styles in globals.css under .js-draw).
 *
 * Nothing is hidden until this has confirmed that motion is allowed and
 * IntersectionObserver exists; only then does it add the .js-draw class that
 * hides the strokes. Without JavaScript, or with reduced motion, the
 * illustrations are simply always complete.
 */
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DRAW_TARGET_CLASS } from "@/lib/dom-ids";
import { motionAllowed, supportsIntersectionObserver } from "@/lib/motion";

/** Added to an illustration once it has been seen; the CSS then draws it. */
const DRAWN_CLASS = "is-drawn";
/** Added to <html> once drawing is set up; the CSS only hides strokes under it. */
const ENABLED_CLASS = "js-draw";
/** Share of an illustration that must be visible before it draws. */
const THRESHOLD = 0.3;

/** Sets up the observer for the current page. Renders nothing. */
export function DrawOnScroll() {
  // Each route renders new illustrations, so observing restarts on navigation.
  const pathname = usePathname();

  useEffect(() => {
    if (!motionAllowed(window) || !supportsIntersectionObserver(window)) {
      return;
    }
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(DRAWN_CLASS);
            // Each illustration draws once; scrolling back up does not redraw it.
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: THRESHOLD },
    );

    root.classList.add(ENABLED_CLASS);
    document
      .querySelectorAll(`.${DRAW_TARGET_CLASS}:not(.${DRAWN_CLASS})`)
      .forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove(ENABLED_CLASS);
    };
  }, [pathname]);

  return null;
}
