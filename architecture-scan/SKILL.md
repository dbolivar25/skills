---
name: architecture-scan
description: Find and rank evidence-backed architectural ownership moves in TypeScript code.
disable-model-invocation: true
---

# Architecture scan

Evaluate TypeScript architecture and return one ranked shortlist of evidence-backed
**ownership moves** within an explicit candidate boundary. Scan with source reads and search only. Do not edit,
run tests, type checks, linters, formatters, builds, package scripts or static
analysis. Do not refactor, update docs, create ADRs, estimate effort, design final
interfaces or write a specification. Migration, compatibility, rollout and
backfill enter only as evidenced current constraints, not plans designed here.

## 1. Bound the candidates and discover their governing sources

Use the user's repository, directory, feature, module, file set or concern as
the candidate boundary. Inspect immediate callers, dependencies, composition
roots and tests outside it when they establish evidence. Record this **evidence
halo**; it does not expand where candidates may be proposed.

Without useful scope, inspect repository shape and major entrypoints, then roughly
the last 20 commit messages and changed paths. Activity prioritizes inspection;
it does not prove friction. Infer scope when the repo is small or one active area
clearly dominates. If activity is scattered, widen the scan or ask one question
that lets the user choose.

Read the [eleven engineering standards](../software-engineering/references/standards.md)
and [module-design vocabulary](../software-engineering/references/module-design.md).
Search the boundary and its ancestors through the repository root for
`CONTEXT.md`, `CONTEXT-MAP.md`, equivalent domain-language files and decision
indexes. Search repository documentation and ADR collections for decisions that
name or govern the boundary. Inspect **every governing source found**, plus local
precedent in scoped code, tests and the evidence halo.

Done when the candidate boundary and halo are explicit, activity has informed
otherwise-unspecified scope, required references are loaded, prescribed source
locations have been searched, every governing source has been read, and relevant
precedent or its absence is known.

## 2. Account for the whole architectural surface

Build a private evidence map with all five inventory categories:

1. Public and runtime entrypoints.
2. Domain and application module clusters.
3. External, persistence and process/runtime boundaries.
4. Side-effect and resource-lifetime owners.
5. Tests exercising those seams.

For **each category**, record its surfaces, equivalent groups, or absence or
inapplicability with a reason. Group only surfaces sharing the same ownership
and call-flow shape, and cite representative files. For **each distinct shape**,
trace at least one behavior from an entrypoint or direct caller through relevant
boundaries and side effects to its caller-visible outcome. Inspect the tests at
that seam, or record that none were found.

Each map entry carries surface/group, representative files, call path, outcome,
existing test evidence, applicable standards and findings. Record every halo
excursion and deliberate exclusion.

Account internally for **every numbered standard**. A standard applies when an
inventoried surface handles its concern; repository-before-invention always
applies. Mark applicability, concrete inspected evidence for every applicable
standard (code, path, test, value or runtime seam), and whether each finding is
local cleanup or **architectural friction**. Friction is repeated burden or risk
that crosses a boundary, leaks into callers, obscures ownership or prevents
behavior from being tested at a real seam. An isolated smell is local cleanup.

Parallel exploration may gather observations in broad scans; candidate formation
and ranking remain one synthesis.

Done when every category is covered, represented or explicitly absent; every
distinct shape has a trace and test inspection; all halo/exclusion decisions and
all eleven standards are accounted for; every applicable standard has inspected
evidence; and retained observations are concrete friction. Discard unsupported
observations.

## 3. Form one ranking and prune it

For each retained friction, name who owns the invariant, policy, translation,
orchestration, effect, resource lifetime or runtime coordination **now**, and who
should own it. Do not specify that owner's final interface.

Apply the deletion test: deleting a useful proposed module would make its hidden
complexity reappear in callers. A pass-through merely relocated elsewhere fails.

Rank all candidates in the boundary together by **architectural leverage**:
breadth and consequence of burden or risk removed relative to the interface,
indirection or machinery introduced. Consider affected callers, behaviors,
runtime ownership and tests. For comparable leverage, prefer stronger evidence,
then the smaller coherent ownership move.

Merge candidates with the same root friction or ownership move; related standards
improvements become gains of that candidate. Drop aesthetic changes, unsupported
claims, speculative flexibility, isolated cleanup, implementation disguised as
architecture and proposals contradicted by sound precedent. Keep **at most five**,
including zero when nothing earns the change.

- **Strong:** friction, ownership move and leverage have concrete evidence.
- **Worth exploring:** friction is evidenced but ownership or leverage depends on
  an exact claim unavailable through source inspection.

Resolve every claim available through permitted reads/searches before using
“Worth exploring.” Do not use uncertainty as a substitute for inspection.

Done when each survivor carries friction, ownership move, leverage, existing test
evidence, verification seam and recommendation strength; every gap is exactly
source-unverifiable; and no more than five remain.

## 4. Present and stop

Use [the scan result contract](references/scan-result.md). Start with boundary,
halo, covered inventory categories, governing sources and material exclusions.
Return ranked candidate cards with enough representative citations to establish
the friction. Add a current/proposed ASCII sketch when flow or topology benefits.
Suggest a `CONTEXT.md` clarification only for stable domain language; flag an ADR
conflict only when concrete friction justifies revisiting it.

When none survives, explain why signals were pruned. Do not manufacture a top
recommendation or suggest beginning specification. Otherwise recommend the top
candidate with its leverage basis and ask which candidate the user selects for
a specification handoff. Stop here; a likely recommendation is not a selection.

Done when the output exposes its ranking universe, every candidate satisfies the
contract, all claims have evidence or exact gaps, and the zero branch invents no
recommendation.

## After selection: prepare the brief

Only after the user selects a candidate, give its title/files, problem/friction/
evidence, current-to-proposed owner, applicable standards, **all gathered**
constraints and invariants, suspected seams/adapters/boundaries/call paths, open
questions and any context/ADR suggestions. Every claim must trace to the scan or
be labeled an open question.

Tell the user to explicitly select `tech-spec` with
this brief. If the task already explicitly selected specification after the
candidate choice, carry that authorization forward; otherwise stop. Preparing
a brief does not itself authorize writing the spec.

Done when the brief preserves all gathered constraints, invariants and affected
paths, exposes unknowns, and respects the selection boundary.
