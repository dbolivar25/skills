# Experience craft

Use the matching section while designing or improving the actual surface.
Concrete implementations live in [code patterns](code-patterns.md); examples
of range, depth, and care live in [worked examples](worked-examples.md).

## Mission

Create resolved interfaces: surfaces whose structure, composition, visual grammar,
motion, state, and waiting behavior all serve the same human moment.

Resolved does not mean decorated. It means the interface has stopped feeling false,
arbitrary, sluggish, brittle, below-standard, or uncared-for. The work is to notice what
is unresolved, name why it matters, and change the smallest real thing that brings the
surface into coherence.

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

## Working principles

- Inspect current renders, screenshots, mockups, prototype observations, and source
  behavior. Obtain the material surface or state needed before prescribing polish;
  do not substitute a generic mental picture for the actual interface.
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
   [`platform-floors.md`](platform-floors.md) before
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
   [`expressive-direction.md`](expressive-direction.md)
   before choosing a direction.

   If the right application of range, depth, fidelity, or scope remains unclear,
   read only the matching case in
   [`worked-examples.md`](worked-examples.md) before
   choosing the mode.

   If the question is about feel, build a breakable toy or live tuning
   experiment. Its controls expose duration, easing, spacing, blur, shadow, position, scale,
   rotation, offsets, or generative parameters through temporary controls instead
   of guessing through repeated edits. If the mechanism is unknown, run the smallest discriminating experiment;
   [prototypes](prototypes.md) covers the question, observation, and fidelity limits.

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
   [`code-patterns.md`](code-patterns.md) before finishing
   this step. Load only the sections the surface actually reaches.

   Completion criterion: the focal point and reading order are observable; the
   active alignment, style, color, and type rules agree; and every material
   deviation has a named product-specific job.

5. **Resolve layers and dynamics**

   Treat rendering mechanics as part of the design. Inspect actual layer and paint
   behavior before judging decoration; obtain runtime observations when consequential. Map each changing input or state onto visible
   properties deliberately. Give motion a semantic or behavioral job, keep it
   interruptible when users can act during it, and expose tunable values when
   feel rather than correctness decides the result.

   When implementing masks, compositing, mapped dynamics, rubber-banding,
   pointer reactivity, waves, animation, or transition hygiene, read the matching
   sections of [`code-patterns.md`](code-patterns.md)
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

   Make the smallest change that resolves the named issue when implementation is
   requested. Inspect the browser/platform result across relevant states and
   viewports. For critique, ground each finding in an observation, its user impact,
   and a direction of change. For design direction, make the moment, floor,
   facets, range/depth choice, grammar, and intervention understandable.

   Completion criterion: the result has been checked against the real surface, or
   the unverified risk is stated plainly.

