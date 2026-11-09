/**
 * Font loading through next/font/local, from files committed in
 * src/styles/fonts/ (SIL Open Font License, texts alongside). Visitors never
 * contact Google, and neither does the build.
 *
 * The files are Google Fonts' latin subsets, the same files next/font/google
 * used to download. Downloading at build time made builds fail at random:
 * Google sometimes answers with font URLs that Turbopack cannot parse
 * (Next.js issue 99114), so they are committed instead.
 *
 * One family: Apple devices use their system font (SF Pro) and everyone else
 * gets Inter (see --font-sans in globals.css). JetBrains Mono is only for the
 * terminal and code.
 */
import localFont from "next/font/local";

// A variable font: this one file covers every weight the design uses (400 to 600).
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "400 600",
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** Class names that expose every font as a CSS variable on the element they are applied to. */
export const fontVariables = [inter.variable, jetbrainsMono.variable].join(" ");
