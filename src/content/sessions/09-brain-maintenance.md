---
title: "the brain needs maintenance"
description: "without scheduled cleanup, knowledge rots. the system runs itself between sessions."
date: 2026-04-01
sessionId: 9
work: "building and shipping features daily. notes accumulating fast — 30-60 new notes per day during active sprints."
capture: "after 2 weeks, the note count hit 488. most were raw session logs. search results were getting noisy — relevant notes buried under session debris."
review: "the problem wasn't capture — we were capturing plenty. the problem was that raw captures have a shelf life. a session log from last week is useful for 2-3 days, then it's noise."
improve: "built three scheduled tasks: daily triage (compact when sessions pile up), weekly health (check metrics, detect gaps), monthly deep clean (archive stale notes, detect duplicates, score quality)."
measure: "after one monthly clean: 78 raw notes compressed into 2 distilled lessons. 55 notes archived. search noise dropped significantly."
---

the brain was drowning in its own output.

every session captured what happened. every fix was recorded. every decision was written down. which sounds great — until you have 488 notes and most of them are raw session logs from two weeks ago. search for anything and you get 30 results, 25 of which are old session noise.

the problem isn't capturing too much. the problem is that raw captures are perishable. a session log is valuable for a few days — it tells the next session what just happened. after a week, it's context that nobody needs. after a month, it's debris.

### what runs between sessions

the system now maintains itself on a schedule:

**daily triage** — checks each project for piled-up sessions. if more than 10 have accumulated, they get clustered by theme and compressed into lessons. 30 session logs become 3 lessons. the lessons survive; the raw logs get archived.

**weekly health** — runs the system's own metrics. what's the reuse rate? which searches return nothing (gap signal)? which notes get surfaced but never read (noise signal)? are there repeat failure patterns? the output is a health report that goes into the lifecycle log.

**monthly deep clean** — the thorough pass. archive notes older than 60 days that were never referenced. detect near-duplicates. score every note by usefulness (referenced a lot = keep, never referenced = candidate for removal). flag the bottom 10% for review.

### a real monthly clean

april 1st, 2026. vault had 488 active notes.

the monthly clean compacted 78 raw notes (65 from one project, 13 from another) into 2 distilled lessons. 78 notes archived. 5 orphan notes cleaned up. no duplicates found. bottom 10% flagged — mostly empty scaffold files from git worktrees.

after the clean: 410 active notes. same knowledge, less noise. search results got more relevant immediately.

### the principle

knowledge rots if you don't maintain it. the solution isn't "write less" — it's "compress regularly." raw captures are the compost; lessons are what grows from it. the maintenance has to be automated because nobody remembers to do it manually.

### rule — copy this

```markdown
## Brain maintenance schedule

Daily:
- If 10+ raw sessions accumulated → compress into lessons
- Archive the raw sessions after compression

Weekly:
- Check reuse rate, search gaps, noise signals
- Flag repeat failure patterns
- Log the health check

Monthly:
- Archive notes older than 60 days with 0 references
- Detect near-duplicates (merge or archive)
- Score all notes: bottom 10% are archival candidates
- Run full self-assessment
```
