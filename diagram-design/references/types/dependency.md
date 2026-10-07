# Dependency graphs

Use this for components that require other components. A graph supports shared dependencies and cycles; a tree does not.

Declare arrow meaning, commonly dependent → dependency, and keep it consistent. Reverse it only if the question explicitly uses impact or supply direction. Distinguish dependency types such as build, runtime, optional, and ownership. A dashed edge means the declared relationship type, not that the route was inconvenient to draw.

Arrange by meaningful dependency depth when possible. Real cycles prevent a pure topological ranking; preserve and label them rather than choosing one cycle to retain or forcing all edges forward. A shared dependency stays one identifiable node, or repeated visual instances must explicitly reference the same identity.

If showing degree or impact badges, say whether counts cover the displayed view or the full source graph. Collapsed groups retain their members and external connections in a source mapping. A busy hub is not automatically a critical bottleneck without runtime or operational evidence.

Check every edge and direction against the source, including shared dependencies, optional edges, disconnected nodes, and all cycles in scope. Trace the selected component's requirements and the reverse impact question separately. Inspect edge labels, merge points, and high-degree nodes at delivery size.

Reference layouts: [dependency](../../assets/example-dependency.html), [full](../../assets/example-dependency-full.html), [dark](../../assets/example-dependency-dark.html).
