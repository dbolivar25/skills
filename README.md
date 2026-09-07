# Personal skill library

Choose a skill by the judgment or result the task needs. Its implementation may
be deep; the caller should not need to learn every internal method. Shared
references supply knowledge without starting their owner's workflow.

## Choose the work

| Request | Entry point | Result |
| --- | --- | --- |
| Build or change software; judge a module's design | [software-engineering](software-engineering/SKILL.md) | Correct code, useful interfaces, appropriate tests, readable implementation; selected lint enforcement |
| Find architectural opportunities | [architecture-scan](architecture-scan/SKILL.md) | Ranked, evidenced ownership moves; explicit selection only |
| Specify a selected change | [tech-spec](tech-spec/SKILL.md) | Typed contracts and complete affected flows; explicit selection only |
| Judge this code change | [review](review/SKILL.md) | Findings and one supported verdict |
| Help someone judge this work | [reviewability](reviewability/SKILL.md) | A faithful PR description or review guide, including non-code work |
| Sharpen what these concepts mean | [domain-modeling](domain-modeling/SKILL.md) | Tested examples, precise vocabulary, qualifying decisions |
| Find why this fails or runs slowly | [diagnosing-bugs](diagnosing-bugs/SKILL.md) | Reproduction evidence and a tested causal explanation |
| Decide whether this addition earns its cost | [engineering-restraint](engineering-restraint/SKILL.md) | Necessity, alternatives, ownership burden and a recommendation |
| Grill this plan or decision | [grilling](grilling/SKILL.md) | Dependency-aware questions and settled decisions |
| Settle whether an objection may block | [decision-rights](decision-rights/SKILL.md) | Supported next action, owner and settlement |
| Preserve intent through changing work | [steward](steward/SKILL.md) | Durable Intent, State, Record and separate outcome receipts |
| Design or improve a human experience | [interface-design](interface-design/SKILL.md) | Coherent interaction, composition, state, motion and rendered evidence |
| Explain or experiment visually | [show-me](show-me/SKILL.md) | A visible explanation or a bounded experiment with captured learning |
| Derive an AI work product faithfully | [faithful-derivation](faithful-derivation/SKILL.md) | Supported judgments and preservation across inputs, output and publication |
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
review ────────────────┐
                      ├─ read → reconstruction → current review map
reviewability ────────┘               └─ live PR → GitHub operations

architecture-scan ────┐
                      ├─ read → engineering standards, module design, test evidence
tech-spec ────────────┘

engineering-restraint ┐
grilling / SWE / UI ──┼─ use → decision-rights → next action + settlement
steward ─────────────┘

augment-design ─ use → interface-design for interaction and visual craft
augment-workflows ─ use → faithful-derivation and writing-for-agents when needed
```

**Read a method:** follow its file directly and return its result to the task.
Reading [reconstruction](review/references/reconstruct-work.md) does not start a
code review. Using [decision-rights](decision-rights/SKILL.md)
does not open stewardship runtime. It remains independently discoverable when
no other discipline has loaded.

**Use a discipline:** apply it to a named concern while retaining responsibility
for the overall task. Evidence acquisition does not issue a verdict; brand law
does not decide the product's purpose.

**Hand off a workflow:** carry a result into another selected outcome. Scan does
not automatically start spec; review does not automatically draft a description;
a spec does not authorize implementation. Carry forward selection already made
by the user instead of requesting it twice.

[Architecture decisions and dependency diagram](docs/architecture/skill-modules.md)
explain these interfaces and their acceptance criteria.

## Migration

| Previous invocation | Current home |
| --- | --- |
| coding-standards, codebase-design, tdd, simplify | software-engineering: standards, design, selected test-first work, finishing |
| write-custom-lint | software-engineering: lint enforcement |
| improve-codebase-architecture; architecture scan branch | architecture-scan |
| architecture spec branch | tech-spec |
| code-review | review |
| review artifact branch | reviewability |
| designing-human-interfaces | interface-design |
| prototype | show-me: selected logic or UI experiment |
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
to commit 544a8b1; the architecture document above supersedes its topology.
Installation, publication, deployment and observed outcomes require separate
receipts from repository validation.
