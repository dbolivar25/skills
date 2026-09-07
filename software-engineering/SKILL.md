---
name: software-engineering
description: Use when TypeScript work changes contracts, logic, failures, effects, or verification; an interface needs design judgment; test-first work is selected; an authorized change reaches a verified review boundary; or code/comment clarity is requested. Load it to connect correctness, module depth, testing evidence, and readable code without starting an unselected workflow.
---

# Software engineering

Make correctness and comprehensibility properties of the code: precise values,
owned effects, useful interfaces, and evidence at the seam that owns the behavior.
Use project vocabulary and inspect existing code before inventing a pattern.

## Select the work

| Observable situation | Required material | Result and stopping boundary |
| --- | --- | --- |
| TypeScript work changes contracts, domain logic, state, failures, effects, or verification | [Engineering standards](references/standards.md); [testing evidence](references/testing-evidence.md) when verification is involved | Account for all eleven standards across the full semantic change; support each applicable obligation or report its remaining evidence gap. |
| A module's interface, ownership, depth, locality, testability, or navigability needs judgment | [Module design](references/module-design.md) | Choose the seam and what it hides; design judgment alone does not authorize implementation. |
| Alternative interfaces must be explored for a chosen problem | [Design alternatives](branches/design-alternatives.md), after module design | Compare materially different designs and recommend one. |
| The user chooses test-first behavior, Red-Green-Refactor, or integration tests as the implementation driver | [Test-first work](branches/test-first.md) | Drive one behavior through red and green at a time; finish from green. Ordinary implementation does not select this branch. |
| An authorized change reaches a verified review boundary, or the user requests code/comment clarity | [Finishing](branches/finishing.md) | Simplify behavior-preservingly within existing edit authority, or return findings in read-only work. A standalone comment request needs no prior implementation workflow. |

Read the selected material before doing its work. Several rows may apply, but
one row does not silently select the others. The TypeScript standards do not
become a language requirement for general module design or finishing.

## Keep authority with the task

Reading this skill grants no new mutation authority. Continue an already
approved implementation within its scope; read-only review, diagnosis, and
explanation remain read-only. An unsettled behavior or public contract belongs
to design, not a finishing pass. Carry existing user decisions into the selected
branch rather than asking for the same approval again.

A repository-wide ownership scan or a typed architecture handoff belongs to the
explicitly selected [architecture](../architecture/SKILL.md) workflow. A causal
investigation belongs to [diagnosing-bugs](../diagnosing-bugs/SKILL.md). Neither
is an automatic prelude to writing code.
