---
title: "changing the process, not the code"
description: "the fix for a recurring problem is never in the code. it's in how you work."
pubDate: 2026-04-05
loop: "improve"
---

there's a difference between fixing a bug and fixing the process that produced the bug.

fixing the bug: find the issue, write the patch, run the tests, ship it. that's work. important, but it only fixes one thing.

fixing the process: why did this bug happen? why didn't we catch it earlier? what would prevent the next one like it? that's improvement. it fixes a category of things.

here's a real example. I kept shipping changes that broke unrelated features. the fix each time was easy — find the regression, patch it. but the pattern kept repeating.

the process fix: after any change, run a broader set of checks before calling it done. don't just test the thing you changed — test the things near it. that became a rule. regressions dropped.

another one. conversations kept starting with misaligned assumptions. I'd say "fix the login bug" and the work would go to the wrong file, wrong database, wrong component. each individual misalignment was easy to correct. but it kept happening.

the process fix: before writing any code, state the files you'll change, the approach you'll take, and any assumptions about the current state. then wait for confirmation. now misalignment gets caught in 10 seconds instead of after 20 minutes of wrong-direction work.

the pattern: if something goes wrong once, fix it. if something goes wrong repeatedly, change the process. the code fix is for the symptom. the process fix is for the cause.
