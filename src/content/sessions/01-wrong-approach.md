---
title: "stopping the wrong-approach pattern"
description: "47 conversations went sideways because nobody confirmed the plan first."
date: 2026-04-02
sessionId: 1
work: "building features daily, shipping fast. conversations would start and immediately dive into code."
capture: "reviewed a month of session notes. 47 out of ~80 conversations had the same shape — started coding, realized the approach was wrong, had to back up and restart."
review: "the common thread was obvious once I looked: no upfront alignment. nobody confirmed which files, which approach, which assumptions before writing the first line."
improve: "added one rule — before writing code, state the files you'll change, the approach you'll take, and your assumptions. wait for confirmation. next month: 3 conversations went sideways instead of 47."
measure: "47 → 3. the rule stuck and now every future conversation inherits it automatically."
---

this was the session that convinced me the process itself matters more than any individual fix.

I was shipping features every day, moving fast. conversations would start with "fix this bug" or "add this feature" and immediately dive into code. most of the time it worked. but when it didn't work, it really didn't work — 20-30 minutes down the wrong path before realizing the approach was wrong, the target file was wrong, or the assumptions about the current state were off.

I didn't notice how often this was happening until I pulled up a month of session notes and just read through the outcomes. success, struggled, success, struggled, struggled, success. the "struggled" ones all had the same shape.

the fix was almost embarrassingly simple: before writing any code, state three things out loud. what files will change. what approach you're taking. what you're assuming about the current state. then wait 10 seconds for a confirmation.

that's it. no new tooling, no architectural change. just a pause point. 10 seconds of alignment saves 20 minutes of wrong-direction work.

the rule graduated from this project to a global rule within two weeks because the same pattern showed up everywhere.

### if you want to try this

before any non-trivial implementation, write down:
1. **what files** you're going to change and why
2. **what approach** you're taking (not what you're building — how you're building it)
3. **what you're assuming** about the current state (which branch, which database, which component)

then pause. read it back. does it still make sense? if any assumption is ambiguous, ask rather than guess. the cost of asking is 10 seconds. the cost of guessing wrong is 20+ minutes.

### rule — copy this

```markdown
## Before coding

Before implementing anything, state:
1. What files will change and why
2. What approach will be taken
3. Any assumptions about the current state

Wait for confirmation before writing code.
If any assumption is ambiguous, ask — don't guess.
```
