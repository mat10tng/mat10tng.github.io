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

## Site philosophy — everything maps to the homepage loop
The homepage shows: work → capture → review → improve → measure → repeat.
Every page delivers on that promise:
- **Blog (/blog)** = capture. each post is a pass through the loop. what happened, what was captured, what improved.
- **History (/history)** = measure. how the process itself got better over time. each entry is a change to how we work + whether it helped.
- No about page. the first post covers it.

## Content principle
- Insight first, always. Data supports the story — never leads it.
- Titles are about what changed, not what was counted. "stop jumping to code" not "47 sessions fixed."
- Timeline entries tell the why and what-changed. Numbers appear inside as evidence.
- Blog posts follow the loop implicitly: I was working on X, here's what I captured, here's what improved.
- The sidebar stats show the arc. The timeline is the content.

## Tech
- Framework: Astro 5.x
- Deploy: GitHub Pages via Actions (push to main triggers build)
- URL: https://mat10tng.github.io
- History data: `src/data/history.json` — refreshed via `refresh-blog-history` skill
