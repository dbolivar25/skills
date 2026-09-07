---
name: evaluation-design
description: Use when an AI workflow or instruction change needs a concrete way to measure quality, localize failures, or test whether a component earns its cost. Load it to design representative cases, independent judgments, layer-specific checks, and decision-bearing ablations.
---

# Evaluation design

Read the [core](core.md) and evaluation library. Gather the intended quality,
candidate behavior, known failures, current observations and consequences of
error. A proposed system is a valid input; actual output is needed only for claims
about observed quality. Distinguish design examples from held-out evaluation data.

Apply the core to produce cases, oracles, comparisons, ablations and decision
rules. Resolve missing system facts or representative examples from available
sources. Return owner thresholds as decisions rather than guessing them.

For a design-only request, return the plan and stop. If evaluation execution is
also requested, run it through the actual environment, keep raw observations and
conditions, and supply them back for interpretation. Failures of access or
execution are evidence gaps, not passing cases. Report planned and executed work
separately and never infer a general improvement from one favorable run.
