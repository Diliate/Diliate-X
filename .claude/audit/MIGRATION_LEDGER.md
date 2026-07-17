# MIGRATION_LEDGER.md — DILIATE X

Single source of truth for what physically moves into the new repository. Cross-references the detailed reasoning in `ENGINEERING_AUDIT.md`, `COMPONENT_AUDIT.md`, `ASSET_INVENTORY.md`, `DEPENDENCY_AUDIT.md`.

## MIGRATES (ported into new repo, refactored to new tokens/architecture)

- Logo: `logo.png`, `logo.svg` (from Diliate)
- `lib/utils.ts` `cn()` helper (from Diliate-Portfolio)
- ~12 UI primitives from `components/ui/` (Spotlight, CanvasRevealEffect, MovingBorders, BentoGrid, HoverBorder, TextGenerateEffect, FloatingNavbar, GradientBg) — refactored to DILIATE tokens, not copied verbatim
- `MagicButton.tsx` interaction logic (from Diliate-Portfolio)
- SEO metadata _concept_ (per-route, structured) — reimplemented via `generateMetadata`, not the original code
- Analytics _intent_ (GA event tracking) — reimplemented for GA4, not the original packages
- Small tech-stack SVG icon set (from Diliate-Portfolio `public/`) — pending license verification per `ASSET_INVENTORY.md`

## REBUILT FRESH (no source code carried forward, concept only)

- Entire site IA/routing/pages
- Navigation and footer
- Button/form/card component styling (new token-based system)
- Hero, case study, and services page content and layout
- All scroll-driven animation (GSAP/ScrollTrigger/Lenis layer)

## ARCHIVED (kept for reference, not deleted from history, not used in V2 launch)

- Testimonial/blog card components (no content yet)
- Client logos component (no clients to display yet)
- `three-globe`/`Globe`/`GridGlobe` (no use case yet)
- `InfiniteCards`, `Pin`, `LayoutGrid` (possible future use)
- Old service-page content (agency-era, useful only as historical reference)

## DELETED (real debt, not carried in any form)

- Firebase auth + all related contexts/pages
- `react-router`, `react-bootstrap`, `react-helmet`, `react-preloaders`, `react-spinners`, `@mdbootstrap/react-testimonial-slider`
- Mixed icon libraries (Heroicons, Tabler, FontAwesome, both `react-icons` instances)
- Old fragmented font loading (Nunito/Noto Sans/Orbitron/Open Sans Condensed)
- `sass`/`.scss` files
- Old unoptimized product/illustration images (agency-era client work)

## Status Tracking

This ledger should be updated (checked off) as each item is actually executed during Phases 1–7 of `Phases.md` — it is a plan at this stage, not a completed migration.
