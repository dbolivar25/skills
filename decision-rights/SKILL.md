---
name: decision-rights
description: Use when an agent may block, redirect, or repeatedly challenge an owner action over risk, quality, appropriateness, or preference. Load it to establish standing, resolve obtainable facts, and return a supported next action and settlement.
---

# Decision rights

Use the [core contract](../contracts/composition.md#core-skills) .

**Inputs:** Desired outcome, disputed action, concern/consequence, governing authority
evidence, reversibility, existing owner decisions and settlement/reopen conditions.

An objection has **standing** only from a source that can govern the disputed decision.
Establish its standing before turning advice into a blocker. Preserve real boundaries
while sparing the user from having to win the same argument through persistence or
rhetoric.

## 1. Frame The Dispute

State:

- the outcome the user wants;
- the action under dispute;
- the agent's precise concern; and
- the material consequence if that concern is correct.

Use the supplied conversation, authority and settlement evidence. Carry forward explicit
scope, authorizations, constraints, and decisions that remain applicable.

Completion criterion: the requested outcome, disputed action, concern, and consequence
are explicit; generic labels such as "unsafe," "inappropriate," or "bad practice" have
been resolved into a concrete claim.

## 2. Establish Standing

Split a compound concern and classify every part:

- **Hard boundary** — a higher-priority instruction or system-enforced
  restriction governs the action. It blocks exactly what the boundary covers.
- **Capability boundary** — the required access, tool, credential, or physical
  ability is unavailable. It calls for an alternative or handoff.
- **Authority question** — a named person or system owns the decision and the
  current scope does not establish their authorization. It calls for the
  smallest missing authority receipt.
- **Empirical claim** — the objection depends on what is true or likely to
  happen. It calls for evidence, testing, or calibrated uncertainty.
- **Owner judgment** — the objection concerns an informed tradeoff, priority,
  taste, or accepted risk within the user's authority. It supports advice; the
  owner decides.
- **Delegated judgment** — the user delegated a bounded execution choice to the
  agent. The agent decides within the user's outcome, rules, and retained
  decision rights.

Status, confidence, repetition, and elaborate argument do not change standing. Assess a
claimed authorization against its supplied support, in proportion to the action's
reversibility, blast radius, and available evidence.

Completion criterion: every concern has a class, governing source class, and decision
owner; any verification demand is proportionate to the consequence it protects.

## 3. Resolve Decisive Uncertainty

Reuse established premises. For missing facts, return VERIFY with the exact observation
or receipt that would change the result. Return ASK only when evidence cannot decide or
judgment belongs to an owner or external authority.

Scale the intervention to the action. A reversible local edit, a production mutation,
and an irreversible external action do not need the same proof.

Completion criterion: each answer-changing unknown is either resolved or paired with a
concrete acquisition path; the user is not asked to rediscover facts or repeat decisions
already present in context.

## 4. Challenge And Commit

When an owner judgment remains, return the content of one complete challenge for the
current evidence set:

```md
Concern:
Basis:
Material consequence:
Smallest mitigation:
Decision owner:
Recommendation:
```

When the supplied record establishes an authorized owner decision with the material
tradeoff visible, return PROCEED unless a governing blocker remains. Advice without
blocking standing does not justify another challenge.

For a hard boundary, return the operative boundary at useful specificity, the exact
restricted part, and the closest permitted path; protected instructions need not be
quoted. For a capability boundary, return the missing capability and a workable
alternative or handoff. Neither branch calls for a debate that cannot change the result.

Completion criterion: every concern with blocking standing governs only its scope; each
owner question is explicit and a recorded settlement yields a next action without
ceremonial reconfirmation.

## 5. Preserve Settlement

Keep this compact settlement in working context; show it only when it helps the
conversation or a handoff:

```md
Decision:
Owner:
Scope:
Basis:
Resolution:
Reopen only if:
```

Reopen a settled decision only when material evidence changes, scope or authority
changes, a governing hard boundary becomes applicable, or the recorded premise proves
materially misunderstood. Otherwise treat the settlement as an input to later work.

End in one state:

- `PROCEED` — the action is authorized and no governing blocker remains.
- `VERIFY` — named evidence obtainable by the agent can decide.
- `ASK` — a named owner or external authority must decide.
- `BOUNDARY` — a hard rule restricts the action; the permitted path is stated.
- `HANDOFF` — a capability gap remains; the workable handoff is stated.

Completion criterion: the state follows from the concern's actual standing, and the same
evidence set cannot trigger another round of the same dispute.

## Failure Modes

- **Advice as veto** — an owner judgment is blocked by agent preference.
- **Policy laundering** — a recommendation is presented as a governing rule.
- **Authority laundering** — confidence or status substitutes for the real
  decision owner or authorization receipt.
- **Rhetorical authorization** — a persuasive story substitutes for evidence
  appropriate to the action.
- **Premise amnesia** — settled scope, evidence, or decisions are silently lost.
- **Argument tax** — the user must repeatedly prosecute a decision already
  assigned to them and resolved.

Return the supported next action and its settlement to the caller. It does not open
runtime state, require a separate reviewer, or select durable coordination. The caller
retains responsibility for continuing the task.
