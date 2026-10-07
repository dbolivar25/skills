# draw.io import

Run the bounded reader on the source, then inspect its full IR:

```sh
python3 <skill>/scripts/drawio_extract.py source.drawio --json --out source.ir.json
python3 <skill>/scripts/drawio_extract.py source.drawio --page 0
```

`--page` accepts a zero-based index or a page name; without it the digest lists all pages. `--max-rows` limits only digest presentation. Check the actual `--help` for available options. Exit 2 reports unreadable or unsupported input. The helper reads raw mxfile/mxGraphModel XML, compressed pages, and PNG/SVG metadata containing an editable diagram; a raster image without that metadata needs a visual reconstruction method.

It retains node IDs, plain-text labels, normalized shapes, parent membership, translated positions and sizes, selected style roles, extra object attributes, and connections. Geometry normalization covers ordinary parent-relative boxes, not all fractional, rotated, or specialized mxGraph geometry. It reports waypoint counts rather than exact route coordinates. Full JSON is the complete normalized IR, not every original style or XML feature. Keep the native source for exact reproduction or editing.

Inspect all pages, unnamed nodes, containers, dangling endpoints, start-only arrows, and source notes. An edge's absence from a digest row is not proof that it is absent from the source. Distinguish source line style from an inferred relationship type. Nested geometry can be relative; verify absolute placement against a source preview if visual fidelity matters.

Choose the final representation and detail through [imports](imports.md). Retain IDs or an explicit mapping after merging or renaming. Compare entities, edges, containment, direction, and labels to the XML and preview. Report unsupported geometry or features rather than claiming the helper reproduces arbitrary draw.io content.
