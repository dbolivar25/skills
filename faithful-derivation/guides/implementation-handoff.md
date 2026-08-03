# Implementation Handoff

Use this guide when a derivation spec needs to become a product workflow, code change, MCP workflow, prompt graph, evaluation harness, or implementation ticket set.

Required references:

- [`../reference/judgment-dags-and-edges.md`](../reference/judgment-dags-and-edges.md)
- [`../reference/evidence-support-and-confidence.md`](../reference/evidence-support-and-confidence.md)
- [`../reference/publication-and-rendering.md`](../reference/publication-and-rendering.md)
- [`../reference/evals-and-ablations.md`](../reference/evals-and-ablations.md)
- [`../reference/durable-state-and-promotion.md`](../reference/durable-state-and-promotion.md)

## Contract

The derivation spec is the design contract. Implementation should not replace the spec with a generic architecture, fixed pipeline, universal semantic state, or model prompt that hides the judgments.

Follow local repository conventions, architecture, validation commands, and ownership boundaries from the target codebase.

## Handoff Steps

1. Verify the spec is implementation-ready.
   Completion criterion: work product, obligations, judgments, DAG, edge contracts, support packages, gates, confidence, evals, and open questions are present.

2. Convert judgments into implementation responsibilities.
   Completion criterion: each major judgment is assigned to a node, service, prompt, tool, deterministic function, retrieval query, verifier, gate, or explicit manual/user step.

3. Convert edge contracts into schemas or payload contracts.
   Completion criterion: every intermediate representation names meaning, scope, exact fields, pointer fields, classified fields, aggregate fields, uncertainty, confidence, invalidators, recompute policy, allowed consumers, and promotion status.

4. Preserve raw-state access and provenance.
   Completion criterion: source ids, source pointers, raw spans or recoverable handles, permissions, timestamps, actors, object links, and scope rules survive until downstream claims no longer need them.

5. Implement gates separately from generation.
   Completion criterion: candidate generation can run speculatively when useful, but display, send, persist, recommend, or act behavior is controlled by publication gates.

6. Implement structured confidence and rendering.
   Completion criterion: confidence axes can change output assertiveness, qualification, omission, escalation, or demotion.

7. Implement evals at the right layers.
   Completion criterion: test coverage or eval harnesses cover final output, judgments, edge/fidelity, retrieval, and ablation where feasible.

8. Decide durable state intentionally.
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
