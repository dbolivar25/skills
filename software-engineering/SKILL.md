---
name: software-engineering
description: Use when TypeScript work changes contracts, logic, failures, effects, or verification; repository policy needs lint enforcement; test-first work is selected; an authorized change reaches a verified review boundary; or code/comment clarity is requested. Load it to connect correctness, module depth, testing evidence, and readable code without starting an unselected workflow.
---

# Implement a selected change

Own the path from requested behavior to working code and appropriate verification.
Inspect the repository, resolve the design questions that matter, make the change, run
its checks and incorporate what they reveal. Use the
[composition contract](../contracts/composition.md#operational-callers) .

Start from the user's outcome, accepted decisions and current code. Use project
vocabulary and inspect contracts, callers, adapters and local tests before inventing a
pattern. Keep implementation, checks, review, merge and deployment as distinct results;
carry the work through the stage the user actually requested.

## Resolve the responsibilities

Apply [engineering judgment](../engineering-judgment/SKILL.md) to the semantic change
and repository context. For TypeScript, account for all eleven standards across
contracts, logic, state, failures, effects and verification. Supply actual code and
observations, and resolve the judgment's missing facts before committing to uncertain
behavior.

Use supporting skills for the question they own:

- [Module design](../module-design/SKILL.md) returns ownership, interface, caller
  usage and tradeoffs when a seam or responsibility is unsettled.
- [Domain modeling](../domain-modeling/SKILL.md) sharpens meaning, invariants and
  examples. Obtain code or owner context as needed; record settled glossary/ADR
  deltas only within the task's documentation scope.
- [Engineering restraint](../engineering-restraint/SKILL.md) compares present need
  and continuing cost when the proposal adds machinery. Preserve the protected
  outcome and already settled owner choices when integrating its recommendation.
- [Interface design](../interface-design/SKILL.md) resolves the human experience.
  Supply renders and state behavior, implement its proposed changes and return
  observations for assessment. Apply [Augment design](../augment-design/SKILL.md)
  when its identity governs the surface, including the required production checks.

Acquire the evidence these skills need; do not hand input assembly back to the user.
When assessments disagree, identify the conflicting contract or premise and resolve it.
Ask for an owner decision only when evidence cannot settle it. Use
[decision rights](../decision-rights/SKILL.md) if an objection might block or reopen an
owner choice, then act on its supported next step.

A selected independent design exploration uses
[design alternatives](../tech-spec/branches/design-alternatives.md) . Ordinary coding or
comparison of supplied designs does not select that workflow.

## Implement and learn from checks

Use [verification design](../verification-design/SKILL.md) to choose observations,
independent oracles and required implementation evidence for each consequential claim.
Construct and run the checks at the owning seams. Supply their actual receipts back to
the relevant judgments; a sound test plan is not a passing test. Preserve unique
regressions when moving a seam.

Work in coherent behavioral slices. An unexpected failure may justify a bounded
[diagnosis](../diagnosing-bugs/SKILL.md) ; give it the symptom, environment, evidence
and existing fix authority. Consume the verified cause or precise remaining uncertainty,
then continue the implementation. A failing harness does not itself prove that the
product is wrong.

Select only the operational branches the task reaches:

| Situation | Method | Completion |
| --- | --- | --- |
| The user chooses test-first work, Red-Green-Refactor or integration tests as the implementation driver | [Test-first work](branches/test-first.md) | One behavior through red and green at a time; finish from green. |
| A proved repository policy should become a Biome GritQL rule | [Lint enforcement](branches/lint-enforcement.md) | Policy and allowed cases are grounded; real diagnostics and any fixes are proved on the installed engine. |
| An authorized change reaches a verified review boundary, or code/comment clarity is requested | [Finishing](branches/finishing.md) | Improve comprehensibility without changing behavior; rerun relevant checks after edits, or return findings in read-only work. |

Read each selected method before doing its work. Several may apply, but selecting one
does not silently select the others. General design or comment clarity does not impose
TypeScript, TDD or a new lint policy on the task.

## Complete the requested work

Reassess the resulting behavior and evidence against the user's outcome. Finish when the
change satisfies its applicable obligations and relevant checks, or when the exact
remaining limitation and unsupported claim are visible. Report what changed, why it
works, what was observed and what remains unproved.

A read-only review, diagnosis or explanation stays read-only. Reading this skill grants
no new effect authority. Continue an approved implementation without asking for its
approval again; return unsettled behavior or public contracts to design. An explicitly
selected [architecture scan](../architecture-scan/SKILL.md) or
[typed specification](../tech-spec/SKILL.md) is a separate job, not a mandatory prelude
to implementation.
