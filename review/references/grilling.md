# Grill a plan or decision

Work through a plan's unresolved decisions in dependency order until the user and agent
share an understanding strong enough to act from. This conversational workflow owns the
questions, answers and evolving decision frontier. Use only when the user explicitly requests a grilling interview; ordinary review or
design does not select this conversational job.

## Establish the object

Name the plan or design under discussion and the decision the interview must make
possible. Acquire accessible sources and recover existing answers before asking the user
to repeat them. Make the unresolved branches explicit.

## Work the frontier

Map the object as a **design tree**: each decision branches into decisions that depend
on it. The **frontier** contains every unresolved decision whose prerequisites are
settled. Ask the whole frontier as one numbered round; a question that depends on
another open question belongs in a later round.

Give each question a short title, enough context to decide, and a recommended answer
with its reason:

```md
1. **<Question title>:** <Question and relevant context>
   - Recommendation: <answer and reason>
```

Finding discoverable facts belongs to the agent. Making consequential owner choices
belongs to the user. Gather facts alongside independent frontier questions; do not ask
the user to perform research the available sources can settle.

Wait for answers before recomputing dependent questions. Elapsed time is not an answer.
Retain supported decisions and recompute only the branches changed by new evidence or
answers. Each round must settle or reshape the frontier, with unresolved choices and
their reasons still visible.

## Preserve settled meaning

When documentation is in scope, use [domain modeling](../../engineering/references/domain.md) for the
language, examples, and settled decisions. Resolve source needs, then persist
supported glossary deltas and only qualifying ADRs. Recheck the current files, preserve
unrelated work and read back the result. Keep open proposals out of settled
documentation; create files lazily when there is something to record.

For an objection that could block or reopen an owner choice, follow the current working
agreement for standing and settlement. Resolve obtainable facts and preserve the owner
choice unless new evidence changes its basis; do not turn the interview into another
round of the same argument.

## Confirm shared understanding

When the frontier is empty or blocked on named evidence, present settled decisions,
remaining tensions, evidence gaps and the next decision they affect. Ask the user to
confirm shared understanding. An empty frontier is not itself confirmation. End at that
confirmation; implementation remains a separately authorized result.
