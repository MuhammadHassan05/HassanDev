/**
 * The hero terminal's command parser: a pure function from input text to
 * typed output lines, plus the effects the component should run.
 *
 * Security: input is trimmed and capped at MAX_INPUT_LENGTH; output is plain
 * text (rendered as text nodes, never as HTML); links can only be one of the
 * fixed TERMINAL_LINKS below, never built from input; history is capped at
 * MAX_HISTORY_LINES.
 */
import { profile } from "@/content/profile";
import {
  terminal,
  type TerminalCopyLine,
  type TerminalLinkId,
  type TerminalTone,
} from "@/content/terminal";

/** Longest command the parser reads; anything after is ignored. */
export const MAX_INPUT_LENGTH = 64;

/** Most lines the terminal keeps; older ones scroll away. */
export const MAX_HISTORY_LINES = 40;

/** A rendered output line: plain text, or one of the allowlisted links. */
export type TerminalLine =
  | { kind: "text"; tone: TerminalTone | "command"; text: string }
  | { kind: "link"; id: TerminalLinkId };

/** Side effects a command asks the component to perform. */
export type TerminalEffect = "clear" | "confetti" | "chai";

/** What running one command produced. */
export interface TerminalResult {
  /** Lines to append: the echoed command, then its response. */
  lines: TerminalLine[];
  effects: TerminalEffect[];
}

/** Where a link goes and whether it opens a new tab. */
export interface TerminalLinkTarget {
  label: string;
  href: string;
  newTab: boolean;
}

/**
 * The only destinations the terminal can link to. Output refers to these by
 * id, so no input can ever produce a different URL.
 */
export const TERMINAL_LINKS: Readonly<Record<TerminalLinkId, TerminalLinkTarget>> = {
  projects: { label: terminal.linkLabels.projects, href: "#projects", newTab: false },
  // mailto opens the mail app; a new tab would only leave an empty tab behind.
  email: { label: terminal.linkLabels.email, href: profile.links.email, newTab: false },
  calendly: { label: terminal.linkLabels.calendly, href: profile.links.calendly, newTab: true },
  studio: { label: terminal.linkLabels.studio, href: "/studio/", newTab: false },
};

/**
 * Trims the input and caps it at MAX_INPUT_LENGTH characters.
 *
 * @param raw - What the user typed.
 */
export function sanitizeInput(raw: string): string {
  return raw.trim().slice(0, MAX_INPUT_LENGTH).trim();
}

/** Turns copy lines into output lines, filling in {placeholders} as plain text. */
function toLines(
  copy: readonly TerminalCopyLine[],
  values: Record<string, string> = {},
): TerminalLine[] {
  return copy.map((line) => {
    if ("link" in line) return { kind: "link", id: line.link };
    const text = line.text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
    return { kind: "text", tone: line.tone, text };
  });
}

/** The welcome lines shown before any command is run. */
export function welcomeLines(): TerminalLine[] {
  return toLines(terminal.welcome);
}

/**
 * Runs one command.
 *
 * @param raw - What the user typed or tapped.
 * @param chaiCount - Today's chai count before this command, for the chai reply.
 * @returns Lines to append and effects to run; nothing for empty input.
 */
export function runCommand(raw: string, chaiCount: number): TerminalResult {
  const input = sanitizeInput(raw);
  if (input === "") return { lines: [], effects: [] };

  const command = input.toLowerCase().replace(/\s+/g, " ");
  if (command === "clear") return { lines: [], effects: ["clear"] };

  const { responses } = terminal;
  const echo: TerminalLine = { kind: "text", tone: "command", text: `$ ${input}` };
  const reply = (copy: readonly TerminalCopyLine[], effects: TerminalEffect[] = []) => ({
    lines: [echo, ...toLines(copy)],
    effects,
  });

  switch (command) {
    case "help":
      return reply(responses.help);
    case "about":
    case "whoami":
      return reply(responses.about);
    case "projects":
    case "ls projects":
      return reply(responses.projects);
    case "skills":
      return reply(responses.skills);
    case "education":
      return reply(responses.education);
    case "chai":
    case "coffee":
    case "tea":
      return {
        lines: [echo, ...toLines(responses.chai, { cup: String(chaiCount + 1) })],
        effects: ["chai"],
      };
    case "contact":
      return reply(responses.contact);
    case "hire":
    case "hire hassan":
      return reply(responses.hire);
    case "sudo hire hassan":
      return reply(responses.sudoHire);
    case "studio":
      return reply(responses.studio);
    case "hassan":
    case "muhammad":
    case "muhammad hassan":
      return reply(responses.easterEgg, ["confetti"]);
  }

  if (command === "sudo" || command.startsWith("sudo ")) {
    return reply(responses.sudoOther);
  }
  return {
    lines: [echo, ...toLines(responses.unknown, { command: input })],
    effects: [],
  };
}

/**
 * Appends lines to the history, keeping only the newest MAX_HISTORY_LINES.
 *
 * @param history - Current lines.
 * @param lines - Lines to add.
 */
export function appendHistory(
  history: readonly TerminalLine[],
  lines: readonly TerminalLine[],
): TerminalLine[] {
  return [...history, ...lines].slice(-MAX_HISTORY_LINES);
}
