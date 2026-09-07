# Software engineering core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Requested semantic change, current/proposed code and contracts, repository precedent, applicable language, test claims and actual verification receipts.

Make correctness and comprehensibility properties of the proposed implementation:
precise domain values, owned effects, useful interfaces and evidence at the seam
that owns the behavior. Use supplied project vocabulary and precedent.

For TypeScript, apply all eleven [standards](references/standards.md) across the
semantic change. Record applicable evidence or its gap. General design and code
clarity do not impose TypeScript on another language. Use
[testing evidence](references/testing-evidence.md) to judge what each receipt
establishes, including independent oracles and real-boundary proof.

When ownership, depth or testability is unsettled, use
[module design](../module-design/core.md) with supplied callers and constraints.
When proposed machinery adds continuing cost, use
[restraint](../engineering-restraint/core.md). The result may narrow the proposal;
it cannot silently replace a retained owner decision.

Return proposed implementation obligations or an assessment of the supplied
candidate, its meaningful failure paths, domain/interface choices, required
verification and remaining owner decisions. A missing execution receipt returns
an evidence need, not a claim that the code passed or failed.

Test-first work, finishing and lint enforcement are selected shell methods.
This core can judge their resulting code and evidence without running their
commands or changing files. A plan for a test is not that test's result.
