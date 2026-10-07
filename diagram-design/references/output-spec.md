# Decide the output before drawing

Resolve four independent choices: the question and reader, fidelity, destination, and selected skin. Infer them from the request and supplied source where possible. Ask only for a missing choice that would materially change the result. A slide, an exact source conversion, and an editable native file require different work even when all show the same system.

## Fidelity

For an import, default to preserving source meaning. Exact reproduction additionally preserves geometry and styling; a restyle can change those while retaining entities, relationships, labels, identities, and status. A summary may omit detail only when the task authorizes it. Keep the source available and name actual omissions, aggregations, or unresolved features. The extractor's digest is an inventory aid, not permission to treat its subset as the complete diagram.

For a new diagram, choose the detail needed to answer the reader's question. Useful presets are:

- **Faithful:** retain all relevant source content, possibly across pages or views.
- **Balanced:** expose the main structure with supporting details attached or beside it.
- **Simplified:** a deliberate summary with stated scope and a mapping to the full source.

These are choices, not node-count laws. A complex but essential relationship must not be cut because a recipe's sample has fewer boxes. More detail can require a larger artifact, multiple views, or an interactive inspection state.

Audience changes explanation, vocabulary, and prominence. It does not automatically remove proper nouns, vendor identities, versions, exact conditions, or other facts that determine the answer. An executive view can still need the precise product name; a technical view can still need plain language.

## Destination

| Destination | Useful output | Point of use to inspect |
| --- | --- | --- |
| Browser or shareable standalone explanation | HTML with SVG; interactions only if useful | Target viewport, narrow state, keyboard and focus states |
| Document or slide | SVG where supported; PNG for reliable raster placement | Actual placed size, font loading, crop, contrast |
| Office import | Flattened, self-contained SVG or PNG | Destination application's rendering, especially foreignObject, fonts, masks |
| Editable source requested | Native format or source file plus usable preview | Reopening/editing in the named tool, not only a screenshot |
| Scientific or publication figure | Plotting output and source data/code | Required dimensions, units, resolution, typography, exported file |

Do not promise an editable native artifact by delivering an image. The import scripts emit IR and digests, not draw.io or Excalidraw writers. Use the appropriate tool or retain the native original when editing is required.

Choose reading size from where the figure will be used. A wide map can scroll in a browser; shrinking it onto one slide may make it unusable. Measure labels and actual bounds. Grow, facet, or split before reducing important text below readable size. Recipe dimensions are starting points, not universal size targets.

## Styling and delivery

Select a skin through [skins](skins.md). Brand selection is separate from semantics and detail. The older gallery contains several illustrative palettes and fonts; copying a layout does not make it Augment-branded.

Record consequential decisions close to the artifact: source and date, scope, fidelity, meaningful omissions, units, and uncertainty. Keep explanatory caveats visible when they affect interpretation. A long provenance record can accompany the figure, but metadata alone must not conceal missing evidence.

Deliver the requested format, source when requested, and concise validation evidence. Use [export](export.md) for actual file production and [verification](verification.md) to distinguish source checks from rendered and destination checks.
