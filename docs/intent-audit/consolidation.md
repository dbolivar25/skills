# Consolidated suite design

The previous maintenance commit is an intermediate correction, not completion.
The owner wants consolidation, improved prose, and a coherent suite architecture.
Distinct methods may be branches of one skill. Preserve the work they demand;
do not preserve separate packages merely because their methods differ.

## Proposed owners

| Owner | Absorbs | Why this is one owner; branches that remain distinct |
| --- | --- | --- |
| software-engineering | coding-standards, codebase-design, tdd, simplify | How implementation earns correctness and comprehensibility. Engineering law is shared; interface design, explicitly selected RGR, and verified finishing are separate branches. TDD refactoring and simplify become one finishing method. A code-comment clarity request also enters finishing; read-only work returns findings. TypeScript law remains scoped to TypeScript, while design and finishing retain their broader language reach. |
| architecture (explicit-only) | improve-codebase-architecture, tech-spec | Read-only architectural discovery and typed design handoff. Scan and specification share engineering vocabulary/evidence but retain separate selection and stopping boundaries. Existing sufficient context enters spec directly; insufficient context enters grilling, not a mandatory preliminary scan. |
| review | code-review, reviewability | Prepare another person's judgment from a faithful model of the work, or issue a code verdict. One reconstruction method feeds an artifact branch and a code-judgment branch; drafting never silently becomes judging or publishing. GitHub acquisition remains github-evidence. |
| show-me | show-me, prototype | Use a visible artifact to explain an established relationship or explore an unsettled one. Known-answer explanation, logic experiment, and UI experiment remain explicit branches. The question chooses the artifact and proof. |
| steward | steward, decision-rights | Keep decisions with their owners. A live dispute uses standing and settlement without runtime state; a mission needing durable coordination uses Intent/State/Record. Reading the immediate branch never creates a mission or reviewer gate. |

This produces 20 entry points from the current 27 as a consequence of ownership,
not a target count. Remove retired package directories, migrate every active
caller and invocation case, and explain changed invocation names in README.
No compatibility stub keeps the old selection architecture alive.

## Internal writing and structure

- **software-engineering:** short common contract and observable branch triggers;
  one authoritative engineering law, one design vocabulary, one testing evidence
  reference, and one finishing method. Preserve all eleven standards and full
  semantic applicability sweep. Keep examples, real-adapter evidence limits,
  unique regressions, alternative-generation briefs and the vertical RGR loop.
- **architecture:** boundary → investigation → synthesis → handoff. Preserve all
  inventory categories, governing-source discovery, evidence halo, trace coverage,
  ranking across the boundary and five-or-zero output. Spec owns one coverage map
  of contracts/flows/files/tests rather than repeating that inventory in multiple
  outlines. Preserve typed examples, all affected paths and vertical test plan.
- **review:** reconstruct once from authoritative source and request. A shared
  working map carries every material region, evidence and uncertainty. Code
  judgment adds two axes, falsification and severity. Artifact rendering adds
  reviewer-oriented shape and fidelity audit. Keep all dependency lens and live
  action detail, but remove repeated source-acquisition checklists from callers.
- **show-me:** artifact-selection table and clear explanation/experiment boundary.
  Keep the complete diagram examples and both experiment methods, structural
  variation, state visibility, free play, guided scenarios, safe scratch data,
  artifact capture and promotion authority. Experiments may use lightweight
  visuals; explanations do not inherit prototype no-tests rules.
- **steward:** standing and durable coordination share owner/authority semantics,
  with separate reliable entry conditions. Keep runtime code/tests unchanged and
  every collaboration/sharpening/support/receipt contract. Co-locate immediate
  challenge and settlement; runtime and independent review apply only to the
  durable branch. Avoid repeating the authority taxonomy in both branches.
- **writing-for-agents:** rewrite around the author's decisions: behavior and
  reachability, structure and loading, precise/demanding instructions, and
  validation/pruning. Keep the pedagogical distinctions and concrete examples;
  the current reference is a source, not a required paragraph arrangement.
- **faithful-derivation:** main owns the backward-design posture and task routing;
  one shared derivation contract owns the invariant obligations, and each guide
  applies it to design, interview, review or implementation. References explain;
  templates record. Keep every field and discriminating example. Change their
  ownership and prose rather than repeating the full method in main and guides.

Other roots remain when selection and ownership are better served independently:
platform-specific Augment discipline/identity; domain modeling; necessity/cost
judgment; causal diagnosis; evidence acquisition; human voice repair; creative
methods; interface craft; interviewing; mechanical enforcement. Their shared
callers must migrate. The creative pair stays byte-identical.

## Acceptance

For each merge, map old function to new owner and branch, including entry/exit
policy. Test positive selection, excluded neighbor, and a combined task. Check
that ordinary engineering does not start TDD, a scan does not start a spec, a
review guide does not issue or publish a verdict, an explanation does not impose
experiment rules, and an authority dispute does not create Steward runtime.

Compare representative original and new task outputs where behavior preservation
is at issue. Validate paths, host metadata, branch-aware invocation cases and
changed executable consumers. Independent review challenges lost demand and
incorrect consolidation, not just broken links. Report source checks separately
from model probes, runtime tests and catalog reload.
