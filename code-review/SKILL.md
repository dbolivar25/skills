---
name: code-review
description: Use when code changes need a correctness or merge judgment across PRs, branches, diffs, rereviews, unresolved feedback, or approval readiness. Load it to keep request fit, codebase fit, evidence lenses, and one current verdict under the same judge.
---

# Code Review

Review code as one **judge** using as many specialist lenses as the change
requires. Lenses gather evidence; this skill owns the integrated findings and
final recommendation.

This is review-only. Do not edit code, apply fixes, or expand into implementation
unless the user explicitly changes the task. Draft findings by default. Posting,
approving, requesting changes, replying, and resolving are separate actions that
require explicit user intent.

## 1. Pin the live target

Use the target the user supplied: pull request, branch, fixed point, commit range,
staged or unstaged changes, or named files. When none is supplied:

1. Review staged and unstaged changes when the working tree is dirty.
2. Otherwise review the current branch against its merge base with the upstream,
   `main`, or `master`.
3. Ask one question only when repository state does not identify an honest target.

For a fixed point, verify that it resolves and that the three-dot diff against
`HEAD` is non-empty. Record the comparison and commit list once.

For a GitHub pull request, read
[`references/github-pr-operations.md`](references/github-pr-operations.md) before
reviewing. Pin the repository, PR number, base, live head SHA, draft/open/merged
state, checks, merge state, and existing review threads. Recheck the head when a
review resumes after interruption or prior feedback.

State whether the task is review-only or includes a requested live action.

Completion criterion: the exact live target and side-effect boundary are explicit;
the diff exists; and a PR review is pinned to its current head rather than a stale
local or remembered state.

## 2. Recover the review contract

Find the request the change should satisfy, in this order:

1. The user's explicit instructions or supplied spec.
2. The pull request body and linked issue, PRD, decision, or review thread.
3. Issue references in commits and matching repository documentation.

If no request source exists, say that request fit is limited to the stated change
intent; do not invent a specification.

Load repository instructions and documented standards. For TypeScript work, use
`coding-standards`. Inspect neighboring code, tests, domain documentation, and
existing implementations before treating a pattern difference as a defect.

For pull requests, read unresolved threads and the relevant resolved history
before forming new findings. Existing comments are context to verify, not findings
to repeat. Group comments that share one root cause.

Completion criterion: the request source, standards sources, local precedent, and
existing review context are known or their absence is explicit.

## 3. Investigate two axes

Keep separate working notes for both axes:

- **Request fit** — Does the change implement the requested behavior without
  omissions, wrong behavior, or unrequested scope?
- **Codebase fit** — Is the implementation correct and coherent in this
  repository's contracts, architecture, tests, runtime, and conventions?

Trace material changed behavior beyond the diff hunk when necessary. Follow inputs,
state transitions, failures, persistence, protocol projections, callers, side
effects, and tests far enough to establish the observable consequence.

Use parallel investigators only when the change is broad enough that isolating the
two axes or specialist surfaces improves coverage. Give each investigator the
pinned target and relevant sources. Their output is evidence and candidate
findings, not final prose or an independent verdict.

Apply focused lenses only when the change earns them:

- When the diff changes a dependency version, lock graph, runtime image, or
  vendored tool, read
  [`references/dependency-bump.md`](references/dependency-bump.md). The lens
  returns compatibility evidence and residual risk; this skill retains the
  merge judgment.
- Use `designing-human-interfaces` when visible interaction or UI state is material.
- Use production evidence, `query-grafana`, or `diagnosing-bugs` when a claim
  depends on shipped behavior, reliability, or performance.
- Use `review-maps` when the user asks for a large-change review guide.

The judge integrates the evidence. A lens does not own merge judgment.

Completion criterion: every material changed behavior is accounted for on both
axes or marked outside the available evidence, and every invoked lens has returned
evidence relevant to the pinned target.

## 4. Put candidate findings through the evidence gate

A candidate finding needs all four:

1. A current file, line, symbol, artifact, check, or source location.
2. Concrete evidence showing the mechanism, value flow, reachable state,
   reproduction, or missing contract.
3. A consequence that changes correctness, safety, user behavior, operability,
   maintainability, or the review decision.
4. A plausible correction direction or decision the author must make.

Try to disprove every candidate. Check adjacent callers, parsers, constructors,
adapters, middleware, tests, framework behavior, local precedent, and current
thread history before retaining it. Green checks are evidence, not proof; a
resolved thread is not proof the live code is fixed.

Merge candidates with the same root cause. Drop style preferences already enforced
by tooling and observations without consequence. Downgrade unresolved but material
claims to **Question** or residual risk rather than laundering uncertainty into a
finding.

Classify retained findings:

- **Blocker** — should prevent approval because the changed path creates a
  material correctness, safety, security, data, contract, runtime, or request-fit
  failure.
- **Should fix** — meaningful defect or design problem that belongs in the change,
  but does not independently make approval unsafe.
- **Non-blocking** — useful hardening or polish that can be deferred without hiding
  the tradeoff.
- **Question** — judgment depends on product, domain, operational, or repository
  intent not settled by available evidence.

Completion criterion: every retained finding survives an attempt to disprove it,
contains all four ingredients, is not a duplicate, and has severity proportional
to consequence.

## 5. Synthesize one judgment without erasing the axes

Investigate separately, then integrate. Do not paste investigator reports side by
side as the final review. Preserve provenance by tagging each finding with
`Request fit`, `Codebase fit`, or both.

When findings exist, lead with them:

```md
## Findings

### <Blocker | Should fix | Non-blocking | Question>: <title>
Axes: <Request fit | Codebase fit | both>

- Where: <current location>
- Evidence: <mechanism or proof>
- Why it matters: <consequence>
- Direction: <correction shape or decision needed>

## Axis coverage
- Request fit: <Pass | Fail | Limited> — <reason>
- Codebase fit: <Pass | Fail | Limited> — <reason>

## Recommendation
<Approve | Hold | Request changes | Needs more evidence> — <reason>

## Validation gaps / residual risk
- ...
```

Include a recommendation when the target is a pull request or the user asks for
one. If there are no retained findings, state that plainly and report reviewed
scope, axis coverage, evidence checked, and validation gaps. Do not manufacture a
finding to make the review appear useful.

Completion criterion: the result contains one coherent decision, preserves both
axes, leads with actionable findings, and makes unverified scope visible.

## 6. Perform and verify a requested live action

Run this step only when the user explicitly asks to comment, approve, request
changes, reply, resolve, or otherwise mutate review state.

Recheck the live head before acting. If it changed, verify every finding against
the new head before posting. Perform exactly the requested action; comment-only,
approval, request-changes, reply, and resolution are not interchangeable.

Read the resulting review, comment, or thread state back from GitHub. Report what
landed and any item that could not be anchored or verified.

Completion criterion: the posted action matches the user's instruction, applies to
the reviewed head, and is visible in live read-back.

## Failure modes

- **Stale review** — judging an earlier head, old branch, or remembered PR state.
- **Parallel paste** — returning separate investigator reports without integration.
- **Checklist theater** — mentioning many surfaces without tracing changed behavior.
- **Duplicate finding** — repeating an existing comment or one root cause as many
  findings.
- **Claim inflation** — promoting uncertainty or taste into a blocker.
- **Evidence laundering** — treating green CI, a resolved thread, or absent logs as
  proof of correctness.
- **Review-to-fix drift** — editing code during a review-only task.
- **Mutation drift** — posting a different review action than the user requested.
