---
name: augment-workflows
description: Use when work creates, changes, validates, releases, runs, reviews, or diagnoses an Augment or Decision Site workflow. Load it to turn the request into an explicit graph while taking product contracts and live workspace state from current Decision Site resources.
---

# Augment Workflows

Use this skill as an operating discipline, not a cache of the product. Three live
sources govern the work:

```text
decisionsite://docs/workflows   product behavior and authoring contracts
decisionsite://organizations    current workspace state and dependencies
MCP tools and receipts          available operations and observed results
```

The docs explain what a workflow means. Organization resources supply the
owners, Skills, destinations, workflows, versions, and executions that exist
now. Tool schemas define the current call shape. When these sources disagree,
stop before mutation and report the exact mismatch.

## 1. Name the job and the authority

Classify the request as inspection, authoring, editing, validation, release,
execution, cancellation, retry, archive, or diagnosis. State:

- the event or schedule that starts the workflow;
- the result a successful run must produce;
- the evidence that would prove that result;
- the conditions that make a run wrong even if it completes; and
- every durable or external effect, including its owner, recipient, and
  destination.

A request to create or edit a workflow authorizes the scoped draft mutation.
Release, execution, cancellation, retry, archive, and unarchive require that
exact authority from the user. Authoring a graph that contains an action does
not authorize the action.

This step is complete when the intended result, unacceptable result, requested
mutation, and any later authority gate are explicit.

## 2. Read the live contract

Inspect the active MCP server's tools and resources. Prefer native resource
reads. Use `read_resource` only when the client cannot expose native resource
reads to the model.

Start at `decisionsite://docs/workflows`, then follow the branch that matches
the job:

| Job | Required live docs |
| --- | --- |
| Design, create, edit, or validate | `decisionsite://docs/workflows/authoring` |
| Select or configure nodes | `decisionsite://docs/workflows/nodes`, then the exact page for every selected node type |
| Release, run, observe, retry, cancel, or diagnose | `decisionsite://docs/workflows/operating` |
| Learn from a complete graph | `decisionsite://docs/workflows/examples`, then one relevant example |
| Use or change a Skill dependency | `decisionsite://docs/skills`, then the task-relevant Skill guide |

Follow links returned by the docs. Read only the branches the task needs, but
read every exact node page used by the graph. Treat the live tool schema as the
call contract and the docs as the usage contract. Never reconstruct a node,
parameter, port, resource URI, or tool name from memory.

This step is complete when every proposed node and operation is backed by a
current docs page and a callable MCP surface.

## 3. Read the live workspace

Start at `decisionsite://organizations` and follow returned canonical URIs.
Resolve owners, Decision Sites, Skills, recipients, integrations, workflows,
versions, and executions from current resources instead of remembered names or
hand-built paths.

Before changing a draft or releasing a version, read that exact Workflow
Version and retain its complete document, state, canonical URIs, and ETag. A
docs page or Skill can explain a method; neither grants access to customer
state or permission to mutate it.

This step is complete when every fixed dependency has a current canonical
resource and every concurrency-sensitive write has a fresh ETag.

## 4. Design the explicit graph

Put each concern in the module that can own it cleanly:

| Module | Owns |
| --- | --- |
| Workflow graph | Sequence, branching, waits, retries, approvals, and effects |
| Agent prompt | The node-local task, supplied context, Skill use, and required result |
| Skill | Reusable methodology whose implementation may vary by workspace |
| Live docs and tool schema | Product behavior and the current call contract |

Then draw the smallest graph that owns the required behavior:

```text
trigger
  -> deterministic routing and preparation
  -> bounded AI judgment or language work, when needed
  -> explicit approval, wait, retry, or effect nodes
  -> observable success and failure terminals
```

Map each node's input ports to concrete upstream outputs before writing its
parameters. Connect meaningful error paths or terminate them intentionally.
Keep permissions, recipients, routing, retries, waits, approvals, and external
effects in graph structure and typed parameters rather than prompt prose.

When an Agent node uses a Skill, keep the reusable method in the live Skill.
The Agent prompt supplies the task, relevant context, when the Skill applies,
and the result the workflow needs. A Skill's name, trigger, responsibility,
result, and insufficient-context behavior form the interface its consumers rely
on; its implementation can vary by workspace. Prompt length is not a design
target. Clear ownership is.

This step is complete when every downstream value has a source, every effect
has an owner, and no prompt secretly carries graph control or authority.

## 5. Author and validate through MCP

Build the complete document from the live authoring and node contracts. Use the
document tools named by the active server. For replacement, preserve fields the
user did not ask to change and pass the fresh ETag required by the tool.

Validate the stored draft with the current server. Resolve structural and
expression findings, then review what validation cannot prove: live dependency
availability, useful runtime values, prompt and Skill quality, recipient and
destination suitability, business correctness, and effect safety.

This step is complete when the stored document matches the intended graph,
server validation is known, and each remaining semantic risk is either resolved
or named.

## 6. Perform only authorized operations

For an authorized release or execution operation, reread the target, use the
exact current tool, and retain the returned receipt and canonical resource
URIs. Before an unrequested gated action, state what it changes and ask for the
missing authority.

This step is complete when the requested operation has an MCP receipt or the
missing authority is the only remaining blocker.

## 7. Observe the result

An accepted asynchronous operation is not a completed operation. Follow the
returned execution, node, and bounded-output resource URIs until the requested
claim can be supported. Match the claim to the evidence: terminal execution,
correct node output, provider acceptance, external delivery, and human action
are different observations.

This step is complete when the requested outcome is observed or the report
states the last observed state and the exact remaining uncertainty.

## Composition

- Load `writing-for-agents` when the work changes an Agent prompt or Skill
  body. It owns invocation, information hierarchy, and completion criteria.
- Load `faithful-derivation` when the workflow derives a visible work product
  or decision from customer or operational state. It owns evidential fidelity;
  this skill still owns the executable graph and MCP lifecycle.
- Use a task-specific domain Skill when the workflow's method depends on one.
  The domain Skill supplies methodology, not workflow permissions or product
  contracts.

## Report

For authoring or editing, report the workflow purpose, graph, changed resource,
node types, external effects, live dependencies, docs read, validation result,
performed operations, observed execution state, and unresolved risks.

For review or diagnosis, lead with the first condition that can make the graph
fail, no-op, contact the wrong person, produce the wrong result, or hide a
failure. Cite the node and field when one exists, then name the live resource or
observation that supports the finding.

## Failure boundaries

- **Contract cache:** a bundled registry, copied tool list, or remembered node
  shape replaces the live docs.
- **Guessed state:** names or IDs stand in for canonical workspace resources.
- **Prompt-owned system:** prompt text hides routing, authority, retries,
  approvals, or effects that belong in the graph.
- **Validation overreach:** structural acceptance is reported as business
  correctness.
- **Receipt overreach:** request acceptance is reported as execution or landing.
- **Authority drift:** draft access is treated as permission to release, run,
  retry, cancel, archive, or contact someone.
