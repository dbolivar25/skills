# Judge code

Use this branch for correctness, request fit, or a merge recommendation. One
**judge** integrates all evidence. Specialist lenses return candidate findings
and support; they do not issue competing verdicts.

## Pin the exact target

Use the user's PR, branch, fixed point, commit range, staged/unstaged changes, or
named files. Without a supplied target, use dirty working-tree changes first;
otherwise compare the current branch with its merge base against the upstream,
`main`, or `master`. Ask only when repository state cannot identify an honest
target. Verify a fixed point resolves and its three-dot diff against `HEAD` is
non-empty. Record the comparison and commit list once.

For a PR, follow [PR operations](../../github-evidence/references/pr-operations.md). Recheck
its live head when resuming after interruption or feedback. State the exact
comparison and whether the task includes a requested live action.

Read repository instructions, standards, neighboring code, tests, domain docs,
and existing implementations. For TypeScript changes, apply the law in
[engineering standards](../../software-engineering/references/standards.md) and
[testing evidence](../../software-engineering/references/testing-evidence.md). A difference from a
preferred pattern is not a defect until compared with the governing contract and
local precedent. Read unresolved threads and relevant resolved history before
forming new findings; existing comments are claims to verify, not findings to
copy.

Use the shared [reconstruction method](../../understand-change/SKILL.md). The
request source, standards, precedent, and review context must be known or their
absence explicit before the verdict is ready.

## Investigate both axes

- **Request fit:** requested behavior, omissions, incorrect behavior, and
  unrequested scope.
- **Codebase fit:** correctness and coherence within the repository's contracts,
  architecture, tests, runtime, and conventions.

Keep separate working evidence for the axes. Trace material inputs, state
transitions, failures, persistence, protocol projections, callers, side effects,
and tests far enough beyond the hunk to establish the observable consequence.
Every material changed behavior must be accounted for on both axes or marked
outside available evidence.

Use parallel investigators only when independent surfaces improve coverage.
Give each the pinned target and relevant sources; integrate their evidence
instead of pasting their reports. Apply a lens when the changed behavior earns it:

- Dependency version, lock graph, runtime image, or vendored tool:
  [dependency compatibility](../../dependency-compatibility/SKILL.md).
- Material interaction or visible UI state: `interface-design`.
- Shipped behavior, reliability, or performance claims: production evidence,
  `grafana-evidence`, or `diagnosing-bugs`.

A requested review guide is a subsequent outcome: hand the current review map
to [reviewability](../../reviewability/SKILL.md) after the judgment. It is not
an investigative lens and is not required for a verdict.

Every lens must return evidence relevant to the pinned target. The judge retains
the final recommendation.

## Falsify candidate findings

A finding requires a current location, concrete evidence of the mechanism or
missing contract, a material consequence, and a plausible correction direction
or decision the author must make. A location may be a file/line, symbol, check,
artifact, or other source.

Try to disprove each candidate through adjacent callers, parsers, constructors,
adapters, middleware, tests, framework behavior, precedent, and current threads.
Green checks and resolved threads are evidence, not proof that a path is correct.
Group one root cause into one finding. Drop tooling-enforced style preferences
and observations without consequence. Keep unresolved material claims as
questions or residual risk rather than presenting them as established defects.

Classify by consequence:

| Class | Meaning |
| --- | --- |
| Blocker | A material correctness, safety, security, data, contract, runtime, or request-fit failure should prevent approval. |
| Should fix | A meaningful defect or design problem belongs in the change but does not independently make approval unsafe. |
| Non-blocking | Useful hardening or polish can be deferred with the tradeoff visible. |
| Question | Product, domain, operational, or repository intent is needed to settle the judgment. |

Retain only nonduplicate findings that survive falsification, contain all four
ingredients, and carry severity proportional to the consequence.

## Return one judgment

Lead with actionable findings. Each needs its class, location, evidence,
consequence, correction direction, and `Request fit`, `Codebase fit`, or both as
provenance. Then report each axis as Pass, Fail, or Limited with its reason, plus
validation gaps and residual risk. The format may be compact; those distinctions
must survive.

For a PR or an explicit recommendation request, give one integrated recommendation:
Approve, Hold, Request changes, or Needs more evidence, with the reason. With no
retained findings, say so plainly and report scope, both axes, checked evidence,
and gaps. Do not manufacture a finding to make the review look useful.

The result must enable one coherent decision without hiding unverified scope.
Stale heads, parallel report dumps, untraced checklists, duplicate comments, taste
promoted to blockers, review-to-fix drift, and unauthorized review-state changes
all defeat that purpose. Requested publication follows PR operations and requires
current-head verification plus live read-back.
