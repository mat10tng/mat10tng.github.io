---
title: "parallel without stepping on yourself"
description: "multiple sessions, one codebase. worktrees made it work."
pubDate: 2026-03-26
---

I was running 3 Claude sessions at once, all on main. fixing different bugs. it went badly — merge conflicts, overwritten files, sessions undoing each other's work.

the fix was git worktrees. each session gets its own branch, its own copy of the repo. they can't step on each other. when a session finishes, merge its branch into main. one at a time.

the key insight was grouping by conflict risk before spinning up sessions. backend-only changes can run in parallel. frontend-only too. but anything touching shared types, database migrations, or routing — those go sequential. always.

the KB became the coordination layer. each session starts by reading what previous sessions captured. each session ends by writing what it found. session 3 benefits from what session 1 discovered, even though they ran in parallel.

one fix per session. no scope creep. clear prompt with the bug number and expected behavior. the constraint makes it faster, not slower.
