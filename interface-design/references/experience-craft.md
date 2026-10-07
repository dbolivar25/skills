# Experience craft

Read this when a surface needs design judgment: it works but feels weak, the next action is unclear, or structure, state, and motion do not agree. For a narrow mechanic, go directly to the matching [code pattern](code-patterns.md). For an unsettled interaction, use [prototypes](prototypes.md).

A resolved interface serves a particular human moment. It feels credible because its structure, visual grammar, controls, states, and timing agree. Decoration cannot repair the wrong task or a broken interaction.

## Notice before prescribing

Inspect the actual screen, surrounding flow, content, and runtime behavior. Name the **moment**: who is here, what they are doing, their device and state, and what matters emotionally or practically. A checkout, filing flow, playful onboarding, and dashboard can use the same component for different reasons.

Turn reactions into causes. “Premium” or “off” is a starting reaction. “Three equal headings compete with Save” identifies a hierarchy problem. Look for hesitation, an expectation gap, a missing object, crowding, sluggish response, a brittle transition, or a loss of trust. A screenshot can show composition; it cannot show focus recovery or request ordering. Obtain the observation the judgment needs.

The **floor** is the platform and category expectation users already bring. Use local product precedent first, then [platform floors](platform-floors.md) and current examples where needed. A reference product is a comparison, not authority to copy its personality. Choose a few **facets** that describe this product in this situation: precise, fidgetable, durable, editorial, inventive, calm. They should help choose between real treatments, rather than merely praise the result.

## Choose range or depth

**Range** explores different structures before commitment. Removing a step, automating it, changing the primary object, or inverting the flow produces range. Different colors on the same control usually produce **depth**: refinement within an existing direction.

When the direction is open, use [expressive direction](expressive-direction.md). When it is settled, preserve the choice and deepen the important surface. If taste remains hard to explain, make a small concrete comparison. For a question about feel, expose the relevant duration, easing, spacing, scale, or other driver in a breakable toy rather than guessing through repeated edits. [Worked examples](worked-examples.md) show these choices in context.

Choose the cheapest fidelity that can answer the question: sketch, wireframe, state gallery, live tuning, prototype, or real application. A hand-timed spinner cannot settle actual latency. A blank page cannot establish how a component belongs inside a dense workspace.

## Make the structure and grammar agree

Resolve the task and reading order before tuning the material. Decide what belongs on the screen, what can disappear, and what needs later disclosure. Give the intended object and next action clear visual priority.

**Composition** uses contrast, hierarchy, proximity, balance, whitespace, repetition, and unity to guide attention. Diagnose a specific visible failure, then change its cause. **Grammar** is the local language of alignment, typography, color, borders, icons, radii, fills, shadows, and motion. An attractive outlier can still read as a defect when it breaks that language.

Name the active edges, axes, baselines, and grouping relationships. Reduce competing invisible rules. Use optical judgment: equal spacing, mathematically centered boxes, matching color lightness, and straight travel can look wrong. The [code patterns](code-patterns.md) supply concrete examples for type, wrapping, alignment, corners, shadows, masks, and compositing. Their numbers are tunable examples; the visible relationship is the reason to use them.

Prefer less scope with resolved execution when quality is thin. Do not remove a required capability to make polish easier. Reduce optional ornament or alternatives, then finish the essential experience.

## Treat time and state as design material

**Drivers** map changing inputs to visible properties: pointer, scroll, gesture, time, state, or data drives position, size, opacity, color, rotation, or depth. Name the relationship and range. Motion should explain change, preserve continuity, or provide useful feedback. Inspect interruption, reversal, rapid repeated input, and the first frame in the actual runtime.

**Tactility** includes usable hit areas, keyboard access, focus, hover where supported, press feedback, and recovery. A visible control that is hard to operate is unfinished. Keep reduced-motion alternatives and essential information available without the effect.

Account for states the actual task can reach, including combinations: loading, empty, restricted, long content, errors, cached data, retry, and completion. A state gallery can reveal what static happy-path comps hide. Preserve the user's edits, place, and focus when async work fails.

Waiting is part of the interface. Use background work, prior cached state, or useful progress when appropriate. An optimistic write needs a credible success expectation and a recovery policy at the real data boundary. Do not roll back newer work with an older failure or make pending state look confirmed. A domain with consequential effects may require waiting for confirmation.

**Care** shows up in neglected parts: invoices, refunds, permissions, offline states, accessibility, support-adjacent flows, and rare but costly failures. It need not add visual delight; it should make the experience more trustworthy.

## Intervene and check

For an authorized implementation, change the cause you identified and inspect the result in context. Exercise relevant states, content extremes, input methods, and viewport sizes. For critique, connect each finding to an observation, user consequence, and direction of change. For a design proposal, make the choice concrete enough to compare and use.

Finish when the requested experience is usable and the observations support the claimed improvement. Name an untested consequential state plainly. Source code, a build, or a list of style changes cannot establish the interaction by itself.
