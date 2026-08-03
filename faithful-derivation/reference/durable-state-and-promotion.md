# Durable State And Promotion

Use this reference when deciding whether a derived observation, classification, claim, or intermediate representation should persist or become reusable.

## Safe Durable State Categories

1. Neutral substrate state

- raw sources
- metadata
- indices
- permissions
- provenance
- object links
- timestamps and actors

2. Workflow-specific durable state

- state maintained for a known work product with defined purpose, scope, and consumers
- meaning is defined by that workflow's purpose and consumers

3. Promoted reusable judgment state

- a derived representation proven reusable across workflows
- contract explicitly defines meaning, scope, fidelity, invalidators, confidence, consumers, failure modes, and owner

## Dangerous Durable State

Generic semantic state extracted because it seems generally useful is dangerous. It creates silent compression and false confidence.

Examples:

- global "risk" objects without consumer-specific meaning
- global "objection" objects without source fidelity and scope
- global "tone" labels without relationship baseline
- global "commitment" facts without owner/date/action confidence and invalidators
- generic account summaries treated as reusable inputs to unrelated work products

## Promotion Contract

A derived observation, claim, classification, or state object may become reusable durable state only if it has:

meaning:

- what exactly the representation means

scope:

- where it is valid: account, workspace, opportunity, person, customer, time range, methodology, or workflow

source:

- raw evidence and source pointers that support it

fidelity:

- what was preserved exactly, classified, aggregated, decayed, or dropped

consumers:

- which workflows may consume it

invalidators:

- future evidence that would make it stale or wrong

recompute_policy:

- when it should update

confidence:

- structured confidence axes and current values

failure_modes:

- when consumers should distrust it

owner:

- who maintains the concept contract

Without this contract, a derived representation is not general-purpose truth.

## Persistence Rule

Persist raw state by default.

Persist semantic state only with declared purpose, fidelity contract, invalidation policy, confidence structure, known consumers, and maintenance owner.

## Workflow-Specific Durable State

Workflow-specific durable state is acceptable when it serves a known work product and retains its scope.

Examples:

- prior-state baseline used for delta detection
- durable stakeholder map with source support and invalidators
- communication correction history used to improve tone or commitment extraction
- renewal-risk readout state with decay policy and contradiction checks

Do not let workflow-specific state leak into unrelated workflows unless promoted.

## Candidate Reuse

When a concept appears useful across workflows, mark it candidate_reusable before promotion. Candidate reuse means:

- the concept family appears across multiple workflows
- consumers are known or hypothesized
- differences in loss function are still under review
- confidence, fidelity, and invalidators are not yet stable enough for general use

Promotion happens after evaluation, consumer review, and contract stabilization.
