# Animation.md — DILIATE V2 Animation Standards

## Tooling Split

- **GSAP + ScrollTrigger** — scroll-driven sequences: pinned sections, staggered reveals tied to scroll position, hero timelines.
- **Motion (Framer Motion)** — component-level transitions: hover states, page transitions, mount/unmount animations, layout animations.
- **Lenis** — smooth scroll only, initialized once in root layout, never re-initialized per page.
- Don't mix scroll-trigger logic between GSAP and Motion's `whileInView` on the same section — pick one per section to avoid conflicting scroll listeners.

## Scroll Animations

Staggered reveal on entry (translateY + opacity + slight scale, not opacity alone), triggered once per element (no re-trigger on scroll-up unless intentional for a specific effect).

## Hover Animations

Subtle, fast (150–250ms), consistent easing across all interactive elements (buttons, cards, links) — defined once in `src/animations/hover.ts`.

## Loading Animations

Skeleton states for any content that loads client-side. No generic spinners on the marketing site — everything above the fold should be server-rendered and not need a loading state.

## Cursor Interactions

Optional custom cursor for desktop only (disabled on touch devices), used sparingly — e.g., on the hero or case study gallery, not globally.

## Page Transitions

Subtle cross-fade + slight movement between routes via Motion's `AnimatePresence`, kept under 400ms to avoid feeling sluggish.

## Hero Animations

Primary hero gets the most elaborate treatment — staggered text reveal, possibly a GSAP timeline synced with a visual element (3D scene or illustration).

## Parallax

Used sparingly (hero background, section transitions) — never on text content (hurts readability and accessibility).

## Reveal Animations

Standard preset: `{ opacity: 0, y: 24 }` → `{ opacity: 1, y: 0 }`, duration 0.6s, ease `[0.16, 1, 0.3, 1]` (expo-out). This is the baseline "premium" feel — avoid linear/ease-in-out defaults which read as generic.

## Performance Optimizations

- Animate `transform`/`opacity` only — never animate `width`/`height`/`top`/`left` directly.
- `will-change` used sparingly, removed after animation completes.
- Heavy GSAP timelines and R3F scenes lazy-loaded via `next/dynamic`.

## Accessibility — Reduced Motion

Every animation preset checks `prefers-reduced-motion` via a shared `useReducedMotion` hook. Reduced-motion users get instant state changes or minimal opacity-only transitions — never full parallax/3D/large-movement animations.

## Reusable Animation Presets

Centralized in `src/animations/`:

- `presets.ts` — reveal, stagger, hover variants for Motion.
- `scroll-triggers.ts` — reusable GSAP ScrollTrigger configs.
- `easing.ts` — shared easing curves so nothing is defined ad hoc inline.
