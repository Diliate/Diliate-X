# TODO.md — DILIATE V2 Master Roadmap

## Blocking / Needs Your Input (highest priority — nothing in Phase 2+ can fully lock without these)

- [x] **Logo** — resolved (final): new mark supplied by project owner (`logo-source.png`), recolored to yellow `#FFC700` (`logo-yellow.png`, transparent background). This replaces the earlier decision to reuse the old repo's logo — that mark is no longer used anywhere. Yellow logo confirmed legible on both the white welcome screen and the dark site background.
- [x] **Domain confirmation** — confirmed via old site's meta tags: `diliate.com`.
- [x] **Color palette / theme decision** — locked via the design brief: premium dark mode, blue/purple/cyan accents, glassmorphism. Full spec in `design-system/ColorTypographySystem.md`.
- [ ] **Case study content permission** — confirm WRES/MailEngine Pro/Sharma Pickle Store can be publicly showcased (any client-confidentiality concerns to redact?). See `design-system/CaseStudyTemplate.md` content notes. CareBridge is permanently excluded from DILIATE X (unreleased, not to be disclosed on any platform).
- [ ] **Case study assets** — screenshots/recordings of each product for the case study pages.
- [ ] **Diliate-Portfolio repo purpose** — now reviewed for the design audit (see `design-system/DesignAudit.md`); still need confirmation on whether it feeds into V2's case studies or stays separate.
- [ ] **Pricing model** — displayed on site or "contact us" only? (Currently assumed "contact us" per `PRD.md`.)
- [ ] **Target geography framing** — Dubai-first (matching WRES positioning) or global-first messaging?
- [ ] **Real logo light variant** — needs to be produced (see logo note above).

## Phase 1 — Setup (in progress)

- [x] `.claude` documentation set created
- [ ] Next.js scaffold run locally
- [ ] Package installs run locally
- [ ] Husky/lint-staged configured
- [ ] Initial commit + push to `Diliate-X` repo
- [ ] Vercel project connected, empty scaffold deploys successfully

## Phase 2 — Design System

- [ ] Finalize color tokens (blocked on brand input above)
- [ ] Typography selection + `next/font` setup
- [ ] Build primitive components via shadcn

## Later Phases

See `Phases.md` for full breakdown (Phases 3–10).

## Estimated Complexity (rough, will refine per phase)

- Phase 1: Low
- Phase 2: Medium (blocked on brand decisions)
- Phase 3 (Homepage): Medium-High (most animation-heavy page)
- Phase 5 (Case Studies): Medium (content-gathering is the real bottleneck, not build complexity)
- Phase 7 (Animation Pass): High (most time-intensive polish phase)
