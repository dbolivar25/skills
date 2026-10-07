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
`GLOSSARY.md` vocabulary for its domain concepts.

| Term | Meaning and distinction |
| --- | --- |
| **Module** | Anything with an interface and an implementation: a function, class, package, or tier-spanning slice. Component and service can describe particular modules; this term keeps the ownership question independent of scale. |
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
| **Local-substitutable**: a database or filesystem with a local stand-in | Keep a useful dependency seam internal when callers do not need to choose it. A stand-in can exercise module behavior; actual database/filesystem evidence is still needed for claims it cannot establish. Its availability helps verification but does not decide whether the ownership move earns its cost. |
| **Remote but owned**: your service across a network | Concentrate policy with its owner and contain transport mechanics at a real seam. An application-owned port plus HTTP, gRPC, or queue adapter can support that split; an in-memory adapter tests policy while real transport checks establish wiring and protocol behavior. |
| **True external**: a third party you do not control | Contain provider types and mechanics at an owned boundary. Use a narrow injected capability when it clarifies policy and recovery; a controlled fake can exercise application behavior. Claims about the provider or SDK need real-boundary evidence. Justify interception by its fidelity and the claim it can establish. |

A recommendation should explain the ownership and why the seam earns its cost:
“Keep the policy in one deep module; inject an HTTP adapter in production and an
in-memory adapter in tests, so deployment across a network does not scatter the
logic.” Internal seams stay private to the implementation.

When replacing shallow-module tests with deeper-interface tests, use the
[regression-preservation rule](testing.md#preserve-evidence-when-moving-a-seam).
