---
title: "one place, not twelve"
description: "rules in 3 files meant 3 versions of the truth. consolidated to one."
date: 2026-04-02
sessionId: 5
work: "normal development across multiple projects. each project had its own config files, memory files, and notes."
capture: "reviewed a week of conversations and found contradictory behavior — the system was following different versions of the same rule depending on which file loaded first."
review: "rules existed in config files, memory files, and the notes system. same rule, three versions, none matching. which version won depended on load order."
improve: "decided one system is the source of truth. config files became thin pointers. memory files became indexes. all actual rules live in one searchable, versioned place."
measure: "contradictory behavior disappeared. rule updates now happen in one place and propagate everywhere."
why: "if your rules or notes live in multiple places, they will drift and contradict each other. this is the architecture that prevents it."
---

### take with you

```markdown
## Knowledge architecture

Config file (loaded every session):
  - "Search the notes before starting any work"
  - 5-6 hard-stop rules only (things that cause damage before notes load)
  - Nothing else

Notes system (the source of truth):
  - All rules, decisions, lessons, workflows
  - Searchable, versioned, archivable
  - Types: session, fix, decision, lesson, workflow, rule, skill

Hard-stop rule criteria (all must be true):
  1. Applies to every session regardless of task
  2. Violating it before notes load would cause real damage
  3. Can't be found fast enough through search
```

at some point I had the same rule in three places: a config file, a memory file, and the notes system. each one was slightly different because they'd been updated at different times.

I only caught it because I pulled up a week of conversations and compared the rules each one was following. same starting conditions, different behavior, no obvious reason why. turns out it depended on which file got loaded first.

### the structure that works

```
config file (loaded every session):
  → "load rules from the notes system first"
  → 5-6 hard-stop rules (things that can't wait)
  → nothing else

memory files:
  → pointers to notes, never content

notes system (the source of truth):
  → all rules, decisions, lessons
  → searchable, versioned, can be archived
```

### what qualifies as a hard-stop rule

a rule only belongs in the config file if ALL of these are true:
1. it applies to every conversation regardless of task
2. violating it before the notes load would cause real damage
3. it can't be discovered fast enough through a search

examples: "never run the command that destroys the database." "always load notes before starting."

everything else — communication preferences, planning workflows, debugging approaches — lives in the notes system where it's discoverable when relevant.

### the principle

duplication feels organized. "I'll put it here AND there, just to be safe." but duplication creates drift, and drift creates contradictions, and contradictions create unpredictable behavior. one source of truth, everything else points to it.

