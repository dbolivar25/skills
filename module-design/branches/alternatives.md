# Design alternatives

Use when the user wants alternative interfaces for a chosen problem. Your first
idea is unlikely to be the best. Apply [module design](../references/design.md)
and classify dependencies using [dependency seams](../references/dependency-seams.md).

## 1. Frame the problem

Show the user the constraints every design must satisfy, the dependencies and
their categories, and an illustrative code sketch that makes those constraints
concrete without presenting it as the proposal. Then proceed with exploration;
the user can consider the frame while designs are developed.

Done when constraints and dependencies are explicit enough to compare designs
without changing the problem between them.

## 2. Generate genuinely different interfaces

Spawn **at least three parallel sub-agents**, each with an independent technical
brief: relevant files, coupling, dependency category and what belongs behind the
seam. Include this package's design vocabulary and the project's `CONTEXT.md`
vocabulary in every brief. Give each agent a different constraint:

- Minimize the interface: aim for 1–3 entry points and maximum leverage per entry.
- Maximize flexibility across use cases and extensions.
- Optimize the most common caller: make its default case trivial.
- When applicable, add a design centered on ports and adapters across dependencies.

Each design returns its typed interface (including invariants, ordering and
errors), caller usage, hidden implementation responsibilities, dependency and
adapter strategy, and tradeoffs in leverage. Different names for the same shape
are not different designs.

Done when at least three materially different interfaces expose those five
parts. If parallel agents are unavailable, report that limitation and preserve
the distinct briefs and outputs in separate explorations; do not claim
independent agent evidence.

## 3. Compare and recommend

Present the designs sequentially, then compare depth, locality and seam placement.
Recommend the strongest design and explain why. Propose a hybrid only when its
parts improve the combined shape; do not substitute an unranked menu for judgment.

Done when the recommendation follows the comparison and its tradeoffs are clear.
Selection and implementation remain with the owning task.
