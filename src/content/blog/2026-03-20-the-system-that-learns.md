---
title: "the system that learns"
description: "9 out of 10 work sessions now reuse something from a previous one. here's the mechanism."
pubDate: 2026-03-21
loop: "measure"
---

the notes system started as storage. write things down, search when needed. most notes were never found again. it was better than nothing, but not by much.

the shift was deciding to measure it. I asked a simple question: what percentage of work sessions actually reuse something from a previous one? the first measurement was close to zero. every conversation was essentially starting from scratch, even though hundreds of notes existed.

## how the system works now

**capture:** after each work session, a summary gets written automatically — what happened, what worked, what failed, what was decided. this is the raw material.

**promote:** raw session notes pile up. periodically they get clustered by theme and compressed into lessons. a lesson is a distilled insight — shorter, clearer, stripped of the session-specific noise. "don't give agents overlapping tools" is a lesson. the conversation where I figured that out is a session note.

**surface:** before any new conversation starts, the system loads relevant lessons and recent decisions. the conversation begins with context instead of a blank slate.

**prune:** notes that never get referenced get archived over time. notes that keep getting referenced float up. the signal-to-noise ratio improves automatically.

## the metric

the number I track is simple: what percentage of work sessions pulled something useful from a previous one? it started near zero. now it's 88%. nine out of ten conversations build on something a previous conversation captured.

that number made the whole system real. without it, "the notes are useful" is just a feeling. with the number, it either goes up or it doesn't — and when it doesn't, that's a signal to look at what's broken.

## if you want to try this

you don't need my specific setup. the core idea is:
1. **write down what happened** after each meaningful work session
2. **make the system read it back** before starting the next one
3. **measure reuse** — are previous notes actually being used, or just sitting there?

the tooling can be as simple as a markdown file that gets loaded at the start of each conversation. what matters is the habit of capture and the feedback loop of measurement.
