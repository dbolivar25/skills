# Retrieve a selected example or icon

Use when a recipe points to a worked layout or the [icon index](primitive-icons.md) identifies a useful icon. The [example gallery](../assets/index.html) and [icon gallery](../assets/icons.html) are browsing aids. Their catalogs retain complete original sources; do not export the gallery wrapper or load the entire catalog into agent context.

## Select and read

Example links select the named type and variant. Light examples and single demonstrations remain ordinary HTML files. Dark/full variants are bundled inside the example gallery. Icon links select the named preview; the icon catalog retains each original complete SVG source, including its namespace, viewBox, paints, and IDs.

Use the Python standard-library helper from any working directory. Replace `<skill>` with this package's absolute path and choose an output path in the caller's workspace or artifact directory:

```sh
python3 <skill>/scripts/asset_source.py example architecture --variant dark --output /tmp/architecture.html
python3 <skill>/scripts/asset_source.py icon user --output /tmp/user.svg
```

Omit `--output` to read the selected source on stdout without writing a file. Examples default to `--variant light`; `dark` and `full` are available for the 46 complete example families. Single demonstrations use their exact name, such as `import-drawio` or `queue-animated`, with the default light variant. Unknown names or unavailable variants fail instead of substituting another asset.

List names without loading source bodies:

```sh
python3 <skill>/scripts/asset_source.py example --list
python3 <skill>/scripts/asset_source.py icon --list
```

Read and adapt the returned standalone source. Preserve meaning and apply the selected skin; example colors and fonts are sample styling. Keep the icon's complete definitions and matching ID references when inlining or exporting, following [icon use](primitive-icons.md).

## Open, export, and maintain

The example gallery's standalone link opens the selected original document. Bundled sources use a browser object URL; this is a temporary viewing URL, so retrieve a file with the helper when a durable or shareable source path is needed. Preserve any existing remote font dependency when comparing or exporting a worked example. Packaging does not make remote fonts available offline.

Follow [export](export.md) and [verification](verification.md) on the selected document or figure. The galleries require JavaScript for selection; a retrieved static example or SVG is independent of the gallery controller. All templates, animated demonstrations, fonts, import converters, and the canonical motion controller remain at their existing package paths.

To edit a bundled asset, change only its named JSON source entry in the owning gallery, serialize `<` safely as `\u003c` inside the JSON script element, and preserve the complete source rather than reconstructing it from the preview DOM. Verify retrieval and rendering before updating its source-hash expectation. The tests' original-source hashes record exact preservation during consolidation; an intentional later source change needs its own review.
