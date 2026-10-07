# Diagram verification

Check the result in the intended renderer and destination. Source checks can
establish markup or arithmetic conditions; they do not certify the visual,
semantic claim, interaction, or exported file.

## Meaning and source

Reconcile nodes, edges, directions, labels, guards, cardinality, grouping,
boundaries, ordering, units, dates, and known/unknown state with the source.
Identify whether the figure is documented design, observed runtime, hypothetical
behavior, or illustrative data. Unknown is distinct from denied, false, zero,
empty, skipped, and not reached. A connector must not imply an established path
when it is a hypothesis. A zone must not imply shared access or trust without
support. Preserve consequential import losses and source links.

Read the selected [representation recipe](representation-selector.md), and
[semantic patterns](semantic-patterns.md) when behavior matters. Their budgets
help reveal density, but no universal node count justifies removing source
meaning. Split overview/detail, choose a more scalable representation, or retain
a faithful full model when necessary.

## Rendered craft

At the intended display or print scale, inspect the reading order, text size,
font loading and actual fallback, wrapping, collisions, clipping, bounds,
legend, and meaningful grouping. Trace connectors to their true endpoints;
check distinct attach points, crossings, masks, and marker visibility. Labels
must identify their marks without requiring color recognition. A small title
or code identifier may need different wrapping than a long natural-language
label. Inspect delivered light/dark variants for polarity, not just token swaps.

For interactive or motion output, exercise keyboard controls, interruption,
static/no-JS, reduced motion, and print/export states. Motion reinforces meaning;
it must not hide the only complete explanation. The packaged
[animation recipe](animation.md) provides a scoped controller and accessible
fallbacks when that method is selected. A native Mermaid graph or a plotting
figure has its own output path and need not adopt that controller.

## Quantitative encodings

Use standard plotting tools for scientific and publication figures, preserving
plotting source and data. Check the mathematical claim independently of a
beautiful render. For a custom SVG, attach data values when useful, then
recompute drawn geometry against those values. An assertion copied from the
implementation is not an independent oracle.

- Bar/dumbbell/waterfall: verify shared units and scale, zero/domain handling,
  signed steps, running-total conservation, carry lines, labels, and subtotals.
- Bubble: area is proportional to magnitude, never radius; independently check
  both axes and the area constant, paint order, overlap, and bound labels.
- Treemap: drawn shares must match data shares after gutters/snapping, including
  unlabeled slivers. Check relative error, marker containment, and the polarity
  of “larger has stronger contrast” under the actual skin.
- Slopegraph: both endpoints share the same units and scale. Check labels against
  their actual series and inspect crossing-label ambiguity.
- Ridgeline: shared bins and amplitude, declared normalization, pitch/baseline,
  and range labels. Per-series normalization changes the comparison.
- Bump: rank is ordinal, rows follow the rank contract, and tie-breaking is
  explicit. Snapshot permutations, captions, and bound labels must agree.
- Beeswarm: one dot per retained item, shared radius and value scale, packing
  without overprint. State that the packing axis has no data meaning and count
  omitted records.
- Sankey: band width encodes one shared unit; reconcile incoming/outgoing totals
  and explicitly explain any real loss or source boundary.

The baseline recipe prose described several repository-specific `verify-*`
programs that are absent from this installed package. Those script claims have
been removed. The full encoding methods remain; run an appropriate real check
or implement a bounded check for the actual artifact, and report its evidence.
The bundled self-check below does not prove these encoding obligations.

## Bundled source diagnostic

For the selected single-file HTML/SVG method, run from the skill directory:

```sh
python3 scripts/self_check.py path/to/diagram.html
python3 -m unittest discover -s tests -v
```

Covered conditions: accessible SVG naming, dangerous markup/reference attributes,
CSS `url()`, quoted `@import` and `image-set()` references including escapes,
and the packaged motion markup/controller identity. Local fonts, fragment URLs,
and embedded image data are allowed; the only remote stylesheet exception is
an exact HTTPS Google Fonts `/css2` URL. CSS imports or local stylesheets are
not recursively inspected. The checker does not evaluate the CSS cascade,
variables, geometry, compositing, source truth, font portability, or visual
quality. A passing native SVG/plot/Mermaid output should be judged using the
method and destination appropriate to it rather than forced through this
HTML-specific checker.

For a traceable block registry, separately check ID uniqueness, parent resolution,
acyclic structure, metadata/source agreement, and the visible bounded view.
[Registry export](export-registry.md) projects literal attributes; it does not
repair or validate them.

## Export receipt

Check the actual exported file's format, pixel/physical dimensions, transparency,
fonts, labels, and destination rendering. CSS responsive dimensions can differ
from the SVG viewBox. A successful file write is not proof of the intended
image size or appearance. See [export](export.md).
