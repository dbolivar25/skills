---
name: grilling
description: Grill a plan, decision, or idea through relentless dependency-aware rounds. Use when the user wants to stress-test their thinking; when they ask to grill with docs, maintain resolved domain language and durable decisions during the interview.
---

# Grilling

Walk the design tree in dependency order until the user and agent share an
understanding strong enough to act from.

## 1. Establish the object

State what plan or design is being tested and the decision the interview must
make possible.

Completion criterion: the object, decision, and currently unresolved branches
are explicit.

## 2. Work the frontier in rounds

Map the object as a **design tree**: every decision branches into decisions that
depend on it. The **frontier** is every unresolved decision whose prerequisites
are already settled. Ask the whole frontier in one numbered round, then wait for
the user's answers before recomputing it. A question that depends on another
question still open in the round belongs to a later round.

Give every question a short title, enough context to decide, and your recommended
answer with its reason:

```md
1. **<Question title>:** <Question and relevant context>
   - Recommendation: <answer and reason>
```

Finding facts is the agent's job; making consequential decisions is the user's.
Inspect the codebase and supplied evidence instead of asking for discoverable
facts. When several independent facts are needed, gather them in parallel without
blocking unrelated frontier questions; only downstream questions wait.

Completion criterion: every question in the round is dependency-ready, every
recommendation exposes its reason, discoverable facts are being gathered rather
than delegated to the user, and the answers either settle or reshape the frontier.

## 3. Maintain durable decisions when requested

When the user asks to grill with docs, use `domain-modeling` during the
interview. Capture resolved domain language as it crystallizes and offer an ADR
only when the decision meets that skill's threshold. Create documents only in
this docs branch.

Completion criterion: every durable term or qualifying decision resolved so far
is reflected in the appropriate artifact, and unresolved material is not
written as settled fact.

## 4. Stop at shared understanding

Continue until the frontier is empty or the remaining branches are blocked on
named evidence. Summarize the resulting decisions, tensions, and open evidence,
then ask the user to confirm that shared understanding has been reached. End the
session at that confirmation; implementation begins only under separate user
direction.

Completion criterion: the user confirms they can proceed from the decisions
without relying on hidden assumptions, or the exact evidence preventing that
state is named.
