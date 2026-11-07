/**
 * Site footer: a row of links to every part of the site, then a hairline and
 * one line with the copyright on the left and the location on the right. The
 * link row is also where the phone menu button leads when JavaScript is off.
 */
import { AppLink } from "@/components/ui/AppLink";
import { caseStudies } from "@/content/caseStudies";
import { siteChrome } from "@/content/site";
import { tracks } from "@/content/tracks";
import { publishedCaseStudies } from "@/lib/caseStudies";
import { SITE_LINKS_ID } from "@/lib/dom-ids";

/** Props for {@link Footer}. */
export interface FooterProps {
  /** Where Contact goes: this page's contact section, or the home page's. */
  contactHref: string;
}

/**
 * Renders the footer.
 *
 * @param props.contactHref - Target of the Contact link.
 */
export function Footer({ contactHref }: FooterProps) {
  const { copyright, location } = siteChrome.footer;
  const links = [
    ...tracks.map((track) => ({ label: track.navLabel, href: track.href })),
    // Only once a case study is published; until then the list has nothing in it.
    ...(publishedCaseStudies(caseStudies).length > 0 ? [siteChrome.caseStudiesLink] : []),
    { label: siteChrome.contactLabel, href: contactHref },
  ];

  return (
    <footer className="mx-auto w-full max-w-page px-page pb-[max(48px,env(safe-area-inset-bottom))]">
      <nav id={SITE_LINKS_ID} aria-label={siteChrome.footerNavLabel}>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 p-0 pb-4">
          {links.map((link) => (
            <li key={link.label}>
              <AppLink
                href={link.href}
                className="inline-flex min-h-11 items-center text-small text-ink-2 hover:text-ink"
              >
                {link.label}
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line pt-6 text-small text-ink-2">
        <span>{copyright}</span>
        <span>{location}</span>
      </div>
    </footer>
  );
}
