/**
 * Font loading through next/font/google. Fonts are downloaded at build time
 * and served from the site itself, so visitors never contact Google.
 */
import {
  Archivo,
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  // The design only ever sets Instrument Serif in italic.
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** Class names that expose every font as a CSS variable on the element they are applied to. */
export const fontVariables = [
  spaceGrotesk.variable,
  archivo.variable,
  bricolage.variable,
  instrumentSerif.variable,
  jetbrainsMono.variable,
].join(" ");
