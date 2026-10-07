---
name: steward
description: Use when work must survive interruption, coordinate agents, depend on changing assumptions, or preserve separate completion evidence. Maintain the actual work record, reconcile actors and support, and establish completion from independently accepted results and current receipts.
---

# Steward

Carry the owner's intended outcome through changes, interruptions, and delivery. Preserve the runtime as the durable authority. A bounded task without these needs can proceed without a record; attach Steward when the need appears.

## Open or recover

For existing work, inspect the Record before continuing. For new durable work, define Aim, Why, applicable versioned Rules, Non-goals, and observable Done obligations. Include only obligations the requested outcome requires. Read `references/runtime.md` before the first event operation and open with the smallest useful responsibility using `scripts/steward.py`.

The stewarding agent is the sole writer of the append-only Record. Use the existing CLI; do not hand-edit events or maintain a second independently updated state file. The runtime validates shape and transitions, not the truth of evidence.

## Operate the work

1. Reconcile recorded state with current owner decisions, live evidence, real agents, and the assignment's Record revision. Use actual actor identities. A recorded status does not prove that actor is running.
2. Select a result-sized responsibility. UNDERSTAND, PLAN, and EXECUTE describe available responsibilities; they are not a compulsory pipeline. Use a retained actor when its context is useful, or replace it deliberately. Assign the actual work before recording its start or resume.
3. When the actor returns, compare the result with current Intent, support, lifecycle, and recorded actor. Record a report only for the currently ACTIVE assignment and its recorded actor. A late result from stopped, superseded, or reassigned work is evidence to assess, not an event to append to that assignment. Every report requires a separate real reviewing actor. Supply current Intent, applicable criteria, support, assignment revision, and the actual report and evidence.
4. Record the review using the runtime's exact status, evidence, and confidence fields. ADHERES accepts. For AT_RISK, VIOLATED, or UNCERTAIN, assign the revision, record `work.resumed` with the actual actor, then obtain a new report identity and independent review. Never invent a reviewer or accept your own report.
5. Integrate accepted results into the next work, support, or receipt. Batch related observed events and their consequences. Do not record every search or tool call.

Read `references/collaboration.md` for assignment, pausing, replacement, and cancellation. Read `references/review.md` when commissioning or evaluating a report; it owns phase-specific criteria and the exact response contract. Use `references/worked-example.md` when a complete event sequence would clarify recovery, changed support, or owner correction.

## Preserve live support and authority

Accepted work is history. Use needsWork for accepted prerequisites and needsClaims for premises that must remain true. Add Backings and Claims when later work depends on their continuing support. Preserve alternative independently sufficient support.

Withdraw failed Backings before selecting replacement work. Inspect affected branches and physically interrupt real actors whose work lost support. Runtime STOPPED does not cancel an agent and is permanent; create justified replacement work with new identities. Do not silently repair immutable Claims by attaching replacement evidence.

Resolve obtainable facts yourself. Open an Ask for missing authority or an owner-owned choice, pausing active blocked work first. Surface it once and continue unrelated available work. PRESENT/AWAY affects scheduling, not authority; next is a priority, not a prohibition on other ready work. Explicit owner evidence is required for an OWNER Backing. Preserve settled decisions until something material changes.

When Intent changes, revise it and explicitly stop affected work, withdraw invalid support or receipts, and add replacements in the same event batch. Preserve unaffected results. The runtime cannot infer the consequences of a correction.

## Finish from evidence

Add a receipt only when its observation satisfies a current Done obligation. Keep correctness, requested delivery stage, and observed outcome distinct where the task requires them. The runtime derives completion from live receipts. Withdraw invalid receipts and reopen the needed work with new evidence identities.

Report the usable outcome, meaningful evidence, and exact unfinished obligations. A concise update is a projection of the Record; expose the ledger only when it helps the owner.
