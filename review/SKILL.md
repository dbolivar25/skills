---
name: review
description: Use when code, a design, a plan, or a reported result needs an assessment of correctness, fit, or risk, including PR rereviews and independent Steward acceptance. Investigate consequential claims, try to disprove candidate findings, and return a judgment suited to the object being reviewed.
---

# Review

Own the requested judgment. Understand the intended outcome, actual candidate, governing
constraints, and decision the review must support. Obtain the material and relevant
evidence rather than grading an unsupported summary. The surrounding task supplies
scope and authority for fixes or platform actions.

## Select the assessment

| Object or job | Read before its judgment |
| --- | --- |
| Code or PR | [Code/PR review](references/code-review.md) for the target/comparison, request fit and codebase fit, investigation, findings, and verdict. Use [GitHub](../github/SKILL.md) when live state, conversation completeness, or CI needs acquisition. |
| Understanding or research account | [Semantic reconstruction](references/understanding.md) to recover source, meaning, coverage, and gaps, then [non-code assessment](references/assessment.md) to test whether the account supports its intended decision. |
| Plan or design | [Non-code assessment](references/assessment.md) for intent, assumptions, real system seams, authority, delivery/verification closure, and proportionality. Preserve settled tradeoffs unless material evidence changes their basis. |
| Independent Steward review | [Steward review criteria](../steward/references/review.md) for the exact phase, criteria, statuses, evidence, and confidence response. A separate actual actor must review without altering the candidate or integrating its own judgment. Ordinary PR approval does not establish runtime acceptance. |
| Explicit grilling interview | [Grilling](references/grilling.md) for dependency-aware question rounds and shared understanding. Do not replace the requested interview with a static verdict. |

For a standalone request to understand or explain material, semantic reconstruction can
supply the grounded map without adding an approval decision. Reuse a current map rather
than making another method reconstruct the same source.

Select deeper judgments only when they can change the assessment: [contracts](../engineering/references/contracts.md)
for a disputed value/state/effect contract, [modules](../engineering/references/modules.md)
for ownership or a seam, [upgrades](../engineering/references/upgrades.md) for external
compatibility, and [testing](../engineering/references/testing.md) for what checks prove.
Read [claim support](references/claim-support.md) when source independence, contradictions,
freshness, or statement strength needs deliberate assessment. Reading a design method
contributes to the review; it does not start implementation.

## Falsify before reporting

For a candidate finding, establish the trigger, affected behavior, mechanism,
consequence, and source. Inspect enough context to distinguish a defect from policy or
intentional behavior. Search for facts that would disprove it; use a discriminating
permitted check when it can settle a consequential claim.

Keep observation, supported inference, hypothesis, and missing proof distinguishable.
A failed query or green test has only its actual coverage. Unsupported certainty and
untested hypotheticals are not established findings. A concern becomes a blocker only
under a governing criterion or authority; severity is not permission to overrule an
informed owner tradeoff.

On rereview, refresh changed premises, affected regions, and relevant previous feedback.
Reuse sound investigation and preserve settlements. Do not revive the same concern
without a changed basis or broaden a focused review into an unrelated audit.

## Return a useful judgment

For code, lead with actionable surviving findings when present, followed by the overall
recommendation and coverage of both review axes. For non-code work, lead with the
supported conclusion and the reasons that can change the next decision. Include precise
locations, material evidence limits, and unresolved owner choices. Use the supplied
result schema when one is required; otherwise keep the result proportional and readable.

A no-findings result still names its checked scope and limits. A review recommendation,
platform action, Steward review response, and subsequent acceptance are distinct results.
Perform an explicitly requested live action against current target state and read back
its actual result. Finish with the supported judgment and any requested action receipt.
