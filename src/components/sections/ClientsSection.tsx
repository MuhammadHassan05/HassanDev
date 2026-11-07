/**
 * Freelance clients on the studio page: a grid of name and country cards.
 */
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clients } from "@/content/clients";

/** Renders the clients section. */
export function ClientsSection() {
  const titleId = "clients-title";
  return (
    <Section id="clients" labelledBy={titleId}>
      <SectionHeader {...clients.section} titleId={titleId} />
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4 p-0">
        {clients.clients.map((client) => (
          <Card key={client.name} as="li" radius="card-sm" className="flex flex-col gap-1 p-[22px]">
            <span className="font-heading text-[21px] font-bold">{client.name}</span>
            <span className="font-mono text-[13px] text-ink-2">{client.country}</span>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
