---
title: "looking across, not inside"
description: "bugs are visible inside one session. process problems are only visible across many. here's what to look for."
pubDate: 2026-03-30
loop: "review"
---

inside a single conversation, everything looks fine. you find a bug, fix it, move on. maybe the fix took longer than expected, maybe you went down the wrong path first, but it resolves and it feels like it worked.

the problem is that certain issues are invisible from inside a single session. they only become visible when you look across many sessions at once.

## what I actually do

every few weeks — or when something feels off — I pull up the notes from recent work sessions and just read through them. not the code, not the features. the process itself. I'm looking for shapes.

## the signals that matter

**repeated structure.** a lot of conversations that start the same way — diving into code, realizing the approach was wrong, backing up, starting over. one time that's a misstep. when it shows up in 47 out of 80 conversations, that's a process problem.

**the same type of struggle.** multiple conversations reporting "struggled" or "took longer than expected" for similar reasons. if three different conversations all had trouble because they targeted the wrong file, that's not three bugs — it's a missing rule about confirming the target first.

**rules that aren't being followed.** sometimes a rule exists but keeps getting ignored. that usually means the rule is either unclear, in the wrong place, or not important enough to keep.

**notes that never get read.** if certain types of notes keep getting written but never referenced in future sessions, they're noise — the capture process needs adjusting.

## the first time I did this seriously

I pulled up a month of session summaries and read through the outcomes. success, struggled, success, struggled, struggled, success. the "struggled" ones had something in common — no upfront discussion of the approach. just straight to implementation. that's not something you notice in the moment. in the moment you're focused on the bug.

that review led directly to the "state your assumptions first" rule, which cut the pattern from 47 occurrences to 3.

## if you want to try this

you don't need a complex system. just periodically look at your last 10-20 work sessions and ask: do I see any patterns? are the same kinds of problems showing up repeatedly? is there a fix that would prevent a whole category of issues instead of one instance?

the review doesn't have to be long. 15 minutes looking at patterns across sessions has more leverage than an hour debugging inside one.
