# Review An Existing Workflow

Use this guide to audit a proposed, designed, implemented, or deployed workflow against faithful derivation.

Apply the shared [derivation contract](../CONTRACT.md). This guide owns the
task-specific method below; read its references before their governed decisions.

## Review Stance

Judge the workflow by what the visible work product must get right, not by how plausible the pipeline looks.

Start from actual workflow behavior, code, docs, prompts, graph definitions, schema, or runtime examples when available. If the workflow is only conceptual, review the spec as a hypothesis and mark missing evidence as risk.

Read the [review report](../templates/review-report.md) before the audit to retain
its full coverage obligations.

## Audit Pass

1. Name the work product.
   Completion criterion: the review states the user, job, use moment, output format, quality bar, and non-goals.

2. Recover output obligations.
   Completion criterion: the review lists what the output must correctly claim, recommend, rank, omit, phrase, qualify, support, and decay.

3. Map obligations to existing judgments.
   Completion criterion: every obligation is mapped to an existing node, prompt, tool, rule, model responsibility, or explicit gap.

4. Inspect raw-state coverage.
   Read [`raw-state-and-semantics`](../reference/raw-state-and-semantics.md) before judging coverage.
   Completion criterion: the review names the raw sources actually inspected, missing raw sources, scope rules, retrieval handles, permissions, windows, prior state, and stale-source risks.

5. Inspect compression boundaries.
   Read [`compression-and-dimensions`](../reference/compression-and-dimensions.md) before judging coverage.
   Completion criterion: every summarization, extraction, classification, aggregation, cache, state write, or context handoff says what survives and what may be lost.

6. Inspect the DAG.
   Read [`judgment-dags-and-edges`](../reference/judgment-dags-and-edges.md) before judging coverage.
   Completion criterion: nodes and edges express real judgment dependencies; speculative generation, verification, invalidation, scope, fidelity, and policy gates are not collapsed into one linear chain.

7. Inspect support packages.
   Read [`evidence-support-and-confidence`](../reference/evidence-support-and-confidence.md) before judging coverage.
   Completion criterion: rendered claims and actions can be traced to judgment sources, source support, confidence, contradictions, open questions, and rendering policy.

8. Inspect confidence and rendering.
   Completion criterion: confidence is structured enough to change language or omission behavior; scalar confidence or model confidence alone is treated as a gap.

9. Inspect publication gates.
   Read [`publication-and-rendering`](../reference/publication-and-rendering.md) before judging coverage.
   Completion criterion: the workflow distinguishes generating a candidate from showing, sending, recommending, persisting, or acting on it.

10. Inspect evals.
   Read [`evals-and-ablations`](../reference/evals-and-ablations.md) before judging coverage.
    Completion criterion: final-output, judgment, edge/fidelity, retrieval, and ablation evals exist or are listed as gaps.

## Findings To Prioritize

Before this decision, read [`anti-patterns`](../reference/anti-patterns.md).

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
