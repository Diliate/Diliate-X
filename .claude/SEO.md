# SEO.md — DILIATE V2

## Metadata

Every route exports `generateMetadata` — unique title (≤60 chars), description (≤160 chars), canonical URL. Title pattern: `{Page Name} | DILIATE`.

## Structured Data / Schema

JSON-LD via `<script type="application/ld+json">` in layout/page:

- `Organization` schema on the homepage (name, logo, sameAs social links).
- `Service` schema on each services page.
- `Article`/`CreativeWork` schema on each case study.
- `BreadcrumbList` on nested pages.

## Robots

`src/app/robots.ts` — allow all except any future authenticated routes; points to sitemap.

## Sitemap

`src/app/sitemap.ts` — dynamically generated, includes all static routes + case study slugs pulled from content source.

## Performance / Core Web Vitals

LCP < 2.5s, CLS < 0.1, INP < 200ms — enforced via the performance rules in `CLAUDE.md` (image/font optimization, transform-only animation).

## Open Graph

Custom OG image per page (static for core pages, dynamically generated per case study via `next/og` if time allows) — 1200×630, includes DILIATE branding + page title.

## Twitter Cards

`summary_large_image` card type, reusing OG image and description.

## Canonical URLs

Set explicitly on every page to avoid duplicate-content issues from trailing slashes/query params.

## Internal Linking

Every case study links back to its relevant service page; every service page links to relevant case studies — reinforces topical relevance and keeps users exploring.

## Blog SEO

Out of scope for V2 (see `PRD.md`), but folder structure (`content/` + MDX) is being set up now so a blog can be added later without restructuring.

## Target Keyword Themes (to refine with real keyword research — see TODO.md)

- "custom software development [Dubai/UAE/global]"
- "SaaS development agency"
- "real estate CRM development"
- "healthcare platform development"
- "AI application development company"
