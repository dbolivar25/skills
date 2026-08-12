# Skill library

This is the human maintenance map for the skill library. It explains why each
entry point exists, how the capabilities compose, and who owns a judgment. It
is not an agent router and does not replace any skill's invocation contract.

The runtime catalog is intentionally flat so the model can discover broad
capabilities. The maintenance model is smaller: independent capabilities at the
top, specialized branches and shared references underneath them, and explicit
authority wherever several skills collaborate.

## Invocation modes

- **Model** skills may load autonomously. Their descriptions state **when** to
  load and **why** default context is insufficient.
- **User only** skills load only when the owner invokes them. Their descriptions
  are concise human-facing menu labels.
- A branch that does not need independent discovery belongs inside its parent
  package as a reference, not as another catalog entry.

The groupings below are maintenance homes, not exclusive layers. Some skills
serve more than one role.

## Continuity and judgment

| Capability | Invocation | Owns |
| --- | --- | --- |
| [`steward`](steward/SKILL.md) | Model | Durable owner Intent, accepted State, append-only Record, and distinct correctness, delivery, and landing receipts. |
| [`engineering-restraint`](engineering-restraint/SKILL.md) | Model | Whether proposed machinery earns its continuing ownership cost. |
| [`grilling`](grilling/SKILL.md) | Model | Explicit, dependency-aware questioning of an idea, plan, or decision. |
| [`domain-modeling`](domain-modeling/SKILL.md) | Model | Domain language, invariants, examples, boundary pressure tests, glossary, and qualifying decisions. |

## Creative exploration and learning

| Capability | Invocation | Owns |
| --- | --- | --- |
| [`creative-ideation`](creative-ideation/SKILL.md) | Model | Selecting and running a named method to generate or sharpen directions. |
| [`creative-shaping`](creative-shaping/SKILL.md) | Model | Deep transformation of existing material through expansion, selection, subversion, remixing, or synthesis. |
| [`prototype`](prototype/SKILL.md) | Model | Disposable implementations built to answer a question rather than establish production architecture. |

`creative-shaping` is intentionally separate from `creative-ideation`: it is a
large existing-work method branch with its own observable trigger, not duplicate
routing policy.

## Engineering design and execution

| Capability | Invocation | Owns |
| --- | --- | --- |
| [`codebase-design`](codebase-design/SKILL.md) | Model | Deep-module vocabulary and judgment about interfaces, seams, depth, ownership, locality, and testability. |
| [`coding-standards`](coding-standards/SKILL.md) | Model | Correct-by-construction TypeScript law and acceptable testing evidence. |
| [`improve-codebase-architecture`](improve-codebase-architecture/SKILL.md) | User only | A read-only scan that ranks evidence-backed ownership moves without designing or implementing them. |
| [`tech-spec`](tech-spec/SKILL.md) | User only | A typed call-stack architecture handoff; design only. |
| [`tdd`](tdd/SKILL.md) | Model | Test-first vertical slices when the owner explicitly chooses Red-Green-Refactor or test-driven behavior. |
| [`simplify`](simplify/SKILL.md) | Model | A behavior-preserving readability pass inside already-authorized mutation scope. |
| [`write-custom-lint`](write-custom-lint/SKILL.md) | Model | Turning a proved, mechanically recognizable repository policy into a tested Biome GritQL rule. |

## Evidence, diagnosis, review, and publication

| Capability | Invocation | Owns |
| --- | --- | --- |
| [`github-evidence`](github-evidence/SKILL.md) | Model | Complete live PR state, review-thread state, and CI failure evidence where ordinary `gh` output is incomplete. |
| [`grafana-evidence`](grafana-evidence/SKILL.md) | Model | Reproducible, bounded production telemetry with explicit query receipts and coverage limits. |
| [`diagnosing-bugs`](diagnosing-bugs/SKILL.md) | Model | Reproduction signals, ranked hypotheses, and a verified cause; diagnosis does not grant fix authority. |
| [`code-review`](code-review/SKILL.md) | Model | The current correctness and merge verdict, including specialized dependency-bump analysis. |
| [`reviewability`](reviewability/SKILL.md) | Model | Faithful review artifacts, including a live branch-grounded pull-request description branch. |

## Interfaces, language, and specialized systems

| Capability | Invocation | Owns |
| --- | --- | --- |
| [`designing-human-interfaces`](designing-human-interfaces/SKILL.md) | Model | Generic interaction and visual craft: the user's moment, floor, facets, states, motion, and perceived performance. |
| [`augment-design`](augment-design/SKILL.md) | Model | Augment identity, voice, privacy, evidence treatment, tokens, assets, branch floors, and rendered QA across branded surfaces. |
| [`humanize`](humanize/SKILL.md) | Model | Truth-preserving repair of synthetic prose while protecting the intended human voice. |
| [`simplified-technical-english`](simplified-technical-english/SKILL.md) | Model | Controlled English for reliable parsing by agents, systems, translation paths, and non-native readers. |
| [`show-me`](show-me/SKILL.md) | Model | The smallest useful diagram, code-shape sketch, or focused HTML artifact when prose hides a material relationship. |
| [`writing-for-agents`](writing-for-agents/SKILL.md) | Model | Invocation contracts, context pointers, information hierarchy, and completion criteria in documents that direct agents. |
| [`augment-workflows`](augment-workflows/SKILL.md) | Model | Executable Augment and Decision Site workflow graphs, nodes, expressions, lifecycle, validation, and side effects. |
| [`faithful-derivation`](faithful-derivation/SKILL.md) | Model | Evidential fidelity from operational state through judgments, support, confidence, publication gates, and evals. |
| [`herdr`](herdr/SKILL.md) | Model | Explicitly targeted Herdr inspection or control with session, workspace, mutation, and landing authority anchored first. |

`humanize` and `simplified-technical-english` are alternatives, not parent and
branch. The first protects voice; the second deliberately constrains language
when unambiguous parsing matters more than voice.

## Composition map

The arrows show evidence or judgment flowing to the owner on the right. They do
not transfer mutation or publication authority.

```text
grafana-evidence ──> diagnosing-bugs ──> cause
grafana-evidence ──> code-review ──> verdict
github-evidence ──> code-review ──> verdict
github-evidence ──> reviewability ──> review artifact

diagnosing-bugs ──> improve-codebase-architecture
                               └──> tech-spec ──> tdd ──> simplify

creative-ideation ──> creative-shaping

faithful-derivation ──┐
augment-workflows ────┼──> an executable, evidence-faithful work product
augment-design ───────┤
designing-human-interfaces ─┘
```

`steward` can preserve owner intent and accepted receipts around any long-lived
chain. It does not replace the leaf skill's domain judgment.

## Authority map

| Responsibility | Primary owners | Boundary |
| --- | --- | --- |
| Acquire evidence | `github-evidence`, `grafana-evidence`, targeted Herdr reads | Evidence does not decide the final verdict or cause. |
| Diagnose | `diagnosing-bugs` | A verified cause does not authorize a fix. |
| Judge | `code-review`, `engineering-restraint`, `domain-modeling`, `codebase-design` | Judgment does not itself authorize mutation or publication. |
| Design | `improve-codebase-architecture`, `tech-spec`, interface and workflow design skills | A design artifact is not implementation evidence. |
| Mutate | `tdd`, `simplify`, `write-custom-lint`, workflow or Herdr operations | Mutation requires authority from the surrounding task and remains inside its scope. |
| Communicate | `reviewability`, `show-me`, language skills | Drafting an artifact does not publish it or supply the underlying verdict. |
| Accept and land | The owning task, or `steward` when continuity warrants it | Local checks, review, delivery, and observed landing are separate receipts. |

## Evolving the library

A new model-invoked skill must earn permanent context with both:

1. a distinct observable trigger; and
2. a distinct judgment, protection, or authority that default context and its
   nearest neighbor do not provide.

Otherwise, place the behavior in an existing skill, behind a branch reference,
in repository instructions, or in ordinary model behavior.

Retire an entry point when its unique judgment has moved to a stronger active
home or its body only restates reliable default behavior. Preserve history in
Git rather than maintaining a second active archive. Rename a skill when its
human handle hides the capability, but do not normalize names merely for visual
symmetry.

## Invocation cases

[`tests/invocation-cases.yml`](tests/invocation-cases.yml) records reviewable
expectations for neighboring skills:

- `primary` owns the requested outcome;
- `also_load` supplies distinct supporting judgment; and
- `do_not_load` names the nearest plausible capability that should stay out.

The corpus includes positive, negative, and collision cases and accounts for
every active skill. When topology or an invocation contract changes, update the
cases and run:

```sh
ruby scripts/validate-skills.rb
```

The validator proves package structure, invocation-contract shape, case schema,
referential integrity, and coverage. The cases remain reviewed expectations;
deterministic validation does not prove that a particular model will route every
prompt correctly.
