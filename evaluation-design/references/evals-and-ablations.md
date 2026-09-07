# Evals And Ablations

Use this reference when defining how the workflow proves quality and learns which dimensions matter.

## Multi-Level Evals

Final-output evals are necessary but insufficient. They judge the visible artifact but may hide whether failure came from retrieval, judgment, compression, confidence, rendering, or publication gates.

A faithful workflow needs evals at multiple levels.

## Final Output Evals

These judge whether the visible work product is good:

- user acceptance
- user edit distance
- human expert rating
- task completion
- action taken
- dismissal rate
- trust rating
- time saved
- business outcome proxy

## Judgment Evals

These judge whether internal decisions are correct:

- commitment extraction accuracy
- owner/date/action accuracy
- material change detection
- duplicate suppression
- stakeholder stance correctness
- risk classification
- tone classification
- source support correctness
- freshness classification
- scope resolution
- omission correctness

## Edge / Fidelity Evals

These judge whether a transformation preserved what downstream nodes needed:

- Did the edge preserve exact commitments?
- Did it retain source pointers for strategic claims?
- Did it collapse conflicting stakeholder views?
- Did it preserve freshness and invalidators?
- Did it drop a rare but high-consequence signal?
- Did it aggregate only after merge semantics were known?
- Did it retain enough uncertainty for rendering policy?

## Retrieval Evals

These judge whether the workflow retrieved the needed raw state:

- source recall on known important facts
- retrieval precision
- missed relevant emails
- missed relevant meeting spans
- stale-source inclusion
- permission errors
- wrong account, workspace, person, or opportunity scope
- missing prior output or user edit

## Ablation Evals

Ablations discover which dimensions matter:

- Remove prior state and measure degradation in outputs that depend on change detection.
- Remove source pointers and measure claim trust degradation.
- Remove stakeholder-level separation and measure account plan degradation.
- Remove exact commitments and measure follow-up email degradation.
- Remove tone signals and measure recipient satisfaction.
- Remove old objections and measure call plan landmine misses.
- Remove low-frequency events and check whether the only important signal disappeared.
- Remove scope resolution and check for customer-specific methodology leakage.

An ablation should name what is removed, why it should matter, expected degradation, actual degradation, and what design change follows.

## Dimension Library Evolution

Evals and ablations are how dimension definitions evolve. Use failures to:

- add dimensions
- split dimensions
- merge dimensions
- refine counter-signals
- strengthen fidelity requirements
- retire low-value dimensions
- promote reusable dimensions with contracts

Do not evolve the dimension library by intuition alone.

## Efficiency Evals

Optimize only after quality is real. When reducing cost:

- prove node merges do not hurt output quality
- prove cached state remains fresh and valid
- prove dropped dimensions are no longer live
- prove deterministic replacements preserve the judgment
- prove expensive fan-outs improve quality, risk, reuse, or cost
- prove incremental updates respect invalidators

Efficiency without faithfulness is just faster wrong output.
