---
name: augment-workflows
description: Author, edit, validate, debug, release, execute, and inspect Augment or Decision Site MCP workflows. Use for WorkflowDocV1, workflow lifecycle tools and resources, public node types, Data Context, CEL, Liquid, custom AI output, schedules, execution nodes, or workflow quality.
---

# Augment Workflows

## Mission

Build workflows graph-first and purpose-first. Use only the public node
contracts bundled with this skill, map the runtime Data Context at every
configurable node, validate before release, and distinguish accepted execution
from observed execution.

This package is standalone. It must work without a source checkout. The bundled
node registry, Data Context, and lifecycle references are the cold-start
contract. MCP discovery confirms that the expected contract is available; it
does not license substituting a different workflow interface.

## Reference Routing

- Before choosing or editing node types, load
  [`references/node-registry.md`](references/node-registry.md).
- Before writing CEL, Liquid, downstream references, `zip`, `broadcast`, or
  batch behavior, load
  [`references/data-context.md`](references/data-context.md).
- Before reading or mutating workflow resources, load
  [`references/workflow-lifecycle.md`](references/workflow-lifecycle.md).
- For nontrivial AI, approval, retry, waiting, triggering, or external action
  design, load
  [`references/12-factor-workflow-quality.md`](references/12-factor-workflow-quality.md).

## Operating Rules

- Never invent node types, parameter names, tool names, resource templates, or
  event fields.
- Use literal JSON for literal parameters, CEL expression strings for CEL
  parameters, and Liquid template strings for Liquid parameters.
- Quote static strings inside CEL expressions. `"\"C0123456789\""` is a CEL
  string literal; `"C0123456789"` is a variable lookup.
- Do not persist `parameters._executionMode`. Execution variant comes from the
  node type.
- Use node-level `mode` and `position` when producing builder-ready documents.
  `mode` is `per_item` for `.perItem.` types and `batch` for `.batch.` types.
- Use AI only for bounded language or judgment work. Keep routing,
  permissions, recipients, waits, retries, approvals, and external actions in
  explicit graph nodes and parameters.
- Connect, recover, or intentionally sink every meaningful error path.
- Treat validation as necessary but not sufficient. It does not prove
  integration availability, expression usefulness, prompt quality, or business
  correctness.
- Read a fresh workflow-version resource before draft replacement or release.
  Pass its current `etag` as `ifMatch`.
- Set optional `sourceAgent` to the actual invoking agent or client when useful;
  never use this skill name as a placeholder identity.
- A request to create or edit a workflow authorizes the scoped draft mutation.
  Unless already explicit in the user's request, get confirmation before
  release, execution, cancellation, retry, archive, or unarchive.
- Authoring a draft that contains an action node is not itself execution
  authorization.
- Execution creation is asynchronous. Acceptance or enqueueing is not
  completion.

## Steps

1. **Classify the operation.**
   Identify whether the request is authoring, editing, validation, lifecycle
   operation, execution operation, inspection, or explanation. Name the
   workflow purpose, trigger, done condition, bad-run condition, and external
   effects. Completion criterion: the requested mutation and any later
   confirmation gate are explicit.

2. **Load the required contracts.**
   Follow Reference Routing for every branch used by the request. If operating
   MCP, inspect the active server's listed tools and resource templates and
   confirm the required operation-specific name is present. Stop before
   mutation if it is absent. Completion criterion: every node, parameter, tool,
   resource, and expression language in the proposed work has the expected
   bundled contract and a callable server surface.

3. **Read current state.**
   Resolve canonical organization, workflow, version, execution, and node URIs
   from resource responses. For version changes, retain the full current
   document, state, `resourceUri`, `executionsResourceUri`, and `etag`.
   Completion criterion: the next read or write uses a canonical URI and, when
   required, a fresh ETag.

4. **Map the graph.**
   Define the trigger, nodes, input ports, success/error ports, fan-in labels,
   terminal nodes, and side-effecting nodes before writing parameters. For each
   configurable node, map `json`, `items`, `ports`, `trigger`, `author`, and
   `organization` from the node's actual upstream position. Completion
   criterion: every downstream expression has a concrete runtime source.

5. **Author the document.**
   Use `schema_version: "ds-v1"`, one trigger, unique node ids, public type
   strings, `typeVersion: 1`, builder-ready node envelopes, exact parameters,
   and explicit connections. For AI nodes, define one job, bounded prompt
   context, exact return type, downstream consumer, and insufficient-context
   behavior. For `return_type: "custom"`, include a supported `value_schema`.
   Completion criterion: all required input ports are connected and no prompt
   secretly owns graph control or external authority.

6. **Run deterministic preflight.**
   For a JSON file, resolve the script relative to this skill folder and run:

   ```bash
   node scripts/check-workflow-doc.mjs path/to/workflow.json
   ```

   For inline documents, apply the same registry, parameter, connection, CEL,
   Liquid, cron, custom-output, and runtime-trap checks manually. Completion
   criterion: all errors are fixed and every remaining warning is understood.

7. **Persist and validate.**
   Create with `create_workflow` or `create_workflow_version`. Replace an
   existing draft with `update_workflow_version_draft` and a fresh `ifMatch`.
   Validate the stored or supplied document with `validate_workflow_version`.
   Completion criterion: the local preflight and current server validation
   results are both known.

8. **Perform approved lifecycle or execution actions.**
   Use the exact operation-specific tool from the lifecycle reference. Before a
   gated action, summarize what it can change and obtain confirmation unless
   the user already requested that exact action. Completion criterion: the
   action receipt and returned canonical resource URIs are captured.

9. **Observe the run.**
   After execution creation or retry, read execution detail, then node
   lifecycle and output resources as needed. Use bounded output chunks for
   large outputs. Completion criterion: report observed status and node output,
   or state plainly that only acceptance has been observed.

## Output Contract

For authoring or edits, return:

- Workflow purpose, trigger, done condition, and bad-run risk.
- Document or document location.
- Node list with type strings and side-effecting nodes.
- Nontrivial Data Context and AI-output assumptions.
- Preflight and server-validation results.
- Performed or required MCP operations and confirmation gates.
- Observed execution state when applicable.
- Remaining risks or user decisions.

For review/debug, lead with findings:

- P0: will fail validation or execute the wrong side effect.
- P1: can validate but likely fail, no-op, spin, contact the wrong human, or
  produce unusable output at runtime.
- P2: confusing, brittle, too broad, under-observed, or hard to operate.

Each finding should cite the node id, field, and reason.

## Failure Modes

- Blind registry guessing: writing plausible node names or fields that are not
  in the bundled public registry.
- Context flattening: assuming `json.value` exists everywhere, especially after
  `zip`.
- Language confusion: using Liquid braces in CEL fields, or unquoted static CEL
  strings.
- Validation overtrust: server validation can pass documents that still fail on
  first execution due to expression context, integration state, prompt quality,
  missing human gates, or wrong business assumptions.
- Monolithic AI node: asking one prompt to retrieve, reason, decide, write,
  route, approve, and act.
- Context dumping: feeding an AI node large raw objects, transcripts, or lists
  instead of a compact, bounded context package.
- Tool-call theater: letting AI text imply an action, recipient, permission, or
  branch that the graph does not explicitly encode.
- Control-flow drift: retries, approvals, waits, escalation, and terminal states
  exist only as prompt advice.
- Unowned error path: error ports are missing, accidentally dropped, or passed
  downstream as raw noise the next node cannot use.
- Authority drift: treating draft authoring as execution approval, or treating
  release, execution, archive, cancel, or retry as harmless.
- Scheduled-meeting confusion: referencing meeting paths in scheduled workflows
  without an upstream node that creates meeting data.
- Chat-only design: assuming every trigger includes a human message or
  conversational thread when the workflow can run from cron, meeting, company,
  or CRM events.
- Hidden state: relying on memory, ambient integration state, or a previous
  conversation instead of explicit trigger and upstream node output.

## References

- [`references/node-registry.md`](references/node-registry.md): public node
  types, parameters, modes, and port shapes.
- [`references/data-context.md`](references/data-context.md): CEL and Liquid
  runtime context, root availability, and common traps.
- [`references/workflow-lifecycle.md`](references/workflow-lifecycle.md): MCP
  resources, write tools, validation, release, execution, cancel, retry, and
  archive behavior.
- [`references/12-factor-workflow-quality.md`](references/12-factor-workflow-quality.md):
  reliable-agent workflow-quality rubric adapted from HumanLayer's
  12-factor-agents material.

## Freshness Rule

Use the bundled contracts without attempting repository discovery. MCP
discovery is an availability check: if an expected operation-specific tool or
resource is absent, stop before mutation and report the exact mismatch. Do not
substitute an unbundled workflow operation or reconstruct a different
interface.
