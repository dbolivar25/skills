---
name: review-dependency-bump
description: Use when reviewing a dependency bump PR for merge safety. Cross-references codebase usage against changelog to produce a risk assessment.
---

# Dependency Bump Review

Cross-reference codebase usage against all changes between old and new versions to assess merge safety.

## Workflow

### 1. Extract PR metadata

Run `gh pr view <number> --json title,body,files` and `gh pr diff <number>`.
Determine: package name, old/new versions, ecosystem (npm/pip/cargo/etc.), affected lockfiles and manifests.

### 2. Find all codebase usage

Search the source tree for every reference to the bumped package: imports, direct API usage, config references, and test files exercising it. Use the Explore agent for thorough searching. Record file paths, line numbers, and specific APIs/classes/functions used.

### 3. Review release notes and changelog

Retrieve the changelog between old and new versions. Sources in priority order:
1. Dependabot PR body (often truncated)
2. GitHub releases: `gh release list -R <owner>/<repo>` or individual release pages
3. CHANGELOG.md in the upstream repo

For each intermediate version, extract breaking changes, deprecations, bug fixes affecting used APIs, new exports, and transitive dependency swaps.

### 4. Cross-reference usage against changes

For each behavior-affecting change:
- Check whether the codebase uses the affected API
- Flag breaking changes, renamed exports, changed signatures, or removed features overlapping with actual usage
- Note dependency swaps affecting the build environment (e.g., native extensions added/removed)

### 5. Produce risk assessment

Present a structured summary:

**Usage summary** — files and APIs used from the package.

**Version changelog** — versions with key changes per version.

**Risk assessment** — one of:
- **Safe to merge** — no overlap between changes and usage
- **Likely safe, verify X** — minor concerns worth a manual check
- **Risky, needs attention** — breaking changes affect used APIs

Include reasoning: which APIs are unaffected and why, new transitive dependencies and implications, missing test coverage if relevant.
