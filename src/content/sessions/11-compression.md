---
title: "78 notes became 2 lessons"
description: "raw captures are perishable. the compression step is what makes the system sustainable."
date: 2026-04-01
sessionId: 11
work: "two weeks of active development — bug fixes, features, QA sessions, architecture decisions. notes accumulated fast."
capture: "78 raw notes across two projects. 65 from the main project (sessions, fixes, plans from a 3-day sprint), 13 from the knowledge base project."
review: "most of the 78 notes overlapped. 5 different sessions all described the same SSE streaming bug from different angles. 8 sessions covered the same feature sprint."
improve: "clustered by theme, extracted the lesson from each cluster, archived the raw notes. 65 notes became 5 lessons. 13 notes became 1 lesson. then condensed further: the 5 lessons covered 2 main themes."
measure: "78 → 2 final lessons. the lessons get cited in future sessions. the raw notes would not have been — they were too noisy and specific to find."
why: "78 raw notes became 2 lessons. raw captures are perishable — this is the compression process that makes knowledge sustainable long-term."
---

### take with you

```markdown
## Knowledge compression

When raw notes exceed 10 per project:
1. Cluster by theme (what topics overlap?)
2. For each cluster: what's the lesson? (1-2 paragraphs)
3. Write the lesson as a standalone note
4. Archive the raw notes

A good lesson answers:
- What was the problem?
- What was tried?
- What worked and why?
- What would you tell someone hitting this next?

The raw notes are the evidence. The lesson is the knowledge.
```

here's what a monthly clean actually looks like.

the vault had 488 active notes. two projects had accumulated significant raw material: 65 session notes from a 3-day feature sprint on the main project, and 13 notes from the knowledge base project.

### what 65 raw notes look like

the main project had just shipped 14 features, fixed 8 bugs, and run 4 QA sessions in 3 days. every session was captured. every bug fix was recorded. the result: 65 notes that all described overlapping work from slightly different angles.

5 of them mentioned the same streaming bug. 8 covered the same feature sprint from different sessions. 3 described the same architecture decision in different levels of detail.

if you searched for "streaming bug," you'd get 5 results. only one had the actual fix. the other 4 were older sessions that described the symptom but not the resolution.

### the compression

clustered the 65 notes by theme. five themes emerged:
1. agent prompt architecture changes
2. how facilitation enforcement works
3. knowledge extraction evolution
4. cost optimization patterns
5. API compatibility fixes

each cluster was compressed into one lesson — the distilled insight, stripped of session-specific noise. "here's how agent prompt architecture works, what we tried, what stuck, and why."

the 13 notes from the knowledge base project compressed into one lesson about a design decision that was made, reversed, and remade in one day.

### why this matters

a raw session note says: "today I fixed BUG-67 by adding sequence-based dedup to the SSE handler. the problem was duplicate events from rapid tool calls."

a distilled lesson says: "SSE streaming with rapid tool calls produces duplicates. the fix is sequence-based dedup on the client. tried event-ID dedup first — doesn't work because the server generates unique IDs per event."

the lesson is searchable, reusable, and relevant to anyone hitting the same problem in the future. the session note is only relevant to someone who wants to know what happened on march 29th.

### the principle

raw captures are compost. lessons are what grows from them. without compression, the brain fills with context that was useful for one day and noise for every day after. the compression step — clustering, extracting the lesson, archiving the rest — is what makes the system sustainable long-term.

