# Diagnostic operations

Use this method to construct the symptom signal, acquire useful production observations,
minimize a runnable reproduction, instrument a discriminating probe, and clean up an
authorized correction. Diagnosis-only and fix authority come from the current task;
reading this method grants no new product, production, or publication authority.

## Bound the target and effects

Establish diagnosis-only versus fix-authorized from the request and existing authority.
For diagnosis-only, inspect, reproduce through permitted surfaces, and return cause,
evidence, and correction direction. A reproduction may have ordinary effects; understand
them before running it and keep customer/product changes within the task's authority.
Do not apply a product correction merely because diagnosis found one. Prefer ephemeral
commands and redacted artifacts. Routine reversible local probes, scratch harnesses, and
temporary local instrumentation follow the task's authority and current working agreement.
When production instrumentation or another probe would exceed that authority, prepare the
smallest reviewable diagnostic change and resolve the missing authority before executing it.

Read relevant `GLOSSARY.md`, ADRs, code/configuration, and current release/runtime evidence.
For an operational target, verify the actual environment and identifiers before a
mutation. Keep the user's original symptom so a nearby failure cannot replace the task.

## Preserve receipts and redact

A receipt includes the command/query/harness, input or selector, environment/version,
window or run count, observed output, and assertion or measurement that carries the
signal. A command string or proposed harness is not an execution receipt.

Never print secrets. Use environment variables so credentials remain in the environment,
and quote only artifact lines carrying the signal; HAR files and captured requests often
contain auth headers. Redact secrets with `<REDACTED>` before sharing. If necessary
redaction removes answer-changing evidence, name the precise missing signal rather than
requesting unrestricted data.

## 1. Build the strongest available feedback loop

A tight pass/fail signal can make bisection, hypothesis testing, and instrumentation
productive. Put effort into a loop that catches the user's specific bug, rather than
merely returning successfully. Source reading helps construct and interpret the loop;
it can also support bounded hypotheses when a local loop is unavailable.

Try the useful options for the actual target:

1. **Existing failing test** at the unit, integration, or end-to-end seam reaching the
   bug. Add a test when edits are in scope.
2. **HTTP script** against a permitted running server, asserting the actual response.
3. **CLI with fixture input**, comparing output to a known-good independent snapshot.
4. **Headless browser** driving the UI and observing DOM, console, and network behavior.
5. **Captured trace replay** through the real code path: request, payload, or event log.
6. **Throwaway harness** exercising the minimal system with one call; keep it outside
   the repository where practical and remove or clearly preserve it at completion.
7. **Property/fuzz loop** when only some inputs produce wrong results; pin seeds and
   retain the failing input.
8. **Bisection harness** booting a known commit, dataset, or version and checking the
   same signal so `git bisect run` has an honest verdict.
9. **Differential loop** using identical input with old/new versions or two configs.
10. **Human-in-the-loop script** when only a human can perform the trigger. Copy and edit
    [the HITL template](../scripts/hitl-loop.template.sh); capture observations, with
    signing in left as a step rather than a captured credential.

Tighten a loop by caching setup, excluding unrelated initialization, asserting the exact
symptom, and controlling time, random seeds, filesystem, scheduling, and network when
those controls preserve the relevant behavior. A faster loop is useful only if it still
catches the original bug. Record the actual invocation and redacted output.

For a runnable local loop, check that it drives the real failure path, is repeatable at a
known rate, is practical for iteration, and is agent-runnable when possible. A human loop
names that limitation. These properties guide improvement; they are not a universal gate
that prevents production-only reasoning.

### Intermittent and distributed failures

Measure a denominator: failures per attempt, affected entities per population, or latency
over comparable requests. Repeat the trigger, add stress, narrow timing windows, or
control scheduling when those probes are safe and relevant. A higher reproduction rate
can help; do not assume that a low rate is undebuggable. Report run count, rate, seed,
window, and selection effects rather than claiming determinism.

### When a local reproduction is unavailable

Record what was tried and why it cannot reproduce the exact symptom. Choose a bounded
observation strategy: current logs/traces/profiles, correlated request/state histories,
read-only database observations, configuration/release comparison, or a production
counterexample. Pin population, selectors, windows, versions, and comparison group.
Use [Grafana](../../grafana/SKILL.md) for the selected telemetry mechanics.

An observation may support a hypothesis without recreating the failure. Retain the
limits: visibility, missing events, confounded rollout, customer permissions, unmatched
workloads, or unobservable internal state. Ask for access or a redacted artifact only
when the next useful observation cannot be obtained independently. Lack of a local red
command does not require stopping or inventing a cause.

## 2. Confirm the symptom and minimize without breaking fidelity

For a runnable loop, verify that the observed error, wrong result, timing, or state is
what the user reported. Repeat it enough to understand stability or the failure rate,
and preserve the exact signal for later correction checks.

Shrink inputs, callers, configuration, data, and steps one at a time, rerunning after each
cut. Keep the original case as a comparison. The ideal minimized case retains the same
symptom and makes the remaining load-bearing elements visible. Stop minimizing when
further cuts would erase the causal path or cost more than the next discriminating probe.
Do not require proof that every element is indispensable before forming useful
hypotheses, and do not treat a simplified green case as proof that production is healthy.

For production-only evidence, minimize the observation scope rather than creating a false
local equivalence: a single affected request, explicit state transition, cohort, or trace
can focus the question while retaining the distributed/permission/runtime context.

## 3. Rank explanations and choose one useful probe

Use [causal reasoning](causal-reasoning.md) to assess signal adequacy, rank a small set of
falsifiable explanations, and choose the next observation. For each explanation, state
why it fits and what result distinguishes it from the strongest alternative. There is
no fixed hypothesis count. Show the material ranking and proceed with obtainable probes;
owner context can change the next ranking without becoming a prerequisite for every run.

Control one relevant cause at a time. Feed each actual result back into the ranking,
recording what it supports, rules out, or leaves unresolved. A failed harness or unavailable
debugger is an acquisition limitation, not falsification of a product hypothesis.

## 4. Instrument where hypotheses differ

Prefer a debugger or REPL observation when the environment supports it. Otherwise use
targeted logs at the boundary separating live explanations. Do not log everything and
search afterward. Tag temporary logs with a unique prefix such as `[DEBUG-a4f2]` so cleanup
has one precise search. Preserve safe projections and avoid sensitive payload dumps.

Verify the selector, instrumentation coverage, and logging/sample policy before treating
silence as evidence. Trace the input and branch far enough to establish that the expected
observation would be emitted.

For performance, logs are often the wrong tool. Pin a baseline timing harness,
`performance.now()` observation, profiler, query plan, or production profile; identify the
actual bottleneck before changing code. Compare the same workload, runtime, windows,
units, denominators, and distributions before and after. A lower average from a different
request mix does not establish an improvement. Bisection can distinguish a version or
configuration effect when the workload and target remain comparable.

## 5. Apply an authorized correction at the supported seam

Diagnosis-only ends with the supported cause/correction direction or ranked live
explanations and the smallest next observation. A speculative fix is not a substitute for
causal evidence.

When fixing is requested, use [behavioral testing](../../engineering/references/testing.md)
to choose a meaningful regression. The correct seam exercises the real bug pattern as
it occurs at the call site. A single-caller unit test cannot establish a bug requiring
multiple callers; a helper test cannot establish a broken runtime chain.

If a useful regression seam exists, turn the faithful reproduction into a test, observe
its intended failure, apply the correction, and observe it pass. Test-first for that
regression does not impose the full TDD workflow on the task. If no seam can represent the
failure, document the missing proof and use the strongest actual runtime observation;
absence of a seam may justify a separate design finding.

When validating a regression by deliberately mutating code or a fixture, save the
untouched contents and compare them with the forced version before interpreting the
run. A targeted diff must show that the intended edit landed in the file and path
the test exercises. A successful edit command or a marker found elsewhere is not
that proof. Observe the intended failure, restore the exact prior contents without
discarding unrelated edits, and rerun the corrected case.

Rerun the original unminimized scenario or matched production observation, plus relevant
surrounding checks. A green minimized regression does not alone prove that the original
symptom stopped. For performance, preserve behavior and compare like workloads, reporting
numbers and tradeoffs.

## 6. Clean up and report the actual result

Before claiming a usable fix, verify the original symptom, relevant regression/checks,
and removal of temporary logs, forced failures, altered scheduling, or probe-only hooks.
Search the unique instrumentation prefix with `rg`. Delete throwaway code or move it to a
clearly marked agreed diagnostic artifact location. Retain a permanent harness only when
its ongoing ownership is useful and within scope.

State the supported mechanism, decisive evidence, discarded alternatives, and remaining
limits. When a commit/PR/report is requested, explain the cause so a later debugger can
recover it. Consider what would have prevented the bug as a separate follow-up finding: a poor
seam, hidden coupling, or tangled ownership can inform an [architecture study](../../engineering/references/architecture.md),
but does not silently select a larger refactor.
