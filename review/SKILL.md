---
name: review
description: Use when code changes need a correctness or merge judgment, or work needs a pull request description or review guide. Load it to reconstruct the real change and preserve evidence, uncertainty, and reviewer judgment; select an artifact, a code verdict, or both from the request.
---

# Review

A useful review begins with a faithful model of the work. The requested outcome
then determines what to do with that model: **judge code** or **make work
reviewable**. These are different branches, not different sources of truth.

The work and its evidence outrank the author's preferred story. Preserve material
disagreement between them. Reviewing or drafting does not authorize code edits,
publication, approval, replies, or thread resolution; carry forward any such
action the user has explicitly requested and keep its scope distinct.

## Select the outcome

| Requested outcome | Read before starting | Result |
| --- | --- | --- |
| Correctness, request fit, merge readiness, or rereview of code | [Code judgment](branches/code-judgment.md) | Findings and one integrated judgment |
| PR description, review guide, or another artifact for someone judging work | [Review artifact](branches/review-artifact.md) | A faithful, navigable account; no inferred verdict |
| Both | Both branches | Reuse the same grounded model; satisfy both requested outcomes |

The artifact branch also covers non-code work. Do not impose code-specific axes
or repository operations on a document, proposal, or other evidence packet.
Ordinary retrieval, summarization, or polishing is not review just because a
reviewer might eventually read the result.

## Reconstruct once

Read [reconstructing work](references/reconstruct-work.md) before either branch.
Build the **review map** there from the real source, requested outcome, meaningful
regions, contracts, evidence, and uncertainty. This is working material, not a
required visible template. Complete investigation and concise delivery coexist.

For a GitHub PR, read [PR operations](references/github-pr-operations.md) to pin
live state and interpret existing threads. Use `github-evidence` when obtaining
complete state, discussion, or CI evidence needs its helpers. Evidence acquisition
does not supply the verdict.

## Keep the result current

Every material region must remain represented or visible as unexplained scope.
Separate intended outcomes from observations, evidence from inference, and
settled facts from decisions still belonging to the reviewer. Recheck the real
source before delivering; when a PR head changes, revalidate affected claims.

Perform only an explicitly requested live action. The PR operations reference
owns the distinctions among commenting, approving, requesting changes, replying,
and resolving, plus current-head checks and live read-back. Report a successful
action only after that read-back; a drafted artifact is not a publication receipt.
