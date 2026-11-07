/**
 * Site nav: a 56px bar on a solid background with a hairline under it. The
 * name sits on the left. From 768px the right side holds the Engineering,
 * Studio and Case studies links, the theme toggle and the Contact button; on phones it holds
 * the theme toggle and a menu button that opens the links (NavMenu).
 */
import { NavMenu } from "@/components/features/NavMenu";
import { ThemeToggle } from "@/components/features/ThemeToggle";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/content/caseStudies";
import { profile } from "@/content/profile";
import { siteChrome } from "@/content/site";
import { tracks, type NavSection } from "@/content/tracks";
import { publishedCaseStudies } from "@/lib/caseStudies";
import { cx } from "@/lib/cx";

/** Props for {@link Nav}. */
export interface NavProps {
  /** The part of the site being viewed; null on pages that belong to none (the 404). */
  current: NavSection | null;
  /** Where Contact goes: this page's contact section, or a track page's. */
  contactHref: string;
}

/**
 * Renders the site header and its navigation.
 *
 * @param props.current - The part of the site being viewed, or null for none.
 * @param props.contactHref - Target of the Contact button.
 */
export function Nav({ current, contactHref }: NavProps) {
  const links = [
    ...tracks.map((track) => ({
      href: track.href,
      label: track.navLabel,
      current: track.id === current,
    })),
    // Only once a case study is published; until then the list has nothing in it.
    ...(publishedCaseStudies(caseStudies).length > 0
      ? [{ ...siteChrome.caseStudiesLink, current: current === "case-studies" }]
      : []),
  ];
  const contact = { href: contactHref, label: siteChrome.contactLabel };

  return (
    // The top padding keeps the bar clear of a phone's status bar and notch.
    <header className="sticky top-0 z-40 border-b border-line bg-bg pt-[env(safe-area-inset-top)]">
      <nav className="mx-auto flex h-14 max-w-page items-center justify-between gap-4 px-page">
        <AppLink href="/" className="inline-flex min-h-11 items-center text-[17px] font-semibold">
          {profile.fullName}
        </AppLink>

        <div className="flex items-center gap-2 md:gap-6">
          <ul className="m-0 hidden list-none items-center gap-6 p-0 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                {/* The current page is marked for screen readers too, not only by colour. */}
                <AppLink
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  className={cx(
                    "inline-flex min-h-11 items-center border-b-2 text-[15px]",
                    link.current
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-2 hover:text-ink",
                  )}
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          {/* Hidden on the wrapper: the button's own display class would win over "hidden". */}
          <div className="hidden md:block">
            <Button href={contact.href} size="sm">
              {contact.label}
            </Button>
          </div>
          <NavMenu links={links} contact={contact} label={siteChrome.menuLabel} />
        </div>
      </nav>
    </header>
  );
}
