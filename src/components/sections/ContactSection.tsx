/**
 * Closing contact section: a large centred heading, the email as a big text
 * link, the one primary button and the profile links as text links. The
 * footer follows directly after it.
 */
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import type { ContactContent } from "@/content/profile";

/** Props for {@link ContactSection}. */
export interface ContactSectionProps {
  content: ContactContent;
}

/**
 * Renders the contact section.
 *
 * @param props.content - Contact copy from src/content/profile.ts.
 */
export function ContactSection({ content }: ContactSectionProps) {
  const titleId = "contact-title";

  return (
    <section
      id="contact"
      aria-labelledby={titleId}
      data-reveal=""
      className="mx-auto flex max-w-page flex-col items-center gap-8 px-page py-section text-center"
    >
      <h2 id={titleId} className="m-0 max-w-[18ch] text-hero text-balance">
        {content.heading}
      </h2>
      {/* Long enough to need wrapping on a 360px phone, so it may break anywhere. */}
      <AppLink
        href={content.email.href}
        className="inline-flex min-h-11 max-w-full items-center text-[clamp(22px,3.4vw,36px)] font-medium tracking-[-0.01em] break-all text-accent-ink hover:underline hover:underline-offset-8"
      >
        {content.email.label}
      </AppLink>
      <div className="flex w-full flex-col items-center gap-4 pt-2 md:w-auto md:flex-row md:gap-8">
        <Button href={content.primary.href} newTab={content.primary.newTab}>
          {content.primary.label}
        </Button>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 p-0">
          {content.links.map((link) => (
            <li key={link.label}>
              <Button href={link.href} newTab={link.newTab} variant="text">
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
