# ANIMATION_AUDIT.md — DILIATE X

## Diliate (main site)

- Framer Motion is present as a dependency but GSAP appears in only 3 files — animation usage is inconsistent and likely shallow (basic fades/slides, matching the "no basic fade animations" problem flagged in the design brief).
- `react-preloaders` + `react-spinners` — full-page loading spinner pattern, dated approach.
- No evidence of scroll-driven storytelling, parallax, or cursor interaction — the site's motion is almost certainly limited to basic entrance transitions.
- **Verdict: DELETE/REWRITE.** Nothing here meets the cinematic bar defined in `AnimationInteractionLanguage.md`. Framer Motion as a library choice is validated (already proven to work in this ecosystem) but no actual animation code carries forward.

## Diliate-Portfolio

- Framer Motion + a strong set of Aceternity-derived interactive primitives (`Spotlight`, `CanvasRevealEffect`, `MovingBorders`, `TextGenerateEffect`, `HoverBorder`, `GradientBg`) — these already implement several patterns V2 needs: staggered text reveal, glow/spotlight effects, gradient borders, hover-responsive surfaces.
- R3F/Three.js/`three-globe` present and working — validates that a 3D element (per the "3D Style" section of `ComponentLibrary.md`) is technically feasible in this stack without discovering integration issues from scratch.
- No GSAP/ScrollTrigger usage found — the scroll-driven storytelling and pinned-section techniques specified in `AnimationInteractionLanguage.md` are **not** present in either repo and will be genuinely new work in Phase 6/7, not a migration.
- **Verdict: REFACTOR (high value).** This repo meaningfully de-risks the "premium micro-interaction" layer of V2 (magnetic buttons, spotlight/glow, text reveal, gradient borders) — see `COMPONENT_AUDIT.md` for the component-level breakdown. It does not de-risk the scroll-storytelling/pinning layer, which needs building fresh with GSAP + ScrollTrigger + Lenis.

## Net Animation Strategy for V2

1. Start Phase 6 (Animations) by porting/restyling the ~6 high-value portfolio primitives identified in `COMPONENT_AUDIT.md` — fastest path to a working "premium feel" baseline.
2. Build GSAP + ScrollTrigger + Lenis scroll-storytelling sequences fresh — this is the genuinely new engineering work, concentrated mainly in the Homepage hero and Case Study "Solution" sections (per `CaseStudyTemplate.md` §5).
3. Treat the old main site's animation code as non-existent for planning purposes — budget Phase 6/7 effort as if starting from the portfolio repo's baseline, not from zero, but not assuming anything beyond that baseline either.
