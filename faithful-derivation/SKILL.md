---
name: faithful-derivation
description: Derivation design for AI work-product workflows. Use when designing, reviewing, or implementing workflows that transform raw customer or operational state into generated artifacts, recommendations, plans, feed items, emails, decisions, or other work products; produces derivation specs with judgment DAGs, fidelity contracts, support packages, publication gates, structured confidence, and evals.
---

# Faithful Derivation

Use this skill when the work is to design, review, or build an AI workflow whose value is a work product. The leading word is **derivation**: the workflow derives a faithful work product from raw state under a specific purpose, rather than generating fluent output from generic context.

## Core Posture

The work product is the product. The workflow is the means.

Start from the user-visible work product and work backward into the judgments it must make, the raw state those judgments require, and the fidelity each transformation must preserve. Execute forward only after the derivation is coherent enough to protect the work product's claims, actions, tone, omissions, recommendations, and publication behavior.

Raw state is canonical. Neutral retrieval infrastructure can be shared. Semantic observations are workflow-scoped by default and become reusable only with explicit meaning, scope, fidelity, confidence, invalidators, consumers, and owner.

Do not solve this by asking a model to summarize the last N sources, stuffing structured data into context, building a universal semantic layer, or forcing every work product through one fixed pipeline.

## Load Order

Before branch work, read [`GLOSSARY.md`](GLOSSARY.md) for the domain vocabulary. Then read exactly the branch guide that matches the user's task:

- New workflow or major redesign: [`guides/design-new-work-product-workflow.md`](guides/design-new-work-product-workflow.md)
- Existing workflow critique or audit: [`guides/review-existing-workflow.md`](guides/review-existing-workflow.md)
- Domain-expert interview or ambiguous product idea: [`guides/expert-interview.md`](guides/expert-interview.md)
- Implementation or handoff after the design is accepted: [`guides/implementation-handoff.md`](guides/implementation-handoff.md)

Use [`templates/derivation-spec.md`](templates/derivation-spec.md) for new workflow specs and [`templates/review-report.md`](templates/review-report.md) for audits.

## Invariant Method

Every branch preserves this order:

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

6. Attach fidelity contracts to edges.
   Completion criterion: every compression boundary says what survives exactly, what remains source-recoverable, what is classified, aggregated, decayed, or dropped, and why downstream judgments can still be made faithfully.

7. Define support packages and structured confidence.
   Completion criterion: every important rendered claim or action has judgment sources, source support, confidence shape, contradictions, open questions, and rendering assertiveness or an explicit omission decision.

8. Define publication gates separately from generation.
   Completion criterion: candidate generation, provisional display, confident publication, downgrade, qualification, omission, and evidence-request behavior are distinguished.

9. Define evals and ablations.
   Completion criterion: the spec includes final-output, judgment, edge/fidelity, retrieval, and ablation evals; ablations name dimensions whose removal should or should not hurt quality.

10. Optimize only after quality is real.
    Completion criterion: caching, merging nodes, incremental updates, durable state, deterministic replacements, and cost reductions are discussed only after the quality path is coherent.

## Output Contract

For a design task, produce a derivation spec, not a generic implementation plan.

For a review task, lead with faithfulness gaps: unsupported claims, unsafe compression, missing judgments, missing raw-state coverage, weak gates, scalar confidence, stale or scope-contaminated evidence, brittle node boundaries, missing evals, and premature optimization.

For an interview task, ask concrete expert questions, translate the answers into obligations, judgments, raw signals, dimensions, fidelity requirements, confidence, gates, and evals, then ask the expert to review the translated spec rather than a vague brainstorm.

For implementation, preserve the derivation spec as the contract. Local project conventions, code architecture, and validation commands come from the target repository, not from this skill.

## Failure Modes

- Summary soup: raw state becomes summary, then summary of summaries, then generated artifact.
- Schema worship: structured but irrelevant or lossy data is treated as sufficient.
- Universal semantic layer: purpose-blind observations are treated as reusable truth.
- Fixed pipeline thinking: every work product is forced through the same stages.
- Unsupported fluency: output sounds right but claims do not survive evidence checks.
- Premature aggregation: exact commitments, stakeholder views, methodology, or objections collapse before downstream judgments are done with them.
- Scalar confidence: trust is reduced to one number instead of evidence, source, scope, freshness, interpretation, contradiction, and user fit.
- Final-only evals: quality is judged only at the visible artifact, hiding where faithfulness was gained or lost.
