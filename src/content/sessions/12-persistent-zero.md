---
title: "the persistent 0%"
description: "a metric nagged for 3 weeks straight. measurement doesn't fix problems — it nags until you act."
date: 2026-04-05
sessionId: 12
work: "normal development. the system was running self-assessments every 10 sessions and on every scheduled health check."
capture: "every single self-assessment flagged the same issue: capture_completeness at 0%. for 3 weeks. across 12 separate assessments."
review: "the metric existed. the flag existed. the issue was logged every time. nobody fixed it. the system was nagging correctly — but nagging isn't fixing."
improve: "eventually added outcome tracking to session captures. the metric climbed from 0% to 17%. still below the 50% threshold, but moving."
measure: "0% for 3 weeks → 17% after the fix. still flagged as below threshold. the nag continues."
why: "a metric nagged for 3 weeks and nothing happened. measurement alone doesn't fix things — this is the escalation framework that makes metrics actionable."
---

### take with you

```markdown
## Metric escalation

If a health metric has been flagged for:
- 1 assessment → note it
- 3 assessments → surface it in session briefings
- 5+ assessments → make it the first thing the next session sees
- 10+ assessments → block new work until addressed (or consciously deprioritize with a reason)

Measurement without escalation is just record-keeping.
```

here's every self-assessment that flagged capture_completeness:

| date | assessment | value | status |
|---|---|---|---|
| march 20 (session 0) | first check | 0% | ❌ |
| march 20 (session 5) | second check | 0% | ❌ |
| march 20 (session 10) | third check | 0% | ❌ |
| march 21 | daily update | 0% | ❌ |
| march 23 | weekly health | 0% | ❌ |
| march 23 (session 30) | | 0% | ❌ |
| march 24 | daily update | 0% | ❌ |
| march 24 (session 40) | | 0% | ❌ |
| march 24 (session 50) | | 0% | ❌ |
| march 25 (session 60) | | 0% | ❌ |
| march 26 | monthly clean | 0% | ❌ |
| april 1 | monthly clean | 0% | ❌ |
| april 12 (session 290) | | 17% | ❌ (still below 50%) |

twelve ❌ marks in a row. three weeks. the system was working exactly as designed — it detected the problem, flagged it, logged it, and reported it. every single time.

nothing happened for three weeks.

### why metrics don't fix things

the metric was right. capture_completeness measures whether session captures include an outcome field (success, struggled, failed, abandoned). zero sessions had it. the system was capturing sessions but not recording whether they went well.

the metric flagged it correctly. the weekly health check repeated the flag. the monthly deep clean repeated it again. the system even generated an improvement idea about it.

but generating the flag isn't generating the fix. someone has to actually change the capture process to include the outcome field. the system can nag. it can't act.

### what eventually happened

after 3 weeks of ❌, the session capture was updated to include an outcome field. not hard — just hadn't been prioritized. the metric went from 0% to 17%. still below the 50% threshold. still flagged. but moving.

the nag continues. that's correct — 17% isn't good enough. the system will keep flagging it until it crosses 50%.

### the principle

measurement is necessary but not sufficient. a metric that nags you for 3 weeks isn't broken — it's working. the problem is on the human side: seeing the flag and not acting on it. 

the insight isn't "automate the fix." some fixes require judgment about when and how. the insight is: if a metric has been red for 3+ assessments, escalate it. make it louder. put it at the top of the next session's briefing. the nag should get more insistent over time, not stay the same volume.

