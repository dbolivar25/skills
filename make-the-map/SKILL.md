---
name: make-the-map
description: Map an ambiguous decision before planning or implementation.
disable-model-invocation: true
---

# Make the Map

A **decision map** is a shared coordinate system for a decision that is still
unclear, contested, or trapped in slogans. It exposes the options, dimensions,
forces, evidence, risks, and unknowns needed for judgment.

Build a **scout map**: the smallest map that supports the decision. Do not turn
the task into exhaustive documentation.

This skill stops before planning or implementation.

## Operating contract

- Name the decision before comparing solutions.
- Inspect available evidence instead of asking the user to restate it.
- Ask one question at a time when user judgment is required; include your
  recommended answer and why.
- Keep confirmed facts, inference, proposals, and open questions distinct.
- Do not recommend until the map can explain why an option fits.
- Return `Not ready` when a missing decision or fact could change the answer.

## 1. Name the decision

Identify:

- the choice being made;
- its owner;
- the deadline or cost of delay;
- scope and non-goals; and
- what happens if no decision is made.

Reject a false binary when the named choice hides multiple independent
dimensions.

Completion criterion: one sentence names the actual decision, its boundary,
owner, and timing; materially different interpretations have been resolved or
marked open.

## 2. Build the coordinate system

Map:

- options;
- decision dimensions;
- constraints;
- forces and incentives;
- affected stakeholders;
- known facts;
- unknowns; and
- relationships among them.

Replace slogans such as “monolith versus microservices” with the dimensions
underneath them, such as design-time modularity, deployment granularity,
operational ownership, and scaling independence.

Use a table, diagram, sequence, or semantic model only when it makes an
important relationship easier to judge.

Completion criterion: the options can be compared against the same dimensions,
and every consequential unknown has somewhere visible on the map.

## 3. Find the value and risk posture

Identify the outcome the decision protects and the risks it is meant to change.

Check risk across the applicable surfaces:

- user or customer;
- business;
- execution;
- operational;
- maintainability;
- adoption;
- reversibility; and
- timing.

When an option lowers one risk by raising another, preserve that exchange.

Completion criterion: the primary value, risks being reduced, and risks being
accepted are explicit.

## 4. Set the complexity boundary

Separate:

- **Inherent complexity** — belongs to the domain, users, regulation, scale,
  workflow, or operating environment.
- **Accidental complexity** — introduced by implementation, tools,
  abstractions, process, organization, or stale assumptions.
- **Oversimplification risk** — what becomes false, hidden, brittle, or unsafe
  if the model is simplified further.
- **Intuition strategy** — how people will understand and operate the inherent
  complexity that remains.

Do not defend complexity merely because it already exists.

Completion criterion: every material complexity is classified, and the map
shows what can be removed without lying about the problem.

## 5. Test freshness and suitability

For each serious option, ask:

- What job is this option suitable for?
- Under what conditions does it break down?
- What tradeoffs does it accept?
- How reversible is it?
- What evidence supports it?
- Which supporting heuristic may be stale?
- What observation would change the judgment?

Verify drift-prone claims against current code, documentation, APIs, metrics,
incidents, customers, or other primary evidence when practical.

Completion criterion: each surviving option has a supported suitability claim,
known failure conditions, and an explicit answer-changing signal.

## 6. Account for adoption

Identify who must approve, understand, operate, defend, or change behavior for
the decision to land.

Separate important resistance from imperfections that can be tolerated. Spend
political capital only where the decision materially improves.

Completion criterion: the recommendation accounts for the people who must make
it real, not only the technical shape.

## 7. Recommend or stop

Stress-test the map:

- What credible alternative was considered?
- What assumption could collapse the recommendation?
- What would a skeptical reviewer or executive challenge?
- What signal would show the decision worked?
- Can any part be deferred or made reversible?

Then choose:

- `Ready` — recommend the suitable option, name accepted tradeoffs, rejected
  tradeoffs, confidence, and what would change the answer.
- `Not ready` — name the missing input and ask the single question most likely
  to unlock the decision.

Completion criterion: the recommendation follows from the map, or the exact
reason it cannot yet follow is visible.

## Output

During dialogue, return only the current map update and the next sharp question.

For a compact final answer, use:

```md
Decision:
Map:
Complexity boundary:
Tradeoffs:
Recommendation status:
Recommended path:
What would change the answer:
Next move:
```

When the user requests a durable decision artifact, read
[`references/decision-map-template.md`](references/decision-map-template.md)
and render the fuller map.

If the map stalls or the user explicitly asks to be grilled, read
[`references/question-bank.md`](references/question-bank.md) and select only
questions that expose a currently missing part of the map.

## Relationship to engineering restraint

Use `engineering-restraint` when the main question is whether an additive
engineering proposal has earned its complexity and what smaller move could
protect the same goal.

Use this skill when the decision remains multidimensional after that gate—or
when the choice is product, strategy, organizational, or architectural rather
than merely additive.

## Failure modes

- **Oracle** — recommending before building the map.
- **False binary** — comparing options before exposing the dimensions.
- **Museum cartography** — mapping more territory than the decision requires.
- **Complexity theater** — treating additional machinery as seriousness.
- **Oversimplification** — removing tensions that change the judgment.
- **Stale heuristic** — applying an old rule without checking current conditions.
- **Political blindness** — recommending a path nobody can land.
- **Manufactured certainty** — returning `Ready` while an answer-changing
  question remains open.

