---
title: "two audiences"
description: "the same problem kept appearing in different places. once I named it, I started seeing it everywhere."
pubDate: 2026-04-21
loop: "capture"
---

three things I built today, all with the same shape.

## copy buttons that gave you nothing

the copy button on a chat message emitted a raw UUID. something like `a1b2c3d4-e5f6-7890-ab12-cdef01234567`. if you pasted that UUID into a Claude session, Claude had no idea what it was. was it a session? a page? a message? a user? just a UUID, context-free.

the fix was a URN scheme: `clarity:chat-message:a1b2c3d4`. now the ID carries what it is. paste it into Claude, Claude knows it's a Clarity resource of a specific kind.

small change. the interesting thing about it is why it was needed at all. we built the copy button for the user. but when the user pastes it somewhere, the audience is often an AI. those aren't the same requirements.

## task generation that went through chat prose

the old flow for generating tasks was: right-click a canvas node → "Generate Tasks" → agent writes a freeform list in chat → "want me to save these?" → user says yes → agent creates the pages.

everything was running through prose. the agent had to produce a nicely-formatted list. the system had to parse that list back into something structured. "want me to save?" was a soft handshake instead of a direct action.

we replaced it with a panel. the agent now emits structured task data directly — a machine-readable draft with titles, priorities, rationale. the frontend renders that as an editable card list. the user edits inline. Save hits an endpoint. no round-trip through language.

what the user sees: a clean card editor they can modify before saving.  
what the agent receives: a structured directive to produce `draft_tasks`, not a prose list.

two different formats for two different audiences. they were the same before, which meant both got a worse experience.

## prefill that showed its own plumbing

when you right-click a canvas action, clarity prefills the chat input. that prefill was constructed like this:

```
[CANVAS_EDIT] the node you want to change is called "Onboarding" and it's under the project phase...
```

the user saw that. the whole thing, directives and all. the routing token `[CANVAS_EDIT]` was sitting there in the input field, visible.

the fix was a type called `AgentPromptPair`:

```typescript
type AgentPromptPair = {
  display: string;
  agent: string;
}
```

the user sees the display version. the agent receives the agent version. same action, two representations. the directives stay invisible. the input looks like what the user typed.

this was the session where the pattern finally got named. we'd been building toward it in the other two sessions without realizing it.

## a prompt rule that made things worse

elsewhere today: the canvas agent was generating edge labels like "then" and "next." generic placeholders. we tried to fix it with a ban list — add a hard rule that prohibited those tokens, enforce minimum label length.

eval went from 13 passing / 5 failing → 8 passing / 11 failing.

the agent responded to the ban by emitting fewer labels, not better ones. when it couldn't produce a label it trusted, it skipped the edge entirely. orphan nodes. truncated chains. the ban was a negative-space rule — it defined what bad looked like — but gave the agent nothing to pattern-match against for good.

what worked instead: a bad-vs-good example table. six rows. each row shows a generic label next to a specific one.

| instead of | write |
|---|---|
| `"then"` | `"once candidates recruited, run the interview batch"` |
| `"next"` | `"after Week 1 interviews logged, Assumption 1 scoring begins"` |
| `"approved"` | `"legal + product sign off on spec freeze"` |

same principle, different layer. the user-facing surface gets the clean version (specific labels). the agent gets examples of what "good" looks like, not a list of what's forbidden.

rules define what bad is. examples show what good looks like. when the quality you want is a matter of taste — label wording, description depth, decomposition detail — examples are the better interface.

## what these have in common

<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;font-family:monospace;font-size:13px">
  <!-- User side -->
  <rect x="20" y="30" width="180" height="200" rx="6" fill="#f8f8f8" stroke="#ddd" stroke-width="1.5"/>
  <text x="110" y="54" text-anchor="middle" fill="#666" font-size="11" font-weight="bold">USER SEES</text>
  <text x="110" y="80" text-anchor="middle" fill="#333">clarity:chat-message:abc</text>
  <text x="110" y="110" text-anchor="middle" fill="#333">editable task cards</text>
  <text x="110" y="140" text-anchor="middle" fill="#333">clean prefill input</text>
  <text x="110" y="170" text-anchor="middle" fill="#333">good label examples</text>

  <!-- Arrow -->
  <line x1="200" y1="130" x2="480" y2="130" stroke="#bbb" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polygon points="480,126 490,130 480,134" fill="#bbb"/>
  <rect x="280" y="112" width="140" height="36" rx="4" fill="white" stroke="#ddd"/>
  <text x="350" y="130" text-anchor="middle" fill="#888" font-size="12">split at boundary</text>

  <!-- Agent side -->
  <rect x="490" y="30" width="170" height="200" rx="6" fill="#f0f4ff" stroke="#c5d0f0" stroke-width="1.5"/>
  <text x="575" y="54" text-anchor="middle" fill="#555" font-size="11" font-weight="bold">AGENT RECEIVES</text>
  <text x="575" y="80" text-anchor="middle" fill="#333">clarity:&lt;kind&gt;:&lt;uuid&gt;</text>
  <text x="575" y="110" text-anchor="middle" fill="#333">draft_tasks schema</text>
  <text x="575" y="140" text-anchor="middle" fill="#333">[CANVAS_EDIT] directive</text>
  <text x="575" y="170" text-anchor="middle" fill="#333">show-don't-tell prompt</text>

  <!-- Layer labels -->
  <text x="110" y="248" text-anchor="middle" fill="#aaa" font-size="10">IDs · actions · input · prompts</text>
  <text x="575" y="248" text-anchor="middle" fill="#aaa" font-size="10">structured · typed · contextual</text>
</svg>

at every layer — IDs, task generation, prefill, prompts — we had built one format and assumed it served both audiences. it didn't.

the user needs something human-readable and editable. the agent needs something structured and unambiguous. when you force one format to serve both, you either get ugly interfaces (user sees plumbing) or brittle behavior (agent processes prose when it needs schema).

the fix is the same in each case: name the boundary, build both representations, translate at the edge.

## Technical Insight

before shipping any interface — copy button, prefill action, prompt rule, API response — ask: who are the actual audiences for this output? if the answer is "a human and an AI," they probably need different formats.

| situation | signal that the format is wrong |
|---|---|
| copy button | the thing you pasted gives Claude no context |
| agent output routed back to agent | it's going through language when it could be schema |
| user-visible prefill has routing tokens | the user is seeing instructions meant for the model |
| prompt rule causes avoidance not improvement | you defined bad; you didn't show good |

naming the boundary is the first step. `AgentPromptPair` was a one-day find, but once it existed, the other two fixes were obvious. the display and the agent text had always been different things. they just hadn't been stored that way.
