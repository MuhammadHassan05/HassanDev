/**
 * Skill groups: the engineer page's toolkit and the studio page's tools,
 * taken word for word from the design kit.
 */
import type { TrackId } from "./tracks";
import type { SectionIntro } from "./types";

/** A titled card of skill chips. */
export interface SkillGroup {
  title: string;
  items: readonly string[];
}

/** A page's skills section. */
export interface SkillsSection {
  section: SectionIntro;
  groups: readonly SkillGroup[];
}

/** Skills for each page. */
export const skills: Record<TrackId, SkillsSection> = {
  engineer: {
    section: { index: "04", label: "skills", title: "Engineering toolkit" },
    groups: [
      {
        title: "Frontend",
        items: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "HTML5",
          "CSS3",
          "React Native",
        ],
      },
      {
        title: "Backend",
        items: ["Node.js", "Express.js", "Flask", "Laravel", "REST APIs", "Python", "Java", "C++"],
      },
      {
        title: "Databases & Cloud",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "SQLite", "Vercel"],
      },
      {
        title: "AI & Automation",
        items: ["Vapi.ai", "N8N", "Zapier", "NLTK", "LLM integrations", "AI workflow automation"],
      },
      {
        title: "QA & Testing",
        items: [
          "End-to-end QA",
          "Functional testing",
          "Regression testing",
          "Bug documentation",
          "SaaS QA",
        ],
      },
      {
        title: "Tools",
        items: ["Git/GitHub", "Postman", "VS Code", "Claude Code", "Expo", "CI/CD", "Agile"],
      },
    ],
  },
  studio: {
    section: { index: "07", label: "tools", title: "Studio toolkit" },
    groups: [
      {
        title: "Commerce",
        items: ["Shopify", "Liquid", "Shopify apps", "Laravel", "Store integrations"],
      },
      { title: "Web", items: ["React", "Next.js", "Tailwind CSS", "Node.js", "Vercel"] },
      {
        title: "Design",
        items: ["Figma", "Canva", "Photoshop", "Brand identity", "Social media content"],
      },
      {
        title: "Automation",
        items: ["N8N", "Zapier", "WhatsApp notifications", "Email flows"],
      },
    ],
  },
};
