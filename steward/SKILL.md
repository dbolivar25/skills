---
name: steward
description: Use when work must preserve the owner's intent, governing assumptions, decision authority, or coordination across changes and interruptions, or track separate proof of correctness, delivery, and outcome. Load it to recover current state, coordinate the next responsibility, and establish completion from evidence.
---

# Steward

Keep the purpose of the work intact as circumstances change. Use the record to
determine what needs attention next.

Steward carries three things:

- **Intent:** what the owner wants, why it matters, what governs the work, and
  what evidence would establish completion.
- **State:** the current work, supporting evidence, questions, reviews, and
  completion receipts.
- **Record:** the events from which the runtime derives State.

The agent judges what the evidence supports. The runtime checks event validity,
maintains the record, and derives the next responsibility. It cannot verify that
an observation happened or that a judgment is sound.

Use the [composition contract](../contracts/composition.md#operational-callers).
Supporting skills need current Intent, relevant State and evidence, and a clear
responsibility; they do not need to operate the runtime.

## Decide whether the work needs a record

Use durable state when intent, a governing assumption, an authority boundary,
team coordination, or distinct completion evidence must survive across actions,
collaborators, or time. A bounded task without those needs can finish without
opening a record. Attach Steward when a need emerges, carrying the relevant
context and evidence forward.

If the only question is whether an objection may block an owner decision, use
[decision rights](../decision-rights/SKILL.md) directly.

## Start or resume

For new work, write one Intent:

| Field | What belongs here |
| --- | --- |
| Aim | The outcome the owner wants. |
| Why | What makes that outcome matter if the plan has to change. |
| Rules | Applicable, versioned constraints, preferences, authority boundaries, and behavior specifications. |
| Non-goals | Plausible outcomes the owner does not want. |
| Done | Observable evidence required for completion. |

Intent tells workers and reviewers what must not be traded away, who owns each
unresolved decision, and what can close the work. Include only applicable rules
from the [defaults](rules/default-rules.json).

Read the [runtime reference](references/runtime.md) before writing events. Use
`open` with Intent and the smallest useful work item. The
[worked example](references/worked-example.md) shows complete commands, their
results, and recovery after an assumption fails.

For existing work, use `inspect` before continuing. Read current Intent, State,
Record revision, governing assumptions, and relevant receipts. Reconcile live
collaborators before trusting recorded actor status or assigning replacement
work. Read [collaboration](references/collaboration.md) when assigning, resuming,
or reconciling agents.

The runtime stores `<root>/.steward/<slug>/record.jsonl`. Keep one writer: the
stewarding agent. Never hand-edit the record, duplicate its derived state in a
second state file, or commit `.steward/` unless the repository explicitly owns it.

## Carry out the next responsibility

Follow `next` from `open`, `advance`, or `inspect`:

| Responsibility | What to do |
| --- | --- |
| `UNDERSTAND` | Establish owner meaning, current reality, supported assumptions, conflicts, and unknowns. Produce a situation model. |
| `PLAN` | Choose a path from accepted understanding. Expose dependencies, authority gates, concentrated risks, verification, and outcome evidence. |
| `EXECUTE` | Perform authorized work, adapt to new evidence, and verify at the boundary the owner cares about. |
| `REVIEW` | Give the reported result to a separate reviewer under the [review instructions](references/review.md). |
| `ASK` | Prepare the unresolved decision for its named authority, as described below. |
| `WAIT` | Reconcile or await real collaborators; continue another independent responsibility if one is available. |
| `STOP` | Reground the work, add a newly supported responsibility, or surface the blocker. State currently offers no supported continuation. |
| `DONE` | Check that the recorded evidence supports the requested outcome and report the observed result. |

Start in `UNDERSTAND` whenever owner meaning, current reality, or governing
assumptions are not grounded. Any responsibility can reveal a need to return to
another. Preserve open owner choices and viable alternatives until the next
commitment requires a decision; plan only as far as the evidence supports.

Size work items around results that another agent can assess and subsequent work
can rely on. For example, “establish which identity governs resource access” is
one result; each search used to establish it is not a separate work item. Keep
items separate when their authority, support, or acceptance can differ.

For each work item:

1. Assign an available item to yourself or an actual collaborator. Record
   `work.started` with the actor who owns it.
2. Do the work and record `work.reported` with the result and evidence.
3. Obtain independent review before acceptance. Read the
   [review instructions](references/review.md) before dispatching the reviewer;
   they define context, criteria, statuses, and independence.
4. Record `review.added`. On `ADHERES`, integrate the accepted result into the
   evidence, assumptions, receipts, or next work it supports. Otherwise, record
   `work.resumed` and revise the same responsibility using the review evidence.

The record holds facts that change judgment, rather than a transcript of tool
calls. Review acceptance and integration remain the stewarding agent's
responsibility. Use [critique](../critique/SKILL.md) through the review instructions
for falsification, including an early pass when doubt or an expensive commitment
makes waiting for a completed report unwise.

## Respond when circumstances change

Before a commitment or completion claim, reconcile it with current Intent and
evidence. Acquire missing evidence through the appropriate workflow, preserve
its limits, and reassess affected commitments.

When downstream work depends on a premise, represent that premise as a **Claim**
and its evidence, owner decision, or policy support as **Backings**. Use these
only when later authority depends on the support. Read
[runtime support](references/runtime.md#support) before recording them.

If a Backing fails, withdraw it before selecting replacement work. The runtime
stops unfinished dependents whose support is no longer live, while retaining
branches with independent support. Inspect the result and add replacement work
where justified. Completed work remains historical evidence; it does not make a
premise permanently valid.

If the owner changes Intent, revise it explicitly. In the same event batch,
stop affected work, withdraw invalid receipts, and add justified work as needed.
Preserve unaffected work and evidence. The runtime cannot infer what the change
invalidates; see [intent revisions](references/runtime.md#intent-revisions-and-receipts).

## Bring decisions to their owners

Apply [decision rights](../decision-rights/SKILL.md) when an objection or unclear
authority could block or reopen an owner choice, before recording an Ask or
owner Backing. Carry the resulting settlement into Intent or State where it
governs later work. Rephrasing an objection does not change its premise.

Resolve obtainable facts first. Ask when evidence cannot decide, when access is
unavailable, or when the remaining judgment belongs to the owner or an external
authority. Do not silently choose a different purpose.

Before an owner Ask, consider the decision from the role you need them to play:
mentor, owner, or user. Use current Intent, prior decisions, corrections, stated
preferences, responsibilities, and present constraints to understand what they
know, value, notice, and are trying to protect. Separate direct evidence from
inference and unknowns. Use that perspective to expose missing context and
tradeoffs, and distinguish what you can settle from what requires their judgment.

That model is revisable and only shapes the Ask. Establishing an owner
preference, answering an owner Ask, or creating an `OWNER` Backing requires
explicit, still-applicable owner evidence.

Present the decision, why it matters now, why evidence cannot settle it, your
recommendation, live alternatives and consequences, blocked work, and safe work
that can continue. Include only the context needed to judge. When the owner is
present, surface an open Ask promptly. When away, continue unrelated safe work
and return to the Ask when no such work remains. Presence changes scheduling,
not ownership.

## Establish completion

Compare current Done obligations with actual receipts. Implementation, local
checks, review, CI, merge, deployment, delivery, and observed behavior establish
different stages. Follow through to the outcome the owner requested.

The runtime derives `DONE` from live receipts once no earlier responsibility
takes priority. Record only what the evidence supports: a matching receipt type
cannot establish that an outcome happened. Report the last observed stage and
remaining uncertainty. If evidence becomes invalid, withdraw its receipt and
inspect the reopened work.
