# Tokens

Use source CSS as token truth. `styles.css` imports all token files.

## Files

- `tokens/fonts.css`: Matter SQ `@font-face`.
- `tokens/colors.css`: color primitives and semantic aliases.
- `tokens/typography.css`: font families, weights, sizes, line heights, tracking, and measures.
- `tokens/spacing.css`: spacing, radius, stroke, and aspect ratios.
- `tokens/effects.css`: opacity, blur, and shadow.
- `tokens/glow.css`: edge-glow primitive and presets.
- `tokens/grain.css`: grain texture primitive.
- `tokens/motion.css`: duration, easing, scale, rotation, and reduced-motion behavior.

## Color

Brand:

- `--burgundy-600 #660033`: primary brand burgundy and wordmark color.
- `--burgundy-700 #4d0026`, `--burgundy-800 #3d001e`: deeper brand fields.
- `--plum-500 #852d5a`, `--plum-600 #621e50`, `--plum-700 #4f2a3c`: supporting tones.
- `--mark-pink #cf0147`: vivid mark/lockup accent.

Neutral:

- `--ink #040919`, `--woodsmoke #2b2d39`, `--cloud-burst #6f7288`: text and chrome.
- `--neutral-25 #fafbfb`, `--neutral-50 #f4f6f6`, `--neutral-75 #e8e8ec`, `--neutral-85 #e3e3e8`, `--neutral-100 #afaeb1`: surfaces and borders.
- `--bone-100 #f6f1ef`, `--bone-300 #e6dad8`, `--bone-500 #e9e1e1`: warm paper surfaces.

Signal and artwork:

- `--green #00c000`, `--red #ed4343`, `--gold #ffbe5c`: success, error, warning.
- `--arctic #aee3e4`, `--frost #b4c1fa`, `--oink #f7c5da`, `--peach #fbd6a9`, `--gold #ffbe5c`: artwork and atmosphere.

## Typography

- Font: `--font-sans`, Matter SQ.
- Display: `72/80 -2.5px`, `48/56 -2px`, `32/40 -0.5px`.
- Body: 20/32 lead, 15/24 body, 13/16 caption.
- Labels: 12-13px with positive tracking when they are functional labels.
- Measures: `--measure-44`, `--measure-56`, `--measure-64`, `--measure-72`.
- Use tabular numerals when numbers compare or update.

## Geometry

- Spacing uses the 4px scale from `--space-4` through `--space-176`.
- Radius uses `--radius-4`, `--radius-8`, `--radius-16`, `--radius-pill`, and `--radius-circle`.
- Buttons and inputs usually use 8px radius. Cards usually use 16px. Chips and pills use pill radius.

## Motion

- UI durations: `--dur-150`, `--dur-200`, `--dur-280`, `--dur-320`.
- Larger transitions: `--dur-560`.
- Atmospheric drift: `--dur-17000`.
- Standard easing: `--ease-1`. Expressive deceleration: `--ease-2`. Gentle overshoot: `--ease-3`.
- `tokens/motion.css` zeros duration tokens inside `prefers-reduced-motion`; preserve that behavior.

