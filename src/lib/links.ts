/**
 * Classifies hrefs so every link is rendered the right way: routes through
 * next/link, public files through withBasePath, and external URLs with
 * rel="noopener noreferrer".
 */

/** How a link has to be rendered. */
export type LinkKind = "route" | "asset" | "anchor" | "external";

/**
 * Works out what kind of destination an href points to.
 *
 * Only https and mailto are accepted as external schemes, so a javascript:
 * or plain http URL in content fails loudly at build time instead of shipping.
 *
 * @param href - A route ("/studio/"), public file ("/docs/a.pdf"), in-page
 *   anchor ("#projects") or external URL ("https://…", "mailto:…").
 * @returns The link kind.
 * @throws If the href is relative, protocol-relative or uses another scheme.
 */
export function linkKind(href: string): LinkKind {
  if (href.startsWith("#")) {
    return "anchor";
  }
  if (/^(https:\/\/|mailto:)/i.test(href)) {
    return "external";
  }
  if (href.startsWith("/") && !href.startsWith("//")) {
    const path = href.split(/[?#]/, 1)[0] ?? "";
    return /\.[a-z0-9]+$/i.test(path) ? "asset" : "route";
  }
  throw new Error(`Unsupported link "${href}": use a route, /file, #anchor, https: or mailto:`);
}
