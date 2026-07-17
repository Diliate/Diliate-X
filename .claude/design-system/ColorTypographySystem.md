# ColorTypographySystem.md — DILIATE V2

> This locks the color direction given in the V2 master brief — supersedes the "TBD" status in `Brand.md`/`Design.md`. Update those files' status once this is confirmed.

## Color System

### Backgrounds (layered depth, not flat)

| Token          | Value (starting point) | Usage                                                  |
| -------------- | ---------------------- | ------------------------------------------------------ |
| `bg-void`      | `#05060A`              | Outermost page background                              |
| `bg-surface`   | `#0B0D14`              | Section backgrounds                                    |
| `bg-elevated`  | `#12141F`              | Card/panel base (before glass effect)                  |
| `bg-navy-tint` | `#0A0E1F`              | Occasional deep-navy section variant for visual rhythm |

### Accents

| Token           | Value (starting point)        | Usage                                                      |
| --------------- | ----------------------------- | ---------------------------------------------------------- |
| `accent-blue`   | `#3B82F6` → `#60A5FA`         | Primary interactive accent, links, primary CTA glow        |
| `accent-purple` | `#7C3AED` → `#A78BFA`         | Secondary accent, gradient pairing with blue               |
| `accent-cyan`   | `#22D3EE`                     | Tertiary highlight, sparingly — data viz, small UI accents |
| `glass-white`   | `rgba(255,255,255,0.06–0.12)` | Glass panel fill                                           |

### Text

| Token          | Usage                                                                |
| -------------- | -------------------------------------------------------------------- |
| `text-heading` | Bright white (`#F5F7FA`) — headings only                             |
| `text-body`    | Soft gray (`#9CA3AF`–`#C4CAD4`) — body copy                          |
| `text-accent`  | Blue/purple gradient text — reserved for key phrases, not paragraphs |

### Gradient Rules

Blue→purple gradients used for: hero headline accent words, primary CTA button backgrounds, active-state borders. Never apply a gradient to full paragraph text (readability) or to more than one element per viewport at a time (avoids visual noise).

### Glow / Light Rules

Glow is a spotlight, not ambient fog — apply as a soft radial glow behind key elements (hero visual, active card on hover), radius large enough to feel atmospheric but opacity low enough (~15–25%) that it never competes with foreground content.

## Typography System

### Type Pairing

- **Display/Headings:** A geometric, confident sans (candidates: Geist, General Sans, or Inter Display) — large scale, tight tracking, used sparingly for maximum impact.
- **Body:** Same family or a highly legible pairing at a slightly warmer weight — avoid a third typeface.
- **Mono (optional accent):** A monospace face (JetBrains Mono / Geist Mono) for technical labels, code snippets in engineering/case-study pages, stat callouts — reinforces the "engineering-led" personality.

### Scale (desktop → mobile scales down proportionally)

| Level         | Size     | Use                             |
| ------------- | -------- | ------------------------------- |
| Display       | 96–120px | Hero headline only              |
| H1            | 56–64px  | Page titles                     |
| H2            | 36–44px  | Section titles                  |
| H3            | 24–28px  | Subsection titles               |
| Body Large    | 18–20px  | Intro paragraphs                |
| Body          | 16px     | Standard copy                   |
| Caption/Label | 13–14px  | Meta info, labels, mono accents |

### Rules

- Headings always `text-heading` (bright white) — never gray.
- Body copy always the softer gray tone — pure white body text reads harsh against a near-black background and hurts sustained readability.
- Line length capped (~65–75 characters) on body copy blocks for readability.
- One `<h1>` per page, no skipped heading levels (direct fix for the old site's accessibility gap identified in the audit).
