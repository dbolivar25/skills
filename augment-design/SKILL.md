---
name: augment-design
description: Use for Augment-branded interfaces, copy, documents, decks, diagrams, or assets. Apply the authoritative identity, voice, tokens, evidence and privacy constraints, and the relevant surface guidance while preserving the product's own positioning.
---

# Augment Design

Own the reusable Augment identity and brand constraints. Read `readme.md` for values, `references/composition.md` for their surface application, and use the supplied `tokens/` and `assets/`. Do not redraw a logo, substitute an approximately similar font, or reconstruct tokens from memory.

## Apply the appropriate material

- Identity and assets: use the current logo variants, fonts, color roles, and placement guidance for the actual background and scale.
- Voice and copy: read `references/voice.md`; preserve supported facts and the intended reader's understanding. Respect privacy and evidence constraints. The application owns its positioning and customer promises.
- Product UI, marketing, presentation, or document: read `references/product-ui.md`, `references/marketing.md`, or `references/documents.md` for that surface and apply its real constraints. Use the appropriate artifact format and native editor rather than forcing every surface into HTML.

Preserve meaning before applying a skin. Coordinate with Interface Design for product interaction and Diagram Design for explanatory structure when those jobs are present. Brand guidance alone does not establish usability, factual truth, or publication authority.

## Inspect the rendered result

Verify actual typography, marks, colors, contrast, hierarchy, wrapping, and spacing in the intended output and relevant states. Check exported or rendered files, not only source token names.

Read `references/qa.md` and `references/production-checks.md` for relevant output checks. Use `checks/audit.js` as a bounded diagnostic aid. It establishes only the paint and font conditions it actually inspects; it cannot certify unobserved SVG, gradients, pseudo-elements, effects, or applied typography. Resolve a material discrepancy through rendered inspection or an appropriate check.

Finish with a coherent Augment surface, supported copy, usable assets, and visible remaining brand or evidence gaps. Preserve the user's requested delivery stage.
