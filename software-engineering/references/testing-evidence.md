# Testing evidence

A test establishes a claim about behavior at the interface that owns it. Observe
caller-visible results, failures, persisted state, messages, responses or adapter
records. Avoid private helpers and incidental collaborator call order. Tests
should survive internal refactors and fail when the claimed behavior changes.
These rules govern tests whether or not the user selected TDD.

## Choose the observation and an independent oracle

Use a module's public interface, or an internal module's own contract when that
module owns the claim; keep internal seams private to its implementation. A
small surface does not excuse missing behavioral cases. Focus each test on one
logical claim rather than several unrelated behaviors.

Expected results must come from an independent source: a known literal, worked
example, specification or invariant. Repeating the production calculation in the
test allows both to be wrong together:

```typescript
// Tautological: the oracle repeats the implementation's calculation.
const expected = items.reduce((sum, item) => sum + item.price, 0);
expect(calculateTotal(items)).toBe(expected);

// Independent worked example.
expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
```

Choose the observation for the actual claim:

```typescript
// Integration-style: the result is the checkout contract's observable behavior.
test("user can checkout with valid cart", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});

// This row alone does not prove that the public read path can retrieve the user.
await createUser({ name: "Alice" });
const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
expect(row).toBeDefined();

// A retrievability claim exercises the read contract.
const user = await createUser({ name: "Alice" });
const retrieved = await getUser(user.id);
expect(retrieved.name).toBe("Alice");
```

A write-only repository may instead promise **durable storage**. For that claim,
query the real database independently after the write; reading through the same
in-memory cache does not prove persistence. Database observations are valid when
the database owns the claimed behavior.

## Control dependencies through production seams

Replace external behavior through the narrow interface production uses:

- a constructor-injected port;
- an Effect service or layer;
- a runtime binding or composition-root capability;
- a local server or database;
- a deterministic clock, ID source, random source or scheduler;
- a recording fake adapter implementing the application-owned interface.

Control time, randomness, IDs, cancellation and external responses. The
application owns a port because its policy needs that boundary; a test supplies
another implementation. If no real seam exists, expose that architectural
constraint instead of hiding it behind test magic.

```typescript
class RecordingPayments implements Payments {
  readonly charges: ChargeRequest[] = [];

  async charge(request: ChargeRequest): Promise<ChargeResult> {
    this.charges.push(request);
    return { status: "accepted", id: PaymentId.parse("pay_test") };
  }
}
```

An assertion on `charges` is valid when the external charge request belongs to
the application's observable contract. It is not permission to assert incidental
internal order or private collaborator calls.

```typescript
// Implementation coupling: patching an internal collaborator and observing HOW.
const mockedPayments = jest.mock(paymentService);
await checkout(cart, paymentMethod);
expect(mockedPayments.process).toHaveBeenCalledWith(cart.total);
```

Do not use module mocks (`vi.mock`, `jest.mock`, import rewriting), method spies
(`vi.spyOn`, `jest.spyOn`), test-only interception interfaces, or generic fetch
fakes branching across many unrelated operations. Red flags include private
method assertions, irrelevant call counts/order, HOW-oriented test names and
tests that fail under a behavior-preserving refactor.

## Match evidence to consequence and implementation

Use risk-based testing: increase evidence depth with the consequence of being
wrong. Cover boundary cases and meaningful condition interactions; use exhaustive
or table-driven tests for closed rules and property tests for general invariants.

A fake can drive a fast loop but cannot establish SQL constraints, transaction
behavior, serialization, network protocols, framework wiring, browser behavior,
or a third-party SDK's current contract. Use the actual implementation in a
representative database, local server, supported runtime or contract test at that
boundary. Apply the production migration path when the claim depends on
persistence semantics or stored shape. Report precisely what each substitute
proved and what still needs real-boundary evidence.

## Preserve evidence when moving a seam

Replace shallow-module tests only **after** tests through the deeper interface
cover the same behavior. Preserve every unique regression and contract at the
seam that owns it: a new interface test does not automatically replace their
evidence. Tests observe outcomes rather than internal state, unless that state
itself is the owning interface's observable contract.

Done when every claimed behavior is observed at its owning seam with an
independent oracle, controlled relevant nondeterminism and evidence appropriate
to its risk and actual implementation. Any unproven claim remains an explicit
evidence gap.
