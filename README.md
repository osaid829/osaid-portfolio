# Osaid — Full-Stack / Creative Developer

A personal developer portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, React Three Fiber, Drei, Framer Motion, GSAP ScrollTrigger, an ASCII motion field, and original offline Python artwork.

## Run locally

Use Node.js 22.13+ or 24 LTS, then:

```bash
npm ci
npm run dev
```

The optional procedural-art toolchain can be installed locally with `python3 -m venv .venv && .venv/bin/pip install -r python-art/requirements.txt`. Once present, `npm run art` automatically uses that project-local environment.

Open `http://localhost:3000`. For the production version:

```bash
npm run build
npm start
```

The included `.npmrc` uses a project-local cache to avoid the home-directory npm permission error. If your environment overrides that setting, run `npm ci --cache ./.npm-cache`. Do not use sudo or --force. Extract this edition into a separate folder so your previous local work remains available.

Python is **not** required to run or deploy the website. Its generated assets are already included.

## Required personal configuration

Edit `config/site.ts`, or copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_GITHUB_USERNAME=your-actual-username
NEXT_PUBLIC_INSTAGRAM_HANDLE=your-actual-handle
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/your-actual-profile/
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ACCENT_COLOR=#c3ed88
```

These example strings are instructions, not supplied personal values. Replace them with your actual identifiers. GitHub is configured to the verified account `osaid829`. Instagram, LinkedIn and contact email are optional until supplied; unconfigured profiles stay out of the rendered contact panel rather than becoming dead ends. All configured external links open a new tab with `noopener noreferrer`.

The preview colour is `#c3ed88`, explicitly a neutral design default rather than a claimed preference. One validated six-digit hex setting controls all accent UI, the 3D highlights and masked artwork. Check text contrast if changing it. The fallback colour is safe on the current dark backgrounds.

**Before launch:** supply any remaining profile values, confirm the preview accent and project descriptions, and inspect WebGL on a GPU-enabled browser. The homepage does not depend on the public GitHub feed; it uses the curated project records above it.

## Architecture

- `app/`: page composition, metadata, global styles and 404.
- `components/layout/`: responsive section navigation.
- `components/sections/`: hero, profile, capabilities, working approach, curated work index and contact.
- `components/three/`: lazy-loaded Canvas, procedural system core, error boundary and HTML controls.
- `components/motion/`: GSAP pinned gallery, word scrub, ASCII field and project accordion.
- `components/ui/`: reusable icons, visible social states and progressive motion wrapper.
- `config/site.ts`: all public personal settings and validated profile URLs.
- `lib/github.ts`: retained as a safe, optional GitHub feed utility for future enrichment; the homepage uses curated project records so the portfolio never waits on a third-party API.
- `data/fallback-projects.ts`: owner-reported projects, not manufactured repository statistics.
- `python-art/`: four offline generators and an orchestrator.
- `public/generated/`: all committed artwork.
- `scripts/data.test.ts`: network/data safety and error-path tests, using Node's built-in test runner.

## Osaid Core

The three interlinked structural paths represent interface, logic and data. “Structure” shows the connected volume; “Network” exposes its nodes and links. Pointer movement gently changes the view, and scrolling introduces a restrained tilt. Neither access to content nor navigation depends on WebGL.

The canvas uses demand rendering, caps DPR at 1.5, pauses offscreen/in background tabs, and uses buffer geometry for wires and nodes. No continuous autonomous rotation, HDR environment fetch, postprocessing chain or large external model is required. The full renderer is dynamically imported.

The depth slider, left/right rotation buttons and Reset are keyboard accessible and also work with the generated 2D study. The 2D view is a useful fallback and can be selected at any time. Reduced-motion preference disables animated transforms; changing mode remains usable. Canvas failures retain generated artwork and HTML controls/content. Performance is designed to be modest but 60 fps has not been measured on physical hardware.

## GitHub data

The homepage intentionally renders curated work from `data/fallback-projects.ts` first. The public user repositories utility remains available for optional archive/enrichment work without putting the selected-work narrative behind an API request.

When used, the latest 100 owner repositories are considered; forks, archived/disabled repos, the profile README repo, and `.github` are filtered out. Up to six entries are sorted by stars then last update. There is no API route and no browser token.

Missing configuration, unavailable/rate-limited GitHub, invalid payloads, or an empty eligible feed still show the labelled static selection when the optional utility is used. These entries never show fabricated stars or activity. Descriptions are rendered as text; external URLs reject script schemes and embedded credentials.

This is a **pre-rendered portfolio with ISR on Vercel**, not a pure `output: 'export'` build. The page remains fast and deterministic because the selected-work narrative is local; the optional GitHub utility can still use hourly revalidation without adding a custom backend.

## Validation

```bash
npm run typecheck
npm test
npm run build
```

No lint dependency has been added because only the requested stack and its necessary TypeScript/Tailwind tooling were authorized. TypeScript is strict; there is no `any`, `@ts-ignore` or ignored build errors.

See `VALIDATION.md` for checks actually completed and checks blocked by the execution environment. Do not treat an unavailable browser check as a pass.

## Vercel deployment

1. Push this project folder to a Git repository under your account, excluding `node_modules`, `.next`, `.env.local` and `qa`.
2. In Vercel, import that repository. Set the root directory to this folder if it is inside another repository.
3. Framework preset: **Next.js**. Node: **24.x** (or supported Node 22). Install command: `npm ci`. Build command: `npm run build`. Leave output directory at the framework default; do not use `out`.
4. Add the public configuration values above for the intended environment. Redeploy after changing them because public environment variables are bundled at build time.
5. Review the Preview deployment first. Check 375px, 768px and 1440px; use keyboard navigation and reduced motion; select Network and 2D/3D modes; verify configured social destinations and repository/live-demo links.
6. Promote the reviewed build to production. For a regression, roll back to the previous working deployment in the Vercel dashboard.

No API token, Python runtime, paid asset, database, auth, CMS or custom domain is required by the implementation. No deployment has been created from this workspace.
