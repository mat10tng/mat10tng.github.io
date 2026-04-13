---
title: "more notes, worse results"
description: "there was a two-week stretch where the system got dumber the more I fed it. here's what went wrong."
pubDate: 2026-04-13
---

around week two I was capturing everything. every session got a summary. every fix got a note. every stray observation got written down. the system had hundreds of notes and the reuse rate was stuck at about 45%.

so I wrote more. figured the problem was coverage — if the system isn't surfacing useful things, give it more to surface. the reuse rate didn't move. it actually dipped a little.

the problem wasn't volume. it was noise.

## what was actually happening

a new conversation would start, load context from previous sessions, and get hit with a wall of marginally relevant notes. a session summary from two weeks ago about a bug in a completely different part of the codebase. a fix note that was technically correct but applied to a situation nothing like the current one. three notes that all said roughly the same thing because I'd captured the same lesson from three different angles.

the system was doing exactly what I told it to — surface everything related. but "related" is a low bar when you have 400 notes. the context window was filling up with noise, and the actually useful stuff was buried.

## the fix I tried that also didn't work

my first instinct was better search. if the system is surfacing irrelevant notes, make the search smarter. I spent time improving how notes were categorized and tagged, adding types, tweaking relevance scoring.

this helped — the reuse rate went from 45% to about 54%. but it didn't solve the core problem. the notes themselves were the issue. raw session summaries are verbose, full of context that only matters in the moment, and they pile up fast. better search on bad data is still bad data.

## what actually fixed it

compaction. instead of surfacing raw session notes, periodically compress them. take 30 session notes about tool usage and distill them into 3 lessons about how tools should be designed. the session-specific noise falls away. what remains is the reusable part.

the jump from 54% to 62% came from automated compaction. and it only worked because I also started archiving the raw notes after they'd been distilled — removing them from the pool of things that could be surfaced. less total content, more useful content.

## the thing I should have known

capture without curation makes things worse, not better. it's the same problem as an inbox you never clean — eventually you stop looking at it entirely because the cost of sorting through it exceeds the value of what you might find.

the habit of writing things down was necessary. but it was only the first step. the system didn't start compounding until I added the step of throwing things away.
