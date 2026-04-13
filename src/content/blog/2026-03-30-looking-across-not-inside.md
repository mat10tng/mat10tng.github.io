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

**repeated structure.** a lot of conversations re-discovering the same configuration, searching for the same file, asking the same clarifying question. once is forgetting. when a dozen conversations all spend their first 10 minutes finding the same thing, that's not a memory problem — it's a surfacing problem.

**the same type of struggle.** multiple conversations reporting "struggled" or "took longer than expected" for similar reasons. if three different conversations all had trouble because they targeted the wrong file, that's not three bugs — it's a missing rule about confirming the target first.

**rules that aren't being followed.** sometimes a rule exists but keeps getting ignored. that usually means the rule is either unclear, in the wrong place, or not important enough to keep.

**notes that never get read.** if certain types of notes keep getting written but never referenced in future sessions, they're noise — the capture process needs adjusting.

## the first time I did this seriously

I pulled up a week of conversations and compared the rules each one was following. the same rule existed in three places — a config file, a memory file, and the notes system — and none of the versions matched. one conversation loaded version A, another loaded version B. same starting conditions, different behavior, no obvious reason why.

from inside any single conversation, everything looked fine. the rules were being followed. it was only by lining up five conversations side by side that the contradictions became visible. that review led directly to the single-source-of-truth restructure — one canonical location for every rule, everything else just points to it.

## if you want to try this

you don't need a complex system. just periodically look at your last 10-20 work sessions and ask: do I see any patterns? are the same kinds of problems showing up repeatedly? is there a fix that would prevent a whole category of issues instead of one instance?

the review doesn't have to be long. 15 minutes looking at patterns across sessions has more leverage than an hour debugging inside one.
