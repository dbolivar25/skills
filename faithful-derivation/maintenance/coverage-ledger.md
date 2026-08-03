# Coverage Ledger

This ledger proves semantic coverage for the Faithful Derivation v0.2 draft without preserving the raw draft as a runtime source. Every idea below maps to a live home in the skill package.

Coverage rule: a home must be a runtime file, guide, reference, template, or glossary entry. An archival draft, example pack, validation script, or pattern catalog is not a valid home.

## 1. Purpose

Ideas:

- work products should be valuable enough to pay for
- fluency is table stakes, not the goal
- faithful work products ground claims, actions, priorities, tone, omissions, and recommendations in the right raw state and user job
- great outputs should feel continuously aware of account, people, commitments, risks, history, methodology, user role, and moment
- output should beat human memory and generic ad hoc retrieval
- the system should know product type, required judgments, source dependencies, exact details, inferable details, compressible details, recoverable details, and droppable details
- work product is customer value; workflow is the means

Homes:

- `SKILL.md` Core Posture
- `GLOSSARY.md` Work Product
- `guides/design-new-work-product-workflow.md` Step 1
- `reference/anti-patterns.md` Unsupported Fluency and Generic Context Retrieval
- `templates/derivation-spec.md` Work Product Contract

## 2. Core Thesis

Ideas:

- each work product is a purpose-conditioned reducer over raw state
- raw state stream includes meetings, transcripts, emails, documents, CRM, tasks, messages, product usage, notes, customer artifacts, prior outputs, and user edits
- reducer constructs the smallest sufficient representation for a specific work product
- quality target compares output from sufficient representation against output from all relevant raw state
- goal is not keep everything or summarize everything
- drop irrelevant dimensions while preserving exact or source-recoverable dimensions that change output quality
- minimal representation is lossy over irrelevant dimensions and lossless/source-recoverable over judgment-relevant dimensions

Homes:

- `GLOSSARY.md` Purpose-Conditioned Reducer, Raw State, Minimal Sufficient Representation
- `reference/raw-state-and-semantics.md` Raw State Is Canonical
- `reference/compression-and-dimensions.md` Compression Principle and Work-Product-Specific Projection
- `SKILL.md` Core Posture and Invariant Method

## 3. Most Important v0.2 Correction

Ideas:

- do not build a universal semantic evidence layer first
- commitments, risks, objections, tone signals, hesitation, buying signals, and methodology signals are interpretations
- interpretations depend on work product, user, scope, customer, timing, downstream action, and loss function
- workflows derive needed intermediate representations from raw state under their own purpose, scope, loss function, and fidelity requirements
- raw state is canonical
- neutral retrieval infrastructure can be shared
- semantic observations are workflow-scoped by default
- derived representations become reusable only after meaning, scope, fidelity, consumers, confidence, and invalidators are explicit
- avoid purpose-blind semantic evidence layers

Homes:

- `SKILL.md` Core Posture
- `GLOSSARY.md` Workflow-Scoped Semantics and Promotion Contract
- `reference/raw-state-and-semantics.md` Workflow-Derived Semantics and No Universal Semantic Layer
- `reference/durable-state-and-promotion.md` Dangerous Durable State and Promotion Contract

## 4. What This Is Not

Ideas:

- not "summarize the last N meetings and generate a doc"
- general summaries lack task-specific loss functions
- rare decisive details can be dropped by generic summaries
- structured data alone does not solve the problem
- structured irrelevant or lossy data can flood and mislead
- not a fixed universal workflow template
- different work products need different derivation shapes
- discipline is uniform; workflow shapes are bespoke

Homes:

- `SKILL.md` Core Posture and Failure Modes
- `reference/anti-patterns.md` Summary Soup, Schema Worship, Fixed Pipeline Thinking
- `reference/compression-and-dimensions.md` Work-Product-Specific Projection
- `guides/design-new-work-product-workflow.md` Step 1 and Step 6

## 5. Raw State, Retrieval Substrate, And Workflow-Derived Semantics

Ideas:

- distinguish raw state, neutral retrieval substrate, and workflow-derived semantics
- raw state is canonical and usually preserved
- compression drops from active representation, not source store
- retrieval substrate provides handles, metadata, boundaries, object links, permissions, indices, and source pointers
- retrieval substrate is not semantic understanding
- workflow-derived semantics are judgments produced for a purpose
- workflow-derived semantics are scoped unless promoted

Homes:

- `GLOSSARY.md` Raw State, Neutral Retrieval Substrate, Workflow-Scoped Semantics, Workflow-Derived Observation
- `reference/raw-state-and-semantics.md` all sections
- `templates/derivation-spec.md` Raw State Scope and Workflow-Scoped Evidence Plan

## 6. Main Abstractions

Ideas:

- work product definition and examples generalized into runtime vocabulary
- judgment as unit of design
- prompts, models, tools, retrieval calls, and nodes exist to make judgments faithfully
- output obligation definition and examples
- output obligations become judgments and node responsibilities
- workflow-derived observation replaces global evidence atom
- observation carries source pointer, raw span, interpreted value, scope, confidence, uncertainty, downstream consumers
- dimension definition and examples
- dimensions discovered at point of need
- dimension matters if changing/removing/aggregating/misrepresenting it changes output quality
- minimal sufficient representation definition and possible contents
- derivation DAG nodes and edges
- DAG expresses partial order, not linear workflow
- outputs may feed multiple downstream nodes if contracts satisfy consumers
- fidelity contract questions
- every compression boundary needs a fidelity contract
- claim/action support package behind rendered claims and actions
- rendered product should project judgments, support, confidence, and provenance

Homes:

- `GLOSSARY.md` Work Product through Ablation
- `reference/compression-and-dimensions.md` Dimension Definition and Dimension Survival Policies
- `reference/judgment-dags-and-edges.md` Derivation DAG, Edge Types, Node Granularity
- `reference/evidence-support-and-confidence.md` Workflow-Scoped Evidence, Claim / Action Support Package, Structured Confidence
- `templates/derivation-spec.md` Judgment Inventory, Derived Dimensions, Judgment DAG, Intermediate Representation Contracts, Claim / Action Support

## 7. Compression Principle

Ideas:

- compression projects source into task-required dimensions
- preserve required dimensions at required fidelity
- discard the rest from active representation
- loss should be in intentionally dropped dimensions
- one product may preserve exact commitments, owner, due date, and source
- another may preserve durable stakeholder map, decision process, initiatives, blockers, pain, trends, and source support
- same raw event can be represented differently depending on exactness, change-detection, durability, or preparation needs
- core question asks which downstream judgments still need each dimension, at what fidelity, and whether need is satisfied

Homes:

- `reference/compression-and-dimensions.md` Compression Principle and Work-Product-Specific Projection

## 8. Dimension Problem

Ideas:

- complete upfront dimension enumeration is unrealistic
- raw state and natural language are too high-dimensional
- avoid one-time global ontology
- dimensions are discovered, named, defined, tested, reused, promoted, or retired through workflow development
- universal substrate fields are useful but insufficient
- reusable domain concept families should not become rigid universal schemas
- each reusable concept needs meaning, derivation, fidelity, confidence, and distrust conditions
- work-product-specific dimensions come from judgments, failure risks, expert inspection, dangerous compression, rare high-consequence details, misleading signals, and ignored signals
- dimensions evolve through failure analysis and ablation

Homes:

- `reference/compression-and-dimensions.md` Dimension Problem through Work-Product-Specific Dimensions
- `guides/design-new-work-product-workflow.md` Steps 4 and 5
- `reference/evals-and-ablations.md` Dimension Library Evolution

## 9. Dimension Discovery And Promotion

Ideas:

- dimension becomes real when missing or misrepresenting it worsens the workflow
- useful dimension definition fields
- perceived hesitation example generalized into dimension definition, judgments, raw signals, counter-signals, fidelity, failure modes, and reuse status
- lifecycle statuses: local, candidate_reusable, promoted, deprecated
- organization should build a learning library, not brittle ontology

Homes:

- `reference/compression-and-dimensions.md` Dimension Definition, Example Dimension, Dimension Lifecycle
- `guides/design-new-work-product-workflow.md` Step 5
- `templates/derivation-spec.md` Derived Dimensions
- `reference/durable-state-and-promotion.md` Candidate Reuse

## 10. Dimension Survival

Ideas:

- need a science of dimension survival
- each DAG edge needs survival policy
- policies: exact, pointer, classified, aggregate, decayed, dropped
- distinguish raw-state retention from active representation retention
- raw evidence remains available; compression drops active information
- dimension may be dropped only when no downstream consumer needs it, transformed representation is sufficient, or provenance can recover it
- dimension is live while downstream judgment needs unsatisfied fidelity
- live dimensions must not be dropped; dead dimensions become cost, noise, and risk

Homes:

- `GLOSSARY.md` Dimension Survival
- `reference/compression-and-dimensions.md` Dimension Survival Policies and Live Dimension Rule
- `guides/design-new-work-product-workflow.md` Step 8
- `templates/derivation-spec.md` Judgment DAG and Intermediate Representation Contracts

## 11. Judgment Dependency Planning

Ideas:

- DAG should be built around judgment dependencies
- topological sort is over judgments and preconditions, not arbitrary steps
- change-detection pressure: prior/current state before material change; user relevance after user known; publication after freshness, duplication, permission, evidence
- DAG answers dependency, fan-out, parallelism, gate, expensive-computation, and intermediate-representation questions
- graph is design artifact; sort is one execution order

Homes:

- `reference/judgment-dags-and-edges.md` Judgment Dependency Planning
- `guides/design-new-work-product-workflow.md` Step 6
- `templates/derivation-spec.md` Judgment DAG

## 12. Edge Types

Ideas:

- edge types are semantically distinct
- hard_requires, soft_improves, verifies, invalidates, scopes, fidelity_gate, policy_gate
- not everything should wait
- speculative/provisional nodes are allowed
- draft output can run before publish checks
- candidate time-sensitive output can run before show gates

Homes:

- `reference/judgment-dags-and-edges.md` Edge Types and Speculative Execution
- `reference/publication-and-rendering.md` Generation And Publication Are Different
- `templates/derivation-spec.md` Judgment DAG

## 13. Using The DAG Constraint Well

Ideas:

- DAGs and fan-out are the right primitive
- avoid naive map-reduce and rigid linear workflows
- use parallel, fan-out, fan-in, gate, collapse
- naturally cyclic reasoning should collapse into one joint node
- opportunity thesis, risk model, stakeholder strategy, and next best action may mutually inform one another
- internal reasoning may be iterative or agentic while workflow-level graph stays acyclic

Homes:

- `reference/judgment-dags-and-edges.md` Using The DAG Constraint Well and Joint Inference Nodes
- `guides/design-new-work-product-workflow.md` Step 6
- `templates/derivation-spec.md` Judgment DAG

## 14. Why Naive Map-Reduce Fails

Ideas:

- map-reduce is not inherently wrong; naive version is wrong
- summarizing each meeting then summarizing summaries drops dimensions before downstream loss function is known
- good map-reduce is purpose-conditioned and dimension-aware
- map/extract/reduce by stakeholder/opportunity/time/work-product lens should preserve needed dimensions
- only reduce across dimensions with known merge semantics and satisfied downstream fidelity
- reduce step must improve quality, risk, reuse, or cost without quality loss

Homes:

- `reference/judgment-dags-and-edges.md` Naive Map-Reduce Failure
- `reference/anti-patterns.md` Summary Soup and Expensive Ceremony
- `guides/review-existing-workflow.md` Audit Pass and Anti-Patterns Observed

## 15. Why Linear Workflows Fail

Ideas:

- linear workflows force unrelated judgments to wait
- linear workflows force all consumers to inherit one representation
- better workflows allow shared retrieval, scope resolver, material-change detector, stakeholder model, source verifier, confidence structure
- DAG should express real dependencies

Homes:

- `reference/judgment-dags-and-edges.md` Linear Workflow Failure
- `reference/anti-patterns.md` Fixed Pipeline Thinking
- `guides/design-new-work-product-workflow.md` Step 6

## 16. Workflow-Scoped Evidence

Ideas:

- raw state becomes evidence only relative to a question
- same sentence may be irrelevant, critical, misleading, tone evidence, insufficient without relationship context, source support, or dangerous without methodology scope
- workflow defines evidence, raw search scope, signals, fidelity, source support, uncertainty, and alternative interpretations
- promoted evidence needs explicit contract

Homes:

- `reference/evidence-support-and-confidence.md` Workflow-Scoped Evidence and Evidence Plan
- `reference/raw-state-and-semantics.md` Workflow-Derived Semantics
- `guides/design-new-work-product-workflow.md` Step 9
- `templates/derivation-spec.md` Workflow-Scoped Evidence Plan

## 17. Promotion Contract

Ideas:

- reusable durable semantic state requires meaning, scope, source, fidelity, consumers, invalidators, recompute policy, confidence, failure modes, and owner
- without contract, derived representation is not general-purpose truth

Homes:

- `GLOSSARY.md` Promotion Contract
- `reference/durable-state-and-promotion.md` Promotion Contract
- `templates/derivation-spec.md` Intermediate Representation Contracts

## 18. Durable State

Ideas:

- correction against universal semantic precomputation does not forbid intermediate state
- avoid purpose-blind semantic state
- safe durable categories: neutral substrate, workflow-specific durable state, promoted reusable judgment state
- dangerous category is generic semantic state extracted because it seems useful
- persist raw state by default
- persist semantic state only with purpose, fidelity, invalidation, confidence, and known consumers

Homes:

- `reference/durable-state-and-promotion.md` all sections
- `GLOSSARY.md` Durable State
- `guides/implementation-handoff.md` Steps 8 and Implementation Smells

## 19. Structured Confidence

Ideas:

- confidence should not be scalar
- scalar hides evidence, interpretation, freshness, scope, contradiction differences
- confidence axes: evidence_sufficiency, source_quality, scope_certainty, freshness, interpretation_certainty, contradiction_status, model_confidence, user_fit, recommended_rendering
- confidence changes language
- qualified rendering example generalized into confidence-controlled language

Homes:

- `GLOSSARY.md` Structured Confidence
- `reference/evidence-support-and-confidence.md` Structured Confidence and Confidence Controls Language
- `templates/derivation-spec.md` Structured Confidence

## 20. Rendering Policy

Ideas:

- rendering is a judgment
- workflow decides not only truth but how to say it
- rendered claim can be asserted, qualified, tentative, omitted, escalated, demoted
- rendering depends on evidence, source, scope, freshness, interpretation, contradictions, user relevance, and risk tolerance
- rendering policy prevents unsupported fluency

Homes:

- `GLOSSARY.md` Rendering Policy
- `reference/publication-and-rendering.md` Rendering Is A Judgment
- `reference/evidence-support-and-confidence.md` Confidence Controls Language
- `templates/derivation-spec.md` Claim / Action Support and Structured Confidence

## 21. Publication Gates

Ideas:

- generation and publication are different
- candidate output may be produced before every check completes
- output should not publish/recommend/confidently present until gates pass
- gates include evidence, freshness, duplication, permissions, scope, confidence, contradictions, user relevance, decay, source recoverability, policy
- speculative execution can coexist with trust
- candidate vs published state example generalized into publication-gate contract

Homes:

- `GLOSSARY.md` Publication Gate
- `reference/publication-and-rendering.md` Generation And Publication Are Different, Candidate And Published States, Gate Definition
- `guides/design-new-work-product-workflow.md` Step 10
- `templates/derivation-spec.md` Publication Gates

## 22. Workflow Design Method

Ideas:

- design backward from finished work product, execute forward as DAG
- Step 1 work product contract questions
- Step 2 output obligations
- Step 3 obligations to judgments
- Step 4 judgment inputs and "what would make this wrong?"
- Step 5 nodes earn existence through loss function, retrieval scope, fidelity, freshness, reuse, eval, risk isolation, context reduction, publication/confidence gating, parallelism/fan-out
- Step 6 edge fidelity contracts
- Step 7 publication gates
- Step 8 evals and ablations
- Step 9 optimize only after quality is real

Homes:

- `SKILL.md` Invariant Method
- `guides/design-new-work-product-workflow.md` all steps
- `templates/derivation-spec.md`

## 23. Node Granularity

Ideas:

- granularity follows risk, fidelity, reuse, and evalability
- split criteria: different dependencies, failure modes, retrieval scopes, gates, fidelity, fan-out, eval, confidence/publication policy
- merge criteria: same inputs, same loss function, no reusable intermediate, no distinct eval, no fidelity boundary, ceremony only
- question is not agent count; question is boundaries protecting faithfulness, evaluation, reuse, or efficiency

Homes:

- `reference/judgment-dags-and-edges.md` Node Granularity
- `guides/design-new-work-product-workflow.md` Step 7
- `guides/implementation-handoff.md` Handoff Steps

## 24. Evals

Ideas:

- workflow needs evals at multiple levels
- final output eval examples
- judgment eval examples
- edge/fidelity eval examples
- retrieval eval examples
- ablation eval examples
- evals evolve dimension library

Homes:

- `reference/evals-and-ablations.md` all sections
- `templates/derivation-spec.md` Evals
- `guides/design-new-work-product-workflow.md` Step 11

## 25. Meta-Workflow Authoring

Ideas:

- domain experts should not need to become AI workflow architects
- meta-workflow helps create derivation spec
- domain expert owns job, customer, failure modes, and what great means
- engineer knows implementation
- meta-workflow translates between them
- roles: Domain Expert, Meta-Workflow Assistant, Engineer, Reviewer
- output includes contract, raw scope, obligations, inventory, DAG, evidence plan, dimensions, representations, fidelity, gates, confidence, failure modes, evals, implementation notes, questions
- ask concrete questions, not abstract dimension questions
- translate answers into judgments, raw signals, dimensions, fidelity, dependencies, confidence, evals
- expert reviews translated spec, not vague brainstorm

Homes:

- `guides/expert-interview.md` all sections
- `templates/derivation-spec.md`
- `SKILL.md` Output Contract for interview tasks

## 26. Source Section: User-Specific Change Product

Ideas:

- the source section describes a user-specific output over meaningful change, not durable strategy or summary
- answers what changed, why it matters, what to do, why now, when disappear
- candidate DAG
- important inputs
- publication gates
- avoid full transcripts unless exact wording needed
- carry exact values or source pointers for claim/action/explanation support

Homes:

- `reference/compression-and-dimensions.md` Work-Product-Specific Projection
- `reference/publication-and-rendering.md` Decay And Disappearance
- `templates/derivation-spec.md` Output Obligations, Judgment Inventory, Publication Gates

## 27. Source Section: Recent Exact Product

Ideas:

- shallow, recent, exact, tone-sensitive
- answers what happened, agreed, owners, questions, tone, recipient next action
- candidate DAG
- inputs: recipient, relationship, commitments, owners, due dates, decisions, questions, tone, latest context, source pointers
- near-zero tolerance for wrong owner/date/action
- older history ignored unless it changes tone or next action

Homes:

- `reference/compression-and-dimensions.md` Work-Product-Specific Projection
- `templates/derivation-spec.md` Output Obligations, Judgment Inventory, Claim / Action Support

## 28. Source Section: Longitudinal Strategic Product

Ideas:

- durable, longitudinal, strategic, synthesis-heavy
- answers account state, who matters, customer cares, decision process, risks, opportunities, next actions
- candidate DAG
- inputs: stakeholder map, influence, stance, initiatives, pain, decision criteria/process, risks, blockers, competitors, product fit, value, timeline, budget, trend, support
- exact transcript phrase often less important than durable implications
- strategic claims need source support or recoverability

Homes:

- `reference/compression-and-dimensions.md` Work-Product-Specific Projection
- `reference/judgment-dags-and-edges.md` Joint Inference Nodes
- `reference/evidence-support-and-confidence.md` Claim / Action Support Package

## 29. Source Section: Prospective Tactical Product

Ideas:

- prospective, tactical, context-sensitive
- answers pre-call context, objective, attendees, landmines, questions, avoidances, changes since last interaction
- candidate DAG
- inputs: attendees, roles, relationship, last interaction, open commitments, objections, stance, opportunity stage, criteria, risks, next step, tone, support
- can ignore many durable-strategy details but may need exact phrasing or commitments

Homes:

- `reference/compression-and-dimensions.md` Work-Product-Specific Projection
- `reference/judgment-dags-and-edges.md` Judgment Dependency Planning
- `templates/derivation-spec.md` Raw State Scope, Judgment Inventory, Publication Gates

## 30. Design Review Questions

Ideas:

- review should ask work product, user job, value, failure, judgments, risk, subjectivity, support, raw state, old state, dimensions, exact/pointer/classified/aggregate/decay/drop policies, DAG, node/edge existence, edge preservation, downstream inability under compression, fan-out, gates, confidence, uncertainty, ablations, optimization

Homes:

- `guides/review-existing-workflow.md` Audit Pass
- `templates/review-report.md`
- `SKILL.md` Output Contract for review tasks

## 31. Derivation Spec Template

Ideas:

- work product contract
- raw state scope
- output obligations
- failure modes
- judgment inventory
- workflow-scoped evidence plan
- derived dimensions
- judgment DAG
- intermediate representation contracts
- claim/action support
- structured confidence
- publication gates
- evals
- efficiency pass

Homes:

- `templates/derivation-spec.md`

## 32. Operating Principles

Ideas:

- workflow is not product; work product is product
- workflow exists to produce faithful, consistent, efficient work product
- workflow is purpose-conditioned reducer over raw state
- workflow derives needed intermediate representations; no universal semantic layer assumption
- preserve raw state broadly; persist semantic state only with explicit contract
- node exists only if it protects quality, fidelity, reuse, verification, parallelism, or efficiency
- edge exists only if output is valid representation for downstream judgments
- dimension survives only while live
- dimension named when work demands it
- publishable claim needs support, scope, freshness, confidence, and contradiction status
- confidence structured not scalar
- generation and publication differ
- reducer is good only if dropped information does not change correct output
- workflow shape discovered from output obligations
- evals and ablations learn dimensions
- efficiency after faithfulness

Homes:

- `SKILL.md` Core Posture and Invariant Method
- `GLOSSARY.md`
- `reference/compression-and-dimensions.md`
- `reference/judgment-dags-and-edges.md`
- `reference/evidence-support-and-confidence.md`
- `reference/publication-and-rendering.md`
- `reference/evals-and-ablations.md`
- `reference/durable-state-and-promotion.md`

## 33. Anti-Patterns

Ideas:

- summary soup destroys information before workflow knows what matters
- schema worship creates structured irrelevance or structured loss
- universal semantic layer precomputes observations without consumer
- fixed pipeline thinking forces all work products through same stages
- unsupported fluency judges sound rather than evidence survival
- premature aggregation collapses distinctions too early
- scalar confidence hides evidence/source/freshness/scope/contradiction/interpretation/user-fit issues
- final-only evals miss where faithfulness was gained or lost

Homes:

- `reference/anti-patterns.md`
- `SKILL.md` Failure Modes
- `templates/review-report.md` Anti-Patterns Observed

## 34. Compact Version

Ideas:

- great AI work product is faithfully derived from raw state, not generated from generic context
- each workflow is purpose-conditioned reducer over scoped raw state
- workflow decides evidence, judgments, intermediate representations, and dimension survival
- do not enumerate dimensions upfront; discover and promote with proof
- intermediate evidence, observations, claims, and state are workflow-scoped by default
- reusable state requires explicit contract
- workflow engine expresses DAG of judgment dependencies, not linear pipeline or naive map-reduce
- outputs can feed multiple downstream nodes when contracts support consumers
- compression drops no-longer-needed active dimensions and does not summarize dimensions that matter
- important details preserved exact or source-recoverable until no downstream judgment needs them
- confidence structured, publication gated, quality proven through evals/ablations/user feedback, efficiency after faithfulness
- guiding question: what must remain true at this point for every downstream judgment to still be made faithfully?

Homes:

- `SKILL.md` Core Posture and Invariant Method
- `GLOSSARY.md` Purpose-Conditioned Reducer, Derivation DAG, Dimension Survival
- `reference/compression-and-dimensions.md` Live Dimension Rule
- `reference/publication-and-rendering.md`
- `reference/evals-and-ablations.md`
