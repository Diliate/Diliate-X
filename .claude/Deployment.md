# Deployment.md — DILIATE V2

## Git

- Repo: `https://github.com/Diliate/Diliate-X.git` (new repo, replacing old `Diliate` repo for this rebuild).
- Branch strategy: `main` is production. Feature work can happen directly on `main` for solo development, but keep commits atomic; move to feature branches + PRs once collaborators join.
- Conventional commit messages (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).

## GitHub

```bash
git init
git branch -M main
git remote add origin https://github.com/Diliate/Diliate-X.git
git add .
git commit -m "chore: initial project scaffold + documentation"
git push -u origin main
```

## Vercel

- New Vercel project imported from `Diliate-X` repo (kept separate from the old `Diliate` project until V2 is ready — see rationale in project chat history).
- Framework preset: Next.js (auto-detected).
- Production domain cutover happens only after Phase 9 (Testing & QA) sign-off.

## Environment Variables

None required at initial scaffold stage. Add here as introduced (e.g., contact form email provider API key, analytics IDs):

| Variable     | Purpose | Environment |
| ------------ | ------- | ----------- |
| _(none yet)_ |         |             |

## Production Checklist

- [ ] All Lighthouse targets met (`Testing.md`)
- [ ] No placeholder content
- [ ] Sitemap/robots verified
- [ ] OG images render correctly when shared
- [ ] Contact form tested end-to-end in production
- [ ] Analytics installed and verified firing

## Deployment Checklist (per release)

- [ ] `npm run build` succeeds locally
- [ ] Lint/type-check clean
- [ ] Preview deploy reviewed on actual devices (not just desktop browser resize)
- [ ] `Memory.md` updated with session summary
