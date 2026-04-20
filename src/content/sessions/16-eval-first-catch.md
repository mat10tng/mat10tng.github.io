---
title: "what an eval suite finds first"
description: "built the regression detection layer we'd been missing. first run caught things that had been passing manual QA for weeks."
date: 2026-04-20
sessionId: 16
work: "built a full agent eval framework across 11 phases — case format, runner, N=3 strict semantics, SQLite recorder, 6-command CLI, attribution tracking, spec coverage gate. two days, 15 sessions."
capture: "first pass caught 3 tool schema gaps and 4 prompt-contract drift sites that had been silently present through all prior manual QA. a mid-session dogfood run still found a hallucinated response the evals hadn't been written for yet."
review: "evals and dogfooding catch different classes. evals find the known unknowns — does the contract still hold? dogfooding finds the unknown unknowns — what does a real session actually produce?"
improve: "the agent is now gated by evals before anything merges. manual QA still runs, but it's faster — it stops re-testing what evals already cover continuously."
measure: "15 sessions, all succeeded. 11 eval phases shipped. 7 real bugs caught in the first eval pass. one architectural API constraint discovered and worked around mid-build."
why: "what happens when you replace an ad-hoc QA loop with structured evals — and what the evals still can't reach"
---

### take with you

What different detection layers catch — and what they miss:

| Layer | Finds | Misses |
|---|---|---|
| Unit tests | Logic bugs in isolation | Silent contracts between components |
| Evals (N=3 strict) | Schema drift, prompt-contract gaps, behavioral regression | Behavior that only surfaces under real usage patterns |
| Dogfooding / manual QA | Emergent bugs, hallucinations under real prompts, UX confusion | Regression on things you aren't actively testing that session |

None replaces the others. The goal is to push as much as possible into evals so that dogfooding can focus on territory you haven't mapped yet.

---

the QA loop had been working. every time a new feature shipped, a session would play through the product as a real user — an AI playing a founder persona, testing a real scenario, looking for what broke. it found things. real things. tasks orphaned from their parent phases. plans with no sequencing. forms not persisting after submission.

but it wasn't designed to find regression. it was designed to find bugs in whatever was new that week. a fix in session 30 could silently break something from session 10 and nobody would know until someone happened to test the right scenario again. the signal depended on what the human thought to check.

the moment that made it explicit: "I have had breaking changes and now sometimes the system does not work properly. I am using QA Tuan for doing this, but there must be a more systematic way to do this."

there must be. so we built one.

### building it

eleven phases across two days. the design: eval cases are plain files describing an input to the actual agent pipeline and a set of expected outputs. the runner invokes the real system — not a mock, not a stub, not a simplified version. the agent sees a real database, writes real pages, and the grader checks what came out structurally.

the assumption is that if the real pipeline passes the evals, you have coverage. if it fails, you have a specific case that failed — not a vague "something went wrong in QA."

one constraint surfaced early: the original design tried to use temperature=0 for determinism. the Anthropic API silently overrides temp=0 back to 1 when extended thinking mode is enabled. the production agent uses thinking mode. so the forced-zero setting was doing nothing — the framework was fighting an API rule that won't bend.

the fix: mirror production. keep thinking on, run each case three times with strict-all-pass semantics. a real regression that flips even one of three runs gets caught. inherent variance from sampling wobbles 1/3 runs sometimes — that's surfaced and visible, but doesn't count as a failure without investigation. this turned out to be a better design than deterministic testing would have been: you can see whether a behavior is stable or just lucky on a given run.

cost: $0. the runner goes through the same CLI proxy that's already running for development. three runs per case at roughly 30 seconds each is 90 seconds per eval. the full suite runs in under 20 minutes.

### what the first run found

three tool schema gaps. fields that the contract said existed but the schema didn't expose — meaning the agent couldn't emit them even when the prompt asked correctly. not a prompt problem. not a logic problem. the surface the agent writes to was missing fields.

four prompt-contract drift sites. places where the prompt described a behavior that the code no longer enforced. the prompt still referenced the old contract. the code had moved on. outputs looked plausible, so manual QA passed them. the data was wrong in ways that only become obvious when you look at the structural assertions, not the surface appearance.

none of these were new. they'd been present through all the prior QA sessions. they just weren't the thing any given QA session was checking for. evals are different: each case asserts a specific structural property, and if it isn't there, the case fails — regardless of whether the output looked reasonable to a human reviewer.

the framework caught these in the first pass. before any human ran a session. before any new feature was tested. just: does the existing contract hold? answer: no, in seven places.

### what the evals couldn't reach

same evening. a dogfood session — using the actual product to prep for a real demo. mid-session, the agent returned a form prompt in a path that should produce direct output. clear, visible, reproducible once you saw it. not a schema gap, not a contract mismatch. a behavioral bug that only appeared when a real user ran a session with a specific kind of prompt.

no eval case existed for that scenario. the eval suite wouldn't have caught it.

that's the line between the two detection layers. evals cover the known unknowns: you identified the contract, you wrote the case, you check whether the code still honors it on every run. dogfooding covers the unknown unknowns: emergent behavior under real usage that you didn't think to test, surfaced by actually using the thing.

they aren't competing. the eval suite doesn't make dogfooding unnecessary — it makes dogfooding better. when evals cover the known-contract space, a dogfood session can focus entirely on new territory instead of re-verifying things that already have coverage.

the result is more ground covered, not the same ground covered twice.
