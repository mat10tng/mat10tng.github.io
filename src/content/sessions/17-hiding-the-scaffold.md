---
title: "hiding the scaffold"
description: "five sessions about the same problem in different places: when the agent's mechanics become the user interface."
date: 2026-04-22
sessionId: 17
work: "added CLI model flags to the eval suite, redesigned the Pending Changes panel, introduced a URN scheme for portable identifiers, built a Draft-Tasks editor panel to replace a chat round-trip, and split display text from agent routing text in canvas prompts."
capture: "five sessions in a single day, all touching the same boundary: where the agent's implementation had become the user interface. some were small. one was a full UX rethink. same root cause."
review: "agent-native features fail UX when implementation details become the interface. raw diffs, confirmation chat-loops, routing directives visible in prompts — not fundamental problems, just unsealed seams between the agent layer and the user layer."
improve: "four seams sealed in one day. field-aware diffs, an editable task panel, split prompt strings, portable URNs. the agent still does what it did. the interface stopped asking users to speak implementation language."
why: "what it looks like to systematically close the gap between 'what the agent needs' and 'what the user should see'"
---

### take with you

Signs the agent layer is bleeding into user experience — and what closes each gap:

| What the user sees | What's leaking | The seal |
|---|---|---|
| Raw JSON in a review panel | Database format as the UI | Parse and render field-by-field, with context |
| Chat round-trip for generated content | Chat as the only available affordance | Purpose-specific editing surface |
| Routing tokens visible in the input field | Agent text and display text are the same string | Split: display string and agent string are separate |
| IDs that are meaningless outside the system | Internal identifiers with no portable type | URN scheme that carries type + context |

---

there's a tell when a feature was built agent-first: the user ends up reading implementation format instead of human format. JSON diffs in a review panel. routing directives in a prompt input. a confirmation loop via chat because no other surface existed yet.

five sessions, all april 21st, all the same problem in different places.

**pending changes** was showing raw JSON. every change to a page — resequencing, phase assignment, status update — rendered as its database representation. you could read it if you knew the schema. but you shouldn't have to know the schema to review your own project changes. that knowledge belongs to the system, not the user.

the new panel surfaces parent context (which node does this change belong to?) and renders each field by name. sequencing, status, phase assignment — words, not structures. the underlying data is identical. the representation changed from the format the database needed to the format a person can actually read.

**task generation** ran through chat. agent outputs a list, appends "want me to save these?", user responds in the text input. entirely functional. entirely the wrong affordance. the chat input became the editing surface by default, not by design — it was there and nothing better was. editing a structured list of tasks by typing instructions in a general-purpose chat box is a workaround that looks like a feature until you see the alternative.

the alternative: the agent emits a structured `draft_tasks` variant instead of prose. the frontend renders it as an editable card panel. the user adjusts inline. save posts directly to a commit. no round-trip, no confirmation. agent job ends at producing the cards. user takes over in an interface built for that task specifically.

**canvas right-click actions** were pre-filling the input with two things at once: the user's prompt and the agent's routing directives. "Generate tasks for this node" mixed with low-level instructions about which tool variant to emit and which schema to follow. the directive was infrastructure. it was also visible to anyone who looked at the input before submitting.

the fix is a split. every canvas action now has two strings: what appears in the input field (clean, readable) and what actually gets sent to the agent (with all the routing it needs). the user reads one. the agent receives the other. a small structural change that stops the product from exposing its own plumbing.

**the URN scheme** is a different kind of seam — not inside the product, but across the boundary between the product and a Claude session.

internal IDs are opaque. paste one into a conversation and Claude has nothing: is it a page? a project? a phase? the identifier carries no type information, so you have to re-establish context every time. wrapping identifiers in a type-carrying scheme (`clarity:page:id`, `clarity:project:id`) makes them self-describing. paste one anywhere, Claude knows what it is and how to handle it. the identifier travels with its own context instead of requiring you to reconstruct that context from scratch each time.

**the eval CLI flags** don't fit neatly into the seam story, but they have the same shape. to run evals against a different model, you used to edit source constants. the configuration was baked in — the implementation was the interface. now it's a flag. the internal detail moved to an explicit surface. same logic, different layer.

---

none of these were broken. but each had the same shape: something the agent needed was visible in what the user encountered. closing those gaps is the difference between a system that works and one that feels designed.
