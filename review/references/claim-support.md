# Claim support

Establish the claims or candidate actions, purpose/audience, source content and
provenance, scope, freshness, and consequence of error. Recover accessible source
content rather than grading a pointer or summary alone.

Return a support assessment, not permission to publish or perform an action.

Use the evidence and confidence method below when those dimensions matter. Its examples specialize the method to AI work products; apply only the
confidence dimensions that govern the current claim.

1. **Pin the claim.** Separate assertions that could be independently false.
   Identify who, what, when and where each applies and the decision it informs.
   A plausible sentence is not its own evidence.
2. **Assess support.** Inspect source content, retain its provenance,
   and distinguish direct observation from inference. Examine counterevidence and alternative interpretations, not only
   confirmation; perform a scoped counterevidence search when coverage is missing and sources are accessible;
   name any remaining coverage limit.
   A pointer without content creates an evidence need; name the required span,
   scope and why it matters. Do not invent access or treat a planned query as a result.
3. **Assess each weakness.** Check evidence sufficiency, source quality and independence, scope,
   freshness, interpretation and contradiction status. Preserve the reasons;
   averaging them into one confidence score hides what the caller must decide.
4. **Return a support package.** For each claim give the supported statement,
   source pointers, relevant uncertainty, contradictions, missing evidence and
   justified assertiveness: assert, qualify, tentative, or omit. Keep supported
   components when another component remains uncertain.

For a proposed action, support for its factual premise does not establish that it is
authorized, appropriate for this recipient, or ready to execute. The caller applies its
own publication and action gates. Do not change the claim silently to make it pass:
explain any narrowed scope or qualification.

Finish when every consequential claim has evidence or an explicit gap, and a reader can
recover why its confidence and wording differ from neighboring claims.

## Evidence, support, and confidence

Use this reference when a workflow needs evidence definitions, support packages, structured confidence, uncertainty, contradictions, or source support.

### Workflow-scoped evidence

Raw state becomes evidence only relative to a question.

The same sentence in a meeting transcript may be:

- irrelevant for a follow-up email
- critical for an account risk model
- misleading for a time-sensitive output
- useful as tone evidence
- not useful without prior relationship context
- source support for a strategic claim
- dangerous to interpret without customer methodology scope

For evidence-derived work, establish:

- what counts as evidence
- what raw state should be searched
- what signals matter
- what fidelity is required
- what source support must be preserved
- what uncertainty must remain visible
- what alternative interpretations should be carried forward

### Evidence plan

For a consequential evidence-gathering or interpretation node, the following shape can
make the contract concrete. Omit fields that do not affect the decision:

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

### Claim/action support package

A support package is the hidden structure behind an important rendered claim or action. It is workflow-scoped by default.

For a consequential claim/action, retain the useful support fields:

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

The visible work product should reflect the supported judgment and its required
qualification. Preserve enough provenance for its consumer to recover the basis;
do not force every internal field into the rendered prose. These illustrative shapes
are useful when support must travel between actors or stages. A short claim may carry
the same distinctions in plain working notes rather than a formal object.

### Source independence

Several summaries or reports repeating the same underlying observation are one evidence
lineage. Trace sources to their origin before treating agreement as independent support.
Distinguish direct observation, source interpretation, model judgment, and downstream
rendering. Independence can strengthen a conclusion; source count alone cannot.

### Structured confidence

Keep the relevant confidence dimensions distinguishable. A single score can hide why
a claim should be trusted or distrusted; do not require every axis for every small claim.

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

Two claims with the same scalar confidence may have different weaknesses: weak evidence,
ambiguous scope, stale source, conflicting newer evidence, or uncertain interpretation.
The renderer needs those differences. A model's stated confidence cannot replace source
support, and inferred user fit does not supply action authority.

### Confidence controls language

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

### Contradictions and open questions

Carry contradictions and open questions forward when resolving them would change rendering, publication, or downstream judgment.

Examples:

- commitment exists but due date is ambiguous
- one stakeholder says yes while another blocks
- old account state contradicts recent meeting tone
- procurement owner appears unresolved but an email thread may resolve it
- usage trend suggests risk but customer sentiment is positive

Do not collapse uncertainty into confident prose. Either resolve it through source recovery, qualify it, omit it, or request more evidence.
