---
name: evaluation
description: Use when deciding whether an AI system, instruction change, or component improves quality or earns its cost. Build representative cases and independent judgments, run authorized comparisons, localize failures, and return the decision the evidence supports.
---

# Evaluation

Own a complete empirical comparison when the task asks for it. An evaluation design request ends with an executable plan. An authorized run also needs actual results and interpretation. Distinguish these states plainly; structural validation and an uncalibrated model's self-assessment do not establish improvement.

## Make the decision measurable

Identify the behavior and decision at issue: adopt, revise, remove, or collect more evidence. Read [evals and ablations](references/evals-and-ablations.md) for the detailed case/oracle/layer/ablation method needed. Define consequential failure limits, cost/latency concerns, and observations that would change the choice. Scale the study to that decision; a focused comparison can use a small case set without claiming population-wide quality. Use existing owner constraints. Surface thresholds that require an owner decision instead of inventing numerical targets.

Build representative cases covering real use, plausible false positives, boundary cases, consequential rare failures, and known regressions. Preserve source provenance, access, and decision-time boundaries. Separate development material from final judgment cases; protect holdouts from candidate and grader leakage.

Use an independent oracle where possible. For expert or model judgments, define the rubric, calibration examples, disagreements, and uncertainty. A grader repeating the candidate's assumptions is not proof. Keep source evidence, adjudication, and system inputs distinct when their separation matters.

## Compare and localize

Hold relevant inputs and conditions fixed. Specify baseline and candidate versions, setup, observations, repeat strategy, and decision rule. Account for stochastic variation and sample limits proportionally. Preserve failed runs and consequential strata rather than hiding them in one aggregate.

Inspect only the layers the system actually contains. Connect failures to retrieval, judgment, transformation, support, or publication where those boundaries exist. Passing a final artifact does not establish that every intermediate is reusable or faithful.

For an ablation, state the component removed, why it might matter, expected difference, observed quality/cost/latency, and the resulting design decision. Deletion is a valid result. Optimize cost only while preserving the constraints the evaluation protects.

## Return a decision-bearing result

For a plan, provide executable cases, setup, checks, rubric, comparison, result recording, and unresolved expert choices. For a run, include exact candidate/baseline identity, observed results, meaningful uncertainty, failure localization, and the supported decision.

Keep planned, executed, and independently judged evidence separate. Do not claim general optimality from one favorable sample. Finish when the owner can make the intended choice or see the precise evidence still missing.
