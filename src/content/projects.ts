/**
 * Project cards for both pages, with their section and filter copy. Taken
 * word for word from the design kit.
 */
import type { IllustrationKey } from "./illustrations";
import { profile } from "./profile";
import type { LinkAction, SectionIntro } from "./types";

/** Filter category of an engineer project. */
export type ProjectCategory = "ai" | "web" | "mobile";

/** Section of the studio page a studio project appears in. */
export type StudioSection = "ecommerce" | "design";

/** Bottom line of a card: a link, or a plain mono label when there is nothing to open. */
export type ProjectFooter = ({ kind: "link" } & LinkAction) | { kind: "label"; label: string };

interface ProjectBase {
  title: string;
  /** Mono meta line above the title; the design joins these with " · ". */
  tags: readonly string[];
  description: string;
  footer: ProjectFooter;
  illustration: IllustrationKey;
}

/** A card on the engineer page. */
export interface EngineerProject extends ProjectBase {
  track: "engineer";
  category: ProjectCategory;
}

/** A card on the studio page. */
export interface StudioProject extends ProjectBase {
  track: "studio";
  section: StudioSection;
}

/** Any project card. */
export type Project = EngineerProject | StudioProject;

/** One filter tab and the group heading it controls. */
export interface ProjectCategoryInfo {
  id: ProjectCategory;
  tabLabel: string;
  title: string;
  description: string;
}

/** Copy around the engineer project grid. */
export interface EngineerProjectsIntro {
  section: SectionIntro;
  filterLabel: string;
  allTabLabel: string;
  categories: readonly ProjectCategoryInfo[];
}

/** Section header and filter copy for the engineer projects. */
export const engineerProjectsIntro: EngineerProjectsIntro = {
  section: {
    index: "01",
    label: "projects",
    title: "Things I have engineered",
    description:
      "14 projects across AI, web platforms, mobile and research. Filter to focus on one area.",
  },
  filterLabel: "Filter projects by type",
  allTabLabel: "All",
  categories: [
    {
      id: "ai",
      tabLabel: "AI & Automation",
      title: "AI & Automation",
      description: "LLM products, voice agents, machine learning models and automation pipelines.",
    },
    {
      id: "web",
      tabLabel: "Web & SaaS",
      title: "Web Platforms & SaaS",
      description:
        "Full-stack platforms, client portals and CRMs built with React, Next.js and Node.js.",
    },
    {
      id: "mobile",
      tabLabel: "Mobile & Research",
      title: "Mobile & Research",
      description: "Cross-platform mobile apps and deep learning research.",
    },
  ],
};

/** Section headers for the two studio project grids. */
export const studioProjectsIntro: Record<StudioSection, SectionIntro> = {
  ecommerce: {
    index: "02",
    label: "e-commerce",
    title: "Shopify and e-commerce builds",
    description:
      "Store builds, cart customization and back-office integrations across Shopify, Wix and BigCommerce.",
  },
  design: {
    index: "05",
    label: "design",
    title: "Brand and graphic design",
    description: "Identity, apparel and social work. Full case studies on Behance.",
  },
};

/** Engineer projects in design order. */
export const engineerProjects: readonly EngineerProject[] = [
  {
    track: "engineer",
    category: "ai",
    title: "Pikzels",
    tags: ["SaaS", "AI generation"],
    description: "An AI-powered platform that generates YouTube thumbnails and titles.",
    footer: { kind: "link", label: "Visit site", href: "https://pikzels.com", newTab: true },
    illustration: "pikzels",
  },
  {
    track: "engineer",
    category: "ai",
    title: "Dogra Technologies",
    tags: ["AI", "Dynamic pricing"],
    description: "AI products, including a dynamic pricing engine for restaurants.",
    // dogratech.com did not respond in the October 2026 link check, so the card
    // offers an email instead. Put the "Visit site" link back once it is up.
    footer: {
      kind: "link",
      label: "Ask me about it",
      href: `${profile.links.email}?subject=Dogra%20Technologies`,
    },
    illustration: "dogra-technologies",
  },
  {
    track: "engineer",
    category: "ai",
    title: "Yetti.ai",
    tags: ["Live SaaS", "Vapi.ai", "Automation"],
    description:
      "A live SaaS with AI voice agents built on Vapi.ai and automated booking workflows.",
    footer: { kind: "link", label: "Visit site", href: "https://yetti.ai", newTab: true },
    illustration: "yetti-ai",
  },
  {
    track: "engineer",
    category: "ai",
    title: "WriteWisely AI",
    tags: ["SaaS", "AI writing"],
    description: "An AI writing and content assistance platform.",
    footer: {
      kind: "link",
      label: "Request a demo",
      href: `${profile.links.email}?subject=WriteWisely%20AI%20demo`,
    },
    illustration: "writewisely-ai",
  },
  {
    track: "engineer",
    category: "ai",
    title: "AI Text Detection API",
    tags: ["Python", "DeBERTa-v3", "REST API"],
    description:
      "Upload a PDF or DOCX and get sentence-level AI likelihood scores from a fine-tuned DeBERTa-v3 model.",
    footer: { kind: "link", label: "Ask me about it", href: "#contact" },
    illustration: "ai-text-detection-api",
  },
  {
    track: "engineer",
    category: "ai",
    title: "TalentMiner",
    tags: ["TypeScript", "Python", "Flask", "NLTK"],
    description:
      "AI resume screening that processed 100+ resumes with NLTK skill extraction, JD matching and automated candidate ranking.",
    footer: {
      kind: "link",
      label: "View code",
      href: "https://github.com/MuhammadZaighamAsif/TalentMiner",
      newTab: true,
    },
    illustration: "talentminer",
  },
  {
    track: "engineer",
    category: "web",
    title: "flatterlab.tech",
    tags: ["Co-founder", "Next.js", "Framer Motion", "Vercel"],
    description:
      "A free platform that helps students build resumes and discover extracurriculars. 2,770+ organic impressions in its first 3 months.",
    footer: { kind: "link", label: "Visit site", href: "https://flatterlab.tech", newTab: true },
    illustration: "flatterlab-tech",
  },
  {
    track: "engineer",
    category: "web",
    title: "VTEST",
    tags: ["Client", "AI testing platform"],
    description: "A web platform for AI-driven software testing and agentic QA.",
    footer: {
      kind: "link",
      label: "Visit site",
      href: "https://www.vtestcorp.com/",
      newTab: true,
    },
    illustration: "vtest",
  },
  {
    track: "engineer",
    category: "web",
    title: "OnePlace Canada",
    tags: ["Client", "Study & immigration"],
    description: "A study and immigration portal with automated course recommendations.",
    footer: {
      kind: "link",
      label: "Visit site",
      href: "https://www.oneplace.ca/",
      newTab: true,
    },
    illustration: "oneplace-canada",
  },
  {
    track: "engineer",
    category: "web",
    title: "ReDish CRM",
    tags: ["CRM", "API", "AI automation"],
    description: "A CRM app with API integrations and AI-powered automation.",
    footer: {
      kind: "link",
      label: "Request a demo",
      href: `${profile.links.email}?subject=ReDish%20CRM%20demo`,
    },
    illustration: "redish-crm",
  },
  {
    track: "engineer",
    category: "web",
    title: "City-Pulse",
    tags: ["React", "Node.js", "Supabase", "PostGIS"],
    description:
      "GPS-based civic issue reporting with real-time upvoting and admin resolution tracking.",
    footer: {
      kind: "link",
      label: "View code",
      href: "https://github.com/Zain485576/City-Pulse",
      newTab: true,
    },
    illustration: "city-pulse",
  },
  {
    track: "engineer",
    category: "web",
    title: "Cattle Exchange Platform",
    tags: ["Full-stack", "Marketplace"],
    description: "Stabilization and ongoing development of a cattle exchange platform.",
    footer: { kind: "label", label: "Platform development" },
    illustration: "cattle-exchange-platform",
  },
  {
    track: "engineer",
    category: "mobile",
    title: "JAIB Expense Tracker",
    tags: ["React Native", "Expo", "TypeScript", "NativeWind"],
    description:
      "An 8-screen mobile expense tracker with CRUD, donut-chart analytics, budget tracking and local-first storage.",
    footer: { kind: "label", label: "Coming to Google Play" },
    illustration: "jaib-expense-tracker",
  },
  {
    track: "engineer",
    category: "mobile",
    title: "CNN vs Transformer Drone Detection",
    tags: ["Research", "YOLO", "RT-DETR"],
    description:
      "A comparative deep learning study of YOLO and RT-DETR for detecting drones, written up in LaTeX.",
    footer: { kind: "link", label: "Ask me about it", href: "#contact" },
    illustration: "cnn-vs-transformer-drone-detection",
  },
];

/** Studio projects in design order. */
export const studioProjects: readonly StudioProject[] = [
  {
    track: "studio",
    section: "ecommerce",
    title: "TheMCShop",
    tags: ["Upwork", "Shopify"],
    description: "A Shopify store project delivered end to end for an Upwork client.",
    footer: { kind: "label", label: "Shopify store" },
    illustration: "themcshop",
  },
  {
    track: "studio",
    section: "ecommerce",
    title: "Son of Oak",
    tags: ["Shopify"],
    description: "Shopify development for the Son of Oak store.",
    footer: { kind: "label", label: "Shopify development" },
    illustration: "son-of-oak",
  },
  {
    track: "studio",
    section: "ecommerce",
    title: "Tiny Owlets",
    tags: ["Client", "Shopify", "Liquid"],
    description:
      "Reworked the cart on a Vintage-theme store: a Place Order flow, auto-removing items at zero quantity, and WhatsApp plus email order notifications.",
    footer: { kind: "label", label: "Cart logic · notifications" },
    illustration: "tiny-owlets",
  },
  {
    track: "studio",
    section: "ecommerce",
    title: "Shopify to Galaxy Middleware",
    tags: ["Client", "Shopify", "Integration"],
    description:
      "A sync layer connecting a Shopify store with the client's Galaxy back office system.",
    footer: { kind: "label", label: "Integration" },
    illustration: "shopify-to-galaxy-middleware",
  },
  {
    track: "studio",
    section: "ecommerce",
    title: "ZarQais E-Commerce",
    tags: ["Wix", "BigCommerce"],
    description: "E-commerce website development for ZarQais on Wix and BigCommerce.",
    footer: { kind: "label", label: "E-commerce website" },
    illustration: "zarqais-e-commerce",
  },
  {
    track: "studio",
    section: "ecommerce",
    title: "Al-Ghani Mart",
    tags: ["E-commerce"],
    description:
      "A modern grocery e-commerce website with category browsing and quick add-to-cart.",
    footer: { kind: "label", label: "Grocery store" },
    illustration: "al-ghani-mart",
  },
  {
    track: "studio",
    section: "design",
    title: "Hoodays Streetwear",
    tags: ["Co-founder", "Brand direction"],
    description:
      "A streetwear brand for Pakistani youth mixing Urdu Nastaliq calligraphy and Mughal motifs with oversized fits, in maroon and black.",
    footer: { kind: "label", label: "Apparel brand" },
    illustration: "hoodays-streetwear",
  },
  {
    track: "studio",
    section: "design",
    title: "Tevar Identity",
    tags: ["Logo system"],
    description:
      "A blade-stroke calligraphy logo with tapered letterforms, volt green accents and an 8° forward lean, in dark, light and avatar versions.",
    footer: { kind: "label", label: "Logo design" },
    illustration: "tevar-identity",
  },
  {
    track: "studio",
    section: "design",
    title: "YIC Social Media",
    tags: ["Social media", "Sep 2026"],
    description:
      "Campaigns and content representing Youth International Conclave at FAST University Lahore.",
    footer: {
      kind: "link",
      label: "View appointment",
      href: profile.links.appointmentLetter,
      newTab: true,
    },
    illustration: "yic-social-media",
  },
  {
    track: "studio",
    section: "design",
    title: "Elevvo Pathway",
    tags: ["UI/UX internship", "2025"],
    description:
      "Prototyped user flows in Figma and delivered production-ready assets in Canva and Photoshop under tight deadlines.",
    footer: { kind: "label", label: "Figma · Canva · Photoshop" },
    illustration: "elevvo-pathway",
  },
];

/** Every project on the site. */
export const projects: readonly Project[] = [...engineerProjects, ...studioProjects];
