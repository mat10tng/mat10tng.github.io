---
title: "parallel without stepping on yourself"
description: "multiple sessions, one codebase. isolation made it work."
pubDate: 2026-03-26
loop: "improve"
---

I was running 3 conversations at once, all working on the same codebase. fixing different bugs. it went badly — merge conflicts, overwritten files, one session undoing another's work.

the fix was giving each conversation its own isolated copy of the code. they can't step on each other. when one finishes, merge its changes back. one at a time.

the key insight came from reviewing which merges failed. backend-only changes never conflicted with each other. frontend-only either. but anything touching shared types or database structure — those always conflicted. so: group by conflict risk before starting. parallel when safe, sequential when not.

the notes became the coordination layer. each conversation starts by reading what previous ones captured. each one ends by writing what it found. conversation 3 benefits from what conversation 1 discovered, even though they ran at the same time.

one fix per conversation. no scope creep. a clear description of the bug and expected behavior. the constraint makes it faster, not slower.
