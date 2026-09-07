# Module design

A deep module puts substantial behavior behind an interface that is small to
learn. Judge the leverage callers gain, where change concentrates, and what a
test can establish through that interface. Implementation size is not depth.

## Vocabulary

Use these terms consistently when describing the design; use the project's
`CONTEXT.md` vocabulary for its domain concepts.

| Term | Meaning and distinction |
| --- | --- |
| **Module** | Anything with an interface and an implementation: a function, class, package, or tier-spanning slice. Do not substitute component or service when discussing this scale-independent concept. |
| **Interface** | Everything a caller must know: types, invariants, ordering, errors, required configuration, and relevant performance characteristics. A signature or TypeScript `interface` alone is narrower. |
| **Implementation** | What is inside the module. This describes substance; adapter describes a role. |
| **Depth** | Behavior a caller or test can exercise per unit of interface it must learn. A shallow module makes callers learn nearly as much complexity as it hides. |
| **Seam** | The location where behavior can be changed without editing there: where the module's interface lives. Say seam for this concept; domain-modeling's bounded context is a different boundary. |
| **Adapter** | A concrete implementation satisfying the interface at a seam. A Postgres adapter can contain a large implementation; an in-memory adapter can contain a small one. |
| **Leverage** | Capability callers receive from depth: one implementation pays back across its callers and tests. |
| **Locality** | Change, bugs, knowledge and verification concentrate with their owner instead of spreading through callers. |

The module's interface is its whole caller-facing surface. Its implementation
may contain smaller modules and private seams; those need not be exposed through
the outer interface merely because internal tests use them. Depth is judged at
the interface, not by counting implementation lines.

## Shape the module

1. **Find the owner.** Which invariant, policy, sequencing, or translation should
   a caller be able to rely on here? Group knowledge with the reason it changes.
2. **Reduce caller knowledge.** Ask whether fewer entry points, simpler parameters,
   or hidden complexity would make the common call easier without hiding a real
   constraint.
3. **Apply the deletion test.** If removing the module makes complexity vanish,
   it was probably a pass-through. If that complexity reappears across callers,
   the module was earning its keep.
4. **Place a real seam.** One adapter means a hypothetical seam; two justified
   adapters mean real variation. A production adapter and a test adapter can
   justify that variation when the application actually owns the boundary; an
   interception invented only for a test cannot. Use
   [dependency seams](dependency-seams.md) when deepening a cluster.
5. **Check the test surface.** A test observes the interface owning its claim.
   If it must reach through that interface, reconsider the module shape or the
   claim. Apply [testing evidence](testing-evidence.md) before declaring the
   design testable.

Prefer dependency inputs and returned values where they make policy testable:

```typescript
// The caller supplies the capability; policy can be tested through this seam.
function processOrder(order: Order, payments: Payments): Promise<OrderResult>;

// Constructing Stripe inside processOrder would hide the external dependency.
// The composition root, rather than application policy, chooses that adapter.

// A returned value keeps the calculation separate from its effectful use.
function calculateDiscount(cart: Cart): Discount;
// Mutating cart.total inside applyDiscount would couple the two responsibilities.
```

A small surface reduces what callers and tests must learn; it does not eliminate
behavioral cases. Keep essential complexity together when splitting it would
hide its invariant. When the user wants competing interface designs, run
[design alternatives](../branches/design-alternatives.md).
