# Code Patterns

Use this reference when implementation detail would otherwise bloat the main
skill. These are handles, not mandatory recipes. Apply only where the surface
needs the pattern.

## Tunable Values

When feel depends on a number, expose the number. Use temporary controls during
design, then remove or hide them before shipping unless they are product UI.

Good candidates:

- Duration.
- Easing.
- Spring bounce and visual duration.
- Spacing.
- Blur.
- Shadow opacity, spread, and blur.
- Position.
- Scale.
- Rotation.
- Mask stops.
- Wave frequency, amplitude, and phase.
- Generative graphic seeds and ranges.

Minimal React shape:

```tsx
const [params, setParams] = useState({
  duration: 0.35,
  blur: 18,
  shadowOpacity: 0.18,
  scale: 1.03,
});

function setParam(name: keyof typeof params, value: number) {
  setParams((current) => ({ ...current, [name]: value }));
}
```

Use DialKit or an existing local control-panel pattern when available. The point
is immediacy: the agent should feel changes in the real surface instead of
guessing through repeated edits.

## Map Range

Use map range when one value should drive another: scroll drives header size,
pointer position drives tilt, utilization drives color, or drag distance drives
offset.

```ts
export function mapRange(
  value: number,
  [fromLow, fromHigh]: [number, number],
  [toLow, toHigh]: [number, number],
  clamp = true,
) {
  let t = (value - fromLow) / (fromHigh - fromLow);
  if (clamp) t = Math.max(0, Math.min(1, t));
  return toLow + t * (toHigh - toLow);
}
```

Ease the normalized value before mapping when the output should not be linear:

```ts
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const t = mapRange(scrollY, [0, 128], [0, 1]);
const fontSize = mapRange(easeInOut(t), [0, 1], [32, 16]);
```

## Rubber Banding

Rubber banding is resistance, not a binary clamp. Use an asymptote so motion
approaches a ceiling.

```ts
const resistance = 150;
const t = pull / (pull + resistance);
const offset = mapRange(t, [0, 1], [0, 64]);
```

Increase resistance for a stiffer feel. Tune this live when possible.

## Pointer Reactivity

Map pointer position inside a rectangle onto rotation or depth. Use the center
as neutral.

```ts
const px = (pointerX - rect.left) / rect.width;
const py = (pointerY - rect.top) / rect.height;

const rotateY = mapRange(px, [0, 1], [-10, 10]);
const rotateX = mapRange(py, [0, 1], [10, -10]);

card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
```

Keep the effect subtle unless the product moment is explicitly playful.

## Wave Drivers

Use waves for looping, breathing, staggered, or procedural behavior. Frequency
controls repeat rate, amplitude controls range, and phase shifts the start.

```ts
const wave = Math.sin(time * frequency + phase); // -1..1
const scale = mapRange(wave, [-1, 1], [0.96, 1.04]);
```

Offset phase across repeated elements:

```ts
items.map((item, index) => {
  const wave = Math.sin(time * frequency + index * phaseStep);
  const y = mapRange(wave, [-1, 1], [-4, 4]);
  return <Item key={item.id} style={{ transform: `translateY(${y}px)` }} />;
});
```

## Color And Gradients

Use OKLCH when adjacent colors should feel equally bright or when a gradient gets
muddy across distant hues.

Keep neutral temperature consistent across a surface. When building darker
shades, preserve richness with deliberate chroma or hue shifts rather than
reducing lightness alone.

CSS gradient shape:

```css
.surface {
  background: linear-gradient(in oklch, oklch(70% 0.2 245), oklch(70% 0.2 25));
}
```

Use lower-opacity neutrals to inherit the background tone:

```css
.subtle-fill {
  background: rgb(28 25 23 / 0.08);
}
```

Use eased gradient stops for dark overlays that otherwise create a visible
horizon. Generate the stops programmatically when hand-authoring would be noisy.

```ts
const smoothstep = (t: number) => t * t * (3 - 2 * t);

const stops = Array.from({ length: 15 }, (_, i) => {
  const t = i / 14;
  return `rgb(24 23 28 / ${1 - smoothstep(t)}) ${t * 100}%`;
});
```

`plus-lighter` can keep light foregrounds on saturated backgrounds from feeling
flat. `plus-darker` has uneven browser support; derive static colors when
support is not acceptable.

## Typography CSS Handles

Useful handles:

```css
.article {
  max-width: 66ch;
  line-height: 1.5;
  text-wrap: pretty;
}

.headline {
  text-wrap: balance;
}

.numbers {
  font-variant-numeric: tabular-nums;
}

.technical-code {
  font-feature-settings: "zero" 1, "cv01" 1;
}
```

For labels that sit visually off-center because of font metrics, consider
`text-box-trim` and `text-box-edge` only when browser support is acceptable.

Use text wrapping intentionally:

- `text-wrap: balance` for headings, titles, and short blocks where even line
  distribution matters. Browsers limit balancing to short text, so do not use it
  as the default for long body copy.
- `text-wrap: pretty` for short-to-medium paragraphs, descriptions, captions,
  list items, and card text.
- Neither for long articles, code blocks, or pre-formatted text where default
  wrapping is clearer and cheaper.

Use middle truncation for filenames or identifiers when both the beginning and
ending carry meaning. Use OpenType features such as slashed zero, true fractions,
small caps, case-sensitive punctuation, and disambiguation alternates only when
they improve the content being read.

Apply font smoothing once at the root when the app targets macOS rendering:

```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## Surface Detail Defaults

Use these when an interface feels subtly wrong but the larger grammar is already
chosen.

Reserve borders for real separation jobs such as dividers, input outlines, and
table boundaries. Prefer layered transparent shadows when the job is contact and
elevation rather than separation.

Concentric border radius:

```txt
outerRadius = innerRadius + padding
```

Close nested surfaces should follow the formula. If the gap between the surfaces
is larger than about 24px, treat them as separate surfaces instead of forcing
strict concentric math.

```css
.card {
  border-radius: 20px; /* 12 + 8 */
  padding: 8px;
}

.card-inner {
  border-radius: 12px;
}
```

Optical alignment:

```css
.button-with-icon {
  padding-left: 16px;
  padding-right: 14px; /* icon side = text side - 2px */
}

.play-button svg {
  margin-left: 2px; /* triangle reads visually centered */
}
```

When an asymmetric icon is reused in many places, fix the SVG viewBox or path
instead of scattering one-off margins through components.

Shadow as border or elevation:

```css
:root {
  --shadow-border:
    0 0 0 1px rgb(0 0 0 / 0.06),
    0 1px 2px -1px rgb(0 0 0 / 0.06),
    0 2px 4px rgb(0 0 0 / 0.04);
  --shadow-border-hover:
    0 0 0 1px rgb(0 0 0 / 0.08),
    0 1px 2px -1px rgb(0 0 0 / 0.08),
    0 2px 4px rgb(0 0 0 / 0.06);
}

.card {
  box-shadow: var(--shadow-border);
  transition-property: box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

.card:hover {
  box-shadow: var(--shadow-border-hover);
}
```

In dark mode, depth shadows often disappear. Use a simpler white ring:

```css
--shadow-border: 0 0 0 1px rgb(255 255 255 / 0.08);
--shadow-border-hover: 0 0 0 1px rgb(255 255 255 / 0.13);
```

Keep borders for real separators: dividers, table boundaries, form input
outlines, and hairline structure in dense UI.

Image outlines:

```css
img {
  outline: 1px solid rgb(0 0 0 / 0.1);
  outline-offset: -1px;
}

@media (prefers-color-scheme: dark) {
  img {
    outline-color: rgb(255 255 255 / 0.1);
  }
}
```

Use pure black in light mode and pure white in dark mode. Do not use tinted
palette neutrals for image outlines; they can read as dirt on the image edge.

## Hit Areas

Aim for 44x44px interactive targets when possible, and at least 40x40px. If the
visible element is smaller, extend the hit area with a pseudo-element.

```css
.icon-button {
  position: relative;
  width: 20px;
  height: 20px;
}

.icon-button::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
}
```

If extended hit areas collide, shrink them until they no longer overlap. Two
interactive elements should not claim the same pointer area.

## Masks

Use masks when visibility should be controlled without painting an overlay.

Edge fade:

```css
.scroll-row {
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 14%,
    black 86%,
    transparent
  );
}
```

Shape reveal:

```css
.card {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 700ms ease;
}

.card[data-shown="true"] {
  clip-path: inset(0 0 0 0);
}
```

Text mask:

```css
.title {
  background-image: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

## Compositing

Use isolation when blend modes should operate inside a component rather than
against the page behind it.

Inspect paint order, opacity, masks, blend modes, borders, shadows, and backdrops
before adding another visual layer. Compose generated graphics in code when they
need maintenance, state, customization, or animation.

```css
.card {
  isolation: isolate;
}
```

Fade a group when the group is the intended object:

```css
.avatar-group {
  opacity: 0.45;
}
```

Avoid fading overlapping children individually unless the overlap interaction is
intended.

Layer shadows:

```css
.raised {
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.18),
    0 16px 34px rgb(0 0 0 / 0.16);
}
```

Avoid doubled transparent borders in tables or lists by drawing only one shared
edge.

## Motion

Prefer semantic, interruptible motion. Replacement should usually be fast and
concurrent.

Motion/React shape:

```tsx
<AnimatePresence mode="popLayout">
  {open ? (
    <motion.div
      key="panel"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: "spring", visualDuration: 0.32, bounce: 0.18 }}
    />
  ) : null}
</AnimatePresence>
```

Use arcs when straight travel feels mechanical:

```ts
function arc(start: number, end: number, lift: number, t: number) {
  const x = start + (end - start) * t;
  const y = -Math.sin(t * Math.PI) * lift;
  return { x, y };
}
```

Combine properties so motion reads physically:

- Position moves.
- Scale changes at the lift peak.
- Shadow grows during lift and settles on return.

## Animation Detail Defaults

For enter animations, split the content into semantic chunks instead of
animating one large container. A practical default is:

- Title, description, controls, and supporting content animate as separate
  children.
- Stagger child groups by about `100ms`.
- If splitting a title into words, stagger words by about `80ms`.
- Combine opacity, `translateY(12px)`, and `blur(4px)`.

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
>
  <motion.h1
    variants={{
      hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    }}
  />
  <motion.p
    variants={{
      hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    }}
  />
</motion.div>
```

Exit animations should be softer and shorter than enter animations. Start with a
small fixed movement, not a full-height slide:

```tsx
<motion.div
  exit={{
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.15, ease: "easeIn" },
  }}
/>
```

Use a full spatial exit only when the relationship matters, such as a drawer
closing or a card returning to a list.

For contextual icon swaps, animate opacity, scale, and blur instead of toggling
visibility:

```tsx
<AnimatePresence initial={false} mode="popLayout">
  <motion.span
    key={isActive ? "active" : "inactive"}
    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
  >
    <Icon />
  </motion.span>
</AnimatePresence>
```

Use these values as the default for contextual icon animation:

- Scale from `0.25` to `1`.
- Opacity from `0` to `1`.
- Blur from `4px` to `0`.
- Motion spring duration `0.3`, bounce `0`.

If the project does not already use Motion or Framer Motion, keep both icons in
the DOM and cross-fade with CSS. One icon can be absolutely positioned while the
other defines layout.

```tsx
<div className="relative">
  <div
    className={cn(
      "absolute inset-0 transition-[opacity,filter,scale] duration-300",
      "ease-[cubic-bezier(0.2,0,0,1)]",
      isActive ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
    )}
  >
    <ActiveIcon />
  </div>
  <div
    className={cn(
      "transition-[opacity,filter,scale] duration-300",
      "ease-[cubic-bezier(0.2,0,0,1)]",
      isActive ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0",
    )}
  >
    <InactiveIcon />
  </div>
</div>
```

For press feedback, start with `scale(0.96)`. Do not go below `0.95` unless the
product moment is intentionally exaggerated. Add a static or reduced-motion
escape hatch when press motion would be distracting.

```css
.button {
  transition-property: scale;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

.button:active {
  scale: 0.96;
}
```

Use `initial={false}` on `AnimatePresence` for elements that are already in their
default state on page load, such as icon swaps, toggles, tabs, and segmented
controls. Do not use it when the component depends on a first-load entrance
animation, such as a staggered hero.

## Transition And Compositing Hygiene

Never use `transition: all` or a utility that maps to all properties. Name the
properties that change.

```css
.button {
  transition-property: scale, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}
```

Tailwind examples:

```tsx
<button className="transition-[scale,background-color] duration-150 ease-out" />
<button className="transition-transform duration-150 ease-out" />
```

Use `will-change` only after observing first-frame stutter, and only for
compositor-friendly properties:

```css
.animated-card {
  will-change: transform, opacity;
}
```

Usually useful:

- `transform`.
- `opacity`.
- `filter`.
- `clip-path`.

Usually not useful:

- `top`, `left`, `width`, `height`.
- `background`, `border`, `color`.
- `padding`, `margin`, layout-affecting dimensions.

Every extra compositing layer costs memory. Remove `will-change` when it no
longer solves a measured problem.

## State Gallery

For stateful UI, expose states together. A simple async button can be inspected
like this:

```tsx
const states = ["idle", "submitting", "success", "error"] as const;

export function ButtonStateGallery() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {states.map((state) => (
        <ExampleButton key={state} state={state} />
      ))}
    </div>
  );
}
```

For nonlinear surfaces, add controls for important conditions instead of
duplicating every static comp:

- Has data.
- Empty.
- Loading.
- Error.
- Permission denied.
- Mutating.
- Optimistic success.
- Retry available.
- Cached stale data.

## Optimistic UI

Optimistic writes:

```ts
const previous = cache.get(key);
cache.set(key, optimisticValue);

try {
  await save(value);
} catch (error) {
  cache.set(key, previous);
  toast.error("Could not save. Retry?");
}
```

Optimistic reads:

- Show cached previous state immediately.
- Mark stale data if needed.
- Reconcile with server state without layout jumps.
- Avoid flashing default icons or blank states before known user state arrives.
