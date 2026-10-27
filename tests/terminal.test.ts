/**
 * Unit tests for the terminal parser in src/lib/terminal.ts: every command,
 * unknown input, the input cap, the link allowlist and the history cap.
 */
import { describe, expect, it } from "vitest";
import { linkKind } from "@/lib/links";
import {
  appendHistory,
  MAX_HISTORY_LINES,
  MAX_INPUT_LENGTH,
  runCommand,
  sanitizeInput,
  TERMINAL_LINKS,
  welcomeLines,
  type TerminalLine,
} from "@/lib/terminal";

/** The text of every text line, for compact assertions. */
const texts = (lines: TerminalLine[]) =>
  lines.flatMap((line) => (line.kind === "text" ? [line.text] : [`[link:${line.id}]`]));

/** Lines after the echoed command. */
const reply = (input: string, chaiCount = 0) => texts(runCommand(input, chaiCount).lines).slice(1);

describe("runCommand", () => {
  it("echoes the command first, as typed", () => {
    expect(runCommand("  Help  ", 0).lines[0]).toEqual({
      kind: "text",
      tone: "command",
      text: "$ Help",
    });
  });

  it("help lists the commands and hints at the easter egg", () => {
    expect(reply("help")).toEqual([
      "about · projects · skills · education · chai · contact · hire · studio · clear",
      "psst, try typing my first name.",
    ]);
  });

  it.each(["about", "whoami"])("%s introduces Hassan", (command) => {
    expect(reply(command)).toEqual([
      "Software engineer from Lahore, final year BS SE at FAST-NUCES.",
      "QA & AI Automation Dev at Yetti.ai. I ship SaaS with React, Next.js and Node.",
    ]);
  });

  it.each(["projects", "ls projects"])("%s lists projects and links to them", (command) => {
    expect(reply(command)).toEqual([
      "AI: Pikzels · Dogra pricing engine · Yetti.ai · WriteWisely · AI Text Detection · TalentMiner",
      "Web: flatterlab · VTEST · OnePlace Canada · ReDish CRM · City-Pulse · Cattle Exchange",
      "Mobile & research: JAIB · Drone Detection",
      "[link:projects]",
    ]);
  });

  it("skills lists the stack", () => {
    expect(reply("skills")).toEqual([
      "React · Next.js · TypeScript · Node.js · Python · Supabase · PostgreSQL · Vapi.ai · N8N",
    ]);
  });

  it("education shows the degree", () => {
    expect(reply("education")).toEqual([
      "BS Software Engineering · FAST-NUCES Lahore · expected 2027",
    ]);
  });

  it.each(["chai", "coffee", "tea"])("%s brews the next cup and adds one", (command) => {
    const result = runCommand(command, 3);
    expect(texts(result.lines).slice(1)).toEqual([
      "Brewing chai... done. That is cup 4 today. Back to shipping.",
    ]);
    expect(result.effects).toEqual(["chai"]);
  });

  it("contact links the email address", () => {
    expect(reply("contact")).toEqual(["Best way to reach me:", "[link:email]"]);
  });

  it.each(["hire", "hire hassan"])("%s is denied with a hint", (command) => {
    expect(reply(command)).toEqual(["Permission denied. Try: sudo hire hassan"]);
  });

  it("sudo hire hassan grants permission and links the call", () => {
    expect(reply("sudo hire hassan")).toEqual([
      "[sudo] checking candidate... skills ok, chai ok, shipping ok.",
      "Permission granted. Let us talk:",
      "[link:calendly]",
    ]);
  });

  it.each(["sudo", "sudo rm -rf /", "SUDO   make me a sandwich"])(
    "%s is refused politely",
    (command) => {
      expect(reply(command)).toEqual(["Nice try. Only one sudo command works here."]);
    },
  );

  it("studio links to the studio page", () => {
    expect(reply("studio")).toEqual([
      "Shopify, freelance and design work lives here:",
      "[link:studio]",
    ]);
  });

  it.each(["hassan", "Hassan", "muhammad", "Muhammad  Hassan"])(
    "%s finds the easter egg and fires confetti",
    (command) => {
      const result = runCommand(command, 0);
      expect(texts(result.lines).slice(1)).toEqual(["You found the easter egg. Hi, I am Hassan."]);
      expect(result.effects).toEqual(["confetti"]);
    },
  );

  it("clear asks to clear the history and prints nothing", () => {
    expect(runCommand("clear", 0)).toEqual({ lines: [], effects: ["clear"] });
  });

  it("is case and spacing insensitive", () => {
    expect(reply("  SUDO   Hire   HASSAN ")).toEqual(reply("sudo hire hassan"));
  });

  it("does nothing for empty or blank input", () => {
    expect(runCommand("", 0)).toEqual({ lines: [], effects: [] });
    expect(runCommand("   \t ", 0)).toEqual({ lines: [], effects: [] });
  });

  it("reports unknown commands, quoting the input as plain text", () => {
    expect(reply("ls -la")).toEqual(["command not found: ls -la. Type 'help'."]);
  });

  it("never interprets markup or placeholders in the input", () => {
    const input = "<img src=x onerror=alert(1)> {cup}";
    const result = runCommand(input, 0);
    expect(texts(result.lines)).toEqual([
      `$ ${input}`,
      `command not found: ${input}. Type 'help'.`,
    ]);
    expect(result.lines.every((line) => line.kind === "text")).toBe(true);
  });
});

describe("input cap", () => {
  it("trims and cuts input to 64 characters", () => {
    const long = `  ${"x".repeat(200)}  `;
    expect(sanitizeInput(long)).toHaveLength(MAX_INPUT_LENGTH);
    expect(MAX_INPUT_LENGTH).toBe(64);
  });

  it("only echoes the first 64 characters", () => {
    const echo = runCommand("y".repeat(100), 0).lines[0];
    expect(echo).toEqual({ kind: "text", tone: "command", text: `$ ${"y".repeat(64)}` });
  });

  it("runs a valid command even when padded past the cap", () => {
    expect(reply(`help${" ".repeat(100)}`)[1]).toBe("psst, try typing my first name.");
  });
});

describe("link allowlist", () => {
  it("only links to the fixed destinations", () => {
    expect(Object.keys(TERMINAL_LINKS).sort()).toEqual(["calendly", "email", "projects", "studio"]);
  });

  it.each(Object.entries(TERMINAL_LINKS))("%s is internal, mailto: or https:", (_id, target) => {
    const kind = linkKind(target.href);
    expect(["route", "anchor", "external"]).toContain(kind);
    if (kind === "external") expect(target.href).toMatch(/^(https:\/\/|mailto:)/);
  });

  it("never outputs a URL inside a line", () => {
    const all = [
      "help",
      "about",
      "projects",
      "skills",
      "education",
      "chai",
      "contact",
      "hire",
      "sudo hire hassan",
      "studio",
      "hassan",
    ].flatMap((command) => runCommand(command, 0).lines);
    for (const line of all) {
      if (line.kind === "link") expect(Object.keys(line)).toEqual(["kind", "id"]);
    }
  });
});

describe("history", () => {
  it("keeps only the newest 40 lines", () => {
    const line: TerminalLine = { kind: "text", tone: "output", text: "x" };
    let history: TerminalLine[] = [];
    for (let i = 0; i < 30; i++) history = appendHistory(history, [line, line]);
    expect(history).toHaveLength(MAX_HISTORY_LINES);
    expect(MAX_HISTORY_LINES).toBe(40);
  });

  it("keeps the newest lines, dropping the oldest", () => {
    const make = (n: number): TerminalLine => ({ kind: "text", tone: "output", text: String(n) });
    const history = appendHistory(
      Array.from({ length: 40 }, (_, i) => make(i)),
      [make(40)],
    );
    expect(texts(history)[0]).toBe("1");
    expect(texts(history).at(-1)).toBe("40");
  });

  it("starts with the welcome lines", () => {
    expect(texts(welcomeLines())).toEqual([
      "Welcome. I'm Hassan, a software engineer from Lahore.",
      "Type 'help' or tap a command below.",
    ]);
  });
});
