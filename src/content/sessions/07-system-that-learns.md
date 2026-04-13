---
title: "the system that learns"
description: "from 0% reuse to 88%. measuring whether notes actually help."
date: 2026-03-21
sessionId: 7
work: "building a notes system to capture work sessions. notes were being written but rarely found again."
capture: "measured how often new conversations actually used anything from previous ones. the answer was close to zero."
review: "the notes existed but the system had no mechanism to surface them. writing things down is only half the problem — the other half is reading them back at the right moment."
improve: "added three mechanisms: auto-capture after each session, auto-surface relevant notes before each new session, and auto-archival of notes that never get referenced."
measure: "reuse rate went from near zero to 88%. 9 out of 10 conversations now build on something a previous one captured."
---

### take with you

```markdown
## Session capture template

After each work session, record:

### what happened
[1-2 sentences — what was the goal, what did you do]

### what worked
[commands, approaches, or decisions that succeeded]

### what didn't
[what failed, what took too long, what surprised you]

### lesson (if any)
[one sentence — what would you tell your future self?]

### outcome
success | struggled | failed | abandoned
```

```markdown
## Session start checklist

Before starting work:
1. Load notes from the last 3-5 relevant sessions
2. Check if any rules apply to this type of work
3. Pick an approach/skill before writing code
4. State your plan, get alignment, then execute
```

the notes started as storage. write things down after a work session, search when you need something. in theory it works. in practice, most notes were never found again.

I decided to measure it. simple question: what percentage of new conversations actually use something from a previous one? the first answer was close to zero. hundreds of notes existed, but every conversation was starting from scratch.

### the three mechanisms

**auto-capture:** after each work session, a summary gets written automatically — what happened, what worked, what failed, what was decided. no manual effort.

**auto-surface:** before each new conversation starts, the system loads relevant notes based on the current project and task. the conversation begins with context instead of a blank slate.

**auto-prune:** notes that never get referenced get archived over time. notes that keep getting referenced float up in search results. signal-to-noise ratio improves automatically.

### what actually matters in a note

not everything is worth keeping. the notes that get reused most are:
- **lessons** — distilled insights, short and actionable ("don't give agents overlapping tools")
- **decisions** — why we chose approach A over B, so we don't re-debate it
- **fix patterns** — the symptom, the cause, and the resolution, so the same bug gets fixed in minutes instead of hours

raw session logs rarely get referenced after the first week. they're useful as raw material for distilling lessons, but not as a final form.

### the metric

the number I track: what percentage of conversations pulled something useful from a previous one? it started near zero. now it's 88%.

that number made the whole system real. without it, "the notes are useful" is a feeling. with the number, it either goes up or it doesn't — and when it doesn't, that's a signal to look at what's broken.

### if you want to try this

you don't need a complex system. the core loop is:
1. **write down what happened** after each meaningful work session
2. **read it back** before starting the next one
3. **measure reuse** — are previous notes actually being used?

the tooling can be as simple as a markdown file. what matters is the habit of capture, the discipline of recall, and the feedback of measurement.

