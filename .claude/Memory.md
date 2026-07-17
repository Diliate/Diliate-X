# Memory.md — DILIATE V2 Session Memory

> Updated at the end of every significant development session. Do not populate speculatively — only record what actually happened.

## Current Phase

Phase 1 — Project Setup: **implementation started** (project owner approved moving from planning/design into actual build on this date). Scaffold + repo creation commands provided; awaiting execution on the local machine.

## Completed Tasks

- `.claude` documentation set created (CLAUDE.md, PRD.md, Architecture.md, Rules.md, Phases.md, Design.md, Animation.md, SEO.md, Components.md, Brand.md, TechStack.md, Deployment.md, Testing.md, TODO.md)

## Architecture Decisions

- Next.js 14 App Router (not Vite) — chosen for SEO/SSR needs of a marketing site.
- **Correction (scaffold time, July 2026):** `create-next-app@latest` installed Next.js 16.2.10, not 14. Real breaking changes apply — async `params`/`searchParams` (must `await`), opt-in caching via `"use cache"` directive. Updated `Architecture.md`, `TechStack.md`, `CLAUDE.md` accordingly. Not treating this as a problem to roll back — Next.js 16 is the current stable release and the project should build on it, just with corrected assumptions.
- Data fetching: standard REST GET + Server Actions for mutations — no custom HTTP verbs.
- New repo (`Diliate-X`) created rather than reusing old `Diliate` repo, to keep the live site unaffected during rebuild.

## Known Issues

None yet — pre-scaffold stage.

## Important Notes

- Brand identity (logo, colors) not finalized — blocking full Phase 2 lock. See `TODO.md`.
- Case study content/permissions not yet confirmed for WRES, MailEngine Pro, Sharma Pickle Store. CareBridge is permanently excluded from DILIATE X per explicit instruction — unreleased, not to be disclosed on any platform.

## Pending Work

- Run Next.js scaffold + package installs locally (commands provided in `Deployment.md`).
- Initial commit + push to GitHub.
- Connect Vercel project.

## Next Session Goals

- Confirm blocking items in `TODO.md`.
- Complete Phase 1 environment setup end-to-end.
- Begin Phase 2 (Design System) once brand direction is confirmed.
