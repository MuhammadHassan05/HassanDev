/**
 * Case studies: the /case-studies/ list, one page per case study, the bands
 * on both track pages and the "Read case study" links on project cards.
 *
 * Written only from facts Hassan supplied. Anything not yet known is marked
 * with a TODO marker in square brackets, and a case study with any marker is
 * a draft. Drafts are left out of the build entirely (no page, card, link or
 * sitemap entry); tests/content-todo.test.ts fails CI and the deploy if a
 * published case study still has a marker.
 */
import type { IllustrationKey } from "./illustrations";
import type { TrackId } from "./tracks";
import type { LinkAction, SectionIntro } from "./types";

/** The large visual at the top of a case study. */
export type CaseStudyCover =
  | { kind: "illustration"; illustration: IllustrationKey }
  /** The Tiny Owlets before/after slider (src/content/cartComparison.ts). */
  | { kind: "slider" };

/** "What I did": short paragraphs, or 3 to 5 bullets. */
export type CaseStudyWork =
  { kind: "paragraphs"; items: readonly string[] } | { kind: "bullets"; items: readonly string[] };

/** One key decision and why it was made. */
export interface CaseStudyDecision {
  decision: string;
  reason: string;
}

/** One big number in the result. */
export interface CaseStudyMetric {
  value: string;
  label: string;
}

/** One case study. */
export interface CaseStudy {
  /** URL segment: /case-studies/<slug>/. */
  slug: string;
  /** Left out of the build until it is finished. */
  draft: boolean;
  title: string;
  /** One line, shown under the title and in cards. */
  summary: string;
  /** The client or product. */
  client: string;
  /** Left out of the meta row when there is no fact for it. */
  role?: string;
  /** Left out of the meta row when there is no fact for it. */
  year?: string;
  stack: readonly string[];
  link?: LinkAction;
  /** Sets the accent colour of the page: burgundy (engineer) or olive (studio). */
  track: TrackId;
  cover: CaseStudyCover;
  /** The project card that gets a "Read case study" link. */
  project: IllustrationKey;
  challenge: readonly string[];
  work: CaseStudyWork;
  /** 2 to 3 decisions, each with its reason; the section is left out when there are no facts for it. */
  decisions?: readonly CaseStudyDecision[];
  result: {
    /** Real numbers only, up to 4. With none, only the summary is shown. */
    metrics: readonly CaseStudyMetric[];
    summary: string;
  };
  /** Left out when there are no facts for it. */
  next?: readonly string[];
}

/** Fixed copy around the case studies. Labels given by Hassan. */
export const caseStudyLabels = {
  listTitle: "Case studies",
  sections: {
    challenge: "The challenge",
    work: "What I did",
    decisions: "Key decisions",
    result: "The result",
    next: "What I'd do next",
  },
  meta: { role: "Role", year: "Year", stack: "Stack", link: "Link" },
  readCaseStudy: "Read case study",
  nextCaseStudy: "Next case study",
  backToAll: "Back to all case studies",
} as const;

/** Header of the "Selected case studies" band on the engineer page. */
export const caseStudiesIntro: SectionIntro = {
  title: "Selected case studies",
};

/**
 * Every case study, in the order of the list page and the "Next" links. Facts
 * come from Hassan and his resume (design-kit/docs/Muhammad-Hassan-Resume.pdf);
 * fields and sections with no facts behind them are left out.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "yetti-ai",
    // Held back until Hassan's manager has approved publishing it.
    draft: true,
    title: "Yetti.ai: hardening and improving a live booking SaaS",
    summary: "QA, security and UI work on a live multi-tenant booking SaaS serving 37+ operators.",
    client: "Yetti.ai",
    role: "QA & AI Automation Developer",
    year: "Since June 2026",
    stack: ["Next.js", "Supabase", "Vapi.ai", "Claude Code"],
    link: { label: "yetti.ai", href: "https://yetti.ai", newTab: true },
    track: "engineer",
    cover: { kind: "illustration", illustration: "yetti-ai" },
    project: "yetti-ai",
    challenge: [
      "Yetti.ai is a live, multi-tenant SaaS built on Next.js and Supabase, serving 37+ operators. It needed full QA coverage across its five core modules: Captain, Dashboard, CRM, Booking and Widgets.",
    ],
    work: {
      kind: "bullets",
      items: [
        "Ran full QA audits across the five core modules and documented 30+ structured bug reports.",
        "Identified and resolved a critical security vulnerability: a malicious build configuration file (a PostCSS config) pushed to the shared production repository.",
        "Contributed to AI features built on Vapi.ai voice agents, and to OTA integrations with GetYourGuide, Viator and Bokun.",
        "Led the full UI redesign of the Captain module using Claude Code, and shipped it to production.",
      ],
    },
    result: {
      metrics: [
        { value: "5", label: "core modules audited" },
        { value: "30+", label: "bugs documented" },
        { value: "37+", label: "operators served" },
      ],
      summary:
        "The critical security vulnerability was resolved, and the redesigned Captain module shipped to production.",
    },
  },
  {
    slug: "tiny-owlets",
    draft: false,
    title: "Tiny Owlets: a cart that converts",
    summary:
      "A Shopify cart reworked around a Place Order flow, with automatic item removal and WhatsApp order notifications.",
    client: "Tiny Owlets",
    role: "Freelance Shopify developer",
    stack: ["Shopify", "Liquid"],
    track: "studio",
    cover: { kind: "slider" },
    project: "tiny-owlets",
    challenge: [
      "The store ran on an older Vintage-style Shopify theme, not Online Store 2.0, with its cart logic in sections/cart-template.liquid. The cart's main button said “Update Cart”, items stayed in the cart at a quantity of zero, and there were no order alerts.",
    ],
    work: {
      kind: "bullets",
      items: [
        "Changed the cart's “Update Cart” button to a “Place Order” flow.",
        "Made items remove themselves automatically when their quantity drops below 1.",
        "Set up WhatsApp notifications for when an order is placed and when it is confirmed.",
        "Added an order confirmation email.",
      ],
    },
    result: {
      metrics: [],
      summary:
        "The cart now leads to a Place Order flow, empty lines remove themselves, and every order sends WhatsApp notifications and a confirmation email.",
    },
  },
  {
    slug: "talentminer",
    draft: false,
    title: "TalentMiner: AI resume screening",
    summary:
      "An AI screening tool that extracts skills from resumes, matches them to a job description and ranks the candidates.",
    client: "TalentMiner",
    stack: ["TypeScript", "Python", "Flask", "NLTK"],
    link: {
      label: "GitHub",
      href: "https://github.com/MuhammadZaighamAsif/TalentMiner",
      newTab: true,
    },
    track: "engineer",
    cover: { kind: "illustration", illustration: "talentminer" },
    project: "talentminer",
    challenge: ["The goal: automate resume screening, from skill extraction to candidate ranking."],
    work: {
      kind: "paragraphs",
      items: [
        "Built, as a team project, an AI screening tool with NLTK-based skill extraction, job description matching and automated candidate ranking.",
      ],
    },
    result: {
      metrics: [{ value: "100+", label: "resumes processed" }],
      summary:
        "TalentMiner processed 100+ resumes end to end: skill extraction with NLTK, matching against the job description and automated candidate ranking.",
    },
  },
  {
    slug: "flatterlab",
    draft: false,
    title: "flatterlab.tech: a free platform for students",
    summary:
      "A free platform I co-founded that helps students build resumes and discover extracurriculars.",
    client: "flatterlab.tech",
    role: "Co-founder",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "Vercel"],
    link: { label: "flatterlab.tech", href: "https://flatterlab.tech", newTab: true },
    track: "engineer",
    cover: { kind: "illustration", illustration: "flatterlab-tech" },
    project: "flatterlab-tech",
    challenge: [
      "The aim: help students build resumes and discover extracurricular activities, for free.",
    ],
    work: {
      kind: "paragraphs",
      items: [
        "I co-founded and built flatterlab.tech, a free SaaS platform, with Next.js, Tailwind CSS, Framer Motion and Node.js, deployed on Vercel.",
      ],
    },
    result: {
      // Google Search Console, July to November 2026.
      metrics: [{ value: "40K+", label: "Google search impressions in 4 months" }],
      summary:
        "flatterlab.tech earned 40K+ Google search impressions in 4 months, July to November 2026, according to Google Search Console.",
    },
  },
];

/** Which case studies each track page's band shows, in order. Given by Hassan. */
export const featuredCaseStudies: Record<TrackId, readonly string[]> = {
  engineer: ["yetti-ai", "talentminer", "flatterlab"],
  studio: ["tiny-owlets"],
};
