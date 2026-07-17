# SEO_AUDIT.md — DILIATE X

> Builds on the SEO findings already in `DesignAudit.md`; this report goes deeper and adds the migration-specific concerns (redirects, ranking preservation) that a domain cutover requires.

## Current State (Diliate main site)

- Per-route metadata exists but is implemented as a single hardcoded JS lookup object (`MetaTags.jsx`) — doesn't scale, easy to miss on new pages, and isn't SSR-rendered (client-side `react-helmet` injection is weaker for crawlers than true server-rendered metadata).
- No structured data (JSON-LD) found in either repo — a clear gap; V2 adds `Organization`, `Service`, `Article`, and `BreadcrumbList` schema per `design-system` and `SEO.md`.
- Domain confirmed live: `diliate.com` — has existing indexed pages, backlinks, and ranking history that must be protected during migration.
- No sitemap/robots content reviewed in depth yet — verify both files' current state on the live site before migration (not just the repo — the deployed version may differ from repo source).

## Ranking-Preservation Risk Assessment

Since V2 changes the entire information architecture (agency service URLs like `/Services/social-media-marketing` don't exist in the new software-company IA), this migration carries real SEO risk if handled carelessly — old indexed URLs going to 404 loses any accumulated authority those pages had.

## Required Actions for the Migration (see `MIGRATION_PLAN.md` for execution detail)

1. **Full URL inventory** of every currently-indexed page (Google Search Console + a crawl of the live site) before cutover — not just what's in the repo.
2. **301 redirect map** from every old URL to its closest new-IA equivalent (e.g., old `/Services/website-development` → new `/services/custom-software` or similar) — never a blanket redirect-everything-to-homepage, which forfeits page-level ranking signals.
3. **Preserve `diliate.com` as the canonical domain** — no domain change, only content/IA change, which meaningfully reduces migration risk compared to also changing domains.
4. **Re-submit updated sitemap** to Search Console immediately after cutover.
5. **Monitor Search Console** for crawl errors and ranking drops for 4–6 weeks post-launch — expect some temporary volatility even with a clean migration; this is normal and shouldn't trigger panic-reverting.

## New SEO Foundation for V2

Already specified in `SEO.md` (metadata, structured data, sitemap, OG images) — this audit's job was confirming what's being _lost_ in migration (nothing structurally valuable — the old implementation was thin) and what must be _carried carefully_ (the URLs' accumulated authority via redirects, not code).
