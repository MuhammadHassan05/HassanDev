/**
 * Education section of the engineer page: degree, coursework, leadership,
 * competitions and certification, taken word for word from the design kit.
 */
import { profile } from "./profile";
import type { LinkAction, SectionIntro } from "./types";

/** The degree card. */
export interface Degree {
  status: string;
  title: string;
  institution: string;
  coursework: readonly string[];
}

/** Kind of a small education card. */
export type HighlightKind = "leadership" | "competition" | "certification";

/** One of the small cards beside the degree. */
export interface EducationHighlight {
  kind: HighlightKind;
  /** Mono accent line, e.g. "Competition · Apr 2025". */
  eyebrow: string;
  title: string;
  detail: string;
  link?: LinkAction;
}

/** The whole education section. */
export interface EducationSection {
  section: SectionIntro;
  degree: Degree;
  highlights: readonly EducationHighlight[];
}

/** Education content in design order. */
export const education: EducationSection = {
  section: {
    index: "03",
    label: "education",
    title: "Degree, leadership and certifications",
  },
  degree: {
    status: "Expected 2027",
    title: "BS Software Engineering",
    institution: "FAST-NUCES, Lahore · final year",
    coursework: [
      "Data Structures",
      "OOP",
      "Algorithms",
      "Artificial Neural Networks",
      "Parallel & Distributed Computing",
      "Information Security",
      "Deep Learning for Perception",
    ],
  },
  highlights: [
    {
      kind: "leadership",
      eyebrow: "Leadership · Sep 2026",
      title: "Social Media Manager, FAST Lahore",
      detail: "Youth International Conclave (YIC)",
      link: { label: "View letter", href: profile.links.appointmentLetter, newTab: true },
    },
    {
      kind: "competition",
      eyebrow: "Competition",
      title: "SOFTEC'26 · App Development",
      detail: "FAST-NUCES Lahore",
    },
    {
      kind: "competition",
      eyebrow: "Competition · Apr 2025",
      title: "NaSCon'25 · National Solutions Convention",
      detail: "FAST-NUCES Islamabad",
    },
    {
      kind: "certification",
      eyebrow: "Certification",
      title: "Google IT Automation with Python",
      detail: "Coursera / Google",
    },
  ],
};
