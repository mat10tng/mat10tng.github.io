---
title: "files -> a vault"
description: "how to build a zero-code knowledge system using your local file system and project bootloaders."
pubDate: 2026-04-23
loop: "work"
---

The baseline implementation of a knowledge system doesn't require a server or a database. It requires a disciplined file structure and a way to force the AI to interact with it.

Here is the functional setup for a local vault.

## 1. The Structure

Organize your vault into two primary layers: **Global** (standards for all work) and **Projects** (context for specific tasks).

Each project requires two directories:
- **`sessions/`**: Stores raw logs of what occurred, what was decided, and what failed.
- **`lessons/`**: Stores distilled, reusable logic extracted from sessions.

```text
~/vault/
├── global/
│   ├── lessons/ (global standards)
│   └── sessions/
└── project-x/
    ├── sessions/ (daily session logs)
    └── lessons/ (project-specific logic)
```

## 2. The Bootloader (CLAUDE.md)

Automation starts with the project configuration. In your `CLAUDE.md`, define the system's operating environment:

```markdown
# The Knowledge System
- **Log:** After every significant change, record the technical outcome to `~/vault/project-x/sessions/[date]-[goal].md`.
- **Content:** Include: attempted approach, technical result, and any new logic discovered.
- **Context:** Always read `~/vault/global/lessons/` and `~/vault/project-x/lessons/` before starting work.
```

By defining these paths, you ensure the model initializes with the necessary context every time a session starts.

## 3. The Retrieval Skill (/apply-from-vault)

To ensure the model is synchronized with your latest standards, use a direct command to trigger a context refresh:

**"Run /apply-from-vault: Read all lessons in my vault directories and update your operating logic."**

This forces the model to fetch and internalize the documentation it previously generated.

## 4. Maintenance (Distillation)

Raw session logs contain high noise. To maintain system performance, you must periodically compress these logs.

1. Review the recent session notes.
2. Extract the high-signal logic.
3. Save these as permanent rules in the `lessons/` directory.

## Rationale

The MCP bridge makes this faster, but the **discipline of capture** is the core mechanism. If you start with folders, you'll understand exactly what you want your tools to automate later.

Initial setup: Create the folders, write the `CLAUDE.md` rule, and stop losing what you learn between sessions.
