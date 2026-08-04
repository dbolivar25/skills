# Augment Design System

The brand foundations for Augment, an enterprise AI platform: color, type,
spacing, material, motion, and controls. Start at `SKILL.md`, which routes you
through the whole system in seven steps. Come back to this file for values.

Composition, voice, and review live in `references/`. The system was built from
the official `use-augment-branding` skill, the source of truth for tokens, logos,
and Matter SQ.

> **Scope.** This system covers how Augment looks and sounds. Product
> positioning, go-to-market copy, and product names belong in the app you are
> building, where they change often. A repositioning should leave the design
> system untouched.

## There are no components here

That is on purpose, because a partial library promises coverage it cannot keep.
The first real app needs a table, a menu, a dialog, and a date field on day one,
finds none of them, and hand-rolls half its surface from somewhere else. Components also
freeze one rendering of the brand, and then a 22px pill becomes the answer to
questions nobody asked it.

You get the material instead: tokens, the glow and grain primitives, a few
utilities, and the control rules below. A full component skin, built in one pass,
is the intended next step.

---

## Color

Values live in `tokens/colors.css`, with roles marked in the comments.

Cool neutrals carry text and chrome, and their temperature never shifts: `--ink`,
`--woodsmoke`, `--cloud-burst`. Warm bone (`--bone-100/300/500`) is paper, for
document and marketing canvases.

Burgundy-plum is the spine. `--burgundy-600 #660033` is primary and is the
wordmark color, and `--burgundy-700/800` and `--plum-500/600/700` extend it. Plum
stays deep, low in chroma, and off blue-violet, so it recedes behind burgundy.

| Value | Where it belongs |
|---|---|
| `--mark-pink #cf0147` | The color lockup, and marketing artwork |
| `--arctic --frost --oink --peach --gold` | Atmosphere and artwork. They build the swirl |
| `--green` `--red` `--gold` | Success, error, warning, wherever the state is real |

Everything else takes a neutral. Which roles a surface can claim depends on its
branch, which `references/composition.md` covers.

When a flat color feels detached from its surface, use opacity so it inherits the
tone underneath.

## Type

Matter SQ throughout, a geometric-humanist grotesque, weights 300 to 800.

| Role | Size | Tracking |
|---|---|---|
| Display | 72 / 64 / 48px | -2.5 to -2px |
| Body | 15 to 20px | none |
| Label | 12 to 13px, often all-caps | +0.04 to 0.08em |

Labels label things: column headers, field labels, object types. Use `.aug-nums`
for numbers that compare down a column, and `.aug-measure` to hold long-form text
at 44 to 72ch.

## Spacing and radius

The spacing scale is based on 4px, running from 4 to 176. Give dense information air, though
calm comes more from grouping and sequencing than from empty space.

Align to visible rules: shared edges, spines, baselines, mathematical spacing.
Optically align asymmetric glyphs and icons.

| Radius | Used for |
|---|---|
| 4px | Small dark chrome: tooltips, popovers |
| 8px | Controls and fields |
| 16px | Cards and panels |
| Pill / circle | State pills, chips, avatars |

An inner surface inset from its parent keeps the curves parallel when the inner
radius equals the outer radius minus the inset.

## Surfaces

Strokes separate, and shadows add depth. Borders are hairline cool neutrals
(`--neutral-75/85`), or `rgba(255,255,255,.16)` on dark.

A card is white on a neutral or bone canvas: 16px radius, hairline border, and a
soft low shadow from `--shadow-1/2/3`. Keep `--shadow-4/5` for things that float,
like modals and toasts. Nested surfaces relate radius, padding, stroke, fill, and
shadow optically.

Whether a card is the right container at all is a composition question, and
`references/composition.md` answers it.

## Material

Most surfaces are flat: white, neutral, bone, or ink. Three primitives add
material where it earns its place.

The brand swirl is a soft blurred conic field running burgundy, plum, oink,
peach, frost, and back to burgundy, cropped past the container edge so it reads
as continuous. Use it on large background fields and cropped hero artwork. Add a
dark overlay where type or a logo sits on top. Any motion is a slow angle drift
(`--dur-17000`) that respects reduced motion.

Edge glow is what keeps a solid brand fill from reading as flat paint. Picture a
bar of coals sitting below the element and running past both ends of it. Light
crosses the bottom edge at full strength, dies about a third of the way up, and
what reaches the sides is spill from the ends of the bar curling around the
bottom corners. Nothing sits alongside the element, and nothing above it.

Add `.aug-edge-glow` to any element with a solid dark or brand fill, then put the
real content in a positioned child so it stacks above the light. Nothing is
blurred: the softness is in the gradient stops, which is what lets the light
cross the boundary at full strength rather than fading into it. Every ramp
interpolates in oklch and ends on a zero-alpha colour at its own hue, keeping
the falloff out of grey.

| Knob | Does |
|---|---|
| `--edge-glow-strength` | How much light. 0.8 on controls, 0.5 on panels |
| `--edge-glow-shift` | Slides the bar sideways as a share of the element's width, up to about 20% |
| `--edge-glow-grain` | Noise over the light, masked to it. 0.18 |
| `--edge-glow-grain-size` | Noise tile. 26px |
| `.aug-edge-glow--panel` | Preset for large surfaces |
| `.aug-edge-glow--flat` | Keeps the fill, drops the fire |

A large surface needs less light to look equally lit, since the bar covers a
smaller share of it. Vary instances with `--edge-glow-shift`, which changes both the
brightness and the colour of the light under an element, because hue shifts
along the bar as well as across each coal. The layer runs 40% wider than the
element so it has room to move, with a fifth of the element's width overhanging
each side. A shift is measured against the element, so anything up to about 20%
stays inside that overhang and never exposes an unlit edge.

Film grain comes from `.aug-grain`, which lays a fixed grayscale noise tile over
any positioned surface: additive, around 0.10 opacity, non-interactive. It breaks
up gradient banding and gives a surface some tactility. Large surfaces only, so
dark sections, hero and brand panels, and page canvases. Keep it off buttons and
avatars. On an edge-glow surface the grain is already there, masked to the light.

Blur belongs to material, focus, and swirl artwork, so reach for it on purpose.

## Motion

| Token | Curve | Use |
|---|---|---|
| `--ease-1` | `cubic-bezier(.2,.6,.2,1)` | Standard |
| `--ease-2` | Decelerate | Expressive transitions |
| `--ease-3` | Gentle overshoot | Playful affordances |

Use 150 to 320ms for UI and 560ms for larger transitions, and name the
properties a transition changes. When motion gets interrupted, it responds from
wherever it happens to be.

Hover is a small legible shift: a slightly darker fill, a border darkening, a
little lift. Press is a small change in position, scale, shadow, or opacity.
Which states a surface owes you is a branch floor, which
`references/product-ui.md` sets.

## Controls

Since the system ships no components, here is what a control is made of, so two
people building the same button land in the same place.

Buttons, icon buttons, and fields share one height scale of 32, 40, and 48,
which is why a button sits flush beside an input. Icon buttons are square at
those heights.

A solid dark or brand fill takes `.aug-edge-glow`. An edge-glow surface carries no
border at all, including a transparent one, because a border clips the light
layer to the padding box and leaves a dark unlit rim.

Brand fills hover by `filter: brightness(.93)`. There is no burgundy hover token,
and adding one would put the hover state outside the palette. Unfilled controls
step the surface one level (`--white` to `--neutral-25`, transparent to
`--neutral-50`) and the border one level (`--neutral-85` to `--neutral-100`).

Press uses `--scale-098` for buttons and `--scale-096` for small square controls,
which need the deeper press to register at that size.

One focus ring covers everything:
`0 0 0 3px color-mix(in srgb, var(--burgundy-600) 24%, transparent)`.

Fields step through four states: resting `--neutral-85` border, focus
`--burgundy-600` border plus the ring, error `--red` border, and disabled
`--neutral-50` fill with the border unchanged. One slot sits below the field for
a hint or an error message, and it holds one of them at a time.

State tints are mixed into white rather than sampled.

| Part | Recipe |
|---|---|
| Background | State color at 8 to 14% into white (`--gold` needs around 26%) |
| Border | The same mix at around 30% |
| Text | A darkened variant of the hue: `#0a7a0a`, `#8a5a00`, `#b32626` |

Text uses a darkened variant because `--green`, `--gold`, and `--red` all fail
contrast on their own tint. It stays one palette, expressed three ways.

## Icons

The brand ships no icon set, so the identity is the priority asset.

| File | Use |
|---|---|
| `augment-mark.svg` | The standalone mark. `currentColor`, so it tints to any token |
| `augment-wordmark-black.svg` | Light surfaces |
| `augment-wordmark-white.svg` and `-on-dark.svg` | Dark surfaces |
| `augment-wordmark-color.svg` | The official color lockup, where a color lockup is intended |

All of them live in `assets/logo/`. Render logo artwork from these SVGs, or from
inline SVG that preserves the path exactly.

UI icons come from [Lucide](https://lucide.dev) over CDN: 1.5 to 2px strokes,
rounded joins, geometric, comfortable next to Matter SQ. **This is a
substitution, so flag it.** Swap in an official product icon set if one exists.

No emoji, and no Unicode glyphs standing in for icons.

---

## Index

| Path | What is in it |
|---|---|
| `SKILL.md` | Entry point: seven steps, completion criteria, branch router |
| `styles.css` | The one stylesheet consumers link |
| `readme.md` | This file |
| `references/composition.md` | Object, state, small type, spine, one home, focal point |
| `references/documents.md` | Branch: reports, briefs, anything read as a page |
| `references/product-ui.md` | Branch: application surfaces |
| `references/marketing.md` | Branch: web, hero, campaign |
| `references/voice.md` | Voice, generated-artifact copy, the prose loop |
| `references/qa.md` | Rendered inspection, review questions, diagnosis |
| `tokens/` | fonts, colors, typography, spacing, effects, grain, edge-glow, motion, utilities |
| `assets/` | `logo/` official SVGs, `fonts/` Matter SQ woff2 |
| `specimens/` | Rendered cards: color, type, spacing, effects, brand, controls |
