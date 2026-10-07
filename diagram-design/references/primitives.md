# Nodes, connectors, and labels

Use these construction methods after choosing the representation and [skin](skins.md). Geometry serves the diagram's meaning. The gallery's exact offsets, fonts, and colors are optional recipes.

## Nodes and containers

Measure real labels before sizing boxes. Preserve source names; wrap, expand, or move supporting detail into an attached legend instead of silently truncating identity. Use a consistent visual grammar for like entities and make status or type differences explicit. Containers name a real grouping property. Leave room for the parent's label and avoid implying trust, authority, or coverage merely through enclosure.

Draw ordinary connectors behind nodes so attachments remain clean. Inspect arrowheads after the nodes are drawn: a correct path can have its entire head hidden under the destination. An endpoint must meet the actual node boundary, not an assumed center or a stale sample coordinate.

## Routing

Orthogonal routes are useful for many system maps; curved or straight routes may be better for other representations. Preserve endpoint, direction, and relationship style. Do not turn an edge dashed simply because it passes behind a box, or change step order to avoid a crossing.

Choose ports based on the route's direction and available space. An elbow recipe with radius r can round a horizontal-to-vertical turn: stop the first segment r before the corner, use a quadratic corner, then continue vertically. Reduce r when segments are short. For a rectangular node centered at (cx, cy), intersect a ray with its half-width and half-height using the first positive boundary intersection; do not assume every circular layout station has the same attachment.

A crossing is not a junction unless the source connects those edges. Use separation or a small bridge when needed. A shared bus is legitimate for a tree branch or an explicitly common relationship, but its junction and scope must be unmistakable. Do not let unrelated edges share a segment that implies a merge. Reroute around unrelated nodes rather than running through them.

SVG marker size depends on markerUnits, stroke width, refX/refY, and the path endpoint. With the default strokeWidth units, doubling the stroke doubles the marker. Measure the visible tip and clearance in the rendered output. Ensure markers and labels are included in export bounds.

## Labels and legends

Place an edge label on its own edge with enough separation from turns, nodes, and neighboring routes. A paper-colored backing can improve legibility over a line; it is optional and must use the actual selected surface. Do not mask a junction or other edge so thoroughly that the relationship becomes ambiguous. A leader lets a label move without moving a measured point or attachment.

Use consistent typography and selected semantic colors. Legend placement follows available reading space, not a mandatory bottom position. Explain every non-obvious encoding, status, boundary, and arrow meaning. An annotation's leader should look different from a system connection.

Inspect endpoints, crossings, shared segments, long labels, dense containers, and export crop at the intended reading size. Structural HTML/SVG checks do not detect these visual or semantic failures.
