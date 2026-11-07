/**
 * Case studies: the /case-studies/ list, one page per case study, the bands
 * on both track pages and the "Read case study" links on project cards.
 *
 * Written only from facts Hassan supplied. Anything not yet known is marked
 * with a TODO marker in square brackets; tests/content-todo.test.ts fails CI
 * and the deploy while any marker is left, so nothing unfinished can go live.
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
  title: string;
  /** One line, shown under the title and in cards. */
  summary: string;
  /** The client or product. */
  client: string;
  role: string;
  year: string;
  stack: readonly string[];
  link?: LinkAction;
  /** Sets the accent colour of the page: burgundy (engineer) or olive (studio). */
  track: TrackId;
  cover: CaseStudyCover;
  /** The project card that gets a "Read case study" link. */
  project: IllustrationKey;
  challenge: readonly string[];
  work: CaseStudyWork;
  /** 2 to 3 decisions. */
  decisions: readonly CaseStudyDecision[];
  result: {
    /** 2 to 4 numbers. */
    metrics: readonly CaseStudyMetric[];
    summary: string;
  };
  next: readonly string[];
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

/** Every case study, in the order of the list page and the "Next" links. */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "yetti-ai",
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
      "Yetti.ai is a live, multi-tenant booking SaaS built on Next.js and Supabase, serving 37+ operators.",
      "[TODO: what you were asked to improve when you joined, in a sentence or two]",
    ],
    work: {
      kind: "bullets",
      items: [
        "Ran full QA audits across the five core modules (Captain, Dashboard, CRM, Booking and Widgets) and documented 30+ structured bugs.",
        "Identified and resolved a critical security issue: a malicious build configuration file (a PostCSS config) had been pushed to the shared production repository. [TODO: how it was caught, at a high level]",
        "Contributed to AI features built on Vapi.ai voice agents, and to integrations with the GetYourGuide, Viator and Bokun booking platforms.",
        "Led the full UI redesign of the Captain module using Claude Code, and shipped it to production.",
      ],
    },
    decisions: [
      {
        decision: "Document every bug in a structured format.",
        reason: "[TODO: why structured bug reports, and how the team used them]",
      },
      {
        decision: "Resolve the malicious config as a critical security issue.",
        reason: "[TODO: why, at a high level]",
      },
      {
        decision: "Redesign the Captain module with Claude Code.",
        reason: "[TODO: why Claude Code, and what it changed about the work]",
      },
    ],
    result: {
      metrics: [
        { value: "37+", label: "operators on the live platform" },
        { value: "5", label: "core modules audited" },
        { value: "30+", label: "structured bugs documented" },
        { value: "1", label: "critical security issue resolved" },
      ],
      summary:
        "The critical security issue in the shared production repository was resolved, and the redesigned Captain module shipped to production. [TODO: any measured outcome since, if you have one]",
    },
    next: ["[TODO: what you would do next on Yetti.ai]"],
  },
  {
    slug: "tiny-owlets",
    title: "Tiny Owlets: a cart that converts",
    summary:
      "A Shopify cart reworked around a Place Order flow, with automatic item removal and WhatsApp order notifications.",
    client: "Tiny Owlets",
    role: "[TODO: your role on this project, e.g. Shopify developer]",
    year: "[TODO: year]",
    stack: ["Shopify", "Liquid", "[TODO: the tool or app that sends the WhatsApp notifications]"],
    track: "studio",
    cover: { kind: "slider" },
    project: "tiny-owlets",
    challenge: [
      "The store ran on an older Vintage-style Shopify theme, not Online Store 2.0, with its cart logic in sections/cart-template.liquid. The cart's main button said “Update Cart”, items stayed in the cart at a quantity of zero, and there were no order alerts.",
      "[TODO: what this cost the store, e.g. missed or abandoned orders]",
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
    decisions: [
      {
        decision: "Change the cart inside the existing theme's cart template.",
        reason:
          "[TODO: why you worked in sections/cart-template.liquid rather than moving to an Online Store 2.0 theme]",
      },
      {
        decision: "Send order alerts on WhatsApp as well as by email.",
        reason: "[TODO: why WhatsApp, e.g. how the store owner or customers prefer to be reached]",
      },
    ],
    result: {
      metrics: [
        { value: "2", label: "WhatsApp order notifications: placed and confirmed" },
        { value: "[TODO: number]", label: "[TODO: a measured result after launch]" },
      ],
      summary:
        "The cart now leads to a Place Order flow, empty lines remove themselves, and every order sends WhatsApp notifications and a confirmation email.",
    },
    next: ["[TODO: what you would do next for Tiny Owlets]"],
  },
  {
    slug: "talentminer",
    title: "TalentMiner: AI resume screening",
    summary:
      "An AI screening tool that extracts skills from resumes, matches them to a job description and ranks the candidates.",
    client: "TalentMiner",
    role: "[TODO: your exact role on the team]",
    year: "[TODO: year]",
    stack: ["TypeScript", "Python", "Flask", "NLTK"],
    link: {
      label: "GitHub",
      href: "https://github.com/MuhammadZaighamAsif/TalentMiner",
      newTab: true,
    },
    track: "engineer",
    cover: { kind: "illustration", illustration: "talentminer" },
    project: "talentminer",
    challenge: ["[TODO: the problem TalentMiner set out to solve, and for whom]"],
    work: {
      kind: "paragraphs",
      items: [
        "TalentMiner was a team project. It processed 100+ resumes, using NLTK to extract skills, matching them against a job description and ranking the candidates automatically.",
        "[TODO: the parts you built yourself]",
      ],
    },
    decisions: [
      {
        decision: "Extract skills with NLTK.",
        reason: "[TODO: why NLTK]",
      },
      {
        decision: "Rank candidates by how well they match the job description.",
        reason: "[TODO: why this ranking approach]",
      },
    ],
    result: {
      metrics: [
        { value: "100+", label: "resumes processed" },
        { value: "[TODO: number]", label: "[TODO: a second measured result, if you have one]" },
      ],
      summary:
        "TalentMiner processed 100+ resumes end to end: skill extraction with NLTK, matching against the job description and automated candidate ranking.",
    },
    next: ["[TODO: what you would do next on TalentMiner]"],
  },
  {
    slug: "flatterlab",
    title: "flatterlab.tech: a free platform for students",
    summary:
      "A free platform I co-founded that helps students build resumes and discover extracurriculars.",
    client: "flatterlab.tech",
    role: "Co-founder",
    year: "[TODO: year]",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "Vercel"],
    link: { label: "flatterlab.tech", href: "https://flatterlab.tech", newTab: true },
    track: "engineer",
    cover: { kind: "illustration", illustration: "flatterlab-tech" },
    project: "flatterlab-tech",
    challenge: [
      "flatterlab.tech is a free platform that helps students build resumes and discover extracurriculars.",
      "[TODO: the problem it solves for students, in your words]",
    ],
    work: {
      kind: "paragraphs",
      items: [
        "I co-founded flatterlab.tech. It is built with Next.js, Tailwind CSS, Framer Motion and Node.js, and runs on Vercel.",
        "[TODO: what you built or led yourself, compared with your co-founder]",
      ],
    },
    decisions: [
      {
        decision: "Keep the platform free for students.",
        reason: "[TODO: why]",
      },
      {
        decision: "Build on Next.js and deploy on Vercel.",
        reason: "[TODO: why]",
      },
    ],
    result: {
      metrics: [
        { value: "2,770+", label: "organic impressions" },
        { value: "3", label: "months after launch" },
      ],
      summary: "flatterlab.tech reached 2,770+ organic impressions in its first 3 months.",
    },
    next: ["[TODO: what you would do next on flatterlab.tech]"],
  },
];

/** Which case studies each track page's band shows, in order. Given by Hassan. */
export const featuredCaseStudies: Record<TrackId, readonly string[]> = {
  engineer: ["yetti-ai", "talentminer", "flatterlab"],
  studio: ["tiny-owlets"],
};
