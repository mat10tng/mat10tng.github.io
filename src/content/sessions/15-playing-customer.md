---
title: "playing customer"
description: "the QA session found bugs. the deeper find was a wrong abstraction. 20-task refactor, one weekend."
date: 2026-04-18
sessionId: 15
work: "ran QA session 3 playing the founder persona — first full rubric v2.1 run. then a 20-task themes refactor, UI sync bug fixes, gate model unification, belongs_to purge, and phase 0+1 of an agent eval suite"
capture: "the AI-generated plan had 7 theme nodes sitting on the canvas with no topological meaning. themes weren't broken — themes were the wrong abstraction at scale. a page that can't be sequenced, connected, or phased is just noise"
review: "the right response to an architectural smell isn't polish. themes became metadata tags instead of canvas pages. 20 tasks, 3 sessions. QA replay confirmed it end-to-end."
improve: "started building an eval suite to systematize what was manual QA. phase 0 and 1 scaffolded; one critical integration issue is the next blocker."
measure: "18 sessions across 2 days. 16 success, 2 struggled. one architectural refactor (20 tasks), 6+ bug fixes, one eval infrastructure initiative started."
why: "what happens when dogfooding exposes not a bug, but a design decision that was wrong at scale — and you fix the abstraction instead of patching around it"
---

### take with you

What dogfooding finds — and what to do about it:

| Finding | Example | Response |
|---|---|---|
| Behavior bug with clear root cause | Tasks not connected to parent phases | Trace to root, fix there |
| Correct behavior, wrong abstraction | Theme pages sitting inert on the canvas | Redesign the abstraction |
| Silent inconsistency | Two representations of "phase exit criteria" | Pick one canonical, migrate the other |
| Loop that works reliably | QA → trace → fix → replay | Systematize it |

Tests catch the first row. Only dogfooding catches the middle two.

---

the QA session was supposed to find bugs.

it did. four of them — tasks orphaned from their parent phases, phases missing timing data, no sequence connections between tasks, exit criteria not persisting. clear root causes, all fixable. that was one session.

but the more interesting find wasn't a bug.

the AI-generated plan came back as 44 pages: root node, 4 phases, 30 tasks, a document. also 7 theme nodes — one for each strategic theme the persona was working with.

themes showed up on the canvas like any other object. they had no phases, no connections, no position in the task sequence. they didn't participate in the structure of the plan. they just sat there.

that's not broken. the software was working correctly. themes were modeled as pages, pages appear on the canvas, everything downstream of that decision was functioning as designed.

but looking at a plan where 16% of the canvas is occupied by objects that carry no structural information — that's not what you want when you're trying to see a plan. themes *crossing* tasks is useful. themes *as* objects in the plan is just noise.

### the decision

the question isn't "how do we make themes look better on the canvas." the question is whether themes belong on the canvas at all.

they don't. a theme isn't a work item. it can't be scheduled, sequenced, or given an exit condition. it's a tag on work items — a way of reading the plan from a different angle, not a node in the plan itself.

so: themes become metadata. each task carries a themes field. the project carries a theme taxonomy (name, color, description). canvas stays clean. filtering and grouping still work, just from the tag layer, not by traversing edges to theme nodes.

20 tasks. the refactor touched backend schema, API layer, frontend components, and specs at each layer — spec governance means every contract-changing edit has to bundle its amendment in the same commit. slower, but impossible to drift.

3 sessions: design, backend (8 tasks), frontend and spec amendments (12 tasks). each session via subagent dispatch — fresh context per task, TDD loop, code review before merge. clean output.

### the validation

the next session: replay the exact same persona on a fresh project.

22 tasks. 5 themes. 3 tasks carrying 2 themes each. settings showing the taxonomy with counts. canvas showing structure — phases, task graph, connections — with zero theme nodes. multi-chip rendering on kanban cards.

the original structural bugs (tasks orphaned from phases, no sequence connections) were also verified fixed.

that replay is the whole point. the fix isn't done when the tests pass. the fix is done when a fresh run produces the output you actually wanted.

### what came after

fixing the right abstraction surfaced more gaps in the surrounding layer.

the task detail panel didn't show themes. the gantt view was producing duplicate React keys for multi-theme tasks. project settings showed stale theme data after a plan commit. not surprising — new fields don't propagate to every surface automatically.

four more bugs. one session, 735 frontend tests passing after.

then gate model unification: the codebase had two representations of "phase exit criteria." metadata on the phase and edge conditions between phases — same concept, two layers. the edge representation was already what the canvas rendered. retired the metadata field, wrote the migration, updated the contracts.

then a full purge of a retired edge type still being written in three route files. not a product decision, just residue. traced the write paths, removed the loops, wrote a test asserting the field persists silently without producing edges.

none of these were on a pre-planned backlog. they came from looking at the system and following what felt off.

### why build an eval suite now

when you've run the same QA loop 15+ times and it reliably finds real issues, you start building infrastructure around it.

that's where the last two sessions went. scaffolded the eval framework: case format, loader, seeder, determinism fixture, emission capture, grader, runner. 50 tests covering the infrastructure itself.

one issue surfaced in the phase 1 review: the streaming call path in the production agent bypasses the provider layer entirely, so the temperature patch doesn't reach the real LLM call. phase 2 can't run with reliable determinism until that's fixed.

that's the next session.

the loop that found the themes problem, and then found the bugs in the themes fix, is becoming infrastructure. what was manual is becoming repeatable.
