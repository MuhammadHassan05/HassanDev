/**
 * Services offered on the studio page, taken word for word from the design
 * kit. The engineer page has no services section.
 */
import type { SectionIntro } from "./types";

/** One service: a title and a short description. */
export interface Service {
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
  section: { title: "What I can do for you" },
  services: [
    {
      title: "Shopify development",
      description:
        "Theme customization, custom cart and checkout logic, store builds and integrations with back-office systems.",
    },
    {
      title: "Websites & web apps",
      description:
        "SaaS platforms, booking systems, clinic sites and portals built with React, Next.js and Node.js.",
    },
    {
      title: "Brand & graphic design",
      description:
        "Logos, identity systems and apparel graphics, plus production-ready assets in Figma, Canva and Photoshop.",
    },
    {
      title: "Store automation",
      description:
        "Order notifications on WhatsApp and email, plus N8N and Zapier workflows that cut manual work.",
    },
  ],
};
