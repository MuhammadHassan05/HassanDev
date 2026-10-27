# HassanDev

The portfolio of Muhammad Hassan, software engineer: a fully static site hosted on GitHub Pages at <https://muhammadhassan05.github.io/HassanDev>.

It has two pages that share one design system:

- **`/`** for the software engineering track: projects, experience, education, skills, an interactive terminal and contact links.
- **`/studio/`** for the Shopify and design track: services, a before/after case study, clients and contact links.

The site is also a showcase of engineering standards, so the code is held to the same bar as the visuals: strict TypeScript, tested logic, a strict Content Security Policy, no third-party requests, and accessibility down to keyboard and reduced-motion users.

## Stack

| Part      | Choice                                                                    |
| --------- | ------------------------------------------------------------------------- |
| Framework | Next.js (App Router) with `output: "export"`, so the build is plain files |
| Language  | TypeScript in `strict` mode                                               |
| Styling   | Tailwind CSS v4, with design tokens in `src/styles/globals.css`           |
| Fonts     | `next/font/google`, downloaded at build time and served from the site     |
| Tests     | Vitest for the logic in `src/lib/` and post-build checks of `out/`        |
| Quality   | ESLint (zero warnings), Prettier, a forbidden-patterns scan, CodeQL       |
| Hosting   | GitHub Pages, under the `/HassanDev` base path                            |

The runtime dependencies are Next.js, React and React DOM, and nothing else: no animation libraries, UI kits or analytics. Every version is pinned exactly.

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

| Command               | What it does                                                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run dev`         | Dev server with hot reload                                                                         |
| `npm run build`       | Static export to `out/`, then `scripts/csp.mjs` adds a hashed CSP to each page                     |
| `npm run check`       | Typecheck, lint (zero warnings), format check, forbidden-patterns scan, tests                      |
| `npm run test:export` | After a build: checks CSP, links and page-data files in `out/` (page-data part skipped on Windows) |
| `npm run og-image`    | After a build: regenerates `public/og.png` and the icons from the built site                       |
| `npm run format`      | Format every file with Prettier                                                                    |

`npm run check` and `npm run build` must both pass before a change is done.

## Editing content

All copy, links, numbers and project data live in typed files in `src/content/`. Components only render what they are given, so changing the text never means touching a component.

| File                                        | What it holds                                                      |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `profile.ts`                                | Name, contact links and the pitch for each track                   |
| `projects.ts`                               | Project cards: title, description, tags, filter group and links    |
| `experience.ts`                             | Work history for each track                                        |
| `education.ts`                              | Degree, leadership roles and certifications                        |
| `skills.ts`                                 | Skill groups                                                       |
| `services.ts`, `clients.ts`, `caseStudy.ts` | Studio page: services, client list and the before/after case study |
| `stats.ts`                                  | The stat tiles                                                     |
| `terminal.ts`, `chai.ts`                    | Terminal commands and replies, and the chai counter's copy         |
| `tracks.ts`                                 | The two tracks and their routes                                    |
| `site.ts`                                   | Page titles and descriptions, share image, footer, 404 page        |
| `illustrations.ts`                          | Which illustration each project uses                               |
| `types.ts`                                  | The types every content file is checked against                    |

TypeScript checks every edit against `types.ts`. `tests/content.test.ts` checks what types can't: that every internal link points at a real file or route, that each project has its own illustration, and that the project counts match the filter tabs. Run `npm run check` after editing.

PDFs live in `public/docs/`. Link to them with `withBasePath()` from `src/lib/site.ts`, never with a hard-coded `/HassanDev`.

## Deployment

The site builds to static files in `out/`, which GitHub Pages serves as they are. There is no server or backend.

**Every push to `main` deploys.** `.github/workflows/deploy.yml` builds on Ubuntu, adds the CSP, runs `npm run test:export`, then publishes `out/` with GitHub's official Pages actions. If any check fails, nothing is published. Deploys share one queue and are never cancelled midway, so a deploy that has started always finishes.

Separately, CI (`.github/workflows/ci.yml`) runs every check on each push to `main` and on every pull request.

`public/.nojekyll` is copied into the export. It stops GitHub Pages from running Jekyll, which would hide the `_next` folder.

Watch a deploy under the repository's **Actions** tab ("Deploy to GitHub Pages"). The live URL appears on the run's deploy job.

Search engines find the pages through the sitemap (`/HassanDev/sitemap.xml`), which is submitted through Google Search Console. The build also writes a `robots.txt`, but crawlers only read that file at a domain's root, so under `/HassanDev/` it has no effect.

The base path and site URL are defined once, in `src/lib/site.ts`. If the repository is renamed, change them there.

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
