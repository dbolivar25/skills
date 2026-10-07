# Trees

Use this for a hierarchy with one parent per non-root item and no cycles. Use dependency or architecture graphs for shared dependencies, cycles, or peer links. Use nested containers when containment is more important than traversal.

Preserve parent-child membership, levels, and identity. Shared entities cannot become separate independent nodes merely to make a tree; repeated visual instances need an explicit reference to the same entity. Collapsed subtrees need their members and extent retained or named.

Orthogonal shared buses can make siblings readable when the junction clearly means one parent branching to children. Distinguish that intentional branch from an accidental crossing or merge. Order siblings by a declared meaningful rule or source order. Do not skip a known level or invent a grouping parent just to fit.

Verify every parent, the root, collapsed branches, and any shared-identity exception against the source. Inspect deep labels, branch junctions, and reading order at delivery size. For stable block identity and sidecars, use the traceable-block pattern in [semantic patterns](../semantic-patterns.md).

Reference layouts: [tree](../../assets/example-tree.html), [full](../../assets/index.html#example-tree-full), [dark](../../assets/index.html#example-tree-dark).
