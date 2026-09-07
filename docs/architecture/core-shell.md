# Functional cores and operational shells

Baseline: 95b0a27. This design replaces the extraction pass's implementation
structure while retaining its useful invocation interfaces. The subsequent
[creative consolidation](creative-consolidation.md) brings creative shaping into
creative-ideation, yielding 29 modules with the same core/shell boundary.

## The seam

A module owns a coherent result. Its `SKILL.md` is the normal invocation: a shell
that acquires the module's required context, applies its core, resolves evidence
needs within authority, and returns or applies the result the task requested.
A supporting invocation does not take over the caller's whole task.

`core.md` reasons from explicit inputs. It owns judgment, transformations,
constraints, explanations and what would change its answer. It can read its
method references and call other cores with supplied inputs. It cannot acquire
live evidence, run tests, write files, publish, wait for a person, or dispatch
agents. Missing evidence and owner decisions are results, not reasons to guess.

References hold domain knowledge; branches and operation guides hold execution
recipes where that detail earns its place. Existing helpers, tokens, schemas,
assets and runtime code stay with the capability that owns them.

The core/shell split is inside a deep module. The caller still sees one natural
invocation rather than a mandatory sequence of several tiny skills.

## Evidence feedback

```text
purpose + candidate + evidence + constraints
                    │
                    ▼
                  core
                    ├─ result + reasons + coverage + limits
                    ├─ evidence need + why it changes the result
                    └─ owner decision + alternatives + recommendation
                              │
                              ▼
                     shell resolves what it can
                              │
                     refreshed inputs → core
```

The shell gathers discoverable facts itself. It asks only for unavailable access
or a decision that belongs to the user. Repeatedly requesting the same unchanged
input is not progress. It reports the limit and continues independent work.
Before an effect whose correctness depends on freshness, the shell rechecks its
source and reapplies affected judgment. An effect receipt proves only its actual
stage; draft, validation, publication and observed outcome remain distinct.

These are semantic result shapes, not a compulsory JSON envelope or a new runtime.
Prose, a table, a proposed diff or a domain-specific status can carry them.

## Whole-library allocation

| Module family | Core owns | Shell owns |
| --- | --- | --- |
| claim-support, information-preservation, evaluation-design | Claim strength, fidelity and evaluation design | Source material, access, concrete comparison inputs and requested artifacts |
| understand-change, dependency-compatibility, review | Change model, version-impact analysis and integrated code judgment | Diff selection, repository/upstream evidence, checks and requested review actions |
| module-design, engineering-restraint, decision-rights | Interface leverage, necessity and standing | Current callers/cost evidence, alternate-design actors and execution of settled next steps |
| domain-modeling, grilling | Meaning, ADR eligibility and dependency-ready questions | Glossary/code reads, conversation rounds and requested durable updates |
| software-engineering, architecture-scan, tech-spec | Correctness obligations, ranked ownership moves and complete design coverage | Repository exploration, edit/test loops, selected output and acceptance handoffs |
| diagnosing-bugs | Reproduction adequacy, ranked hypotheses, probe design and causal judgment | Loop/probe execution, instrumentation, authorized fixes and cleanup |
| reviewability | A faithful reviewer-facing artifact and decision-oriented structure | Work acquisition, artifact writes and authorized publication |
| critique, steward | Falsification and intent/support/next-action judgment | Independent actors, durable runtime, state writes and acceptance receipts |
| interface-design, show-me, prototype | Experience judgment, visual representation and experiment design | Render/source acquisition, artifact construction, execution and inspection |
| faithful-derivation | Work-product obligations, DAG, fidelity/support/policy integration | Expert rounds, live source recovery, requested handoff and execution receipts |
| writing-for-agents, humanize | Instruction architecture and truth-preserving prose transformation | File/context reads, edits, validation and delivery |
| grafana-evidence, github-evidence | Population/support interpretation and PR receipt semantics | Live queries/APIs, pagination, redaction and requested platform actions |
| augment-design, augment-workflows | Supplied brand-law application and graph/authority design | Assets/audit and live product contracts, canonical state and authorized operations |
| creative-ideation | Method routing, supplied-material transformation, idea quality and exercise proposals | Brief/source acquisition, real random draws, exercises, independent generation when required, and authorized making |

## Dependency direction

Task owners integrate multiple results. Supporting shells may use evidence
capabilities for their bounded concern. Cores reference other cores or passive
knowledge; they do not activate a shell. A core reference to a rule does not
select that rule owner's implementation workflow. A graph can therefore share
judgment across local fixtures, live work, review and design without duplicating
acquisition or allowing a supporting concern to seize control.

## Acceptance

Every active owned skill has a real input/result seam and an operational owner.
Core-reachable instructions must not initiate effects or live acquisition. The
prior methods, examples, source specificity and stopping boundaries remain in
one authoritative home. Caller paths and invocation cases follow the new split.
Representative fixture probes exercise core results and evidence needs without
tools; shell examples exercise acquisition, freshness and authority. Structural
checks alone cannot establish that the behavioral seam works.
