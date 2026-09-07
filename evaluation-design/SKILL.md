---
name: evaluation-design
description: Use when an AI workflow or instruction change needs a concrete way to measure quality, localize failures, or test whether a component earns its cost. Load it to design representative cases, independent judgments, layer-specific checks, and decision-bearing ablations.
---

# Evaluation design

Given the intended behavior, failure consequences, candidate system or change,
and available evidence, return a runnable evaluation plan: cases, observations,
oracles, comparison, decision rules and gaps. This skill designs evaluations;
execution occurs only within the surrounding task's authority.

Read [evals and ablations](references/evals-and-ablations.md) for the multi-level
method. Use the levels the system actually contains; record inapplicability
instead of inventing a retrieval layer or a business metric.

1. **Define the decision.** State what evidence would lead to adoption, revision,
   rejection or more investigation. Obtain owner thresholds when consequences
   require their judgment; do not invent numeric targets to complete a template.
2. **Build representative cases.** Include expected use, plausible false
   positives, boundary conditions, rare consequential failures and known
   regressions. Preserve source provenance and access constraints. Separate
   cases used for development from those used to judge the final change.
3. **Choose independent observations.** For each case identify the expected
   behavior, source or expert basis, observation point and failure meaning.
   A grader repeating the implementation's assumptions is not independent proof.
   Define the rubric and calibration examples when human or model judgment is
   needed; leave unresolved expert disagreement visible.
4. **Localize failure.** Connect output checks to the retrieval, judgment,
   transformation, support or publication boundary that could cause the error.
   The final artifact passing does not prove every intermediate is reusable.
5. **Compare and ablate.** Hold inputs and relevant conditions fixed. State what
   is removed, why it should matter, expected degradation, observed metric and
   the design decision that follows. Account for stochastic variation with a
   justified repeat or uncertainty plan; one favorable run is not a general win.
6. **Return an executable plan.** Specify inputs, setup, checks, rubric, comparison,
   failure drilldown, owners of unresolved judgments and where results will be
   recorded. Distinguish planned tests from executed results.

Ablations may justify deletion as well as additions. Optimize cost or speed only
while preserving the quality and risk constraints the evaluation was built to
protect. Do not assert improvement from a plan, structural validation, or a
model's uncalibrated confidence in its own work.
