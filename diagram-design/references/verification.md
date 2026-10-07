# Verify the diagram the user will use

Verification has three different objects: the source meaning, the rendered figure, and the delivered file or destination. Check each required object. A parser success, HTML source check, or attractive screenshot proves only its own part.

## Meaning and data

Compare the artifact to the actual source. Reconcile entity and edge identities, directions, containment, labels, statuses, unknowns, counts, and omitted content. For quantitative marks, calculate the encoding independently from source data: scales, units, coordinates, areas, widths, ranks, bins, running totals, or conservation as appropriate. The selected type reference names its failure cases.

Do not derive the expected answer from the rendered marks or their data attributes. Those may share the same mistake as the figure. There is no packaged general data-encoding validator. A task-specific check is useful only when it compares against independent data and handles the actual transforms and geometry.

## Rendered artifact

Open the actual HTML, SVG, native file, or placed figure in its intended context. Inspect ordinary content and relevant edge cases: long labels, crowded routes, missing values, ties, zero, negative values, source uncertainty, and theme. Check fonts actually loaded, contrast, endpoint attachment, crossing versus junction, crop, bounds, and reading size.

For interaction, exercise the states people will use, including keyboard/focus, filtering, selected items, and tooltips. For motion, exercise initial, play, pause, replay, step, reduced motion, and print or static fallback as relevant. Do not claim the whole gallery was inspected from a subset of screenshots.

## Bundled source check

```sh
python3 <skill>/scripts/self_check.py artifact.html
```

`self_check.py` examines HTML/SVG source for a limited accessibility envelope, active-content and resource references, and the canonical motion-controller contract. It checks top-level SVG title/description wiring, rejects several active elements and event handlers, examines URL-bearing attributes and common CSS resource forms, and validates the controller source and motion attributes it understands.

It is a diagnostic for artifacts following this package's supported pattern. It does not establish geometry, data semantics, complete accessibility, contrast, font loading, runtime behavior, arbitrary CSS execution safety, destination fidelity, or source coverage. A failure may reveal a real defect or a deliberately unsupported artifact pattern; inspect the reason. A pass is not a universal safety certificate.

## Delivery

Follow [export](export.md), then reopen the exported file or place it in the named destination. Check self-contained resources, transparent background if requested, actual dimensions, image quality, and native editability when promised. Report what was checked, what remains unresolved, and any narrower coverage than the requested result. Keep evidence such as screenshots or check results when the task needs an auditable receipt.
