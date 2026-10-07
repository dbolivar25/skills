# Derivation spec layout

Use this layout when a new work-product workflow or major redesign benefits from a structured spec. The [derivation contract](../references/derivation/contract.md) owns semantic coverage. These sections and field lists are prompts, not a required fifteen-section artifact. Combine related sections, omit inapplicable fields and use prose or an annotated graph when clearer. Mark a missing required judgment or evidence path explicitly; difficulty does not make it inapplicable.

Keep design choices, hypotheses, existing behavior and observed results distinguishable. A source list is not proof of retrieval coverage; an eval list is not proof of quality.

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

Consequential (classify against this product's actual stakes):

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
No-match / unknown / negative / failure meaning:
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
Durability:
  ephemeral | persisted
State category if persisted:
  neutral_substrate | workflow_specific | promoted_reusable
Semantic reuse status:
  local | candidate_reusable | promoted | deprecated
```

## 10. Claim / Action Support

For each consequential rendered claim or action:

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

## 11. Structured confidence

Use [claim support](../../review/references/claim-support.md) for the confidence method. The axes below are illustrative. Carry only the weaknesses that can change consumer behavior, preserving their reasons:

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

## 13. Evaluation

Use [evaluation](../../evaluation/references/evals-and-ablations.md) for case/oracle/comparison design. Select the layers present in the system and distinguish proposed checks from executed results.

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
Case/source versions and decision-time boundary:
Independent oracle and uncertainty:
Baseline/candidate identity:
Planned checks versus executed observations:
```

## 14. Efficiency Pass

After the quality path is coherent, identify optimizations and the observations needed to establish that they preserve quality:

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
