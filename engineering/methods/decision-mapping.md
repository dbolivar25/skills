# Decision mapping

Use this method when a large effort has a destination but its path depends on
decisions or investigations that are not yet resolved. Build a shared map that makes
the next useful questions visible and preserves what has been settled. A bounded
change with a known path can proceed directly; this method is not a required
planning stage.

The map discovers the path. An implementation task graph assigns the work along
an established path. A question such as "Which system owns writes during
cutover?" belongs in the decision map; "Implement the new writer" belongs in a
later implementation plan once its governing decisions are supported. Planning
does not authorize implementation, publication, provisioning, or customer-state
changes. A prototype or access step needs its own applicable authority.

## Name the destination

Recover the requested result, relevant history, current constraints, settled
decisions, and observable planning completion. State what the map is finding a
path to: an implementable specification, a choice between designs, or another
concrete result. Preserve that destination and its exclusions as questions evolve.
If the owner changes it, reconcile the affected questions rather than silently
broadening the effort.

Explore the space broadly enough to discover consequential forks before spending
the whole effort on one branch. Use available code, examples, documentation, and
owner evidence. Resolve source-verifiable facts yourself. Ask for an owner choice
only when the remaining uncertainty materially changes the result and belongs to
the owner. A likely answer, an absent owner, or agreement by another agent is not
an owner decision.

## Make a navigable index

Use the project's existing planning documents, issues, or work records. Choose one
authoritative map location that collaborators can read and update. Express
dependencies with the store's existing links or relationships. Size questions by
the result they can resolve and the context needed to resolve it.

The map is an index. Use human-readable names with links, a short gist where it
helps navigation, and one authoritative home for each question's evidence and
resolution. Existing decision records or owner Asks can be that home; link them
instead of independently rewriting their answer. Keep only what supports the
next judgment:

- **Destination and boundaries:** the requested planning result, relevant
  constraints, and excluded work.
- **Settled decisions:** named links to their scope, basis, owner or decision
  authority, and material reopening conditions.
- **Open questions and dependencies:** the precise questions already known,
  including blocked ones, with links to their detail.
- **Not yet specified:** in-scope uncertainty that cannot yet be phrased as a
  precise question, plus what should make it clearer.

In each question's home, preserve the question, why it affects the destination,
its dependencies, the owner or fact source, current evidence, and the conclusion
when reached. Record material alternatives and consequences when they explain
the choice. A short decision note can suffice; use [domain and ADR guidance](../references/domain.md)
when language or a lasting tradeoff needs that form.

## Separate questions, uncertainty, and excluded work

A question is ready to record when it is precise enough to investigate or answer,
even when another decision blocks that work. "Not yet specified" is for uncertainty
too vague to state precisely, not a hiding place for blocked questions. Excluded
work lies beyond the destination and does not become a question merely because it
is now clearer.

Distinguish how a question can be resolved:

- **Discoverable fact:** identify the authoritative source or observation and
  acquire it, retaining freshness and fidelity limits.
- **Agent-owned design choice:** compare concrete options against the current
  outcome, system, constraints, and accepted tradeoffs, then record the supported
  choice within delegated authority.
- **Owner or external decision:** present the concrete fork, consequence,
  evidence, and recommendation; preserve the actual answer and its source.

Research, a small prototype, or a discussion is a means of resolving a question,
not a mandatory ticket type. Select the smallest useful method and authority for
the evidence it needs. A manual prerequisite earns a place only when it unblocks
a named decision; it does not silently turn the map into delivery work.

For example, a map whose destination is an implementable invoice-cutover design
might contain these questions:

| Named question | Resolution and dependency |
| --- | --- |
| Can both providers reconcile the same invoice? | Discoverable through provider contracts and a relevant probe |
| May invoice creation pause during cutover? | Owner choice about the product promise |
| Which system owns writes during cutover? | A precise design question blocked by the two answers above |

"Recovery behavior" may remain not yet specified until the ownership choice makes
the failure paths concrete. Migrating historical receipt files can be explicitly
excluded. The blocked ownership question is still recorded now; neither the vague
recovery area nor the excluded migration becomes an invented implementation task.

## Resolve, then recompute the map

Select available questions whose dependencies and authority permit useful work.
Resolve independent questions together when useful and consistent with current
delegation rules. Coordinate actual ownership before concurrent edits to the same
decision surface.

Record the answer and evidence in its authoritative home. Preserve unresolved
conflicts rather than settling them through confident wording. After each material
answer, inspect the questions and uncertainty it affects:

- expose newly precise questions and connect their dependencies;
- remove the corresponding uncertainty once its questions have a home;
- revise or retire questions the answer invalidates, retaining the reason;
- identify commitments or evidence that no longer follow from the answer;
- preserve unrelated settlements and scope exclusions.

Reopen a settled decision only for material evidence, changed scope or authority,
an applicable hard boundary, or a materially misunderstood premise. Retain the
prior decision, its owner, scope, basis, and the change that justifies reopening.
A later agent's preference does not supply that change.

## Preserve continuity when Steward applies

Use [Steward](../../steward/SKILL.md) when the work must survive interruption,
coordinate agents, or depend on continuing support. Do not attach it to every
bounded planning task.

The map is the authoritative planning result. Reference the actual artifact and
exact reviewed version through the existing PLAN Work report and its independent
review. Keep that version and its supporting sources recoverable through existing
revision history, a saved artifact, or another exact evidence reference. Advancing
the current map must not rewrite the evidence for an accepted report.

Keep questions and their dependencies in the map; assignments, live support,
owner Asks, and acceptance belong to the Record. A question is not automatically
a Work item. Link existing owner Asks from the map and read
[Steward's runtime mechanics](../../steward/references/runtime.md) for these
operations before recording events. When the map changes, have the changed
planning result reviewed before dependent work treats it as accepted.

## Complete or recover the requested planning result

Finish when the destination and exclusions are explicit, each material decision
needed for that destination has a supported resolution, dependencies are coherent,
and remaining uncertainty cannot silently change the next authorized commitment.
A decision may be deferred only when that commitment does not depend on it; name
the point at which it must be resolved. Do not require every possible future
implementation detail to be settled.

Check that named links reach their authoritative homes, resolutions match their
evidence and authority, affected questions were recomputed, and the result is
usable for the requested next stage. When a necessary decision remains open,
return the usable map, exact missing answer or observation, and next available
work. Keep the planning result incomplete rather than inventing closure.

On recovery, load the index, then the relevant question details and current
Record when Steward applies. Reconcile destination, settlements, owner evidence,
source freshness, dependencies, and actual assignments before selecting work.
Preserve supported decisions; reopen only the affected parts with the material
reason recorded. Report the current path, useful evidence, and exact remaining
limits. Begin implementation only within the user's applicable authority.
