---
title: "prompting is a smell; engineering is the cure"
description: "if you are spending your day perfecting adjectives in a chat box, you are fighting the wrong battle. we don't need smarter models; we need better systems."
pubDate: 2026-04-23
loop: "improve"
---

The world is currently obsessed with "prompt engineering." There are libraries of "golden prompts," magic incantations, and people spending hours trying to find the exact combination of adjectives that will stop a model from hallucinating a variable name.

I think prompting is a smell. 

If you have to prompt an AI perfectly every time to get a good result, your system is fragile. If your success depends on your ability to be a "whisperer," you haven't built a workflow; you've built a superstition.

## The Prompting Trap

When an AI fails, our first instinct is to "fix the prompt." We add more instructions. We add "be concise" or "think step-by-step." 

The prompt gets longer. The context window gets crowded. The AI gets distracted by its own instructions. Eventually, the instructions contradict each other, and the model drifts. This is "Prompt Debt," and most teams are drowning in it.

The problem isn't the model's intelligence. The problem is that we are asking the model to carry too much weight. We are asking it to be the developer, the architect, the librarian, and the quality assurance tester all in one go, with no external memory and no safety rails.

## The Engineering Cure

In my work, I don't "prompt" my way out of problems anymore. I **engineer** my way out of them.

When the system fails, I ask: **Where is the structural gap?**

1.  **If the AI forgets a decision:** I don't give it a better reminder. I build a **Knowledge Base** that it is *required* to search before it speaks.
2.  **If the AI makes a bookkeeping error:** I don't ask it to "be more careful." I **transfer responsibility** to a script or a backend service that handles the logic deterministically.
3.  **If the AI gets worse over time:** I don't restart the chat. I run a **Distillation** process that compresses the noise of the last ten sessions into three permanent rules.

## The "1,800 Note" Evidence

This isn't theory. I currently work with a system that manages over **1,800 notes** and **80+ global rules**. 

My "prompts" are actually very short. Why? Because the **Architecture** does the heavy lifting. The model doesn't have to "remember" how I like my CSS structured—the system loads that rule from the Knowledge Base automatically. It doesn't have to "try not to duplicate IDs"—the Bridge enforces that via the filesystem.

We have moved from **Adjective Engineering** to **System Engineering.**

## How to Help the World Start

If you are a developer feeling the "AI Fatigue," stop looking for better prompts. Start looking for better boundaries.

*   **Stop Admonishing:** Instead of "Don't use library X," create a `lessons/` folder where library X is documented as deprecated.
*   **Stop Reminding:** Instead of "Remember we use Y for auth," put that in a `CLAUDE.md` that the model reads at every bootup.
*   **Start Distilling:** After every hour of work, don't just close the tab. Ask the AI: "What did we learn that should be a permanent rule?" and save that to a file.

The goal isn't to talk to the AI better. The goal is to build a system that makes the AI smarter than it actually is. 

We aren't whisperers. We are architects. It’s time we started building like it.
