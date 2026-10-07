# Excalidraw import

Run the bounded JSON reader and inspect its inventory:

```sh
python3 <skill>/scripts/excalidraw_extract.py source.excalidraw --json --out source.ir.json
python3 <skill>/scripts/excalidraw_extract.py source.excalidraw
```

The helper reads scene JSON, not rendered screenshots or encrypted remote scenes. Its current input and element limits are declared in the script; `--max-rows` changes digest display, not extraction. Exit 2 reports malformed, unsupported, or oversized input.

It retains normalized boxes and standalone text, group/frame membership, bound text labels, selected styling, position and size, and arrows with bindings to known elements. It counts deleted elements and unsupported/freehand content. Image and embed elements retain placeholders and identity, not their visual payload. Unbound lines and arrows cannot safely establish endpoint relationships from proximity alone.

Inspect the live-versus-deleted counts, unsupported content, unbound endpoints, groups, frames, and original text attachment. A stroke drawn by hand may be a critical boundary even when the normalized graph does not include it. A deleted object is excluded from the current view; an unsupported live object is unresolved. These are different losses.

For exact styling or native editing, retain and inspect the scene with the actual tool or trusted local renderer. For a restyle, preserve source meaning using [imports](imports.md), and make any inferred proximity relation explicit. Check identity, connections, arrow direction, labels, and all accounted losses against the source, then inspect the delivered artifact.
