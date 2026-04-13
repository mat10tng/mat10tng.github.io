---
title: "rules for both sides"
description: "the system doesn't just shape the AI. it shapes me too — compensating for my own weaknesses."
date: 2026-04-13
sessionId: 13
work: "months of daily collaboration. rules accumulated for how the AI should behave — be direct, challenge assumptions, don't gold-plate."
capture: "noticed that every rule was about the AI's behavior. but many of them existed because of MY patterns — jumping to code, losing track, overbuilding."
review: "the 'state your assumptions' rule isn't really about the AI. it's about me. I'm the one who dives into implementation without confirming the plan. the rule forces a pause that I wouldn't take on my own."
improve: "started encoding preferences and weaknesses explicitly — visual learner, direct communication, needs evidence not feelings, tends to overbuild. now every session adapts to how I actually work, not a generic default."
measure: "sessions feel more productive. less time spent on misalignment, less friction from wrong communication style, fewer dead-end implementations."
---

### take with you

```markdown
## Rules for the human (encoded as AI instructions)

Weakness: jumping to code
→ Rule: state files, approach, assumptions before writing any code

Weakness: skipping exploration
→ Rule: always brainstorm before building. no exceptions.

Weakness: overbuilding
→ Rule: default to MVP. "that's v2" is a valid response.

Weakness: ignoring constraints
→ Rule: check the spec before editing any governed file

## Communication preferences (also encoded as AI instructions)

- I'm a visual learner → show diagrams, not text walls
- I process insight first → lead with the story, data in support
- I don't like hedging → be direct, no qualifiers
- I don't need summaries → I was there, skip the recap
- I want to be challenged → "why are we building this?" is welcome
```

most of the rules in the system are written as instructions for the AI: "be direct," "challenge assumptions," "don't summarize what just happened." they read like they're shaping the AI's behavior.

but look closer and many of them are actually about me.

### rules that compensate for my weaknesses

**"state your files, approach, and assumptions before coding"** — this exists because I jump to code. not the AI — me. I see a problem and I want to start building immediately. the rule forces a 10-second pause that I wouldn't take on my own. it's formatted as an instruction to the AI, but it's a constraint on my impulse to skip straight to implementation.

**"always brainstorm before building"** — same pattern. I tend to skip the exploration phase because I feel like I already know the answer. this rule caught 47 wrong-approach conversations in a single month. the brainstorming step exists because I need it, not because the AI does.

**"default to MVP, block gold-plating"** — I overbuild. I want the full solution, the elegant design, the complete coverage. these rules push back on that. "that's a v2 feature. what's the minimum for production?" is something I need to hear regularly.

**"check the spec before editing"** — I tend to dive into files without checking what constraints exist. specs protect code from being changed in ways that violate the design. the rule exists because I forget to look.

### rules that encode how I learn

**"I'm a visual learner — show diagrams"** — not a behavioral constraint but a communication preference. when the AI explains something in paragraphs of text, I lose it. when it draws a diagram, I get it immediately. encoding this means every session knows to use visuals without me asking.

**"don't hedge, don't filler, be direct"** — I waste time decoding polite AI language. "it might be worth considering whether perhaps..." = "do this." the directness rules save me from having to translate AI-speak into actionable information.

**"insight first, data supports"** — I don't process raw numbers well. I process stories with data as evidence. this shapes how the AI presents information to me — lead with the insight, put the numbers in support.

**"don't summarize what just happened"** — I was there. reading a summary of what I just said feels like a waste of time. this rule reclaims minutes per session.

### the principle

the system shapes both sides. some rules constrain the AI. some rules constrain me. and the most interesting ones do both — the "brainstorm first" rule is technically an AI instruction, but it exists because of a human tendency.

this is what makes it a collaboration, not a tool. a tool does what you say. a collaborator pushes back when you're about to make a mistake you've made before. the rules are the encoded form of that pushback — for both directions.

