/**
 * Custom 404 page (exported as 404.html, which GitHub Pages serves for any
 * missing path under the site): a terminal line that reports the page as a
 * missing command, and a link back home.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { notFound } from "@/content/site";
import { terminal } from "@/content/terminal";

// Next.js marks not-found pages noindex by itself, so no robots setting is needed here.
export const metadata: Metadata = {
  title: `${notFound.title} · ${profile.fullName}`,
};

/** Renders the 404 page. */
export default function NotFound() {
  return (
    <PageShell track="engineer" isTrackPage={false}>
      <section className="mx-auto flex max-w-page flex-col items-center gap-8 px-page py-section text-center">
        <h1 className="m-0 text-title">{notFound.title}</h1>
        {/* Styled like the hero terminal: a flat mono card. */}
        <p className="m-0 rounded-card bg-surface-2 px-6 py-5 font-mono text-[14px] text-ink-2">
          <span aria-hidden="true" className="text-accent-ink">
            {terminal.prompt}{" "}
          </span>
          {notFound.terminalLine}
        </p>
        <Button href={notFound.homeLink.href}>{notFound.homeLink.label}</Button>
      </section>
    </PageShell>
  );
}
