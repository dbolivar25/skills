---
name: write-custom-lint
description: Use when a recurring, mechanically recognizable repository violation should become a Biome GritQL rule. Load it to prove the policy, pin installed Biome behavior, and test violations and allowed code before enforcement.
---

# Write a custom Biome lint rule

A custom rule turns repository policy into permanent executable feedback. It is
worth owning only when the policy is real, the syntax can recognize it with an
acceptable false-positive rate, and tests prove both sides of the boundary.

## 1. Prove the policy

Identify:

- the repository-owned rule or invariant being protected;
- concrete current violations and their consequence;
- the preferred replacement or correction;
- legitimate lookalikes that must remain allowed;
- whether Biome already has a built-in rule; and
- why documentation, types, an API change, or deleting the pattern would not
  enforce the boundary better.

Do not import a generic preference into a repository merely because a GritQL
pattern can detect it. Rules such as banning a framework hook, dynamic imports,
or a language feature require current local policy and counterexamples.

Completion criterion: current repository evidence establishes a repeated policy
violation, its correction, and its allowed exceptions; otherwise stop without
creating a plugin.

## 2. Pin the implementation surface

Inspect the repository's actual:

- installed `@biomejs/biome` version and executable;
- `biome.json` or `biome.jsonc` hierarchy;
- plugin directory, naming, registration, suppression, and test conventions;
- target languages and file scopes; and
- lint commands used by local development and CI.

Then check the current official Biome pages for
[linter plugins](https://biomejs.dev/linter/plugins/),
[GritQL](https://biomejs.dev/reference/gritql/), and the installed version's
release or migration notes. Biome's GritQL support is evolving and does not
implement every upstream Grit feature. CST node names can change with grammar
versions.

Keep existing config schema and conventions. Do not paste a remembered schema
version or assume every repository uses `rules/`.

Completion criterion: the installed version, supported syntax, target language,
plugin location, registration shape, and real validation command are current
facts.

## 3. Build the behavior corpus

Before the rule, create the smallest fixture set that expresses the boundary:

- at least one `flags-*` case for every syntax form the policy intends to catch;
- at least one `allows-*` case for every plausible false positive;
- an allowed correction for each diagnostic message; and
- suppression or generated-code behavior when the repository permits it.

Prefer real minimized repository examples. Keep each fixture focused enough that
one diagnostic can be attributed to one construct.

Completion criterion: the fixture corpus would reveal an over-broad rule as well
as an under-matching one.

## 4. Design the narrowest pattern

Read [`references/gritql.md`](references/gritql.md). Start with structural code
snippets. Use Biome CST node names only when snippets cannot express the boundary
precisely enough, because grammar-specific patterns carry more upgrade cost.

Prototype with `biome search` or the repository's isolated plugin harness before
registration. Expand one syntax form at a time. When the engine handles a broad
metavariable or nesting form unreliably, enumerate the intended forms rather than
claiming unsupported coverage.

The diagnostic must:

- highlight the smallest useful span;
- name the violated repository policy;
- state the available correction; and
- avoid asserting context the syntax cannot prove.

Completion criterion: every intended flag matches, every allowed case remains
clean, and each diagnostic points to an actionable correction.

## 5. Test the real plugin

Register the `.grit` file using the repository's current config shape. If the
installed Biome supports scoped plugin objects, use `includes` to reduce the
language and path surface when that makes the rule more honest.

Test through the installed Biome binary with an isolated config that enables only
the candidate plugin. Assert positive and negative fixtures separately. Then run
the repository's normal lint or check command and inspect every new diagnostic.

Do not rely on plugin parse success alone. A rule that matches nothing, matches
generated fixtures only, or floods unrelated code is broken.

Completion criterion: isolated fixtures and the repository's real lint command
pass with the intended diagnostics and no unexplained new findings.

## 6. Add a fix only when it is provably safe

Read [`references/fixes.md`](references/fixes.md) before adding a rewrite. A
diagnostic does not require an automatic fix.

Keep Biome's default unsafe classification unless every match can be rewritten
without changing runtime behavior, comments, type meaning, or surrounding
syntax. Test the rewritten output and idempotence. Mark `fix_kind = "safe"` only
when that stronger claim is proven for every supported match.

Completion criterion: the fix classification matches evidence, fixed fixtures
are exact, a second pass is clean, and the repository remains valid after the
appropriate write command.

## 7. Leave an ownership trail

Document in the rule or its tests:

- the invariant and correction;
- why important exceptions are allowed;
- any deliberate syntax omissions;
- the installed Biome behavior the pattern depends on; and
- how to run its focused tests.

Keep repository-specific facts in that repository. This skill owns the method,
not a catalog of policies every codebase should adopt.

Completion criterion: a future Biome upgrade or policy change has one obvious
test surface that will reveal whether the rule still earns enforcement.
