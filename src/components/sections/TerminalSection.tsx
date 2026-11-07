/**
 * The interactive terminal in its own small section on the engineer page:
 * a centred heading, one supporting line and the terminal under them.
 */
import { Terminal } from "@/components/features/Terminal";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { terminal } from "@/content/terminal";

const SECTION_ID = "terminal";

/** Renders the terminal section. */
export function TerminalSection() {
  const titleId = `${SECTION_ID}-title`;
  return (
    <Section id={SECTION_ID} labelledBy={titleId}>
      <SectionHeader {...terminal.section} titleId={titleId} />
      <div className="mx-auto w-full max-w-[640px]">
        <Terminal />
      </div>
    </Section>
  );
}
