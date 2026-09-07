# Test-first work

Run this branch only when the user chooses test-first behavior, Red-Green-Refactor,
or integration tests as the implementation driver. The standards and
[testing evidence](../references/testing-evidence.md) govern valid proof; this
branch governs the order in which it is learned.

## 1. Agree on the behavior and seam

Read project `CONTEXT.md` when present and governing ADRs. Inspect local test
patterns. Establish the public interface, test seams, and a prioritized behavior
list, focusing effort on critical paths and complex logic. If the interface is
unsettled, use [module design](../references/module-design.md) before the loop.
Look for opportunities to hide behavior behind a small interface.

Confirm the plan with the user before coding: interface, seams and prioritized
behaviors. Existing explicit approval satisfies this gate; do not ask again.

Done when those choices are explicit and approved.

## 2. Fire one tracer bullet

Write **one test of one behavior**. Run it and see it fail for the intended
missing behavior. Write only enough implementation to pass it, then check the
existing relevant suite. This first slice establishes that the path works
end-to-end; it is not a collection of disconnected shape tests.

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
