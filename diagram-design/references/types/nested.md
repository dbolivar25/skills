# Nested containment

Use this when the primary relationship is inside, part of, or scoped by. Containment can have siblings and branches; it is not restricted to one chain.

Name what each boundary means: ownership, permission scope, location, or structural membership. Do not infer trust or authority from visual containment alone. A component that belongs to several overlapping scopes may need separate views or explicit annotations rather than false single-parent nesting.

Preserve parent-child membership and identity. Leave enough inset space for parent labels and child boundaries. Labels should clearly belong to their own container. Show external connections only when relevant, with visible boundary crossings.

Check every containment relationship and sibling placement against the source. Inspect the deepest labels, shared-scope exceptions, unknown membership, and exported bounds.

Reference layouts: [nested](../../assets/example-nested.html), [full](../../assets/index.html#example-nested-full), [dark](../../assets/index.html#example-nested-dark).
