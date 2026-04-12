---
title: "fewer tools, not more"
description: "7 overlapping tools confused everything. 4 clean ones fixed it. here's the principle."
pubDate: 2026-03-24
loop: "work"
---

the agent kept calling the wrong tool. `mutate_graph` vs `update_graph_document` — both sounded like they did the same thing. because they almost did.

my first fix was better tool descriptions. that helped a little, but the real problem was structural. when two tools have overlapping purposes, no amount of description fixes the ambiguity. the agent has to guess which one you meant, and it guesses wrong often enough to matter.

the real fix was removing 3 tools. we went from 7 to 4:

| before (7 tools) | after (4 tools) |
|---|---|
| mutate_graph | save_page |
| update_graph_document | connect_pages |
| save_page | query_knowledge |
| connect_pages | ask_clarifying_question |
| query_knowledge | |
| ask_clarifying_question | |
| validate_structure | |

each surviving tool does one thing, has a name that says what it does, and doesn't overlap with any other. the agent stopped guessing.

## the principle

the instinct when something doesn't work is to add. add a fallback, add a retry, add another option. but agents don't need options — they need clarity. more tools means more ambiguity about which one to use. fewer tools with distinct purposes means fewer wrong choices.

the same pattern showed up later with rules. the first version of the operating rules was a long document. the agent followed maybe 60% of it. I shortened it, made each rule one sentence, removed the ones that overlapped. compliance went up without any other change.

## when to apply this

if an AI agent is choosing the wrong action, before you add anything, ask: can I remove something instead? are there two things that do almost the same job? can they be merged or can one be eliminated?

fewer, clearer, distinct. it keeps being the answer.
