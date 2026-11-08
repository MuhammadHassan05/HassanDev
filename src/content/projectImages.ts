/**
 * Approved screenshots for project cards. Each entry has a file at
 * public/projects/<key>.webp, copied there by npm run screenshots:approve after
 * a visual review. Projects without an entry keep their illustration.
 */
import type { IllustrationKey } from "./illustrations";

/** One approved image, with the size of the file so the card reserves its space. */
export interface ProjectImage {
  alt: string;
  width: number;
  height: number;
}

/** Approved images, by project key. Reviewed November 2026. */
export const projectImages: Partial<Record<IllustrationKey, ProjectImage>> = {
  "flatterlab-tech": { alt: "flatterlab.tech homepage", width: 960, height: 600 },
  "yetti-ai": { alt: "Yetti.ai homepage", width: 960, height: 600 },
  "oneplace-canada": { alt: "OnePlace Canada homepage", width: 960, height: 600 },
};
