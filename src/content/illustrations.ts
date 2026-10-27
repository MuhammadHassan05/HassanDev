/**
 * Keys of the project illustrations, one per file in design-kit/illustrations/
 * (file name without .svg). Projects reference these keys, and the
 * illustration components will be looked up by them.
 */

/** Every illustration key, in file name order. */
export const illustrationKeys = [
  "ai-text-detection-api",
  "al-ghani-mart",
  "cattle-exchange-platform",
  "city-pulse",
  "cnn-vs-transformer-drone-detection",
  "dogra-technologies",
  "elevvo-pathway",
  "flatterlab-tech",
  "hoodays-streetwear",
  "jaib-expense-tracker",
  "oneplace-canada",
  "pikzels",
  "redish-crm",
  "shopify-to-galaxy-middleware",
  "son-of-oak",
  "talentminer",
  "tevar-identity",
  "themcshop",
  "tiny-owlets",
  "vtest",
  "writewisely-ai",
  "yetti-ai",
  "yic-social-media",
  "zarqais-e-commerce",
] as const;

/** Name of one project illustration. */
export type IllustrationKey = (typeof illustrationKeys)[number];
