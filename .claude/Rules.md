# Rules.md — Permanent AI Rules for DILIATE V2

These rules apply to every AI-assisted change to this repo, no exceptions unless explicitly overridden by the project owner in a given session.

1. Never use deprecated packages — verify current stable versions before installing anything.
2. Never duplicate components — extend existing ones with props/variants instead.
3. Always use reusable code — if a pattern appears twice, extract it.
4. Always optimize for performance — no unnecessary re-renders, no unoptimized images/fonts.
5. Never hardcode colors — use design tokens from `Design.md` / Tailwind theme.
6. Always use semantic HTML.
7. Always optimize for accessibility (keyboard nav, contrast, reduced motion, ARIA where semantic HTML isn't enough).
8. Always optimize for SEO — metadata, structured data, sitemap entries for every new page.
9. Never generate poor/basic animations — no plain opacity-only fades as the primary effect; follow `Animation.md` presets.
10. Always explain package installations before running them — what it does, why it's needed, what the alternatives were.
11. Always ask before destructive changes — deleting files, overwriting configs, rewriting git history.
12. Always create scalable code — assume more pages/case studies/services will be added later.
13. Never generate UI, pages, or components until explicitly instructed to move past the setup/documentation phase.
14. Always update `Memory.md` at the end of a significant session.
15. Always follow the folder structure in `Architecture.md`; propose changes there before deviating.
