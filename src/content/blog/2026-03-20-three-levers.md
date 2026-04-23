---
title: "the three levers"
description: "a diagnostic framework for debugging agent behavior. find the root cause in minutes."
pubDate: 2026-03-20
loop: "work"
---

When an AI agent deviates from expected behavior—creating duplicates, using incorrect tools, or extracting imprecise data—the resolution rarely lies in the agent's core code. Diagnosis follows a pattern involving three primary levers.

## The Three Levers

**1. The Prompt** (Instruction) — If the agent is capable of an action but fails to execute it, the instruction set is insufficient. If it performs a prohibited action, an explicit constraint is required. Models often fail to infer intent; mandatory rules ("you MUST") are more effective than stylistic suggestions ("it would be nice if").

**2. The Tools** (Capability) — Redundant or overlapping tools cause structural ambiguity. If two tools perform similar functions, the model is forced to guess, leading to inconsistent choices. Reliability is achieved by reducing the toolset to a collection of clear, distinct, and uniquely named functions.

**3. The Constraints** (System Environment) — System limits can prevent task completion. An agent with a small iteration budget may exhaust its resources on content generation, leaving no room for validation or connection. Automation of deterministic tasks (like metadata updates) removes this overhead.

## Diagnostic Order

When behavior issues occur, investigate in this sequence:

1.  **Instruction Check**: Does the prompt contain a mandatory rule for this case?
2.  **Tool Check**: Are the available tools distinct and unambiguous?
3.  **System Check**: Is the environment (budgets, automation) preventing success?

Most agent behavior issues trace back to one of these three levers. Diagnosis typically occurs in minutes once the search is localized to these structural areas.

## Core Principle

Avoid delegating tasks to an agent that a system can perform automatically. An agent's primary utility is judgment and generation; everything else—bookkeeping, connections, validation—should be handled by the surrounding architecture.
