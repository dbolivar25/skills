# Core/shell verification

Historical receipt for 849e56d. The later [creative consolidation](creative-consolidation.md)
updates the creative exception and library count.


Date: 2026-09-07. Baseline: 95b0a27. Scope: this repository's 30 skill packages;
28 converted modules and the two deliberately unchanged creative packages.

## Preservation and ownership

The [whole-library allocation](core-shell.md#whole-library-allocation) accounts
for every module. All 28 converted entry points reach their own core; required
domain methods remain reachable from that core. Source review compared the
working revision against the baseline in two independent review groups.

| Material | Current owner |
| --- | --- |
| Judgment previously mixed into entry points | Each module's `core.md`, with its existing domain references |
| Source acquisition, authority, effect and delivery loops | Each module's `SKILL.md` and selected operational branches |
| Review's former `branches/code-judgment.md` | `review/core.md` owns judgment; target selection and acquisition live in `review/SKILL.md` |
| Diagnosis's loop, instrumentation, fixes and cleanup | `diagnosing-bugs/operations.md`; the core owns reproduction adequacy, hypotheses, probe design and causal assessment |
| Augment asset, build, render and audit sequence | `augment-design/operations.md`; the core applies supplied brand law and observations |
| Testing law | Existing SWE references express proof obligations; shells execute checks and production migration paths |
| Glossary topology and brand prose | Passive format/voice references; domain shell creates files, voice composes `humanize/core.md` |
| Steward acceptance and durable state | Core assesses supplied projections; existing runtime and shell still own transitions, independent actors and receipts |
| Helpers, runtime code, schemas, tokens, assets and creative methods | Unchanged from baseline |

Review found and corrected transitive operational instructions in testing law,
restraint patterns, glossary topology and brand voice. Both reviewers rechecked
their findings and reported no remaining actionable issue in their assigned
surfaces. This is bounded review evidence, not proof that every future run will
respect the seam.

## Structural checks

- `ruby scripts/validate-skills.rb`: 30 skill invocation contracts and 59 cases
  passed. Cases distinguish operational invocation from reading a core/method.
- `ruby tests/validate-skills_test.rb`: 4 tests, 19 assertions, no failures.
- `git diff --check`: passed.
- A one-off traversal from all 28 cores reached 67 Markdown method/contract files.
  No path reached `SKILL.md`, an operations file/directory, or a branch directory;
  no reachable file was missing. Fenced project examples were excluded.
- Baseline diff inspection found no changes to creative packages, executable
  helpers, runtime code, schemas, tokens, assets, or existing validator tests.

The graph traversal checks explicit local Markdown links. It does not interpret
all prose or enforce tool restrictions. No runtime or semantic static analyzer
was added. The invocation corpus records expectations, not measured selection
accuracy.

## Bounded model probes

Two independent reviewers read the relevant core and method instructions, then
answered four supplied fixtures each without acquiring additional task evidence
or performing effects. The table records their observed answers, not merely the
expected behavior declared in the routing corpus.

| Supplied fixture | Observed core result |
| --- | --- |
| Endpoint reportedly returns 500; curl is planned, with no output or failing test | Reproduction evidence needed before hypotheses: environment/input, actual symptom output, assertion, frequency and minimization evidence |
| Owner selected blue for an authorized reversible mockup; agent prefers green; no new facts | Owner judgment; `PROCEED` with blue, with no renewed challenge |
| Head h2; successful CI only for h1; required h2 check pending | More evidence needed; pending is not failed, old success is not current proof; require completed h2 result and substantive review coverage |
| Sept 1 launch approval; same owner withdraws approval Sept 6; claim says approval remains | Claim contradicted; proposed replacement reports the Sept 6 withdrawal, without inventing reapproval or launch date |
| Old/new uncertainty-preservation instructions; source pairs planned, no measurements, omission/verbosity tradeoff unsettled | Concrete paired comparison plan, source and execution needs, and an owner tradeoff; no improvement claim or invented numeric threshold |
| Account means organization; proposed UserAccount means login; one organization has many logins; context map exists but contents absent; discussion only | Preserve Account, propose unsettled login term, request map contents as evidence; no recorded decision, file creation or direct owner question |
| Promotional Augment copy; supplied fact is 12 unresolved decisions with linked meeting records; no render/audit | “12 unresolved decisions, with linked meeting records.” Proposed copy only; no visual compliance claim |
| Proposed keyboard interaction without concrete semantics or runtime/render receipts | Experiment needs for actions, initial/expected focus, states and observations; no claim that focus behavior works |

The second reviewer also walked the review and domain shells: discoverable facts
are acquired by the shell, changed heads/files are rechecked before effects, and
discussion-only modeling returns proposed deltas without writing them.

These are eight single-pass instruction-following probes plus two source
walkthroughs. They did not execute live shell integrations, compare old/new
behavior over repeated runs, measure routing reliability, or reload an installed
skill catalog. They support the specific boundary behaviors above; they do not
establish a general quality improvement or enforced purity.
