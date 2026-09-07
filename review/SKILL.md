---
name: review
description: Use when code changes need a correctness, request-fit, or merge judgment across diffs, PRs, rereviews, or unresolved feedback. Load it to investigate the actual change, falsify candidate findings, and return one supported verdict.
---

# Review

Return findings and one code judgment grounded in the actual change, its intended
behavior, and the repository that must carry it. The work and its evidence outrank
the author's preferred story; preserve disagreements between them.

Read [code judgment](branches/code-judgment.md) to pin the target, investigate
both axes, and falsify findings. It consumes the shared
[reconstruction method](../understand-change/SKILL.md); reuse a current review
map already established in the task rather than reconstructing it twice.

The result identifies supported defects, request fit, codebase fit, checked
validation, and remaining uncertainty. A summary alone does not provide a verdict.
Recheck the target when its source changes; an old head cannot support a current
merge recommendation.

Review does not itself authorize fixes or live actions. Carry forward actions the
user already requested within their scope. Before publishing a GitHub review,
read [PR operations](../github-evidence/references/pr-operations.md), verify the
current head, and read back the result. Draft, comment, approval, requested changes,
reply and thread resolution are distinct outcomes.

A PR description or review guide is a separate result owned by
[reviewability](../reviewability/SKILL.md). When the task requests both, finish the
judgment and pass its current review map to that skill. Do not start review writing
merely because a verdict would be useful to explain.
