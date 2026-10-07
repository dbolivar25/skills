# Dependency and runtime compatibility

Acquire exact old/new versions, the resolved lock graph, runtime envelope, repository
usage, and primary upstream release/migration records for the interval. Obtain accessible
facts yourself; remaining gaps identify a precise missing observation.

Use this method when a proposed or actual change updates a dependency version, lock
graph, runtime image, generated client, browser/toolchain release, or other externally
versioned component.

Return a compatibility assessment: affected usage, migration obligations,
supported conclusions and exact proof gaps. It supports upgrade planning and code review
without selecting either implementation or a merge verdict.

## Pin the real delta

From current component, resolution, and runtime records, establish:

- package, image, tool, or generated component;
- old and new exact versions and the release interval between them;
- ecosystem and affected manifests, lockfiles, images, and generated artifacts;
- resolved transitive graph changes;
- supported runtime, operating system, architecture, browser, or build-platform
  constraints; and
- whether the repository can reproduce the new resolution from its declared
  sources.

A bot-authored summary cannot substitute for the lock graph and runtime records. Return
missing exact versions, resolution or platform facts as evidence needs.

Completion criterion: the exact before-and-after component and its runtime envelope are
known; a manifest-only view is insufficient when resolution or platform behavior can
differ.

## Trace repository usage

Trace every relevant repository surface, not only imports:

- direct APIs, types, exports, command-line calls, and protocols;
- configuration keys, plugins, adapters, patches, and wrappers;
- build scripts, containers, native extensions, browser installs, and CI setup;
- data formats, generated output, serialized state, and migrations;
- tests that execute the changed behavior on the affected platform; and
- transitive consumers whose behavior changes despite no direct import.

Record concrete files, symbols, and behaviors. Treat absence of a textual import as one
data point, not proof of non-use.

Completion criterion: every repository surface that can observe the version change is
either traced or named as an evidence gap.

## Reconcile upstream behavior

Require primary-source evidence for the exact version interval: release notes,
changelog, migration guide, compatibility matrix, security advisory, package metadata,
and supported API documentation. Compare the installed or resolved version with
those sources. Cover the interval with authoritative cumulative guidance or the
individual releases needed to reveal relevant changes; do not rely only on the target
release's highlights. An unknown endpoint or uncovered part of the interval is an
evidence gap.

Across that interval, retain behavior that intersects the repository's
usage or runtime envelope:

- breaking and deprecated APIs;
- changed defaults, semantics, or error behavior;
- dependency swaps and native or platform requirements;
- build, packaging, browser, or generated-artifact changes;
- security fixes with relevant reachability; and
- known regressions or required migrations.

Bot summaries and remembered migration advice are discovery aids, not current authority.

Completion criterion: every relevant upstream claim names its authoritative source and
exact applicable version range.

## Cross-reference behavior

For each relevant upstream change, state:

1. the repository behavior that can reach it;
2. the mechanism by which the version change affects that behavior;
3. the current test, runtime, or source evidence that supports the conclusion;
4. the consequence if the assumption is wrong; and
5. the smallest proof still needed.

No direct API overlap lowers one class of risk. It does not prove merge safety:
transitive dependencies, defaults, packaging, native code, images, browsers, protocols,
and unsupported platforms can still change behavior.

Completion criterion: compatibility conclusions follow from usage plus upstream behavior
plus runtime evidence; lack of overlap is never the sole safety claim.

## Return the compatibility assessment

Present the assessment in the order useful to the caller. This shape is optional:

```md
## Dependency delta
<exact old/new versions, resolution, and platform envelope>

## Repository usage
- <location, API or behavior, and relevant coverage>

## Relevant upstream changes
- <version and primary source>: <intersection with usage>

## Platform and transitive risk
- <observed change, consequence, and evidence>

## Compatibility findings
- <candidate finding or "No compatibility defect found in the checked scope">

## Proof gaps
- <exact runtime, platform, or migration evidence still missing>
```

Do not return `safe to merge` , `approve` , or another final verdict. Combine this assessment with the requested job
criteria before making a broader recommendation. A review includes request fit,
other changes, CI and discussion; upgrade planning includes the requested version and
migration scope. Unknown target versions remain explicit evidence needs, never guesses.
