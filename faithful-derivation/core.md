# Faithful derivation core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Task mode, work-product purpose/obligations, supplied domain/source context, proposed or actual graph/artifact, accepted design where relevant and evidence/support/evaluation results.

The work product is the product; the workflow is the means. Design backward from
what the output must get right, then judge whether its representations and
transformations preserve that ability. Read [vocabulary](GLOSSARY.md) and the
[derivation contract](CONTRACT.md). All its obligations remain applicable to the
selected task; missing inputs create precise evidence or owner-decision needs.

For a proposed design, apply [design coverage](guides/design-new-work-product-workflow.md)
and return the [derivation spec](templates/derivation-spec.md). For an existing
proposal or observed workflow, apply [review coverage](guides/review-existing-workflow.md)
and return the [review report](templates/review-report.md). These core methods
consume supplied context; they do not query sources or operate a workflow.

A conceptual proposal is judged as a design. Actual fidelity or publication
claims require source/output and execution evidence. Never turn a future support
policy into an assessment of claims that do not yet exist.

Use the supporting cores with the inputs their judgments require:

- [Preservation](../information-preservation/core.md) maps downstream needs to
  required fidelity or assesses a supplied source-to-output transformation.
- [Claim support](../claim-support/core.md) assesses actual claims and sources.
  For future policy, use its evidence/confidence reference instead of fabricating
  concrete claims or assessments.
- [Evaluation design](../evaluation-design/core.md) turns quality obligations
  and a proposed system into an evaluation plan; it does not return executed quality.

Integrate these results with the DAG, raw-state semantics, persistence/promotion,
publication gates and output obligations. Shared retrieval may be neutral;
semantic observations remain purpose- and scope-bound until their promotion
contract earns reuse. A generic summary or scalar confidence cannot replace the
judgments. Exact commitments, owners, dates, stakeholder distinctions and scope
survive until consumers no longer need them.

For handoff, return the accepted obligations mapped to proposed responsibilities,
representations, gates, confidence/rendering, evals and intentional durable state.
Unassigned or unproven steps remain visible. The shell owns expert rounds,
implementation and live receipts. PASS/REVISE/REPLAN describes derivation adequacy,
not permission to show, send, persist or execute the result.
