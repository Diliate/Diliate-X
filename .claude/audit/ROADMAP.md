# ROADMAP.md — DILIATE X

> Maps directly onto `Phases.md`, updated with what the audit changes about effort/risk per phase. Read `Phases.md` for full objectives/dependencies/completion criteria per phase — this file adds the audit-informed effort/risk view.

| Phase              | Effort (pre-audit estimate) | Effort (post-audit, revised) | Why it changed                                                                                                               |
| ------------------ | --------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1 — Setup          | Low                         | Low                          | Unchanged                                                                                                                    |
| 2 — Design System  | Medium                      | Medium                       | Unchanged — color/theme now locked (`ColorTypographySystem.md`), reduces ambiguity                                           |
| 3 — Homepage       | Medium-High                 | Medium                       | Reduced — `TextGenerateEffect`, `Spotlight`, `GradientBg` primitives migrate in, cutting hero-build time                     |
| 4 — Services       | Medium                      | Medium                       | Unchanged                                                                                                                    |
| 5 — Case Studies   | Medium                      | Medium-High                  | Increased — content-gathering (real screenshots, permissions) is the actual bottleneck, not code, confirmed by `TODO.md`     |
| 6 — About/Contact  | Low-Medium                  | Low-Medium                   | Unchanged                                                                                                                    |
| 7 — Animation Pass | High                        | Medium-High                  | Reduced — ~12 primitives already validated working (`COMPONENT_AUDIT.md`), but GSAP scroll-storytelling is still fresh build |
| 8 — SEO Pass       | Medium                      | Medium-High                  | Increased — migration adds a redirect-map requirement not present in a greenfield build (`SEO_AUDIT.md`)                     |
| 9 — Testing & QA   | Medium                      | Medium                       | Unchanged                                                                                                                    |
| 10 — Deployment    | Low-Medium                  | Medium                       | Increased — domain cutover from a live, indexed site is riskier than a fresh domain launch (`MIGRATION_PLAN.md`)             |

## Net Assessment

The audit reduces build risk overall (proven-working component foundation from the portfolio repo) but increases migration-specific risk (SEO/redirect handling, content-gathering for case studies) compared to treating this as a pure greenfield project. Total effort is roughly a wash — the time saved on UI-primitive development is spent instead on migration care.

## Sequencing Recommendation

Content-gathering for case studies (`TODO.md`) is the longest lead-time item and doesn't block Phases 1–4 — start that in parallel with Phase 1/2, not after Phase 4 completes, to avoid it becoming the critical-path bottleneck it's flagged as in `Phases.md`.
