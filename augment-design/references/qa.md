# QA

Nothing ships unrendered. This is the last step of the skill, and it catches
polish applied to a composition nobody looked at.

## Render and look

1. Render every page, screen, and state. Not just the first one.
2. Look at each at full size, and read the copy as the reader will.
3. Look at each at thumbnail size. The first thing you see is the focal point. If
   you see texture instead of a thing, the composition is wrong, so fix that
   before any styling.
4. On print work, check at print size and confirm no page breaks mid-fact.

## Review questions

Answer each in a sentence. A no is a finding, and you name it with a cause from
`composition.md`.

Composition:

- Does every framed or elevated surface hold something the reader can address on
  its own?
- Does every pill carry state that can change?
- Does every line of small type say something its heading does not?
- Does every chromatic value have a role, and does the branch allow that role?
- Does every fact appear once?
- Does each view have one focal point?

Grammar:

- Radius from 4, 8, 16, pill, or circle. Spacing from the 4px scale. Strokes
  hairline neutral. Type from the token sizes and weights.
- Are repeated elements of the same class composed identically?

Branch floor:

- Does the surface clear every line of the floor in its branch file?

Copy:

- Run the prose loop in `references/voice.md`.
- Does any string describe how the artifact was produced?
- Would the conclusion fit a different document? Then it is not a conclusion.

## Audit

Load `checks/audit.js` into the rendered page, then call `augAudit()`. When the
script is part of the page, appending `?augaudit` runs it after load. It checks
what markup and computed style can prove: nested `data-aug-surface` elements,
chromatic fill and stroke roles, off-scale radius, document body type below the
branch floor, inconsistent marked repetition, source markup, and whether Matter
SQ loaded.

Set `data-aug-branch="document|product|marketing"` on the root element, and
`data-aug-role` on every chromatic fill and stroke.

Treat findings as input to judgment. A finding you can justify is fine, so long
as you justify it in writing. A clean run you did not examine is not a review,
because the audit cannot see focal point, eyebrows, second homes, or prose.

## When something feels generated

Never leave it at the adjective. Name the cause and take the fix from the table
at the end of `composition.md`.
