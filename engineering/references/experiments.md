# Logic and runtime experiments

Use when an unresolved question about behavior, state, transitions, data shape, or runtime
mechanics is cheapest to answer with a temporary implementation. A known answer needing
explanation needs a demonstration, not an experiment. Appearance/interaction questions
use [interface prototypes](../../interface-design/references/prototypes.md).

## Design a discriminating observation

Name the unresolved question and the decision it can change. Establish the current
surface/model, domain constraints, available observations, and alternative outcomes.
If the question is missing, recover it or ask the owner rather than inventing a project.

Specify the smallest runnable experiment:

- invariant brief and relevant inputs/actions;
- visible state or measured outcome;
- alternative results and the observation distinguishing them;
- fidelity necessary for that distinction;
- comparable inputs, workloads, units, and conditions;
- what the experiment cannot establish.

Change one relevant condition at a time when isolating a cause. Use the actual runtime,
database, framework, scheduler, or adapter when a simplified model cannot answer the
question. Scratch data lowers construction cost but is not production evidence. A
persistence question needs a clearly named scratch environment and an independent stored
state observation; in-memory state cannot prove database semantics.

## Build and run the smallest credible artifact

Mark the code as temporary from the start and place it near the module being explored or
in the agreed artifact location. Give it one obvious command in the project's task runner.
Avoid abstractions and polish that do not affect the question. Add tests or error handling
when needed to make the observation credible or safe; there is no categorical no-tests
rule. Maintain the task's accessibility, authorization, data, and brand constraints even
at low fidelity.

Execute the distinguishing scenarios and capture actual input, environment, output, and
assertion/measurement. A failed run is a limitation rather than an imagined result. Refine
only as far as the question requires. Compare observations with alternative predictions,
carry confounds forward, and return the supported learning and next decision.

## A shareable state-model demo

A single self-contained HTML file can let a designer, PM, or domain expert press buttons
and inspect a model without installing anything. It suits questions such as:

- Does the state machine handle X followed by Y?
- Can the data model represent this awkward business case?
- Which API operations feel coherent when driven through real scenarios?

It does not prove server, database, or asynchronous runtime behavior. A CLI, test harness,
or actual-runtime probe is better when those mechanics decide the question.

### Keep the logic portable

Put the logic in a small module separate from the page. Useful shapes include:

- a pure reducer `(state, action) => state` for discrete events;
- explicit states/transitions when legality is the question;
- pure functions over a plain data type for transformations;
- a module or class with a clear surface when it truly owns ongoing state.

Choose the shape fitting the question, not the easiest UI wiring. The pure module contains
no DOM, `document`, or button handlers; the page calls it. Portable code remains prototype
work until normal implementation checks establish that reuse is sound.

### Show state and awkward scenarios

A plain HTML/CSS/JS artifact can keep everything inline and open by double-click. Use
domain language for labels and a readable state panel rather than a raw JSON dump. Show:

1. The title and question in a visible introduction.
2. Full relevant current state after each action, calling out changes when useful.
3. Free-play actions so the model can be poked in any order; show rejected/illegal
   transitions clearly instead of hiding the case under disabled controls.
4. Guided walkthroughs with a known reset state, plain-language scenario, and real
   action buttons. Cover the happy path, a tricky edge, and an illegal attempt.

Keep typography, spacing, and one accent quiet enough that state and actions dominate.
A user's “that should not be possible” or “I expected something different” can expose a
model flaw. Add actions/scenarios only when they answer the live question. Do not blur
logic into the shell or generalize for an imagined future.

## Runtime and diagnostic probes

For concurrency, cancellation, retries, serialization, import-time effects, cache scope,
or SDK/platform behavior, build a probe through the real execution path. Pin relevant
inputs, versions, scheduling, and environment. Observe the actual contract, not merely a
helper or a shape that resembles it. A differential probe runs the same input under the
old/new version or two configurations; a timing probe compares the same workload and
reports variance and denominators. Use [debugging operations](../../debugging/references/operations.md)
when a symptom requires repeated hypothesis/probe iteration.

## Preserve learning and clean the target

Record the question, observed answer, limits, and context pointer alongside the artifact
as primary evidence. Preserve it in the agreed location or a throwaway branch; publishing
to an issue needs the surrounding task's authority. Remove exploratory hooks and
instrumentation from the usable product. Retain a harness only if its ongoing ownership
is justified.

When implementation is authorized, carry supported learning into real code using normal
contract, integration, and verification work. Otherwise deliver the observed learning and
runnable artifact. The experiment's success is decision evidence, not production
verification or permission to ship its shell.
