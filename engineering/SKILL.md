---
name: engineering
description: Use for software implementation, refactoring, dependency assessment, domain or module design, an architecture investigation, or a technical specification. Work from the existing system to the concrete design or verified change requested, selecting only the methods that job needs.
---

# Engineering

Own the requested software result, including the ordinary integration and verification needed to make it usable. A design request selects design work. Select implementation when the user asks for a change. Follow the workspace's current delegation and operational rules.

## Select the job

These are independent jobs, not stages of a mandatory process:

| Requested result | Method to select |
| --- | --- |
| Change or refactor existing behavior | Inspect the named seam and callers; use [contracts](references/contracts.md), [module design](references/modules.md), or [behavioral testing](references/testing.md) when a real contract, ownership, or proof question needs depth |
| Assess an upgrade | Read [upgrades](references/upgrades.md); trace resolved versions, repository usage, primary upstream evidence, and real runtime/platform boundaries |
| Investigate architecture | Read [architecture study](references/architecture.md); trace the bounded system and evidence halo, then explain it or rank concrete ownership moves when the question calls for recommendations |
| Produce an implementable technical design | Read [typed specification](references/specification.md); make typed contracts, responsibilities, execution/failure paths, decisions, and proof concrete; select [design alternatives](references/design-alternatives.md) when materially different designs need comparison |
| Sharpen a domain or module | Read [domain modeling](references/domain.md) or [module design](references/modules.md); test vocabulary/invariants against code, examples, callers and edge cases |
| Clarify verified code or comments | Read [finishing](methods/finishing.md); reduce reading burden within the authorized scope and recheck any edits |
| Implement with TDD | Read [test-first work](methods/test-first.md) when test-first order is selected; let one real behavior drive each red-green cycle |
| Enforce repository policy through lint | Read [lint enforcement](methods/lint-enforcement.md) before designing a custom rule; verify both the policy boundary and the installed tool's behavior |

Read the matching private method when that job or a real design question needs its depth. Do not begin an architecture scan because a file changed, require a specification before a small fix, or select TDD merely because a spec exists.

## Make the change sufficient

Recover the actual scope, accepted tradeoffs, relevant history, and completion stage. Obtain missing context that is reasonably available. Ask for a choice only when it materially changes the result and remains owner-owned.

Before adding an abstraction, dependency, service, or generalization, name the current burden it removes and the burden it adds. Read [proposal patterns](references/proposal-patterns.md) when comparing those options needs depth. Prefer a small move that owns the real invariant. Respect explicit accepted constraints; a generic principle does not reopen rejected complexity.

At the relevant boundaries, use precise domain values, parse untrusted data, define expected failures, preserve permissions and human overrides, and make effect/resource ownership clear. Investigate retry, concurrency, cancellation, redaction, and lifecycle obligations where the actual behavior raises them. Apply repository conventions and modern TypeScript soundness without requiring a demonstration of every possible standard on every task.

For a temporary implementation, read [logic/runtime experiments](references/experiments.md) and name the question and distinguishing observation first. Use the real runtime when a simplified model cannot answer it. Keep comparable inputs, observe the result, and retain the limits of what the experiment established.

## Verify the user's result

Choose checks that can fail for the behavior at issue, with an independent oracle and appropriate seam. Exercise the actual implementation where the claim needs it. A substitute proves only what its fidelity supports. Preserve unique regressions; mocks, spies, or integration tests require a reason based on the boundary being tested.

For implementation, run the required relevant checks, inspect the usable result, fix failures, and complete ordinary integration. For a study, design, or assessment, check its evidence, contracts, coverage, and required artifact within the task's authority; pre-existing build failures do not authorize repository repairs. For performance work, measure the actual bottleneck and compare the same workload before and after. Broaden checks when new changes or unresolved risks justify them.

Finish with the concrete change or requested design, useful verification, consequential tradeoffs, and exact remaining limits. Keep tests, review, merge, deployment, and runtime acceptance distinct when relevant to the requested stage.
