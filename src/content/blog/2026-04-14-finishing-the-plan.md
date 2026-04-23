---
title: "finishing the plan"
description: "eighteen tasks, four phases, one day. what made it possible to execute that fast without things falling apart."
pubDate: 2026-04-14
loop: "capture"
---

seventeen sessions in one day. that's not normal, but today wasn't normal.

the canvas human-parity plan had been on the board: eighteen tasks across four phases, each one adding something that professional diagram tools take for granted. undo/redo, context menus, edge reconnection, drop-on-edge splice, cross-flow connections, reparent drag, group/ungroup, wiki panel fields, canvas search, topology validation, changelog viewer, dependency graph. everything you'd expect from something like Figma or Miro, applied to a node graph that an AI uses to structure its own work.

by mid-afternoon, all eighteen tasks were done. fourteen commits, 69 files changed, 228 tests passing.

## the morning wasn't the plan

the day didn't start with the canvas work. it started with infrastructure — the codebase had grown past a convention that says no source file should exceed 500 lines. 28 files violated it. so before the main work started, I ran 6 parallel agents in isolated worktrees to split everything. each agent handled a different slice: backend API, backend agent logic, database layer, frontend hooks, dashboard components, shared components. they all completed. I merged them sequentially with `git merge --squash`, running tests between each merge.

zero merge conflicts. zero regressions.

the trick was barrel re-exports. when you split a file, the original path becomes an index that re-exports from the new sub-modules. every existing import still works. the agents doing the splits didn't need to coordinate on callers — they just had to keep the barrel intact.

then the plan started.

## where the gates paid off

every task in the canvas plan that touched a governed file — one covered by a spec contract — required a spec amendment before implementation. I expected this to be friction. instead it caught things.

task 8 alone surfaced three real bugs: a TypeScript compile error, a dead code path, and a viewport transform issue. caught in review, before merge. not after.

the rhythm that developed: implement → spec review → code quality review → fix → commit. every task went through the same loop. the loop sounds slow. it wasn't, because each thing that merged was actually correct and didn't need to be re-touched when a downstream task revealed a hidden assumption.

compare that to the alternative: skip the reviews, merge fast, and spend three tasks later undoing decisions that seemed fine at the time. the gate isn't the delay — the re-work is.

## what "done" looks like when the structure is in place

the plan format that's been working here: each task small enough to review in one pass. the plan is the scaffold. the spec is the contract. the tests are the gate. when all three are in place, "executing the plan" becomes mechanical in the right way — not mindless, but predictable. you know when something is done because done is defined.

eighteen tasks in a day sounds like going fast. but it was slow in all the places that matter — spec amendments before touching governed files, code review at every commit, tests before merge. the speed was the output of that discipline, not the thing that competed with it.

## Technical Insight

a complex plan doesn't need fewer gates to move quickly. it needs gates at the right granularity — small enough that each one is fast, consistent enough that they don't get skipped. the overhead of amendment + review + test per task was real. so was finishing eighteen tasks in a day with 228 tests passing and nothing obviously broken.

the bottleneck was never the process. it was having enough structure to let the process work.
