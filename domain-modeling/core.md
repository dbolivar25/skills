# Domain modeling core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Domain statements, existing glossary/context boundaries, supplied code behavior/examples, settled owner decisions, requested documentation scope.

Actively sharpen the model rather than merely consume its vocabulary. Compare
terms and statements with the supplied glossary and behavior. Return canonical
terms, explicit distinctions, counterexamples and the decision needed to resolve
contradictions. Missing code or context is an evidence need, not evidence that
the user's account is wrong.

- When a term conflicts with the glossary, identify the exact competing meanings:
  "Your glossary defines cancellation as X; this example uses Y."
- For vague or overloaded language, propose the smallest precise distinction:
  "Does account mean Customer or User?" Do not demand a new term for a settled one.
- Invent concrete edge cases to test relationships and invariants. A proposed
  scenario tests the model; it is not a claim that the system has exhibited it.
- When supplied code contradicts the stated model, retain both as a conflict:
  whole-order cancellation versus a proposed partial cancellation, for example.

Return settled glossary deltas separately from unresolved proposals. A glossary
contains domain meaning, not implementation details, a spec or scratch notes.
Use [the context format](CONTEXT-FORMAT.md) for a requested glossary delta.

A decision merits an ADR only when all three hold: it is hard to reverse,
surprising without context, and the result of a real tradeoff. Otherwise keep it
out of the ADR stream. When qualified, use [the ADR format](ADR-FORMAT.md) to
propose the decision and its alternatives. Persistence belongs to the shell.

Finish when settled terms and qualifying decisions are coherent with supplied
evidence, while each unresolved fork remains a concrete question with its reason.
