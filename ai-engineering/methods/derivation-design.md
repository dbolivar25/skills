# Design a work-product workflow

Use this guide for a new workflow, a major redesign, or a product idea that needs a derivation spec before implementation.

Apply the [derivation contract](../references/derivation/contract.md) for this selected complete method. Obtain relevant sources within the task's authority. Keep missing evidence and unresolved owner decisions visible; read the references before the decisions they govern. Design and assessment alone do not authorize implementation or publication.

The derivation contract owns semantic coverage. Use the [derivation spec layout](../templates/derivation-spec.md) when its tables and fields help make the design reviewable. The decisions below can be developed iteratively: a source probe or counterexample may change an earlier obligation. Keep unresolved decisions explicit instead of making the layout appear complete.

For example, a follow-up email needs exact owner/date/action commitments and recipient-specific tone. An account strategy may need conflicting stakeholder views, older objections and a supported thesis. Discover those differences before choosing a common pipeline.

## 1: Work Product Contract

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

## 2: Output Obligations

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

## 3: Judgments

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

## 4: Judgment Inputs

Before this decision, read [`raw-state-and-semantics`](../references/derivation/raw-state-and-semantics.md).

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

## 5: Dimension Discovery

Before this decision, read [information fidelity](../../writing/references/information-fidelity.md).

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

## 6: Judgment DAG

Before this decision, read [`judgment-dags-and-edges`](../references/derivation/judgment-dags-and-edges.md).

Build a DAG around judgment dependencies.

Use:

- parallel branches where raw-state retrieval or independent judgments can run separately
- fan-out where one representation supports multiple downstream consumers
- fan-in where synthesis genuinely needs multiple upstream judgments
- gates where publication needs verification, freshness, permission, relevance, or confidence
- collapse where naturally cyclic reasoning should become one joint inference node

Completion criterion: the graph explains which judgments must exist before others may run, which can run in parallel, which outputs fan out, and which nodes are gates rather than generation steps.

## 7: Node Granularity

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

## 8: Edge Contracts

Before this decision, read [`durable-state-and-promotion`](../references/derivation/durable-state-and-promotion.md).

For every material dependency or transformation edge, record the applicable parts of its contract:

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

## 9: Evidence, Support, And Confidence

Before this decision, read [claim support](../../review/references/claim-support.md).

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

For each consequential rendered claim or action, retain the support package needed by its consumer. Use the shared support method rather than requiring every example confidence axis.

Completion criterion: important rendered claims and actions are grounded in judgment sources, raw source support, relevant confidence weaknesses, contradictions, open questions, and rendering policy. Distinguish unknown values from observed negatives and unavailable evidence from evidence of absence.

## 10: Publication And Rendering

Before this decision, read [`publication-and-rendering`](../references/derivation/publication-and-rendering.md).

Separate candidate generation from publication.

Answer:

- What can be drafted speculatively?
- What can be shown as provisional?
- What must be verified before confident display?
- What must be omitted if support is insufficient?
- What must be downgraded or qualified if confidence is weak?
- What should be asserted, qualified, tentative, omitted, escalated, or demoted?

Completion criterion: publication gates have inputs, pass conditions, fail behavior, user-visible behavior, and logging or eval hooks.

## 11: Evals And Ablations

Before this decision, read [`evals-and-ablations`](../../evaluation/references/evals-and-ablations.md).

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

Completion criterion: the evaluation plan covers the actual layers and says what should get worse when a necessary dimension is removed and what should not matter if a carried dimension is unnecessary. Planned checks are not measured quality; mark absent execution evidence.

## 12: Efficiency After Faithfulness

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

Source: adapted from the corresponding contract, glossary, reference, guide or template in the personal Faithful Derivation skill.
