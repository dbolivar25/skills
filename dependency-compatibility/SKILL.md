---
name: dependency-compatibility
description: Use when an upgrade or externally versioned component needs compatibility judgment against actual repository usage and runtime. Load it to trace the version delta, affected behavior, migration obligations, and missing proof.
---

# Dependency compatibility

Read the [core](core.md). Pin the component, selected version interval, target
repository and runtime. Acquire actual manifests, lock resolution, usage sites,
configuration, patches, containers and relevant checks. Search beyond imports to
include transitive consumers, defaults and build/runtime surfaces.

Read current primary upstream sources for the exact interval, including
intermediate releases, migration notes and platform constraints. Compare them
with the installed/resolved version. For a live PR, use GitHub evidence as needed;
upgrade planning does not require a PR to exist.

Apply the core. Obtain missing usage, upstream or runtime evidence through
available read-only surfaces. Execute a compatibility check only when the task
allows that execution; no fix, install or upgrade follows from assessment alone.
Keep unavailable real-runtime proof distinct from local or substitute evidence.

Return affected behavior, migration needs, supported conclusions and proof gaps.
The caller owns upgrade implementation or the integrated merge verdict.
