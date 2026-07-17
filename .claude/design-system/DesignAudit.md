# DesignAudit.md — Old Diliate Repos Audit

Audit performed against `github.com/Diliate/Diliate` (main site) and `github.com/Diliate/Diliate-Portfolio` (personal portfolio, Next.js/TS/Tailwind stack). Used only to inform V2 decisions — nothing copied.

## Strengths

- Existing SEO scaffolding present (meta tags component, sitemap, robots.txt) — shows prior SEO awareness to build on.
- Confirmed live domain: `diliate.com`.
- Portfolio repo already uses a modern stack (Next.js/TS/Tailwind) with some solid interaction patterns worth referencing conceptually (magnetic button, grid layouts).

## Weaknesses / IA Issues

- Old site conflated a digital-marketing-agency service set with unrelated auth/booking flows — no single clear narrative. V2 must stay strictly focused on "software development company."

## UX / Typography Issues

- Homepage heading hierarchy skips a level (H2 → H4, no H3) — weakens both scannability and SEO structure.

## Accessibility Issues

- 11 of 31 `<img>` tags site-wide have no `alt` attribute — meaningful accessibility and image-SEO gap.

## Performance Issues

- Multiple unoptimized source images in the 700KB–5.1MB range served without responsive/compressed delivery — direct LCP risk. V2's `next/image` pipeline (per `Architecture.md`) resolves this by default.

## Code Quality Issues

- 44 inline `style={{}}` instances — inconsistent, untokenized styling. V2's token-only rule (`CLAUDE.md`) prevents this by policy.

## SEO Issues

- Metadata hardcoded in a single JS lookup object rather than generated per-route — doesn't scale and is easy to forget on new pages.

## Conversion / Content Issues

- No real case-study depth — flat service list only. This is the single largest opportunity for V2: cinematic, honest case studies built from real shipped products are a genuine differentiator competitors don't have.

## How V2 Addresses Each Finding

Every issue above is already resolved structurally by decisions already locked in `Architecture.md`, `CLAUDE.md`, `SEO.md`, and this design-system folder — no separate remediation plan needed, just adherence to what's already specified.
