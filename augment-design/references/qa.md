# QA

Inspect the intended rendered surface and relevant states before delivery.
Use these criteria for construction or assessment; obtain missing material
observations instead of treating source code as proof of the render.

## Render and look

1. Render every relevant page, screen, and state, not only the first.
2. Look at each at full size, and read the copy as the reader will.
3. Look at each at thumbnail size. The first thing you see is the focal point. If
   you see texture instead of a thing, the composition is wrong, so fix that
   before any styling.
4. On print work, check at print size and confirm no page breaks mid-fact.

## Review questions

Use the questions relevant to the surface. Name a material failure with a
visible cause from `composition.md`.

Composition:

- Does every framed or elevated surface hold something the reader can address on
  its own?
- Does every pill carry state that can change?
- Does every line of small type say something its heading does not?
- Does every chromatic value have a role, and does the branch allow that role?
- Does each fact have a clear primary home, with any repetition serving navigation, comparison, accessibility, or a distinct decision?
- Does each view have one focal point?

Grammar:

- Radius from 4, 8, 16, pill, or circle. Spacing from the 4px scale. Strokes
  hairline neutral. Type from the token sizes and weights.
- Are repeated elements of the same class composed identically?

Branch floor:

- Does the surface clear every line of the floor in its branch file?

Copy:

- Apply the [voice pass](voice.md).
- Does a production detail help the reader interpret evidence or take the next action? Cut irrelevant machinery, preserve useful disclosure.
- Would the conclusion fit a different document? Then it is not a conclusion.

## Audit

For HTML, load `checks/audit.js` into the rendered page, await
`document.fonts.ready`, and call `augAudit()`. Appending `?augaudit` runs it after
load; rerun after asynchronous content or fonts settle. The script returns
findings, including explicit coverage findings. A zero-finding run means only
that the covered checks found no issue in that DOM state.

Covered checks:

- Visible root and descendant solid backgrounds, visible borders, and computed
  SVG fill/stroke roles. Modern CSS color notation uses the browser's parser
  and a one-pixel sRGB canvas; the chroma heuristic and alpha threshold remain
  a diagnostic, not a palette validator.
- Generated `::before`/`::after` solid paint, using the host element's role.
- Off-scale radius, marked nested surfaces and repetition, document body size
  and the presence of marked source structure.
- Primary computed font families on elements owning direct text, plus font-face
  loading. The supplied technical mono token is allowed.

Unclassified colors, SVG paint-server URLs, and background images/gradients
produce `paint-coverage` findings. Inspect those paint systems directly. The
script does not trace gradient stops, shadows, filters, compositing, masks,
external/embedded-image contents, ancestor clipping/occlusion, or all offscreen
states. Pseudo-element text and glyph-by-glyph font fallback are not certified.
Even a loaded face and a primary computed family cannot prove every glyph used
it. Native formats need their own font/export checks and rendered inspection.

Set `data-aug-branch="document|product|marketing"` on one root and
`data-aug-role="identity|signal|atmosphere|artwork"` on each element with chromatic
fill or stroke (or the host of generated pseudo paint). Examine the findings
and resolve or explain material discrepancies. The audit cannot judge focal
point, duplicate facts, prose, evidence support, or the appropriate color role.

## When something feels generated

Never leave it at the adjective. Name the cause and take the fix from the table
at the end of `composition.md`.
