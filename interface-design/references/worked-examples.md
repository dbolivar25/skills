# Worked Examples

Use these as compact application examples. Do not copy the wording blindly; keep
the main skill's runtime shape.

## Critique A Static Screen

Input: screenshot of a settings page that feels "pretty good but generic".

Good response shape:

1. Moment: repeated admin workflow, low emotional drama, high scanning value.
2. Floor: modern SaaS settings pages; user expects clear grouping, restrained
   hierarchy, predictable controls.
3. Facets: calm, precise, durable.
4. Noticing:
   - The eye hesitates between three equally weighted section headers.
   - Icon styles mix filled and stroked forms.
   - The primary action is visually lighter than destructive secondary actions.
5. Range or depth: direction is settled; go deep.
6. Findings:
   - **Competing section weight**: all section titles use the same size and
     contrast, so the page has no reading order. Reduce secondary headings and
     let the current section own the strongest weight.
   - **Icon grammar drift**: filled and stroked icons appear as peers. Choose one
     family or reserve filled icons for selected states.
   - **Action hierarchy inversion**: destructive secondary actions carry more
     visual weight than save. Rebalance fill, color, and placement so the safe
     primary path is obvious.

What makes this resolved: the critique names observed causes, maps them to the
moment, and proposes direction without generic praise.

## Improve An Async Button

Input: button that saves settings but only disables itself while saving.

Resolved pass:

- State model: idle, submitting, success, error, retry.
- Motion: button content should not jump; reserve stable dimensions.
- Performance: optimistic local update is acceptable if server failure can be
  rolled back with a toast.
- Care: failure should not erase the user's edits or navigate away.

Implementation direction:

- Keep the button width stable across labels.
- On submit, optimistically reflect the new setting in the UI.
- Show inline progress or a spinner with accessible text.
- On success, briefly confirm without trapping the user.
- On failure, keep the edited value visible, restore persisted state if needed,
  and offer retry.
- Add a small state gallery or story with all states visible.

Verification:

- Click twice quickly to confirm interruption/disabled behavior.
- Force error and retry.
- Refresh with cached state and server state to check for flash or jump.

## Tune A Hover Interaction

Input: card hover feels stiff.

Resolved pass:

- Moment: product browsing; playful but not distracting.
- Mode: feel question, so create live tuning.
- Driver: hover state drives y, scale, shadow, and maybe rotation.
- Tuning parameters: spring visual duration, bounce, y offset, scale, shadow
  opacity, shadow blur.

Implementation direction:

- Expose sliders for `y`, `scale`, `bounce`, `shadowBlur`, and `shadowOpacity`.
- Compare values in the actual card grid, not an isolated blank demo, unless the
  question is only about mechanics.
- Keep hover interruptible so mouse leave returns from current state.
- Use layered shadow so the lift reads as contact plus ambient depth.

Verification:

- Test hover in dense grid and with neighboring cards.
- Check reduced-motion behavior if the app supports it.
- Confirm text and layout do not shift.

## Decide Range Before Depth

Input: "Design a flow for backing up photos."

Bad move: immediately refine a manual photo-picker.

Range pass:

- Direction A: automatic backup of all photos with later review.
- Direction B: time-based bulk selection.
- Direction C: smart suggestions based on favorites, albums, or low-risk rules.
- Direction D: inverted flow where users exclude what should not be backed up.

Only after the product decision should depth begin. If automatic backup wins,
the interface problem shifts from selection UI to trust, permission, progress,
storage cost, exclusions, and recovery.

## Use Less, But Better

Input: pre-launch marketing page with too many sections and weak execution.

Resolved pass:

- Moment: prove demand and make one promise memorable.
- Floor: credible landing page with clear offer and working signup path.
- Facets: focused, crafted, intriguing.
- Intervention: cut secondary sections, reduce type/color system, strengthen one
  primary interaction or visual asset, and make signup excellent.

Direction:

- One hero offer.
- One primary action.
- One strong visual signal.
- One tight supporting section if needed.
- No extra feature cards unless they make the decision easier.

Verification:

- First viewport communicates the product and action.
- The next section is visible enough to imply depth.
- Mobile type and buttons fit.
- Signup or lead capture path works.

## Apply Uncommon Care

Input: account/billing area technically works but feels neglected.

Care pass:

- Users need invoices without emailing support.
- Refund or plan-change edge cases should be explained plainly.
- Saved payment or tax details should not feel like a dead end.
- Errors should preserve user-entered information.
- Confirmation copy should make consequences explicit.

Resolved intervention:

- Add self-serve invoice download and editable billing details.
- Add clear refund/plan-change state copy.
- Add retryable failure states.
- Verify the empty, loading, success, error, and permission-denied states.

This is not decorative delight. It is care in the places people usually skip.

## Run A Detail Polish Pass

Input: a component already works, but the user says it "feels off" and asks for
polish.

Resolved pass:

- Moment: repeated interaction in a production UI, so detail changes must make
  the component feel more reliable without calling attention to themselves.
- Range or depth: direction is settled; go deep on mechanics.
- Grammar: preserve the existing component language unless one detail violates
  it.
- Tactility: hit target, hover, focus, press, and interruption matter as much as
  visual styling.

Good findings:

- Nested surfaces use the same radius even though the outer surface has padding;
  calculate the outer radius from the inner radius plus padding.
- The icon button is visually 20x20px and also only clickable at 20x20px; extend
  the hit area to at least 40x40px without overlapping adjacent controls.
- Hover uses `transition: all`, causing unrelated properties to animate; restrict
  the transition to the properties that actually change.
- The counter shifts width when values update; add tabular figures.
- The hover icon appears abruptly; cross-fade opacity, scale, and blur, or use
  Motion if the project already depends on it.

For narrow implementation summaries, a before/after table can make the pass easy
to audit:

| Principle | Before | After |
| --- | --- | --- |
| Radius | Outer and inner surfaces both used `12px` radius with `8px` padding | Outer radius became `20px`, inner stayed `12px` |
| Hit area | Visible and clickable area was `20x20px` | Added pseudo-element hit area up to `40x40px` without overlap |
| Transition | Used `transition: all` | Used `transition-property: scale, opacity, box-shadow` |
| Numbers | Updating value used proportional numerals | Added tabular numerals |

What makes this resolved: the work names the perceived problem, changes the
mechanical cause, and verifies the rendered behavior instead of claiming polish
from a list of style tweaks.
