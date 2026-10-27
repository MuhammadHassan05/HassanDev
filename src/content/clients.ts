/**
 * Freelance clients on the studio page, taken word for word from the design
 * kit. The engineer page has no clients section.
 */
import type { SectionIntro } from "./types";

/** One client card. */
export interface Client {
  name: string;
  country: string;
}

/** The studio clients section. */
export interface ClientsSection {
  section: SectionIntro;
  clients: readonly Client[];
}

/** Clients in design order. */
export const clients: ClientsSection = {
  section: {
    index: "04",
    label: "freelance",
    title: "Clients I have built for",
    description:
      "15+ production sites via direct work, LinkedIn and Upwork: SaaS, booking systems, medical clinics, immigration portals and social apps.",
  },
  clients: [
    { name: "BoatBites", country: "United States" },
    { name: "OnePlace.ca", country: "Canada" },
    { name: "VTEST Corp", country: "United States" },
    { name: "Dr. Bargello", country: "Germany" },
    { name: "Rome Cabs", country: "Italy" },
  ],
};
