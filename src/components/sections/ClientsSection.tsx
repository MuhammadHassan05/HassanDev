/**
 * Freelance clients on the studio page: the names as large plain text in the
 * secondary colour, in one centred row that wraps.
 */
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clients } from "@/content/clients";

/** Renders the clients section. */
export function ClientsSection() {
  const titleId = "clients-title";
  return (
    <Section id="clients" labelledBy={titleId}>
      <SectionHeader {...clients.section} titleId={titleId} />
      <ul className="m-0 flex list-none flex-wrap justify-center gap-x-10 gap-y-3 p-0 text-[clamp(26px,3.4vw,40px)] leading-tight font-semibold tracking-[-0.02em] text-ink-2">
        {clients.clients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>
    </Section>
  );
}
