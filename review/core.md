# Review core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Pinned comparison and source versions, user intent, repository standards/precedent, change map, current code and review context, check receipts and supporting assessments.

Use this branch for correctness, request fit, or a merge recommendation. One
**judge** integrates all evidence. Specialist lenses return candidate findings
and support; they do not issue competing verdicts.

## Establish the supplied target

Use the pinned target, currentness receipt, requested outcome, governing
instructions, relevant source and validation observations. A stale head or absent
comparison is an evidence need; it cannot support a current merge recommendation.
Apply [engineering standards](../software-engineering/references/standards.md)
and [testing evidence](../software-engineering/references/testing-evidence.md)
for relevant TypeScript changes. A preferred pattern is not a defect until it
conflicts with the governing contract and local precedent.

Use a supplied current change map, or the
[change-understanding core](../understand-change/core.md) with supplied evidence.
Prior reviewer comments are claims to assess against current source, not facts
to copy. Record material missing request, standards or review context as limits.

## Investigate both axes

- **Request fit:** requested behavior, omissions, incorrect behavior, and
  unrequested scope.
- **Codebase fit:** correctness and coherence within the repository's contracts,
  architecture, tests, runtime, and conventions.

Keep separate working evidence for the axes. Trace supplied evidence for material inputs, state
transitions, failures, persistence, protocol projections, callers, side effects,
and tests far enough to establish the observable consequence; return an evidence need
for absent callers or paths whose behavior could change the judgment.
Every material changed behavior must be accounted for on both axes or marked
outside available evidence.

Apply a supporting core when the changed behavior earns it, using the evidence
available for that concern:

- External version or runtime changes: [dependency compatibility](../dependency-compatibility/core.md).
- Interaction or visible states: [interface design](../interface-design/core.md).
- Causal claims with reproduction/probe receipts: [diagnosis](../diagnosing-bugs/core.md).

Consume their results and limits; do not invoke their operational shells from
this core. No supporting assessment owns the final recommendation. Missing
telemetry or compatibility evidence returns to the shell for acquisition.
A review guide is a separate outcome and is not an investigative lens.

## Falsify candidate findings

A finding requires a current location, concrete evidence of the mechanism or
missing contract, a material consequence, and a plausible correction direction
or decision the author must make. A location may be a file/line, symbol, check,
artifact, or other source.

Try to disprove each candidate against supplied adjacent callers, parsers, constructors,
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
all defeat that purpose. Publication and current-head verification belong to the shell; the core
returns the supported verdict and identifies the source version it covers.
