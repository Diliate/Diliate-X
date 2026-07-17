# ComponentLibrary.md — DILIATE V2

Each component below: **Purpose → Variants → Notes** (accessibility/performance called out where relevant). Full prop-level specs get written at implementation time in `Components.md`; this defines the _design_ intent.

## Buttons

- **Variants:** Primary (gradient glow, magnetic hover), Secondary (glass, subtle border), Ghost (text + icon), Icon-only.
- **Magnetic hover:** cursor proximity subtly pulls the button toward it (small offset, capped distance) — desktop only, disabled on touch and under reduced-motion.

## Cards

- **Variants:** Service card (icon + title + short copy), Case-study preview card (image + title + tags, hover reveals more), Stat card (large number + label), Feature card (icon + heading + description).
- All cards use the glass system from `LayoutSpacingGrid.md`, hover state lifts elevation + subtle glow.

## Forms

- **Variants:** Contact form (multi-field), Newsletter/inline capture (single field + button).
- Glass input fields, clear focus ring (accent-blue), inline validation messaging below field, never color-only error indication (icon + text always paired).

## Loading / Skeleton / Empty / Error / Success States

- **Skeleton:** shimmer effect using a subtle gradient sweep, matches the shape of the content it's replacing (not generic gray boxes).
- **Empty state:** icon + short message + action (e.g., "No case studies yet" during early build — shouldn't occur in production but needed for CMS-driven sections later).
- **Error state:** clear message, no technical jargon exposed to the user, retry action where applicable.
- **Success state:** confirmation with subtle celebratory motion (e.g., contact form submit) — restrained, not confetti-tier.

## Charts / Statistics Components

Used sparingly (e.g., "50+ features shipped," "3 industries served") — animated count-up on scroll-into-view, mono typeface for the numeral (reinforces technical credibility), respects reduced-motion (numbers appear instantly instead of counting).

## Pricing Components

Not in V2 scope per `PRD.md` (pricing is "contact us" for now) — component reserved for future use if pricing tiers are introduced.

## Timeline Components

Used in case studies for "Development Process" — vertical or horizontal scroll-linked timeline, each milestone reveals on scroll.

## Project Showcase Components

Case-study preview grid on the Case Studies index page — large imagery, minimal text, hover reveals project name + one-line description. Full depth lives on the project detail page (see `CaseStudyTemplate.md`).

## Testimonials

Deferred until real testimonials exist (flagged in `TODO.md`) — component structure: quote, name, role/company, optional photo, glass card.

## Blog Cards

Deferred (blog is out of V2 scope per `PRD.md`) — structure reserved: image, title, excerpt, date, read-time.

## Hero Variations

- **Homepage hero:** Full cinematic treatment — staggered headline reveal, floating/parallax visual element, subtle ambient motion (not full 3D unless performance budget allows).
- **Service/Case-study page hero:** Simpler — large title + one-line description + breadcrumb, no full cinematic sequence (reserves that impact for the homepage and project detail pages).

## CTA Variations

- **Primary CTA (homepage/footer):** Large, gradient-glow button, often paired with a short supporting line.
- **Inline CTA (end of case study/service page):** Contained-width card with a focused single action ("Start a project").

## Iconography

Lucide icons as the base set, potentially with a small number of custom icons for DILIATE-specific concepts (the service categories) drawn in the same stroke-width/style as Lucide for consistency — not a mixed icon language.

## Illustration Style

Minimal — avoid stock illustration entirely (matches "not a template" direction). Where illustration is needed (e.g., an abstract concept in an empty state), use simple geometric/line-based forms consistent with the glass/glow visual language, not flat cartoon illustration.

## 3D Style

Where R3F/Three.js is used (candidate: homepage hero background element), keep it abstract — floating geometric forms, particle fields, or an abstract representation of "connection/network" (fits a software company) rather than literal 3D product renders. Performance-gated: lazy-loaded, disabled on low-end devices/reduced-motion, static image fallback.
