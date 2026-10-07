# Implementation Handoff

Use this guide when a derivation spec needs to become a product workflow, code
change, MCP workflow, prompt graph, evaluation harness or implementation ticket
set. A handoff request returns the implementable mapping and verification obligations below. Implement only when the task authorizes implementation; then inspect actual code, stored contracts and results against the accepted design. A mapping or plan is not an execution receipt.

Apply the shared [derivation contract](../references/derivation/contract.md). This guide owns the
task-specific method below; read its references before their governed decisions.

## Contract

The derivation spec is the design contract. Implementation should not replace the spec with a generic architecture, fixed pipeline, universal semantic state, or model prompt that hides the judgments.

Follow local repository conventions, architecture, validation commands, and ownership boundaries from the target codebase.

## Handoff Steps

1. Verify the spec is implementation-ready.
   Completion criterion: work product, obligations, judgments, DAG, edge contracts, support packages, gates, confidence, evals, and open questions are present.

2. Convert judgments into implementation responsibilities.
   Read [`judgment-dags-and-edges`](../references/derivation/judgment-dags-and-edges.md) before implementation.
   Completion criterion: each major judgment is assigned to a node, service, prompt, tool, deterministic function, retrieval query, verifier, gate, or explicit manual/user step.

3. Convert edge contracts into schemas or payload contracts.
   Completion criterion: every intermediate representation names meaning, scope, exact fields, pointer fields, classified fields, aggregate fields, uncertainty, confidence, invalidators, recompute policy, allowed consumers, and promotion status.

4. Preserve raw-state access and provenance.
   Completion criterion: source ids, source pointers, raw spans or recoverable handles, permissions, timestamps, actors, object links, and scope rules survive until downstream claims no longer need them.

5. Implement gates separately from generation.
   Read [`publication-and-rendering`](../references/derivation/publication-and-rendering.md) before implementation.
   Completion criterion: candidate generation can run speculatively when useful, but display, send, persist, recommend, or act behavior is controlled by publication gates.

6. Implement structured confidence and rendering.
   Read [`evidence-support-and-confidence`](../../review/references/claim-support.md) before implementation.
   Completion criterion: confidence axes can change output assertiveness, qualification, omission, escalation, or demotion.

7. Implement evals at the right layers.
   Read [`evals-and-ablations`](../../evaluation/references/evals-and-ablations.md) before implementation.
   Completion criterion: test coverage or eval harnesses cover final output, judgments, edge/fidelity, retrieval, and ablation where feasible.

8. Decide durable state intentionally.
   Read [`durable-state-and-promotion`](../references/derivation/durable-state-and-promotion.md) before implementation.
   Completion criterion: persisted semantic state is neutral substrate, workflow-specific durable state, or promoted reusable judgment state with a promotion contract.

9. Optimize last.
   Completion criterion: caching, merging nodes, deterministic replacements, and incremental updates do not violate the fidelity contracts or gates.

## Implementation Smells

- One prompt owns all judgments without inspectable contracts.
- One summary object feeds every downstream node.
- Exact values become prose before verification.
- Source pointers are dropped before claims render.
- Candidate output and published output are the same state.
- Confidence is only model confidence.
- Persistence happens because a value seems useful, not because it has a purpose and invalidation policy.
- Tests judge only final copy quality, not retrieval, judgments, edges, or gates.

Source: adapted from the corresponding contract, glossary, reference, guide or template in the personal Faithful Derivation skill.
