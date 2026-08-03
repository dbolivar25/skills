# Collaboration Contract

Steward's runtime governs mission state. Collaboration tools execute the work.

## Roles

The **stewarding agent** owns integration. It reads the current Intent and State,
selects the next responsibility, composes the team, and is the only writer to
the Record.

A **working agent** owns one bounded work item. Its output is a proposal until
the steward records a report and an independent review accepts it.

A **reviewing agent** adversarially sharpens one reported result. It does not
edit that result, schedule the team, change Intent, or write the Record.

Agents may communicate directly when it shortens discovery. Any premise,
decision, contradiction, or evidence that changes mission judgment must also be
returned to the stewarding agent for the Record.

## Map Work To Collaboration Tools

Use the available collaboration operations deliberately:

- `spawn_agent` creates a fresh working or reviewing agent.
- `send_message` supplies a running agent with new evidence or a narrowed task.
- `followup_task` resumes an idle retained agent with its accumulated context.
- `interrupt_agent` pauses current activity; the agent remains available.
- `list_agents` reconciles the actual team with recorded work.
- `wait_agent` waits for progress without inventing state changes.

Tool availability can differ by environment. Preserve these semantics with the
available equivalents; never pretend an actor exists or returned a result.

## Assignment Protocol

Before assigning work:

1. Inspect the current Record revision.
2. Choose a work item named by `next` or add the missing responsibility.
3. Decide whether existing context helps or biases the work.
4. Give the actor the current Intent, relevant State, exact responsibility,
   authority boundary, expected evidence, and Record revision.
5. Spawn or resume the actor.
6. Record `work.started` only after the actor exists and owns the assignment.

If several independent items are available, assign them in parallel only when
their file, authority, and decision surfaces do not conflict. Give workers clear
ownership and tell them not to revert or overwrite other collaborators' work.

## Team Lifetime

Team membership is elastic:

- **Ephemeral:** use a fresh agent for bounded or disjoint work; release it after
  its report.
- **Retained:** keep an agent when its hard-won context is likely to matter in a
  later state.
- **Paused:** interrupt an agent and record `work.paused` when its context is
  valuable but current work cannot proceed.
- **Resumed:** use `followup_task` and `work.resumed` when the same context should
  continue.
- **Replaced:** resume the work with a new actor when the task is disjoint, the
  old context is stale, or independence is more valuable than continuity.

Do not preserve a standing team for its own sake. Preserve useful context;
replace accidental context.

## Reporting And Integration

When a working agent returns:

1. Compare its response with the assignment and current Record revision.
2. Reconcile any intervening Intent or State change.
3. Record `work.reported` with the actual actor, concise result, and exact
   evidence.
4. Send the report to a separate reviewing agent under the sharpening contract.
5. Record the review.
6. If the review adheres, integrate the accepted result into new Backings,
   Claims, Work, Asks, or Receipts as appropriate.
7. Otherwise, resume the same responsibility with the review evidence.

An agent response never becomes State merely because it sounds complete.

## Coordination Invariants

- Intent and State outrank every collaborator's remembered context.
- The stewarding agent remains the single Record writer.
- Actor IDs in work events must identify the agents that actually did the work.
- A reporting actor cannot review its own report.
- Do not assign blocked work.
- Do not wait when another independent responsibility is available.
- Do not broaden fan-out beyond the number of truly independent questions.
- Do not let peer discussion hide a judgment-changing fact from the Record.
- On resumption, reconcile the live team before trusting recorded actor status.
