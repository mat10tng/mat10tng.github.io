---
title: "the three levers"
description: "a diagnostic framework for debugging agent behavior. find the root cause in minutes."
pubDate: 2026-03-20
loop: "work"
---

early on, the AI agent kept doing the wrong thing. creating duplicate pages. using the wrong tool. extracting too much from a conversation, or too little. my initial approach was always to look at the code — maybe there's a bug in the agent logic.

wrong approach. after enough rounds of debugging, I realized the fix was never in the agent code itself. it was always one of three things.

## the three levers

**1. the prompt** — what you're telling the agent to do. if the agent CAN do something but doesn't, you need an explicit instruction. if it does something wrong, you need an explicit prohibition. the key insight: agents don't infer intent from context the way you'd hope. you have to be specific. "you MUST do X" works. "it would be nice if you did X" doesn't.

**2. the tools** — what the agent has available. we had 7 tools with overlapping purposes. the agent kept picking the wrong one because several of them sounded like they did the same thing. my initial approach was to write better descriptions. wrong fix — the real problem was structural ambiguity. we removed 3 tools entirely. four tools, each with a distinct name and clear purpose. confusion dropped immediately. ([the full story](/blog/2026-03-24-fewer-tools))

**3. the constraints** — what the system allows. the agent had a 10-iteration budget per conversation. it would spend 8 iterations creating content and only have 2 left for connecting things together. the graph was always incomplete — not because the agent was bad, but because the system didn't give it room to finish. we raised the budget, then went further and automated the connections entirely.

## the decision tree

when something goes wrong, I check in this order:

1. **does the prompt tell it what to do?** → add a mandatory rule or prohibition
2. **are the tools clear and distinct?** → reduce overlap, rename for clarity
3. **is the system preventing success?** → check limits, automate what the agent shouldn't have to do manually

I haven't found a fourth lever. every agent behavior issue I've hit in months of daily work traces back to one of these three. the diagnosis usually takes under 5 minutes once you know where to look.

## the deeper principle

don't make the agent do work the system can do automatically. if the agent keeps running out of budget connecting things, automate the connections. if the agent keeps picking the wrong tool, you have too many tools. the agent's job is judgment and generation — everything else should be handled by the system around it.
