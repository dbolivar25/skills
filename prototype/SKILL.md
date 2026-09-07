---
name: prototype
description: Use when an unresolved question about logic, state, interaction, or layout is best answered with a throwaway implementation. Load it to build a runnable experiment and return observed learning, limitations, and the artifact.
---

# Prototype an uncertainty

Start from the question the experiment must answer, the decisions it could
change, and the observations that distinguish possible answers. If the answer
is already established, use an explanation rather than this experimental method.

Read the [experiment contract](references/experiments.md), then select:

- [Logic experiment](branches/logic-experiment.md) for state, transitions and
  model behavior. Return visible state, free play and guided scenarios.
- [UI experiment](branches/ui-experiment.md) for alternative structure and
  appearance. Return comparable variants with direct selection.

Carry the caller's domain, product, brand and authority constraints into the
experiment. Do not redesign its purpose. Use scratch data and runnable artifacts;
prototype shortcuts do not weaken permission or source-accuracy requirements.

Exercise the relevant scenarios and record what happened. If the artifact could
not be run, report that limit rather than supplying an imagined observation.
Return the question, evidence, answer or remaining uncertainty, artifact location
and what the experiment cannot establish. The caller owns the subsequent design
or implementation decision; promising behavior is not production proof.
