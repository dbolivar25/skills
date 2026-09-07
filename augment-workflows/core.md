# Augment workflows core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Requested operation, purpose/trigger/result, supplied current node/tool contracts, canonical dependency identities, graph/current state, authority and validation/execution receipts.

A graph owns sequence, branches, waits, retries, approvals, effects and failure
paths. A node-local prompt owns its bounded task and supplied context. A workspace
Skill owns reusable methodology. Do not hide routing, recipients, authority or
control flow in prompt prose when graph structure and typed parameters own them.

Frame the start event, desired observable result, proof, unacceptable result and
every external/durable effect with its owner and destination. A planned effect
is not permission to run it. Draft changes, validation, lifecycle changes and
execution control remain distinct requested operations.

Use only supplied current product contracts and canonical identities. Missing
node semantics, operation schemas or fixed dependencies are exact evidence needs;
do not invent contracts from remembered names or schemas. Contradictory live
sources prevent a supported mutation proposal until reconciled by the shell.

Design or assess the smallest explicit graph whose values have concrete sources,
whose effects have owners and whose failures have recovery or intentional
terminals. Define Agent/Skill interfaces by trigger, responsibility, context,
required result and missing-context behavior. When a proposed AI output derives
from evidence, use [faithful derivation](../faithful-derivation/core.md) with the
supplied purpose and sources. For agent instructions, use
[instruction design](../writing-for-agents/core.md). Missing inputs return to the
caller rather than activating those modules' product shells.

Return the proposed graph or review findings, required contract/identity gaps,
authority-sensitive operations and proof obligations. Structural validation is
not business correctness. Given receipts, distinguish saved draft, validation,
provider acceptance, execution, node output and visible destination outcome.
A receipt for an earlier stage cannot establish a later stage or an authorized
scope expansion. The shell owns all live acquisition, mutation and observation.
