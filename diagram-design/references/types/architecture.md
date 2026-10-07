# Architecture

Use this for components, their responsibilities, and the connections between them. Use [deployment](deployment.md) for where they run, [integration topology](integration-topology.md) for many external systems, or [high-level](high-level.md) for a staged data platform overview.

Start with the question the reader needs to answer: where a request goes, who owns a responsibility, or which boundary a dependency crosses. Retain the real component names and edge direction. A network connection, data transfer, call, dependency, and trust relationship are different claims; label or style them distinctly when more than one appears. Bidirectional arrows require evidence of both directions. A reply does not automatically make a dependency bidirectional.

Group components by a real shared property, such as a tier, team, account, or trust boundary. Name that property. A container's shape alone must not imply security or ownership. Mark unknown placement or ownership explicitly instead of assigning the nearest convenient zone.

Lay out the main path first, then side dependencies. Orthogonal routes often make this easier, but the meaningful endpoint and direction matter more than a prescribed elbow radius. Use [primitives](../primitives.md) for routing and selected skin tokens for appearance.

Check by tracing one representative request and each boundary crossing against the source. Inspect secondary paths, reverse arrows, labels, and disconnected components. If the view omits implementation detail, state its scope and keep an identity mapping to the detailed source.

Worked layouts: [architecture](../../assets/example-architecture.html), [full](../../assets/index.html#example-architecture-full), [dark](../../assets/index.html#example-architecture-dark). Their fonts and colors are sample styling.
