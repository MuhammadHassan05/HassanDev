/**
 * Studio services: four glass cards, each with a line icon, title and description.
 */
import type { ComponentType } from "react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/GlassCard";
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
            <GlassCard key={service.title} as="li" className="flex flex-col gap-3 p-[26px]">
              <span className="inline-flex size-[46px] items-center justify-center rounded-inner border border-glass-border bg-white/8 text-accent">
                <Icon />
              </span>
              <h3 className="m-0 font-heading text-[20px] font-bold">{service.title}</h3>
              <p className="m-0 text-[15.5px] text-body">{service.description}</p>
            </GlassCard>
          );
        })}
      </ul>
    </Section>
  );
}
