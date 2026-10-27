/**
 * Copy for the hero terminal on the engineer page, taken word for word from
 * the design kit (welcome lines, prompt, chips and every command response).
 *
 * Responses refer to links by id only; the URLs themselves live in the fixed
 * allowlist in src/lib/terminal.ts, so nothing here can add a new destination.
 */

/** Visual style of an output line: normal, dimmed, or highlighted in the accent. */
export type TerminalTone = "output" | "dim" | "ok";

/** Links a response may show. The parser maps each id to a fixed URL. */
export type TerminalLinkId = "projects" | "email" | "calendly" | "studio";

/** One line of a response: text, or a link from the allowlist. */
export type TerminalCopyLine = { tone: TerminalTone; text: string } | { link: TerminalLinkId };

/** Every command's response. {cup} and {command} are filled in by the parser. */
export interface TerminalResponses {
  help: readonly TerminalCopyLine[];
  about: readonly TerminalCopyLine[];
  projects: readonly TerminalCopyLine[];
  skills: readonly TerminalCopyLine[];
  education: readonly TerminalCopyLine[];
  /** {cup} is today's new chai total. */
  chai: readonly TerminalCopyLine[];
  contact: readonly TerminalCopyLine[];
  hire: readonly TerminalCopyLine[];
  sudoHire: readonly TerminalCopyLine[];
  /** Any other sudo command. */
  sudoOther: readonly TerminalCopyLine[];
  studio: readonly TerminalCopyLine[];
  easterEgg: readonly TerminalCopyLine[];
  /** {command} is the user's input, shown as plain text. */
  unknown: readonly TerminalCopyLine[];
}

/** Static terminal copy. */
export interface TerminalContent {
  title: string;
  welcome: readonly TerminalCopyLine[];
  prompt: string;
  inputLabel: string;
  /** Accessible name of the scrolling output; not visible. */
  outputLabel: string;
  placeholder: string;
  /** Commands offered as tap targets under the input. */
  chips: readonly string[];
  linkLabels: Record<TerminalLinkId, string>;
  responses: TerminalResponses;
}

/** Terminal copy in design order. */
export const terminal: TerminalContent = {
  title: "~/hassan · interactive",
  welcome: [
    { tone: "output", text: "Welcome. I'm Hassan, a software engineer from Lahore." },
    { tone: "dim", text: "Type 'help' or tap a command below." },
  ],
  prompt: "$",
  inputLabel: "Terminal command",
  // Not in the design (screen readers only): names the live output region.
  outputLabel: "Terminal output",
  placeholder: "type a command, e.g. help",
  chips: ["help", "projects", "chai", "sudo hire hassan"],
  linkLabels: {
    projects: "Jump to projects",
    email: "hassannawab898@gmail.com",
    calendly: "Book a 30 min call",
    studio: "Open Studio",
  },
  responses: {
    help: [
      {
        tone: "output",
        text: "about · projects · skills · education · chai · contact · hire · studio · clear",
      },
      { tone: "dim", text: "psst, try typing my first name." },
    ],
    about: [
      { tone: "output", text: "Software engineer from Lahore, final year BS SE at FAST-NUCES." },
      {
        tone: "output",
        text: "QA & AI Automation Dev at Yetti.ai. I ship SaaS with React, Next.js and Node.",
      },
    ],
    projects: [
      {
        tone: "output",
        text: "AI: Pikzels · Dogra pricing engine · Yetti.ai · WriteWisely · AI Text Detection · TalentMiner",
      },
      {
        tone: "output",
        text: "Web: flatterlab · VTEST · OnePlace Canada · ReDish CRM · City-Pulse · Cattle Exchange",
      },
      { tone: "output", text: "Mobile & research: JAIB · Drone Detection" },
      { link: "projects" },
    ],
    skills: [
      {
        tone: "output",
        text: "React · Next.js · TypeScript · Node.js · Python · Supabase · PostgreSQL · Vapi.ai · N8N",
      },
    ],
    education: [
      { tone: "output", text: "BS Software Engineering · FAST-NUCES Lahore · expected 2027" },
    ],
    chai: [
      {
        tone: "output",
        text: "Brewing chai... done. That is cup {cup} today. Back to shipping.",
      },
    ],
    contact: [{ tone: "output", text: "Best way to reach me:" }, { link: "email" }],
    hire: [{ tone: "dim", text: "Permission denied. Try: sudo hire hassan" }],
    sudoHire: [
      {
        tone: "output",
        text: "[sudo] checking candidate... skills ok, chai ok, shipping ok.",
      },
      { tone: "ok", text: "Permission granted. Let us talk:" },
      { link: "calendly" },
    ],
    sudoOther: [{ tone: "dim", text: "Nice try. Only one sudo command works here." }],
    studio: [
      { tone: "output", text: "Shopify, freelance and design work lives here:" },
      { link: "studio" },
    ],
    easterEgg: [{ tone: "ok", text: "You found the easter egg. Hi, I am Hassan." }],
    unknown: [{ tone: "dim", text: "command not found: {command}. Type 'help'." }],
  },
};
