/**
 * Services offered on the studio page, taken word for word from the design
 * kit. The engineer page has no services section.
 */
import type { SectionIntro } from "./types";

/** Which line icon from the design a service card shows. */
export type ServiceIcon = "shopping-bag" | "monitor" | "sparkle" | "clock-refresh";

/** One service card. */
export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
}

/** The studio services section. */
export interface ServicesSection {
  section: SectionIntro;
  services: readonly Service[];
}

/** Services in design order. */
export const services: ServicesSection = {
  section: { index: "01", label: "services", title: "What I can do for you" },
  services: [
    {
      icon: "shopping-bag",
      title: "Shopify development",
      description:
        "Theme customization, custom cart and checkout logic, store builds and integrations with back-office systems.",
    },
    {
      icon: "monitor",
      title: "Websites & web apps",
      description:
        "SaaS platforms, booking systems, clinic sites and portals built with React, Next.js and Node.js.",
    },
    {
      icon: "sparkle",
      title: "Brand & graphic design",
      description:
        "Logos, identity systems and apparel graphics, plus production-ready assets in Figma, Canva and Photoshop.",
    },
    {
      icon: "clock-refresh",
      title: "Store automation",
      description:
        "Order notifications on WhatsApp and email, plus N8N and Zapier workflows that cut manual work.",
    },
  ],
};
