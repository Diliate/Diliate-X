# DILIATE X — Claude Code Kickoff Prompt

Paste this into Claude Code once you've run the terminal setup commands below and copied `.claude/`, `public/brand/`, and `reference-site/` into your new project folder.

---

You are working on DILIATE X, a Next.js 14 marketing site. Before writing any code, read every file in `.claude/` — start with `CLAUDE.md`, `PRD.md`, and `Architecture.md`, then read `design-system/*.md` and `audit/*.md` for full context. These files are the permanent source of truth for this project: coding standards, architecture, design system, brand decisions, and the engineering audit of the legacy repos.

Also look at `reference-site/*.html` — these are static HTML/CSS/JS mockups I approved as the design direction (network background, kinetic typography, orbit service diagram, terminal-style case study cards, yellow logo). They are NOT production code — don't port them directly. Treat them as the visual/interaction spec to rebuild properly as React Server Components per `Architecture.md`'s folder structure, using Tailwind tokens per `design-system/ColorTypographySystem.md` and `LayoutSpacingGrid.md` instead of the inline CSS in the mockups.

Your task for this session:

1. Confirm the Next.js scaffold (from the terminal commands already run) is clean — `npm run dev` works, TypeScript/Tailwind/ESLint/Prettier/Husky configured per `CLAUDE.md`.
2. Set up the folder structure exactly as specified in `Architecture.md`.
3. Move `public/brand/logo-yellow.png` into the new project's `public/brand/` folder (already done if you copied the starter kit as instructed).
4. Build the design system foundation first: Tailwind theme config matching `design-system/ColorTypographySystem.md` (colors, fonts via `next/font`) and `design-system/LayoutSpacingGrid.md` (spacing, radius, glass tokens) — this is Phase 2 in `Phases.md`, and nothing else should be built before this is in place.
5. Stop after the design system foundation is working (a simple test page showing the color tokens, type scale, and a glass card is enough proof) and wait for explicit approval before building real pages — per `Phases.md`, each phase needs sign-off before the next starts.

Do not skip ahead to building the Homepage, Services, or Work pages yet even though the reference HTML exists for them — Phase 2 (Design System) must be confirmed working first per the phase dependencies in `Phases.md`.

If anything in `.claude/` seems to conflict with what I ask you to do in chat, flag the conflict rather than silently picking one — these docs represent decisions made over several planning sessions and shouldn't be casually overridden.
