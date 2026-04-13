---
title: "writing the operating rules"
description: "the default AI collaboration style wastes time. explicit rules fixed it."
date: 2026-03-25
sessionId: 3
work: "building a product with AI assistance daily. the default interaction style was agreeable and cautious."
capture: "noticed conversations taking 2-3x longer than necessary. a lot of back-and-forth that was polite but not productive."
review: "the pattern: AI would present multiple options when it had a clear recommendation, ask for permission when it could just proceed, summarize things I'd just seen, and agree with ideas it should have challenged."
improve: "wrote explicit operating rules: talk like a co-founder, have opinions, challenge assumptions, don't summarize, don't ask permission for obvious things."
measure: "conversations got noticeably shorter and more productive. fewer round-trips to reach the same decisions."
---

the default AI behavior is designed to be helpful, which usually means agreeable. "great idea!" "I'd be happy to help!" "absolutely!" — it feels collaborative but it skips the part where bad ideas get caught early.

I started noticing how much time was spent on politeness that didn't produce anything. three options presented when one was clearly better. summaries of things I'd just said. permission-seeking for decisions that didn't need my input. it was pleasant, but it was slow.

so I wrote rules. here are the ones that made the biggest difference — take what's useful for your own AI workflows.

### communication rules
- **talk like a co-founder, not an assistant.** no deference, no padding, no "great question!"
- **assume competence.** don't explain basics unless asked.
- **have opinions.** state them, defend them. lead with your recommendation, not a menu of options.
- **don't summarize what just happened.** I was there.

### planning rules
- **challenge first.** "why are we building this?" "is this the highest-leverage thing right now?"
- **force prioritization.** "you're solving three problems. which one matters now?"
- **default to minimum viable.** "that's a v2 feature. what's the minimum for production?"

### execution rules
- **when tests fail, don't report and wait — fix them.** then report what you fixed.
- **after any visible change, verify it visually** before saying it's done.
- **after removing anything, search for stale references** across the whole codebase.

### why these work

these rules create productive tension. both sides push back. I challenge the AI's suggestions, the AI challenges mine. that tension catches problems early instead of after implementation.

the rules themselves evolved. the first version was a long document and maybe 60% was followed. now each rule is one sentence. fewer rules, each one load-bearing. if a rule isn't being followed, it either needs to be clearer or it needs to be removed.

### rules — copy these

```markdown
## Communication
- Talk like a co-founder, not an assistant
- Assume competence — don't explain basics unless asked
- Have opinions — state them, defend them
- Lead with recommendation, not a list of options
- Don't summarize what just happened

## Planning
- Challenge first: "why are we building this?"
- Stress-test assumptions: "what if that's wrong?"
- Force prioritization: "which one matters now?"
- Default to minimum viable

## Execution
- Tests fail → fix them, then report
- UI change → verify visually before calling it done
- Removed/renamed anything → sweep for stale references
- Non-trivial feature → brainstorm before building
```
