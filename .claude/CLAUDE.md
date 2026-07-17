# CLAUDE.md — Permanent AI Instructions for DILIATE V2

This file governs how any AI assistant (Claude Code or otherwise) works on this repository. Read it fully before making changes.

## Project Identity

DILIATE is a premium software development company site. It is itself a portfolio piece — code quality, motion, and performance must be enterprise-grade at all times. Nothing ships "good enough."

## Coding Standards

- **Next.js 16 in use (not 14 as originally planned)** — `params`/`searchParams` in every page/layout/route/metadata function are Promises and must be `await`ed. This is a hard runtime requirement in v16, not a style preference. Before writing any dynamic route, check `node_modules/next/dist/docs/` locally (per this project's own `AGENTS.md`) rather than assuming v14-era patterns from training data — the framework has real breaking changes past most models' knowledge cutoffs.
- TypeScript strict mode always on. No `any` unless justified with a comment.
- Functional components only. No class components.
- Server Components by default; add `"use client"` only when interactivity/state/browser APIs are required.
- Prefer Server Actions for mutations (form submissions, contact form, etc.) over hand-rolled API routes. Use API routes only for things Server Actions can't do (webhooks, third-party callbacks).
- Data fetching in Server Components uses standard `fetch`/GET semantics — no custom HTTP verbs.
- Every exported function/component has a one-line JSDoc if its purpose isn't obvious from its name.

## Architecture Standards

- Follow the folder structure defined in `Architecture.md`. Do not invent new top-level folders without updating that file first.
- Colocate a component's styles/tests/subcomponents with the component itself.
- Shared UI primitives live in `src/components/ui` (shadcn territory). Composed, page-specific components live in `src/components/sections`.

## Animation Standards

- Follow `Animation.md`. No default/basic fades (`opacity: 0 → 1` alone) as a primary reveal — combine with movement, scale, or clip-path per the presets defined there.
- All scroll animations respect `prefers-reduced-motion`.
- GSAP for complex timelines/scroll-triggers, Motion (Framer Motion) for component-level transitions, Lenis for smooth scroll only — don't mix scroll libraries.

## Accessibility

- Semantic HTML first — `<button>` for actions, `<a>` for navigation, proper heading hierarchy (one `<h1>` per page).
- All interactive elements keyboard-navigable and focus-visible.
- Color contrast meets WCAG AA minimum.
- All animations have a reduced-motion fallback.

## Performance Rules

- Images via `next/image` only, no raw `<img>`.
- Fonts via `next/font`, no external font `<link>` tags.
- Lazy-load below-the-fold heavy components (3D scenes, large animation sequences).
- Target Lighthouse Performance ≥ 90 on the deployed site.

## SEO Rules

- Every page exports proper `metadata` (title, description, OG, Twitter card).
- Follow `SEO.md` for structured data requirements per page type.

## Naming Conventions

- Components: PascalCase (`HeroSection.tsx`).
- Utilities/hooks: camelCase (`useScrollProgress.ts`).
- Files match their default export name.

## Reusable Component Rules

- Before creating a new component, check `Components.md` and `src/components/ui` for an existing one that can be extended via props.
- No duplicate components that do the same job with slightly different styling — extend with variants instead.

## Design Rules

- No hardcoded hex colors in components — use Tailwind theme tokens defined in `Design.md`/`tailwind.config`.
- Spacing follows the defined scale, not arbitrary pixel values.

## Code Quality Rules

- ESLint + Prettier must pass before commit (enforced via Husky + lint-staged).
- No console.log left in committed code.

## Git Rules

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- No direct commits to `main` once collaborators are added — for now (solo dev), commit directly to `main` but keep commits atomic and descriptive.
- Never force-push to `main`.

## Documentation Rules

- Any architectural decision that deviates from `Architecture.md` must be recorded there, not just in code comments.
- `Memory.md` is updated at the end of every significant development session — current phase, what was completed, what's next.

## Standing AI Behavior Rules

- Always ask before destructive changes (deleting files, overwriting config, force operations).
- Always explain what a new package does before installing it.
- Never generate UI/pages/components until explicitly told to move past the setup phase.
- Never use deprecated packages — check for current stable versions before installing.
