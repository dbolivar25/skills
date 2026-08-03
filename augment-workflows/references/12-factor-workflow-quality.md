# 12-Factor Workflow Quality

This reference adapts the complete idea set from HumanLayer's
`12-factor-agents` repository into Augment MCP workflow-building practice, in
our own operational language. It is a design rubric, not a node registry. Use
it when a workflow includes AI nodes, human input, approvals, external actions,
long-running execution, retries, scheduled/event triggers, or nontrivial
runtime context.

Source baseline used for this adaptation:
`humanlayer/12-factor-agents` at commit
`d20c728368bf9c189d6d7aab704744decb6ec0cc`.

## Foundation

Production agentic systems are still software. The reliable shape is usually a
deterministic graph with carefully placed AI steps, not an open-ended model loop
that owns the whole job. The graph should own state, routing, pause/resume,
approval, retries, side effects, and observability. AI nodes should do the
language-sensitive work that deterministic nodes cannot do well.

For Augment workflows, that means a high-quality workflow is not just a valid
`ds-v1` document. It is a graph where:

- predictable context is loaded before the AI step;
- prompts are first-class authored behavior;
- every AI node has a small job and clear output contract;
- control flow is encoded in nodes and connections;
- human review and approval are explicit graph steps;
- side effects are gated and observable;
- errors are compacted into recoverable context;
- the execution can be inspected and explained from explicit state, with
  waiting, approval, cancellation, and retry represented by supported
  operations.

## Complete Principle Mapping

| Principle | Core idea | Augment workflow translation |
| --- | --- | --- |
| Natural language to structured action | A model is most useful when translating messy language or context into a structured next step or answer. Deterministic code should decide what that structured output means operationally. | Use AI nodes for interpretation, classification, ranking, synthesis, or drafting. Do not let AI prose secretly execute action. Downstream nodes should consume explicit outputs, branches, and parameters. |
| Own prompts | Prompts are application logic, not hidden framework magic. They need the same care as code: exact instructions, examples when needed, testable expectations, and iteration based on failures. | Write every AI message deliberately. State the node's job, available context, output expectations, forbidden assumptions, and insufficient-context behavior. Keep prompt content in the workflow document where it can be reviewed. |
| Own context | The model only sees what the prompt gives it. Quality depends on dense, relevant, bounded context rather than raw history or whatever a framework happens to include. | Build prompt context from known Data Context roots with Liquid. Include only fields needed for the node's decision. Bound loops, summarize long transcripts, label sources, and avoid leaking irrelevant or sensitive fields. |
| Tools are structured outputs | A tool call is structured model output plus deterministic execution. The model may propose an action; software owns whether, when, and how that action is executed. | Treat workflow node outputs and parameters as contracts. Use AI to produce content or decisions, then let graph nodes, approvals, CEL conditions, and action nodes determine execution. |
| Unify execution and business state | If possible, the history of what happened should also explain where the work is. Hidden orchestration state makes recovery and debugging harder. | Prefer explicit trigger payloads, node outputs, execution resources, and human responses over invisible memory. Include identifiers and decision context in messages so the execution can be inspected later. |
| Launch, pause, resume | Useful agentic work needs simple ways to start, inspect, wait, stop, and continue after external events. | Design manual, scheduled, and event-triggered runs with clear execution resources. Use available approval, wait, waitUntil, schedules, and execution reads instead of pretending long waits are synchronous. Do not assume a general public resume operation. |
| Contact humans through explicit steps | Asking a human for clarification, feedback, approval, or completion is part of the agent's toolset and state machine. | When available to the current user, use explicit approval or notification nodes. Separate clarification from approval from final notification. Include context, options, approver identity, timeout behavior, and continuation semantics. |
| Own control flow | Reliability comes from owning the loop: when to continue, branch, pause, retry, escalate, compact context, or stop. | Encode branches with `if`, approvals with `approval`, fan-in with `zip`, waits with `wait` or `waitUntil`, retries with retry config where supported, and terminal behavior with explicit sinks or actions. |
| Compact errors into context | Errors can help an AI recover, but raw repeated failure noise can cause spin. Error information should be concise, actionable, and bounded. | Connect error ports. Convert failures into short recovery context: failed node, attempted input, concise error, retry count, and needed decision. Escalate or sink after a bounded number of attempts. |
| Small focused agents | AI reliability drops as scope and context grow. Small, focused AI steps are easier to test, debug, and improve. | Keep each AI node to one job. Split prompts that both gather facts and write outputs, or both decide policy and perform action. Use several focused nodes plus graph control before using one broad AI node. |
| Trigger from anywhere | Agentic work should start from the channel or event where the user or system already lives, not only from chat. | Design against the actual trigger payload: manual, scheduled, meeting, company, CRM, Slack, email, or other events. Do not assume a human message, meeting id, or thread exists unless the trigger or upstream loader provides it. |
| Stateless reducer | A robust agent step should behave like a function of explicit state: current input plus prior events produce the next output. | Make nodes rerunnable from trigger, author, organization, and upstream Data Context. Avoid relying on ambient chat history, private memory, or unstated integration state. |
| Pre-fetch likely context | If the system can predict what context the AI will need, fetch it deterministically before calling the model. The model should use context, not spend steps discovering obvious context. | Add loader/search/context nodes before AI when the registry supports them. For meeting workflows, load meeting data before summarizing. For scheduled workflows, add an upstream node that creates the business object context before referencing it. |

## Detailed Carryover

- Agentic software still has the same basic pieces: a prompt, a structured
  model output, deterministic dispatch, accumulated context, and a loop or
  graph that decides whether to continue, pause, or stop. In Augment workflows,
  those pieces should be visible as node configuration, connections, execution
  history, and lifecycle operations.
- Natural language should be translated into structured workflow decisions only
  where language understanding is the hard part. If the needed ids, records, or
  lists are predictable, fetch them before the AI node rather than making the
  model ask for them.
- Prompt ownership means the agent builder can change the exact instructions,
  role/message layout, examples, output expectations, and reasoning hints. If
  behavior matters, keep representative examples or assertions in the prompt
  contract or review notes.
- Context includes instructions, retrieved records, prior node outputs, human
  responses, memory-like history, and output-format constraints. Shape all of
  that deliberately. Favor dense, labeled excerpts over raw dumps. Remove or
  summarize resolved errors when they would distract the next AI step.
- Tool or action selection and tool or action execution are separable. The graph
  may pause after a proposed action, ask a human, wait for an external event,
  retry, or choose a different branch before execution.
- Unified state should make the run inspectable, recoverable through supported
  operations, and explainable. Workflow execution resources and node outputs
  are the durable thread of what happened.
- Pause/resume needs to work around long-running tasks and human decisions,
  including the critical gap between proposed side effect and actual side
  effect. Do not design only for synchronous happy paths.
- Human contact can be clarification, approval, rejection feedback, completion
  notice, or escalation. Those are different workflow states and should not be
  collapsed into one vague message. Approval and notification node visibility
  can be feature-gated, so confirm availability before depending on them.
- Owning control flow includes more than branches: summarization, cache use,
  model-judge steps, context compaction, logging, metrics, rate limiting,
  durable sleep, and wait-for-event behavior are graph design choices when they
  matter.
- Error recovery should be bounded. A small number of attempts can be useful;
  repeated identical failures should compact context, escalate, or stop instead
  of looping.
- Small AI scopes keep the model near its capability boundary without letting
  context sprawl. A useful default is a 3-10 step mental task; only stretch
  toward larger scopes when the workflow can still be tested, observed, and
  debugged.
- Trigger-anywhere design means both starts and responses can happen through
  product events, schedules, Slack, email, SMS, webhook-like events, or other
  agents. High-stakes tools become safer when the workflow can quickly reach the
  right human and leave an audit trail.
- Stateless-reducer design means each step can be re-derived from explicit
  state. The same input state should produce the same kind of next output
  without relying on hidden chat context.
- Validation checks structure and some policy. It does not prove that the
  prompt has enough context, that the selected human can approve, that external
  integrations are configured, or that the workflow's output will satisfy the
  business purpose.

## Quality Rubric

Before handing off or releasing a workflow, check these questions:

- Does the graph own the workflow, or is an AI node being asked to act like an
  entire autonomous worker?
- Is every AI node small enough that a human can read its prompt and know what
  it should do?
- Is the AI context explicit, bounded, source-labeled, and shaped for the task?
- Did the workflow pre-load predictable facts instead of asking the model to
  infer or rediscover them?
- Are human clarification, approval, and final notification separate when they
  mean different things?
- Can a side-effecting action be reviewed between proposal and execution?
- Are retries, waits, escalation, and terminal states represented in the graph?
- Are error paths connected or intentionally sunk?
- Can the execution be inspected later and understood from explicit state?
- Would the workflow still make sense when triggered from a schedule or system
  event instead of a chat request?
- Is every downstream reference backed by trigger context or an upstream node?
- Does validation prove only structure, or has runtime usefulness also been
  reviewed?

## Common Corrections

| Weak shape | Better shape |
| --- | --- |
| One AI node receives a giant payload and decides everything. | Deterministic loaders assemble context; one focused AI node performs one judgment or draft; graph nodes route and act. |
| Prompt says "ask for approval before sending" but email node is connected directly after AI. | AI drafts content; approval node shows recipient, subject, body, and reason; email node runs only on approve branch. |
| Scheduled workflow references `json.meeting` or `trigger.meetingPlanId`. | Scheduled trigger creates schedule context; upstream loader or selector creates the meeting/account context before any meeting reference. |
| Error port is absent because the happy path validates. | Error port routes to retry, compacted failure notification, or explicit sink with accepted risk. |
| AI prompt includes all prior data because "more context helps." | Prompt includes only the fields needed, bounded lists, relevant excerpts, and source labels. |
| Workflow sends a final answer but nobody can tell if the external action completed. | Trigger response is followed by execution-resource reads or an explicit notification/CRM/state update that records outcome. |

## Source Links

- HumanLayer 12-factor-agents README:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/README.md>
- Natural language to tool calls:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-01-natural-language-to-tool-calls.md>
- Own prompts:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-02-own-your-prompts.md>
- Own context:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-03-own-your-context-window.md>
- Structured tool outputs:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-04-tools-are-structured-outputs.md>
- Unified execution and business state:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-05-unify-execution-state.md>
- Launch, pause, resume:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-06-launch-pause-resume.md>
- Contact humans through tools:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-07-contact-humans-with-tools.md>
- Own control flow:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-08-own-your-control-flow.md>
- Compact errors:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-09-compact-errors.md>
- Small focused agents:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-10-small-focused-agents.md>
- Trigger from anywhere:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-11-trigger-from-anywhere.md>
- Stateless reducer:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/factor-12-stateless-reducer.md>
- Pre-fetch context appendix:
  <https://github.com/humanlayer/12-factor-agents/blob/d20c728368bf9c189d6d7aab704744decb6ec0cc/content/appendix-13-pre-fetch.md>
