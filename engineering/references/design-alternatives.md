# Design alternatives

Use when materially different interface or ownership choices remain open, or the
user requests alternatives for a chosen problem. Preserve already-settled choices.
Apply [module design](modules.md)
and classify dependencies using [dependency categories](modules.md#deepening-across-dependencies).

## 1. Frame the problem

Establish the constraints every design must satisfy and the dependencies each must
handle. A small illustrative sketch can make the problem concrete without becoming
the proposal. Share the frame early when it exposes an answer-changing assumption;
ordinary design work need not pause for a separate framing round.

Done when constraints and dependencies are explicit enough to compare designs
without changing the problem between them.

## 2. Generate genuinely different interfaces

Produce materially different shapes by giving each exploration a different constraint.
Select the useful briefs for this problem:

- Minimize the interface: aim for a few entry points and high leverage per entry.
- Maximize flexibility across real use cases and extensions.
- Optimize the most common caller: make its default case trivial.
- When applicable, center the design on ports/adapters across real dependencies.

Each brief contains relevant files, coupling, dependency categories, what belongs behind
the seam, this package's module vocabulary, and the project's domain vocabulary. Reasoned
alternatives are sufficient for ordinary design work. Use separate agents only when
independent exploration is requested or current workspace instructions require it; follow
the current delegation rules. Do not claim independent evidence from one actor producing
several alternatives.

Each design supplies its typed interface (including invariants, ordering and
errors), caller usage, hidden implementation responsibilities, dependency and
adapter strategy, and tradeoffs in leverage. Different names for the same shape
are not different designs.

Done when enough materially different interfaces expose those responsibilities to test the
live ownership choices. Preserve the distinct briefs and outputs when independence is
requested, and report any unavailable independent investigation.

## 3. Compare and recommend

Present the designs sequentially, then compare depth, locality and seam placement.
Recommend the strongest design and explain why. Propose a hybrid only when its
parts improve the combined shape; do not substitute an unranked menu for judgment.

Done when the recommendation follows the comparison and its tradeoffs are clear.
Selection and implementation remain with the owning task.
