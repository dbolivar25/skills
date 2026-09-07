# Module design core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Problem, caller examples, current ownership, dependency categories, governing constraints and observed test seams; optional supplied alternative designs.

Return the owner, interface, hidden responsibilities, caller examples, test seam
and material tradeoffs. Explain what callers no longer need to know. A function,
package, skill or distributed slice can be a module.

Apply [the design method](references/design.md) and, for external capabilities,
[dependency seams](references/dependency-seams.md). Apply
[testing evidence](../software-engineering/references/testing-evidence.md) to
claims of testability using supplied observations. Missing caller or runtime
facts return evidence needs; design reasoning is not a test execution receipt.

Compare provided or reasoned interface alternatives by caller knowledge, depth,
locality, seam placement, invariants, ordering and errors. A hypothetical adapter
alone does not justify a seam. Explain why a selected shape dominates or where an
owner tradeoff remains. Do not schedule independent design agents from this core;
independence belongs to the shell's selected exploration.

Return a concrete proposed interface and usage, scope of hidden complexity,
verification needs and unresolved choices. Design is a proposal, not edit authority.
