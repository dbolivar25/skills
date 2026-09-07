# Deepening across dependencies

Classify a shallow cluster's dependencies before deciding where its deeper
module can be tested. Use [module design](module-design.md) for the vocabulary
and [testing evidence](testing-evidence.md) for what each test can prove.

| Dependency | Design and test strategy |
| --- | --- |
| **In-process**: pure computation or in-memory state, no I/O | Deepen directly; test through the resulting interface without an adapter. |
| **Local-substitutable**: a database or filesystem with a local stand-in | Deepen when that stand-in exists. Keep the dependency seam internal; do not expose a port in the outer interface merely for tests. Exercise module behavior with the stand-in, then use the real implementation for claims the stand-in cannot establish. |
| **Remote but owned**: your service across a network | Put logic in the deep module, with an application-owned port and injected transport adapter. Production uses HTTP, gRPC or queue transport; tests use an in-memory adapter. |
| **True external**: a third party you do not control | Inject its behavior through an owned port; tests supply a controlled mock or recording fake adapter at that port, never a module patch. |

A recommendation should explain the ownership and why the seam earns its cost:
“Keep the policy in one deep module; inject an HTTP adapter in production and an
in-memory adapter in tests, so deployment across a network does not scatter the
logic.” Internal seams stay private to the implementation.

When replacing shallow-module tests with deeper-interface tests, use the
[regression-preservation rule](testing-evidence.md#preserve-evidence-when-moving-a-seam).
