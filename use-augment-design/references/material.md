# Material

## Composition

- Use shared edges, spines, baselines, and mathematical spacing.
- Let density come from grouping and hierarchy, not cramped controls.
- Keep operational surfaces scannable.
- Keep asymmetrical marks and icons optically aligned.
- Use cards for repeated items, modals, and framed tools. Do not turn every section into a card.
- Default canvases are white, neutral, bone, or ink.

## Brand Swirl

The brand swirl is a soft blurred burgundy-plum color field with oink, peach, and frost atmosphere.

Use it for large background fields, cropped brand artwork, and intentional brand moments. Do not use it for routine cards, form fields, tables, badges, nav chrome, or repeated list items.

When type or logos sit on the swirl, use a dark scrim or overlay for legibility.

## Edge Glow

`tokens/glow.css` defines the edge-glow primitive:

```html
<div class="aug-glow aug-glow--brand">
  <span class="aug-glow__layer" aria-hidden="true"></span>
  ...
</div>
```

- `.aug-glow` is the clipped host.
- `.aug-glow__layer` is the oversized additive light layer.
- `.aug-glow--brand` is for primary buttons, brand avatars, and true brand panels.
- `.aug-glow--neutral` is for dark elevated surfaces where chromatic brand glow would be wrong.
- `.aug-glow--flat` removes the layer in dense or repeated contexts.
- Per-instance variety comes from rotating the layer, not changing the palette.

Because the layer uses screen blending, it adds light and should not draw a dark edge.

## Grain

`tokens/grain.css` defines `.aug-grain`, an additive fixed grayscale noise layer.

Use grain on large page surfaces, dark sections, brand panels, document canvases, and marketing canvases where flatness or gradient banding would show. Do not use it on small chrome such as buttons, icons, chips, or avatars.

## Elevation

- `--shadow-1` through `--shadow-3`: ordinary raised surfaces.
- `--shadow-4` and `--shadow-5`: floating or modal elevation.
- Use borders for separation and shadows for depth.
- On dark surfaces, use `--border-on-dark` for hairline separation.

## Motion

- Motion is calm and purposeful.
- Name transitioned properties. Do not use `transition: all`.
- Motion should respond from the current state when interrupted.
- Preserve reduced-motion behavior from `tokens/motion.css`.

