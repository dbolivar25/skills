# Verification record

Date: 2026-09-08. Baseline: `c9def15`. Scope: the local shared skill library and
its callers, invocation expectations and architecture documentation.

## Source preservation and ownership

The library has 33 skill interfaces: 21 core skills and 12 operational skills.
All 29 former `core.md` files have been removed. Reusable methods live in their
skill entry points; workflow-specific judgments live with the workflow. Four
new interfaces expose engineering judgment, verification design, causal reasoning
and experiment design.

Two independent source reviews compared the changes with the baseline. One
covered engineering, review, scan/spec, diagnosis, experiments and platform
evidence. The other covered derivation, writing, design, creativity, domain and
authority judgments, conversation and stewardship. Their comparisons checked
methods and stopping boundaries, not just headings or file counts.

The reviews identified two material reachability/scope issues:

- The moved independent-design procedure was reachable from implementation and
  specification but missing from ad hoc module design. Module design now returns
  its named acquisition route when independent alternatives are requested.
  The operational caller conducts the exploration without selecting a full spec.
- Augment copy-only requests could inherit surface rendering obligations. Copy
  now has a separate voice/humanize route and stopping boundary. The initial
  request guard recognizes copy as well as surfaces and resources. Surface
  production still requires actual renders, audit observations and disposition.

Targeted rereads confirmed the corrected boundaries. The final copy guard was
also inspected after the reviewer identified its earlier wording. No other
actionable preservation findings remained in the reviewed scopes.

Engineering standards, independent-oracle and regression-preservation examples,
reproduction gates, scan coverage/ranking, typed specification coverage, creative
methods and attribution, derivation obligations, and separate action receipts
remain represented. Runtime code, executable helpers, token stylesheets, assets
and schemas have no changes against the baseline. The creative regression suite
checks all 22 named routes and the selected package budget.
All 11 fenced examples from the former cores and moved engineering references
remain present, allowing whitespace differences.

## Local checks

- `ruby scripts/validate-skills.rb`: 33 skills and 74 invocation cases validated.
- `ruby tests/validate-skills_test.rb`: 4 tests, 19 assertions, no failures.
- `ruby tests/creative-package_test.rb`: 2 tests, 70 assertions, no failures.
- Markdown link inspection covers the changed documentation as well as the skill
  files; fenced project examples are excluded.
- A traversal of explicit core Markdown links reached 81 files and found no path into an operational
  `SKILL.md`. Core results may return a named operational acquisition route;
  that pointer is not an instruction to execute the method from the core.
- `git diff --check`: no whitespace errors.

The link traversal checks paths. It does not interpret every prose directive or
enforce tool restrictions. The invocation corpus specifies expected selections;
the validator does not measure whether a model makes them.

## Bounded instruction probes

An independent reviewer traced five hypothetical inputs through the instructions.
These are analytical model responses, not live executions or a controlled
baseline/candidate evaluation.

| Input | Result supported by the instruction trace |
| --- | --- |
| Supplied Augment copy without a render | Voice and strict humanize produce proposed copy. The review exposed the surface-scope ambiguity; the corrected copy branch stops before interface/render/audit work. |
| An Augment interface implementation | The implementation caller reaches brand production checks, owns copying/building/rendering/audit, and supplies actual observations for assessment. |
| A derivation design with no actual output or source samples | The result is a design, future support policy, eval plan and precise evidence needs; it cannot establish observed quality or actual claim support. |
| A claim whose evidence is given as file paths | The surrounding task reads the files and resolves obtainable needs. The core assesses supplied content; it does not make the user assemble available evidence. |
| A September 1 commitment followed by its September 4 withdrawal | Chronology, actor/scope and both source pointers survive. The supported current statement is that the commitment was withdrawn, rather than a lower confidence score attached to the old promise. |

These probes help expose contradictory instructions and missing ownership. They
do not establish routing accuracy, tool compliance across future runs, browser
behavior or the quality of a deployed workflow. No rendered surface was built or
audited for this refactor.

## Remaining evidence

The edited skills and new interfaces are present in the local library. Catalog
reload in another task or host was not observed. No package publication, remote
push or installed-host comparison was performed.

To measure the behavioral improvement, run the accepted proposal's representative
tasks against baseline and candidate under matching conditions. Inspect actual
tool use, caller burden, information loss, output and meaningful exclusions. Keep
those observations separate from the structural and source-review receipts here.

## Steward documentation redesign

Steward's entry point now owns the common operating method. The separate durable
branch is removed; runtime, collaboration, and review references have task-based
names, and a worked example connects CLI commands to changed assumptions and
completion evidence. Invocation expectations and the ownership map use the new
paths.

Verification for this documentation change:

- All 10 shell blocks in the worked example ran in sequence in both Bash and
  Zsh, using temporary records. Displayed next responsibilities and state
  excerpts matched CLI output, including completion, reopening, and an owner Ask.
- `python3 -m unittest discover -s steward/tests -v`: 22 tests passed.
- The skill validator passed for 33 skills and 74 invocation cases; its four
  regression tests and the two creative package tests also passed.
- All 18 local links and anchors across the five Steward documents resolved.
- Seven runtime, rule, test, and metadata files matched the pre-redesign snapshot
  byte for byte.
- An independent reviewer compared the documentation with that snapshot,
  including authority, review criteria, actor provenance, support withdrawal,
  intent revision, and receipt reopening. Its stale invocation-path finding was
  fixed; the targeted follow-up review found no remaining semantic loss.

The walkthrough uses fictional reports and evidence to exercise real runtime
transitions. These checks establish documentation consistency and executable
examples, not improved performance on live agent tasks. No runtime behavior,
publication, or host reload is claimed by this redesign.
