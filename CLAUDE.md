# CLAUDE.md

Permanent rules for this repository (Muhammad Hassan's portfolio, repo `HassanDev`). Every session follows them. This site is a showcase of engineering standards: clean code, security and accessibility matter as much as the visuals.

## Stack and hosting

- Next.js App Router with `output: "export"` (fully static), TypeScript `strict`, Tailwind CSS.
- Hosted free on GitHub Pages as a project site: **<https://muhammadhassan05.github.io/HassanDev>**.
- `basePath` and `assetPrefix` are `/HassanDev`, `trailingSlash: true`, `images: { unoptimized: true }`.
- The base path and site URL are defined once in `src/lib/site.ts`. Never hard-code `/HassanDev` anywhere else.
- `next/link` and `next/image` add the base path automatically. Plain `<a href>` to files in `public/` (for example the PDFs) must go through `withBasePath()` from `src/lib/site.ts`.

## Source of truth: `design-kit/`

- `design-kit/` is the source of truth for all copy, colors, spacing and layout. It stays on this machine and is gitignored. Never commit or push it.
  - `design-kit/canvas-source/engineer-page.dc.html` is the main page (`/`).
  - `design-kit/canvas-source/studio-page.dc.html` is the studio page (`/studio/`).
  - `design-kit/illustrations/*.svg` are the project illustrations, with `__ACCENT__` / `__GLOW__` placeholders.
  - `design-kit/docs/` holds the PDFs, copied to `public/docs/`.
- The `.dc.html` files use a design-tool format (`<x-dc>`, `<sc-for>`, `<sc-if>`, `{{accent}}` holes, `DCLogic` classes). They are visual and content reference only. Never copy that syntax into the app.
- `design-kit/CLAUDE_CODE_PROMPT.md` is an older brief. Where it conflicts with this file (for example "no basePath"), this file wins.
- If something is unclear or missing, **ask Hassan instead of inventing** copy, colors, spacing or behaviour.

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

## Responsive

- Must work from 360px to 1440px+ wide. Check at 375, 768, 1024 and 1440.

## Decisions that override the design kit

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
