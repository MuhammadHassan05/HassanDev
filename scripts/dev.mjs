/**
 * Runs `next dev` and, once it is ready, prints the URL that actually works.
 * Next prints http://localhost:3000, but the site lives under the GitHub Pages
 * base path, so that root URL is a 404 in dev. This only changes the console
 * output; routing and the production build are untouched.
 *
 * Usage: node scripts/dev.mjs [next dev args]   (npm run dev passes them through)
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { readBasePath } from "./base-path.mjs";

const basePath = readBasePath();
const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");

// Output is piped so it can be watched; FORCE_COLOR keeps Next's colors anyway.
const child = spawn(process.execPath, [nextBin, "dev", ...process.argv.slice(2)], {
  stdio: ["inherit", "pipe", "pipe"],
  env: { ...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? "1" },
});

// Next colors its output; strip the escape codes before matching URLs.
const ANSI = /\u001b\[[0-9;]*m/g;
const LOCAL_URL = /Local:\s+(https?:\/\/[^\s/]+)/g;
const announced = new Set();

/**
 * Echoes Next's output and adds a "Site" line after every local origin it
 * reports. Origins are read from the output because Next moves to another
 * port when 3000 is busy, and reports an already running server's URL when
 * it refuses to start a second one.
 *
 * @param {Buffer} chunk - Raw output from the child process.
 * @param {NodeJS.WriteStream} stream - Where to echo it.
 */
function relay(chunk, stream) {
  stream.write(chunk);
  for (const [, origin] of chunk.toString().replace(ANSI, "").matchAll(LOCAL_URL)) {
    if (!announced.has(origin)) {
      announced.add(origin);
      stream.write(`- Site:          ${origin}${basePath}/  (open this one)\n`);
    }
  }
}

child.stdout.on("data", (chunk) => relay(chunk, process.stdout));
child.stderr.on("data", (chunk) => relay(chunk, process.stderr));

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
