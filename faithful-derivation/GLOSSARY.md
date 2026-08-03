# Glossary

This glossary is the shared vocabulary for faithful derivation. Use these terms when designing, reviewing, interviewing for, or implementing work-product workflows.

## Work Product

The user-visible artifact, feed item, plan, recommendation, email, summary, strategy, or action that creates value. It is valuable because it helps a user act, decide, communicate, prioritize, or understand better than they otherwise could. The workflow is valuable only insofar as it derives this product faithfully.

## Purpose-Conditioned Reducer

A workflow that projects a high-dimensional stream of raw state into the smallest active representation sufficient for a specific work product's quality function. It is lossy over irrelevant dimensions and exact or source-recoverable over dimensions that affect downstream judgment.

## Raw State

Canonical source material: transcripts, recordings, emails, email threads, documents, CRM changes, tasks, Slack messages, product usage events, notes, customer artifacts, prior generated outputs, user edits, and corrections. Raw state should usually be preserved globally even when dropped from the active representation.

## Neutral Retrieval Substrate

Shared infrastructure that helps workflows find and access raw state without pretending to be semantic understanding: source ids, timestamps, actors, participants, thread boundaries, document structure, object references, workspace/account/person/opportunity links, permissions, lexical indices, embedding indices, source spans, and raw text pointers.

## Workflow-Scoped Semantics

Interpretations produced inside a workflow for a specific purpose. A commitment, objection, tone signal, risk, buying signal, stakeholder hesitation, or methodology signal is not neutral by default; its meaning depends on the work product, user, scope, timing, downstream action, and loss function.

## Output Obligation

Something the work product must get right: a claim, recommendation, ranking, omission, tone choice, uncertainty qualification, support requirement, or decay behavior. Output obligations become judgments.

## Judgment

A specific decision the system must make to produce the work product correctly. The unit of derivation design is the judgment, not the prompt, agent, model, tool, data source, or node.

Examples: who owns the next step, what changed, whether an account is at risk, which stakeholder is blocking, whether a signal is urgent, whether a claim is supported, whether a fact is stale, what tone to use, whether an item is duplicative, and whether to assert, qualify, or omit.

## Workflow-Derived Observation

An interpreted observation extracted from raw state for a specific judgment or work product. It carries source support, scope, interpreted value, confidence, uncertainty, and downstream consumers. It is workflow-scoped unless promoted through a reusable-state contract.

## Dimension

An aspect of raw or derived state that can change a judgment. Examples include actor, owner, due date, stakeholder stance, decision criteria, objection type, urgency, freshness, source reliability, workspace scope, customer methodology, sentiment, risk severity, business initiative, competitive pressure, commitment status, perceived hesitation, relationship context, silence, speaker authority, and prior baseline.

A dimension matters if changing, removing, aggregating, or misrepresenting it can change the quality of the work product.

## Minimal Sufficient Representation

The smallest active representation that still lets downstream workflow nodes make required judgments faithfully. It may include exact values, verbatim spans, source pointers, classified values, aggregates, rankings, confidence structures, uncertainty, contradictions, freshness metadata, decay policies, and invalidators. It is small relative to raw state and sufficient relative to the work product.

## Derivation DAG

The workflow graph that produces a work product. Nodes represent judgment-producing transformations. Edges represent dependencies between raw-state retrieval, judgments, intermediate representations, verification gates, rendered outputs, invalidators, and policies. The DAG expresses a partial order of judgments, not a forced sequence of generic processing layers.

## Node

A judgment-producing transformation or necessary gate in the derivation DAG. A node earns its existence when it protects quality, fidelity, reuse, verification, parallelism, publication policy, or efficiency.

## Edge

A dependency or policy relationship between nodes. Edge type matters: hard requirement, soft improvement, verification, invalidation, scope, fidelity gate, or policy gate. Each edge needs a fidelity contract.

## Fidelity Contract

The preservation rule for a node or edge. It says what the transformation consumes and produces; which dimensions are exact, source-recoverable, classified, aggregated, decayed, or dropped; which downstream judgments depend on it; and what would break if it were wrong, incomplete, or stale.

## Compression Boundary

Any transformation where information leaves active context, changes shape, aggregates, classifies, or becomes only source-recoverable. Every compression boundary needs a fidelity contract.

## Dimension Survival

The policy for a dimension at a point in the DAG: exact, pointer, classified, aggregate, decayed, or dropped. A dimension is live while some downstream judgment still needs it at a fidelity not yet satisfied by an intermediate representation.

## Claim / Action Support Package

The hidden structure behind an important rendered claim or action: workflow judgment sources, raw source support, structured confidence, contradictions, open questions, and rendering policy. The visible work product should project support packages rather than magic prose.

## Structured Confidence

A multi-axis trust object, not a scalar. Typical axes are evidence sufficiency, source quality, scope certainty, freshness, interpretation certainty, contradiction status, model confidence, user fit, missing information, and recommended rendering assertiveness.

## Rendering Policy

The judgment that decides how a supported claim or action should be expressed: asserted, qualified, tentative, omitted, escalated, or demoted. Rendering depends on evidence, source quality, scope, freshness, interpretation, contradictions, user relevance, and work-product risk tolerance.

## Publication Gate

A check that controls whether candidate output may be confidently shown, recommended, sent, persisted, or acted on. Common gates cover evidence support, freshness, non-duplication, permissions, scope correctness, confidence, contradiction handling, user relevance, decay, source recoverability, and policy compliance.

## Promotion Contract

The contract required before workflow-derived semantic state becomes reusable durable state: meaning, scope, source, fidelity, consumers, invalidators, recompute policy, confidence, failure modes, and owner.

## Durable State

State persisted beyond one run. Safe categories are neutral substrate state, workflow-specific durable state, and promoted reusable judgment state. Dangerous durable state is generic semantic state extracted because it seems generally useful.

## Eval

A check that proves quality or locates where faithfulness was gained or lost. Required layers include final-output evals, judgment evals, edge/fidelity evals, retrieval evals, and ablation evals.

## Ablation

A counterfactual test that removes, changes, or weakens a dimension or representation to see whether output quality changes. Ablations discover which dimensions matter and which carried information is ceremony.
