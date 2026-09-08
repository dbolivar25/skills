# Historical core and shell contract

This contract records the paired-file architecture at `849e56d`. The active
contract is [Composing skills](../../contracts/composition.md).

A **core** consumes purpose, candidate or current representation, supplied
evidence and governing constraints. Method references may be read as part of the
implementation. A source pointer is not source content, a plan is not an observed
result, and an unavailable fact is not false.

Return the domain result with reasons, checked coverage and limits. When an input
could change that result, return the exact **evidence need**, the claim it affects,
what observation would settle it and any known scope/freshness requirement. When
evidence cannot decide an owner tradeoff, return the **owner decision**, viable
alternatives and a recommendation. Preserve already supported partial results.
Use the module's natural result format; no universal JSON or visible ceremony.

The core does not fetch live sources, run commands/tests, mutate files or external
state, schedule agents, or wait for answers. It may inspect supplied evidence,
reason through examples and produce proposed code, questions or transformations.
Calling another core means supplying its inputs and consuming its result, not
loading that module's operational entry point. Method examples describe possible
operations; executing them belongs to the shell.

A **shell** materializes inputs, invokes the core, resolves obtainable evidence
needs using available tools, and feeds the observations back. Carry provenance,
source identity/revision, scope, freshness and acquisition failures. Ask only for
unavailable access or owner judgment; time passing does not provide an answer.
Stop repeating an unchanged failed acquisition and return the supported limit.

The shell owns effects, authority, retries, waits and integration. A recommendation
is not new authority. Before a freshness-sensitive effect, recheck its source and
reapply affected judgment; preserve the remaining work. Return actual receipts
for the requested stage, not claims of later delivery or outcomes. A supporting
shell returns to its caller instead of taking over the caller's workflow.

`SKILL.md` is the normal invocation. `core.md` is the input-only judgment seam.
Read the core and required method references before judging; the shell is not a
summary substitute for that depth. This is an instruction architecture, not an
enforced tool sandbox or a claim of deterministic model output.
