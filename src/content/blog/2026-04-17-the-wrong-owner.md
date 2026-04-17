---
title: "the wrong owner"
description: "giving the agent more context didn't fix the problem. moving the responsibility did."
pubDate: 2026-04-17
loop: "capture"
---

there's a pattern that took me too long to recognize: when a system keeps failing at the same thing, the problem usually isn't what's failing. it's that the wrong part of the system is responsible for it.

two examples from the same day.

## the agent that kept breaking the canvas

the canvas agent had a persistent habit. it would create duplicate page IDs. it would create orphan nodes — pages with no parent, floating loose in the canvas with nowhere to go. we'd spent sessions trying to fix this on the agent's side.

clear instructions. examples of correct output. the full inventory of existing pages injected into context so the agent couldn't "forget" what already existed.

it kept failing anyway.

the uncomfortable insight: you can't fix non-determinism with more context. the agent isn't broken — it's the wrong tool for deterministic bookkeeping. generating IDs, tracking existing slugs, assigning parents to new nodes: those are jobs for a system that doesn't make probabilistic choices.

so we moved the responsibility. the backend now resolves identity from the title. the agent emits a title; the backend looks up whether that page exists, assigns the ID, infers the parent if one's missing. the agent doesn't track anything — it just writes content. the bookkeeping runs on code that doesn't hallucinate.

once you make that shift, the class of failure disappears. not because the agent got smarter. because it stopped being responsible for the thing it was bad at.

## the roadmap that couldn't show what it needed to show

clarity's roadmap was kanban-by-phase. three columns. tasks sorted by which quarter they were in. clean, simple.

but there's a thing product teams actually need to see: not just "what's happening in Q1 and Q2" but "what's happening with the authentication work across Q1 and Q2." cross-cutting themes. horizontal slices through the time axis.

kanban-by-phase can't show that. not with better filters. not with color-coding. the data model only had one axis — time — so any view built on top of it could only show one axis.

the fix was structural: add themes as a first-class dimension in the data model, then build four views that let you see both axes at once. a swimlane matrix for planning density. a now/next/later board for stakeholder communication. a gantt for timeline reasoning. initiative cards grouped by theme for coherence.

twelve implementation phases. 98 new tests. done in a day.

the speed was possible because the structure was right. once we committed to the two-axis model, everything else was implementation work. when you're fighting a structural mismatch — adding views to a model that doesn't have the dimension you need — every feature you build is debt.

## how you know a fix was real

the test of whether something actually worked is whether the specific failure stops happening.

we dogfooded clarity on its own launch plan: use the product to plan the product. three minutes in, the agent narrated instead of acting — described what it was going to do, then did nothing. that's still broken. it's a different problem, a different owner, one we haven't fixed yet.

but orphan nodes? canvas stayed clean. the backend handled it. the fix was real.

that's how you can tell. the failure that motivated the fix stops. everything else — the stuff you didn't fix — keeps showing up just as reliably.

## take with you

when something keeps failing, before trying to make the failing part better: ask whether that part should own the responsibility at all.

| pattern | what it usually means |
|---|---|
| agent keeps making the same mistake | it's doing bookkeeping or constraint-enforcement it shouldn't |
| UI can't show what users need | the data model is missing a dimension — views won't fix it |

the move in both cases is the same: identify who should own the responsibility, then actually hand it to them. not "make the current owner try harder." transfer the job.

the system that results is simpler and more reliable than the one where you kept prompting.
