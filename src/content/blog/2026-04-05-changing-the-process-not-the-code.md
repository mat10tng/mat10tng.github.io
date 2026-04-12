---
title: "changing the process, not the code"
description: "the fix for a recurring problem is never in the code. here's a framework for knowing which to change."
pubDate: 2026-04-05
loop: "improve"
---

there's a real difference between fixing a problem and fixing the process that produces the problem. both matter, but they're different skills and it's worth being deliberate about which one you're doing.

## the distinction

**fixing the problem:** find the issue, write the patch, run the tests, ship it. that's work. important work. but it fixes one instance.

**fixing the process:** ask why this happened, why it wasn't caught earlier, and what would prevent the entire category. that's improvement. it fixes a class of issues going forward.

## a simple framework

| how many times? | what to do |
|---|---|
| once | fix it and move on |
| twice | notice it, maybe note it |
| three or more times | stop fixing instances. change the process. |

the threshold of three isn't magic — it's just the point where the cost of a process change is clearly lower than the cost of fixing the same thing again and again.

## real examples

**regressions:** I kept shipping changes that broke unrelated features. each regression was easy to fix individually. the process fix: after any change, run a broader set of checks before calling it done. don't just test the thing you changed — test the things connected to it. regressions dropped significantly.

**misaligned assumptions:** conversations kept starting with the wrong target — wrong file, wrong database, wrong component. each misalignment took about 20 minutes to discover and correct. the process fix: before writing any code, state the files you'll change, the approach, and your assumptions. wait for a quick confirmation. now misalignment gets caught in 10 seconds.

**scope creep in parallel work:** multiple conversations working at the same time would bleed into each other's scope. "while I'm here, I'll also fix this other thing." the process fix: one task per conversation, described upfront, no exceptions. the constraint eliminated cross-contamination.

## the principle

if something goes wrong once, fix it. if it keeps going wrong, the fix isn't in the code — it's in the process. the code fix handles the symptom. the process fix handles the cause. both are necessary; knowing which one you're doing determines whether the problem comes back.
