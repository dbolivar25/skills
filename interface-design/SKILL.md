---
name: interface-design
description: Use when designing, implementing, or improving a human-facing interface. Read the actual surface, apply relevant visual and interaction craft, and verify the states people will use. For an open direction, create meaningful range before choosing and deepening it.
---

# Interface Design

Own the interface as an experience: the user's moment, information, controls, states, movement, and perceived performance. Inspect the existing surface and surrounding product before choosing a direction. Use Augment Design for an Augment-branded surface.

## Choose the work

- Existing surface: identify what fails or feels weak in context, preserve useful grammar, and improve the specific experience.
- Open direction: read `references/expressive-direction.md`, derive an underlying visual idea from the product and the user's moment, establish the available expressive freedom, and create meaningful structural range. Choose with reasons tied to the user's task and the product, then deepen the direction coherently.
- Unresolved interaction: build the smallest runnable experiment that can answer the question. Use only the alternatives or controls needed for a discriminating observation.

For an existing surface or a question about feel, read [experience craft](references/experience-craft.md) before choosing the intervention. It turns reactions into observable causes and distinguishes range from depth.

Select additional depth by the decision in front of you:

| Decision | Read before deciding |
| --- | --- |
| What the platform or category already owes its users | [Platform floors](references/platform-floors.md), then current platform guidance when a detail matters |
| How to implement a particular visual or interaction mechanic | The matching section of [code patterns](references/code-patterns.md) |
| How to apply range, depth, or care to a similar problem | The matching [worked example](references/worked-examples.md) |
| What a runnable comparison can actually settle | [Prototypes](references/prototypes.md) |

The examples supply starting points, not a universal grid, shadow, corner, or animation law. Keep the surface's established grammar unless a departure earns its cost.

## Make the experience complete

Work through the actual task and its normal, loading, empty, error, restricted, long-content, and responsive states where relevant. Make progress and recovery understandable. Preserve keyboard access, focus, semantic structure, contrast, and reduced-motion behavior.

Use motion to explain change, maintain continuity, or make interaction feel responsive. Consider interruption, reversal, repeated input, and real asynchronous timing. Keep implementation details out of the user's flow unless they help a meaningful decision.

For a prototype, define the question and visible observation before building. A small state or timing control may suffice. Use the real runtime when a handmade model cannot establish focus, concurrency, latency, or integration behavior. Report what was actually observed and what the prototype cannot prove.

## Verify in context

Inspect the output in its intended environment and relevant states. Exercise real interactions, input methods, view sizes, and content extremes. A build or screenshot alone does not establish interaction quality. Fix what you find and check again.

Finish with the usable interface or observed prototype, the decisions that explain its form, and consequential remaining limits. An experiment is complete when its learning is usable; a production change also requires the requested integration and behavior.
