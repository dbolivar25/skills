# Review An Existing Workflow

Use this guide to audit a proposed, designed, implemented, or deployed workflow against faithful derivation.

Required references:

- [`../reference/raw-state-and-semantics.md`](../reference/raw-state-and-semantics.md)
- [`../reference/compression-and-dimensions.md`](../reference/compression-and-dimensions.md)
- [`../reference/judgment-dags-and-edges.md`](../reference/judgment-dags-and-edges.md)
- [`../reference/evidence-support-and-confidence.md`](../reference/evidence-support-and-confidence.md)
- [`../reference/publication-and-rendering.md`](../reference/publication-and-rendering.md)
- [`../reference/evals-and-ablations.md`](../reference/evals-and-ablations.md)
- [`../reference/anti-patterns.md`](../reference/anti-patterns.md)
- [`../templates/review-report.md`](../templates/review-report.md)

## Review Stance

Judge the workflow by what the visible work product must get right, not by how plausible the pipeline looks.

Start from actual workflow behavior, code, docs, prompts, graph definitions, schema, or runtime examples when available. If the workflow is only conceptual, review the spec as a hypothesis and mark missing evidence as risk.

## Audit Pass

1. Name the work product.
   Completion criterion: the review states the user, job, use moment, output format, quality bar, and non-goals.

2. Recover output obligations.
   Completion criterion: the review lists what the output must correctly claim, recommend, rank, omit, phrase, qualify, support, and decay.

3. Map obligations to existing judgments.
   Completion criterion: every obligation is mapped to an existing node, prompt, tool, rule, model responsibility, or explicit gap.

4. Inspect raw-state coverage.
   Completion criterion: the review names the raw sources actually inspected, missing raw sources, scope rules, retrieval handles, permissions, windows, prior state, and stale-source risks.

5. Inspect compression boundaries.
   Completion criterion: every summarization, extraction, classification, aggregation, cache, state write, or context handoff says what survives and what may be lost.

6. Inspect the DAG.
   Completion criterion: nodes and edges express real judgment dependencies; speculative generation, verification, invalidation, scope, fidelity, and policy gates are not collapsed into one linear chain.

7. Inspect support packages.
   Completion criterion: rendered claims and actions can be traced to judgment sources, source support, confidence, contradictions, open questions, and rendering policy.

8. Inspect confidence and rendering.
   Completion criterion: confidence is structured enough to change language or omission behavior; scalar confidence or model confidence alone is treated as a gap.

9. Inspect publication gates.
   Completion criterion: the workflow distinguishes generating a candidate from showing, sending, recommending, persisting, or acting on it.

10. Inspect evals.
    Completion criterion: final-output, judgment, edge/fidelity, retrieval, and ablation evals exist or are listed as gaps.

## Findings To Prioritize

Lead with issues that can produce an unfaithful work product:

- unsupported claims or actions
- missing raw state for a high-risk judgment
- scope contamination across account, workspace, person, opportunity, or time
- stale evidence treated as fresh
- exact commitments, owners, dates, stakeholder views, or methodology compressed too early
- workflow-derived semantics reused without promotion contract
- candidate output published without evidence, freshness, permission, contradiction, relevance, or confidence gates
- confidence collapsed into one score
- final-output evals hiding retrieval, judgment, or edge failure
- expensive architecture that does not protect quality, fidelity, reuse, verification, or efficiency

## Output

Use [`../templates/review-report.md`](../templates/review-report.md). Include:

- posture: PASS, REVISE, or REPLAN
- work product and obligations
- judgment coverage map
- DAG / edge assessment
- raw-state and evidence gaps
- support / confidence / rendering gaps
- publication gate gaps
- eval gaps
- anti-patterns observed
- recommended next design moves

PASS means the derivation shape is coherent enough to implement or continue. REVISE means the work product direction is sound but specific contracts, gates, evidence, or evals need repair. REPLAN means the workflow shape is structurally wrong for the work product.
