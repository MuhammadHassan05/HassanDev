/**
 * The section fade-up (CSS in globals.css): each [data-reveal] section fades
 * in and rises 16px the first time it enters the viewport.
 *
 * Nothing is hidden until this has confirmed that motion is allowed and
 * IntersectionObserver exists; only then does it add .js-reveal to <html>.
 * Sections already on screen at that moment are marked revealed first, so the
 * top of the page never blinks out and back in. Without JavaScript, or with
 * reduced motion, every section is simply visible.
 */
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motionAllowed, supportsIntersectionObserver } from "@/lib/motion";

/** Added to a section once it has been seen; it then stays visible. */
const REVEALED_CLASS = "is-revealed";
/** Added to <html> once the observer runs; the CSS only hides sections under it. */
const ENABLED_CLASS = "js-reveal";

/** Sets up the observer for the current page. Renders nothing. */
export function Reveal() {
  // Each route renders new sections, so observing restarts on navigation.
  const pathname = usePathname();

  useEffect(() => {
    if (!motionAllowed(window) || !supportsIntersectionObserver(window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(REVEALED_CLASS);
          observer.unobserve(entry.target);
        }
      },
      // Start a little before the section is fully in view, so it feels prompt.
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const section of document.querySelectorAll(`[data-reveal]:not(.${REVEALED_CLASS})`)) {
      if (section.getBoundingClientRect().top < window.innerHeight) {
        section.classList.add(REVEALED_CLASS);
      } else {
        observer.observe(section);
      }
    }
    const root = document.documentElement;
    root.classList.add(ENABLED_CLASS);

    return () => {
      observer.disconnect();
      root.classList.remove(ENABLED_CLASS);
    };
  }, [pathname]);

  return null;
}
