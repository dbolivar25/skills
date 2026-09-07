---
name: simplify
description: Use when an authorized code change reaches a verified review boundary, or code comments need a clarity pass. Load it to reduce concepts and reading cost without changing behavior; invocation never grants edit authority.
---

# Simplify

Review changes in the current branch, or in the scope the user specifies. Apply
these criteria without changing behavior or public contracts.

Invocation does not grant mutation authority:

- When the current task already authorizes implementation, apply simplifications
  only inside that same scope and run the relevant existing checks afterward.
- During review, diagnosis, explanation, or another read-only task, return
  simplification findings without editing files.

State which mode applies before changing anything. A finding that would alter
behavior, compatibility, or architecture belongs to the owning task, not this
finishing pass.

## Word choice in code and comments

Variable names, function names, and comments are all prose. Apply Orwell's rules ("Politics and the English Language") to each:

> Never use a long word where a short one will do.
> 
> If it is possible to cut a word out, always cut it out.
> 
> Never use the passive where you can use the active.
> 
> Never use a foreign phrase, a scientific word, or a jargon word if you can think of an everyday English equivalent.

Latinate vocabulary (reconcile, coalesce, normalize, reconciliation) sounds technical and abstract; Anglo-Saxon words (prune, run, watch, stop, drop, walk) are short and physical. Prefer the shorter familiar word when it preserves the same domain meaning. Keep precise technical terms when a replacement would hide a distinction.

### Names

1. **One word per concept, one concept per word.** Keep a vocabulary. If `sync` names "pulling remote changes," it cannot also name "flushing edits to disk;" rename one of them.
2. **Cut words the context already carries.** A module named `workspaceWatcher` does not need `startNativeWorkspaceWatcher`; `watchWorkspace` says the same thing.
3. **Name the concept at its actual scope.** `baseline` works when the surrounding contract identifies which baseline it is. Keep `lastObservedDiskContent` when it must be distinguished from a saved or remote baseline. Cut redundant context, not information needed to tell real states apart.

### Comments

State, in plain English, the constraint the code cannot show: why the **non-obvious** exists.

- ✅ If code is complex and the implementation is non-obvious, add a comment.
- ✅ If a function contains complex behaviors or side effects, add a doc comment.
- 🗑️ If a comment narrates change history from the conversation, delete it.
- 🗑️ If a comment restates code whose behavior is self-evident, delete it.

## Code structure

1. **Inverted pyramid.** Within a file, lead with the exported or significant functions and push helpers below them. Don't bury the lead.
2. **Related concepts over monoliths.** Break a large file into modules that each own one concept.
3. **Combine overlapping concepts.** Merge types, functions, or constants when they represent the same concept and have the same ownership and change reasons. Shared fields or similar syntax alone do not make two concepts identical. The fewer distinct concepts a reader must hold in their head, the better.
4. **Use shared code.** Common utilities (ex. file path parsing) may exist in the codebase already. Check for library or utility functions before inlining.
5. **Derivability.** If a value can be computed from values already in scope, don't pass or store it separately. Removing derivable state often simplifies signatures, types, and control flow in one move. Example: an `isDirty` parameter that is always `editorContent !== baseline` can be dropped.

## Overfitting

Code must stand on its own. If a change only makes sense to someone who watched it happen (this conversation, this PR), it is overfitted. Write for the reader who arrives with no history.

- If a name or comment needs the conversation to be understood, rewrite it against the codebase's own vocabulary.
- **No backwards compatibility with unshipped code.** Supporting an old signature, alias, or data shape that only existed earlier in the same branch is compatibility with something that was never deployed. Delete the old path and update its callers.
