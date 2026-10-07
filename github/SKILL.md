---
name: github
description: Use when GitHub work needs a complete PR snapshot, review-thread resolution state, CI failure drilldown, or a non-trivial gh/API query. Acquire current platform facts with explicit coverage; use ordinary gh directly for ordinary operations.
---

# GitHub

Own the bounded platform acquisition or operation requested. Supply facts and completeness limits; a successful retrieval is not green CI, a resolved defect, or a review verdict.

## Select the acquisition

- PR state: use `scripts/pr-snapshot.ts` for metadata, current head/base, mergeability, checks, files, and conversation counts.
- Review conversation: use `scripts/pr-threads.ts` for review bodies, issue comments, inline threads, resolution, and outdated state. Snapshot and conversation answer different questions.
- CI failure: use `scripts/ci-failures.ts` to identify the failing run, jobs and steps, and saved full logs. Search the saved logs rather than repeatedly fetching snippets.

Read helper help for the actual arguments and output shape. Use raw gh when simpler. Verify the installed runtime and CLI behavior where it matters.

## Preserve currentness and coverage

Pin the actual comparison and current head for review or live action. Distinguish stale, outdated, resolved, failing, pending, and unavailable facts. Exhaust pagination when the task needs a complete conversation or file population.

Check inner comment/review pagination as well as outer thread pages. If a helper caps or omits data, continue the underlying API reads or disclose the exact coverage; a default success exit is not a completeness guarantee. Preserve truncation and has-next-page information in structured output as well as text.

Use GraphQL for resolution state that porcelain omits. Use current rulesets and required checks when the action depends on them. Read `references/pr-operations.md` for live comparison, review state, or an explicitly requested action; read `references/cli-gotchas.md` when gh/API query mechanics need depth.

## Act and return faithfully

Perform only actions authorized by the task. For multiline bodies, use a file or structured argument that preserves the exact text. For a live change, verify the current target, perform the requested operation, and read back its actual result. Attach created or worked-on PRs through the host's native artifact tools when required.

Return the useful platform answer, current target, material receipts, and exact missing coverage. Use Review for a requested correctness or merge assessment; no helper report supplies that judgment by itself.
