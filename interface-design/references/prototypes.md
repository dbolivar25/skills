# Question-driven prototypes and experiments

A prototype answers an unsettled question through a runnable observation. First
name the decision it informs. A known relationship needing explanation belongs
in a visual demonstration; a production change with a settled design belongs in
normal implementation work.

## Define the observation before building

Write down the question, invariant brief, inputs/actions, relevant visible state,
and alternative outcomes that would change the decision. Name the observation
that distinguishes them and the fidelity it needs. Choose the cheapest credible
surface: sketch, wireframe, state gallery, breakable toy, live tuning panel,
throwaway route, or the actual application runtime.

Keep the user, purpose, required content, brand, accessibility, and authorization
constraints fixed while comparing alternatives. Auth boundaries remain real even
when the rendering is exploratory. Scratch data makes construction cheaper; it
does not provide evidence about real persistence or integration.

Examples:

- **Does changing a filter preserve the reader's place?** Compare the same long
  result list with instant local changes, slow responses, and out-of-order
  completion. Observe scroll, selection, focus, and stale results. A static comp
  cannot settle this.
- **Which structure makes the next action obvious?** Compare layouts under the
  same real records, density, navigation, and content extremes. Observe the path
  through the task, not only the isolated screenshot.
- **Does the motion feel responsive when reversed?** Expose duration, easing,
  spring, and displacement controls; toggle rapidly in the actual component.
  Observe interruption and the first frame, not only uninterrupted playback.

## UI structure and appearance

An existing page is usually the strongest context. Keep its real header,
sidebar, data fetching, route parameters, and auth. Swap the rendered subtree
rather than creating an empty page where every option looks plausible. A new
surface that naturally belongs inside a page should be mounted there. Create a
clearly named throwaway route only when there is no sensible host, following the
project's routing convention.

Create only the alternatives needed to answer the question. For open taste,
make them structurally different: reading order, information hierarchy,
primary affordance, density, or interaction model. A color change is useful for
a color question; it is insufficient evidence about a different layout. Use
[expressive direction](expressive-direction.md) when the underlying idea is open.

A shareable `?variant=` switch can keep the comparison reload-stable:

```tsx
const variant = searchParams.get("variant") ?? "list";
return (
  <>
    {variant === "list" ? <ListDirection {...data} /> : <WorkspaceDirection {...data} />}
    <PrototypeSwitcher variants={["list", "workspace"]} current={variant} />
  </>
);
```

A small bottom switcher may expose previous, current name, and next. Use the
framework router to change the parameter. Keyboard cycling must not intercept
input, textarea, contenteditable, or an existing arrow-key control. Mark the
switcher as prototype UI and gate it out of production. Do not hide important
content under it. Share components that belong to the invariant brief, but let
alternatives disagree about structure.

For feel, temporary controls for spacing, duration, easing, blur, shadow,
position, scale, rotation, or generative parameters beat repeated blind edits.
Use the real surface and [code patterns](code-patterns.md#tunable-values).

## State and logic

When uncertainty is about transitions or data shape, expose state and actions.
A single shareable HTML file is useful when a handmade model can answer the
question without framework or integration behavior. Make it easy to open, and
use domain language throughout.

Keep the model separate from the page. Choose a pure reducer `(state, action) =>
state`, explicit state machine, a few pure transformations, or a module that
actually owns ongoing state. DOM handlers call the model; the model does not
reach into the DOM. This separation makes the model inspectable, but reuse still
requires normal integration checks.

A useful shell includes:

1. The question and what to watch for.
2. Full relevant state as labeled fields, updated after every action; show what
   changed when that helps.
3. Free-play actions, including attempts that should be rejected with a visible
   reason rather than silently disappearing.
4. Guided scenarios: known reset state, plain description, real action buttons,
   and the happy, awkward, and illegal sequences that matter.

Do not generalize for imagined future needs. In-memory state is a reasonable
starting point unless persistence is the question. For persistence, use the
named scratch environment and observe the actual read/write/restart behavior;
an in-memory demo cannot prove a database contract.

## Fidelity and runtime

Use the real runtime whenever the handmade model cannot answer the question:
keyboard focus, browser layout/measurement, concurrent requests, cancellation,
latency, auth, component lifecycle, persistence, provider or application
integration. A hand-timed spinner cannot establish real latency, and simulated
focus cannot establish native focus behavior. Name substitutes and what each
cannot prove.

Read-only data or controlled stubs are suitable for visual comparison. Mutation
prototypes should use a scratch environment when the real effect is irrelevant.
If the effect itself is the question, run the relevant authorized integration
with observable receipts; do not silently simulate it and report success.

Mark throwaway work clearly. Keep it close to the module or page whose question
it answers, or in the agreed artifact location. Provide the smallest dependable
run/open path. Add checks when needed to trust the experiment: a model invariant,
scenario regression, or a probe of the actual runtime can be useful. Tests do
not make a prototype cease to be a prototype. Avoid unnecessary architecture,
polish, or unrelated error handling, while keeping the experiment runnable and
its important failure paths visible.

## Observe, preserve, and finish

Run the scenarios and record what happened. Compare the observation with the
question: what it supports, what it contradicts, what failed to run, and what
remains undecided. A schedule, intended behavior, selected screenshot, or code
inspection is not an observed result.

Preserve the question, actual learning, fidelity limits, and a context pointer
to the runnable prototype as primary evidence. A short note may suffice:

> Under a 700ms response and two rapid changes, the list kept the selected row
> and ignored the older result. Keyboard focus returned to the filter. This
> used the real page with stubbed responses; provider latency and auth were not
> exercised. Source: [prototype location], scenarios: [run path].

If implementation is part of the authorized task, carry the supported design
into the real surface, remove exploratory alternatives and controls from the
production path, and verify the integrated states and interactions. Otherwise,
deliver the learning and usable artifact. Prototype evidence informs the
production decision; it does not stand in for production verification.
