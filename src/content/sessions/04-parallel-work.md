---
title: "parallel without conflicts"
description: "running 3 sessions at once broke everything. isolation + grouping fixed it."
date: 2026-03-26
sessionId: 4
work: "running multiple AI conversations simultaneously, each fixing a different bug in the same codebase."
capture: "merge conflicts on almost every merge. files overwritten. one conversation's fix undoing another's."
review: "the conflicts weren't random — they correlated perfectly with whether two conversations touched the same files or shared types."
improve: "isolated each conversation with its own code copy (git worktrees). classified work by conflict risk before parallelizing. sequential for shared types, parallel for isolated changes."
measure: "merge conflicts dropped to near zero. parallel throughput roughly tripled for bug-fixing sprints."
why: "if you run multiple AI sessions at once, they will conflict. this is the grouping strategy that prevents it — includes the conflict risk table."
---

### take with you

```markdown
## Parallel work

Before parallelizing, classify by conflict risk:

| Change type              | Risk     | Parallel? |
|--------------------------|----------|-----------|
| Backend-only, isolated   | Low      | ✅ yes    |
| Frontend-only, scoped    | Low      | ✅ yes    |
| Full-stack, same feature | High     | ❌ same session |
| Shared types / models    | High     | ❌ same session |
| Database migrations      | Critical | ❌ always sequential |

Rules:
- One task per session, no scope creep
- Each session reads previous sessions' notes before starting
- Each session writes its own notes when done
- Merge one branch at a time
```

I was running 3 AI conversations at once, all working on the same codebase, each fixing a different bug. it seemed efficient. it was chaos.

merge conflicts on almost every merge. one conversation would change a file, another would change the same file differently, and merging became a puzzle. sometimes one conversation's fix would silently undo another's.

### the fix: isolation + grouping

**isolation:** each conversation gets its own copy of the code (using git worktrees). they literally can't see each other's changes. when one finishes, merge its changes back to main. one merge at a time.

**grouping by conflict risk:** isolation alone doesn't prevent merge conflicts — it just defers them. the key insight was classifying work before starting:

| type of change | conflict risk | parallel? |
|---|---|---|
| backend-only (isolated API/service) | low | ✅ yes |
| frontend-only (scoped component) | low | ✅ yes |
| full-stack (model + API + UI) | high | ❌ same session |
| shared types or models | high | ❌ same session |
| database migrations | critical | ❌ always sequential |

if two tasks might touch the same files, they go in the same conversation or run one after the other. never in parallel.

### coordination through notes

each conversation starts by reading notes from previous conversations. each one ends by writing what it found. so conversation 3 benefits from what conversation 1 discovered, even if they ran at the same time.

### the discipline

one fix per conversation. no "while I'm here, I might as well..." — that's exactly how you introduce the conflicts you were trying to avoid. clear scope, clear target, nothing else.

