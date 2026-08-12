# Dependency bump lens

Load this reference only when the reviewed change updates a dependency version,
lock graph, runtime image, generated client, browser/toolchain release, or other
externally versioned component.

This lens supplies evidence to the code-review judge. It never owns the merge
recommendation.

## Pin the real delta

From the live review target, establish:

- package, image, tool, or generated component;
- old and new exact versions, including every intermediate release;
- ecosystem and affected manifests, lockfiles, images, and generated artifacts;
- resolved transitive graph changes;
- supported runtime, operating system, architecture, browser, or build-platform
  constraints; and
- whether the repository can reproduce the new resolution from its declared
  sources.

Use `better-github` for live pull-request state. Inspect the actual lock graph and
repository configuration rather than relying on a bot-authored summary.

Completion criterion: the exact before-and-after component and its runtime
envelope are known; a manifest-only view is insufficient when resolution or
platform behavior can differ.

## Trace repository usage

Search for every relevant surface, not only imports:

- direct APIs, types, exports, command-line calls, and protocols;
- configuration keys, plugins, adapters, patches, and wrappers;
- build scripts, containers, native extensions, browser installs, and CI setup;
- data formats, generated output, serialized state, and migrations;
- tests that execute the changed behavior on the affected platform; and
- transitive consumers whose behavior changes despite no direct import.

Record concrete files, symbols, and behaviors. Treat absence of a textual import
as one data point, not proof of non-use.

Completion criterion: every repository surface that can observe the version
change is either traced or named as an evidence gap.

## Read current upstream evidence

Use current primary sources for the exact version interval: release notes,
changelog, migration guide, compatibility matrix, security advisory, package
metadata, and supported API documentation. Check the installed or resolved
version against those sources.

For each intermediate release, retain only behavior that intersects the
repository's usage or runtime envelope:

- breaking and deprecated APIs;
- changed defaults, semantics, or error behavior;
- dependency swaps and native or platform requirements;
- build, packaging, browser, or generated-artifact changes;
- security fixes with relevant reachability; and
- known regressions or required migrations.

Bot summaries and remembered migration advice are discovery aids, not current
authority.

Completion criterion: every relevant upstream claim names its authoritative
source and exact applicable version range.

## Cross-reference behavior

For each relevant upstream change, state:

1. the repository behavior that can reach it;
2. the mechanism by which the version change affects that behavior;
3. the current test, runtime, or source evidence that supports the conclusion;
4. the consequence if the assumption is wrong; and
5. the smallest proof still needed.

No direct API overlap lowers one class of risk. It does not prove merge safety:
transitive dependencies, defaults, packaging, native code, images, browsers,
protocols, and unsupported platforms can still change behavior.

Completion criterion: compatibility conclusions follow from usage plus upstream
behavior plus runtime evidence; lack of overlap is never the sole safety claim.

## Return evidence to the judge

Return:

```md
## Dependency delta
<exact old/new versions, resolution, and platform envelope>

## Repository usage
- <location, API or behavior, and relevant coverage>

## Relevant upstream changes
- <version and primary source> — <intersection with usage>

## Platform and transitive risk
- <observed change, consequence, and evidence>

## Lens findings
- <candidate finding or "No compatibility defect found in the checked scope">

## Proof gaps
- <exact runtime, platform, or migration evidence still missing>
```

Do not return `safe to merge`, `approve`, or another final verdict. The parent
judge integrates this evidence with request fit, the rest of the diff, CI,
review history, and all other lenses.
