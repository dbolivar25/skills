# Publication And Rendering

Use this reference when deciding what can be generated, shown provisionally, confidently published, qualified, downgraded, omitted, sent, persisted, or acted on.

## Rendering Is A Judgment

The workflow must decide not only what is true, but how it should be said.

A rendered claim can be:

asserted:

- "Procurement has not assigned an owner."

qualified:

- "Procurement ownership appears unresolved."

tentative:

- "There may be some hesitation around procurement timing."

omitted:

- do not render because evidence is insufficient, stale, irrelevant, unsafe, contradicted, or out of scope

escalated:

- show as a high-priority risk or action

demoted:

- show as background context only

Rendering policy should depend on:

- evidence sufficiency
- source quality
- scope certainty
- freshness
- interpretation certainty
- contradictions
- user relevance
- work-product risk tolerance

This is how the workflow avoids unsupported fluency.

## Generation And Publication Are Different

A workflow may produce a candidate output before every check is complete. It should not publish, recommend, send, persist, or confidently present the output until required gates pass.

Common publication gates:

- evidence support
- freshness
- non-duplication
- permission and visibility
- scope correctness
- confidence threshold
- contradiction handling
- user relevance
- staleness and decay
- source recoverability
- policy compliance

This distinction allows speculative execution without compromising trust.

## Candidate And Published States

Example:

```text
candidate_account_risk:
  can be generated from partial evidence

published_account_risk:
  requires source support, scope certainty, freshness, and contradiction check
```

Example:

```text
candidate_pulse_item:
  can be generated after material-change detection

shown_pulse_item:
  requires user relevance, freshness, permissions, duplicate suppression,
  evidence support, and decay behavior
```

## Gate Definition

For each gate, define:

```text
Gate:
Required for:
Inputs checked:
Pass condition:
Fail behavior:
  block | downgrade | qualify | omit | request_more_evidence
User-visible behavior:
Logging / eval:
```

## Decay And Disappearance

Some work products are time-sensitive. Readouts, risks, reminders, and recommendations may need to disappear, downgrade, or change when:

- the signal is no longer fresh
- an invalidating event occurs
- a duplicate or stronger item exists
- the user has acted
- the claim is contradicted
- the source is no longer visible
- the account, opportunity, person, or workflow scope changes

Define decay as part of the output obligation, not as cleanup after rendering.

## Source-Recoverable Rendering

If a rendered claim may be challenged, it needs source support or a source-recoverable path. The renderer can omit source details from the visible text, but the workflow should retain enough support for verification, audit, user trust, or correction.
