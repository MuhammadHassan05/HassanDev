/**
 * Interactive hero terminal. Commands run through the pure parser in
 * src/lib/terminal.ts; this component only keeps the history, renders it as
 * plain text, and carries out the parser's effects (clear, chai, confetti).
 */
"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { terminal } from "@/content/terminal";
import { createConfetti, type ConfettiPiece } from "@/lib/confetti";
import { cx } from "@/lib/cx";
import { motionAllowed } from "@/lib/motion";
import {
  appendHistory,
  MAX_INPUT_LENGTH,
  runCommand,
  TERMINAL_LINKS,
  welcomeLines,
  type TerminalLine,
} from "@/lib/terminal";
import { useChai } from "./ChaiProvider";
import { Confetti } from "./Confetti";

/** Text color for each line tone, as in the design. */
const TONE_CLASSES: Record<Extract<TerminalLine, { kind: "text" }>["tone"], string> = {
  output: "text-body",
  dim: "text-dim",
  command: "text-ink",
  ok: "text-accent",
};

/** Renders the terminal window. */
export function Terminal() {
  const inputId = useId();
  const outputRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<TerminalLine[]>(welcomeLines);
  const [input, setInput] = useState("");
  const [confetti, setConfetti] = useState<readonly ConfettiPiece[] | null>(null);
  const { count, addCup } = useChai();

  // Keep the newest line in view, like a real terminal.
  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [history]);

  const endConfetti = useCallback(() => setConfetti(null), []);

  const run = (raw: string) => {
    const result = runCommand(raw, count ?? 0);
    if (result.effects.includes("clear")) {
      setHistory([]);
    } else if (result.lines.length > 0) {
      setHistory((current) => appendHistory(current, result.lines));
    }
    if (result.effects.includes("chai")) addCup();
    if (result.effects.includes("confetti") && motionAllowed(window)) {
      setConfetti(createConfetti(Math.random));
    }
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      run(input);
    }
  };

  return (
    <div className="glass min-w-0 flex-[1_1_380px] overflow-hidden rounded-card-lg font-mono text-[14px] leading-[1.75]">
      <div className="flex items-center gap-2 border-b border-white/10 px-[18px] py-3.5">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/20" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/20" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-2 text-[12px] text-faint">{terminal.title}</span>
      </div>

      {/* role="log" announces new lines politely; tabIndex lets keyboard users scroll it. */}
      <div
        ref={outputRef}
        role="log"
        aria-label={terminal.outputLabel}
        tabIndex={0}
        className="flex h-[230px] flex-col gap-0.5 overflow-y-auto px-[22px] pt-4 pb-2"
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
                className="self-start border-b border-accent text-accent hover:text-accent"
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

      <div className="flex items-center gap-2.5 px-[22px] pt-1 pb-3">
        <label htmlFor={inputId} className="text-accent">
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
          className="min-h-11 min-w-0 flex-1 rounded-sm border-0 bg-transparent text-ink caret-accent placeholder:text-dim"
        />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 px-[18px] pt-3 pb-4">
        {terminal.chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => run(chip)}
            className="min-h-11 cursor-pointer rounded-full border border-glass-border bg-white/5 px-3.5 text-[13px] text-body transition-colors duration-200 hover:bg-white/12"
          >
            {chip}
          </button>
        ))}
      </div>

      {confetti ? <Confetti pieces={confetti} onDone={endConfetti} /> : null}
    </div>
  );
}
