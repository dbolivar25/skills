# Domain meaning, examples, and durable decisions

Acquire domain statements, existing glossary/context boundaries, actual code behavior
and examples, settled owner decisions, and the requested documentation scope.

Actively sharpen the model rather than merely consume its vocabulary. Compare terms and
statements with the current glossary and behavior. Return canonical terms, explicit
distinctions, counterexamples and the decision needed to resolve contradictions. Missing
code or context is an evidence need, not evidence that the user's account is wrong.

- When a term conflicts with the glossary, identify the exact competing meanings:
  "Your glossary defines cancellation as X; this example uses Y."
- For vague or overloaded language, propose the smallest precise distinction:
  "Does account mean Customer or User?" Do not demand a new term for a settled one.
- Invent concrete edge cases to test relationships and invariants. A proposed
  scenario tests the model; it is not a claim that the system has exhibited it.
- When inspected code contradicts the stated model, retain both as a conflict:
  whole-order cancellation versus a proposed partial cancellation, for example.

Return settled glossary deltas separately from unresolved proposals. A glossary contains
domain meaning, not implementation details, a spec or scratch notes. Use the repository's
glossary format, or [the context format below](#context-format) when no local convention exists.

Use [the ADR guidance below](#adr-format) when a decision's basis must survive the current
conversation. Follow repository practice and avoid an ADR for every routine choice.
Return the target context with the delta.
Resolve missing code or glossary evidence and ask owner questions. Persist settled
language only within the documentation scope, checking current files before edits and
reading back the result.
Proposals remain distinct from recorded decisions; files are created lazily when there
is a settled delta.

Finish when settled terms and qualifying decisions are coherent with inspected evidence,
while each unresolved fork remains a concrete question with its reason.

## Context format

### Structure

```md
# {Context Name}

{One or two sentence description of what this context is and why it exists.}

## Language

**Order**:
{A one or two sentence description of the term}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places orders.
_Avoid_: Client, buyer, account
```

### Rules

- **Choose a canonical term.** When several words name the same concept, pick the best one and list misleading alternatives under `_Avoid_`. Keep a synonym when it has a distinct legitimate meaning; glossary editing must not flatten the model.
- **Keep definitions tight.** Start with a sentence or two stating what the concept means. Add a distinction, example, or invariant when that is needed to prevent misunderstanding. Behavior belongs here when it defines the domain concept, not merely an implementation.
- **Include domain language for this context.** A common word such as Order can belong because its meaning and relationship to Invoice matter here. General programming concepts (timeouts, utility patterns) usually belong elsewhere; include one only when the domain gives it a specific meaning or constraint.
- **Group terms under subheadings** when natural clusters emerge. If all terms belong to a single cohesive area, a flat list is fine.

### Single vs multi-context repos

Follow the existing repository's format and locations. When introducing a glossary,
these are useful starting shapes, not assumptions about every repository:

**Single context:** One `CONTEXT.md` at the repo root.

**Multiple contexts:** A `CONTEXT-MAP.md` at the repo root lists the contexts, where they live, and how they relate to each other:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md): receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md): generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md): manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

Infer structure from the actual repository layout and context contents:

- A `CONTEXT-MAP.md` identifies multiple contexts and their locations.
- Only a root `CONTEXT.md` indicates a single context.
- Neither file means first look for an equivalent glossary or domain document. A root
  glossary can be proposed with the first settled term when no existing owner fits.

For multiple contexts, place the proposed delta in the context supported by the
topic and examples. Missing map contents are an evidence need; an ambiguous
meaning boundary is an owner decision. Read current files, resolve owner questions, and create files lazily within the
authorized documentation scope.

## ADR format

Use the repository's existing ADR location, naming, and template. Without a convention,
`docs/adr/` and sequential names such as `0001-slug.md`, `0002-slug.md` are a useful default.

Create a new decision directory lazily, only when a record is needed.

### Template

```md
# {Short title of the decision}

{1-3 sentences: what's the context, what did we decide, and why.}
```

That's it. An ADR can be a single paragraph. The value is in recording *that* a decision was made and *why*: not in filling out sections.

### Optional sections

Only include these when they add genuine value. Most ADRs won't need them.

- **Status** frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`): useful when decisions are revisited
- **Considered Options**: only when the rejected alternatives are worth remembering
- **Consequences**: only when non-obvious downstream effects need to be called out

### Numbering

When using sequential numbering, scan the chosen ADR directory for the highest existing
number and increment by one.

### When to offer an ADR

These three questions identify decisions that especially benefit from a durable record:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will look at the code and wonder "why on earth did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

An easy, unsurprising choice with no real alternative usually does not earn an ADR.
Use judgment for consequential exceptions and local practice. Record the decision's
owner, scope, basis, and reopening condition when losing them would cause the same
tradeoff to be argued again; a shorter note may suffice.

#### What qualifies

- **Architectural shape.** "We're using a monorepo." "The write model is event-sourced, the read model is projected into Postgres."
- **Integration patterns between contexts.** "Ordering and Billing communicate via domain events, not synchronous HTTP."
- **Technology choices that carry lock-in.** Database, message bus, auth provider, deployment target. Not every library: just the ones that would take a quarter to swap out.
- **Boundary and scope decisions.** "Customer data is owned by the Customer context; other contexts reference it by ID only." The explicit no-s are as valuable as the yes-s.
- **Deliberate deviations from the obvious path.** "We're using manual SQL instead of an ORM because X." Anything where a reasonable reader would assume the opposite. These stop the next engineer from "fixing" something that was deliberate.
- **Constraints not visible in the code.** "We can't use AWS because of compliance requirements." "Response times must be under 200ms because of the partner API contract."
- **Rejected alternatives when the rejection is non-obvious.** If you considered GraphQL and picked REST for subtle reasons, record it: otherwise someone will suggest GraphQL again in six months.
