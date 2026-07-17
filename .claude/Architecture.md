# Architecture.md — DILIATE V2

## Overall System Architecture

Next.js 14 App Router, hybrid rendering: static generation for marketing pages, server components for data-driven sections, Server Actions for the contact form mutation. Deployed on Vercel with GitHub CI (deploy previews on PR, production deploy on merge to `main`).

## Folder Structure

```
src/
  app/                # App Router routes
    (marketing)/
      page.tsx         # Home
      services/
      case-studies/
        [slug]/
      about/
      contact/
    layout.tsx
    sitemap.ts
    robots.ts
  components/
    ui/                # shadcn primitives, generic building blocks
    sections/          # page-specific composed sections
    layout/            # header, footer, nav
  content/             # MDX case studies / structured content
  lib/                 # utilities, helpers
  hooks/               # custom React hooks
  types/               # shared TypeScript types
  styles/              # global.css, tailwind base
  animations/          # reusable GSAP timelines, Motion variants
public/
  fonts/
  images/
.claude/               # this documentation set
```

## Component Structure

Presentational primitives (`ui/`) are prop-driven and style-agnostic beyond the design system. Section components (`sections/`) compose primitives with real content and animation logic. Pages compose sections — pages themselves stay thin.

## Routing Strategy

File-based App Router. Route groups (`(marketing)`) keep the marketing site isolated from any future authenticated area without affecting URL structure.

## State Management

No global state library needed for a marketing site. Local component state (`useState`/`useReducer`) is sufficient. If a client portal is added later, revisit (likely Zustand, matching prior product patterns).

## Animation Architecture

- GSAP + ScrollTrigger for scroll-driven sequences (hero reveal, pinned sections).
- Motion (Framer Motion) for component transitions, hover states, page transitions.
- Lenis for smooth-scroll only, initialized once at root layout.
- All animation presets centralized in `src/animations/` — components import presets, not define ad hoc easing/duration values inline.

## Rendering Strategy

Static generation (`generateStaticParams`) for case study pages since content changes infrequently. **Next.js 16 note:** `params` and `searchParams` in page/layout/route components are Promises, not plain objects — every dynamic route (e.g. `case-studies/[slug]/page.tsx`) must `await params` before reading values. This is a hard requirement, not optional — synchronous access was fully removed in v16 (it was only deprecated-but-working in v15). Run `npx next typegen` to get generated types that catch this at compile time.

## SEO Strategy

Per-page `generateMetadata`, dynamic OG image generation for case studies, JSON-LD structured data for Organization + Service + Article (case studies) — see `SEO.md`. `generateMetadata` also receives Promise-based `params` under v16 — same `await` requirement applies.

## Performance Strategy

- `next/image` with explicit sizes, priority only on above-the-fold hero image.
- Code-split heavy client components (3D scenes) via `next/dynamic` with `ssr: false`.
- Font subsetting via `next/font`.

## Image Strategy

All images through `next/image`. Source images optimized/compressed before adding to `public/images`. Case study screenshots stored at consistent aspect ratios for layout stability.

## Caching Strategy

**Updated for Next.js 16:** caching is now opt-in via Cache Components and the `"use cache"` directive, rather than implicit as in v14 — all dynamic code executes at request time by default unless explicitly marked cacheable. Static marketing pages should use `"use cache"` at the page or component level where content is stable (case study content, service pages). `cacheLife`/`cacheTag` are stable APIs (no `unstable_` prefix needed) for fine-grained cache control if content freshness requirements emerge later. Revalidate on-demand if content management moves to a headless CMS.

## API Structure

Minimal — Server Actions handle the contact form. If a third-party webhook integration is added later, it goes in `src/app/api/[name]/route.ts`.

## Utility Structure

`src/lib/` — pure functions, no React. Grouped by domain (`lib/seo.ts`, `lib/validation.ts`, etc.) rather than one catch-all `utils.ts`.

## Hooks

`src/hooks/` — e.g. `useScrollProgress`, `useReducedMotion` wrapper, `useInView`.

## Types

`src/types/` — shared interfaces (`CaseStudy`, `Service`, `ContactFormData`). Component-local types stay colocated with the component.

## Folder Responsibilities

See table above — each folder has exactly one job; no cross-cutting dumping ground.

## Deployment Flow

1. Push to feature branch → Vercel deploy preview generated automatically.
2. Review preview, merge to `main` → production deploy.
3. Environment variables managed in Vercel dashboard (see `Deployment.md`).
