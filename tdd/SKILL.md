---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

## Testing law and workflow

`../coding-standards/SKILL.md` is the source of truth for what counts as valid
testing evidence. This skill owns the Red-Green-Refactor workflow.

Tests observe caller-visible behavior through real production seams. They should
survive internal refactors and fail when the behavior changes. See
[tests.md](tests.md) for examples and [mocking.md](mocking.md) for controlling
dependencies without module patching or method spies.

## Seams — where tests go

A **seam** is the public boundary where behavior can be observed without reaching
into implementation details. Tests live at seams. When the interface itself is
unsettled, use `../codebase-design/SKILL.md` to decide where the seam belongs
before starting the loop.

## Anti-pattern: tautological tests

A tautological test recomputes the expected value the same way the implementation
does, so both can be wrong together and the test still passes. Expected values
must come from an independent source of truth: a known literal, worked example,
specification, or invariant. See [tests.md](tests.md) for an example.

## Anti-pattern: horizontal slices

Work in vertical slices: one failing test, one minimal implementation, then the
next test. Writing all tests before any implementation is **horizontal slicing**;
it produces tests of imagined behavior rather than evidence learned from the
previous cycle:

- Tests written in bulk test _imagined_ behavior, not _actual_ behavior
- You end up testing the _shape_ of things (data structures, function signatures) rather than user-facing behavior
- Tests become insensitive to real changes - they pass when behavior breaks, fail when behavior is fine
- You outrun your headlights, committing to test structure before understanding the implementation

Each test is a **tracer bullet** that responds to what the previous cycle taught
you.

```
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2
  RED→GREEN: test3→impl3
  ...
```

## Workflow

### 1. Planning

When exploring the codebase, read `CONTEXT.md` (if it exists) so that test names and interface vocabulary match the project's domain language, and respect ADRs in the area you're touching.

Before writing any code:

- [ ] Confirm the public interface and test seams with the user
- [ ] Agree on a prioritized behavior list, concentrating effort on critical paths
      and complex logic
- [ ] Identify opportunities for deep modules (small interface, deep implementation) — see `../coding-standards/SKILL.md` for the design and testability standards
- [ ] Get user approval on the plan

Completion criterion: the public interface, test seams, and prioritized behavior
list are explicit, and the user has approved them.

### 2. Tracer Bullet

Write ONE test that confirms ONE thing about the system:

```
RED:   Write test for first behavior → test fails
GREEN: Write minimal code to pass → test passes
```

This is your tracer bullet - proves the path works end-to-end.

Completion criterion: the first test failed for the intended missing behavior,
the minimal implementation makes it pass, and the existing suite remains green.

### 3. Incremental Loop

For each remaining behavior:

```
RED:   Write next test → fails
GREEN: Minimal code to pass → passes
```

Rules:

- One test at a time
- Only enough code to pass current test
- Let each completed cycle determine the next test
- Keep tests focused on observable behavior

Completion criterion: every prioritized behavior has completed its own red-green
cycle and the full relevant suite is green.

### 4. Refactor

After all tests pass, look for [refactor candidates](refactoring.md):

- [ ] Extract duplication
- [ ] Deepen modules (move complexity behind simple interfaces)
- [ ] Apply SOLID principles where natural
- [ ] Consider what new code reveals about existing code
- [ ] Run tests after each refactor step

Refactor only from **GREEN**.

Completion criterion: refactoring began from green, preserves the agreed public
behavior, and leaves the full relevant suite green.

## Evidence policy

Match evidence to risk. Use representative databases, runtimes, migrations, and
adapters for claims that depend on them. A fast fake can drive the loop, but it
does not prove behavior that belongs to the real external implementation.
