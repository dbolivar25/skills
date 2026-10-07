# Derivation review layout

Use this layout when a complete derivation review benefits from explicit coverage. The [derivation contract](../references/derivation/contract.md) owns semantic obligations; these sections are prompts, not a compulsory report. Lead with the supported decision and actionable findings. Combine sections, omit inapplicable fields and keep the detailed coverage private when the reader needs a short account. Keep design adequacy separate from observed fidelity and execution evidence.

## Assessment

Supported decision and reason (optional shorthand: PASS | REVISE | REPLAN):

Assessment scope and stage:

Source/output versions and observations inspected:

Evidence limits:

## Actionable findings

For each finding, identify the affected obligation, source/case, mechanism, consequence, evidence strength and smallest useful repair. Distinguish demonstrated failure, design omission and untested concern.

## Work Product

```text
Name:
User:
Job:
Use moment:
Output format:
Quality bar:
Non-goals:
```

## Output Obligations

```text
Claims:
Actions/recommendations:
Rankings/selections:
Omissions:
Tone/phrasing:
Uncertainty handling:
Support/citation:
Decay/disappearance:
```

## Judgment Coverage

```text
Obligation:
Existing judgment/node/tool/prompt:
Coverage:
Gap:
Risk:
```

## Raw-State And Scope Coverage

```text
Sources inspected:
Sources missing:
Prior state:
Old state ignored:
Scope rules:
Permissions:
Freshness:
Stale-source risks:
```

## DAG And Edge Assessment

```text
Node boundary issues:
Missing nodes:
Unnecessary nodes:
Linear-pipeline risks:
Naive map-reduce risks:
Fan-out/fan-in issues:
Joint inference needs:
Edge contracts missing:
Unsafe compression boundaries:
```

## Evidence, Support, And Confidence

```text
Unsupported claims/actions:
Missing support packages:
Source pointer gaps:
Contradictions not carried:
Open questions hidden:
Relevant confidence weaknesses and reasons:
Scalar-confidence risks:
Rendering policy gaps:
```

## Publication Gates

```text
Candidate generation:
Publication/display/send/persist gates:
Permission gates:
Freshness gates:
Duplicate gates:
Scope gates:
Confidence gates:
Contradiction gates:
Decay behavior:
Fail behavior:
```

## Quality evidence

Select the layers the system contains. Keep proposed, executed and independently judged checks distinguishable.

```text
Final-output evals:
Judgment evals:
Edge/fidelity evals:
Retrieval evals:
Ablation evals:
Regression examples:
Human review rubric:
```

## Anti-Patterns Observed

```text
Summary soup:
Schema worship:
Universal semantic layer:
Fixed pipeline thinking:
Unsupported fluency:
Premature aggregation:
Scalar confidence:
Final-only evals:
Expensive ceremony:
Generic context retrieval:
```

## Recommended Moves

```text
Must fix before implementation/publication:
Should fix:
Can defer:
Open decisions:
Suggested next derivation step:
```

Source: adapted from the corresponding contract, glossary, reference, guide or template in the personal Faithful Derivation skill.
