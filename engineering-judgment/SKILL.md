---
name: engineering-judgment
description: Use when proposed or changed code needs its correctness obligations or contract weaknesses assessed. Load it to apply engineering standards across values, boundaries, failures, effects and verification without starting an implementation workflow.
---

# Engineering judgment

Use the [core contract](../contracts/composition.md#core-skills) .

**Inputs:** Requested semantic change, current/proposed code and contracts, repository
precedent, applicable language, test claims and actual verification receipts.

Make correctness and comprehensibility properties of the proposed implementation:
precise domain values, owned effects, useful interfaces and evidence at the seam that
owns the behavior. Use supplied project vocabulary and precedent.

For TypeScript, apply all eleven [standards](references/standards.md) across the
semantic change. Record applicable evidence or its gap. General design and code clarity
do not impose TypeScript on another language. Use
[verification design](../verification-design/SKILL.md) to judge what each receipt
establishes, including independent oracles and real-boundary proof.

When ownership, depth or testability is unsettled, use
[module design](../module-design/SKILL.md) with supplied callers and constraints. When
proposed machinery adds continuing cost, use
[restraint](../engineering-restraint/SKILL.md) . The result may narrow the proposal; it
cannot silently replace a retained owner decision.

Return proposed implementation obligations or an assessment of the supplied candidate,
its meaningful failure paths, domain/interface choices, required verification and
remaining owner decisions. A missing execution receipt returns an evidence need, not a
claim that the code passed or failed.

Assess results from test-first work, finishing or lint enforcement by the same
obligations. Their execution order belongs to the implementation caller. A plan for a
test is not that test's result.
