# MIGRATION_PLAN.md — DILIATE X

## GitHub Strategy — Recommendation

**Create a genuinely new repository** (`Diliate-X` or `Diliate-X`, per your naming preference) rather than force-pushing over or branching from either legacy repo. Reasoning:

- The audit found almost nothing in the main site worth a shared git history (`ENGINEERING_AUDIT.md`) — a fresh history is cleaner than a history full of commits for deleted code.
- The portfolio repo's valuable components (`COMPONENT_AUDIT.md`) are being refactored, not copied verbatim — their original commit history doesn't map meaningfully onto the new repo's commits anyway.

**Should the current repos be archived?** Yes — once V2 is live and stable (post-Phase 10), set both `Diliate` and `Diliate-Portfolio` to **Archived** on GitHub (Settings → Archive repository). This preserves them read-only for historical reference (exactly what this audit needed them for) without them appearing as active/maintained projects. Don't delete them — they're a useful paper trail and the source for several migrated assets.

**Should Git history be preserved?** Not necessary to merge into the new repo's history. If you want specific historical context preserved beyond the archived repos themselves, this `audit/` folder _is_ that record — it documents what existed and why decisions were made, which is more useful than raw commit history for future reference.

**Should releases be tagged?** Yes, going forward in the new repo — tag `v1.0.0` at the actual production launch (end of Phase 10), then follow semantic versioning for meaningful updates (new major sections = minor version bump, content-only updates don't need a tag).

**Branch strategy:** `main` as production for now (solo development, per `CLAUDE.md`'s existing Git Rules). Once/if collaborators join, move to `main` + feature branches + PRs with required Vercel preview review before merge.

## Vercel & Domain Strategy — Recommendation

### 1. Connect the new repo to a new Vercel project

Import `Diliate-X`/`Diliate-X` as a **brand-new Vercel project** — do not touch the existing `Diliate` project's settings yet. This keeps the live site at `diliate.com` completely unaffected while V2 is built and reviewed. (This matches the recommendation already given earlier in this project's chat history.)

### 2. Test on the Vercel preview domain

Every push to `main` (or PRs, once applicable) auto-generates a preview URL (`diliate-x-<hash>.vercel.app`). Do the full Phase 9 (Testing & QA) pass against this preview domain — Lighthouse, accessibility, cross-browser, manual QA — entirely before touching the live domain.

### 3. Migrate `diliate.com` with minimal downtime

Once V2 passes QA on its preview domain:

1. In the **new** Vercel project → Settings → Domains → add `diliate.com` and `www.diliate.com`.
2. Vercel will show DNS instructions (or, if the domain's nameservers are already pointed at Vercel, this can be closer to instant) — update the A/CNAME records at your domain registrar to point to the new project.
3. DNS propagation is typically minutes to a few hours (rarely up to 48h depending on TTL) — this is the only unavoidable "downtime-risk" window, and it's typically seamless since Vercel serves the new deployment the moment DNS resolves, with no gap where the domain points nowhere.
4. Once confirmed live and stable, remove the domain from the **old** `Diliate` Vercel project (Settings → Domains → Remove) to avoid any conflict.

### 4. Preserve SEO during migration

Execute the redirect map from `SEO_AUDIT.md` **before or simultaneously with** the DNS cutover — old URLs should 301 to their new-IA equivalents from the moment the new deployment goes live on the domain, not added after the fact. Implement via `next.config.js`'s `redirects()` function or a `middleware.ts` redirect map, whichever the final URL-mapping complexity favors.

### 5. Redirect changed URLs

Every URL identified in the `SEO_AUDIT.md` inventory step gets an explicit 301 entry. No wildcard "redirect everything to homepage" — that forfeits page-specific ranking signals Google has already built up for those URLs.

### 6. When the old deployment can safely be retired

Not immediately at cutover. Recommended sequence:

- **Week 0 (cutover):** DNS points to new deployment, redirects live, old Vercel project's domain removed but project itself left running (not deleted) at its `.vercel.app` URL as a fallback reference.
- **Weeks 1–6:** Monitor Search Console for crawl errors, ranking volatility, and 404s (per `SEO_AUDIT.md`). Keep the old project accessible internally in case a redirect gap is discovered and needs a quick reference to the old content.
- **After 6 weeks of stable metrics:** Safe to fully retire/delete the old Vercel project. Archive the old GitHub repos at this point too (see above), not before.

## Stop Condition Acknowledgment

Nothing in this plan has been executed — no repo created, no domain touched, no DNS changed. This is the plan awaiting your explicit approval before any implementation step begins, per the brief's stop condition.
