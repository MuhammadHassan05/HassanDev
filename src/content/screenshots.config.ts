/**
 * Which live project sites scripts/screenshots.mjs captures, and how each
 * capture is checked. Only projects with a public site are listed; every
 * other project keeps its illustration.
 *
 * Kept free of runtime imports so the capture script can load it directly
 * with Node's TypeScript support.
 */
import type { IllustrationKey } from "./illustrations";

/** One site to capture. */
export interface ScreenshotTarget {
  /** Project's illustration key; also the output file name (public/projects/<key>.webp). */
  project: IllustrationKey;
  url: string;
  /**
   * Must appear (case-insensitive) in the page title or an h1, which rejects
   * redirects, parked domains and error pages.
   */
  expectedKeyword: string;
  /** Extra CSS selectors to hide on this site only, e.g. a site-specific popup. */
  hideSelectors?: readonly string[];
}

/** Capture targets. Keywords match each site's real title, checked in October 2026. */
export const screenshotTargets: readonly ScreenshotTarget[] = [
  {
    project: "flatterlab-tech",
    url: "https://flatterlab.tech",
    expectedKeyword: "FlatterLab",
    hideSelectors: ["button[aria-label='Send feedback']"],
  },
  { project: "pikzels", url: "https://pikzels.com", expectedKeyword: "Pikzels" },
  { project: "yetti-ai", url: "https://yetti.ai", expectedKeyword: "Yetti" },
  {
    project: "vtest",
    url: "https://www.vtestcorp.com/",
    expectedKeyword: "VTEST",
    // "Talk To QA Experts" side tab.
    hideSelectors: ["section.float-container"],
  },
  {
    project: "oneplace-canada",
    url: "https://www.oneplace.ca/",
    expectedKeyword: "OnePlace",
    // Floating "Enquiry Form" callback panel.
    hideSelectors: [".nb-form"],
  },
];
