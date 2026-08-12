# Pull-request branch

Use this branch when drafting or updating a pull request description. The review
decision is whether the current base-to-head change should merge, and the live
branch is the source of truth. Existing descriptions, commit messages, tickets,
and author explanations provide intent and context; they do not override the
implemented change.

A request to draft produces copy only. Updating the live pull request requires
explicit publication intent and a read-back of what landed.

## Ground the branch

Inspect:

- the current base and head revisions;
- the complete base-to-head diff;
- changed-file and diff-size distribution;
- commits and existing pull-request discussion;
- linked issues, specifications, or decisions; and
- automated and manual validation that was actually performed.

Determine the role of every material changed area. Distinguish implementation,
tests, generated output, configuration, documentation, migrations, and
mechanical changes when that distinction affects review. Do not claim that a
check passed, behavior was observed, or a requirement was satisfied without
evidence.

Completion criterion: every material changed area has an understood role or is
identified as unexplained scope, and every available validation claim has been
checked.

## Specialize the review map

Use the core review map with:

- the merge decision as the review decision;
- the current base-to-head branch as the source of truth;
- the intended post-merge behavior as the outcome;
- the difference between base and head as the semantic delta;
- meaningful implementation responsibilities as the review regions;
- tests, checks, measurements, and observed behavior as evidence; and
- unresolved risks and design questions as review focus.

Do not compose the description until every material branch region is accounted
for in the map.

## Choose the description shape

Include a section only when it answers a distinct reviewer question. Common
questions concern purpose, public interface, behavior delta, implementation
regions, design rationale, migration or rollout, diff shape, validation, visual
evidence, review focus, and non-goals. These are a menu, not a template.

A focused fix may need only purpose, mechanism, and validation. A broad
behavioral change may need an implementation map and explicit review focus.

## Render and re-audit

Begin with the outcome and the condition that most changes how the branch should
be understood. Reject a likely but misleading interpretation early when needed.
Use stable concepts from the review map rather than walking files or commits.
Give exact commands, identifiers, measurements, and results only when they help
the reviewer reproduce or evaluate a claim.

Re-read the description against the current base and head. Verify that facts,
statistics, validation, and material scope still match; inherited prose does not
describe an earlier branch state; and risks or follow-ups are not presented as
completed work.

Completion criterion: the core fidelity audit passes against the live branch,
and a reviewer can state the behavioral delta, navigate the important regions,
evaluate the evidence, and see where judgment is requested.
