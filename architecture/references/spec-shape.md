# Presenting a typed handoff

Use this outline as a reading order, not a demand to duplicate the coverage map
under every heading. Omit inapplicable sections and compress tiny tasks, while
preserving typed contracts, seams, end-to-end call stacks and vertical tests.

```md
# <Title>

## Summary and current problem
## Goals, non-goals, invariants and constraints
## Alternatives and recommendation
## Typed design
### Domain model and states
### Interfaces, failures and boundary projections
### Seams, adapters and ownership
## Execution and data flow
### Current and proposed paths
### Failure and operational paths
## File/module responsibilities
## Vertical RGR test plan
## Risks and open questions
```

The execution section includes applicable retry, cancellation, idempotency,
transaction, authorization, observability and runtime-hop behavior. Separate
subsections only when they help the reader follow those paths.

Prefer TypeScript pseudocode to prose where precision matters. For example, a
boundary sketch makes ownership and expected failure visible:

```typescript
// Illustrative shape, not a requirement to invent these APIs in a project.
type SubmitInput = Readonly<{ orderId: OrderId; payment: PaymentToken }>;
type SubmitFailure = OrderNotFound | PaymentDeclined;

interface SubmitOrder {
  submit(input: SubmitInput, signal: AbortSignal): Promise<Result<Receipt, SubmitFailure>>;
}

// The adapter parses raw input, calls application policy, then projects the result.
// Define the project's concrete Result/errors/parser/DTOs in the actual spec.
```

A type sketch alone does not explain execution. Pair it with the complete actual
call stack, data ownership and reachable failure/operational paths. Avoid filling
unknowns with plausible APIs merely to finish the outline.
