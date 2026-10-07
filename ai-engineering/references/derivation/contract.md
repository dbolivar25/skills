# Derivation contract

Read this contract for a complete derivation design, review, interview or implementation handoff. It defines what the result must account for. The selected method explains how to do that job. A small bounded classifier does not need a complete derivation spec.

Start with the user-visible work product and work backward through the judgments and evidence that make it useful. Design establishes those contracts, review checks an existing path, an interview elicits missing domain judgment, and a handoff maps an accepted design into the target system.

## Required semantic coverage

Account for each applicable obligation below. A missing required input, unresolved judgment or absent check is a gap, not an invitation to fill a field with a plausible answer. An inapplicable layer can be omitted with a clear reason; do not invent graph nodes, confidence axes or evaluation layers to complete a layout.

1. **Work product.** Name the user, job, use moment, output form, value, quality bar, non-goals and unacceptable failures. A generic “summary” or workflow stage does not explain the value it must create.
2. **Output obligations.** Identify the claims, actions, rankings, selections, omissions, tone, uncertainty, support and decay behavior the output must get right. Every relevant obligation needs a named judgment or an explicit gap. Mark high-risk and subjective judgments so their fidelity, checking or domain-owner needs are visible.
3. **Judgment inputs.** For each major judgment, identify required raw and prior state, scope, exact values, source pointers, classifications, aggregates, permitted and forbidden inferences, uncertainty and costly false positives. Keep observed facts, interpretations and owner decisions distinguishable.
4. **Dependencies and boundaries.** The [judgment graph](judgment-dags-and-edges.md) expresses real dependencies and the boundaries needed for quality, fidelity, reuse, verification, parallelism, publication policy or efficiency. It is a partial order, not a compulsory pipeline. Candidate generation may precede verification when the affected effect remains gated.
5. **Preservation.** Apply [information fidelity](../../../writing/references/information-fidelity.md) at every compression or handoff boundary. State what stays exact, source-recoverable, classified, aggregated, decayed or dropped, and why every downstream consumer can still make its required judgment. Unknown, negative, absent and unsearched evidence are different states.
6. **Support and uncertainty.** Use [claim support](../../../review/references/claim-support.md) for consequential claims and actions. Retain the judgment and raw evidence behind them, relevant confidence weaknesses, contradictions, open questions and justified wording or omission. A scalar or model confidence cannot replace the distinctions a consumer needs.
7. **Publication and effects.** Apply [publication and rendering](publication-and-rendering.md). Separate drafting, provisional display, confident display, recommendation, send, persistence and action. Specify required gates, pass conditions and failure behavior. Support does not supply authority, and qualification cannot satisfy an access gate.
8. **Lifetime and reuse.** When state outlives the run or crosses consumers, apply [durable state and promotion](durable-state-and-promotion.md). Define purpose, scope, support, invalidators, recomputation and maintenance; a historically accepted result does not prove it remains valid now.
9. **Evaluation.** Use [evaluation](../../../evaluation/references/evals-and-ablations.md) to observe final outcomes and the relevant judgment, transformation, retrieval and gate boundaries. Plan ablations for dimensions or components whose contribution is uncertain. Keep planned checks, executed observations and independent judgments separate.
10. **Efficiency.** Establish a coherent quality path before choosing merges, caches, incremental updates, deterministic replacements or cost reductions. Then test the preserved consumer obligations; lower cost or a cleaner graph does not establish preserved quality.

## Shape and completion

Use a prose account, annotated graph, tables or a spec at the scale the job needs. The [design layout](../../templates/derivation-spec.md) is an aid, not a required report format. Keep enough private coverage to find omissions even when the public result is short.

A design is coherent when each material obligation has a judgment, evidence path, fidelity contract and relevant effect/lifetime policy, or a named unresolved decision. A review must also state what actual sources and behavior were inspected. A handoff must identify implementation responsibilities and verification obligations; only observed implementation results establish execution. None of these results supplies publication or operational authority beyond the surrounding task.

Source: adapted from the corresponding contract, glossary, reference, guide or template in the personal Faithful Derivation skill.
