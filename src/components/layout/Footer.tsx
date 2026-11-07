/**
 * Site footer: copyright and location, above a hairline.
 */
import { siteChrome } from "@/content/site";

/** Renders the footer row. */
export function Footer() {
  const { copyright, location } = siteChrome.footer;
  return (
    <footer className="mx-auto w-full max-w-page px-page pb-[max(48px,env(safe-area-inset-bottom))]">
      <div className="flex flex-col gap-2 border-t border-line pt-8 text-small text-ink-2 md:flex-row md:justify-between">
        <span>{copyright}</span>
        <span>{location}</span>
      </div>
    </footer>
  );
}
