/**
 * Studio services: plain text in four columns (one on phones, two from
 * 768px), each a title and a short description under a hairline. No cards.
 */
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/content/services";

/** Renders the services section. */
export function ServicesSection() {
  const titleId = "services-title";
  return (
    <Section id="services" labelledBy={titleId}>
      <SectionHeader {...services.section} titleId={titleId} />
      <ul className="m-0 grid list-none gap-x-10 gap-y-10 p-0 md:grid-cols-2 lg:grid-cols-4">
        {services.services.map((service) => (
          <li key={service.title} className="flex flex-col gap-2 border-t border-line pt-6">
            <h3 className="m-0 text-[17px] font-semibold">{service.title}</h3>
            <p className="m-0 text-ink-2">{service.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
