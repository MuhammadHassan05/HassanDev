# HassanDev

The portfolio of Muhammad Hassan, software engineer: a fully static site hosted on GitHub Pages at <https://muhammadhassan05.github.io/HassanDev>.

It has two track pages and a set of case studies, all sharing one design system:

- **`/`** for software engineering: hero and stats, selected case studies, projects, experience, an interactive terminal, education, skills and contact.
- **`/studio/`** for Shopify and design work: hero and stats, services, Shopify builds, the featured case study, clients, design work, experience, tools and contact.
- **`/case-studies/`** and **`/case-studies/<slug>/`**: the published case studies, one page each.

The site is also a showcase of engineering standards, so the code is held to the same bar as the visuals: strict TypeScript, tested logic, a strict Content Security Policy, no third-party requests, and accessibility down to keyboard and reduced-motion users.

## Stack

| Part      | Choice                                                                    |
| --------- | ------------------------------------------------------------------------- |
| Framework | Next.js (App Router) with `output: "export"`, so the build is plain files |
| Language  | TypeScript in `strict` mode                                               |
| Styling   | Tailwind CSS v4, with design tokens in `src/styles/globals.css`           |
| Fonts     | Inter and JetBrains Mono via `next/font/local`, committed in the repo     |
| Tests     | Vitest for the logic and content, plus post-build checks of `out/`        |
| Quality   | ESLint (zero warnings), Prettier, a forbidden-patterns scan, CodeQL       |
| Hosting   | GitHub Pages, under the `/HassanDev` base path                            |

The runtime dependencies are Next.js, React and React DOM, and nothing else: no animation libraries, UI kits or analytics. Every version is pinned exactly.

## Design

Simple and flat, in the spirit of apple.com: whitespace, large type, solid colours and one idea per section. The full rules live in [CLAUDE.md](CLAUDE.md); in short:

- **No decoration that doesn't earn its place.** No gradients, glass, blur, glow, coloured shadows or emoji. Surfaces are flat; sections are separated by whitespace, a 1px hairline or a change of surface colour. A test (`tests/colors.test.ts`) fails on any of these in `src/`.
- **One typeface.** SF Pro on Apple devices and self-hosted Inter elsewhere. JetBrains Mono appears only in the terminal.
- **One accent per page:** burgundy on engineering pages, olive on studio pages, used for primary buttons, links and small highlights.
- **Mobile first.** Every section is built for a 375px phone first, then widened: one column on phones, two from 768px, three from 1024px. The phone nav is a 56px bar with a menu that opens a full-width panel.
- **Calm motion.** Sections fade up 16px when they first scroll into view. Nothing moves with reduced motion, and the page is complete without JavaScript.

## Colours and theme

Every colour on the site is a token in `src/styles/globals.css`. Tailwind's default palette is switched off, so a colour that is not a token cannot be used.

| Token                              | Use                                             |
| ---------------------------------- | ----------------------------------------------- |
| `--bg`, `--surface`, `--surface-2` | Page background, cards, alternate section bands |
| `--text`, `--text-2`               | Main and secondary text                         |
| `--line`                           | Hairlines and borders                           |
| `--burgundy`, `--olive`            | Accent fills (buttons)                          |
| `--burgundy-ink`, `--olive-ink`    | Accent text and links (lighter in dark mode)    |

Each page sets its track with `data-track`, which maps `--accent` (fills) and `--accent-ink` (text) to burgundy or olive. Components only ever use those two.

**Light and dark mode.** The page follows the visitor's system setting through CSS alone. The theme toggle in the nav overrides it and saves the choice in `localStorage`. A tiny inline script in `<head>` applies a saved choice before the first paint, so there is no flash of the wrong theme. It is wrapped in try/catch, so blocked storage never breaks the page, and the CSP build step allows it by hash like every other inline script. `tests/contrast.test.ts` reads the tokens from the stylesheet and checks every text/background pair against WCAG AA in both modes.

## Case studies

Case studies live in `src/content/caseStudies.ts`, with a typed shape: summary, client, role, year, stack, link, track, cover, and the sections (the challenge, what I did, key decisions, the result and what I'd do next). Role, year, key decisions and what I'd do next are optional, and the page leaves out whatever a case study does not have. Result metrics are real numbers only; with none, the result is its paragraph alone.

Every fact comes from Hassan. A fact that is still missing is marked `[TODO: what is needed]`, and a case study with any marker must be a **draft** (`draft: true`). Drafts are left out of the build entirely: no page, card, "Read case study" link or sitemap entry.

- **Publishing:** fill in the markers and set `draft: false`. The case study then appears in the list, its page, its track's band, its project card's link and the sitemap.
- **Nothing unfinished goes live:** in CI and in the deploy, a `[TODO` in anything that ships fails the run (`tests/content-todo.test.ts`). After the build, a check fails if `[TODO` or a link to a draft appears anywhere in `out/`.
- **Fallbacks:** while no case study is published, the case studies link leaves the nav and footer, the engineering band is hidden, the studio band shows the Tiny Owlets before/after slider, and `/case-studies/` is the 404 page. A static export refuses a dynamic route with no pages, so in that state one unlinked placeholder (`/case-studies/none/`, the 404 page, `noindex`) is generated.

## Run it locally

Use the Node version in `.nvmrc`, then:

```sh
npm ci
npm run dev
```

The site is served under the `/HassanDev` base path, so open **<http://localhost:3000/HassanDev/>**. The root `http://localhost:3000/` is a 404. `npm run dev` prints the correct URL as "Site" once the server is ready.

To check the production build:

```sh
npm run build        # static export to out/, with the CSP added
npm run test:export  # checks the files in out/
```

### Scripts

| Command               | What it does                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run dev`         | Dev server with hot reload                                                                      |
| `npm run build`       | Static export to `out/`, then `scripts/csp.mjs` adds a hashed CSP to each page                  |
| `npm run check`       | Typecheck, lint (zero warnings), format check, forbidden-patterns scan, tests                   |
| `npm run test:export` | After a build: checks the CSP, links, pages, drafts and polyfills in `out/`                     |
| `npm run og-image`    | After a build: regenerates `public/og.png` and the icons from the built site's fonts and tokens |
| `npm run format`      | Format every file with Prettier                                                                 |

`npm run check` and `npm run build` must both pass before a change is done.

## Editing content

All copy, links, numbers and project data live in typed files in `src/content/`. Components only render what they are given, so changing the text never means touching a component.

| File                        | What it holds                                                     |
| --------------------------- | ----------------------------------------------------------------- |
| `profile.ts`                | Name, contact links, and each page's hero, cross-link and contact |
| `stats.ts`                  | The numbers under each hero                                       |
| `caseStudies.ts`            | The case studies, their labels and which ones each band features  |
| `cartComparison.ts`         | The Tiny Owlets before/after carts and slider labels              |
| `projects.ts`               | Project cards: title, description, tags, filter group and links   |
| `experience.ts`             | Work history for each track                                       |
| `education.ts`              | Degree, leadership roles and certifications                       |
| `skills.ts`                 | Skill groups                                                      |
| `services.ts`, `clients.ts` | Studio services and clients                                       |
| `terminal.ts`               | The terminal section's heading, commands and replies              |
| `tracks.ts`                 | The two tracks, their routes and nav labels                       |
| `site.ts`                   | Page titles and descriptions, share image, nav, footer, 404 page  |
| `illustrations.ts`          | Which illustration each project uses                              |
| `types.ts`                  | Shapes shared by several content files                            |

TypeScript checks every edit against these types. `tests/content.test.ts` and `tests/case-studies.test.ts` check what types can't, such as every internal link pointing at a real page or file and every case study keeping to its shape. Run `npm run check` after editing.

PDFs live in `public/docs/`. Link to them with `withBasePath()` from `src/lib/site.ts`, never with a hard-coded `/HassanDev`.

The share image and icons are generated from the built site by `npm run og-image` (Inter, the light-mode tokens and the burgundy accent). Regenerate and commit them after changing the name, role or colours.

## Deployment

The site builds to static files in `out/`, which GitHub Pages serves as they are. There is no server or backend.

**Every push to `main` deploys.** `.github/workflows/deploy.yml` runs `npm run check`, builds on Ubuntu, adds the CSP, runs `npm run test:export`, then publishes `out/` with GitHub's official Pages actions. If any check fails, nothing is published. Deploys share one queue and are never cancelled midway, so a deploy that has started always finishes.

Separately, CI (`.github/workflows/ci.yml`) runs every check on each push to `main` and on every pull request.

`public/.nojekyll` is copied into the export. It stops GitHub Pages from running Jekyll, which would hide the `_next` folder.

Watch a deploy under the repository's **Actions** tab ("Deploy to GitHub Pages"). The live URL appears on the run's deploy job.

Search engines find the pages through the sitemap (`/HassanDev/sitemap.xml`), which is submitted through Google Search Console. The build also writes a `robots.txt`, but crawlers only read that file at a domain's root, so under `/HassanDev/` it has no effect.

The base path and site URL are defined once, in `src/lib/site.ts`. If the repository is renamed, change them there.

## Performance

The site targets the browsers Next.js supports (Chrome, Edge and Firefox 111+, Safari 16.4+). Next.js bundles client polyfills for features all of them already have, which Lighthouse reports as legacy JavaScript; `next.config.ts` swaps that module for `src/polyfills.ts`, which keeps only `URL.canParse` (missing before Chrome 120 and Safari 17). A post-build check fails if the old polyfills come back after a Next.js update.

## Security

The site has no forms, cookies, trackers or backend, so the attack surface is small. What remains is enforced by tooling, not left to review:

- **Content Security Policy.** After the build, `scripts/csp.mjs` adds a CSP meta tag to every page. Scripts may only come from the site itself or match a SHA-256 hash of one of the page's own inline scripts. Plugins, form submissions and foreign base URLs are blocked. `tests/export/security.test.ts` recomputes the hashes independently, so a bug in the script can't hide itself.
- **No third-party requests.** Fonts are self-hosted at build time, and there are no CDNs or analytics. The export tests fail if any page loads a script, style, font or image from another origin.
- **Hardened links.** Every link goes through one component that adds `rel="noopener noreferrer"` to external ones. The export tests check every link against an allowlist of destinations.
- **Referrer policy.** `strict-origin-when-cross-origin`, so other sites see at most the site's origin.
- **No unsafe code patterns.** `dangerouslySetInnerHTML`, `eval` and `new Function` are banned by ESLint and by `scripts/check-forbidden.mjs`. The terminal never builds a URL from what a visitor types; its links come from a fixed list.
- **Supply chain.** Dependencies are pinned exactly and kept to a minimum. CI fails on high-severity advisories in production dependencies, CodeQL scans the code, Dependabot proposes updates, and GitHub Actions are pinned to commit SHAs.

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Known issues

**Windows builds: page switches fall back to a full reload.** Next.js 16.4.2's static export has a Windows-only bug ([vercel/next.js#85374](https://github.com/vercel/next.js/issues/85374)). It writes the router's page-data files into nested folders (`studio/__next.studio/__PAGE__.txt`) instead of the flat names the browser requests (`studio/__next.studio.__PAGE__.txt`). On a build made on Windows, moving between pages logs a 404 and Next falls back to a full page load; every page still works.

Production is unaffected as long as it is built on Linux, as CI does. CI enforces this with `npm run test:export`, whose page-data check is skipped on Windows. Remove this note once a Next.js release with the fix is installed.

## License

The **source code** is released under the [MIT License](LICENSE).

The **personal content is not**. Muhammad Hassan reserves all rights to:

- the copy and personal information, including everything in `src/content/`;
- the resume and appointment letter PDFs in `public/docs/`;
- the project illustrations in `src/components/illustrations/`;
- the share image and icons (`public/og.png`, `src/app/icon.png`, `src/app/apple-icon.png`).

You're welcome to learn from the code or reuse it for your own site, with your own content in place of Hassan's.
