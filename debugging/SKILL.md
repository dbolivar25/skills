---
name: debugging
description: Use when a system fails, behaves incorrectly, flakes, or slows down and the cause is unresolved. Establish the symptom, discriminate explanations with runnable probes or available production evidence, and verify a correction when fixing is part of the request.
---

# Debugging

Own a causal investigation to its strongest supported answer and the next useful action. Diagnosis and implementation authority come from the user's task. Use current repository, configuration, release, and telemetry evidence rather than assuming a remembered system is still serving.

## Establish the signal

Describe the expected and observed behavior, target environment, affected population, timing, frequency, and relevant changes. Preserve the original symptom and a reproducible observation receipt.

When possible, produce a tight runnable reproduction with the relevant data and execution path. Read [diagnostic operations](references/operations.md) for loop/harness and instrumentation mechanics, and [causal reasoning](references/causal-reasoning.md) for reproduction adequacy or difficult causal interpretation. Minimize only while preserving the behavior that could cause the failure. Production-only, intermittent, distributed, or permission-dependent problems may require a bounded observation strategy instead. A missing local red command does not prevent useful hypotheses.

For performance, measure the actual bottleneck and pin comparable workloads, windows, units, and denominators. Use [Grafana](../grafana/SKILL.md) evidence methods for current metrics, logs, traces, or profiles.

## Discriminate causes

Form a small ranked set of falsifiable explanations from the evidence. Do not require a fixed hypothesis count. For each live explanation, identify what observation would distinguish it from the strongest alternative.

Choose the cheapest useful probe that can change the ranking. Control the relevant input or condition; avoid changing several possible causes at once. Prefer direct code paths, traces, profiles, query plans, or experiments over a story that merely fits the symptom.

Track what each result rules out, supports, or leaves unresolved. Correlation with a deployment, absence of logs, or success under a simplified model has limited causal force. Verify selectors and instrumentation before interpreting silence. Preserve contradictory evidence and the real fidelity limits of probes.

## Correct and close

When a fix is requested, change the supported mechanism at the appropriate seam and retest the original symptom. Use a meaningful regression when needed. Recheck relevant surrounding behavior and compare like workloads for performance changes. Remove temporary instrumentation, forced failures, and probe-only behavior before claiming a usable fix; preserve a useful diagnostic harness only when its ongoing ownership is justified.

Finish with the strongest supported cause, its decisive evidence and limits, the correction and observed result if applicable, or ranked remaining explanations with the smallest discriminating next observation. Do not claim resolution from a green check that did not exercise the failure.
