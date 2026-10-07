# Reproduction adequacy and causal discrimination

Use when symptom, reproduction, or probe evidence needs careful interpretation. Acquire
exact expected/observed behavior, environment, affected population, timing, source
context, actual receipts, and the task's correction scope. Keep observation, supported
inference, hypothesis, and missing proof distinguishable.

## Judge the signal before claiming a cause

A runnable reproduction should have been executed and should drive the actual symptom.
Its receipt identifies command/harness, input/environment, output, and assertion catching
this bug. It is practical for iteration, agent-runnable where possible, and repeatable
at a stated rate. For intermittent behavior, report measured failure rate and run count
instead of inventing determinism. Human-in-loop evidence names that limitation.

Minimization strengthens interpretation only if the reduced case retains the same
symptom. Check observations showing what removed input/caller/configuration did not
matter, and what relevant behavior remains. Missing minimization is a fidelity limit,
not a universal bar to useful investigation. Keep the original case for comparison.

For a production-only investigation, judge the bounded observations instead: current
versions/environment, population and selectors, windows/denominators, instrumentation
coverage, and the mechanism each source can reveal. Source and telemetry can support
falsifiable explanations despite no local red command. A planned query is not a result;
a reproduction claim without its receipt is unverified. Name exact missing observations
and choose the next useful acquisition rather than treating unavailable evidence as a
product failure.

## Rank live alternatives

Use a small ranked set of explanations based on the evidence; do not enforce a fixed
count. Avoid anchoring on a single favored story when material alternatives remain.
Each explanation states:

- how it fits the observed symptom and mechanism;
- facts or counterevidence that weaken it;
- a falsifiable prediction;
- an observation distinguishing it from the strongest alternative.

“Changing X would remove or worsen Y” is a useful prediction when X can be controlled.
An observational prediction can also discriminate: “If expired access is the cause, the
same user's failed requests should reach the denial branch while matched successful
requests do not.” Neither is established until its actual result is observed.

Choose the cheapest probe able to change the ranking. Prefer one relevant variable, a
real seam, and explicit alternative expected outcomes. For performance, timing/profile/
query-plan comparison may carry more signal than logs. For logical state, a faithful
[logic experiment](../../engineering/references/experiments.md) can test an invariant;
its model is not evidence of unexercised runtime behavior.

## Incorporate actual observations

Record which predictions were observed, which alternatives are weakened, and which
confounds remain. An unavailable debugger, failed harness, missing log, or failed query
is not falsification of a product explanation. Verify selectors, sample policy, and
instrumentation before inferring from absence. Preserve contradictory results and
alternative interpretations.

A deployment correlation alone does not establish cause. A controlled old/new comparison
can establish a version-associated effect for that workload; further code/trace evidence
may be needed to identify its mechanism. A simplified model succeeding rules out only
failures its fidelity could expose. Repeat or refine when results cannot distinguish the
live alternatives, avoiding several simultaneous changes that erase attribution.

## State the strongest supported answer

Call a cause established when actual observations support its mechanism and discriminate
material alternatives at the relevant seam. Otherwise return the ranked remaining
explanations, exact uncertainty, and smallest next observation. Scope certainty to the
population, environment, and behavior checked. Source reasoning may support a likely
mechanism with explicit limits without deserving “verified cause.”

Name correction direction and regression seam. A test at the wrong seam cannot lock down
the real failure pattern; missing seam evidence may be a design finding, not permission
for a larger refactor.

For an authorized correction, assess the original unminimized loop or comparable original
observation, correct-seam regression when available, relevant runtime behavior, and
instrumentation cleanup. A green regression alone does not show the original symptom
stopped. Separate implementation, local checks, deployment, and observed runtime recovery;
return exact remaining gaps instead of promoting one receipt into all of them.
