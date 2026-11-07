/**
 * Studio services: four cards, each with a line icon, title and description.
 */
import type { ComponentType } from "react";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClockRefreshIcon, MonitorIcon, ShoppingBagIcon, SparkleIcon } from "@/components/ui/icons";
import { services, type ServiceIcon } from "@/content/services";

/** Icon component for each icon key in the content; typed so none can be missing. */
const ICONS: Record<ServiceIcon, ComponentType<{ size?: number }>> = {
  "shopping-bag": ShoppingBagIcon,
  monitor: MonitorIcon,
  sparkle: SparkleIcon,
  "clock-refresh": ClockRefreshIcon,
};

/** Renders the services section. */
export function ServicesSection() {
  const titleId = "services-title";
  return (
    <Section id="services" labelledBy={titleId}>
      <SectionHeader {...services.section} titleId={titleId} />
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-[22px] p-0">
        {services.services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <Card key={service.title} as="li" className="flex flex-col gap-3 p-[26px]">
              <span className="inline-flex size-[46px] items-center justify-center rounded-card border border-line bg-surface-2 text-accent-ink">
                <Icon />
              </span>
              <h3 className="m-0 text-[20px] font-semibold">{service.title}</h3>
              <p className="m-0 text-[15.5px] text-ink">{service.description}</p>
            </Card>
          );
        })}
      </ul>
    </Section>
  );
}
