# Data flow

Use this to show what data moves, where it moves, and how it changes. Use [process](process.md) when actions and ownership are primary, or [sequence](sequence.md) when exact message ordering and branch behavior are primary.

Start with named producers, transformations, stores, and consumers. Each edge needs a real payload or relationship, a direction, and any material trigger or protocol. A query, stream, batch transfer, notification, and dependency are distinct. A tool logo does not establish what that tool does in this system.

For a staged data pipeline, a grid can align stages with input, transformation, and output roles. Those are semantic roles rather than mandatory populated cells. Mark absent, not applicable, and unknown separately when the distinction matters. Retain inputs to the first stage, outputs from the last stage, feedback, side inputs, and skipped-stage paths when present. Do not simplify the system into a linear chain by dropping them.

Use stable IDs for repeated entities and full payload names, or domain-specific abbreviations with a legend. Keep stage labels, tools, and payload chips visually distinct. A chip's placement must attach it to a specific edge or node, not an ambiguous nearby cell.

Lay out the dominant path, then route additional edges without reassigning stages or inventing a single focal step. Grouping, selective detail, or separate views can reduce clutter while preserving an explicit source mapping.

Verify every transformation's input and output, external boundaries, edge direction, and data identity against the source. Inspect empty cells, crossings, long labels, and all side paths at the actual delivery size.

Reference layouts: [data flow](../../assets/example-data-flow.html), [full](../../assets/index.html#example-data-flow-full), [dark](../../assets/index.html#example-data-flow-dark). The example geometry and short payload codes are recipes, not a universal schema.
