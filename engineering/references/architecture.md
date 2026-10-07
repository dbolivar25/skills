# Architecture study

Use for an investigation of how a system is organized, where ownership creates friction,
or which architectural change would earn its cost. Return a grounded system map and, when
the question calls for changes, one ranked set of **ownership moves**. A useful study may
find that the current design is sound and recommend no change.

This method owns discovery and architectural judgment. The task determines whether the
result is a system explanation, a bounded recommendation, or a brief for an already
requested design. Investigation does not itself authorize implementation, a repository
cleanup, product mutation, or publication.

## Bound the question and find the governing sources

Use the user's repository, directory, feature, module, file set, or concern as the
candidate boundary. Inspect callers, dependencies, composition roots, and tests outside
it when they establish evidence. This **evidence halo** helps explain the boundary; it
does not silently expand where changes may be proposed.

When scope is rough, inspect repository shape, major entrypoints, and recent changed
paths. Activity helps choose where to look; it does not prove friction. Infer a useful
boundary when one area clearly dominates. Ask for a scope choice only when competing
boundaries would materially change the answer.

Find the domain language and decisions governing that boundary: `CONTEXT.md`,
`CONTEXT-MAP.md`, equivalent local documentation, decision indexes, and relevant ADRs.
Search ancestors and repository documentation as well as the named directory. Read the
sources that govern the question and compare them with local code, tests, and precedent.
Keep a conflict between a stated model and the implementation visible.

Read [module design](modules.md) before judging ownership, depth, or seams. Read
[contracts](contracts.md) when the inspected paths raise a concrete value, state,
failure, effect, or soundness question.

## Trace enough of the system to support the conclusion

Build a private evidence map around the behaviors and distinct ownership shapes that
can change the answer. Public/runtime entrypoints, domain and application clusters,
external/persistence/process boundaries, effect and resource lifetimes, and tests are
useful discovery lenses. They are not five sections to fill for every study.

For each materially distinct shape, trace a representative behavior from its entrypoint
or direct caller through relevant boundaries and effects to the caller-visible outcome.
Inspect tests at those seams. Group paths only when they share the ownership and call-flow
shape that matters to the question; one representative does not cover a different
authorization rule, lifetime, or failure path.

Retain representative files, call paths, outcomes, governing constraints, existing test
evidence, and material gaps. Explain deliberate exclusions and halo excursions that
limit the conclusion. For a broad architecture claim, establish broad coverage. For a
named seam, go deep enough to explain that seam without turning the job into a repo audit.

Use source reads, searches, and existing receipts first. Run a permitted check or a
small discriminating probe when source alone cannot settle an answer-changing claim.
For example, a dependency-cycle analysis may establish a suspected import cycle; a
runtime probe may reveal where a resource is actually acquired. Follow task authority,
tool effects, and operational rules. A missing environment is an evidence gap, not a
reason to repair unrelated code. Use [experiments](experiments.md) when a temporary
implementation is necessary and [testing](testing.md) to interpret check fidelity.

Distinguish **architectural friction** from local cleanup. Friction is repeated burden
or consequential risk that crosses a boundary, leaks knowledge into callers, obscures
ownership, or prevents behavior from being exercised at a real seam. A lone long name
or awkward helper is not enough. Retain concrete traces, repeated policy, invalid-state
paths, or test contortions; discard unsupported impressions.

## Judge ownership and leverage

For each evidenced friction, name who owns the invariant, policy, translation,
orchestration, effect, resource lifetime, or runtime coordination now and who should own
it. An ownership study need not invent that owner's final interface. A requested design
can continue into [specification](specification.md) with the gathered evidence.

Apply the **deletion test**: deleting a useful proposed module would make its hidden
complexity reappear in callers. A pass-through relocated elsewhere fails. Explain what
callers would no longer need to know and what new interface or machinery they would learn.

Rank candidates together by **architectural leverage**: breadth and consequence of burden
or risk removed relative to the interface, indirection, and continuing ownership added.
Consider callers, behaviors, runtime responsibilities, and verification. For comparable
leverage, prefer stronger evidence, then the smaller coherent move.

Merge candidates sharing one root friction or ownership move. Related contract
improvements are gains of that candidate. Drop aesthetic changes, speculative flexibility,
isolated cleanup, unsupported claims, and proposals contradicted by sound local precedent.
Preserve explicit accepted tradeoffs unless material evidence changes their basis.

Use the task's output budget. Otherwise return the smallest ranked set that preserves the
material choices, including zero when nothing earns a change. Do not cap the investigation
or omit an important alternative merely to fit a universal candidate count.

Separate recommendation strength from uncertainty:

- **Strong:** concrete evidence supports the friction, ownership move, and leverage.
- **Worth exploring:** the friction is evidenced, but an exact unresolved claim can change
  the owner or expected leverage. Name the claim and the observation needed to settle it.

Resolve obtainable facts before labeling them unknown. A source-verifiable question
does not become a speculative candidate just because it has not yet been inspected.

## Return the requested study

Lead with the system answer or recommendation. Make the ranking universe recoverable:
boundary, evidence halo, governing sources, inspected shapes, and material exclusions.
Cite representative evidence. Add a current/proposed flow sketch when it makes the
ownership difference easier to see.

For a candidate, these fields make a useful card; omit labels that add no information:

```md
### <Candidate>: <Strong | Worth exploring>

- Current friction and evidence: <trace, repetition, leakage, or test burden; citations>
- Ownership move: <current owner/callers> -> <proposed owner>
- Expected leverage: <burden removed and machinery introduced>
- Constraints: <governing contracts, invariants, and accepted tradeoffs>
- Existing proof and verification seam: <tests/receipts and the interface that could test the move>
- Evidence gap: <exact unresolved claim and distinguishing observation, when present>
- Context/ADR note: <only when stable language or a decision conflict needs attention>
```

Recommend the leading candidate and explain its advantage. If none survives, explain
which signals were pruned and why; do not manufacture a next refactor. A system-explanation
request can finish with the supported map and gaps without a candidate ranking.

When follow-on design is already requested, preserve the problem, evidence, current and
proposed owner, all gathered constraints/invariants, affected paths, suspected seams, and
open questions in its brief. Do not make the next engineer rediscover discarded context.
Mark claims that remain hypotheses and use the specification method for the actual design.

The study is complete when its consequential conclusions follow from covered behavior
and evidence, its boundaries and gaps are clear, and it delivers the requested explanation,
ranking, or design brief at the authorized stage.
