# Components.md — DILIATE V2

## Naming Conventions

PascalCase file and export names, matching. Descriptive over generic (`ServiceCard.tsx`, not `Card2.tsx`).

## Folder Structure

```
components/
  ui/            # shadcn-derived primitives: Button, Card, Input, Badge, etc.
  layout/        # Header, Footer, Nav, MobileMenu
  sections/      # HeroSection, ServicesGrid, CaseStudyPreview, ContactForm, etc.
```

## Core Reusable Components (initial list — expand as built)

| Component         | Location  | Purpose                                                             |
| ----------------- | --------- | ------------------------------------------------------------------- |
| `Button`          | ui/       | Primary interactive element, variants: primary/secondary/ghost/link |
| `Card`            | ui/       | Base surface for services/case studies                              |
| `Badge`           | ui/       | Tags (service category, tech stack labels on case studies)          |
| `Header`          | layout/   | Site nav, responsive with mobile menu                               |
| `Footer`          | layout/   | Site links, contact, social                                         |
| `HeroSection`     | sections/ | Homepage hero with animated headline                                |
| `ServicesGrid`    | sections/ | Service tiles overview                                              |
| `CaseStudyCard`   | sections/ | Preview card linking to full case study                             |
| `CaseStudyLayout` | sections/ | Template wrapper for individual case study pages                    |
| `ContactForm`     | sections/ | Server Action-backed lead capture form                              |

## Variants & Props

Every primitive uses a `variant` prop (via `class-variance-authority`, shadcn convention) rather than separate components for visual variations.

## Accessibility Requirements Per Component

- `Button`: proper `type` attribute, disabled state visually + functionally distinct.
- `ContactForm`: labeled inputs, inline error messaging tied to input via `aria-describedby`.
- `Header`/`MobileMenu`: keyboard-operable, focus trap on mobile menu when open.
