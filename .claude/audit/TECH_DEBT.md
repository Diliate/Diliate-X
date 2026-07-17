# TECH_DEBT.md — DILIATE X

Consolidated debt findings from all audits above — this is the "why we're not just refactoring the old repo" reference.

| Debt Item                                                                                                    | Source    | Severity                                  | V2 Resolution                                      |
| ------------------------------------------------------------------------------------------------------------ | --------- | ----------------------------------------- | -------------------------------------------------- |
| Mixed IA (agency services + auth/booking flows)                                                              | Main site | High                                      | Full IA rebuild (`SiteMapSections.md`)             |
| No SSR / client-only SEO metadata                                                                            | Main site | High                                      | Next.js `generateMetadata` (`SEO.md`)              |
| 4 inconsistent font families, per-component overrides                                                        | Main site | Medium                                    | 2-family token system (`ColorTypographySystem.md`) |
| Unoptimized images (up to 5.1MB single files)                                                                | Main site | High                                      | `next/image` pipeline (`Architecture.md`)          |
| 44 inline `style={{}}` instances                                                                             | Main site | Medium                                    | Token-only styling rule (`CLAUDE.md`)              |
| Missing `alt` text on 11/31 images                                                                           | Main site | Medium (a11y + SEO)                       | Hard rule enforced in `CLAUDE.md`/`Testing.md`     |
| Mixed icon libraries (Heroicons + react-icons on main site; Tabler + FontAwesome + react-icons on portfolio) | Both      | Low-Medium                                | Standardize on Lucide (`DEPENDENCY_AUDIT.md`)      |
| Firebase auth present with no clear ongoing need                                                             | Main site | Medium (security surface)                 | Deleted — no auth in V2 scope                      |
| GA/GTM via older React wrapper packages                                                                      | Main site | Low                                       | Migrate to native GA4 integration                  |
| No structured data (JSON-LD) anywhere                                                                        | Both      | Medium (SEO)                              | Added per `SEO.md`                                 |
| No scroll-storytelling/GSAP animation architecture                                                           | Both      | N/A (gap, not debt)                       | New build, not a fix — see `ANIMATION_AUDIT.md`    |
| Portfolio repo's 71MB `public/` folder, largely unaudited                                                    | Portfolio | Low (repo bloat risk if copied wholesale) | Nothing migrates by default (`ASSET_INVENTORY.md`) |

## Debt NOT worth fixing in place

Every item above is resolved by not carrying the old code forward, rather than by patching it — this is why `ENGINEERING_AUDIT.md` recommends a new repository instead of an in-place refactor. The main site's architecture (Vite/React SPA, client-rendered SEO, Bootstrap-adjacent styling) is fundamentally mismatched with V2's requirements (SSR/SEO-critical, token-based design system, cinematic animation), not just outdated in details — patch-level fixes wouldn't close that gap.
