/**
 * Font loading through next/font/google. Fonts are downloaded at build time
 * and served from the site itself, so visitors never contact Google.
 *
 * One family: Apple devices use their system font (SF Pro) and everyone else
 * gets Inter (see --font-sans in globals.css). JetBrains Mono is only for the
 * terminal and code.
 */
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** Class names that expose every font as a CSS variable on the element they are applied to. */
export const fontVariables = [inter.variable, jetbrainsMono.variable].join(" ");
