# Code and PR review

Take responsibility for the complete code judgment: select the comparison, acquire
evidence, investigate material behavior and return one supported verdict. A supporting
method contributes to this judgment; it does not take over the review or authorize a
fix.

## Establish the target

Use the user's PR, branch, fixed point, range or named files. Without one, inspect tracked staged and unstaged working-tree changes first. Inspect
relevant untracked files without adding unrelated work to the candidate. If clean,
establish a branch comparison against the honest merge base with upstream, main, or
master from repository context. Verify a supplied fixed point resolves and inspect the
actual comparison. An empty diff can be an honest result; report it without inventing a target.
Record the comparison and commit list once. Ask only when the repository cannot identify
an honest target.

Read governing instructions, neighboring implementations, tests and domain docs. For a
PR, use [GitHub evidence](../../github/SKILL.md) when complete state, review
discussion or CI drilldown is needed, and follow
[PR operations](../../github/references/pr-operations.md) for currentness and
action semantics. Record base/head and the scope of any unavailable evidence. A local
checkout or an author's explanation cannot establish current remote state.

Apply [semantic reconstruction](understanding.md) to the source, intended
behavior and check receipts, or reuse a current supplied change map. Resolve its source
needs through reads; do not make the user assemble the map. Refresh only changed
premises and regions while preserving complete coverage.

## Investigate request fit and codebase fit

Keep separate working evidence for:

- **Request fit:** requested behavior, omissions, incorrect behavior and
  unrequested scope.
- **Codebase fit:** correctness and coherence within the repository's contracts,
  architecture, tests, runtime and conventions.

Trace material inputs, state transitions, failures, persistence, protocol projections,
callers, side effects and tests far enough to establish the observable consequence.
Account for every material changed behavior on both axes, or name what could not be
checked. Prior comments are claims to investigate against current source, not findings
to copy.

Select supporting judgments when they can change the assessment:

| Concern | Capability and required context |
| --- | --- |
| Code and contracts | [Contract judgment](../../engineering/references/contracts.md) with the semantic change and local precedent; use the relevant TypeScript/domain/effect concerns. |
| What checks establish | [Verification design](../../engineering/references/testing.md) with the claimed behavior, seam and actual receipts. |
| External versions or runtime | [Dependency compatibility](../../engineering/references/upgrades.md) with exact versions, traced usage, primary upstream records and runtime evidence. |
| Interaction or visible states | [Interface design](../../interface-design/SKILL.md) with source behavior and actual renders of the relevant states. |
| Claimed causes | [Causal reasoning](../../debugging/references/causal-reasoning.md) with reproduction and probe observations. Use [debugging](../../debugging/SKILL.md) for a bounded operational investigation when the task needs that loop. |

Review owns obtaining missing inputs and integrating each result with its limits. Use
source-specific acquisition for named gaps rather than starting a general investigation.
Run permitted checks when they can settle a consequential claim; a missing environment
is a proof gap, not automatically a product defect.

When independent investigation is selected by the user or current workspace delegation
rules, give investigators the pinned target,
criteria and relevant evidence. Integrate their observations into one judgment.
Independence must come from distinct investigators; skill composition alone does not
establish it. Resolve conflicting assessments through their evidence and criteria, not
by counting favorable reports.

## Falsify candidate findings

A finding needs a current location, concrete evidence of the mechanism or missing
contract, a material consequence, and a plausible correction direction or owner
decision. Locations may be files/lines, symbols, checks or other source artifacts.

Try to disprove each candidate against adjacent callers, parsers, constructors,
adapters, middleware, tests, framework behavior, precedent and current threads. Green
checks and resolved threads are evidence, not proof that a path is correct. Preserve
accepted tradeoffs on rereview unless new evidence changes their basis; do not revive
settled concerns or broaden the review into an unrelated audit. A preferred
pattern becomes a defect only when it conflicts with the governing contract and local
precedent.

Group one root cause into one finding. Drop tooling-enforced style preferences and
observations without consequence. Keep unresolved material claims as questions or
residual risk rather than presenting them as established defects.

| Class | Consequence |
| --- | --- |
| Blocker | A material correctness, safety, security, data, contract, runtime or request-fit failure should prevent approval. |
| Should fix | A meaningful defect or design problem belongs in the change but does not independently make approval unsafe. |
| Non-blocking | Useful hardening or polish can be deferred with the tradeoff visible. |
| Question | Product, domain, operational or repository intent is needed to settle the judgment. |

Retain only nonduplicate findings that survive falsification and contain all four
ingredients. Severity follows consequence, not the reviewer's preference.

## Return one judgment

Lead with actionable findings: class, location, evidence, consequence, correction
direction and Request fit, Codebase fit, or both as provenance. Account for both axes
with their reasons, validation gaps, and residual risk. Pass, Fail, or Limited labels
can help when requested or when the judgment is complex; they are not a compulsory
form for a tiny review.

For a PR or an explicit recommendation request, give one recommendation: Approve, Hold,
Request changes or Needs more evidence, with the reason. With no retained findings, say
so and report scope, both axes, checked evidence and remaining gaps. Do not manufacture
a finding to make the review look useful.

When a description or review guide is also requested, give
[writing](../../writing/SKILL.md) the same current map, verdict and source
receipts. Writing owns the account; review retains the judgment.

Before a requested live review action, reread the head, reassess affected findings and
follow PR operations for that exact action and read-back. A changed head invalidates
affected conclusions, not all prior work. Finish with the supported judgment and the
actual requested action receipt; a draft is not publication.
