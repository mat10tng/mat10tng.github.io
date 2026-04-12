---
title: "parallel without stepping on yourself"
description: "running multiple AI sessions at once without merge conflicts. here's the grouping strategy."
pubDate: 2026-03-26
loop: "improve"
---

I was running 3 AI conversations at once, all working on the same codebase, fixing different bugs. it went badly. merge conflicts, overwritten files, one conversation undoing what another just did.

the obvious fix was isolation — give each conversation its own copy of the code (using git worktrees). they can't step on each other. when one finishes, merge its changes back. one at a time.

but isolation alone wasn't enough. even with separate copies, merging conflicted when two conversations touched the same files. the real insight came from reviewing which merges failed and grouping the work accordingly.

## the conflict risk table

before spinning up parallel conversations, I classify the work:

| type of change | conflict risk | can run in parallel? |
|---|---|---|
| backend-only (isolated API, single service) | low | yes |
| frontend-only (one component, scoped CSS) | low | yes |
| full-stack (model + API + UI for same feature) | high | no — same conversation |
| shared types or models | high | no — same conversation |
| database migrations | critical | **always sequential** |
| frontend routing or layout | medium-high | be careful |

the rule: if two tasks touch the same files or the same shared types, they go in the same conversation or run one after the other. never in parallel.

## the coordination layer

each conversation starts by reading notes from previous conversations — what was changed, what was discovered, what's still broken. each conversation ends by writing its own notes. so conversation 3 benefits from what conversation 1 found, even though they ran at the same time.

this turned the notes system into a coordination mechanism, not just a memory system.

## the discipline

one fix per conversation. no scope creep — "while I'm here, I might as well..." is how you introduce the conflicts you were trying to avoid. a clear description of the bug and the expected behavior, and nothing else. the constraint makes it faster, not slower.
