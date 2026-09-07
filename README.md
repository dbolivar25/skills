# Personal skill library

This repository owns the personal skills below. Built-in packages, managed
plugins, app integrations, and other installations are outside its scope.

An entry point selects a coherent kind of work. Its branches retain different
methods and stopping boundaries; loading the owner does not start every workflow
inside it. Descriptions are invocation contracts, not capability summaries.

## Consolidated owners

| Entry point | What it owns | Select the branch by the request |
| --- | --- | --- |
| [software-engineering](software-engineering/SKILL.md) | Correctness and comprehensibility in implementation | TypeScript standards; module design; selected test-first work; verified finishing or code/comment clarity |
| [architecture](architecture/SKILL.md) | Architectural discovery and typed handoff | Explicitly request a scan or a specification. A scan does not automatically become a spec. |
| [review](review/SKILL.md) | A grounded account of work for judgment | Code verdict, PR description/review guide, or both. Non-code artifacts do not inherit code axes. |
| [show-me](show-me/SKILL.md) | Understanding through visible artifacts | Explain an established relationship, explore a logic model, or compare UI structures |
| [steward](steward/SKILL.md) | Decision rights and preservation of owner intent | Settle immediate standing without runtime; use durable coordination only when intent/support/receipts must survive changing work |

`architecture` is explicitly selected in both supported host configurations.
The other owners may load from their observable triggers. Their internal branch
conditions still apply: ordinary engineering does not select TDD, a review draft
does not authorize publication, and an immediate objection does not open a mission.

The former entry points now live here:

| Previous names | Current entry and method |
| --- | --- |
| `coding-standards`, `codebase-design`, `tdd`, `simplify` | `software-engineering`: standards, design, test-first, finishing |
| `improve-codebase-architecture`, `tech-spec` | `architecture`: scan, spec |
| `code-review`, `reviewability` | `review`: code judgment, review artifact |
| `prototype` | `show-me`: logic or UI experiment |
| `decision-rights` | `steward`: immediate decision rights |

These are consolidated methods, not alias packages. For example, ask
“`$architecture` scan this area” or “`$architecture` specify this selected change”;
ask “`$software-engineering` implement this test-first” to select RGR. Herdr and
Simplified Technical English were retired at the owner's request.

## Other independent judgments

| Skill | Why it remains independently selectable |
| --- | --- |
| [engineering-restraint](engineering-restraint/SKILL.md) | Decide whether an addition earns its continuing cost, including non-code processes and workflows |
| [domain-modeling](domain-modeling/SKILL.md) | Pressure-test meaning against examples/code and preserve settled vocabulary and qualifying decisions |
| [diagnosing-bugs](diagnosing-bugs/SKILL.md) | Establish a symptom-specific signal and falsifiable cause; diagnosis does not select implementation |
| [github-evidence](github-evidence/SKILL.md) | Acquire complete PR/thread/CI evidence where ordinary porcelain is insufficient |
| [grafana-evidence](grafana-evidence/SKILL.md) | Acquire bounded telemetry with reproducible queries and explicit population limits |
| [write-custom-lint](write-custom-lint/SKILL.md) | Turn a proved repository policy into precise, tested mechanical enforcement |
| [grilling](grilling/SKILL.md) | Resolve consequential decisions in dependency-aware questioning rounds when requested |
| [designing-human-interfaces](designing-human-interfaces/SKILL.md) | Judge interaction and visual craft around the user's actual moment |
| [augment-design](augment-design/SKILL.md) | Apply Augment identity, composition, voice, assets, tokens, and branch-specific floors |
| [augment-workflows](augment-workflows/SKILL.md) | Express and operate Augment workflows against live product contracts and observed effects |
| [faithful-derivation](faithful-derivation/SKILL.md) | Preserve judgments and evidence from raw state through an AI work product and its publication gates |
| [humanize](humanize/SKILL.md) | Restore human voice without changing meaning; strict style remains an explicit mode |
| [writing-for-agents](writing-for-agents/SKILL.md) | Design reachability, instruction structure, judgment, demand, and verification |
| [creative-ideation](creative-ideation/SKILL.md) | Select a creative method that yields specific directions |
| [creative-shaping](creative-shaping/SKILL.md) | Apply the separately packaged deep method for transforming existing material |

The creative split is intentional and unchanged. Platform-specific rules remain
with their platform owners; evidence acquisition remains separate from the
judgment that consumes it.

## How the owners compose

```text
architecture ──reads──> software-engineering law/design/evidence
       scan ──owner selection──> spec ──implementation authority──> implementation

GitHub / Grafana evidence ──> review or diagnosis
                        └──> faithful reviewer-facing artifact

show-me ──known answer──> explanation
        └──open question──> experiment ──> learning, not production proof

steward ──live dispute──> standing and settlement
        └──durable need──> Intent / State / Record and real receipts
```

Shared references have one authoritative owner. Read them without silently
starting that owner's other workflows. Draft, local validation, independent
review, publication, deployment, and observed outcomes remain distinct receipts.

## Maintenance and verification

Run `ruby scripts/validate-skills.rb` for package metadata, owned Markdown links,
and [routing expectations](tests/invocation-cases.yml), including selected and
excluded branches within one owner. Run `ruby tests/validate-skills_test.rb` for
the validator's focused regression fixtures. These checks do not measure model
behavior or establish a host catalog reload.

[Refactor results](docs/intent-audit/results.md) and the
[function-to-owner map](docs/intent-audit/ownership-map.md) record the consolidation,
source preservation, observed probes, and limits. Publication is a separate action;
this refactor does not deploy the branch to an installed checkout or to Amp.
