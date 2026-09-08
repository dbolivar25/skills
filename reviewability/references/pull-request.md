# Pull request description

The artifact supports a merge decision about the **current base-to-head change**.
Existing descriptions, commits, tickets, and explanations provide intent; they
do not override the implemented change. Read the [understand-change](../../understand-change/SKILL.md)
with supplied current source and evidence. For a local draft, use the pinned
local comparison and retain the lack of live PR evidence. If a required source
version is stale or absent, return an evidence need to the caller.

## Specialize the map

Use the merge decision, live branch, intended post-merge behavior, semantic
base-to-head delta, meaningful implementation responsibilities, actual tests and
measurements, and unresolved risks as the review map. Account for every material
branch region before composing. Full private coverage does not require a long
public description.

Describe the final aggregate change as a reviewer of the eventual squash commit
would see it. Earlier attempts and temporary compatibility paths matter only when
they explain a surviving tradeoff.

## Match shape and evidence to the change

Include a section only when it answers a distinct reviewer question: purpose,
public interface, behavior delta, implementation responsibilities, rationale,
migration/rollout, diff shape, validation, visual evidence, or review focus.
These are choices, not a required outline.

A focused fix may need only purpose, mechanism, and evidence:

> Empty search results now clear the previous selection. The selection resets
> when results change; the existing empty-result regression passes.

Use that form only when the described behavior and test result were observed.
A broad change may need a responsibility map and explicit review focus.

For visual changes, show labeled before/after captures with comparable viewport
and state. Use a diagram or small code sketch when the important relationship is
not visible in a screenshot. State a missing capture as a gap.

For performance claims, use a compact before/after table with metric, workload,
environment, and relevant spread or sample count. A complexity argument does not
substitute for a measured benchmark. Keep meaningful validation and uncertainty
in short descriptions; include exact commands and measurements when they help
reproduce or evaluate a claim.

## Final read

Lead with the outcome and the condition that most affects how to understand it.
Use stable concepts from the map, not a tour of files or commits. Compare the draft
with the supplied base/head receipts: facts, measurements, scope, and checks
must still match; old prose must not describe an earlier branch state; follow-ups
must not appear completed.

The description is ready when a reviewer can state the behavioral delta, navigate
important responsibilities, assess evidence, and see where judgment is needed.
Publication authority and read-back belong to the caller.
