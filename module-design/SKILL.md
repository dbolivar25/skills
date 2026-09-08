---
name: module-design
description: Use when a module interface, ownership, depth, dependency seam, or testability needs design judgment. Load it to reduce caller knowledge and concentrate invariants behind a useful interface, with concrete usage and tradeoffs.
---

# Module design

Use the [core contract](../contracts/composition.md#core-skills) .

**Inputs:** Problem, caller examples, current ownership, dependency categories,
governing constraints and observed test seams; optional supplied alternative designs.

Return the owner, interface, hidden responsibilities, caller examples, test seam and
material tradeoffs. Explain what callers no longer need to know. A function, package,
skill or distributed slice can be a module.

Match the result to the caller's decision. An ownership scan needs the proposed owner,
hidden responsibility and leverage, with the interface left open. An interface-design
request needs concrete usage and the full proposed contract. Keep the judgment complete
for that decision without expanding the caller's scope.

Apply [the design method](references/design.md) and, for external capabilities,
[dependency seams](references/dependency-seams.md) . Apply
[verification design](../verification-design/SKILL.md) to claims of testability using
supplied observations. Missing caller or runtime facts return evidence needs; design
reasoning is not a test execution receipt.

Compare provided or reasoned interface alternatives by caller knowledge, depth,
locality, seam placement, invariants, ordering and errors. A hypothetical adapter alone
does not justify a seam. Explain why a selected shape dominates or where an owner
tradeoff remains. Compare supplied alternatives directly. If the caller requires
independently produced designs, identify the briefs and evidence needed; the operational
caller obtains them and returns the alternatives for comparison. Include
[design alternatives](../tech-spec/branches/design-alternatives.md) as the caller's
acquisition method for that request. Return this pointer with the evidence need; the
core does not run the exploration. Using the method does not select the full
specification workflow.

Return the proposed ownership or interface at the requested depth, with caller usage,
hidden complexity, verification needs and unresolved choices. Design is a proposal,
not edit authority.
