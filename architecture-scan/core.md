# Architecture scan core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Candidate boundary, evidence halo, governing-source inventory, five-category surface map, traced behaviors, standards applicability, current ownership and test evidence.

First assess coverage: all five categories must be represented or explicitly
absent with reasons—entrypoints, domain/application clusters, external/runtime
boundaries, effect/resource owners, and tests. Every distinct shape needs a trace
and test evidence or a named gap; grouping requires common ownership and flow.
All eleven relevant TypeScript standards and governing decisions must be accounted
for. An uninspected material region returns a source need, not an invented pass.
Use [module design](../module-design/core.md) for ownership and leverage judgment
with the supplied evidence; reading the core does not dispatch design agents.

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

Require the shell to resolve claims available through permitted reads/searches before using
“Worth exploring.” Do not use uncertainty as a substitute for inspection.

Done when each survivor carries friction, ownership move, leverage, existing test
evidence, verification seam and recommendation strength; every gap is exactly
source-unverifiable; and no more than five remain.

Return the ranked cards under [the result contract](references/scan-result.md)
and the coverage/evidence limits. No more than five survive, including zero.
The core does not acquire sources, design final interfaces or choose a candidate
for the owner. A selected-candidate brief must preserve all gathered constraints,
invariants and affected paths rather than inventing a specification.
