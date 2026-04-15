---
title: "two definitions of phase"
description: "the project canvas had three modes. when we actually looked at a project, everything was in phase zero."
date: 2026-04-15
sessionId: 14
work: "expanded the project canvas to three modes — roadmap, gantt, dependencies — added focus mode and node promote/demote, deleted and rebuilt the side panel (net -1026 lines), prepped production infrastructure"
capture: "tested the project view with a real project. everything was in phase zero. traced it: the agent never writes the metadata field the board API uses for grouping"
review: "two working implementations of 'phase' in the same codebase. agent used the hierarchy. board API used a flat integer field. both passed their tests. incompatible when used together."
improve: "replaced the flat-field grouping with a hierarchy-driven /project-view endpoint — 18 tasks, 16 commits, one session"
measure: "13 sessions in two days, all succeeded. one silent architectural bug surfaced and fixed — had been present since the project view was built"
why: "what to look for when two components are both correct and produce the wrong answer together — and why tests won't catch it"
---

### take with you

**The two-definitions bug — how to spot it:**

| Symptom | In this case |
|---|---|
| Both components pass their tests | board API: passing. agent pipeline: passing |
| Same concept, two representations | hierarchy (parent_page_id) vs flat field (metadata.phase) |
| Wrong data, not errors | tasks appear — just all in phase zero |
| Never exercised end-to-end | agent generates, API reads, user sees: no test covered the full path |

**How to catch it before it costs a day:**
- Use the feature as a real user, not a test user. Dogfood it.
- When data is silently wrong, grep both ends: what does component A write? What does component B read?
- If they use different representations of the same concept, pick one as canonical and migrate the other.
- Write the backfill before fixing the consumers.

---

the canvas went from one mode to three in two sessions. gantt first — phase-level timelines, date bars, 19 TDD tests. then dependencies — phase nodes, aggregated cross-phase edges, the third and final project canvas mode. those two joined the roadmap mode that already existed.

along the way: the side panel that used to be two separate components got torn down and rebuilt as one. deleted 1026 lines. TraceView went with it — the dependencies canvas mode replaced what it was doing. net result: more surface, less code.

then we tried to actually use the project view on a real project.

every task was in phase zero.

not a crash. no error message. just... one phase. everything in it. the project had real structure — container nodes, phases, connections, tasks nested under their parent phases. the canvas showed it correctly. the project board view ignored it completely.

### the grep

two searches, five minutes.

how does the board API decide which phase a task belongs to? `metadata.phase` — an integer on each task page. defaults to 0 when missing.

how does the agent set `metadata.phase` on tasks it creates? it doesn't. the only place that field gets written is the frontend task detail panel — when a human manually edits a task and sets a phase.

so every AI-generated task lands in phase zero. every one. the agent builds the right hierarchy: phase container pages as parents, task pages as children. the structure is there in the database. the board API never reads it. it reads the flat integer field that the agent never writes.

### why this is worse than one wrong thing

if the agent had written a wrong phase number, you'd see tasks in unexpected columns. that's wrong, but visibly wrong — you'd trace it.

if the board API had no grouping logic at all, the board would look obviously broken.

two reasonable implementations of the same concept — each correct in its own domain, each passing its own tests — is a different kind of problem. there's no error to trace. the agent is doing the right thing (building hierarchy). the board API is doing the right thing (grouping by the designated field). the bug is in the assumption between them: that the field gets populated before the API reads it.

unit tests can't catch this because they test behavior in isolation. the integration test you'd need would have to cover the full path: agent generates pages → board API reads them → user looks at the board → sees correct phases. that test didn't exist.

what existed: actually using the product.

### fix

new endpoint: `/project-view`, hierarchy-driven. reads the tree the agent actually produces. derives phase membership from container ancestry, not from a flat integer. 18 tasks, 16 commits.

the old `metadata.phase` field doesn't disappear — a backfill migration handles existing manual edits, and a phase dropdown in the task detail panel writes it for the new endpoint too. but the source of truth for the view is now the hierarchy.

---

the canvas modes, the side panel simplification, the deploy infrastructure — all of that happened in the same two-day stretch. all of it shipped. the bug didn't block any of it.

but it was the only thing that actually mattered from a product perspective. a tool that shows you your project in three modes is impressive. a tool where every project looks the same is not a tool.

dogfooding found what months of test coverage missed.
