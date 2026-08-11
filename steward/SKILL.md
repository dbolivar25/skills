---
name: steward
description: Steward evolving work when the owner's Intent must govern understanding, planning, execution, collaborator handoffs, or changing reality. Use for consequential judgment, owner gates, changing premises, multiple collaborators, durable resumption, or distinct landing proof. Do not invoke solely because a task is large; ordinary bounded work with stable intent can proceed without Steward.
---

# Steward

Keep the owner's Intent authoritative while a team understands, plans, executes,
and learns.

Steward has three durable parts:

- **Intent** — Aim, Why, Rules, Non-goals, and Done.
- **State** — the live work, support, asks, reviews, and receipts derived now.
- **Record** — the append-only events from which State can be re-derived.

`UNDERSTAND`, `PLAN`, and `EXECUTE` are re-entrant responsibilities, not a
waterfall. Every phase result is sharpened by a separate agent before it becomes
accepted State.

## Attach Only When Judgment Must Survive

Use Steward when the work must preserve one or more of these across actions,
collaborators, or time:

- the owner's aim, desired behavior, taste, or higher-level context;
- a premise whose loss invalidates downstream work;
- an authority boundary that evidence cannot decide;
- coordination that must survive agent replacement or resumption;
- distinct proof of correctness, delivery, and landing.

Do not create a second mode for ordinary work. If none of those needs exists,
complete the task normally. If one emerges, attach Steward then and carry only
the live judgment and evidence into it.

## Open From Intent

Before using the runtime, read
[`references/steward-contract.md`](references/steward-contract.md).

Write one Intent:

- **Aim** names the outcome.
- **Why** preserves what makes the outcome matter when a plan breaks.
- **Rules** hold only applicable, versioned constraints, preferences, authority
  boundaries, and behavior specifications.
- **Non-goals** exclude plausible but unwanted outcomes.
- **Done** names observable receipts; it is not a task checklist.

Intent is the shared loss map: it tells workers and reviewers what success
means, what must not be traded away, who owns a decision, and which evidence can
close the work.

Seed the smallest useful `UNDERSTAND`, `PLAN`, or `EXECUTE` work item. Start in
`UNDERSTAND` whenever owner meaning, current reality, or governing premises are
not already grounded. Run `open`; never hand-edit `record.jsonl`.

Treat `.steward/` as local runtime state. Do not stage or commit it unless the
repository explicitly owns that state.

## Run The Re-entrant Loop

Follow the `next` responsibility returned by `open`, `advance`, or `inspect`:

1. Select the smallest work item that can change State honestly.
2. Assign it to the stewarding agent or an actual collaborator.
3. Record `work.started` with the actor.
4. Record the actor's result and evidence with `work.reported`.
5. Give that report to a separate adversarial reviewer.
6. Record `review.added`.
7. On `ADHERES`, use the accepted result to expose the next work. Otherwise,
   resume the same responsibility with the review evidence.
8. Repeat until reality supplies every Done receipt.

`REVIEW` calls for a separate reviewer. `ASK` surfaces the named authority
question. `WAIT` means reconcile or await real collaborators. `STOP` means State
contains no honest continuation: reground, add newly supported work, or surface
the blocker; do not manufacture progress. `DONE` needs no declaration.

The Record stores judgment-changing facts, not narration of every tool call.
When resuming, inspect State before contacting an old collaborator or creating a
new one.

## Execute The Three Responsibilities

### Understand

Establish what the owner means, what current sources show, which premises are
live, what conflicts, and what remains unknown. Produce a faithful situation
model, not an implementation plan.

### Plan

Choose a path that follows the accepted understanding. Expose dependencies,
owner or external gates, risk concentration, verification, and landing proof.
Plan only to the resolution current evidence supports.

### Execute

Perform the authorized work, adapt when reality contradicts the plan, and gather
evidence at the real boundary. Execution includes implementation, validation,
external action, delivery, and observation when the Intent requires them.

Any phase may create new work in any phase. A contradiction discovered during
execution can return the mission to understanding; it does not need to fit the
old plan.

## Compose An Elastic Team

Before using collaborators, read
[`references/collaboration-contract.md`](references/collaboration-contract.md).

Use the collaboration tools as the execution substrate. Keep the smallest team
that improves time-to-truth:

- spawn an ephemeral agent for bounded, disjoint work;
- retain an agent whose accumulated context will matter again;
- pause and later resume an agent when its context is valuable but work is not;
- replace an agent when the next responsibility is disjoint or its context has
  become stale.

Agent context is a cache. Intent, State, and Record are truth. The stewarding
agent is the single Record writer and remains responsible for integrating team
results into the mission.

## Sharpen Every Phase Commitment

Before accepting a reported phase result, read and follow
[`references/sharpening-contract.md`](references/sharpening-contract.md).

Give a separate reviewer the current Intent, Record revision, relevant State,
candidate result, and evidence. Ask it to falsify fit and sufficiency for that
phase. The reviewer returns evidence-backed findings, not edits, scheduling, or
authority decisions.

Use sharpening earlier when a material doubt appears, before an expensive
branch, before an irreversible action, or before claiming a landing. Review is a
tool for finding a better next responsibility, not a parallel command hierarchy.

## Preserve Authority And Support

Presence changes scheduling, not ownership. When the owner is present, surface
an open Ask promptly. When away, continue unrelated safe work and return the Ask
when no such work remains.

Ask only when evidence cannot decide or the judgment belongs to the owner or an
external authority.

Owner Asks deserve an expensive-empathy pass. Name the hat you need: mentor,
owner, or user. Build a task-relevant model of the owner from current Intent,
prior decisions, corrections, stated preferences, responsibilities, and present
constraints. Put on that hat and consider what the owner knows, values, notices,
questions, and is trying to protect. Separate direct evidence about the owner
from inference and unknowns. Use the model to reframe the problem, expose missing
context and tradeoffs, and separate what evidence can settle, what current Intent
assigns to the agent, and what still requires the owner.

Treat the owner model as a revisable working hypothesis and use it only to shape
the Ask. Require explicit, still-applicable owner evidence before establishing an
owner preference, answering an owner Ask, or creating an `OWNER` Backing.

Present the remaining judgment to its authority as a judgment packet: name the
decision, why it matters now, why evidence cannot close it, your recommendation,
the live alternatives and consequences, the work it blocks, and the safe work
that can continue. Include only the context and evidence needed to judge.

Use Backings and Claims only when downstream authority depends on them. If a
Backing fails, withdraw it before selecting replacement work. Steward stops
unfinished dependents unless an independent support set remains live.

When Intent changes, revise it explicitly and atomically stop, preserve, or add
the affected work and receipts. Do not let an old plan silently govern a new
aim.

## Finish At Reality

Local verification, review, CI, merge, deployment, and observed outcome are
different receipts. Record only what the evidence proves. `DONE` is derived
when every current Done item has a live receipt. If reality invalidates one,
withdraw it and let the mission reopen.
