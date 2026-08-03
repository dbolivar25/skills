# Anti-Patterns

Use this reference during workflow review and before implementation.

## Summary Soup

```text
raw state -> summary -> summary of summaries -> generated artifact
```

This destroys information before the workflow knows what matters. General summaries have no task-specific loss function and can drop rare, high-consequence details such as CFO objections, legal blockers, procurement deadlines, changed stakeholder stances, customer-specific methodology, subtle tone shifts, or exact commitments.

## Schema Worship

Believing structured data solves the problem by itself.

Structured irrelevant data is still irrelevant. Structured lossy data is still lossy. Structured context without a work-product loss function can overwhelm or mislead the model while creating the illusion of precision.

## Universal Semantic Layer

Precomputing "useful" semantic observations without knowing which workflow they serve.

This turns interpretations into false neutral facts and creates silent compression. A workflow may consume reusable semantic state only when the representation has a promotion contract.

## Fixed Pipeline Thinking

Forcing every work product through the same stages because it feels architecturally clean.

Different work products need different derivation shapes. A short exact output, a long-lived strategic output, a prospective preparation output, a win plan, a renewal risk output, and a time-sensitive feed item do not need the same workflow.

## Unsupported Fluency

Judging outputs by whether they sound right instead of whether their claims survive evidence checks.

Fluency is table stakes. The work product must be grounded in raw state, shaped by the right context, and optimized for the user's job.

## Premature Aggregation

Collapsing distinctions before downstream judgments are done needing them:

- per-person stakeholder stance
- exact commitments
- source-specific objections
- workspace-specific methodology
- owner/date/action values
- tone or hesitation signals
- prior baseline and current delta

Aggregation is safe only when merge semantics are known and downstream fidelity needs are satisfied.

## Scalar Confidence

Representing trust as one number when the real issue may be evidence sufficiency, source quality, freshness, scope ambiguity, contradiction, interpretation uncertainty, model confidence, or user fit.

Scalar confidence cannot tell the renderer whether to assert, qualify, tentatively phrase, omit, escalate, or demote.

## Evals Only At The Final Artifact

Final-output evals are necessary but insufficient. Node-level, edge-level, retrieval-level, and ablation evals are needed to locate where faithfulness was gained or lost.

## Expensive Ceremony

Adding map-reduce, agents, caches, layers, or durable state that does not improve output quality, reduce risk, improve reuse, or lower cost without quality loss.

Architecture earns its place by protecting a judgment, fidelity boundary, support path, gate, eval, parallelism, reuse contract, or efficiency after quality is real.

## Generic Context Retrieval

Retrieving a large pile of context and asking the model to make something good.

The workflow should know what kind of work product it is producing, what judgments it requires, what raw state those judgments depend on, what details must survive exactly, what can be inferred, what must stay source-recoverable, and what should be dropped.
