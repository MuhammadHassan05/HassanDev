/**
 * Site footer: copyright and location line from the design.
 */
import { siteChrome } from "@/content/site";

/** Renders the footer row. */
export function Footer() {
  const { copyright, location } = siteChrome.footer;
  return (
    <footer className="mx-auto w-full max-w-page px-gutter pb-12">
      <div className="flex flex-wrap justify-between gap-3 px-2 pt-8 font-mono text-[13px] text-faint">
        <span>{copyright}</span>
        <span>{location}</span>
      </div>
    </footer>
  );
}
