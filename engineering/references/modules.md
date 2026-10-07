# Module ownership, depth, and seams

Use when ownership, caller knowledge, a module interface, or a test seam is unsettled.
Acquire the problem, actual caller examples, current owners, dependencies, governing
constraints, and observed tests. Return the owner, hidden responsibilities, caller usage,
verification seam, and tradeoffs at the depth the requested decision needs. An ownership
study leaves the final interface open; a design request makes the interface concrete.

Explain what callers no longer need to know. Compare supplied or reasoned alternatives
by caller knowledge, depth, locality, invariants, ordering, failures, and seam placement.
Resolve source-verifiable gaps yourself; keep remaining owner choices explicit. A design
is a proposal, and a claim of testability is not execution evidence. Read
[design alternatives](design-alternatives.md) only when materially different shapes need
comparison; it does not start a specification or implementation workflow.

## Depth and vocabulary

A deep module puts substantial behavior behind an interface that is small to
learn. Judge the leverage callers gain, where change concentrates, and what a
test can establish through that interface. Implementation size is not depth.

### Vocabulary

Use these terms consistently when describing the design; use the project's
`CONTEXT.md` vocabulary for its domain concepts.

| Term | Meaning and distinction |
| --- | --- |
| **Module** | Anything with an interface and an implementation: a function, class, package, or tier-spanning slice. Do not substitute component or service when discussing this scale-independent concept. |
| **Interface** | Everything a caller must know: types, invariants, ordering, errors, required configuration, and relevant performance characteristics. A signature or TypeScript `interface` alone is narrower. |
| **Implementation** | What is inside the module. This describes substance; adapter describes a role. |
| **Depth** | Behavior a caller or test can exercise per unit of interface it must learn. A shallow module makes callers learn nearly as much complexity as it hides. |
| **Seam** | The location where behavior can be changed without editing there: where the module's interface lives. Say seam for this concept; a domain bounded context is a different boundary. |
| **Adapter** | A concrete implementation satisfying the interface at a seam. A Postgres adapter can contain a large implementation; an in-memory adapter can contain a small one. |
| **Leverage** | Capability callers receive from depth: one implementation pays back across its callers and tests. |
| **Locality** | Change, bugs, knowledge and verification concentrate with their owner instead of spreading through callers. |

The module's interface is its whole caller-facing surface. Its implementation
may contain smaller modules and private seams; those need not be exposed through
the outer interface merely because internal tests use them. Depth is judged at
the interface, not by counting implementation lines.

### Shape the module

1. **Find the owner.** Which invariant, policy, sequencing, or translation should
   a caller be able to rely on here? Group knowledge with the reason it changes.
2. **Reduce caller knowledge.** Ask whether fewer entry points, simpler parameters,
   or hidden complexity would make the common call easier without hiding a real
   constraint.
3. **Apply the deletion test.** If removing the module makes complexity vanish,
   it was probably a pass-through. If that complexity reappears across callers,
   the module was earning its keep.
4. **Place a real seam.** An adapter for an imaginable future is a hypothetical seam.
   Distinct justified implementations can establish useful variation. A production
   adapter and a faithful test adapter can justify it when the application actually owns
   the boundary; interception invented only for a test does not establish that ownership. Use
   [dependency categories below](#deepening-across-dependencies) when deepening a cluster.
5. **Check the test surface.** A test observes the interface owning its claim.
   If it must reach through that interface, reconsider the module shape or the
   claim. Apply [testing evidence](testing.md) before declaring the
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
hide its invariant. Compare materially different interfaces when the task needs that decision.

## Deepening across dependencies

Classify a shallow cluster's dependencies before deciding where its deeper
module can be tested. Use [the vocabulary above](#vocabulary) for the vocabulary
and [testing evidence](testing.md) for what each test can prove.

| Dependency | Design and test strategy |
| --- | --- |
| **In-process**: pure computation or in-memory state, no I/O | Deepen directly; test through the resulting interface without an adapter. |
| **Local-substitutable**: a database or filesystem with a local stand-in | Deepen when that stand-in exists. Keep the dependency seam internal; do not expose a port in the outer interface merely for tests. Exercise module behavior with the stand-in, then use the real implementation for claims the stand-in cannot establish. |
| **Remote but owned**: your service across a network | Put logic in the deep module, with an application-owned port and injected transport adapter. Production uses HTTP, gRPC or queue transport; tests use an in-memory adapter. |
| **True external**: a third party you do not control | Inject its behavior through an owned port; tests normally supply a controlled mock or recording fake adapter at that port. If interception is necessary, justify its fidelity and the claim it can establish. |

A recommendation should explain the ownership and why the seam earns its cost:
“Keep the policy in one deep module; inject an HTTP adapter in production and an
in-memory adapter in tests, so deployment across a network does not scatter the
logic.” Internal seams stay private to the implementation.

When replacing shallow-module tests with deeper-interface tests, use the
[regression-preservation rule](testing.md#preserve-evidence-when-moving-a-seam).
