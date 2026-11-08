# CLAUDE.md

Permanent rules for this repository (Muhammad Hassan's portfolio, repo `HassanDev`). Every session follows them. This site is a showcase of engineering standards: clean code, security and accessibility matter as much as the visuals.

## Stack and hosting

- Next.js App Router with `output: "export"` (fully static), TypeScript `strict`, Tailwind CSS.
- Hosted free on GitHub Pages as a project site: **<https://muhammadhassan05.github.io/HassanDev>**.
- `basePath` and `assetPrefix` are `/HassanDev`, `trailingSlash: true`, `images: { unoptimized: true }`.
- The base path and site URL are defined once in `src/lib/site.ts`. Never hard-code `/HassanDev` anywhere else.
- `next/link` adds the base path automatically. `next/image` does not, because images are unoptimized, so image `src` paths must go through `withBasePath()` from `src/lib/site.ts`, as must plain `<a href>` to files in `public/` (for example the PDFs).

## Content reference: `design-kit/`

- `design-kit/` is a **content reference only**: copy, links, project facts and the PDFs. Its visual style (glass cards, glow orbs, gradients, pill badges, numbered section labels, its colours, fonts, spacing and layout) is **retired**. The look comes from the Design rules below, never from the kit. It stays on this machine and is gitignored. Never commit or push it.
  - `design-kit/canvas-source/engineer-page.dc.html` holds the copy for the main page (`/`).
  - `design-kit/canvas-source/studio-page.dc.html` holds the copy for the studio page (`/studio/`).
  - `design-kit/illustrations/*.svg` are the original project illustrations.
  - `design-kit/docs/` holds the PDFs, copied to `public/docs/`.
- The `.dc.html` files use a design-tool format (`<x-dc>`, `<sc-for>`, `<sc-if>`, `{{accent}}` holes, `DCLogic` classes). Never copy that syntax into the app.
- `design-kit/CLAUDE_CODE_PROMPT.md` is an older brief. Where it conflicts with this file (for example "no basePath"), this file wins.
- If something is unclear or missing, **ask Hassan instead of inventing** copy, colours, spacing or behaviour.

## Design rules

The site is simple and sleek, in the spirit of apple.com: lots of whitespace, big confident typography, flat solid colours, one idea per section, nothing decorative that doesn't earn its place.

- No gradients anywhere (backgrounds, text, borders, shadows). No glass, no `backdrop-filter`, no blur, no glow, no coloured shadows, no emoji.
- No pill badges or status chips above headings. No "01 / label" section numbering.
- Flat solid surfaces. Separation comes from whitespace, a 1px hairline (`--line`) or a change of surface colour.
- One accent per page: engineer pages use burgundy, studio pages use olive. Use the accent sparingly: primary buttons, links, small highlights. Never as large background areas, except the primary button.
- Typography: one family. Font stack: `-apple-system, BlinkMacSystemFont, var(--font-inter), "Segoe UI", Roboto, sans-serif`. Apple devices get SF Pro, everyone else gets self-hosted Inter via `next/font`. JetBrains Mono only inside the terminal and code snippets. Bricolage Grotesque, Instrument Serif, Archivo and Space Grotesk are removed.
- Type scale:
  - Hero name: `clamp(56px, 9vw, 112px)`, weight 600, letter-spacing -0.035em, line-height 1.0.
  - Section titles: `clamp(36px, 5vw, 56px)`, weight 600, letter-spacing -0.025em.
  - Body: 17 to 19px, line-height 1.5.
  - Small text: 14px.
- Layout: content max width 1120px, section padding `clamp(80px, 12vw, 160px)` top and bottom, centred section headings with one short supporting line under them.
- Corners: 18px on cards and media, 980px (fully round) on buttons only.
- Motion: only a subtle fade and 16px rise when a section first enters the viewport (400ms, ease-out), plus normal hover states. All motion is off with `prefers-reduced-motion`.
- Every text/background pair meets WCAG AA (4.5:1 body, 3:1 large text) in BOTH light and dark mode.

## Mobile first

Most visitors are on phones.

- Build every component for a 375px phone first, then add larger layouts with `min-width` media queries. The phone version is the primary design, not a squeezed desktop.
- Test widths: 360, 375, 390, 430 (phones), 768 (tablet), 1024 and 1440 (desktop).
- Phones: one column, 20px side padding, body text at least 17px, section padding at least 64px, primary buttons full width, at least 8px between tap targets, every target at least 44px.
- Grids: 1 column on phones, 2 from 768px, 3 from 1024px.
- Nav on phones: 56px tall, name on the left, menu button and theme toggle on the right. The menu opens as a full-screen sheet with large links and the Contact button at the bottom, closes with Escape and returns focus to the menu button.
- Respect notched phones with `env(safe-area-inset-*)` padding.
- Readable line length on desktop: paragraphs max 65ch.
- No hover-only information: anything shown on hover must also be visible or reachable by tap.

## Review checkpoints

- When a prompt says "screenshots for review", save full-page screenshots of the changed pages to `review/<step>/` (gitignored) at 375px and 1440px, in light and dark mode, named like `home-375-light.png`. Then tell Hassan the folder; he reviews them before moving on.

## Dependencies

- Minimal dependencies: no animation libraries, no UI kits, no analytics.
- Pin exact versions (no `^` or `~`; `.npmrc` sets `save-exact=true`). Commit `package-lock.json`.
- **Ask before adding any dependency**, including dev dependencies.

## Privacy and network

- Zero requests to third-party domains on the live site. No trackers, cookies, forms or backend.
- Fonts only via `next/font/google`, which self-hosts them at build time. Never use a `<link>` to Google Fonts or any CDN.

## Content

- All content lives in typed files in `src/content/` with exported TypeScript types.
- Components never hard-code content (copy, links, numbers, project data). They receive it from `src/content/`.

## Code standards

- Every file starts with a short header comment saying what it is for.
- Every exported function and component has a JSDoc comment.
- Comments explain _why_, not _what_.
- No commented-out code. No `console.log`.
- Small components with one responsibility each. Folders:
  - `src/app`: routes and metadata.
  - `src/components/{layout,ui,features,illustrations,sections}`. `sections` holds page sections shared by both pages (stats, experience, skills, contact…).
  - `src/content`: typed data only.
  - `src/lib`: pure functions, unit-tested in `tests/`.
  - `src/styles`: global CSS and design tokens.
  - `scripts`: build helpers.

## Security

- Never use `dangerouslySetInnerHTML`, `eval` or `new Function`. ESLint enforces this.
- External links always get `rel="noopener noreferrer"`.
- Never build URLs from user input.

## Accessibility

- Semantic HTML, exactly one `h1` per page, real `<button>` and `<a>` elements.
- Visible focus styles on everything interactive.
- Touch targets at least 44×44px.
- WCAG AA contrast (4.5:1 for body text).
- Everything respects `prefers-reduced-motion`: the page must look complete with motion off.

## Content decisions that override the design kit

Hassan has confirmed these. Apply them instead of what the `.dc.html` files show.

- **Studio, RICI International entry:** replace the `[ADD 1 TO 2 RESULTS]` placeholder with exactly one bullet: "Built and customized Shopify themes and stores for clients." Add no other results.
- **Studio contact buttons:** keep "Behance portfolio" and drop the plain "Behance" button, which duplicates it.
- **Resume and appointment letter links:** the design's `/_blob/...` hrefs become `withBasePath("/docs/Muhammad-Hassan-Resume.pdf")` and `withBasePath("/docs/YIC-Appointment-Letter.pdf")`.

## CI auditing

- The blocking step audits production dependencies only: `npm audit --omit=dev --audit-level=high`.
- A separate non-blocking step (`continue-on-error: true`) runs the full `npm audit` and prints the report, so dev-tooling advisories stay visible without failing the build.

## Workflow

- `.nvmrc` pins the Node version; CI reads the same file, so local and CI always match.
- `npm run check` runs typecheck, ESLint (zero warnings), the Prettier check, the forbidden-patterns scan (`scripts/check-forbidden.mjs`) and Vitest. `npm run build` produces the static export in `out/`. Both must pass before work is called done.
- **Never push or deploy unless Hassan explicitly says so.** Every push to `main` deploys the live site (`.github/workflows/deploy.yml`), so a push is a deploy.
- The redesign happens on the `redesign` branch. Never push to `main` during it unless Hassan says so.
- **Never push to `main` without asking first, even for small fixes.** Say what will be pushed and why, then wait for Hassan's OK. An earlier OK does not cover a later push.
- **Any change with more than one commit goes through a pull request:** push the branch, open a PR, and wait for CI to pass on Linux before merging. Some checks (for example `tests/export/segment-files.test.ts`) run only on Linux, so they must pass before anything reaches `main`.
- **Stop on the first failing command.** Check exit codes and chain steps so each runs only if the previous one passed (`npm run check && npm run build && npm run test:export`). Never commit or push after a failure.
