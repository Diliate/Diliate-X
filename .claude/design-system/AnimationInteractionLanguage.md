# AnimationInteractionLanguage.md — DILIATE V2

> Extends `Animation.md` (tooling/technical rules stay as defined there) with the cinematic direction from the V2 design brief. Read both together.

## Motion Philosophy

Every interaction is intentional — motion always communicates something (state change, hierarchy, causality), never decoration for its own sake. No default/basic opacity-only fades as a primary effect anywhere on the site.

## Interaction Patterns

- **Cursor interactions:** Custom cursor on desktop (default → pointer-aware states near interactive elements), disabled on touch devices. Used on the homepage hero and case-study galleries — not global, to avoid fatigue.
- **Magnetic buttons:** Primary CTAs subtly follow cursor proximity within a capped radius (see `ComponentLibrary.md`).
- **Mouse parallax:** Background elements (glow orbs, floating geometric shapes) shift subtly with mouse position on the hero — capped movement range, never causes layout shift or motion sickness-inducing speed.
- **Glass reflections:** Subtle light-catching highlight on glass cards that shifts slightly on hover/mouse movement — reinforces the "physical glass surface" feeling without being gimmicky.

## Scroll-Driven Storytelling

Each homepage/case-study section reveals progressively as the user scrolls — staggered element entry (not simultaneous), pinned sections where a single visual evolves across a scroll range (e.g., a product screenshot that assembles piece by piece as you scroll through the "Solution" section of a case study).

## Animated Gradients & Dynamic Lighting

Hero background gradient shifts slowly and continuously (very subtle, ambient — not attention-grabbing), reinforcing the "premium keynote" feel. Dynamic lighting: glow intensity on interactive elements responds to hover/focus state, never runs as a constant flashy loop.

## Premium Page Transitions

Cross-fade + subtle scale/movement between routes (Motion `AnimatePresence`), under 400ms — fast enough to not feel sluggish, deliberate enough to not feel like a hard cut.

## Performance & Accessibility Guardrails (non-negotiable)

- Target 60fps for all animation — transform/opacity only, GPU-accelerated properties.
- Full `prefers-reduced-motion` fallback path: parallax/3D/magnetic effects disabled, replaced with simple instant or minimal-opacity transitions.
- Heavy effects (3D scenes, complex GSAP timelines) lazy-loaded and gated behind a performance check where feasible (e.g., skip 3D hero background on low-end/mobile devices, use a static gradient instead).
- No animation blocks interaction — users can click through/skip intro sequences at any time.
