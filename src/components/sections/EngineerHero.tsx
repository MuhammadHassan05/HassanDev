/**
 * Engineer page hero: the name (the page's h1), role line, pitch, calls to
 * action and the interactive terminal. One column on phones; from 1024px the
 * terminal sits beside the text.
 */
import { Terminal } from "@/components/features/Terminal";
import { Button } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";
import { pitch, profile } from "@/content/profile";

/** Renders the hero. The name is the page's only h1. */
export function EngineerHero() {
  const { hero } = pitch.engineer;
  const [primary, secondary] = hero.actions;

  return (
    <section className="mx-auto grid max-w-page items-center gap-12 px-page pt-16 pb-section md:pt-24 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="flex min-w-0 flex-col gap-6">
        <h1 className="m-0 text-hero">
          {/* Two lines on every width, so the name never breaks mid-word. */}
          <span className="block">{profile.firstName}</span>
          <span className="block">{profile.lastName}</span>
        </h1>
        <p className="m-0 text-lead text-ink-2">{profile.roleLine}</p>
        <p className="m-0 text-lead">{hero.summary}</p>
        <div className="flex flex-col gap-3 pt-2 md:flex-row">
          {primary ? (
            <Button href={primary.href} newTab={primary.newTab}>
              {primary.label}
            </Button>
          ) : null}
          {secondary ? (
            <Button href={secondary.href} newTab={secondary.newTab} variant="secondary">
              <DownloadIcon />
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
      <Terminal />
    </section>
  );
}
