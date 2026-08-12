---
name: augment-design
description: Use when an Augment-branded surface is created, implemented, reviewed, or polished, or another skill needs Augment assets or design law. Load it to keep identity, voice, evidence, privacy, tokens, and branch floors coherent; positioning stays with the app.
---

Augment is an enterprise AI platform. This skill makes a surface look and sound
like Augment, and keeps generated work from drifting into decoration.

If someone invokes this skill without saying what they want, ask before reading
further.

## Steps

Work in order. Each step has a completion criterion. Do not carry an unmet one
forward.

**1. Name the moment.** Write one sentence covering who is looking, what they
want to do, and what happens next. *Done when the sentence names a person and a
decision.*

**2. Route to a branch and read it.** Pick `references/documents.md`,
`references/product-ui.md`, or `references/marketing.md`. The branch gives you a
floor and a set of facets. If two branches apply, you have two surfaces.
*Done when you can state the floor and three facets.*

**3. Read `references/composition.md`.** It applies to everything, and it governs
containers, state, color roles, and where a fact lives. *Done when you have read
it this session.*

**4. Read the foundations you will touch.** `readme.md` covers color, type,
spacing, surfaces, material, motion, controls, and icons. `tokens/*.css` holds
the values. Never invent a token. *Done when every value you plan to write
already exists in a token file.*

**5. Build** from the tokens, the utilities, and the control rules in
`readme.md`. This system ships no components on purpose, and `readme.md` explains
why. Copy any assets you need into the project you are building, since these
files cannot be referenced across projects.

**6. Write the copy through `references/voice.md`.** *Done when you have run that
file's prose loop over every string you wrote.*

**7. Review through `references/qa.md`.** Render every page or state, look at each
at full size and at thumbnail size, then run `checks/audit.js`. *Done when you
have answered the review questions and either cleared the audit or justified each
finding in writing.*

## Non-negotiables

- Render identity from the official SVGs in `assets/logo/`. Never redraw them.
- Matter SQ is the typeface. Use the token values.
- Sentence case. No emoji. No exclamation points.
- Keep customer names private unless someone has explicitly approved them.
- Nothing ships unrendered. Step 7 is not optional.

`readme.md` ends with a full index of the system.

## Related skills

These carry detail this skill leaves out. Use them where you have them:
**designing-human-interfaces** for the moment, floor, and facet model and for
interface craft; **humanize** in strict mode for prose repair; **simplify** for
editing; **writing-for-agents** for editing this skill.
