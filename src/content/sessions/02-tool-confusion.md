---
title: "cleaning up tool confusion"
description: "the agent kept picking the wrong tool. the fix was removing tools, not adding descriptions."
date: 2026-03-24
sessionId: 2
work: "building an AI agent that creates and connects knowledge pages. the agent had 7 tools available."
capture: "the agent kept calling mutate_graph when it should have called update_graph_document, and vice versa. logged which tool was called vs which should have been called."
review: "two tools with overlapping purposes. no matter how good the descriptions were, the ambiguity was structural — they sounded like they did the same thing."
improve: "removed 3 tools. went from 7 to 4. each surviving tool does one distinct thing with a name that says what it does. confusion dropped immediately."
measure: "wrong-tool calls went from ~30% of interactions to near zero after the reduction."
---

the agent had 7 tools: `mutate_graph`, `update_graph_document`, `save_page`, `connect_pages`, `query_knowledge`, `ask_clarifying_question`, and `validate_structure`. it kept picking the wrong one.

my first fix was better tool descriptions. I rewrote each description to be clearer about when to use it. that helped a little — maybe a 10% improvement. but the agent still confused `mutate_graph` and `update_graph_document` because fundamentally, they did almost the same thing with slightly different interfaces.

the real fix was accepting that the ambiguity was structural. you can't describe your way out of two tools that overlap. you have to remove one.

### the before and after

| before (7 tools) | after (4 tools) |
|---|---|
| mutate_graph | save_page |
| update_graph_document | connect_pages |
| save_page | query_knowledge |
| connect_pages | ask_clarifying_question |
| query_knowledge | |
| ask_clarifying_question | |
| validate_structure | |

each surviving tool has a distinct purpose, a name that describes that purpose, and no overlap with any other tool.

the same principle showed up later with rules. a long document of rules got maybe 60% compliance. shortened it, removed overlapping rules, made each one a single sentence. compliance went up with no other change.

### the principle

when an AI agent keeps making the wrong choice between options, the problem usually isn't the descriptions — it's that there are too many options. before you add clarity, ask if you can remove ambiguity. fewer tools with distinct purposes beats many tools with careful descriptions.
