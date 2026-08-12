---
name: engineering-restraint
description: Complexity gate for deciding whether an additive engineering proposal earns its ownership cost. Use for proposed features, dependencies, abstractions, services, workflows, or generalized implementations.
---

# Engineering Restraint

An addition earns its complexity when present evidence justifies its value and
continuing ownership cost. Run this gate before planning or implementation;
protect the user's outcome while challenging the proposed machinery.

## Operating contract

- Generated code is cheap to produce, not cheap to own.
- Prefer deletion, reuse, configuration, or a narrower sufficient change.
- Do not use restraint to obstruct confirmed user pain, security work,
  compliance obligations, or explicit product judgment.
- Accept the larger shape when current evidence earns it.
- Do not silently replace an authorized implementation with a materially
  different one; return the decision first when scope or behavior would change.

## 1. Name the protected outcome

Separate what must become true from the machinery proposed to make it true.

Completion criterion: the protected outcome and proposed addition are stated
independently; the outcome is not defined as construction of the addition.

## 2. Test present necessity

Inspect the live sources that can prove the need. Test whether deletion, reuse,
configuration, documentation, or a narrower change can produce the outcome.

For a dependency, abstraction, feature surface, service, agent-generated
implementation, or process addition, read
[`references/proposal-patterns.md`](references/proposal-patterns.md) before
finishing this step and apply only the matching pattern.

Completion criterion: relevant current-system evidence has been checked and the
smallest sufficient move compared with the proposal.

## 3. Price the ownership cost

Name the material commitments the proposal adds: concepts, interfaces, data,
operations, verification, organizational ownership, and irreversibility.

Completion criterion: every material commitment and its verification or
operating burden is visible enough to compare with the outcome.

## 4. Make the gate decision

Choose one:

- `Reject` — the need is unproven or the ownership cost is unjustified.
- `Defer` — answer-changing evidence is missing; name how to obtain it.
- `Reshape` — preserve the outcome through a smaller sufficient move.
- `Accept` — present evidence justifies the proposed shape and its safeguards.

Return:

```md
Decision:
Protected outcome:
Evidence checked:
Ownership cost:
Smallest sufficient move:
Reopen trigger:
Next move:
```

When the user needs to explain the decision or handle pushback, read
[`references/pushback-language.md`](references/pushback-language.md) after the
gate decision is complete.

Completion criterion: the decision follows from checked evidence, the next move
stays within the user's authorization, and a concrete reopen trigger states
what would change it. An answer-changing unknown requires `Defer`.

## Failure modes

- **Austerity theater** — treating less engineering as inherently virtuous.
- **Build-cost fallacy** — confusing easy generation with cheap ownership.
- **Authority laundering** — deciding from who argued rather than the evidence.
- **Speculative generality** — paying now for capability justified only by a
  hypothetical future.
- **Silent scope change** — implementing a materially different result without
  returning the decision to the user.
