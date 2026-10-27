/**
 * Custom 404 page (exported as 404.html, which GitHub Pages serves for any
 * missing path under the site): a glass terminal card that reports the page
 * as a missing command, and a link back home.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRightIcon } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { notFound } from "@/content/site";

// Next.js marks not-found pages noindex by itself, so no robots setting is needed here.
export const metadata: Metadata = {
  title: `${notFound.title} · ${profile.fullName}`,
};

/** Renders the 404 page. */
export default function NotFound() {
  return (
    <PageShell track="engineer" isTrackPage={false}>
      <section className="mx-auto flex max-w-page flex-col items-start gap-8 px-gutter py-section">
        <h1 className="m-0 font-heading text-[clamp(38px,5.5vw,72px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
          {notFound.title}
        </h1>
        <GlassCard
          radius="card-lg"
          className="w-full max-w-[560px] overflow-hidden font-mono text-[14px] leading-[1.75]"
        >
          <div
            aria-hidden="true"
            className="flex items-center gap-2 border-b border-white/10 px-[18px] py-3.5"
          >
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>
          <p className="m-0 px-[22px] py-5 text-dim">{notFound.terminalLine}</p>
        </GlassCard>
        <Button href={notFound.homeLink.href}>
          {notFound.homeLink.label}
          <ArrowRightIcon />
        </Button>
      </section>
    </PageShell>
  );
}
