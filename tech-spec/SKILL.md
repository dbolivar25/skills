---
name: tech-spec
description: Specify a selected software change as typed contracts and complete end-to-end flows.
disable-model-invocation: true
---

# Typed architecture specification

Deliver a **typed call-stack architecture handoff**: contracts in code and complete
execution flows, with prose explaining why. This skill is design-only. Return
it inline unless the user requested a file; then save it at the requested path.
Do not implement or ask to implement by default.

## 1. Establish the design problem

Read [engineering standards](../software-engineering/references/standards.md),
[module design](../software-engineering/references/module-design.md),
[testing evidence](../software-engineering/references/testing-evidence.md) and
[the RGR workflow](../software-engineering/branches/test-first.md) as planning
reference, not implementation authority. Inspect local code/docs for vocabulary,
module layout, domain concepts, errors, adapters, observability, runtime patterns
and test style before introducing a pattern, dependency, schema or test strategy.

Capture current state, problem, users/callers, goals, non-goals, constraints,
invariants, affected systems, likely entrypoints, operational/runtime concerns,
risks and open questions. Ground every requirement in conversation, code or docs;
unknowns stay questions.

When available context is sufficient, proceed directly to design. A scan is not
a prerequisite. If essential context is missing, state why a full spec would be
premature, inspect facts the codebase can answer, and use
[grilling](../grilling/SKILL.md) for unresolved decisions. Its dependency-frontier
rounds group independent questions and defer dependent ones. Use the interview's
[domain-modeling](../domain-modeling/SKILL.md) docs branch only when durable
language, ADRs or other design artifacts are requested.

Done when problem, callers, constraints, affected systems, desired behavior,
boundaries, likely APIs, invariants, risks and acceptance tests are known enough
to specify, with remaining unknowns explicit. Do not invent requirements, APIs,
files or call stacks to get past this gate. An interview concludes in the typed
handoff below, not merely interview notes.

## 2. Compare alternatives before recommending

Explore materially different interface shapes, seam placement, ownership,
call stacks, runtime topology or module boundaries. Naming variants do not count.
For each alternative sketch:

- domain types/state model, inputs/outputs, public interfaces and expected failures;
- seams/adapters and entrypoint-to-side-effect execution;
- parsing/projection and reachable authorization, observability, cancellation,
  idempotency and transaction flow;
- test seams and tradeoffs.

Compare caller burden, depth/leverage, locality of invariants/change, seam
placement, parsing/projections, error/cancellation model, real-seam testability,
operational fit and implementation complexity. The
[divergent-interface method](../software-engineering/branches/design-alternatives.md)
is available when the user selects that exploration; preserve its distinct
technical briefs and comparison if used.

Done when the recommendation follows comparison and its tradeoffs are explicit.

## 3. Build one contract-and-flow coverage map

For the recommended design, inventory **every new, changed or deleted behavior**.
For each, map its entrypoint, contracts, owning modules/files, full execution and
verification slices. This is the single coverage map used to write and check the
spec; do not substitute a list of changed files for behavioral coverage.

Account for every new, changed or deleted:

- domain value, branded/refined type, state-machine variant and operation input/output;
- request/response, function signature, class/module interface and public API;
- expected-failure/custom-error union and adapter interface;
- protocol DTO, persistence DTO/projection and runtime-boundary codec.

Sketch concrete types/interfaces/APIs at every new or changed boundary, or explain
why none is needed. State which owner knows each fact, what crosses each seam,
and what must remain hidden. Prefer precise domain values over undifferentiated
strings, flags, nullable bags or loosely shaped objects. Keep framework, network,
persistence, time, randomness, telemetry, runtime and platform mechanics with the
real adapter or composition root that owns them; every seam earns its existence
through invariants, locality, leverage, testability or a real boundary.

For **every affected behavior**, trace entrypoint to side effects and response,
including type/data flow. Show current versus proposed flow when behavior changes:

```text
raw input
  -> boundary DTO / unknown
  -> parser
  -> canonical domain/application input
  -> service/module interface
  -> adapter call
  -> typed result/error
  -> projection
  -> serialized output
```

Include reachable failure, retry, cancellation, transactionality, idempotency,
observability, authorization and runtime-hop flows. The trace must explain what
happens along these paths, not merely list their names as concerns.

Map each contract and call-stack step to a file/module or explicit open question.
Include files to add, change and delete; tests; and applicable config, migration
and runtime files. Name each file's responsibility: contract, path, boundary,
adapter, domain concept or test claim.

Done when all affected behavior has a typed end-to-end trace, every relevant
contract is concrete, and each step has an owner or an explicit unresolved owner.

## 4. Plan vertical verification slices

Use the RGR workflow: one failing behavior test, minimal implementation, repeat.
Each cycle informs the next. Do not plan “all tests first, then all code.” This
is a plan for implementation; do not run the implementation workflow here.

For each coverage-map entry, identify the test seam, independent oracle and
required real implementation evidence. Cover proportionately:

- happy and failure paths;
- parser rejection and accepted shapes;
- domain invariants and legal state transitions;
- adapter contracts and persistence/runtime semantics;
- cancellation, retries and idempotency;
- observability and safe summaries when relevant;
- end-to-end flows for high-consequence behavior.

Done when every public behavior, invariant, important failure path, changed
boundary and changed seam has a red test slice or an explicit reason not to test
it. Preserve unique regressions if tests will move; substitutes do not establish
claims belonging to actual database or runtime behavior.

## 5. Write and check the handoff

Use [the spec shape](references/spec-shape.md), compressing presentation for
small changes while retaining the coverage map's obligations. Types and call
stacks define what changes; prose explains why. Give each rule one authoritative
home and reference it elsewhere rather than restating it in several sections.

Check the artifact against the coverage map: every affected behavior, contract,
flow, owner and verification slice is represented or marked unresolved. Do not
omit hard-to-specify types, seams, flows or tests merely to make it look complete.

Done when another engineer can implement from the typed handoff without inventing
missing decisions. Return inline or save the requested file, then stop at design.
