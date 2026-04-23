---
title: "the basic vault"
description: "you don't need a server to start. how to build the system with just folders and a few rules."
pubDate: 2026-04-23
loop: "work"
---

I get asked this often: do I need to build a custom MCP server just to start working like this?

The answer is no. My own system uses a bridge and a database now, but it started as a collection of folders on my laptop. You can get 80% of the benefit with nothing but a disciplined file structure and a few lines in your `CLAUDE.md`.

Here is the "beginner edition" of the system.

## 1. The Structure

The "Vault" is just a directory on your computer. It has two main layers: **Global** (rules that apply to everything) and **Projects** (knowledge specific to what you're building right now).

Inside each project, you need two folders:

- **`sessions/`**: This is where raw captures go. Every time you finish a task, you (or Claude) write a summary of what happened, what worked, and what failed.
- **`lessons/`**: This is where you distill sessions. If a bug keeps appearing, or a specific workflow works perfectly, it gets moved here as a permanent lesson.

```text
~/vault/
├── global/
│   ├── lessons/ (rules for all coding)
│   └── sessions/
└── project-x/
    ├── sessions/ (raw captures from today)
    └── lessons/ (distilled project-specific rules)
```

## 2. The Bootloader (CLAUDE.md)

To make this automatic, you have to tell Claude that this system exists. In your project's `CLAUDE.md` (the file Claude reads at the start of every session), add a section like this:

```markdown
# The Knowledge System
- **Capture:** After every significant change or at the end of the session, summarize the work into `~/vault/project-x/sessions/[date]-[time]-[goal].md`.
- **Content:** Include: what we tried, why it worked/failed, and any new rules we discovered.
- **Context:** Always check `~/vault/global/lessons/` and `~/vault/project-x/lessons/` before starting new work.
```

Now, Claude knows where to save the learning. You don't have to remember to do it; it's part of its "job description."

## 3. The Skill (/apply-from-vault)

You can create a "skill" (or just a shortcut in your head) to force a context refresh. When you start a new chat, run a command like this:

**"Run /apply-from-vault: Read all lessons in my vault folders and update your operating instructions accordingly."**

Because you've defined those paths in `CLAUDE.md`, Claude will go and fetch your hard-won lessons from previous days. It will "remember" the bugs you fixed last week because it's reading the documentation you forced it to write.

## 4. The Maintenance (Distillation)

The most important part of the system is the loop. Raw sessions are noisy. Once a day (or once a week), you should have a "distillation session."

1. Open a new chat.
2. Ask Claude: "Read these 5 session notes from yesterday. What are the 3 most important lessons? Write them as new files in the `lessons/` folder and archive the sessions."

This is how the system improves. You compress the noise into high-signal rules.

## Rationale

The MCP bridge makes this faster, but the **discipline of capture** is the core mechanism. If you start with folders, you'll understand exactly what you want your tools to automate later.

Initial setup: Create the folders, write the `CLAUDE.md` rule, and stop losing what you learn between sessions.
