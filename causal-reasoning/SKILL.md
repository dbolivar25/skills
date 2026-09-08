---
name: causal-reasoning
description: Use when reproduction or probe evidence needs a causal assessment, or a diagnostic loop needs its next discriminating probe. Load it to judge reproduction adequacy, rank falsifiable hypotheses and distinguish a supported cause from an untested explanation.
---

# Causal reasoning

Use the [core contract](../contracts/composition.md#core-skills) .

**Inputs:** Exact symptom, intended behavior, source context, reproduction/minimization
receipts, ranked hypotheses and actual probe observations; correction/verification
scope.

A tight, red-capable loop is the gate. Judge the supplied evidence before forming a
causal theory. A command string, a proposed harness or an assertion that tests passed is
not an execution receipt.

## Gate on reproduction

The reproduction must have been run at least once and must drive the actual symptom, not
merely complete without an error. Its receipt identifies command or harness,
input/environment, observed output and the assertion that catches this bug. It is fast
enough for iteration, agent-runnable when possible and repeatable; for nondeterministic
bugs, require a pinned, meaningfully raised reproduction rate instead of invented
determinism. Human-in-loop evidence names that limit.

The minimized scenario retains the same symptom. Require observations supporting that
removed inputs/callers/config are unnecessary and remaining elements are load-bearing,
or identify the remaining minimization work.

Without the gate, return a reproduction or minimization evidence need with the missing
property and the observation that would satisfy it. Do not generate the hypothesis phase
early. Source can help design the loop but is not a replacement for having run it.

## Rank and discriminate

After the gate, produce 3–5 ranked hypotheses before choosing a probe. Each states why
it fits and a falsifiable prediction: changing X would remove or worsen Y. A single
favored explanation invites anchoring; a claim with no discriminating prediction is not
ready to test.

Choose the next probe for its ability to separate live explanations. Prefer a single
variable, a relevant seam and a clear expected observation. For performance, a
timing/profile/query-plan comparison can be more informative than logs. Return the probe
design, not an instruction executed by the core.

## Incorporate observations

Update the ranking from actual probe results. An unavailable debugger, failed harness or
missing log is not falsification of a product hypothesis. Preserve confounds and
alternative explanations. A temporal deployment correlation alone does not prove cause.
Repeat or refine when evidence cannot distinguish them.

Return the verified cause when evidence supports the mechanism and rules out material
alternatives; otherwise return the live hypotheses and exact next need. Name the
correction direction and regression seam without applying a fix. A test at the wrong
seam cannot lock down the real failure pattern; absence of a correct seam is itself a
design finding.

## Check an authorized correction's evidence

When supplied fixed-code receipts exist, check the original unminimized loop,
correct-seam regression, relevant runtime behavior and instrumentation cleanup. A green
regression alone does not establish that the original symptom stopped. Return what is
verified and remaining gaps. The caller owns executing probes, fixes, cleanup and the
post-mortem handoff.
