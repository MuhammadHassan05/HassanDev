/**
 * Experience timelines for both pages, taken word for word from the design
 * kit (plus the RICI International bullet confirmed in CLAUDE.md).
 */
import { profile } from "./profile";
import type { TrackId } from "./tracks";
import type { LinkAction, SectionIntro } from "./types";

/** One role on a timeline. The design shows it as "role · organization". */
export interface ExperienceEntry {
  dates: string;
  role: string;
  organization: string;
  bullets: readonly string[];
  link?: LinkAction;
}

/** A page's experience section. */
export interface ExperienceSection {
  section: SectionIntro;
  entries: readonly ExperienceEntry[];
}

/** Experience for each page. */
export const experience: Record<TrackId, ExperienceSection> = {
  engineer: {
    section: { index: "02", label: "experience", title: "Engineering experience" },
    entries: [
      {
        dates: "Jun 2026 to now",
        role: "QA & AI Automation Developer",
        organization: "Yetti.ai",
        bullets: [
          "Ran full QA audits across 5 core modules (Captain, Dashboard, CRM, Booking, Widgets) and documented 30+ structured bugs on a live Next.js/Supabase SaaS serving 37+ operators.",
          "Found and resolved a critical security vulnerability: a malicious PostCSS config pushed to the shared production repo.",
          "Built AI-driven features with Vapi.ai voice agents and OTA integrations (GetYourGuide, Viator, Bokun).",
          "Led the full UI redesign of the Captain module using Claude Code, shipped to production.",
        ],
      },
    ],
  },
  studio: {
    section: { index: "06", label: "experience", title: "Freelance and studio experience" },
    entries: [
      {
        dates: "2025 to now",
        role: "Full-Stack & Shopify Developer",
        organization: "Freelance",
        bullets: [
          "Delivered 15+ production websites for clients in the US, Canada, Germany and Italy, via direct work, LinkedIn and Upwork.",
          "Built SaaS platforms, booking systems, medical clinic sites, immigration portals and proximity-based social apps.",
        ],
      },
      {
        dates: "Sep 2026 to now",
        role: "Social Media Manager",
        organization: "Youth International Conclave (YIC)",
        bullets: [
          "Represent YIC across digital platforms for the FAST University Lahore campus.",
          "Run social media campaigns promoting YIC initiatives, meetings and activities.",
        ],
        link: {
          label: "View appointment letter",
          href: profile.links.appointmentLetter,
          newTab: true,
        },
      },
      {
        dates: "2023 to 2025",
        role: "Senior Shopify Developer",
        organization: "RICI International",
        // Replaces the design's "[ADD 1 TO 2 RESULTS]" placeholder, as confirmed in CLAUDE.md.
        bullets: ["Built and customized Shopify themes and stores for clients."],
      },
      {
        dates: "Jun to Jul 2025",
        role: "UI/UX Design Intern",
        organization: "Elevvo Pathway",
        bullets: [
          "Prototyped user flows in Figma and delivered production-ready assets in Canva and Photoshop.",
        ],
      },
    ],
  },
};
