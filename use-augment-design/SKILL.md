---
name: use-augment-design
description: "Use when creating, implementing, reviewing, or polishing Augment-branded visual work: product UI, websites, marketing pages, decks, reports, prototypes, static artifacts, or production code. Also use when another design or build skill needs Augment brand tokens, voice, logos, Matter SQ, component primitives, or brand QA."
---

Augment-branded work follows a design contract: official assets, token values, primitive components, and a final QA pass. It does not invent what Augment sells or what a surface should be used for.

## Process

1. Orient to the target surface.
   Determine whether the work is production code, a prototype/static artifact, a deck/report, or a design review. Read the current target surface before applying the brand so the design solves the real medium instead of becoming a skin. If the user gives no target, ask what to build and for what medium.
   Completion: medium, audience, constraints, and production/prototype status are explicit or stated as assumptions.

2. Load the smallest relevant context.
   For any visual work, read `references/design-contract.md`. For copy, states, labels, or marketing/product language, read `references/voice.md`. For token values or CSS integration, read `references/tokens.md`. For logo, wordmark, and font files, read `references/assets.md`. For material, glow, grain, elevation, motion, or layout rules, read `references/material.md`. For React primitives, read `references/components.md`, then the exact component `.prompt.md` and `.d.ts` files you use. For package contents, read `references/inventory.md`.
   Completion: every used token, asset, component, and brand rule is traceable to a loaded file in this package or to the target codebase.

3. Design from the spine.
   Use Matter SQ, the burgundy-plum brand spine, cool ink neutrals, warm bone canvases where appropriate, exact spacing, small rational radius, and factual copy. Chromatic color is signal, atmosphere, or artwork; it is not decoration. Brand swirl, edge-glow, and grain are material primitives for true brand or large-surface moments, not routine chrome.
   Completion: the surface has a clear hierarchy, exact alignment, appropriate material depth, and no invented brand primitives.

4. Build or adapt in the target medium.
   In production code, adapt to the host app patterns and copy only the assets, tokens, and primitive code needed. In static artifacts, use local assets from this package and link `styles.css`. Preserve accessibility, responsive behavior, focus states, loading/disabled/error states, and reduced-motion behavior.
   Completion: the implementation runs in the target medium and does not depend on files outside this package except the target app itself.

5. Run brand QA before returning work.
   Apply `references/qa.md` against the final surface. For visual artifacts or frontend work, render and inspect the result at the relevant viewport(s). Fix visible overlap, illegible contrast, wrong logo use, decorative eyebrows, hype copy, decorative chromatic color, and missing states before final response.
   Completion: QA findings are resolved or explicitly called out with the remaining tradeoff.

## Package Map

- `styles.css` imports the package token CSS.
- `tokens/` holds fonts, colors, typography, spacing, effects, glow, grain, and motion primitives.
- `assets/logo/` holds official Augment marks and wordmarks. `assets/fonts/` holds Matter SQ.
- `components/` holds reusable primitive source files, each with `.jsx`, `.d.ts`, and `.prompt.md`.
- `specimens/` holds neutral proof sheets for visual calibration. Specimens are not templates or recipes.
- `references/` holds detailed design guidance.
