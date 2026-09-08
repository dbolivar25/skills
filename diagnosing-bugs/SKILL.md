---
name: diagnosing-bugs
description: Use when broken, failing, throwing, flaky, or slow behavior needs a verified cause. Load it to build a tight reproduction signal and falsify ranked hypotheses; diagnosis alone does not authorize a fix.
---

# Diagnose a bug

Own the investigation from a reported symptom to a supported cause. Build a tight
feedback loop, use actual observations to discriminate explanations, and carry an
authorized correction through the original symptom and relevant checks. Use the
[composition contract](../contracts/composition.md#operational-callers) .

Read [diagnostic operations](operations.md) for loop construction, minimization,
redaction, instrumentation, performance probes and cleanup. Establish diagnosis-only
versus fix-authorized from the task; a caller's existing fix authority carries through
to a bounded diagnostic assignment.

Apply [causal reasoning](../causal-reasoning/SKILL.md) to actual command, output,
repeatability and minimization receipts. Fulfill its reproduction needs before entering
the hypothesis phase. Show ranked hypotheses, run one discriminating probe at a time and
return observations for reassessment. Source reads can help construct the loop; they
cannot replace having run it.

Use [Grafana evidence](../grafana/SKILL.md) for bounded live telemetry when it
can answer a named question. Supply its population, query scope and limits to causal
reasoning. A deployment correlation alone does not establish a cause.

Resolve obtainable evidence needs within scope. An unavailable debugger or failed
harness limits the investigation; it does not falsify a product hypothesis. Return the
supported cause and correction direction, or the live hypotheses, actual limitation and
smallest next observation. Do not invent a cause from a planned experiment.

When a fix is authorized, use [verification design](../verification-design/SKILL.md) to
identify the regression seam and required implementation evidence. Apply the correction,
rerun the original unminimized loop and relevant checks, remove instrumentation, and
return those receipts to causal reasoning. Capture the established cause and remaining
limits. Keep a broader architectural follow-up separate from the correction just proved.
