# Derivation contract

Every branch preserves these dependencies and coverage obligations. Design builds
them, review checks them, an interview elicits what is missing, and implementation
translates the accepted contracts. This is not a fixed execution pipeline: the
resulting DAG may retrieve or judge in parallel and generate candidates before
publication gates resolve.

1. Name the work product and the user job it serves.
   Completion criterion: the product, audience, use moment, value, quality bar, non-goals, and unacceptable failures are explicit.

2. Derive output obligations.
   Completion criterion: the artifact names the claims, actions, rankings, omissions, tone choices, uncertainty handling, support needs, and decay behavior the output must get right.

3. Convert obligations into judgments.
   Completion criterion: every output obligation is supported by one or more named judgments, and high-risk or subjective judgments are marked.

4. Discover judgment inputs.
   Completion criterion: each major judgment names required raw state, prior state, scope, exact values, source pointers, classifications, aggregates, allowed inferences, forbidden inferences, uncertainty, and false positives.

5. Build the judgment DAG.
   Completion criterion: nodes exist only where they protect quality, fidelity, reuse, verification, parallelism, publication policy, or efficiency; edges express real dependencies, not arbitrary sequence.

6. Attach fidelity contracts to edges using the [preservation method](../information-preservation/references/dimensions.md).
   Completion criterion: every compression boundary says what survives exactly, what remains source-recoverable, what is classified, aggregated, decayed, or dropped, and why downstream judgments can still be made faithfully.

7. Define support packages and structured confidence using the [support method](../claim-support/references/evidence-and-confidence.md).
   Completion criterion: every important rendered claim or action has judgment sources, source support, confidence shape, contradictions, open questions, and rendering assertiveness or an explicit omission decision.

8. Define publication gates separately from generation.
   Completion criterion: candidate generation, provisional display, confident publication, downgrade, qualification, omission, and evidence-request behavior are distinguished.

9. Define evals and ablations using [evaluation-design](../evaluation-design/SKILL.md).
   Completion criterion: the spec includes final-output, judgment, edge/fidelity, retrieval, and ablation evals; ablations name dimensions whose removal should or should not hurt quality.

10. Optimize only after quality is real.
    Completion criterion: caching, merging nodes, incremental updates, durable state, deterministic replacements, and cost reductions are discussed only after the quality path is coherent.
