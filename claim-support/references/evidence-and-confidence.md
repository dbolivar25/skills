# Evidence, Support, And Confidence

Use this reference when a workflow needs evidence definitions, support packages, structured confidence, uncertainty, contradictions, or source support.

## Workflow-Scoped Evidence

Raw state becomes evidence only relative to a question.

The same sentence in a meeting transcript may be:

- irrelevant for a follow-up email
- critical for an account risk model
- misleading for a time-sensitive output
- useful as tone evidence
- not useful without prior relationship context
- source support for a strategic claim
- dangerous to interpret without customer methodology scope

A workflow defines:

- what counts as evidence
- what raw state should be searched
- what signals matter
- what fidelity is required
- what source support must be preserved
- what uncertainty must remain visible
- what alternative interpretations should be carried forward

## Evidence Plan

For each evidence-gathering or interpretation node, specify:

```text
Purpose:
Judgment supported:
Raw state searched:
Retrieval strategy:
What counts as evidence:
What does not count:
Exact details to preserve:
Source pointers required:
Alternative interpretations:
Confidence structure:
Output representation:
Downstream consumers:
```

## Claim / Action Support Package

A support package is the hidden structure behind an important rendered claim or action. It is workflow-scoped by default.

Specify:

```text
Claim/action:
Workflow judgment source:
Evidence support:
Source pointers:
Confidence object:
Contradictions:
Open questions:
Required qualification:
Should render:
Why:
```

The visible work product should project workflow-scoped judgments, support packages, confidence, and provenance. It should not be magic prose.

## Structured Confidence

Confidence should not be a single scalar. A single score hides why a claim should be trusted or distrusted.

Use axes like:

```text
evidence_sufficiency:
  level: high | medium | low
  why:
  missing_evidence:

source_quality:
  level: high | medium | low
  sources:
  concerns:

scope_certainty:
  level: high | medium | low
  scope:
  ambiguity:

freshness:
  level: high | medium | low
  observed_at:
  stale_after:
  invalidators:

interpretation_certainty:
  level: high | medium | low
  alternative_interpretations:

contradiction_status:
  level: none_known | unresolved | resolved | conflicting
  contradictions:
  resolution:

model_confidence:
  level: high | medium | low
  notes:

user_fit:
  level: high | medium | low
  based_on:

recommended_rendering:
  assertiveness: assertive | qualified | tentative | omit
  rationale:
```

Two claims with the same scalar confidence may have different weaknesses: weak evidence, ambiguous scope, stale source, conflicting newer evidence, or uncertain interpretation. The renderer needs those differences.

## Confidence Controls Language

Example:

```text
Claim:
  Customer is hesitant about procurement timing.

confidence:
  evidence_sufficiency: medium
  source_quality: high
  scope_certainty: high
  freshness: high
  interpretation_certainty: low
  contradiction_status: none_known
  recommended_rendering:
    assertiveness: qualified
```

The renderer should not state the claim as certainty. It should use qualified language, such as "There may be some hesitation around procurement timing."

## Contradictions And Open Questions

Carry contradictions and open questions forward when resolving them would change rendering, publication, or downstream judgment.

Examples:

- commitment exists but due date is ambiguous
- one stakeholder says yes while another blocks
- old account state contradicts recent meeting tone
- procurement owner appears unresolved but an email thread may resolve it
- usage trend suggests risk but customer sentiment is positive

Do not collapse uncertainty into confident prose. Either resolve it through source recovery, qualify it, omit it, or request more evidence.
