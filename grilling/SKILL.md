---
name: grilling
description: Grill a plan or design through a relentless one-question-at-a-time interview. Use when the user wants to stress-test a proposal before building; when they ask to grill with docs, maintain resolved domain language and durable decisions during the interview.
---

# Grilling

Walk the design tree in dependency order until the user and agent share an
understanding strong enough to act from.

## 1. Establish the object

State what plan or design is being tested and the decision the interview must
make possible. Inspect available sources before asking the user for facts they
already contain.

Completion criterion: the object, decision, and currently unresolved branches
are explicit.

## 2. Resolve one branch at a time

Ask exactly one question per turn and wait for the answer. Choose the next
question by dependency: resolve whatever later decisions rely on first. Include
your recommended answer and its reason with every question.

When the answer can be established from the codebase or supplied evidence,
inspect that source and present what it establishes instead of asking.

Completion criterion: the current branch ends in a decision, a named unknown,
or evidence that must be gathered; it does not dissolve into another bundle of
questions.

## 3. Maintain durable decisions when requested

When the user asks to grill with docs, use `domain-modeling` during the
interview. Capture resolved domain language as it crystallizes and offer an ADR
only when the decision meets that skill's threshold. Do not create documents in
ordinary grilling sessions.

Completion criterion: every durable term or qualifying decision resolved so far
is reflected in the appropriate artifact, and unresolved material is not
written as settled fact.

## 4. Stop at shared understanding

Continue until the consequential branches are resolved or the remaining ones
are blocked on named evidence. Summarize the resulting decisions, tensions, and
open evidence without turning the session into implementation.

Completion criterion: the user can proceed from the decisions without relying
on hidden assumptions, or the exact evidence preventing that state is named.
