---
title: "transferring responsibility"
description: "moving logic from probabilistic AI to deterministic code. the fix for hallucinations."
pubDate: 2026-04-17
loop: "capture"
---

A recurring pattern in system failure: when a component consistently fails a task, the problem is often an incorrect assignment of responsibility. 

The standard approach is to provide more context or clearer instructions to the AI. However, reliability is often achieved by removing the task from the AI entirely and transferring it to a deterministic part of the system.

## The failure of instruction

A common example involves the creation of duplicate page IDs or orphan nodes in a canvas system. Even with clear instructions and a full inventory of existing pages in the context, a probabilistic model can still fail. 

The fix is not a better prompt. The fix is a backend validation script that enforces uniqueness and parent-child relationships. Once the responsibility moves from the agent to the code, the failure state disappears.

## The primary question

When a system fails, the question is not "How can the agent do this better?" but "Should the agent be doing this at all?"

| Failure Type | Correct Owner | Rationale |
|---|---|---|
| **Bookkeeping** (IDs, counts, inventory) | System/DB | Deterministic tasks require 100% precision. |
| **Enforcement** (Linting, type checks) | CI/Scripts | Humans and AI are both probabilistic at enforcement. |
| **Logic Branches** (If X then Y) | Code | Structural logic should be encoded, not prompted. |
| **Context Synthesis** (Brainstorming, drafting) | Agent | Non-deterministic tasks are the agent's core strength. |

## Verification

Success is measured by the cessation of the specific failure pattern. If a backend service handles node cleanup, the agent can no longer "forget" to do it. The system becomes simpler and more reliable than one that relies on continuous prompting.

## Technical Insight

When a component keeps failing, before attempting optimization, verify whether that component should own the responsibility. Transferring the job is more effective than refining the instruction.
