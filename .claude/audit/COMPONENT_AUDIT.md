# COMPONENT_AUDIT.md — DILIATE X

Component-by-component decisions. Legend: **KEEP** (use as-is) · **REFACTOR** (reuse logic, restyle to tokens) · **REWRITE** (concept reused, code rebuilt) · **REPLACE** (concept wrong, new approach) · **ARCHIVE** (no current use, don't delete) · **DELETE** (real debt, remove) · **MIGRATE** (port directly).

## From Diliate-Portfolio (`components/ui/`) — the high-value set

| Component                     | Decision           | Reason                                                                                                                                                                                              |
| ----------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Spotlight.tsx`               | **REFACTOR**       | Directly matches the "glow rules" in `ColorTypographySystem.md`. Restyle to DILIATE's blue/purple tokens instead of the portfolio's original colors.                                                |
| `CanvasRevealEffect.tsx`      | **REFACTOR**       | Strong candidate for hero background or case-study hover reveal — retint to brand palette.                                                                                                          |
| `MovingBorders.tsx`           | **REFACTOR**       | Maps directly to the "gradient border reserved for primary interactive element" rule in `LayoutSpacingGrid.md`.                                                                                     |
| `BentoGrid.tsx`               | **REFACTOR**       | Good fit for the Services or Features section layout — restyle glass surfaces to DILIATE's `bg-elevated`/glass tokens.                                                                              |
| `HoverBorder.tsx`             | **REFACTOR**       | Reusable for card/button hover states.                                                                                                                                                              |
| `TextGenerateEffect.tsx`      | **MIGRATE**        | Staggered text reveal — directly matches the "staggered headline reveal" hero requirement in `AnimationInteractionLanguage.md`. Minimal changes needed.                                             |
| `GridGlobe.tsx` / `Globe.tsx` | **ARCHIVE**        | Cool effect, but no clear DILIATE use case yet (personal-portfolio "location" concept doesn't map to a software company site). Revisit for an "industries served" or "global clients" visual later. |
| `Pin.tsx`                     | **ARCHIVE**        | 3D pin/hover-card effect — no immediate DILIATE use case identified; keep in back pocket for case-study gallery exploration.                                                                        |
| `FloatingNavbar.tsx`          | **REFACTOR**       | Concept (nav that reveals/hides on scroll direction, glass background) fits `LayoutSpacingGrid.md`'s glass-nav-on-scroll rule — restyle and simplify.                                               |
| `InfiniteCards.tsx`           | **ARCHIVE**        | Could work for a "technologies we use" ticker on the Technologies page (deferred, per `SiteMapSections.md`). Not launch-critical.                                                                   |
| `LayoutGrid.tsx`              | **REFERENCE ONLY** | Portfolio-specific layout; DILIATE's grid needs are defined fresh in `LayoutSpacingGrid.md`.                                                                                                        |
| `GradientBg.tsx`              | **REFACTOR**       | Matches the "animated gradient background" hero requirement — retint to brand colors.                                                                                                               |

## From Diliate-Portfolio (top-level components)

| Component            | Decision     | Reason                                                                                                                                           |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MagicButton.tsx`    | **REFACTOR** | Directly informs the "magnetic button" primary CTA in `ComponentLibrary.md` — reuse the interaction logic, restyle.                              |
| `Hero.tsx`           | **REWRITE**  | Personal-portfolio copy/structure; DILIATE's hero has different content requirements (`SiteMapSections.md`).                                     |
| `Approach.tsx`       | **REWRITE**  | "How I work" personal narrative → becomes DILIATE's "Development Process" pattern, reused conceptually in `CaseStudyTemplate.md` §10.            |
| `Experience.tsx`     | **ARCHIVE**  | Personal work-history timeline — not directly applicable, but the timeline component pattern informs `ComponentLibrary.md`'s Timeline Component. |
| `RecentProjects.tsx` | **REWRITE**  | Becomes the Case Studies index grid — structure reused, content and depth increased per `CaseStudyTemplate.md`.                                  |
| `Clients.tsx`        | **ARCHIVE**  | No client logos to display yet at V2 launch.                                                                                                     |
| `Footer.tsx`         | **REWRITE**  | New sitemap per `SiteMapSections.md`.                                                                                                            |
| `Elfsightwidget.tsx` | **DELETE**   | Third-party widget dependency (likely reviews/social embed) — not part of V2 scope.                                                              |

## From Diliate (main site)

| Component                                           | Decision     | Reason                                                                                                        |
| --------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `NewHeader`/`DropdownMenu`                          | **REWRITE**  | New nav IA, but "dropdown for services" interaction concept carries over.                                     |
| `footer`                                            | **REWRITE**  | New sitemap.                                                                                                  |
| `Button`/`custom-button` (6 variants)               | **REWRITE**  | Superseded by token-based button system in `ComponentLibrary.md`.                                             |
| `Preloader`                                         | **DELETE**   | No full-page preloader in V2 (see `ENGINEERING_AUDIT.md`).                                                    |
| `MetaTags`                                          | **REPLACE**  | Concept right, implementation replaced by `generateMetadata`.                                                 |
| `Testinomial`, `carousel`, `blog card`              | **ARCHIVE**  | No content yet — component patterns kept as reference, not built until real testimonials/blog content exists. |
| `Eventtrack` (GA/GTM event tracking)                | **REFACTOR** | Analytics-event pattern is worth keeping conceptually, rebuilt for GA4.                                       |
| `stats`, `office`, `banner`, `article`, `accordion` | **ARCHIVE**  | Content-specific to old agency pages; accordion pattern (FAQ?) may resurface for a future FAQ section.        |

## Net Result

~12 portfolio-repo UI primitives carry forward with refactoring (meaningful head start on Phase 5–7). Everything from the main site is rewritten or archived except the logo and the general "per-route SEO metadata" and "analytics event tracking" concepts, which get rebuilt properly rather than ported as-is.
