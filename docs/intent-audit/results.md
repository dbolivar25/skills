# Repository refactor results

Scope: only this skills repository. Baseline `abd276763cd80ceed29c29d1f4331e4173709744`,
branch `daniel/skill-suite-intent-audit`. The owner excluded external installations,
pet skills, built-in packages, and managed integrations. None were changed during
this fresh refactor. Earlier discarded work remains parked on its separate branch.

## Dispositions

| Skills | Result and preserved purpose |
| --- | --- |
| Herdr; Simplified Technical English | Removed by owner instruction; catalog/cases updated. No replacement package added. |
| writing-for-agents | Kept trigger, structure, demand/legwork, examples, context pointers, leading words, no-op test, and scripts/judgment boundary. Corrected host-specific selection mechanics and unsupported universal claims about negation and stable labels. |
| improve-codebase-architecture; tech-spec | Kept distinct explicit workflows and full methods. Added Codex explicit-invocation metadata. Tech spec now follows grilling's dependency-frontier rounds. |
| tdd; codebase-design | Kept workflow and architecture judgments. Persistence evidence follows the owning interface; old tests retire only with equivalent behavior coverage; method length alone does not justify helpers. |
| simplify | Kept authorized finishing scope, two-way vocabulary, comment rules, and code structure. Shorter names and merged shapes must preserve real meaning and ownership. |
| code-review; reviewability | Acquisition points to github-evidence while verdict stays with review. Full internal investigation remains required; visible PR structure follows reviewer need, with final aggregate, visual, and benchmark examples. |
| faithful-derivation | Kept all completion criteria, main method, glossary, references, templates, and discriminating examples. Required reading now sits before its governed decisions; optional interview questions cannot bypass translation prerequisites. |
| augment-design | Prose callers route to humanize. Label foundation, specimen, and `.aug-label` utility follow existing sentence-case law. Assets and token values remain unchanged. |
| prototype | Kept both complete methods and artifacts. Main and branch handoffs preserve learning without implying production authority or proof. |
| augment-workflows; coding-standards; decision-rights; designing-human-interfaces; diagnosing-bugs; domain-modeling; engineering-restraint; github-evidence; grafana-evidence; grilling; humanize; show-me; steward; write-custom-lint | Retained unchanged after source review. No source-supported need to rewrite their distinct methods. Generic UI guidance already defers to actual product precedent, so another precedence rule was unnecessary. |
| creative-ideation; creative-shaping | Byte-identical, as directed. |

Eleven packages received targeted corrections, sixteen were retained unchanged,
and two were retired. Every surviving description is byte-identical to baseline.
[Inventory](inventory.json) records each disposition and original main hash.

## Observed verification

- `ruby scripts/validate-skills.rb`: 27 skills and 30 invocation cases pass.
  This validates corpus structure and references, not model routing accuracy.
- `ruby tests/validate-skills_test.rb`: 3 tests, 12 assertions pass. Fixtures catch
  broken nested references, ignore fenced target-project examples, reject absent
  or malformed explicit-host policy, and preserve unrelated metadata.
- `git diff --check`: passes.
- [Preservation checks](preservation-checks.json): surviving descriptions, creative
  pair, all derivation completion criteria, unchanged derivation method/reference/
  template bodies, authoring section structure, and brand assets/token values.
- Chromium rendered the [label specimen](evidence/labels.png); both labels had
  computed `text-transform: none`. Visual inspection confirmed readable sentence
  case without clipping. The related utility declaration uses the same casing.
- Independent shared-diff review found two caller gaps, both corrected: interview
  translation reading could be skipped and prototype branches implied promotion.
  Bounded re-review returned ADHERES, HIGH confidence.

## Fresh execution probes

A separate agent read current instructions without the audit or diff and produced
actual task decisions for these scenarios:

| Scenario | Observed result |
| --- | --- |
| Write-only durable insertion | Kept an independent real-connection database observation; distinguished committed persistence from unavailable read API and untested crash durability. |
| Unique cancellation regression | Retained old evidence until equivalent cancellation coverage exists at the owning seam. |
| Observed versus saved disk content | Preserved distinct names and ownership despite matching fields. |
| Small stale-selection fix | Produced two concise sentences stating final behavior and the stipulated focused regression. |
| Speculative email with revoked quote and exact date | Separated candidate generation from permissions-gated publication; invalidated revoked support; preserved exact commitment and provenance through payloads. |
| Prototype-only state-machine demo | Delivered learning and runnable artifact; did not treat the result as implementation authority. |

These are single fresh responses to stipulated scenarios, not repeated statistical
measurements, a with/without comparison, live product tests, or proof of every
invocation expectation. They support preservation of the changed distinctions;
no general model-performance improvement is claimed.

## Delivery boundary

Changes are local to this branch. No push, merge, publication, or installed-skill
reload is part of this delivery. Local source verification is not evidence that a
running host has refreshed its skill catalog.
