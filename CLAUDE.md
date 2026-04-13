# mat10tng.github.io — bootloader

## Required
Invoke the `blog-writing` skill before drafting any post or editing `src/content/blog/` or `src/data/history.json`.

## Main-branch policy (this repo only)
- All changes OK on main — this is a personal blog, not a software project
- No worktree required

## Publishing gates
- Auto commit and push after changes. No confirmation needed.
- Use descriptive commit messages.

## Site philosophy — everything maps to the homepage loop
The homepage shows: work → capture → review → improve → measure → repeat.
Every page delivers on that promise:
- **Blog (/blog)** = capture. each post is a pass through the loop. what happened, what was captured, what improved.
- **History (/history)** = measure. how the process itself got better over time. each entry is a change to how we work + whether it helped.
- No about page. the first post covers it.

## Site purpose (dual audience)
- **External:** anyone curious about human+AI collaboration — principles, practical takeaways, evidence
- **Internal (me):** a living reference for the system I'm building. what changed, why, what it looks like now. I use this to stay oriented.

## Content principle
- Insight first, always. Data supports the story — never leads it.
- Titles are about what changed, not what was counted. "stop jumping to code" not "47 sessions fixed."
- Timeline entries tell the why and what-changed. Numbers appear inside as evidence.
- Blog posts follow the loop implicitly: I was working on X, here's what I captured, here's what improved.
- The history page is both a public timeline AND a personal changelog.
- When significant changes happen to the system (new rules, new skills, architecture changes, process changes), they should be reflected on the site — not just in KB.

## Visual-first content
- The reader is a visual learner. Use SVG diagrams wherever possible.
- Every session should ideally have a visual: a flow, a table, a before/after, a timeline.
- Prefer inline SVG over ASCII art — cleaner, responsive, clickable.
- Diagrams tell the story. Text explains the nuance. Not the other way around.

## Operational habit
- After significant work sessions (new rules, system changes, process improvements), check if the blog should be updated.
- Ask: "does the history page need a new evolution entry?" and "is there a session worth writing up?"
- The site should stay current with the system. If the system changed last week and the site doesn't reflect it, something was missed.
- This isn't a publishing schedule — it's a hygiene check. The site is documentation, not marketing.

## Tech
- Framework: Astro 5.x
- Deploy: GitHub Pages via Actions (push to main triggers build)
- URL: https://mat10tng.github.io
- History data: `src/data/history.json` — refreshed via `refresh-blog-history` skill
