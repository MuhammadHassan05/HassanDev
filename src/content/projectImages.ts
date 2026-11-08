/**
 * Approved screenshots for project cards, case study cards and case study
 * covers. Each entry has a file at public/projects/<key>.webp, copied there by
 * npm run screenshots:approve after a visual review. Projects without an entry
 * keep their illustration.
 */
import type { IllustrationKey } from "./illustrations";

/** One approved image, with the size of the file so the page reserves its space. */
export interface ProjectImage {
  alt: string;
  width: number;
  height: number;
}

/** Approved images, by project key. Reviewed November 2026. */
export const projectImages: Partial<Record<IllustrationKey, ProjectImage>> = {
  "flatterlab-tech": { alt: "flatterlab.tech homepage", width: 1440, height: 900 },
  "yetti-ai": { alt: "Yetti.ai homepage", width: 1440, height: 900 },
  "oneplace-canada": { alt: "OnePlace Canada homepage", width: 1440, height: 900 },
  pikzels: { alt: "Pikzels homepage", width: 1440, height: 900 },
};
