---
name: module-design
description: Use when a module interface, ownership, depth, dependency seam, or testability needs design judgment. Load it to reduce caller knowledge and concentrate invariants behind a useful interface, with concrete usage and tradeoffs.
---

# Module design

Read the [core](core.md) and its required methods. Acquire real callers, current
module responsibilities, dependency behavior, project vocabulary and relevant
tests. Use the core to identify which additional fact would affect seam placement
rather than scanning the whole repository without a question.

When competing interface designs are selected, use
[alternatives](branches/alternatives.md): prepare independent technical briefs,
obtain the designs, and pass their results to the core for one comparison. A
routine design judgment does not dispatch that team.

Return the proposed shape, caller examples, hidden responsibilities and tradeoffs.
A scan or full specification remains its own task. If implementation is already
authorized, hand the accepted shape back to that task's edit/test loop rather
than interpreting a design recommendation as new authority.
