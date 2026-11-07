/**
 * Root layout: document shell, language, self-hosted fonts, default metadata,
 * the theme script, the skip-to-content link, and the draw-on-scroll
 * observer, which outlives a single page.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DrawOnScroll } from "@/components/features/DrawOnScroll";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { siteChrome, siteMetadata } from "@/content/site";
import { MAIN_CONTENT_ID } from "@/lib/dom-ids";
import { SITE_URL } from "@/lib/site";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  // The trailing slash keeps relative metadata URLs inside /HassanDev.
  metadataBase: new URL(`${SITE_URL}/`),
  title: siteMetadata.pages.engineer.title,
  description: siteMetadata.pages.engineer.description,
  referrer: "strict-origin-when-cross-origin",
};

/**
 * Wraps every page in the html and body elements.
 *
 * @param props.children - The active route.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // ThemeScript may set data-theme on <html> before React hydrates; that is
    // expected, so React is told not to warn about it.
    <html lang={siteMetadata.lang} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        {/* Uses the root accent: this sits outside the page's [data-track] wrapper. */}
        <a
          href={`#${MAIN_CONTENT_ID}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:bg-ink focus:px-5 focus:font-medium focus:text-bg focus:outline-ink"
        >
          {siteChrome.skipLinkLabel}
        </a>
        <DrawOnScroll />
        {children}
      </body>
    </html>
  );
}
