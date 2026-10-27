/**
 * Tests for scripts/check-forbidden.mjs. Each case writes throwaway files to a
 * temp folder, so no forbidden code ever lives in the repo itself.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const SCRIPT = join(__dirname, "..", "scripts", "check-forbidden.mjs");
const dirs: string[] = [];

/** Creates a temp folder holding the given files and returns its path. */
function fixture(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), "check-forbidden-"));
  dirs.push(dir);
  for (const [name, content] of Object.entries(files)) {
    const path = join(dir, name);
    mkdirSync(join(path, ".."), { recursive: true });
    writeFileSync(path, content);
  }
  return dir;
}

/** Runs the script against a folder. */
function scan(dir: string) {
  return spawnSync(process.execPath, [SCRIPT, dir], { encoding: "utf8" });
}

afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("check-forbidden", () => {
  it("passes clean source", () => {
    const result = scan(fixture({ "a.ts": "export const evaluate = (x: number) => x * 2;\n" }));
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("0 hits");
  });

  it.each([
    ["dangerouslySetInnerHTML", "<div dangerouslySetInnerHTML={{ __html: x }} />"],
    ["eval(", "const y = eval (input);"],
    ["new Function", "const f = new Function('return 1');"],
  ])("fails on %s and names the file and line", (_label, code) => {
    const result = scan(fixture({ "nested/deep/b.tsx": `// ok\n${code}\n` }));
    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/b\.tsx:2 /);
  });

  it("ignores files that are not source code", () => {
    const result = scan(fixture({ "notes.md": "never use eval( here" }));
    expect(result.status).toBe(0);
  });
});
