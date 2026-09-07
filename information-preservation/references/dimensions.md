# Compression And Dimensions

Use this reference when deciding what a workflow should preserve, transform, aggregate, source-point, decay, or drop.

## Compression Principle

Compression does not mean summarizing important information. Compression means:

```text
Project the source into the dimensions required by the task,
keep those dimensions at the required fidelity,
and discard the rest from the active representation.
```

The loss should be in dimensions the workflow intentionally drops, not in dimensions it knows it needs.

## Work-Product-Specific Projection

The same raw event may need different representations for different work products.

One product may need:

- exact commitment
- owner
- due date
- recipient-specific tone
- open question
- latest decision

Another may need:

- material change
- urgency
- actionability
- freshness
- user relevance
- decay condition

Another may need:

- durable account implication
- stakeholder impact
- risk or opportunity update
- strategic trend
- source support

Another may need:

- next conversation objective
- landmines
- unresolved objections
- stakeholder stance
- questions to ask

The question is not "can we summarize this?" The question is:

```text
Which downstream judgments still need each dimension,
at what fidelity,
and has that need already been satisfied?
```

## Dimension Problem

Natural language and operational history are too high-dimensional for a complete upfront dimension list. Meetings and emails carry tone, implication, silence, sarcasm, politeness, urgency, role expectations, power dynamics, prior relationship, and speaker-specific meaning.

Do not treat dimension enumeration as a one-time ontology problem. Discover, name, define, test, reuse, promote, or retire dimensions through workflow pressure, failure analysis, and ablation.

## Universal Substrate Fields

Some fields are generally useful because they are close to neutral metadata:

- source id and type
- timestamp
- actor, recipient, participant
- account, workspace, person, opportunity, object reference
- thread or document boundary
- permission and visibility
- source pointer and raw span
- created_at and updated_at

These are retrieval and provenance hygiene. They are not enough to produce great work products.

## Reusable Domain Concept Families

Some concept families recur:

- commitments
- decisions
- open questions
- risks
- blockers
- objections
- stakeholder stances
- business initiatives
- pain points
- success criteria
- decision criteria
- competitive mentions
- budget signals
- timeline signals
- legal, security, or procurement signals
- product gaps
- usage changes
- relationship changes
- methodology signals

Treat these as concept families, not rigid universal schemas. Each consumer still needs to know meaning, derivation, fidelity, confidence, and distrust conditions.

## Work-Product-Specific Dimensions

Most important dimensions come from the work product.

Ask:

- What judgments must this output make?
- What could cause those judgments to be wrong?
- What would an expert inspect in the raw state?
- What details would change the correct output?
- What details would be dangerous to compress?
- What dimensions are rare but high consequence?
- What signals are misleading?
- What should be ignored even if present?

## Dimension Definition

A useful dimension definition includes:

```text
name:
definition:
judgment_supported:
raw_signals:
counter_signals:
scope:
required_fidelity:
source_requirement:
freshness:
known_failure_modes:
eval_or_ablation:
downstream_consumers:
reuse_status:
```

## Example Dimension: Perceived Customer Hesitation

Definition:

Evidence that a customer is not directly objecting but shows reduced confidence, delayed commitment, hedged language, non-response, or concern through tone or context.

Judgments supported:

- follow-up email tone
- call plan landmines
- account risk
- escalation in a time-sensitive output

Raw signals:

- hedged language
- delayed response
- change from prior enthusiasm
- deferral to another stakeholder
- vague next steps
- repeated "we need to think about it"

Counter-signals:

- person normally communicates indirectly
- delay caused by scheduling
- explicit positive commitment elsewhere
- cultural or role-specific politeness norms

Required fidelity:

- source pointer required
- raw wording often required
- classification alone insufficient for high-risk claims

Failure modes:

- over-reading politeness
- missing person-specific communication style
- confusing procurement process with hesitation
- ignoring prior baseline

Reuse status: candidate_reusable.

## Dimension Lifecycle

local:

- used by one workflow only

candidate_reusable:

- useful across multiple workflows but not stable enough to become shared truth

promoted:

- stable enough to become part of a shared concept library with a promotion contract

deprecated:

- ambiguous, low-value, misleading, or superseded

Build a learning library, not a brittle ontology.

## Dimension Survival Policies

exact:

- keep canonical value or verbatim span

pointer:

- keep a source handle so the exact detail can be recovered later

classified:

- keep a normalized label plus evidence

aggregate:

- keep a count, trend, score, rank, or summary statistic

decayed:

- keep only while fresh or until invalidated

dropped:

- remove from active representation because no downstream judgment needs it

## Live Dimension Rule

A dimension can be dropped from active context only when every downstream consumer either:

- does not need it
- needs only a sufficient transformed representation
- can recover the necessary detail through provenance before making a claim

A dimension is live at a point in the DAG if some downstream judgment still needs it at a fidelity not yet satisfied by an intermediate representation.

If it is live, do not drop it. If it is no longer live, carrying it forward is cost, noise, and risk.
