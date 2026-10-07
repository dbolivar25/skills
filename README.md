# Personal skills

Fifteen entry points own complete jobs. Each entry selects detailed methods only when the job needs them. Always applicable collaboration and decision rules live in the Codex working agreement. Managed skills and plugins are unchanged.

| Skill | Job |
| --- | --- |
| [Steward](steward/SKILL.md) | Durable intent, changing support, real agents, independent acceptance and evidence of completion |
| [Engineering](engineering/SKILL.md) | Implementation, refactoring, upgrades, architecture, domain/module design and typed specifications |
| [Review](review/SKILL.md) | Code, plans, research and reported results; falsification, claims and requested grilling |
| [Debugging](debugging/SKILL.md) | Reproduction, causal probes, production diagnosis and verified corrections |
| [Interface Design](interface-design/SKILL.md) | Interaction, visual craft, states, motion, accessibility and useful prototypes |
| [Augment Design](augment-design/SKILL.md) | Augment identity, voice, fonts, assets, tokens and format-specific production quality |
| [GitHub](github/SKILL.md) | Complete PR evidence, conversations, CI and requested platform operations |
| [Grafana](grafana/SKILL.md) | Bounded reproducible metrics, logs, traces and profiles |
| [Augment Workflows](augment-workflows/SKILL.md) | Live product contracts, explicit graphs, operation authority and observed outcomes |
| [AI Engineering](ai-engineering/SKILL.md) | Typed AI judgments, faithful derivation, provenance, durable state and publication |
| [Evaluation](evaluation/SKILL.md) | Representative comparisons, independent judgments, failure analysis and ablations |
| [Writing](writing/SKILL.md) | Substantive drafting, voice, faithful compression and reviewer-facing explanations |
| [Writing for Agents](writing-for-agents/SKILL.md) | Invocation, executable demands, conditional context and instruction packaging |
| [Creative Ideation](creative-ideation/SKILL.md) | The complete 22-method library, exercises and concrete creative work |
| [Diagram Design](diagram-design/SKILL.md) | Polished standalone diagrams, source imports, semantic forms, skins and export |

## What changed

The October 2026 redesign consolidated 36 public entries into 15. Detailed methods, examples, teaching material, brand assets and useful tools remain reachable through conditional pointers. Steward's runtime, CLI, tests, fixture and default rules retain their original bytes.

The cuts remove the shared composition protocol, generic assessment envelopes, compulsory global checklists and unsupported universal gates. They also remove standalone selection overhead for methods now owned by these jobs. The complete source dispositions and disclosed losses are in the [migration account](docs/skills-redesign.md) and [resource manifest](docs/skills-redesign.json).

The first version is committed as `fc4b475`. The [second-pass account](docs/skills-second-pass.md) explains the substantive reference improvements and further cuts, committed as `546b6ac`. Its [file-level evidence](docs/skills-second-pass.json) is a historical snapshot of that accepted stage. The [final cleanup](docs/skills-final-cleanup.md) extracts portable TypeSafe ideas into AI Engineering and removes the optional blank AI review form. Diagram Design retains its complete kit.

These are local installed files. Discovery, invocation permission and content loading are separate host mechanisms. A chat that began with the previous catalog may need a fresh session to discover the new names. No host refresh or measured improvement in model quality is claimed.

## Validate the library

Run from this repository:

```bash
ruby scripts/validate-skills.rb
ruby tests/validate-skills_test.rb
ruby tests/creative-package_test.rb
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s steward/tests
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s github/tests -p '*_test.py'
node --test augment-design/checks/audit.test.mjs
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s diagram-design/tests
scripts/publish-amp --check-working-tree
```

The validator checks metadata, owned files and Markdown heading targets, entry pointers, the approved catalog/resource bindings, protected Steward hashes and invocation-case specifications. The 82 routing cases are reviewed expectations, not measured model-routing results. Runtime/helper regressions and actual rendered inspection establish their stated coverage; comparative task quality needs separate evidence.

## Distribution

The full local collection includes its cross-package methods and assets. Install the collection coherently; publishing an isolated package does not make a sibling reference available.

The existing Amp filter excludes WOFF2 fonts, Diagram Design, package-local development tests and the brand audit fixtures. Root validation and documentation files remain in the projection. `--check-working-tree` checks the actual local projection without commits or network access. Publication still uses an explicit committed revision and the configured Amp remote. No publication was performed during this migration. The filtered projection is not full local asset parity.
