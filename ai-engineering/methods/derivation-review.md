# Review a derivation workflow

Use this method to assess a proposed, implemented or operating evidence-derived workflow. Read the [derivation contract](../references/derivation/contract.md) for required semantic coverage. Judge the visible work product against its user job, then trace the path that produces it. A plausible graph or polished example does not establish fidelity.

## Establish what can be reviewed

Identify the product, user, use moment, quality bar, non-goals and consequential mistakes. Pin the source/output versions and stage: concept, accepted design, code, stored workflow or observed runtime. Use actual prompts, queries, graph definitions, schemas, consuming code and output examples when available. For a conceptual design, treat behavior as a hypothesis and name the missing evidence.

Recover intent from the task and accepted design. Preserve discrepancies with the actual implementation. Obtain accessible material within task authority rather than asking its author to repeat it. A review request does not authorize implementation or publication.

## Trace obligations backward

Map every material output obligation to the judgment, rule, node, prompt, tool or manual step responsible for it. Mark a missing responsibility as a gap. Follow consequential examples and counterexamples from visible claim or action back to source evidence:

1. **Source and scope.** Read [raw-state semantics](../references/derivation/raw-state-and-semantics.md) before judging evidence coverage. Inspect the sources actually available at decision time, retrieval handles, permissions, windowing, identities, prior state and stale-source risks. An unsearched source is not a negative finding.
2. **Transformations.** Read [information fidelity](../../writing/references/information-fidelity.md) before judging summarization, extraction, classification, aggregation, caching, state writes or context handoffs. Check what each consumer needs, what survives and whether recovery is usable. Probe exact commitments, conflicting stakeholders and rare decisive signals.
3. **Dependencies.** Read [judgment DAGs and edges](../references/derivation/judgment-dags-and-edges.md) before judging graph shape. Distinguish input requirements, optional improvements, verification, scope, invalidation, fidelity and policy edges. Check node boundaries and joint inference; neither one prompt nor many agents is a defect by itself.
4. **Support and wording.** Read [claim support](../../review/references/claim-support.md) for consequential claims. Recover support lineages, contradictions, open questions and relevant confidence weaknesses. Check whether those differences change assertion, qualification, omission or escalation. Scalar confidence alone is a gap when it hides a needed distinction.
5. **Publication and lifetime.** Read [publication and rendering](../references/derivation/publication-and-rendering.md). Inspect candidate generation separately from display, send, recommendation, persistence and action. Check required gates and their actual failure behavior. For durable or cross-consumer semantics, also read [promotion](../references/derivation/durable-state-and-promotion.md); verify support, invalidators, recomputation and maintenance.
6. **Quality evidence.** Read [evaluation](../../evaluation/references/evals-and-ablations.md). Inspect final output and the relevant judgment, transformation, retrieval and gate layers. Retain known regressions and the human or expert rubric when they govern interpretation. Keep proposed checks, executed observations and independent judgments separate. Keep missing checks visible, but do not demand layers the system does not contain. Ablations can test whether a disputed dimension or expensive component earns its cost.

Read [anti-patterns](../references/derivation/anti-patterns.md) before deciding which findings matter. Try to disprove each candidate finding with source evidence or a counterexample. Distinguish a design omission, a demonstrated failure and an untested concern.

## Prioritize and return the assessment

Lead with failures that could change the user-visible result: unsupported claims/actions, wrong scope or authority, stale evidence, early loss of exact commitments or stakeholder differences, missing publication gates and uncontracted semantic reuse. Then address unnecessary cost or structure when it fails to protect a meaningful boundary.

For each actionable finding, give the affected obligation, source location or observed case, mechanism, consequence and smallest useful repair. State whether it is demonstrated, inferred or limited by missing evidence. Explain how findings interact when fixing one boundary would remove several symptoms.

Return the supported decision in ordinary language: coherent for the requested stage, needs specific revision, or needs a different derivation shape. State the inspected scope and versions, actual observations and evidence limits even in a short assessment. Separate repairs required for the requested stage from advice or open decisions that may wait. PASS, REVISE and REPLAN may be useful shorthand when the consumer already uses them; they are not mandatory status fields or permission to act. Design adequacy, observed fidelity and runtime acceptance are separate conclusions.

The review is complete when every material obligation and boundary is accounted for or explicitly unresolved, consequential findings can be checked, and the reader understands what evidence supports the recommendation and what remains untested.
