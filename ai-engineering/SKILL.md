---
name: ai-engineering
description: Use when designing, implementing, or assessing AI judgments or work products derived from customer or operational evidence. Define the inference contract, preserve provenance and uncertainty across transformations, and integrate the result with its real system boundaries.
---

# AI Engineering

Own the AI behavior the product needs, from input and judgment through its consuming system. Begin with the actual decision or work product and failure consequences. Use the repository's existing models, agents, tools, and delivery seams before inventing a new framework or choosing a vendor.

Choose the depth by the job. A bounded classifier or extraction replacement needs its inference contract and consuming path. A new or substantially changed work-product path, or a complete audit or handoff of that path, needs the derivation method. A narrower change can use the relevant fidelity, reuse or publication reference while preserving established contracts. The number of model calls does not decide the depth.

## Define the inference contract

Specify the input available at decision time, permitted evidence, typed output and its meaning, consumer behavior, failure/abstention path, and consequential mistakes. A no-match result, unavailable evidence, negative finding and service failure can require different consumer behavior; preserve those distinctions instead of forcing a successful label. Keep permissions, human authority, routing modes, effects, and retry/delivery policy in the appropriate code or workflow structure.

Use representative examples and edge cases to sharpen the contract. When unresolved expert or domain judgment governs the work product, read [the expert-interview method](methods/derivation-expert-interview.md) and obtain that judgment without treating unavailable expertise as model certainty. A confidence number is not calibrated probability or permission to act. Distinguish observed source facts, bounded model judgments, and owner decisions.

For a small classifier, extraction, ranking, or routing replacement, use the existing seam. A design or assessment returns the supported contract and proposal; implement and exercise changes only within the task's authorized scope. Read [the selected TypeSafe reference](vendors/typesafe.md) only when TypeSafe is selected or directly relevant. Verify installed APIs and current primary documentation; do not substitute a promotional pattern for repository evidence.

## Preserve faithful derivation when needed

For a complete derivation design, review, interview or handoff, read [the derivation contract](references/derivation/contract.md). Use the [glossary](references/derivation/glossary.md) to resolve its vocabulary. Read [raw-state semantics](references/derivation/raw-state-and-semantics.md) when choosing evidence or interpreting state, [judgment DAGs and edges](references/derivation/judgment-dags-and-edges.md) when deciding dependencies or transformations, and [anti-patterns](references/derivation/anti-patterns.md) when reviewing a proposed shape or preparing implementation. These protect meaning and support across the complete path, without imposing one architecture.

Before consequential summarization or transformation, read [information fidelity](../writing/references/information-fidelity.md) and identify the downstream judgments that require detail. Preserve exact fields, distinctions, contradictions, uncertainty, citations, and provenance that those judgments need. Allow a loss only when its consumer consequence is acceptable and the source remains recoverable where required. A tidy intermediate representation is not proof of sufficient fidelity.

For consequential claims, read [claim support](../review/references/claim-support.md) when support independence, contradictions, freshness, scope, or uncertainty needs deliberate assessment. Strengthen the evidence or narrow the statement accordingly.

Derived interpretations remain workflow-scoped until an explicit consumer, support, fidelity, freshness/invalidation, and maintenance contract earns reuse. Read [durable state and promotion](references/derivation/durable-state-and-promotion.md) before persisting or reusing semantic state. Separate candidate generation from display, send, persistence, or action. Read [publication and rendering](references/derivation/publication-and-rendering.md) and enforce required support, scope, access, freshness, and contradiction gates with their explicit failure behavior. Qualification cannot substitute for a required access gate. Define relevant decay and source recovery.

Use [derivation design](methods/derivation-design.md) to produce a coherent design, [derivation review](methods/derivation-review.md) to assess an existing path, or [implementation handoff](methods/derivation-handoff.md) to map an accepted design into the target system. Their templates offer useful layouts; the contract owns the required semantic coverage. Do not turn a small inference into a fifteen-section report.

## Integrate and verify

Exercise the actual inference and consuming path at the boundary the claim depends on. Check typed validity separately from semantic quality, source support, access/authority, publication, and delivery. Retain relevant abstentions and known regressions.

Use [Evaluation](../evaluation/SKILL.md) for a complete quality comparison, dataset/rubric, holdout, or component-value question. Routine correctness checks stay with this job and Engineering. Finish with the implemented or designed behavior, actual evidence, consequential failure limits, and requested delivery stage.
