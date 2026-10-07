---
name: review
description: Use when code, a design, a plan, or a reported result needs an assessment of correctness, fit, or risk, including PR rereviews and independent Steward acceptance. Investigate consequential claims, try to disprove candidate findings, and return a judgment suited to the object being reviewed.
---

# Review

Understand the requested outcome, current candidate, governing constraints, and kind of review. Obtain the actual material and relevant evidence rather than grading an unsupported summary. Review is an investigation; follow the surrounding task's authority for any requested fixes or platform actions.

## Select the assessment

- Code or PR: read [code/PR review](references/code-review.md) for comparison defaults, the two review axes, actionable findings, severity, verdicts, and live-action readback. Pin the comparison and current head; inspect the actual aggregate change, affected callers, contracts, state, failure paths, and relevant evidence. For a bare local review, start with tracked staged and unstaged changes; inspect relevant untracked files without treating unrelated work as part of the candidate. If clean, establish an honest branch merge-base comparison from repository context. For a branch/PR request, use the named target and merge-base comparison. Resolve materially ambiguous scope from current context and ask only when a meaningful target cannot be established. Use [GitHub](../github/SKILL.md) when platform state, conversation completeness, or CI needs its methods.
- Understanding or research: read [semantic reconstruction](references/understanding.md) to reconstruct the actual account and [non-code assessment](references/assessment.md) for its falsification criteria. Test whether the account represents the owner's question and current reality, exposes its premises and coverage, and supports the next commitment without prematurely excluding live alternatives.
- Plan or design: read [non-code assessment](references/assessment.md). Test Intent fit, assumptions, real system seams, authority, closure, and proportionality. Trace a concrete success and failure path. Preserve accepted tradeoffs unless new evidence changes their basis.
- Steward report: read [Steward review criteria](../steward/references/review.md) and its phase-specific criteria. Use its exact statuses, evidence, and confidence fields. Ordinary PR approval is not runtime acceptance. The reviewer must be a separate actual actor and must not alter the candidate or integrate its own judgment.

Use [contracts](../engineering/references/contracts.md), [modules](../engineering/references/modules.md), [upgrades](../engineering/references/upgrades.md), [architecture](../engineering/references/architecture.md), or [testing](../engineering/references/testing.md) only for the matching disputed contract, seam, compatibility, design, or proof. Reading a reference does not begin an implementation workflow. Read [claim support](references/claim-support.md) when source independence, contradictions, freshness, or statement strength needs deliberate assessment.

## Falsify before reporting

For each candidate finding, identify the triggering condition, affected behavior, mechanism, consequence, and supporting source. Read enough context to distinguish the proposed defect from existing policy or intentional behavior. Search for facts that would disprove it and use a discriminating check where practical.

Separate observation, supported inference, hypothesis, and missing proof. Consider material contradictions, source independence, freshness, and scope. Unsupported certainty and untested hypotheticals are not findings. A failed query or passing test has only its actual coverage.

On rereview, refresh changed premises and inspect the affected regions and relevant previous feedback. Reuse sound investigation. Do not revive settled concerns or expand the task into an unrelated architectural audit. When explicitly asked to grill a proposal, read [grilling](references/grilling.md) and use dependency-aware questions in rounds, preserving settled answers; do not substitute a static verdict for the requested interview.

## Return a useful judgment

Lead with the supported conclusion. Include actionable surviving findings with precise locations when applicable, then material coverage limits and unresolved decisions. Scale detail to the consequence and requested review. Keep genuine uncertainty visible rather than manufacturing a verdict.

For Steward, return the required runtime review response only after checking the requested criteria. Acceptance and subsequent work remain with the steward. For an explicitly requested live action, verify current target state and read back the action's result.
