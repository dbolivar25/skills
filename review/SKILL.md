---
name: review
description: Use when code changes need a correctness, request-fit, or merge judgment across diffs, PRs, rereviews, or unresolved feedback. Load it to investigate the actual change, falsify candidate findings, and return one supported verdict.
---

# Review

Read the [core](core.md). Own the complete code judgment: acquire the right target,
resolve its evidence, integrate the findings, and perform only requested actions.

Use the user's PR, branch, fixed point, range or named files. Without one, use
dirty working-tree changes first; otherwise compare against the merge base with
upstream, main or master. Verify a supplied fixed point resolves and its three-dot
diff is nonempty. Record the comparison and commit list once. Ask only when the
repository cannot identify an honest target.

Read governing instructions, neighboring implementations, tests and domain docs.
For a PR, follow [PR operations](../github-evidence/references/pr-operations.md)
to pin live state and relevant unresolved/resolved discussion. Use
understand-change for a current map and evidence capabilities for named gaps.
Do not rely on author prose or old heads as current proof.

Apply the core. When independent surfaces improve coverage, give investigators
the pinned target, criteria and relevant evidence; integrate their observations
through the core rather than pasting competing verdicts. Resolve obtainable
evidence needs and preserve unverified scope. Tests and source reads must stay
within the task's authority; a review does not silently fix code.

Return the integrated judgment, scope and limits. When review writing is also
requested, pass the current map and verdict to reviewability. Before a requested
live review action, reread the head, reapply affected judgment and follow PR
operations for the exact action and read-back. A draft verdict is not publication.
