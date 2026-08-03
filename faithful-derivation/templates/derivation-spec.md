# Derivation Spec Template

Use this template for a new work-product workflow or major redesign. Fill only sections that are needed for the current stage, but do not skip a section because it is hard; mark unknowns explicitly.

## 1. Work Product Contract

Name:

User:

Job to be done:

When used:

Output format:

Quality bar:

What unusually good means:

Unacceptable failures:

Non-goals:

## 2. Raw State Scope

Candidate raw sources:

```text
meetings:
transcripts:
emails:
email threads:
documents:
CRM:
tasks:
Slack/messages:
product usage:
prior outputs:
user edits:
customer artifacts:
notes:
```

Windowing policy:

```text
time window:
event window:
account/workspace/person/opportunity scope:
recency requirements:
durable history required:
old state to ignore:
```

Neutral retrieval handles:

```text
source ids:
timestamps:
actors/participants:
object links:
permissions:
embeddings/lexical search:
source spans/raw pointers:
prior output links:
```

## 3. Output Obligations

The output must correctly:

```text
claim:
recommend:
rank:
select:
omit:
phrase:
qualify uncertainty:
cite/support:
decay/disappear:
avoid:
```

## 4. Failure Modes

Catastrophic:

```text
wrong owner/date/action:
unsupported claim:
stale signal:
scope contamination:
permission leak:
tone mismatch:
missed critical signal:
duplicate/noisy output:
overconfident inference:
unsafe send/publish:
```

Subtle:

```text
misses hesitation:
overreads politeness:
collapses conflicting stakeholders:
treats old state as new:
ignores who said the thing:
ignores relationship context:
misses customer-specific methodology:
confuses silence with agreement:
collapses exact wording too early:
```

## 5. Judgment Inventory

For each judgment:

```text
Judgment name:
Question answered:
Why this judgment matters:
Output obligation supported:
Risk level:
Subjective/objective:
Raw signals an expert would inspect:
Misleading signals / false positives:
Required inputs:
Required prior state:
Required scope:
Required fidelity:
Allowed uncertainty:
Downstream consumers:
Can run without:
Cannot run without:
Publication gate: yes/no
Eval:
```

## 6. Workflow-Scoped Evidence Plan

For each evidence-gathering or interpretation node:

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

## 7. Derived Dimensions

Only include dimensions discovered as necessary.

For each dimension:

```text
Name:
Definition:
Judgment supported:
Raw indicators:
Counter-indicators:
Scope:
Fidelity:
  exact:
  pointer:
  classified:
  aggregate:
  decayed:
  dropped after:
Source requirement:
Freshness:
Known failure modes:
Eval / ablation:
Downstream consumers:
Reuse potential:
  local | candidate_reusable | promoted | deprecated
```

## 8. Judgment DAG

Nodes:

```text
name:
purpose:
consumes:
produces:
model/tool/function:
cost:
freshness:
eval:
```

Edges:

```text
from:
to:
type:
  hard_requires | soft_improves | verifies | invalidates | scopes | fidelity_gate | policy_gate
dimensions carried:
dimensions transformed:
dimensions dropped:
why safe:
```

Graph notes:

```text
Fan-out points:
Fan-in points:
Parallelizable nodes:
Agentic joint-inference nodes:
Publication gates:
Invalidators:
```

## 9. Intermediate Representation Contracts

For each intermediate output:

```text
Name:
Produced by:
Consumed by:
Meaning:
Scope:
Source support:
Exact fields:
Pointer fields:
Classified fields:
Aggregate fields:
Uncertainty:
Confidence:
Invalidators:
Recompute policy:
Allowed consumers:
Promotion status:
  ephemeral | workflow_durable | candidate_reusable | promoted
```

## 10. Claim / Action Support

For each rendered claim or action:

```text
Claim/action:
Workflow judgment source:
Evidence support:
Source pointers:
Confidence object:
Contradictions:
Open questions:
Required qualification:
Should render: yes/no
Why:
```

## 11. Structured Confidence

For each major judgment:

```text
evidence_sufficiency:
source_quality:
scope_certainty:
freshness:
interpretation_certainty:
contradiction_status:
model_confidence:
user_fit:
missing_information:
recommended_rendering_confidence:
  assertive | qualified | tentative | omit
```

## 12. Publication Gates

For each gate:

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

## 13. Evals

```text
Golden examples:
Bad examples:
Ablations that should hurt:
Ablations that should not matter:
Node-level evals:
Judgment evals:
Edge/fidelity evals:
Retrieval evals:
Final-output evals:
User feedback signals:
Regression cases:
Human review rubric:
```

## 14. Efficiency Pass

After quality is proven:

```text
Nodes to merge:
Nodes to cache:
Expensive retrievals to reduce:
Dimensions carried too long:
Intermediate state worth persisting:
Intermediate state not worth persisting:
Deterministic replacements:
Incremental update opportunities:
```

## 15. Open Questions

```text
Question:
Why it matters:
Owner:
Blocks:
Temporary assumption:
How to resolve:
```
