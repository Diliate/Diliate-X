# Design.md — DILIATE V2 Design System

> Status: logo locked (see `Brand.md`). Color, typography, spacing, and component direction are now locked via the `design-system/` artifact set (`ColorTypographySystem.md`, `LayoutSpacingGrid.md`, `ComponentLibrary.md`, `AnimationInteractionLanguage.md`) — read those as the authoritative source. This file remains as a quick-reference summary; update it to mirror those artifacts before Phase 2 implementation begins.

## Typography

- Display/headings: a confident, modern sans (candidates: Geist, Inter Display, or a licensed alternative) via `next/font`.
- Body: same family or a highly legible pairing — avoid more than 2 font families total.
- Scale: modular scale (1.25 ratio) from `text-sm` to a large hero size (`text-7xl`+ on desktop, scaled down responsively).

## Spacing

4px base unit, Tailwind default scale extended only if a specific gap is needed repeatedly — don't add one-off values.

## Grid

12-column grid on desktop, 4-column on mobile, max content width ~1440px with generous outer margins (echoing Linear/Vercel's breathing room).

## Layout

Section-based vertical rhythm — consistent top/bottom padding per section (`py-24` desktop / `py-16` mobile as baseline).

## Colors

Placeholder token structure (values TBD with brand):

- `background` / `background-subtle`
- `foreground` / `foreground-muted`
- `accent` (primary brand color — DILIATE's signature)
- `accent-foreground`
- `border`
- `success` / `warning` / `danger`

No raw hex in components — always reference these tokens via Tailwind theme config.

## Dark Theme / Light Theme

Dark-first design (matches the enterprise-SaaS aesthetic of the reference companies), with a fully-supported light theme via `next-themes`. Both themes use the same token names, different values.

## Border Radius

Consistent scale: `sm` (buttons/inputs), `md` (cards), `lg` (modals/large surfaces). No mixing arbitrary radius values.

## Buttons

Primary, secondary, ghost, and link variants via shadcn `Button` — consistent height scale (`sm`/`default`/`lg`).

## Forms

Consistent input styling, clear focus states, inline validation messaging, accessible labels (no placeholder-as-label anti-pattern).

## Cards

Used for service tiles and case study previews — consistent padding, hover elevation change, optional image treatment.

## Shadows / Elevation

Subtle, layered shadows (avoid harsh drop-shadows) — elevation implies interactivity/hierarchy, not decoration.

## Icons

Lucide icons exclusively, consistent stroke width across the site.

## Responsive Rules

Mobile-first Tailwind breakpoints. Test at 375px, 768px, 1024px, 1440px minimum.

## Accessibility

Contrast checked against both themes. Focus rings visible and consistent. Never rely on color alone to convey state.

## Visual Hierarchy

One dominant element per section (headline, key visual, or CTA) — avoid competing focal points.

## Brand Personality

Confident, precise, technical-but-approachable — the visual equivalent of "we build things that actually work," not flashy-for-its-own-sake.
