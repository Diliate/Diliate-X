# LayoutSpacingGrid.md — DILIATE V2

## Grid System

12-column grid, desktop max content width ~1440px with generous outer gutters (120px+ at large desktop) — content never spans edge-to-edge except full-bleed hero visuals/backgrounds. Mobile: 4-column grid, 16–24px gutters.

## Spacing System

4px base unit. Section vertical rhythm intentionally large (`120–160px` between major sections on desktop) to reinforce the "cinematic, one idea at a time" feel — this is a deliberate departure from a dense agency-site layout.

## Layout Principles

- One dominant focal point per viewport/scroll-section.
- Asymmetric layouts preferred over centered-everything — creates visual interest without clutter (e.g., large headline left, floating visual right, offset rather than perfectly mirrored).
- Full-bleed sections alternate with contained-width sections to create rhythm as the user scrolls.

## Responsive Strategy

Mobile-first breakpoints (375 / 768 / 1024 / 1440 / 1920). Cinematic desktop effects (parallax, cursor interactions, complex glass layering) gracefully degrade on mobile to simpler, performant equivalents — mobile gets clean staggered reveals instead of full parallax/3D.

## Glassmorphism Rules

- Glass panels: `background: rgba(255,255,255,0.06–0.12)`, `backdrop-filter: blur(20–40px)`, 1px border at `rgba(255,255,255,0.1)`.
- Use glass for: cards, nav bar (on scroll), modals, floating UI elements.
- Don't use glass for: full-page backgrounds, body text containers (hurts contrast/readability), more than 2 layered glass surfaces stacked (visual mud).

## Shadow System

Layered, soft shadows implying elevation, always paired with the glow rules from `ColorTypographySystem.md` for interactive elements:

- `shadow-sm`: subtle card resting state
- `shadow-md`: hover/active state
- `shadow-glow`: colored glow (blue/purple) reserved for primary CTAs and the active/focused element only

## Border System

1px hairline borders at low-opacity white (`rgba(255,255,255,0.08–0.12)`) as the default — borders are structural, not decorative. Gradient borders (blue→purple) reserved for the single most important interactive element in a given section (primary CTA, active nav item).

## Border Radius

Consistent scale: `8px` small elements (badges, inputs), `16px` cards, `24px` large surfaces/modals. No arbitrary radius values outside this scale.
