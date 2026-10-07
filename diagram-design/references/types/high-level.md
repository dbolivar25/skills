# High-level data platform

Use this for a functional overview of ingestion, processing, storage, and consumption. It explains the platform's major roles and dependencies. Use [deployment](deployment.md) for machines, accounts, clusters, and replicas, or [data flow](data-flow.md) for detailed payload transformations.

Choose stages from the real platform rather than a prescribed stack. A horizontal staged layout works well when readers follow data toward a product or consumer. A vertical form can give long stage labels more room. Keep the stage order meaningful, but do not imply every component is part of one linear path if the source has branches or feedback.

Represent actual tools and stores within their functional stage. Name component instances when multiple uses of one technology differ. Use stable IDs for edge endpoints instead of names that may repeat. Logos aid recognition; text still carries the identity and function. A cloud or Kubernetes boundary appears only when that deployment fact is supported.

Cross-cutting orchestration, security, and observability can sit in shared bands. State their actual coverage: a band spanning the entire platform visually implies platform-wide service. Limit it to the served stages or use attachments and labels. Do not invent all three bands merely because a worked example includes them.

Edges distinguish data transfer, query, control, and notification where relevant. Style follows those meanings and the chosen skin. Arrow direction, labels, and omission decisions are source facts; highlighting a preferred endpoint does not override them.

A stage grid is an optional construction aid. Measure label and icon bounds, reserve routing space, and calculate remaining width before assigning columns. There is no packaged generator that makes this layout deterministic. Resolve collisions by adding space or changing routes, not by changing assignments.

Check the view against an inventory and connection list. Trace a producer-to-consumer path, inspect shared-service scope, identify unknowns, and reconcile omitted detail. Verify legends, long names, group boundaries, and exported bounds at the intended reading size.

Reference layouts: [high-level](../../assets/example-high-level.html), [full](../../assets/index.html#example-high-level-full), [dark](../../assets/index.html#example-high-level-dark), plus the horizontal and vertical data-lake examples in the [gallery](../../assets/index.html). Those assets retain full worked geometry and sample styling.
