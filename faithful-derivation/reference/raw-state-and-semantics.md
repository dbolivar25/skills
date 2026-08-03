# Raw State And Semantics

Use this reference whenever a workflow design needs to distinguish raw evidence, retrieval infrastructure, workflow-derived interpretation, and reusable state.

## Raw State Is Canonical

Raw state is the source material the workflow reasons from:

- meeting transcripts and recordings
- emails and email threads
- documents
- CRM changes
- tasks
- Slack or message activity
- product usage events
- customer-provided artifacts
- prior generated outputs
- user edits and corrections
- notes and operational history

Compression does not mean deleting raw evidence. It means dropping information from the active representation when the current workflow no longer needs it. Preserve raw state broadly unless a separate retention, permission, privacy, or product policy says otherwise.

## Neutral Retrieval Substrate

Shared retrieval infrastructure is allowed and useful when it stays close to neutral metadata:

- source id
- source type
- timestamp
- actor, sender, recipient, participant
- thread or document boundary
- account, workspace, person, opportunity, object references
- permission and visibility rules
- lexical and embedding indices
- source spans
- raw text pointers
- created_at and updated_at
- prior output links

This substrate helps workflows find raw state. It is not the work product's semantic understanding.

## Workflow-Derived Semantics

Workflow-derived semantics are interpretations made for a purpose:

- this was a customer objection
- this commitment is still open
- this tone suggests hesitation
- this change is material for a time-sensitive output
- this stakeholder is blocking progress
- this fact should update the account plan
- this claim is supported enough to publish

These are judgments, not neutral facts by default. Their meaning depends on work product, user, scope, customer, timing, downstream action, and loss function.

## No Universal Semantic Layer

Do not build or consume a purpose-blind semantic evidence layer as if it were general truth. A commitment, objection, risk, tone signal, buying signal, or methodology signal may be reusable, but only after its contract is explicit.

The safe split:

- Raw state is canonical.
- Neutral retrieval substrate can be shared.
- Semantic observations are workflow-scoped by default.
- Derived representations become reusable only through a promotion contract.

## What This Rules Out

Avoid these substitutions:

- "summarize the last N meetings and generate a doc"
- "load all structured data into context and ask the model to make it good"
- "precompute useful semantic facts without knowing their consumers"
- "force all work products through one layer stack"

The shared discipline can be uniform. The derivation shapes should be bespoke.

## Workflow-Derived Observation Shape

A workflow-derived observation should carry enough context to remain honest:

```text
workflow:
judgment_supported:
source_pointer:
raw_span_or_recoverable_handle:
interpreted_value:
scope:
confidence:
uncertainty:
alternative_interpretations:
downstream_consumers:
```

The exact schema can vary. The invariant is that the observation's semantics are scoped to the workflow and judgment that produced it.
