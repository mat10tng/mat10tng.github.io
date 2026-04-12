# mat10tng.github.io — bootloader

## Required
Invoke the `blog-writing` skill before drafting any post or editing `src/content/blog/` or `src/data/history.json`.

## Main-branch policy (this repo only)
- Content files OK on main: `src/content/blog/*.md`, `src/data/history.json`
- Code/config require worktree: `astro.config.*`, `.github/workflows/*`, `src/pages/*.astro`, `src/layouts/*`, `src/components/*`

## Publishing gates
- Never commit without explicit "commit" from the user
- Never push without explicit "push" from the user
- Two separate confirmations required

## Tech
- Framework: Astro 5.x
- Deploy: GitHub Pages via Actions (push to main triggers build)
- URL: https://mat10tng.github.io
- History data: `src/data/history.json` — refreshed via `refresh-blog-history` skill
