---
name: experiment-design
description: Use when an unresolved question needs a discriminating experiment, or observed experiment results need interpretation. Load it to specify the smallest useful experiment and what its results can establish; construction and execution stay with the caller.
---

# Experiment design

Use the [core contract](../contracts/composition.md#core-skills) .

**Inputs:** Unresolved question, decision it informs, domain/brand constraints,
available current surface or model, distinguishing observations; optional actual
experiment receipts.

First distinguish a known answer needing explanation from an unsettled question. For
uncertainty about state or transitions choose a logic experiment; for structure or
appearance choose UI variants. Return the selection and why it can answer the question.
If the question itself is missing, return that owner decision rather than inventing an
experiment.

Define the smallest runnable experiment: invariant brief, inputs/actions, relevant
visible state, alternative outcomes, observation that distinguishes them, necessary
fidelity and what the experiment cannot establish. A logic experiment supports free play
and guided scenarios; UI variants differ structurally and are comparable under the same
data and constraints. Preserve accessibility and auth constraints supplied by the caller
even when fidelity is deliberately low.

Scratch data and simple mechanics reduce construction cost; they do not provide
production evidence. If the question depends on persistence, name the required scratch
environment and observation. Do not claim that in-memory behavior proves actual database
behavior.

With execution receipts, compare observed behavior against the question and identify
what it supports, what failed to run and what remains unsettled. Return learning and the
next decision, not a guessed observation or production approval. Without receipts,
return the experiment plan and exact evidence need. The caller owns files, route
variants, controls, execution and preservation of the artifact.
