/**
 * Replaces Next.js's built-in client polyfills (see turbopack.resolveAlias in
 * next.config.ts). Next always bundles them, but the browsers it supports
 * (Chrome/Edge/Firefox 111+, Safari 16.4+) already have every one natively,
 * so they are dead weight that Lighthouse reports as legacy JavaScript.
 *
 * The one exception is URL.canParse (Chrome 120+, Safari 17+), which Next's
 * own code may call, so that single polyfill is kept.
 */
if (!("canParse" in URL)) {
  Object.defineProperty(URL, "canParse", {
    configurable: true,
    writable: true,
    value(url: string | URL, base?: string | URL): boolean {
      try {
        new URL(url, base);
        return true;
      } catch {
        return false;
      }
    },
  });
}

export {};
