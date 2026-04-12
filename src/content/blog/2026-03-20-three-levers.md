---
title: "three levers"
description: "when the AI misbehaves, it's always one of three things. never the code."
pubDate: 2026-03-20
loop: "work"
---

early on the agent kept doing the wrong thing. creating duplicate pages. using the wrong tool. extracting too much or too little. my first instinct was always to look at the code.

wrong instinct.

after enough rounds I noticed it's always one of three levers:

**the prompt.** if the agent CAN do something but doesn't, add an explicit rule. if it does something wrong, add an explicit prohibition. no implicit expectations — the agent doesn't read minds.

**the tools.** we had 7 overlapping tools and the agent kept picking the wrong one. cut it to 4 with distinct names and clear descriptions. confusion dropped immediately.

**the constraints.** the agent had a 10-iteration budget. 8 iterations went to creating pages, leaving 2 for connecting them. the graph was always incomplete. raised the budget, then automated the connections entirely — the system parses the content and builds the graph. don't make the agent do work the system can do.

three levers: prompt, tools, constraints. when something goes wrong, check in that order. I haven't found a fourth.
