/**
 * Who the site is about: name, titles, contact details and links, plus the
 * per-page hero, cross-link and contact copy. Taken word for word from
 * design-kit/canvas-source/engineer-page.dc.html and studio-page.dc.html.
 */
import type { TrackId } from "./tracks";
import type { LinkAction } from "./types";

/** Every outbound destination and public document the site links to. */
export interface ProfileLinks {
  calendly: string;
  email: string;
  linkedin: string;
  github: string;
  behance: string;
  resume: string;
  appointmentLetter: string;
}

/** Identity and contact details shared by both pages. */
export interface Profile {
  firstName: string;
  lastName: string;
  fullName: string;
  /** Mono title line under the engineer hero name. */
  roleLine: string;
  email: string;
  links: ProfileLinks;
}

/** The person behind the site. */
export const profile: Profile = {
  firstName: "Muhammad",
  lastName: "Hassan",
  fullName: "Muhammad Hassan",
  roleLine: "Software Engineer · Full-Stack · AI Automation · QA",
  email: "hassannawab898@gmail.com",
  links: {
    calendly: "https://calendly.com/hassannawab898/30min",
    email: "mailto:hassannawab898@gmail.com",
    linkedin: "https://www.linkedin.com/in/muhammad-hassan-6b289426a",
    github: "https://github.com/MuhammadHassan05",
    behance: "https://www.behance.net/muhammadhassan501",
    resume: "/docs/Muhammad-Hassan-Resume.pdf",
    appointmentLetter: "/docs/YIC-Appointment-Letter.pdf",
  },
};

const { links } = profile;

/** Top of a page: availability badge, pitch and calls to action. */
export interface HeroContent {
  availability: string;
  /** Studio has a written heading; the engineer hero shows the name instead. */
  heading?: string;
  summary: string;
  actions: readonly LinkAction[];
}

/** Glass card that points visitors to the other track. */
export interface CrossLinkContent {
  eyebrow: string;
  title: string;
  action: LinkAction;
}

/** Closing contact panel. */
export interface ContactContent {
  index: string;
  label: string;
  heading: string;
  email: LinkAction;
  actions: readonly LinkAction[];
}

/** Everything about the person that differs between the two pages. */
export interface PagePitch {
  hero: HeroContent;
  crossLink: CrossLinkContent;
  contact: ContactContent;
}

/** Hero, cross-link and contact copy for each page. */
export const pitch: Record<TrackId, PagePitch> = {
  engineer: {
    hero: {
      availability: "Available for remote roles · immediate start",
      summary:
        "Final-year Software Engineering student at FAST-NUCES Lahore, shipping production SaaS with React, Next.js, Node.js, TypeScript and AI workflow automation.",
      actions: [
        { label: "See projects", href: "#projects" },
        { label: "Download resume", href: links.resume, newTab: true },
      ],
    },
    crossLink: {
      eyebrow: "Also",
      title: "Freelance web, Shopify and design work lives in my Studio portfolio",
      action: { label: "Open Studio", href: "/studio/" },
    },
    contact: {
      index: "05",
      label: "contact",
      heading: "Hiring for an engineering role? Let's talk.",
      email: { label: profile.email, href: links.email },
      actions: [
        { label: "Book a 30 min call", href: links.calendly },
        { label: "Resume (PDF)", href: links.resume, newTab: true },
        { label: "LinkedIn", href: links.linkedin },
        { label: "GitHub", href: links.github },
        { label: "Behance", href: links.behance },
      ],
    },
  },
  studio: {
    hero: {
      availability: "Taking new Shopify, web and design projects",
      heading: "Shopify stores, websites and brands that sell.",
      summary:
        "I'm Hassan. I build and customize Shopify stores, ship websites for international clients and design brand identities, from logos to social media.",
      actions: [
        { label: "Start a project", href: links.calendly },
        { label: "See my work", href: "#shopify" },
      ],
    },
    crossLink: {
      eyebrow: "Looking for AI and SaaS work?",
      title: "Pikzels, ReDish CRM, VTEST and more live on my engineering page",
      action: { label: "See engineering projects", href: "/#projects" },
    },
    contact: {
      index: "08",
      label: "contact",
      heading: "Need a store, a site or a brand? Let's build it.",
      email: { label: profile.email, href: links.email },
      // The design repeats Behance as a plain "Behance" button; CLAUDE.md drops the duplicate.
      actions: [
        { label: "Book a 30 min call", href: links.calendly },
        { label: "Behance portfolio", href: links.behance },
        { label: "LinkedIn", href: links.linkedin },
        { label: "GitHub", href: links.github },
      ],
    },
  },
};
