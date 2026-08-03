---
name: designing-human-interfaces
description: "Resolved interface design for human-facing UI. Use when designing, implementing, critiquing, or polishing an interface, including its visual grammar, interaction states, motion, and perceived performance."
---

# Designing Human Interfaces

## Mission

Create resolved interfaces: surfaces whose structure, composition, visual
grammar, motion, state, and waiting behavior all serve the same human moment.

Resolved does not mean decorated. It means the interface has stopped feeling
false, arbitrary, sluggish, brittle, below-standard, or uncared-for. The work is
to notice what is unresolved, name why it matters, and change the smallest real
thing that brings the surface into coherence.

## Core Model

Hold these concepts while working:

- **Moment**: the user, task, emotional context, device, and state the interface
  must carry. The same pattern changes meaning in a dashboard, checkout, filing
  flow, playful onboarding, or marketing page.
- **Floor**: the platform and category standard users already carry from iOS,
  macOS, web apps, Linear, Figma, Notion, Stripe, Raycast, shadcn, or whatever is
  relevant. The floor is not the goal; it is the minimum credible baseline.
- **Facets**: the 3-5 qualities this product should be perceived to have. Use
  situational words, not generic virtues. Examples: crafted, calm, durable,
  fidgetable, inventive, trustworthy, fast, editorial, precise.
- **Range**: structurally different directions before commitment. Variants of
  one control are depth, not range.
- **Depth**: pushing a chosen direction through successive levels of quality
  after it has earned commitment.
- **Grammar**: the local design language of alignment, type, color, borders,
  icons, radius, fills, shadows, materiality, and motion. A nice-looking outlier
  still reads as a defect when it violates the grammar.
- **Composition**: how contrast, hierarchy, proximity, balance, white space,
  repetition, and unity guide attention across the surface. These are diagnostic
  lenses for whether the intended object, action, and emotional shift appear in
  the right order.
- **Drivers**: changing values mapped onto visible properties. Scroll, pointer
  position, gesture distance, time, state, and data should drive size, opacity,
  color, blur, position, rotation, or depth through named ranges.
- **Tactility**: how controls respond to touch, pointer, keyboard, and time. It
  includes hit area, focus, hover, press feedback, interruption, and whether
  controls feel physically reliable rather than visually present but hard to use.
- **Care**: the extra consideration in the places most people skip: edge cases,
  error states, support-adjacent flows, invoices, refunds, accessibility,
  personalization, and the states no one would blame you for ignoring.

## Operating Contract

- Inspect the real surface whenever it exists: rendered UI, screenshot, mockup,
  prototype, code path, or live browser. Do not prescribe polish from a generic
  mental picture.
- Treat reactions as data, not conclusions. Replace "clean", "off", "nice", or
  "premium" with the cause: hesitation, expectation gap, missing object,
  emotional shift, weak hierarchy, visual cheapness, sluggishness, brittleness,
  or broken trust.
- Use composition vocabulary as cause language, especially when critiquing
  AI-generated or template-like surfaces. Name the visible failure: missing focal
  point, muddled hierarchy, crowded proximity, weak contrast, unbalanced visual
  weight, inconsistent repetition, white space that fails to separate or focus,
  or elements outside the same system.
- Decide whether the work needs range or depth before polishing. If the
  direction is not settled, explore fundamentally different approaches. If the
  direction is settled, push the chosen surface further.
- Let distinctiveness come from the moment, facets, and local grammar. Do not
  substitute novelty, a stock visual style, or an ornamental checklist for a
  product-specific idea.
- Separate concerns. Name the question being answered, then choose the right
  fidelity: sketch, wireframe, breakable toy, state gallery, tuning playground,
  prototype, or production implementation.
- Let perception beat naive math. Equal spacing, matching HSL lightness, centered
  boxes, and straight-line motion can all be wrong to the eye.
- Treat time and state as first-class UI. The interface includes transition,
  interruption, async work, loading, failure, retry, cached reads, and non-happy
  states.
- Treat small mechanics as user-facing behavior. Radius math, optical alignment,
  hit area, press feedback, transition properties, and first-frame stutter are
  not trivia when they affect trust, speed, or control.
- Prefer less, but better. When quality is thin, reduce scope and refine the
  essential surface before adding features, ornament, or more variants.
- Enact craft through concrete mechanics. Do not claim polish; show the alignment
  rule, color behavior, type decision, state model, motion driver, or verification
  that makes it real.

## Workflow

1. **Notice the surface**

   Observe before solving. Identify the moment, floor, and any obvious facets.
   Name what you actually see and feel: where the eye hesitates, where an
   expectation breaks, what is missing, what the interface assumes, what feels
   cheap or crafted, and what feels fast, sluggish, durable, fragile, responsive,
   or disconnected.

   For AI-generated or template-like surfaces, use a rendered screenshot as the
   source of truth. Identify the visible composition failure before revising:
   missing focal point, muddled hierarchy, crowded proximity, weak contrast,
   unbalanced visual weight, inconsistent repetition, white space that fails to
   separate or focus, or elements outside the same system.

   When the relevant platform or category floor is unclear, read
   [`references/platform-floors.md`](references/platform-floors.md) before
   naming it. Use precedent from the actual product when it is stronger than the
   generic floor.

   Completion criterion: the next judgment is tied to an observed detail in the
   real surface or to an explicit assumption when no surface exists.

2. **Choose the working mode**

   If the problem or product direction is open, create range: remove a step,
   automate the task, invert the problem, borrow from another domain, or propose
   several structurally different approaches. If a direction is already chosen,
   go deep: zoom into the important surface, remove what is not earning its
   place, compare against the floor and facets, and ask what the next level would
   look like.

   When the surface is genuinely open-ended and the user wants a bold,
   experimental, editorial, memorable, or visually distinctive direction, read
   [`references/expressive-direction.md`](references/expressive-direction.md)
   before choosing a direction.

   If the right application of range, depth, fidelity, or scope remains unclear,
   read only the matching case in
   [`references/worked-examples.md`](references/worked-examples.md) before
   choosing the mode.

   If the question is about feel, build a breakable toy or live-tuning
   playground. Expose duration, easing, spacing, blur, shadow, position, scale,
   rotation, offsets, or generative parameters through temporary controls instead
   of guessing through repeated edits. If the mechanism is unknown, recreate a
   small version of the inspiring interaction until the mechanism is understood.

   Completion criterion: the chosen mode and fidelity are named together with
   the decision they can resolve and why a lower- or higher-fidelity move would
   answer it worse.

3. **Resolve the skeleton**

   Establish the credible baseline before inventing. Use platform conventions,
   category expectations, default component behavior, and common user mental
   models as the floor. Decide what complexity belongs on the screen, what can be
   removed, what should be automatic, and what must be disclosed later. Check
   whether every interactive element has a usable hit area, focus behavior,
   disabled/loading behavior, and enough room for its text or dynamic content.

   Completion criterion: the interface is not solving the wrong problem, adding
   unnecessary UI, or falling below the expected floor.

4. **Resolve the grammar**

   Make the surface visually coherent across composition, alignment, style,
   color, and type. Establish the focal point and reading order first. Identify
   the active edge, axis, baseline, spacing, and optical-alignment rules; reduce
   competing invisible rules. Make controls, surfaces, icons, color behavior,
   typography, and materiality read as one local system.

   When implementing or diagnosing color, gradients, typography, optical
   alignment, radii, shadows, borders, hit areas, or surface detail, read the
   matching sections of
   [`references/code-patterns.md`](references/code-patterns.md) before finishing
   this step. Load only the sections the surface actually reaches.

   Completion criterion: the focal point and reading order are observable; the
   active alignment, style, color, and type rules agree; and every material
   deviation has a named product-specific job.

5. **Resolve layers and dynamics**

   Treat rendering mechanics as part of the design. Inspect layer and paint
   behavior before decorating. Map each changing input or state onto visible
   properties deliberately. Give motion a semantic or behavioral job, keep it
   interruptible when users can act during it, and expose tunable values when
   feel rather than correctness decides the result.

   When implementing masks, compositing, mapped dynamics, rubber-banding,
   pointer reactivity, waves, animation, or transition hygiene, read the matching
   sections of [`references/code-patterns.md`](references/code-patterns.md)
   before finishing this step. Load only the mechanics in scope.

   Completion criterion: every layered or dynamic behavior in scope names its
   driver or state, visible consequence, interruption behavior, and verification
   method; anything not accounted for is explicitly out of scope.

6. **Resolve states and waiting**

   Design possible realities, not only the happy static view. Name important
   states, events, and combinations. A simple async button can need idle,
   submitting, success, and error. Complex surfaces often need switches or a
   state gallery so the team can see combinations without duplicating static
   comps.

   Treat waiting as UI. Mask unavoidable work by doing it in the background or
   giving the user something worthwhile while it happens. Use optimistic writes
   when the UI can assume success and handle failure with rollback, toast, or
   retry. Use optimistic reads or local cache when showing previous state avoids
   a flash from default to server-confirmed UI. Never let failure handling steal
   the user's place in the flow unless the domain requires it.

   Completion criterion: meaningful states, failure paths, interruption, cached
   reads, and loading behavior are accounted for or explicitly out of scope.

7. **Intervene and verify**

   Make the smallest change that resolves the named issue. For implementation,
   verify in the browser or platform surface, across relevant states and
   viewports. For critique, ground every finding in an observation, explain the
   user impact, and give the direction of change. For design direction, state the
   moment, floor, facets, range/depth choice, grammar, and intervention.

   Completion criterion: the result has been checked against the real surface, or
   the unverified risk is stated plainly.

## Output Contract

For implementation work, finish with:

- The unresolved issue you addressed.
- The concrete changes made.
- The verification performed, including states, viewport, browser, or behavior
  checked.
- Any remaining risk.

For critique, lead with findings ordered by impact. Each finding should use this
shape: observation, why it matters to the moment, and what direction would
resolve it. Do not pad with generic praise.

For design direction, return a compact direction that includes:

- The user moment and floor.
- The facets that matter.
- Whether the work needs range, depth, a breakable toy, or production polish.
- The grammar to preserve or establish.
- The highest-leverage interventions.

If the work is not ready, say what evidence is missing: real surface, content,
states, platform, category floor, motion behavior, performance behavior, or user
context.

## Failure Modes

- **Shallow noticing**: stopping at "looks good" or "feels off" without naming
  the visible cause.
- **Floor-blind novelty**: inventing from scratch while landing below platform
  or category expectations.
- **Early commitment**: improving the first plausible idea before testing
  structurally different approaches.
- **Depth avoidance**: accepting a default level when the chosen direction has
  not been pushed.
- **Wrong fidelity**: building a high-fidelity artifact when a sketch, state
  gallery, live tuning panel, or breakable toy would answer the question faster.
- **Utility-only surface**: shipping an interface where the features are present
  but the moment feels emotionally flat, generic, sterile, or merely processed.
  Resolve it through clearer hierarchy, stronger product-specific facets, better
  continuity through the flow, and details that orient the user.
- **Decoration-first**: adding gradients, motion, shadows, or flourishes before
  naming the unresolved interface problem.
- **Math-over-perception**: preserving equal numbers when visible shapes, text
  metrics, perceived brightness, or motion curves prove they feel wrong.
- **Grammar drift**: introducing a nice-looking element that violates the local
  visual language.
- **Static-comp fallacy**: polishing one default state while ignoring async,
  error, retry, cached, interrupted, or viewport states.
- **Care as ornament**: adding cute details while ignoring edge cases, errors,
  support flows, accessibility, or moments users actually feel.
- **Untouchable polish**: visual refinement that leaves tiny targets, missing
  focus, overlapping hit areas, absent press feedback, or controls that cannot be
  interrupted cleanly.
- **Performance theater**: adding `transition: all`, preemptive `will-change`,
  expensive animation, or non-interruptible motion while claiming the interface
  feels faster.
- **Scope creep**: adding more surface area when less, executed better, would
  create a stronger result.
- **Unverified polish**: claiming improvement without checking the rendered or
  behavioral result.
