/**
 * Interactive hero terminal: a flat card in JetBrains Mono. Commands run
 * through the pure parser in src/lib/terminal.ts; this component only keeps
 * the history, renders it as plain text, and carries out the parser's effects
 * (clear, and counting the cups for the chai command).
 */
"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { terminal } from "@/content/terminal";
import { chaiCount } from "@/lib/chai";
import { cx } from "@/lib/cx";
import {
  appendHistory,
  MAX_INPUT_LENGTH,
  runCommand,
  TERMINAL_LINKS,
  welcomeLines,
  type TerminalLine,
} from "@/lib/terminal";

/** Text colour for each line tone. */
const TONE_CLASSES: Record<Extract<TerminalLine, { kind: "text" }>["tone"], string> = {
  output: "text-ink",
  dim: "text-ink-2",
  command: "text-ink",
  ok: "text-accent-ink",
};

/** Renders the terminal card. */
export function Terminal() {
  const inputId = useId();
  const outputRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<TerminalLine[]>(welcomeLines);
  const [input, setInput] = useState("");
  // Cups added by the chai command on top of the clock's count.
  const [extraCups, setExtraCups] = useState(0);

  // Keep the newest line in view, like a real terminal.
  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [history]);

  const run = (raw: string) => {
    // Read the clock only when a command runs, so the server and browser render the same.
    const result = runCommand(raw, chaiCount(new Date(), extraCups));
    if (result.effects.includes("clear")) {
      setHistory([]);
    } else if (result.lines.length > 0) {
      setHistory((current) => appendHistory(current, result.lines));
    }
    if (result.effects.includes("chai")) setExtraCups((cups) => cups + 1);
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      run(input);
    }
  };

  return (
    <div className="min-w-0 rounded-card bg-surface-2 font-mono text-[14px] leading-[1.7]">
      <p className="m-0 px-5 pt-4 text-[13px] text-ink-2">{terminal.title}</p>

      {/* role="log" announces new lines politely; tabIndex lets keyboard users scroll it. */}
      <div
        ref={outputRef}
        role="log"
        aria-label={terminal.outputLabel}
        tabIndex={0}
        className="flex h-[220px] flex-col gap-0.5 overflow-y-auto px-5 pt-3 pb-2"
      >
        {history.map((line, index) => {
          // Lines are append-only and capped, so the position is a stable key.
          if (line.kind === "link") {
            const target = TERMINAL_LINKS[line.id];
            return (
              <AppLink
                key={index}
                href={target.href}
                newTab={target.newTab}
                className="self-start text-accent-ink underline underline-offset-4"
              >
                {target.label}
              </AppLink>
            );
          }
          return (
            <p
              key={index}
              className={cx("m-0 break-words whitespace-pre-wrap", TONE_CLASSES[line.tone])}
            >
              {line.text}
            </p>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5 px-5 pb-2">
        <label htmlFor={inputId} className="text-accent-ink">
          <span aria-hidden="true">{terminal.prompt}</span>
          <span className="sr-only">{terminal.inputLabel}</span>
        </label>
        <input
          id={inputId}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={MAX_INPUT_LENGTH}
          placeholder={terminal.placeholder}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          className="min-h-11 min-w-0 flex-1 border-0 bg-transparent text-ink caret-accent-ink placeholder:text-ink-2"
        />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-5 pt-3 pb-4">
        {terminal.chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => run(chip)}
            className="min-h-11 cursor-pointer rounded-button border border-line px-4 text-[13px] text-ink transition-colors duration-200 hover:bg-surface"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
