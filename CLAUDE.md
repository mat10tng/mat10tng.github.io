# mat10tng.github.io — bootloader

## Required
Invoke the `blog-writing` skill before drafting any post or editing `src/content/blog/` or `src/data/history.json`.

## Main-branch policy (this repo only)
- All changes OK on main — this is a personal blog, not a software project
- No worktree required

## Publishing gates
- When changes are ready, present "commit and push" as a single option
- Only proceed with commit + push after explicit user approval
- Never auto-commit or auto-push without asking

## Tech
- Framework: Astro 5.x
- Deploy: GitHub Pages via Actions (push to main triggers build)
- URL: https://mat10tng.github.io
- History data: `src/data/history.json` — refreshed via `refresh-blog-history` skill
