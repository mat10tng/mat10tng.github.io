---
title: "logs -> rules"
description: "the logic for graduating project-specific fixes into permanent engineering standards."
pubDate: 2026-04-08
loop: "improve"
---

Standards do not emerge in a vacuum. They begin as specific patches for recurring problems. The mechanism for improving a system is to identify when a local fix has universal utility.

## The Graduation Mechanism

When something fails during a session, the process follows a linear path toward becoming a standard:

1.  **Detection**: A recurring technical friction point is identified (e.g., agents selecting ambiguous tools).
2.  **Local Fix**: A project-specific rule is implemented to handle the immediate instance.
3.  **Cross-Context Utility**: The same fix is found to solve similar problems in unrelated projects.
4.  **Graduation**: The logic is moved from the project directory to the global standards directory.

## Rationale

Right now, the system maintains approximately 80 global rules. Very few were written upfront. Most are the result of observing patterns of reuse across multiple projects.

If a piece of logic is referenced frequently across different contexts, it is a signal of high utility. By moving it to the global layer, you ensure that every future session inherits that lesson automatically.

## Technical Insight

Do not attempt to predict which standards will be universal. Record logic where it occurs. Let the pattern of reuse dictate which rules graduate to the global level.
