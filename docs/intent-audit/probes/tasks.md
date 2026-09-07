# Paired task prompts

Use the designated source version for these fictional tasks. Return actual task
responses and the loaded methods, not a critique of the instructions. Do not
modify files or external state. Report missing evidence rather than invent it.

1. **Comment clarity.** Review these Rust comments, suggesting clearer wording
   without editing files: `// sync pulls remote changes` and `// sync writes local
   edits to disk`. The operations have different owners and update events. State
   the working mode and proposed wording. No TDD workflow was selected.
2. **Non-code review guide.** Prepare the finance lead's short review guide for
   this proposal: current vendor spend is $120k/year; the proposal caps it at
   $90k/year by changing the plan. A written vendor quote supports the new price,
   but the required seat count is unresolved and no switch has happened. Do not
   decide approval or publish anything. Show what the reviewer must judge.
3. **Known explanation.** Explain visually the known save sequence:
   `save -> compareWithBaseline -> if unchanged return cachedResult; otherwise
   writeFile -> invalidateCache -> return newResult`. The answer is established;
   no experiment or implementation is wanted. Deliver the actual small visual.
4. **Immediate standing.** The owner already authorized a reversible local edit
   and knowingly chose a slower but simpler algorithm for this tiny dataset.
   The agent wants to block because it prefers the faster design. Establish the
   next action. No mission, collaborators, or later follow-up is needed.
5. **Authoring.** Improve this agent instruction while preserving every rule:
   “Be thorough. Clean up inactive records. If useful, see retention.md. Do not
   delete any record before its retention deadline or while a legal hold applies.
   You're done when you've listed the changed tables.” retention.md contains the
   required deadline calculation. The task requires accounting for every table
   that the cleanup affects. Explain the important authoring choices briefly.
6. **Spec selection.** The user explicitly asks for a typed spec, already supplies
   the current repository design and selected change, and prohibits implementation.
   Desired cancellation behavior is still unresolved. State the immediate process
   and stopping boundary, including whether a scan or implementation starts.
7. **Derivation fidelity.** Design the narrow publication path for an email
   candidate containing the source commitment “Alex will deliver the signed
   renewal by 2026-10-04.” Generation can occur while final recipient visibility
   checks are pending; the source can be revoked before send. Specify what must
   survive in intermediate data, what may execute early, and what gates sending.
