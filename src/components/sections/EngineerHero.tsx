/**
 * Engineer page hero: availability badge, the Editorial name treatment,
 * role line, pitch, calls to action and the terminal card.
 */
import { ChaiCounter } from "@/components/features/ChaiCounter";
import { ChaiProvider } from "@/components/features/ChaiProvider";
import { Terminal } from "@/components/features/Terminal";
import { Badge } from "@/components/ui/Badge";
import { BounceText } from "@/components/ui/BounceText";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, DownloadIcon } from "@/components/ui/icons";
import { pitch, profile } from "@/content/profile";

/** Renders the hero. The name is the page's only h1. */
export function EngineerHero() {
  const { hero } = pitch.engineer;
  const [primary, secondary] = hero.actions;

  return (
    <section className="mx-auto flex max-w-page flex-wrap items-center gap-12 px-gutter pt-[clamp(48px,9vw,88px)] pb-[clamp(36px,6vw,56px)]">
      {/* The counter and the terminal's chai command share one count. */}
      <ChaiProvider>
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <div className="flex flex-wrap gap-2.5">
            <Badge>{hero.availability}</Badge>
            <ChaiCounter />
          </div>
          {/* The letters are hidden from screen readers, so the h1 carries the name. */}
          <h1 aria-label={profile.fullName} className="m-0 flex flex-col gap-1">
            <span className="inline-block font-display text-[clamp(52px,7.5vw,104px)] leading-[0.95] font-extrabold tracking-[-0.045em] whitespace-nowrap">
              <BounceText text={profile.firstName} />
            </span>
            <span className="inline-block font-serif text-[clamp(64px,9vw,128px)] leading-[0.9] font-normal tracking-[-0.01em] whitespace-nowrap text-accent italic">
              <BounceText text={profile.lastName} />
            </span>
          </h1>
          <p className="m-0 font-mono text-[15px] text-accent">{profile.roleLine}</p>
          <p className="m-0 max-w-[620px] text-[21px] leading-normal text-body">{hero.summary}</p>
          <div className="flex flex-wrap gap-3 pt-1.5">
            {primary ? (
              <Button href={primary.href} newTab={primary.newTab}>
                {primary.label}
                <ArrowRightIcon />
              </Button>
            ) : null}
            {secondary ? (
              <Button href={secondary.href} newTab={secondary.newTab} variant="glass">
                <DownloadIcon />
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
        <Terminal />
      </ChaiProvider>
    </section>
  );
}
