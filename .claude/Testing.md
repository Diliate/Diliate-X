# Testing.md — DILIATE V2

## Linting

`eslint` + `prettier` run via `lint-staged` on every commit (Husky pre-commit hook). CI (Vercel build) fails the deploy if lint/type-check fails.

## Unit Testing

Not required for a marketing site's static content, but any non-trivial utility function (`lib/`) or form validation logic should have basic unit tests (Vitest recommended if introduced later — not installed at scaffold stage, add when first non-trivial logic exists).

## Accessibility Testing

- Automated: axe DevTools / Lighthouse accessibility audit on every core page before each phase sign-off.
- Manual: full keyboard-only pass (tab through every interactive element), screen reader spot-check on the contact form.

## SEO Testing

- Validate structured data via Google's Rich Results Test.
- Confirm `sitemap.xml` and `robots.txt` render correctly on the deployed preview.
- Check metadata renders correctly when shared (OG image, title/description) via a link-preview debugger.

## Performance Testing

Lighthouse (Performance, Accessibility, Best Practices, SEO) run against the production deploy before each phase sign-off — targets defined in `PRD.md`/`SEO.md`.

## Manual QA

Full click-through of every page and interactive element after each phase, checking against the phase's completion criteria in `Phases.md`.

## Browser Compatibility

Test on latest Chrome, Safari, Firefox, and Edge, plus mobile Safari (iOS) and Chrome (Android) — real devices where possible, not just responsive resize in devtools.
