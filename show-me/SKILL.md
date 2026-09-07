---
name: show-me
description: Use when the user asks for a visual explanation, interactive demonstration, or throwaway prototype, or a material relationship is hard to understand in prose. Load it to choose a visual that explains an established answer or an experiment that resolves an open question.
---

# Show me

Use a visible artifact to make the next judgment easier. First decide whether
the answer is **known and needs explaining** or **unsettled and needs exploring**.
That distinction determines the method and what the artifact can prove.

## Choose the branch

| Situation | Read before creating the artifact | What to deliver |
| --- | --- | --- |
| Logic, relationships, structure, or a change can be explained from known evidence | [Visual forms](references/visual-forms.md) | The smallest useful sketch, diagram, or focused HTML explanation |
| State, transitions, or the logic model need to be tried | [Experiment contract](references/experiments.md) and [logic experiment](branches/logic-experiment.md) | One shareable HTML demo with visible state, free play, and guided scenarios |
| UI structure or appearance needs comparison | [Experiment contract](references/experiments.md) and [UI experiment](branches/ui-experiment.md) | Structurally different variants on one route with direct selection and a switcher |

An interactive explanation is not automatically an experiment. A prototype is
chosen because a question remains open, not merely because HTML is convenient.
If the distinction is unclear, inspect the supplied evidence and question before
choosing. Carry an explicit user choice forward.

## Keep the visual honest

Use real domain labels and data or clearly identified examples. Show the calls,
files, props, states, boundaries, or transitions needed to answer the question.
Keep context when omitting it would hide ownership or order. Match an existing
product's colors, type, spacing, and components when the artifact represents it.

Place the visual beside the short explanation it supports. Skip ceremonial
preambles and do not make the user inspect every possible view. One well-chosen
view can be enough; use more only when they expose different material relationships.

For an explanation, existing evidence supplies the answer; inspect the rendering
for accuracy and legibility. For an experiment, preserve the question, observed
answer, limits, and runnable artifact as the learning source. Follow its branch's
scratch-data and capture rules. A promising result does not establish production
readiness or authorize implementation.

Open a local HTML artifact with the viewer supported by the current host and
return a usable path. Do not pretend the artifact was rendered or exercised when
only its source was written. Prototype shortcuts apply only to experiments;
they do not weaken the source accuracy required of an explanation.
