---
title: "fewer tools, not more"
description: "7 overlapping tools confused the agent. 4 clean ones fixed it."
pubDate: 2026-03-24
---

the agent kept calling the wrong tool. mutate_graph vs update_graph_document — both sounded like they did the same thing. because they almost did.

first fix was better tool descriptions. helped a little. the real fix was removing 3 tools entirely. went from 7 to 4. each one does one thing, named for what it does.

the instinct when something doesn't work is to add. add a fallback, add a retry, add another option. but the agent doesn't need options — it needs clarity. one tool per job, a name that says what it does, a description that guides usage.

same pattern showed up later with rules. the first version of the operating rules was a wall of text. the agent followed maybe 60% of it. shortened it, made each rule one sentence, removed the ones that overlapped. compliance went up without any other change.

fewer, clearer, distinct. it keeps being the answer.
