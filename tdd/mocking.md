# Controlling dependencies in tests

The coding standards own the policy: verify behavior through real seams, do not
patch modules or spy on methods, and match evidence to consequence.

## Use production seams

Replace external behavior through the same narrow interface production uses:

- a constructor-injected port;
- an Effect service or layer;
- a runtime binding or composition-root capability;
- a local server or database;
- a deterministic clock, ID source, random source, or scheduler; or
- a recording fake adapter implementing the production-owned interface.

A test-only seam is a design smell. The application owns the port because its
policy needs a boundary; the test supplies another implementation of that port.

## Prefer recording fakes

A recording fake returns controlled results and records caller-visible requests
for assertions:

```typescript
class RecordingPayments implements Payments {
  readonly charges: ChargeRequest[] = [];

  async charge(request: ChargeRequest): Promise<ChargeResult> {
    this.charges.push(request);
    return { status: "accepted", id: PaymentId.parse("pay_test") };
  }
}
```

Assert on the adapter record only when the external request is part of the
application's observable contract. Do not assert incidental internal call order.

## Use the real implementation when the claim belongs to it

A fake cannot establish SQL constraints, transaction behavior, serialization,
network protocol, framework wiring, browser behavior, or a third-party SDK's
current contract. Use a representative database, local server, supported runtime,
or contract test at that boundary. Apply the production migration path when the
claim depends on persisted shape.

## Avoid

- `vi.mock`, `jest.mock`, import rewriting, and other module-patching APIs;
- `vi.spyOn`, `jest.spyOn`, and assertions on private collaborators;
- generic fetch fakes with conditional branches for many unrelated operations;
- in-memory substitutes presented as proof of database or runtime behavior; and
- fake types or interfaces created only because a test wants to intercept a call.

If the current code offers no real seam, keep that architectural constraint
visible. Do not hide it behind test magic.
