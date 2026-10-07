# Export traceable block records

Use this when the user requests the registry, block metadata, ID list, or traceability records as structured data. A natural-language request is sufficient; there is no parent `--registry` command protocol. Image exports follow [export](export.md) independently.

The packaged exporter projects literal `data-block-*` attributes from the selected HTML. It never supplements them from visible text, position, code, or judgment. Longer authoritative records stored elsewhere need their own explicit export; this projection cannot recover them.

```sh
python3 <skill>/scripts/export_registry.py diagram.html
python3 <skill>/scripts/export_registry.py diagram.html --out requested.registry.json
python3 <skill>/scripts/export_registry.py diagram.html --check
```

Export writes `<source-basename>.registry.json` by default. `--check` is a separate check-only action and writes nothing. Export does not imply validation. Run both when the task calls for a valid registry. Neither changes the source.

The JSON has a `source` basename and a `blocks` array in document order. Each element carrying `data-block-id` produces one record. The supported keys are id, parent, name, input, output, constraint, assumption, and impl. A key is present only when its matching attribute is present. Empty values remain empty strings; absent values remain absent. HTML entities are decoded as attribute values, without additional trimming or rewriting. No timestamp or inferred field is added.

Duplicate IDs on different elements, unresolved parents, and cycles remain in an exported projection rather than being silently repaired. The structural check reports duplicate or empty IDs, missing names, unresolved parents, and cycles. Duplicate attributes on one element are ambiguous and rejected. A source without blocks is rejected; select the actual diagram instead of the gallery wrapper.

A valid parent graph does not prove the drawing follows it, that implementation paths exist, or that records are complete or correct. Compare IDs, names, parent edges, and authoritative records with the rendered figure. The source checker in [verification](verification.md) has separate HTML/SVG coverage and does not validate registry structure.
