# Assets

## Logos

Use only official SVG files from `assets/logo/`.

- `augment-mark.svg`: standalone mark, currentColor, tintable.
- `augment-wordmark-black.svg`: light surfaces.
- `augment-wordmark-white.svg`: dark surfaces.
- `augment-wordmark-on-dark.svg`: dark surfaces.
- `augment-wordmark-color.svg`: color lockup, mark pink plus burgundy wordmark.

Preserve the official paths, proportions, color intent, and clear space. Do not redraw, trace, distort, recolor arbitrarily, or turn the mark into generic UI chrome.

## Fonts

Matter SQ font files live in `assets/fonts/` as `.woff2` files for weights 300 through 800, normal and italic. `tokens/fonts.css` defines the `@font-face` rules.

When copying assets into an artifact or app, preserve the relative relationship expected by `tokens/fonts.css`: token CSS expects fonts at `../assets/fonts/...`.

## UI Icons

This package does not ship a proprietary UI icon set. Use the target app icon system when one exists. For prototypes, a simple rounded-stroke SVG icon set such as Lucide is an acceptable substitute, but disclose the substitution when the artifact is meant to represent brand-system truth.

Do not use emoji or Unicode glyphs as UI icons.

