# Design A New Work-Product Workflow

Use this guide for a new workflow, a major redesign, or a product idea that needs a derivation spec before implementation.

Required references:

- [`../reference/raw-state-and-semantics.md`](../reference/raw-state-and-semantics.md)
- [`../reference/compression-and-dimensions.md`](../reference/compression-and-dimensions.md)
- [`../reference/judgment-dags-and-edges.md`](../reference/judgment-dags-and-edges.md)
- [`../reference/evidence-support-and-confidence.md`](../reference/evidence-support-and-confidence.md)
- [`../reference/publication-and-rendering.md`](../reference/publication-and-rendering.md)
- [`../reference/evals-and-ablations.md`](../reference/evals-and-ablations.md)
- [`../reference/durable-state-and-promotion.md`](../reference/durable-state-and-promotion.md)
- [`../templates/derivation-spec.md`](../templates/derivation-spec.md)

## Step 1: Work Product Contract

Start with the user-visible thing.

Answer:

- What is the work product?
- Who is it for?
- When is it used?
- What job does it do?
- What decision, action, communication, prioritization, or understanding does it support?
- What would make it unusually valuable?
- What does great look like?
- What does unacceptable look like?
- What is explicitly out of scope?

Completion criterion: the work product is not named as a generic summary or workflow stage. It is named by the job it performs for a user.

## Step 2: Output Obligations

Break the work product into the things it must get right:

- claims it makes
- actions it recommends or drafts
- rankings or selections it performs
- omissions it must honor
- tone choices it makes
- uncertainty it must qualify
- source support it must preserve
- decay or disappearance behavior it needs

Completion criterion: each obligation is concrete enough that a reviewer can tell when the work product violates it.

## Step 3: Judgments

Convert obligations into named judgments.

For each judgment, record:

- question answered
- obligation supported
- why it matters
- risk level
- subjective or objective character
- whether it gates publication
- downstream consumers

Completion criterion: every obligation has at least one judgment, and every high-risk judgment is visible as its own judgment or explicitly folded into a joint inference node.

## Step 4: Judgment Inputs

Discover inputs from the judgment, not from a master schema.

For each major judgment, ask:

- What raw state would an expert inspect?
- What prior state matters?
- What old state should be ignored?
- What scope must be resolved first?
- What exact values are required?
- What source pointers are required?
- What can be classified?
- What can be aggregated?
- What can be inferred?
- What should never be inferred?
- What uncertainty must be preserved?
- What signals would mislead the model?
- What false positives would be subtle but costly?

Completion criterion: every high-risk judgment names raw signals, counter-signals, required fidelity, uncertainty, and false positives.

## Step 5: Dimension Discovery

Name a dimension only when it can change a judgment.

For each discovered dimension, define:

- name
- definition
- judgment supported
- raw indicators
- counter-indicators
- scope
- required fidelity
- source requirement
- freshness
- known failure modes
- eval or ablation
- downstream consumers
- reuse status: local, candidate_reusable, promoted, or deprecated

Completion criterion: dimensions are not copied from a generic list. Each dimension exists because missing, compressing, aggregating, or misrepresenting it could change the work product.

## Step 6: Judgment DAG

Build a DAG around judgment dependencies.

Use:

- parallel branches where raw-state retrieval or independent judgments can run separately
- fan-out where one representation supports multiple downstream consumers
- fan-in where synthesis genuinely needs multiple upstream judgments
- gates where publication needs verification, freshness, permission, relevance, or confidence
- collapse where naturally cyclic reasoning should become one joint inference node

Completion criterion: the graph explains which judgments must exist before others may run, which can run in parallel, which outputs fan out, and which nodes are gates rather than generation steps.

## Step 7: Node Granularity

Split nodes when:

- two judgments have different dependencies
- two judgments have different failure modes
- two judgments need different retrieval scopes
- one judgment gates another
- one judgment requires exact evidence while another needs only classification
- one output feeds multiple downstream consumers
- one step needs separate evaluation
- one step needs separate confidence or publication policy

Merge nodes when:

- they use the same inputs
- they have the same loss function
- they produce no reusable intermediate
- they have no distinct eval
- they protect no fidelity boundary
- separation is only architectural ceremony

Completion criterion: node boundaries protect faithfulness, evaluation, reuse, parallelism, policy, or efficiency; they are not justified by agent count.

## Step 8: Edge Contracts

For every edge, record:

- edge type
- dimensions carried
- dimensions transformed
- dimensions dropped
- exact fields
- pointer fields
- classified fields
- aggregate fields
- uncertainty
- confidence
- freshness
- invalidators
- why the compression is safe

Completion criterion: after every transformation, downstream nodes can still make every required judgment. If not, the compression is invalid or premature.

## Step 9: Evidence, Support, And Confidence

Define evidence relative to the question.

For each evidence-gathering or interpretation node, record:

- purpose
- judgment supported
- raw state searched
- retrieval strategy
- what counts as evidence
- what does not count
- exact details to preserve
- source pointers required
- alternative interpretations
- confidence structure
- output representation
- downstream consumers

For each rendered claim or action, define a support package.

Completion criterion: important rendered claims and actions are grounded in judgment sources, raw source support, structured confidence, contradictions, open questions, and rendering policy.

## Step 10: Publication And Rendering

Separate candidate generation from publication.

Answer:

- What can be drafted speculatively?
- What can be shown as provisional?
- What must be verified before confident display?
- What must be omitted if support is insufficient?
- What must be downgraded or qualified if confidence is weak?
- What should be asserted, qualified, tentative, omitted, escalated, or demoted?

Completion criterion: publication gates have inputs, pass conditions, fail behavior, user-visible behavior, and logging or eval hooks.

## Step 11: Evals And Ablations

Define evals at multiple levels:

- final output
- judgment
- edge / fidelity
- retrieval
- ablation

Use ablations to test dimensions:

- remove exact commitments
- remove source pointers
- remove prior state
- remove stakeholder separation
- remove tone evidence
- remove low-frequency events
- remove scope resolution

Completion criterion: the spec says what should get worse when a necessary dimension is removed and what should not matter if a carried dimension is unnecessary.

## Step 12: Efficiency After Faithfulness

Discuss efficiency only after the quality path is coherent.

Ask:

- Which nodes can be merged?
- Which dimensions are carried too long?
- Which outputs can be cached?
- Which nodes can run incrementally?
- Which expensive fan-outs do not improve quality?
- Which nodes compensate for earlier bad representations?
- Which gates can become deterministic?
- Which derived states are worth persisting?
- Which derived states should remain ephemeral?

Completion criterion: optimization does not erase fidelity, support, confidence, gates, evals, or raw-state recoverability.
