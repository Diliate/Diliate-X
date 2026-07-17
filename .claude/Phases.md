# Phases.md — DILIATE V2 Development Roadmap

## Phase 1 — Project Setup

**Objectives:** Working, properly configured dev environment.
**Tasks:** Next.js init, TypeScript/Tailwind/ESLint/Prettier/Husky config, install animation/UI libraries, create `.claude` docs, initial GitHub push, Vercel project connected.
**Dependencies:** None.
**Completion Criteria:** `npm run dev` runs clean, `npm run build` succeeds, lint/format hooks work, repo pushed, Vercel preview deploys successfully on an empty scaffold.

## Phase 2 — Design System

**Objectives:** Lock the visual language before any real page is built.
**Tasks:** Define color tokens, typography scale, spacing scale, button/card/form primitives via shadcn, dark/light theme setup.
**Dependencies:** Phase 1 complete.
**Completion Criteria:** A `/design-system` internal preview route (or Storybook-lite page) showing all primitives; approved by project owner.

## Phase 3 — Homepage

**Objectives:** Primary landing experience — value prop, services overview, proof points, CTA.
**Dependencies:** Phase 2.
**Completion Criteria:** Fully responsive, animated, passes Lighthouse targets.

## Phase 4 — Services Pages

**Objectives:** Detail each service line (SaaS, AI, CRM/ERP, Healthcare, Real Estate, Custom, Mobile, Cloud).
**Dependencies:** Phase 3 patterns established.

## Phase 5 — Case Studies

**Objectives:** Build the case study template + populate with WRES, MailEngine Pro, and Sharma Pickle Store content. (CareBridge is excluded — unreleased, not to be publicly disclosed.)
**Dependencies:** Content/screenshots gathered (see open items in `TODO.md`).

## Phase 6 — About / Contact

**Objectives:** Company narrative page + functional contact form (Server Action, validation, email delivery, spam protection).
**Dependencies:** Phase 2.

## Phase 7 — Animation Pass

**Objectives:** Layer in GSAP scroll sequences, page transitions, cursor interactions per `Animation.md` — applied across all pages built so far.
**Dependencies:** Phases 3–6 structurally complete.

## Phase 8 — SEO Pass

**Objectives:** Metadata, structured data, sitemap/robots, OG images, internal linking audit.
**Dependencies:** All pages content-complete.

## Phase 9 — Testing & QA

**Objectives:** Lint/type-check clean, accessibility audit, cross-browser check, performance audit, manual QA pass.
**Dependencies:** Phase 8.

## Phase 10 — Deployment

**Objectives:** Production domain cutover, final environment variable check, launch.
**Dependencies:** Phase 9 sign-off.

**Risks across phases:** Content/case-study material (screenshots, permission to showcase real client-adjacent work) is the most likely bottleneck — flagged in `TODO.md` as a blocking dependency for Phase 5.
