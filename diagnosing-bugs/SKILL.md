---
name: diagnosing-bugs
description: Use when broken, failing, throwing, flaky, or slow behavior needs a verified cause. Load it to build a tight reproduction signal and falsify ranked hypotheses; diagnosis alone does not authorize a fix.
---

# Diagnose a bug

Read the [core](core.md) and [diagnostic operations](operations.md). The operation
guide preserves loop construction, minimization, redaction, instrumentation,
performance probes and authorized fix/cleanup steps. Classify diagnosis-only
versus fix-authorized at the outset; the guide does not grant mutation authority.

Build and run the smallest symptom-specific feedback loop. Supply actual command,
output, repeatability and minimization receipts to the core. Fulfill reproduction
needs before entering its hypothesis phase. Show ranked hypotheses and execute
one discriminating probe at a time, feeding observed results back to the core.

When evidence or capabilities are unavailable, return the actual limitation and
next acquisition path. Do not claim a cause from a planned experiment. In a
read-only task, deliver the causal result and correction direction without edits.

When a fix is authorized, use the correct regression seam, apply the change,
rerun the original loop and relevant checks, remove instrumentation and capture
the established cause. Use core judgment to assess those receipts. Keep any
architectural follow-up separate from the correction just proved.
