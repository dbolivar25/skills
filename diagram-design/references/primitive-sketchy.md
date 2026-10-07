# Sketchy Filter (hand-drawn variant)

Optional displacement filter for a hand-drawn treatment. It changes visible edges, so use it where that loss of precision fits the actual task and selected skin. It is not an automatic indication that a system is provisional or unverified.

## Grammar

```svg
<defs>
  <filter id="sketchy" x="-2%" y="-2%" width="104%" height="104%">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4"/>
    <feDisplacementMap in="SourceGraphic" scale="1.5"/>
  </filter>
</defs>

<!-- Apply to a group wrapping shapes — NOT text -->
<g filter="url(#sketchy)">
  <!-- rects, paths, circles, lines go here -->
</g>

<!-- Text sits OUTSIDE the filtered group — legibility stays crisp -->
<text ...>Labels go here</text>
```

## Tuning

| Parameter | Range | Effect |
|---|---|---|
| `baseFrequency` | 0.01–0.04 | Lower = lazy wavy lines; higher = jittery. 0.02 default. |
| `numOctaves` | 1–3 | More = more noise detail. 2 is plenty. |
| `scale` | 1–6 | 1 barely-there, 1.5 default, 2 visible, 4+ cartoon. |
| `seed` | integer | Swap for a different random pattern. |

Use a diagram-prefixed filter ID and update its matching reference when inlining several figures. Keep a fixed seed for reproducible export. Include the displaced paint in actual export bounds; a nominal viewBox can clip it.

## Critical rule
Filter shapes, NOT text. Displacement-mapped text becomes illegible. Structure your SVG so text is in a sibling group outside the filtered group.

## When to use
- Essay / blog post / newsletter where the diagram is the hero of a narrative page.
- "Working sketch" register — showing something is mid-thought, not final architecture.

## When not to use
- Technical documentation (precision matters).
- Diagrams with dense labels or tight alignments (filter reads as noise).
- Any theme where thin or displaced strokes become unclear. Inspect the actual contrast and export; dark styling is not inherently forbidden.
