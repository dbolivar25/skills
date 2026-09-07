# Consolidated skill suite

The repository now has **20 skill entry points**, from the original 29: seven
entry points were consolidated into shared owners, and Herdr plus STE were retired
by owner instruction. The work is local to `daniel/skill-suite-intent-audit`.

## Architecture changes

| Owner | Consolidation and writing change |
| --- | --- |
| [software-engineering](../../software-engineering/SKILL.md) | Standards, module design, TDD and simplify now share one owner. Testing evidence has one authoritative reference; TDD refactoring and ordinary finishing use one method. Branches retain language scope and selection boundaries. |
| [architecture](../../architecture/SKILL.md) | Scan and typed spec share an explicit-only entry. Scan keeps full evidence coverage; spec uses one contract/flow/file/test coverage map instead of repeated inventories. No scan-first requirement or automatic progression. |
| [review](../../review/SKILL.md) | Code judgment and review artifacts share one reconstruction method. Verdict, artifact rendering and live actions remain distinct; non-code review guides retain their scope. |
| [show-me](../../show-me/SKILL.md) | Explanation and prototyping share artifact selection. Known-answer visual forms and open-question logic/UI experiments remain complete branches. |
| [steward](../../steward/SKILL.md) | Immediate decision rights and durable coordination share ownership. The immediate branch does not create runtime state, reviewers, or mission obligations. |

[Writing-for-agents](../../writing-for-agents/SKILL.md) is rewritten around the
author's decisions: behavioral effect, reachability, hierarchy, clarity/demand,
and authoritative ownership. Its pedagogical distinctions and examples survive.
[Faithful derivation](../../faithful-derivation/SKILL.md) now separates entry
posture/routing, the shared derivation contract, task guides, explanations, and
recording templates.

Retained roots remain where their selection or platform ownership is useful:
causal diagnosis, necessity/cost judgment, domain modeling, evidence acquisition,
interviewing, interface craft, brand/platform discipline, human voice, creative
methods and mechanical enforcement. Their active callers now use the new owners.
The creative pair is unchanged. No compatibility stub preserves the retired
selection layout.

See [ownership-map.md](ownership-map.md) for original-function destinations and
[engineering-map.md](engineering-map.md) for the detailed engineering coverage.
README provides the new invocation names and branch choices.

## Verification

- Structural validator: **20 skills, 37 routing cases** pass. Cases distinguish
  required and excluded methods within a merged owner, not just package names.
- Validator regression fixtures: **4 tests, 19 assertions** pass, including nested
  links, explicit-host policy, and contradictory or missing branch expectations.
- `git diff --check` passes.
- Independent source review compared all five consolidated owners, authoring,
  derivation, supporting references and callers with `abd2767`. Two description
  trigger regressions were found and repaired. Re-review returned ADHERES and
  independently reran the 20-skill/37-case validator.
- [Seven paired task probes](probes/comparison.md) used separate fresh agents for
  original and current sources. Both preserved the consequential decisions and
  constraints; current routing kept immediate standing, known explanation,
  non-code artifacts and spec planning in their proper branches.
- [Preservation receipts](preservation-checks.json) confirm byte-identical creative
  packages, Steward runtime/tests/contracts, derivation explanations/templates/
  glossary, and Augment assets/token values. All package footprints fit the
  existing 128,000-byte Amp limit; no publication was performed.
- The earlier sentence-case label correction remains, with its
  [rendered specimen](evidence/labels.png) and computed `text-transform: none`.

These are source, structural, and qualitative task-response checks. The paired
probes are single runs, not statistical evidence of model improvement. Unchanged
runtime code was not revalidated as a new implementation. No live product,
installed catalog reload, deployment, or publication is claimed.

## Delivery

Only this repository changed. External installations, built-in packages,
plugin-managed packages and app-managed integrations are outside this delivery.
Nothing was pushed or merged. Local source completion is separate from installing
or publishing the consolidated catalog.
