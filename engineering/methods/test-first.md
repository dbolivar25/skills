# Test-first work

Run this branch only when the user chooses test-first behavior, Red-Green-Refactor,
or integration tests as the implementation driver. The applicable contracts and
[testing evidence](../references/testing.md) govern valid proof; this
branch governs the order in which it is learned.

## 1. Agree on the behavior and seam

Read the relevant `GLOSSARY.md`, project domain documentation, and governing ADRs.
Inspect local test patterns. Establish the public interface, test seams, and a prioritized behavior
list, focusing effort on critical paths and complex logic. If the interface is
unsettled, use [module design](../references/modules.md) before the loop.
Look for opportunities to hide behavior behind a small interface.

Give each proposed seam a one-line note on what it catches and what it misses, so
the owner can judge the coverage tradeoff. For example: "The checkout service with
a fake payment gateway catches order and payment-decision behavior; it misses the
real gateway's request format and retry responses." Use a real gateway or adapter
check when the claim depends on that boundary.

Make the interface, seams, and prioritized behaviors explicit enough to drive the
first cycle. Resolve source-verifiable facts yourself. Ask only for an unsettled
choice that materially changes the result and belongs to the owner, or when an
applicable repository instruction requires approval. The selected TDD method adds
no separate plan-approval gate.

## 2. Fire one tracer bullet

Write **one test of one behavior**. Run it and see it fail for the intended
missing behavior. Write only enough implementation to pass it, then check the
existing relevant suite. This first slice checks one behavior from the selected
interface to its observable result, with coverage limited to the dependencies
the test exercises.

Done when the test has the intended red signal, the minimal implementation makes
it green, and the relevant existing suite remains green.

## 3. Let each cycle teach the next

Repeat for the remaining prioritized behaviors:

```text
RED   one next behavior test fails for its intended reason
GREEN minimal implementation makes it pass
      use what this cycle revealed to choose the next test
```

Do not write all tests before implementing anything:

```text
Horizontal: test1, test2, test3 → implementation1, implementation2, implementation3
Vertical:   test1 → implementation1 → test2 → implementation2 → test3 → implementation3
```

Bulk tests outrun what you have learned, locking in imagined signatures and data
shapes. A tracer bullet responds to the previous cycle: it fails when meaningful
behavior is absent and survives an internal refactor.

Done when each prioritized behavior has its own red-green cycle and the full
relevant suite is green. A fast fake may drive the loop; collect real-boundary
evidence wherever the claim depends on the actual database, runtime, migration
or adapter.

## 4. Finish from green

Run [finishing](finishing.md), including what the new code revealed about existing
code within the authorized scope. Refactor only from green, run the relevant
tests after each refactor step, and preserve the agreed public behavior.

Done when the full relevant suite stays green and remaining evidence gaps are
reported rather than treated as verified.
