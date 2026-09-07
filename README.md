# Personal skill library

Choose a skill by the judgment or result the task needs. Its implementation may
be deep; the caller should not need to learn every internal method. Shared
references supply knowledge without starting their owner's workflow.

## Choose the work

| Request | Entry point | Result |
| --- | --- | --- |
| Build or change software | [software-engineering](software-engineering/SKILL.md) | Correct code, appropriate tests, readable implementation; selected lint enforcement |
| Design a module interface | [module-design](module-design/SKILL.md) | Ownership, hidden complexity, caller usage, seams and tradeoffs |
| Find architectural opportunities | [architecture-scan](architecture-scan/SKILL.md) | Ranked, evidenced ownership moves; explicit selection only |
| Specify a selected change | [tech-spec](tech-spec/SKILL.md) | Typed contracts and complete affected flows; explicit selection only |
| Understand what changed | [understand-change](understand-change/SKILL.md) | Grounded map of behavior, responsibilities, evidence and gaps |
| Assess an upgrade | [dependency-compatibility](dependency-compatibility/SKILL.md) | Affected usage, migrations and compatibility proof |
| Judge this code change | [review](review/SKILL.md) | Findings and one supported verdict |
| Help someone judge this work | [reviewability](reviewability/SKILL.md) | A faithful PR description or review guide, including non-code work |
| Sharpen what these concepts mean | [domain-modeling](domain-modeling/SKILL.md) | Tested examples, precise vocabulary, qualifying decisions |
| Find why this fails or runs slowly | [diagnosing-bugs](diagnosing-bugs/SKILL.md) | Reproduction evidence and a tested causal explanation |
| Decide whether this addition earns its cost | [engineering-restraint](engineering-restraint/SKILL.md) | Necessity, alternatives, ownership burden and a recommendation |
| Falsify a proposed result | [critique](critique/SKILL.md) | Evidence-backed weaknesses and assessment against supplied criteria |
| Grill this plan or decision | [grilling](grilling/SKILL.md) | Dependency-aware questions and settled decisions |
| Settle whether an objection may block | [decision-rights](decision-rights/SKILL.md) | Supported next action, owner and settlement |
| Preserve intent through changing work | [steward](steward/SKILL.md) | Durable Intent, State, Record and separate outcome receipts |
| Design or improve a human experience | [interface-design](interface-design/SKILL.md) | Coherent interaction, composition, state, motion and rendered evidence |
| Explain visually | [show-me](show-me/SKILL.md) | Visible explanation grounded in the actual source |
| Learn through an experiment | [prototype](prototype/SKILL.md) | Runnable experiment, observed answer and limits |
| Derive an AI work product faithfully | [faithful-derivation](faithful-derivation/SKILL.md) | Supported judgments and preservation across inputs, output and publication |
| Decide what information must survive | [information-preservation](information-preservation/SKILL.md) | Consumer-specific fidelity contract or loss assessment |
| Assess what evidence supports | [claim-support](claim-support/SKILL.md) | Provenance, uncertainty, contradictions and justified claim strength |
| Design quality measurement | [evaluation-design](evaluation-design/SKILL.md) | Cases, observations, oracles, comparisons and ablations |
| Write instructions for an agent | [writing-for-agents](writing-for-agents/SKILL.md) | Reachable, well-structured instructions that change the intended behavior |
| Restore human voice | [humanize](humanize/SKILL.md) | Natural prose with meaning and uncertainty preserved |
| Generate or select a creative direction | [creative-ideation](creative-ideation/SKILL.md) | A selected creative method and concrete directions |
| Transform existing creative material | [creative-shaping](creative-shaping/SKILL.md) | The selected deep method under creative-ideation's routing |

## Specialist resources

These are independently reachable because several kinds of work consume them.
Their platform knowledge does not own the caller's overall judgment.

| Resource | Supplies |
| --- | --- |
| [github-evidence](github-evidence/SKILL.md) | Complete PR/thread/CI acquisition and PR operation semantics |
| [grafana-evidence](grafana-evidence/SKILL.md) | Bounded telemetry with reproducible queries and coverage limits |
| [augment-design](augment-design/SKILL.md) | Augment identity, assets, tokens, voice and surface-specific floors |
| [augment-workflows](augment-workflows/SKILL.md) | Workflow construction and operations grounded in live Augment product contracts |

## How dependencies compose

```text
review / reviewability ───→ understand-change
review ──────────────────→ dependency-compatibility
SWE / scan / spec ────────→ module-design
show-me / interface-design → prototype (when the question is unsettled)
steward phase review ─────→ critique
faithful-derivation ──────→ preservation + claim support + evaluation design
writing-for-agents ───────→ evaluation-design
```

Use a supporting skill for its result while retaining responsibility for the
whole task. Read an owner's internal reference when only its method or vocabulary
is needed. Reading testing law does not start SWE; critique does not open Steward;
designing a future support policy does not fabricate an assessment of actual claims.

[The extraction design and graph](docs/architecture/extracted-modules.md) explain
inputs, outputs, callers, retained internals and the distinction between invoking
a judgment and reading its method. Cross-package references require their named
owners to be available; independent distribution does not bundle them automatically.

## Migration

| Previous invocation | Current home |
| --- | --- |
| coding-standards, tdd, simplify | software-engineering: standards, selected test-first work, finishing |
| codebase-design; SWE module-design reference | module-design |
| write-custom-lint | software-engineering: lint enforcement |
| improve-codebase-architecture; architecture scan branch | architecture-scan |
| architecture spec branch | tech-spec |
| code-review | review |
| review artifact branch | reviewability |
| designing-human-interfaces | interface-design |
| show-me experiment branches | prototype |
| review reconstruction reference | understand-change |
| review dependency-bump lens | dependency-compatibility |
| faithful derivation fidelity/support/evaluation references | Owned by information-preservation, claim-support, evaluation-design |
| Steward general falsification method | critique; phase-specific acceptance stays in Steward |
| steward immediate branch | decision-rights: independently reachable judgment without durable runtime |

The creative pair is unchanged. Herdr and Simplified Technical English remain
retired at the owner's request. No alias packages remain for removed invocations.
This repository owns this library; built-in skills, managed plugins and other
installations are outside its scope. Cross-package references require the named
owners to be available; publishing one package alone does not bundle dependencies.

## Verification

Run `ruby scripts/validate-skills.rb` for metadata, owned Markdown links and
[routing expectations](tests/invocation-cases.yml). Run
`ruby tests/validate-skills_test.rb` for the validator's regression fixtures.
The cases include shared-method reads that exclude the owning workflow. They
validate the corpus, not model routing accuracy or an installed host reload.

The earlier [intent audit](docs/intent-audit/results.md) records preservation up
to commit 544a8b1; the extraction document above supersedes its topology.
Installation, publication, deployment and observed outcomes require separate
receipts from repository validation.
