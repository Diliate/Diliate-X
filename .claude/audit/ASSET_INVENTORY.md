# ASSET_INVENTORY.md — DILIATE X

## Diliate (main site) — 106 asset files, 15MB total

| Asset Type                  | Finding                                                                                                                                                 | Decision                                                                                                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Logo files                  | `logo.png`, `logo white.png` (duplicate of `logo.png` — not a real variant), `logo.svg`                                                                 | **MIGRATE** `logo.png` + `logo.svg`. A genuine light/dark-background variant must be newly produced (flagged in `TODO.md`).                                                                                                                                              |
| Product/illustration images | `Blue Clay Hovering Geometry Pack.png` (5.1MB), `tripguide.png` (3.3MB), `herobg.png` (912KB), `sobo.png`, `carrent.png`, `jobit.png`, various patterns | **DELETE / ARCHIVE** — agency-era portfolio images (client work under the old positioning), not applicable to V2's software-company case studies. None are optimized (all raw PNG, largest at 5.1MB — direct contributor to the performance issues in `DesignAudit.md`). |
| Fonts                       | Nunito, Noto Sans, Orbitron, Open Sans Condensed loaded across different components inconsistently                                                      | **DELETE, REPLACE** — collapse to the 2-family system in `ColorTypographySystem.md`, loaded via `next/font` (self-hosted, no runtime Google Fonts request).                                                                                                              |
| Icons                       | `@heroicons/react`, `react-icons` (mixed icon sets)                                                                                                     | **REPLACE** — V2 standardizes on Lucide (`ComponentLibrary.md`) for visual consistency; mixed icon families across a site is itself a minor design-debt signal.                                                                                                          |

## Diliate-Portfolio — 54 asset files, 71MB total

| Asset Type                                                                                | Finding                                                                                              | Decision                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tech/brand SVGs (`next.svg`, `git.svg`, `ts.svg`, `dockerName.svg`, `hostName.svg`, etc.) | Small, clean tech-stack icon set                                                                     | **MIGRATE (selective)** — useful for a "Technologies" section (deferred per `SiteMapSections.md`) or case-study tech badges (`CaseStudyTemplate.md` §9). Verify licensing/usage rights per brand before public display (some tech logos have usage guidelines). |
| 71MB total public folder                                                                  | Notably large for a portfolio site — likely includes uncompressed images/video for project showcases | **AUDIT INDIVIDUALLY BEFORE ANY MIGRATION** — do not bulk-copy; each asset needs a size/compression pass and a real V2 use case before inclusion. Default to none migrating until specifically needed.                                                          |

## New Assets Required (not present in either repo)

- Real product screenshots/recordings for all 3 case studies (WRES, MailEngine Pro, Sharma Pickle Store) — flagged in `TODO.md`. CareBridge excluded (unreleased, not for public disclosure).
- Proper white/light-background logo variant.
- Open Graph images (1200×630) for core pages, per `SEO.md`.
- Favicon set (not audited in either repo — verify existence before V2 launch).

## Governing Rule Going Forward

No asset migrates by default — everything in this table is either explicitly migrated for a stated reason or explicitly excluded. This avoids silently dragging 86MB of unused legacy assets into the new repo (a common source of repo bloat).
