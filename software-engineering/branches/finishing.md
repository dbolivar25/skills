# Finishing

Reduce the concepts and reading effort a maintainer must carry without changing
behavior or public contracts. This method serves a verified implementation,
the refactor step of TDD, a branch review, or a standalone code/comment clarity
request. Review the current branch or the user's specified scope.

## Establish the working mode

State the applicable mode before changing anything:

- **Authorized edits:** simplify inside the existing implementation or requested
  cleanup scope. Run relevant existing checks afterward. In TDD, start from green
  and rerun relevant tests after each refactor step.
- **Read-only findings:** during review, diagnosis, explanation or other read-only
  work, describe the simplification without editing.

A proposed behavior, compatibility or architecture change returns to the owning
task. This finishing pass does not authorize it. Do not require a completed TDD
loop for an ordinary code-comment request.

## Make the concepts carry their own meaning

- **One word per concept, one concept per word.** If `sync` means pulling remote
  changes, use a different term for flushing edits to disk.
- **Cut redundant context, keep distinctions.** A `workspaceWatcher` module does
  not need `startNativeWorkspaceWatcher`. Use `baseline` only where the contract
  identifies which baseline; retain `lastObservedDiskContent` when saved and
  remote baselines also exist.
- **Prefer short, familiar and active prose.** Orwell's rules apply to names and
  comments: cut removable words, prefer a short word to a long one, active voice
  to passive, and everyday English to unnecessary jargon. Prefer “run,” “watch,”
  “stop,” or “drop” when exact; retain a technical or domain term when replacing
  it would erase meaning.
- **Explain what code cannot show.** Add a comment for non-obvious implementation
  or constraints, and a doc comment for complex behavior or side effects. Remove
  self-evident narration and conversational change history. For TypeScript public
  exports, the documentation obligation in [standards](../../engineering-judgment/references/standards.md)
  still applies.

## Reduce the structure the reader must learn

- Lead a file with exported or significant functions; put helpers below them.
- Split a large file by coherent concepts, not by line count. A long method may
  expose a responsibility or proof surface; moving branches into private helpers
  alone does not reduce either.
- Combine types, functions and constants that represent **the same concept with
  the same owner and reasons to change**. Similar syntax or fields do not prove
  shared ownership. Consolidate duplicated policy on that basis.
- Check existing libraries and utilities before inlining another implementation.
- Deepen shallow modules; move logic toward the data and invariants it governs;
  replace primitive representations with value objects when they prevent real
  misuse. Apply SOLID principles where they fit these concrete improvements.
- Remove derivable state. If `isDirty` always means `editorContent !== baseline`,
  compute it from those values instead of storing or passing another fact.
- Consider problems the new code reveals in existing code, while keeping edits
  inside the authorized scope. Keep tests at the interface owning the behavior;
  follow [regression preservation](../../verification-design/SKILL.md#preserve-evidence-when-moving-a-seam)
  before retiring tests.

## Write for the next reader

Names, comments and structure must make sense without this conversation or PR's
history. Rewrite anything that requires that history against the codebase's own
vocabulary. Delete compatibility paths for signatures, aliases or data shapes
that existed only earlier in the same unshipped branch; update their callers.
Compatibility with shipped behavior is a different constraint and is preserved.

Done when the result carries the same observable behavior and contracts with
less reading burden, the applicable existing checks pass, and any broader
proposal is returned as a finding rather than silently implemented.
