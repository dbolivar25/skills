---
name: faithful-derivation
description: Use when an AI workflow derives a visible work product or decision from customer or operational state. Load it to preserve evidential fidelity across judgments, support, confidence, publication, and evals; executable mechanics stay with the workflow skill.
---

# Faithful derivation

Use the [core contract](../contracts/composition.md#core-skills) .

**Inputs:** Task mode, work-product purpose/obligations, supplied domain/source context,
proposed or actual graph/artifact, accepted design where relevant and
evidence/support/evaluation results.

The work product is the product; the workflow is the means. Design backward from what
the output must get right, then judge whether its representations and transformations
preserve that ability. Read [vocabulary](GLOSSARY.md) and the
[derivation contract](CONTRACT.md) . All its obligations remain applicable to the
selected task; missing inputs create precise evidence or owner-decision needs.

For a proposed design, apply
[design coverage](guides/design-new-work-product-workflow.md) and return the
[derivation spec](templates/derivation-spec.md) . For an existing proposal or observed
workflow, apply [review coverage](guides/review-existing-workflow.md) and return the
[review report](templates/review-report.md) . These core methods consume supplied
context; they do not query sources or operate a workflow.

A conceptual proposal is judged as a design. Actual fidelity or publication claims
require source/output and execution evidence. Never turn a future support policy into an
assessment of claims that do not yet exist.

Use the supporting cores with the inputs their judgments require:

- [Preservation](../information-preservation/SKILL.md) maps downstream needs to
  required fidelity or assesses a supplied source-to-output transformation.
- [Claim support](../claim-support/SKILL.md) assesses actual claims and sources.
  For future policy, use its evidence/confidence reference instead of fabricating
  concrete claims or assessments.
- [Evaluation design](../evaluation-design/SKILL.md) turns quality obligations
  and a proposed system into an evaluation plan; it does not return measured quality.
- [Writing for agents](../writing-for-agents/SKILL.md) designs node-local prompts
  and Skill interfaces when instructions are part of the proposal. Supply the
  bounded responsibility and context contract; keep graph control out of prose.

Integrate these results with the DAG, raw-state semantics, persistence/promotion,
publication gates and output obligations. Shared retrieval may be neutral; semantic
observations remain purpose- and scope-bound until their promotion contract earns reuse.
A generic summary or scalar confidence cannot replace the judgments. Exact commitments,
owners, dates, stakeholder distinctions and scope survive until consumers no longer need
them.

When domain expertise is missing, use the [interview guide](guides/expert-interview.md)
to return concrete questions for the unresolved judgments. The caller asks those
questions and supplies actual answers. Preserve settled context; the full question bank
is not a mandatory interview.

For an implementation handoff, apply the
[handoff guide](guides/implementation-handoff.md) to map accepted obligations to
responsibilities, representations, gates, confidence/rendering, evals and intentional
durable state. Return proposed contracts and verification needs; the caller implements
them and supplies real observations.

Integrate supporting results into one derivation design or assessment. If a support
policy cannot be enforced from the proposed representation, revise the edge or retain
the missing decision rather than presenting two incompatible recommendations. Unassigned
or unproven steps remain visible. PASS/REVISE/REPLAN describes derivation adequacy; the
caller owns any publication, persistence or execution.
