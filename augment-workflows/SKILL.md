---
name: augment-workflows
description: Use when an Augment or Decision Site workflow is designed, changed, operated, reviewed, or diagnosed through the Augment MCP. Load it to turn intent into an explicit graph, preserve operation authority, and prove results from live product and workspace evidence.
---

# Augment Workflows

Own workflow design, operations and observation against current product state. Use the
[composition contract](../contracts/composition.md#operational-callers) . Current
Decision Site resources own the product contracts.

| Source | Owns |
| --- | --- |
| `decisionsite://docs/workflows` | Current workflow behavior, authoring guidance, node contracts, and operating guidance |
| `decisionsite://docs/skills` | Current guidance for finding, using, and designing workspace Skills |
| `decisionsite://organizations` | Live workflows, versions, executions, Skills, owners, destinations, and access |
| Active MCP tools and receipts | Current operations, call shapes, and observed results |
| This skill | How to frame, compose, and prove workflow work |

Follow links from those roots. Do not copy their contents into this skill or reconstruct
product contracts from memory. If live sources disagree, stop before mutation and name
the mismatch.

Use only the sections the job needs. Inspection, review, and diagnosis remain read-only
unless the user also requests a change.

## 1. Frame the work

Before drawing nodes, name:

- the event or schedule that starts the work;
- the observable result a successful run must produce;
- the evidence that would prove that result;
- the conditions that would make the run wrong even if it completes;
- every durable or external effect, including its owner, recipient, and
  destination; and
- the exact operation the user requested now.

Treat draft changes, validation, each lifecycle change, and execution control as
separate authority. A graph can contain an effect without authorizing that effect to
run.

Done means the requested change, desired result, unacceptable result, proof, and later
authority gates are explicit.

## 2. Ground the design in live truth

Read `decisionsite://docs/workflows` and follow only the branch the job needs. Read the
exact live page for every node type used by the graph. When the work uses MCP, inspect
the active tool schema for every requested operation.

Enter live state through `decisionsite://organizations` and follow returned canonical
URIs. Resolve every fixed dependency—workflow, version, owner, Skill, Decision Site,
recipient, integration, or destination—from current resources. Read the current target
again before a concurrency-sensitive mutation.

Done means every node, operation, and fixed dependency is backed by a current product
source or live canonical resource.

## 3. Compose the explicit system

A graph owns sequence, branches, waits, retries, approvals, effects and failure paths. A
node-local prompt owns its bounded task and supplied context. A workspace Skill owns
reusable methodology. Keep routing, recipients, authority and control flow in graph
structure and typed parameters rather than hiding them in prose.

Design the smallest explicit graph whose values have concrete sources, whose effects
have owners and whose failures have recovery or intentional terminals. Define
Agent/Skill interfaces by trigger, responsibility, context, required result and
missing-context behavior. Use current node/tool contracts and canonical identities;
resolve missing semantics or dependencies before proposing a mutation.

For a visible work product derived from evidence, apply
[faithful derivation](../faithful-derivation/SKILL.md) to its purpose, source context
and graph. Integrate its output obligations, fidelity, support, publication policy and
evals into the executable design. Acquire the exact evidence it needs and return
observations for reassessment; a future policy is not an observed result. For Agent
prompts and workspace Skills, use [writing for agents](../writing-for-agents/SKILL.md)
with the intended behavior and current instructions. Preserve the division between graph
control and node-local work.

When the domain expert must settle a work-product judgment, use the derivation
[interview guide](../faithful-derivation/guides/expert-interview.md) for the relevant
questions. Ask and carry back actual answers; do not require the whole bank. For
implementation, preserve the responsibilities and evidence obligations in the
[handoff guide](../faithful-derivation/guides/implementation-handoff.md) .

Done means the graph, prompts and Skills have clear responsibilities, every fixed input
comes from current evidence, and each consequential output has its required proof or an
explicit remaining gap.

## 4. Change only what was authorized, then prove it

For read-only work, use the current validation and resource surfaces to support the
finding, then stop before mutation. For an authorized change, use the current docs and
the chosen product surface to change the complete workflow document. Preserve state the
user did not ask to change. Validate the stored draft, resolve structural findings and
return relevant observations to the supporting judgments. Separately assess what
validation cannot prove: useful runtime data, prompt and Skill quality, live
credentials, recipient and destination suitability, business correctness, and effect
safety.

Perform only the requested lifecycle or execution operation. Keep its receipt and
canonical resource URIs when MCP supplies them. For asynchronous work, acceptance is the
start of observation, not the end. Follow live execution, node, output, provider, and
destination evidence until it supports the user's actual claim.

Done means a read-only finding is supported, or an authorized change is visible in
current product state and its requested outcome is observed. In either case, name the
last observed state and exact remaining uncertainty.

## Composition

- Use the task's domain Skill for its methodology. A domain Skill does not grant
  product access, mutation authority, or permission to produce an effect.

## Return the evidence

For authoring or editing, report the purpose, graph, changed canonical resource,
external effects, live dependencies, validation result, operations performed, observed
outcome, and unresolved risk.

For review or diagnosis, lead with the first condition that can make the graph fail,
no-op, contact the wrong person, produce the wrong result, or hide a failure. Name the
responsible node or field and the live evidence supporting the finding.

## Failure boundaries

- **Contract cache:** copied product mechanics replace live docs and tools.
- **Guessed state:** remembered names or IDs replace canonical resources.
- **Prompt-owned system:** prose hides control, authority, or effects.
- **Validation overreach:** structural acceptance becomes a claim of business
  correctness.
- **Receipt overreach:** request acceptance becomes a claim of execution or
  landing.
- **Authority drift:** one authorized operation is treated as permission for
  another.
