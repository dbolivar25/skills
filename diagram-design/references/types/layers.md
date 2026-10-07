# Layers

Use this for ordered abstraction, responsibility, or defense layers. Use nested containers when containment is the relationship, and architecture when peer components and their connections matter.

Define what vertical order means. Higher abstraction, later processing, stronger control, and closer physical position are different relationships. Label interfaces or dependencies between layers when those matter. A broad band does not establish that it applies to every component beneath it.

For defense layers, identify the threat or failure mode each addresses and what remains. Several controls do not imply zero residual risk. Do not make a detection layer look preventive or a policy look technically enforced.

Size for labels and optional subcomponents. Layer heights can be decorative unless they encode a disclosed quantity. Check order, interface direction, scope, and any coverage claims against the source.

Reference layouts: [layers](../../assets/example-layers.html), [full](../../assets/index.html#example-layers-full), [dark](../../assets/index.html#example-layers-dark).
