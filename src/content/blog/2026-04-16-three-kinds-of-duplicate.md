---
title: "three kinds of duplicate"
description: "an audit found eight problems. only one was the problem it looked like."
pubDate: 2026-04-16
loop: "capture"
---

there's a session type I run periodically where the goal isn't to build anything. the goal is to map what's broken.

this week I ran one across the whole app surface. not looking for a specific bug, just walking every feature region and asking: is this confusing? does it do what a user would expect? what would throw someone off?

I found eight things. the one that stuck with me was labeled "duplicate buttons."

## it looked like one problem

in one workspace, a toolbar was rendering the same button twice side by side. pretty obvious visual glitch. my first instinct was: find the conditional block, tighten the scope, move on.

but it wasn't one problem. it was three different problems that all looked like "duplicate" depending on where you were looking.

**UI drift.** The toolbar was showing the same button twice because a conditional block — originally scoped to one workspace — had accidentally leaked into another. Pure visual regression. No data harm. Easy fix.

**Silent data corruption.** The connect-by-drag feature assumed every connection was within the same flow. It wasn't. When someone dragged a connection between two different flows, the code wrote orphan entries referencing steps that didn't belong to the source flow. Looked fine visually. Data was quietly wrong. The "duplicate" symptom here wasn't even on-screen — it was in the data model, producing inconsistency that would surface later in unpredictable ways.

**State fragmentation.** An old store had been created before dedicated per-domain stores existed. As the app evolved, a new store was added. The original never got removed. Two stores now tracked the same field. Source of truth depended on which code path ran last. "Duplicate state" is its own failure mode — it doesn't look wrong until it is, and then it's hard to trace.

Three bugs, one symptom word.

## what the audit made possible

if I'd fixed the visual glitch and moved on, two of the three problems would still be there.

the audit is what let me see all of them, because the audit doesn't fix things. it maps them. you walk the surface, note what's wrong, and — crucially — you resist the urge to fix it while you're mapping. fixing while auditing breaks the audit. you stop seeing the shape of the problem set and start solving specific instances.

once the map exists, you can categorize. visual regression → cheap. data corruption → expensive, high severity. state fragmentation → medium. you sort by cost. you do them in order.

this is also when you discover that three bugs you thought were the same bug are actually three different bugs. and you stop treating them the same way.

## the thing worth carrying

the word "duplicate" doesn't describe a problem. it describes a symptom.

the diagnosis — is this UI drift, data corruption, or fragmented state? — is what tells you what to actually do. UI drift you can patch in an afternoon. silent data corruption requires tracing every call site, writing a migration, adding guards. fragmented state requires understanding who owns what and deleting the thing that doesn't.

same symptom, three structurally different fixes.

the audit made that visible. a normal bug report wouldn't have.

## take with you

the next time you see something recurring — the same kind of problem surfacing in several places — try mapping before fixing. collect all the instances. resist the urge to fix the first one you see.

once you have all of them in view, ask: is this one problem or several problems that share a symptom? the classification usually becomes obvious. and the classification changes what you do next.
