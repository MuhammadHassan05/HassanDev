/**
 * Headline numbers under each page's hero, taken word for word from the
 * design kit.
 */
import type { TrackId } from "./tracks";

/** One stat card: a big number and what it counts. */
export interface Stat {
  value: string;
  label: string;
}

/** Stats for each page. */
export const stats: Record<TrackId, readonly Stat[]> = {
  engineer: [
    { value: "2+", label: "years shipping production SaaS and web platforms" },
    { value: "37+", label: "operators on the live SaaS I test and build for" },
    { value: "100+", label: "resumes screened by TalentMiner" },
    { value: "2,770+", label: "organic impressions for flatterlab in 3 months" },
  ],
  studio: [
    { value: "15+", label: "production websites for international clients" },
    { value: "4", label: "countries served: US, Canada, Germany, Italy" },
    { value: "2023", label: "building on Shopify professionally since" },
  ],
};
