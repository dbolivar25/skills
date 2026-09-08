---
name: prototype
description: Use when an unresolved question about logic, state, interaction, or layout is best answered with a throwaway implementation. Load it to build a runnable experiment and return observed learning, limitations, and the artifact.
---

# Prototype an uncertainty

Build and exercise the smallest throwaway implementation that can answer the caller's
unresolved question. Return observed learning, its limits and the runnable artifact. Use
the [composition contract](../contracts/composition.md#operational-callers) .

Give [experiment design](../experiment-design/SKILL.md) the question, the decision it
could change, current surface or model, constraints and available observations. Resolve
missing source through reads and missing owner choices through questions. Use its
experiment design to choose the distinguishing scenarios and necessary fidelity. A known
answer needing explanation belongs to [show-me](../show-me/SKILL.md) .

Read [the experiment contract](references/experiments.md) , then the selected path:

- [Logic experiment](branches/logic-experiment.md) for state, transitions and
  model behavior. Expose visible state, free play and guided scenarios.
- [UI experiment](branches/ui-experiment.md) for alternative structure and
  appearance. Build comparable variants with direct selection.

Carry domain, product, brand, accessibility and authority constraints into the
experiment. Use [interface design](../interface-design/SKILL.md) when its controls or
visual structure need judgment. For Augment surfaces, apply
[Augment design](../augment-design/SKILL.md) and honor its surface obligations;
throwaway fidelity does not license invented identity or source claims.

Build with scratch data and simple mechanics. Exercise the relevant scenarios, record
what happened, and give actual observations to experiment design for interpretation. If
an observation remains ambiguous, refine the experiment only as far as the question
requires. A failed run produces a limitation, not imagined learning or production proof.

Return the question, observed answer or remaining uncertainty, evidence, artifact
location and what the experiment cannot establish. Preserve it as the experiment
contract requires. The caller owns the next design or implementation decision.
