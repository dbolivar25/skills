# One creative skill within the package budget

Baseline: 849e56d. Date: 2026-09-07. The owner reopened the previously excluded
creative pair and selected a maximum of 20 files for the combined skill. This is
a working constraint, not a confirmed current Amp file-count limit. The existing
publisher's 128,000-byte content-plus-path limit also applies.

## Result

One invocation, `creative-ideation`, owns new ideas and shaping existing material.
`creative-shaping` is retired without an alias package. The library now has 29
skills, all with a core/shell boundary.

The creative package contains 20 files and occupies 126,416 bytes under the
publisher's calculation (125,456 content bytes). This leaves 1,584 bytes of byte
headroom and no file-count headroom. Changes that exceed either budget must earn
space through consolidation or revisit the constraint; do not silently drop a
method, example or source to pass a limit.

## Allocation

Six common files:

- `SKILL.md`: brief/source acquisition, owner interaction, real operations and
  requested follow-through.
- `core.md`: supplied-input transformation, method application and result quality.
- `references/routing.md`: one selection owner, precedence, prerequisites,
  method index, close alternatives, rare stacks and excluded defaults.
- `references/anti-slop.md`: shared specificity, surprise and usefulness tests.
- `references/full-prompt-library.md`: complete constraint-dispatch library.
- `references/exercises.md`: time-boxed activities, expected outputs and actual
  observation requirements.

Fourteen method files preserve all 22 complete original named method bodies:

| File under references/methods | Named methods |
| --- | --- |
| constraints.md | OuLiPo; SCAMPER |
| provocation.md | Lateral Provocations; Pataphysics |
| remix.md | Chance and Remix; Defamiliarization |
| invention.md | TRIZ; Biomimicry |
| problem-solving.md | First Principles; Pólya |
| systems.md | Leverage Points; Pattern Languages |
| selection.md | Premortem and Inversion; Compression Progress |
| practice.md | Creative Discipline; Oblique Strategies |
| derive-and-mapping.md | Dérive and Mapping |
| volume-generation.md | Volume Generation, including Seeded Range |
| jobs-to-be-done.md | Jobs to Be Done |
| affinity-diagrams.md | Affinity Diagrams |
| analogy-and-blending.md | Analogy and Blending |
| story-skeletons.md | Story Skeletons |

Paired files are reference storage, not compound invocations. Routing names an
exact section. The tradeoff is that a whole-file read may include the neighboring
method; instructions explicitly forbid treating co-location as method selection.
The shared suite core/shell contract remains an external method dependency,
as with the other suite modules; it is not a hidden second creative package.

## What changed semantically

The old entry point, heuristics and catalog overlapped in routing and could
disagree about overrides or stacking. One precedence now governs: explicit method,
requested method recommendation, mood/high-slop override, then phase/domain.
Prerequisites remain gates. A named SCAMPER invocation without a base returns
that missing input instead of switching methods or fabricating a base. Conflicting
signals justify two methods only when they have distinct jobs; they do not
mechanically force a stack.

Method recipes include operations and human practice. The core proposes those
activities or consumes supplied observations; the shell owns actual research,
randomness, independent generation, interviews and execution. An exercise's
scheduled duration cannot establish that the exercise happened. A chosen direction
ends ideation and returns to the task's authorized making work.

The quality reference consolidates repeated checks while retaining its examples,
five-test diagnostic, final checklist, rejection thresholds, real failure modes,
grounded option and concrete-medium requirement. It distinguishes invented
creative particulars from purported historical or field evidence. The exercise
reference retains every original activity and its steps/duration/output, with
more compact presentation and explicit limits on claimed incubation or delivery.

## Verification

- One-off source comparison against the saved baseline found every one of the
  22 full method bodies intact after excluding the added core-use scope sentence.
  Worked examples, exclusions, procedures and attribution remain. The constraint
  library is byte-identical.
- All relative creative links and named heading anchors resolve.
- `ruby tests/creative-package_test.rb`: 2 tests, 70 assertions passed. Covers
  20 files, the publisher's byte calculation, retirement of the extra invocation,
  and all 22 named method routes.
- `ruby scripts/validate-skills.rb`: 29 skills and 64 invocation cases passed.
- `ruby tests/validate-skills_test.rb`: 4 tests, 19 assertions passed.
- `git diff --check`: passed.

Source walkthroughs covered blank-page dispatch, existing-base SCAMPER, requested
method recommendation, high-slop provocation, missing dérive observations and
Seeded Range. The caller in interface-design still reaches Seeded Range at its
unchanged file path. New declarative routing cases cover these boundaries.

These are preservation, structural and source-walkthrough receipts. There is no
independent model comparison establishing equal or improved creative output,
no live exercise or randomness integration test, and no Amp upload/reload receipt.
The package has been consolidated locally; publication and installation are
separate actions.
