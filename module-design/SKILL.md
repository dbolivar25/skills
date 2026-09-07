---
name: module-design
description: Use when a module interface, ownership, depth, dependency seam, or testability needs design judgment. Load it to reduce caller knowledge and concentrate invariants behind a useful interface, with concrete usage and tradeoffs.
---

# Module design

Given a problem, current callers, dependencies and constraints, return the owner,
interface, hidden responsibilities, caller examples, test seam and material
tradeoffs. A function, package, skill or distributed slice can be a module.
The result must explain what callers no longer need to know.

Read [the design method](references/design.md) before making the judgment.
Read [dependency seams](references/dependency-seams.md) when the problem spans
external capabilities. Apply [testing evidence](../software-engineering/references/testing-evidence.md)
when making testability claims; this does not select implementation or TDD.

Inspect real callers and local conventions. Resolve facts from the system; keep
owner choices and unknown behavior explicit. Do not invent a seam just to make a
test intercept an internal call. A design ends when its claimed leverage,
locality and verification surface can be assessed through concrete examples.

When the user wants competing interface designs, use
[alternatives](branches/alternatives.md). That selected branch retains independent
briefs and comparisons. Routine module judgment does not dispatch an agent team.

Return the proposed shape and its reason to the caller. Design authority alone
does not authorize edits. A repository scan or full typed specification remains
with its separately selected workflow.
