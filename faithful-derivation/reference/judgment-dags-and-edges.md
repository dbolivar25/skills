# Judgment DAGs And Edges

Use this reference when designing workflow graph shape, node boundaries, dependency types, fan-out, fan-in, gates, or joint inference nodes.

## Judgment Dependency Planning

Build the DAG around judgment dependencies, not arbitrary workflow steps.

A topological sort should answer:

- Which judgments must exist before other judgments can run faithfully?
- Which outputs can fan out to multiple downstream judgments?
- Which judgments can run in parallel?
- Which judgments are publication gates rather than generation steps?
- Which expensive computations actually improve quality?
- Which intermediate representations satisfy multiple consumers?

The graph is the design artifact. The topological sort is only one valid execution order.

## Derivation DAG

Nodes represent:

- raw-state retrieval or resolution
- scope resolution
- judgment-producing transformations
- intermediate representations
- verification gates
- policy gates
- rendered outputs
- invalidation or freshness behavior

Edges represent:

- dependencies between judgments
- raw-state or prior-state requirements
- transformations across compression boundaries
- verification requirements
- invalidators
- scope constraints
- fidelity gates
- policy gates

## Edge Types

hard_requires:

- downstream node cannot run faithfully without this input

soft_improves:

- downstream node can run, but output should be provisional, lower confidence, or less complete

verifies:

- downstream node may draft first, but cannot publish confidently before this check

invalidates:

- upstream change requires downstream recompute, downgrade, expiration, or stale marking

scopes:

- downstream interpretation is unsafe until account, workspace, person, opportunity, methodology, or time scope is resolved

fidelity_gate:

- downstream node cannot aggregate, classify, render, or drop a dimension until required exactness or source-recoverability is preserved

policy_gate:

- downstream output cannot be shown unless permission, confidence, relevance, freshness, privacy, or other policy passes

## Speculative Execution

Not everything should wait. Candidate generation may run before every verifier if publication remains gated.

Example:

- `draft_follow_up_email` may run after recent meeting context, commitments, decisions, open questions, and tone are available.
- `publish_follow_up_email` should wait on owner/date/action verification, recipient validation, and source support.

Example:

- `candidate_pulse_item` may run after material-change detection.
- `show_pulse_item_to_user` should wait on user relevance, freshness, permission, duplicate suppression, and evidence support.

## Using The DAG Constraint Well

Use the DAG to avoid two extremes:

- naive map-reduce over generic summaries
- rigid linear workflows that force unrelated judgments through one sequence

Prefer:

parallel:

- raw-state retrieval or independent judgments run separately

fan-out:

- one intermediate representation serves multiple downstream consumers

fan-in:

- synthesis genuinely requires multiple upstream judgments

gate:

- publication requires verification, freshness, permission, relevance, or confidence

collapse:

- naturally cyclic reasoning becomes one joint inference component

## Joint Inference Nodes

If reasoning is naturally cyclic but the workflow engine requires a DAG, collapse it into a joint inference node.

Example joint node:

```text
joint_opportunity_strategy_inference:
  inputs:
    stakeholder signals
    business pain
    decision process
    product fit
    risks
    blockers
    competition
    recent changes
    prior account context
  outputs:
    opportunity thesis
    prioritized risks
    stakeholder strategy
    recommended next actions
    confidence structure
    source support
```

Internal reasoning may be iterative or agentic. The workflow-level graph remains acyclic.

## Naive Map-Reduce Failure

Bad:

```text
Map: summarize each meeting
Reduce: summarize the summaries
Render: generate final work product
```

The mapper does not know the downstream loss function and may discard rare, high-consequence details. The reducer then reasons over already-damaged representations.

Good map-reduce is purpose-conditioned and dimension-aware:

- retrieve and inspect raw state under a work-product-specific purpose
- extract workflow-scoped observations required by target judgments
- reduce by stakeholder when per-person stance, objections, commitments, influence, and source pointers survive
- reduce by opportunity when decision criteria, blockers, next steps, and buying process survive
- reduce by time when deltas, freshness, stale facts, and unresolved changes survive
- reduce by work-product lens when only dimensions needed for this output survive
- render from supported judgments and source-recoverable claims

Rule:

```text
Only reduce across dimensions whose merge semantics are known
and whose downstream fidelity requirements are satisfied.
```

If a reduce step does not improve output quality, reduce risk, improve reuse, or lower cost without quality loss, it is ceremony.

## Linear Workflow Failure

Linear workflows force every judgment to wait on the previous step and force downstream consumers to inherit one representation.

Better structures allow:

- one raw-state retrieval to feed multiple interpretation nodes
- one scope resolver to protect many downstream judgments
- one material-change detector to feed time-sensitive outputs and durable account state
- one stakeholder model to feed account plan, call plan, and risk readout
- one source verifier to gate multiple rendered claims
- one confidence structure to control rendering assertiveness

Use the DAG to represent real dependencies, not arbitrary sequence.

## Node Granularity

Split nodes when:

- two judgments have different dependencies
- two judgments have different failure modes
- two judgments need different retrieval scopes
- one judgment gates another
- one judgment requires exact evidence while another only needs classification
- one output feeds multiple downstream consumers
- one step needs separate evaluation
- one step needs separate confidence or publication policy

Merge nodes when:

- they use the same inputs
- they have the same loss function
- they produce no reusable intermediate
- they have no distinct eval
- they do not protect a fidelity boundary
- separation is only architectural ceremony

The question is not how many agents to use. The question is which boundaries protect faithfulness, evaluation, reuse, parallelism, policy, or efficiency.
