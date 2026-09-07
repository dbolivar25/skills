# Grilling core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Plan or design under discussion, desired decision, dependencies, existing answers, discoverable evidence, unresolved choices and documentation scope.

Walk the design tree in dependency order until the user and agent share an
understanding strong enough to act from.

## 1. Establish the object

State what plan or design is being tested and the decision the interview must
make possible.

Completion criterion: the object, decision, and currently unresolved branches
are explicit.

## 2. Work the frontier in rounds

Map the object as a **design tree**: every decision branches into decisions that
depend on it. The **frontier** is every unresolved decision whose prerequisites
are already settled. Return the whole frontier as one numbered round for the shell to ask.
Recompute only when supplied answers or evidence change the frontier. A question that depends on another
question still open in the round belongs to a later round.

Give every question a short title, enough context to decide, and your recommended
answer with its reason:

```md
1. **<Question title>:** <Question and relevant context>
   - Recommendation: <answer and reason>
```

Finding facts is the agent's job; making consequential decisions is the user's.
Use supplied evidence for facts. Return discoverable missing facts as evidence
needs, not owner questions. Independent frontier questions can proceed while
other branches await evidence; only downstream decisions depend on those answers.

Completion criterion: every question in the round is dependency-ready, every
recommendation exposes its reason, discoverable facts are being gathered rather
than delegated to the user, and the answers either settle or reshape the frontier.

## Return decisions without performing the round

Return settled decisions, the next dependency-ready question round, evidence
needs, and the remaining frontier. Every question includes a short title, enough
context, and a recommendation with its reason. Do not ask the user directly or
wait in the core. When the frontier is empty, recommend confirming shared
understanding; an empty frontier is not itself the owner's confirmation.

When documentation is in scope, use [domain meaning](../domain-modeling/core.md)
with the supplied language and decisions to return glossary/ADR proposals.
The shell owns conversation, file updates and final confirmation. Implementation
is a separate authorized result.
