---
name: writing-pr-descriptions
description: Use when a PR description must be drafted or updated from the live branch, or a branch must become legible for merge review. Load it to derive the reviewer's decision map from the current base-to-head change instead of stale development history.
---

# Writing PR Descriptions

A pull request description renders a **review map** for one decision: whether the current base-to-head code change should merge.

The live branch is authoritative. Existing descriptions, commit messages, tickets, and author explanations provide intent and context, but they do not override the implemented change.

## 1. Ground the branch

Inspect:

- the current base and head revisions;
- the complete base-to-head diff;
- changed-file and diff-size distribution;
- commits and existing PR discussion;
- linked issues, specifications, or decisions; and
- automated and manual validation that was actually performed.

Determine the role of every material changed area. Distinguish implementation, tests, generated output, configuration, documentation, migrations, and mechanical changes when that distinction affects review.

Do not claim that a check passed, behavior was observed, or requirement was satisfied without evidence.

This step is complete when every material changed area has an understood role or is identified as unexplained scope, and every available validation claim has been checked.

## 2. Build the review map

Use `review-maps` with:

- the merge decision as the review decision;
- the current base-to-head branch as the source of truth;
- the intended post-merge behavior as the outcome;
- the difference between base and head as the semantic delta;
- meaningful implementation responsibilities as the review regions;
- tests, checks, measurements, and observed behavior as evidence; and
- unresolved risks and design questions as review focus.

Do not begin prose composition until the review map is complete.

This step is complete when the `review-maps` completion criterion is satisfied for the branch.

## 3. Choose the description shape

Include a section only when it answers a distinct reviewer question.

Possible sections include:

- **Purpose** when motivation or intended outcome is not obvious.
- **Public interface** when commands, APIs, schemas, configuration, or user workflows change.
- **Behavior delta** when existing behavior is replaced or reinterpreted.
- **Implementation map** when responsibilities span several meaningful regions.
- **Design rationale** when the chosen shape carries non-obvious tradeoffs.
- **Migration or rollout** when old and new states coexist or sequencing matters.
- **Diff shape** when tests, generated files, mechanical edits, or a few large regions could distort the apparent implementation size.
- **Validation** when evidence needs more than a short test list.
- **Visual evidence** when appearance or interaction changes.
- **Review focus** when particular risks, boundaries, or design judgments deserve attention.
- **Non-goals or follow-ups** when adjacent work is deliberately excluded.

Prefer prose for causality, tables for parallel mappings or before-and-after comparisons, and lists for independent facts.

Do not reproduce this menu as a fixed template. A focused fix may need only purpose, mechanism, and validation. A broad behavioral or architectural change may require a larger map.

This step is complete when every included section changes the reviewer's understanding or next move and every material reviewer question has somewhere to be answered.

## 4. Render the description

Begin with the outcome and the condition that most changes how the branch should be understood. Reject a likely but misleading interpretation early when necessary.

Describe behavior before implementation. Use the stable concepts from the review map instead of walking through files or commits. Connect implementation regions to the responsibilities they own.

Keep these distinctions visible:

- behavior versus mechanism;
- base state versus head state;
- intended outcome versus observed result;
- automated evidence versus manual observation;
- evidence versus inference;
- shipped scope versus non-goals; and
- settled behavior versus requested reviewer judgment.

Use exact commands, identifiers, measurements, and results when they help the reviewer reproduce or evaluate a claim. Give the reviewer setup instructions only when they materially enable review.

End with review focus when specific questions deserve judgment. Do not manufacture questions merely to create a section.

This step is complete when a reviewer can state the behavioral delta, navigate to the important implementation regions, evaluate the supporting evidence, and identify where their judgment is requested.

## 5. Audit against the live branch

Re-read the description against the current base and head.

Verify that:

- every factual claim is supported by the current branch;
- file counts, additions, deletions, and other statistics are current;
- validation claims match results that actually exist;
- every material change is represented;
- no section repeats another section's meaning;
- no passage merely inventories files or commits;
- no inherited text describes an earlier branch state;
- risks and non-goals are not presented as completed work; and
- the description's resolution is proportionate to the review surface.

Delete any passage whose removal would not change the reviewer's understanding, navigation, judgment, or next move.

The description is complete when the review map remains faithful after rendering and a reviewer can begin with a reliable model of the branch rather than reconstructing it from scratch.
