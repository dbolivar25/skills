---
name: augment-workflows
description: Use when an Augment or Decision Site workflow is designed, changed, operated, reviewed, or diagnosed. Load it to turn intent into an explicit graph, preserve operation authority, and prove results from live product and workspace evidence.
---

# Augment Workflows

This skill owns the workflow-engineering discipline. Current Decision Site
resources own the product.

| Source | Owns |
| --- | --- |
| `decisionsite://docs/workflows` | Current workflow behavior, authoring guidance, node contracts, and operating guidance |
| `decisionsite://docs/skills` | Current guidance for finding, using, and designing workspace Skills |
| `decisionsite://organizations` | Live workflows, versions, executions, Skills, owners, destinations, and access |
| Active MCP tools and receipts | Current operations, call shapes, and observed results |
| This skill | How to frame, compose, and prove workflow work |

Follow links from those roots. Do not copy their contents into this skill or
reconstruct product contracts from memory. If live sources disagree, stop
before mutation and name the mismatch.

Use only the sections the job needs. Inspection, review, and diagnosis remain
read-only unless the user also requests a change.

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
separate authority. A graph can contain an effect without authorizing that
effect to run.

Done means the requested change, desired result, unacceptable result, proof,
and later authority gates are explicit.

## 2. Ground the design in live truth

Read `decisionsite://docs/workflows` and follow only the branch the job needs.
Read the exact live page for every node type used by the graph. When the work
uses MCP, inspect the active tool schema for every requested operation.

Enter live state through `decisionsite://organizations` and follow returned
canonical URIs. Resolve every fixed dependency—workflow, version, owner, Skill,
Decision Site, recipient, integration, or destination—from current resources.
Read the current target again before a concurrency-sensitive mutation.

Done means every node, operation, and fixed dependency is backed by a current
product source or live canonical resource.

## 3. Design the explicit system

Put each concern where it can be owned cleanly:

| Module | Owns |
| --- | --- |
| Workflow graph | Sequence, branches, waits, retries, approvals, effects, and failure paths |
| Agent prompt | One node-local task, its supplied context, any Skill use, and the required result |
| Workspace Skill | Reusable methodology that may vary by workspace |

Build the smallest graph that owns the required behavior. Map every input to a
concrete upstream output. Give every meaningful error a recovery path or an
intentional terminal. Keep routing, authority, recipients, waits, retries,
approvals, and effects in graph structure and typed parameters rather than
prompt prose. Use AI for bounded judgment or language work, not hidden control
flow.

When an Agent uses a Skill, the Skill owns the reusable method. Its name,
trigger, responsibility, promised result, and missing-context behavior are the
interface consumers depend on. The Agent prompt supplies the local task,
available context, when to use the Skill, and the result this graph needs.
Prompt length is not the target; clear ownership is.

Done means every value has a source, every effect has an owner, every failure
has a disposition, and no prompt secretly carries graph control or authority.

## 4. Change only what was authorized, then prove it

For read-only work, use the current validation and resource surfaces to support
the finding, then stop before mutation. For an authorized change, use the
current docs and the chosen product surface to change the complete workflow
document. Preserve state the user did not ask to change. Validate the stored
draft, resolve structural findings, and separately judge what validation cannot
prove: useful runtime data, prompt and Skill quality, live credentials,
recipient and destination suitability, business correctness, and effect
safety.

Perform only the requested lifecycle or execution operation. Keep its receipt
and canonical resource URIs when MCP supplies them. For asynchronous work,
acceptance is the start of observation, not the end. Follow live execution,
node, output, provider, and destination evidence until it supports the user's
actual claim.

Done means a read-only finding is supported, or an authorized change is visible
in current product state and its requested outcome is observed. In either case,
name the last observed state and exact remaining uncertainty.

## Composition

- Load `writing-for-agents` when changing an Agent prompt or Skill body.
- Load `faithful-derivation` when the workflow derives a visible work product
  or decision from customer or operational evidence.
- Use the task's domain Skill for its methodology. A domain Skill does not grant
  product access, mutation authority, or permission to produce an effect.

## Return the evidence

For authoring or editing, report the purpose, graph, changed canonical resource,
external effects, live dependencies, validation result, operations performed,
observed outcome, and unresolved risk.

For review or diagnosis, lead with the first condition that can make the graph
fail, no-op, contact the wrong person, produce the wrong result, or hide a
failure. Name the responsible node or field and the live evidence supporting
the finding.

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
