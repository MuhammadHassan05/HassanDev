/**
 * Closing contact section: a large centred heading, the email link and the
 * row of call-to-action buttons. The footer follows directly after it.
 */
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import type { ContactContent } from "@/content/profile";

/** Props for {@link ContactSection}. */
export interface ContactSectionProps {
  content: ContactContent;
}

/**
 * Renders the contact section. The first action is the primary button, the
 * rest are secondary.
 *
 * @param props.content - Contact copy from src/content/profile.ts.
 */
export function ContactSection({ content }: ContactSectionProps) {
  const titleId = "contact-title";
  const [primary, ...others] = content.actions;

  return (
    <section
      id="contact"
      aria-labelledby={titleId}
      data-reveal=""
      className="mx-auto flex max-w-page flex-col items-center gap-8 px-page py-section text-center"
    >
      <h2 id={titleId} className="m-0 max-w-[18ch] text-title text-balance">
        {content.heading}
      </h2>
      <AppLink
        href={content.email.href}
        className="inline-flex min-h-11 items-center text-lead text-accent-ink underline underline-offset-4"
      >
        {content.email.label}
      </AppLink>
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:flex-wrap md:justify-center">
        {primary ? (
          <Button href={primary.href} newTab={primary.newTab}>
            {primary.label}
          </Button>
        ) : null}
        {others.map((action) => (
          <Button key={action.label} href={action.href} newTab={action.newTab} variant="secondary">
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
