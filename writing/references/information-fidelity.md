# Information fidelity

Read this method before consequential compression, summarization, handoff, transformation or intermediate-representation design. It defines the source details consumers need, permissible loss and reliable recovery. For a small prose edit, the protected meaning checks in the entrypoint may be sufficient.

## Work backward from consumer judgment

Identify the consumer, the decision or action it must make, the relevant source and scope, and the consequences of losing information. Include rare decisive signals, disagreement, uncertainty, argument dependencies and historical context that changes interpretation. Do not replace the consumer's purpose with a generic idea of important information. If its need is unknown, expose that missing decision rather than claiming a universally useful summary.

Ask what source detail could change the correct downstream judgment. Preserve names, numbers, dates, quoted language, citation/link targets, conditions, exclusions, exact commitments and degrees of certainty when the judgment depends on them. Preserve distinct actors and stakeholder views instead of averaging conflict into agreement. Keep event time, observation time, scope and authority where they change meaning. A technically accurate sentence can still lose the condition that made the claim true.

For an instruction or handoff, preserve the trigger, demanded behavior, method, exact exclusions, stopping conditions, ownership, unresolved decisions and context pointers. For an argument, preserve premises, causal dependencies, counterevidence and the qualification under which the conclusion holds. For a derived work product, preserve dimensions until all downstream consumers have received the fidelity they require.

## Choose fidelity and permitted loss

For each live dimension, choose what must remain exact, what can be transformed and what may be recovered later. The survival policies and definition method below make those choices precise. Aggregate only when known merge semantics preserve the consumer's distinctions. Classification is sufficient only when the normalized label and evidence support the required decision. A label such as "risk" cannot replace exact owners or dates that an action needs.

A source pointer is sufficient only when the consumer can recover the required detail before claiming or acting. Check source identity, span or version, permissions, continued availability, retrieval reliability, cost/time and invalidation. A link to an inaccessible or changing document is not guaranteed recoverability. Keep the necessary excerpt or exact value when later recovery cannot meet the contract. Preserve source broadly within its retention and privacy rules; removing material from active context does not itself authorize deleting evidence.

Allow loss only in dimensions the consumer intentionally does not need, or when a sufficient transformed representation or usable recovery path satisfies that need. Carry uncertainty, contradictions and open questions at the strength the consumer needs. Do not silently make an unknown false, an ambiguous date exact, a tentative interpretation a fact, or a settled owner decision provisional.

## Compare the source and representation

A design can specify a preservation contract before any output exists. An actual fidelity claim requires the source and candidate representation. Obtain available content within task authority, identify its version and compare it against the consumer's requirements. Missing content creates a precise evidence limit naming the consumer and dimension that cannot be checked.

Probe plausible counterexamples: conflicting stakeholders, ambiguous dates, changed account or time scope, stale facts, low-frequency decisive signals, a removed premise, a quotation paraphrased as stronger agreement, and a source that cannot be recovered. If the proposed compression loses a live dimension, retain it or change the representation. Do not repair loss by inventing supporting detail.

Use a compact working mapping when useful:

```text
consumer / judgment:
dimension / source basis:
required fidelity:
representation / transformation:
recovery path and access:
invalidators / freshness:
allowed loss / forbidden loss:
check and observed result:
```

Keep unresolved consumer requirements visible. Disclose an omission when it changes what the downstream reader can conclude, while allowing ordinary low-impact edits to finish without a mandatory loss ledger. A shorter or tidier representation is not evidence of sufficient fidelity.

## A preservation example

Source: “Maya can send the draft Friday if legal approves; Omar still objects to the pricing.”

A representation saying “The team agreed to send Friday” loses the condition, turns capability into commitment and merges disagreement into agreement. For a follow-up action, retain Maya, the draft, the quoted date expression, the approval dependency, Omar's objection and their source span. Resolve “Friday” only with the event's actual time context. If approval is unknown, keep it unknown.

An account strategy may classify the unresolved approval as a blocker while retaining Omar's separate stance and a recoverable source. A count of open tasks could omit the exact wording only if its counting rule correctly handles conditional actions and no later consumer needs more. The same source admits different valid projections; sufficient fidelity comes from the consumer contract and actual comparison, not from having a tidy schema.

## Dimensions and survival

The following method and examples retain the distinction between neutral retrieval metadata and purpose-specific semantics.

### Compression Principle

Compression does not mean summarizing important information. Compression means:

```text
Project the source into the dimensions required by the task,
keep those dimensions at the required fidelity,
and discard the rest from the active representation.
```

The loss should be in dimensions the workflow intentionally drops, not in dimensions it knows it needs.

### Work-Product-Specific Projection

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

### Dimension Problem

Natural language and operational history are too high-dimensional for a complete upfront dimension list. Meetings and emails carry tone, implication, silence, sarcasm, politeness, urgency, role expectations, power dynamics, prior relationship, and speaker-specific meaning.

Do not treat dimension enumeration as a one-time ontology problem. Discover, name, define, test, reuse, promote, or retire dimensions through workflow pressure, failure analysis, and ablation.

### Universal Substrate Fields

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

### Reusable Domain Concept Families

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

### Work-Product-Specific Dimensions

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

### Dimension Definition

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

### Example Dimension: Perceived Customer Hesitation

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

### Dimension Lifecycle

local:

- used by one workflow only

candidate_reusable:

- useful across multiple workflows but not stable enough to become shared truth

promoted:

- stable enough to become part of a shared concept library with a promotion contract

deprecated:

- ambiguous, low-value, misleading, or superseded

Build a learning library, not a brittle ontology.

### Dimension Survival Policies

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

### Live Dimension Rule

A dimension can be dropped from active context only when every downstream consumer either:

- does not need it
- needs only a sufficient transformed representation
- can recover the necessary detail through provenance before making a claim

A dimension is live at a point in the DAG if some downstream judgment still needs it at a fidelity not yet satisfied by an intermediate representation.

If it is live, do not drop it. If it is no longer live, carrying it forward is cost, noise, and risk.

Source: adapted from the personal Information Preservation skill and its full Compression and Dimensions reference.
