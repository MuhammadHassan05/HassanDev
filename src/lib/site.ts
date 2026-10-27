/**
 * Deployment constants and URL helpers. This is the single place the
 * GitHub Pages project path is defined.
 */

/** Path the site is served under: GitHub Pages project sites live at /<repo>. */
export const BASE_PATH = "/HassanDev";

/** Canonical public URL of the deployed site, without a trailing slash. */
export const SITE_URL = "https://muhammadhassan05.github.io/HassanDev";

/**
 * Turns a site path into a full public URL, for canonical links, share
 * images, the sitemap and structured data.
 *
 * @param path - A root-relative path such as "/studio/" or "/og.png".
 * @returns e.g. "https://muhammadhassan05.github.io/HassanDev/studio/".
 * @throws If the path is not root-relative.
 */
export function absoluteUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(`absoluteUrl expects a root-relative path, got "${path}"`);
  }
  return `${SITE_URL}${path}`;
}

/**
 * Prefixes a root-relative path with {@link BASE_PATH}.
 *
 * next/link and next/image add the base path on their own, but plain anchors
 * to files in public/ (such as the PDFs) do not, so those links go through here.
 *
 * @param path - A root-relative path such as "/docs/resume.pdf".
 * @returns The path as served on GitHub Pages, e.g. "/HassanDev/docs/resume.pdf".
 * @throws If the path is not root-relative, which would make the link page-relative.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(`withBasePath expects a root-relative path, got "${path}"`);
  }
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) {
    return path;
  }
  return `${BASE_PATH}${path}`;
}
