# Database schema

Use this for physical tables, columns, keys, and foreign-key relationships. Use [ER](er.md) for conceptual entities and relationships without implementation details.

Read the actual schema or DDL. Preserve table and column names, types, primary and unique keys, nullable status, and foreign-key columns in their real order. Composite keys and relationships must remain composite. Include indexes, defaults, checks, and update/delete actions when they affect the question. Unknown constraints are unknown, not plausible conventions filled in from memory.

Use a table compartment for fields and attach relationships to the actual referencing and referenced fields. Multiple relationships using one column may need separate ports or labeled routes. A physical foreign key establishes a reference; cardinality additionally depends on nullability and uniqueness. Do not infer a mandatory one-to-one relationship from a foreign key alone.

Show enough fields to answer the question. If collapsing field lists, disclose the omitted count and preserve the full schema alongside the view. Do not replace columns with generic labels that hide an important constraint. Destructive cascading can deserve emphasis when relevant, but emphasis is not restricted to one predetermined relationship.

Size rows for their labels and route edges behind table boxes. Exact row heights and port offsets are optional geometry. Compare the final diagram against the schema, including composite keys, nullable foreign keys, duplicate references, action semantics, and clipped field labels.

Reference layouts: [database schema](../../assets/example-db-schema.html), [full](../../assets/index.html#example-db-schema-full), [dark](../../assets/index.html#example-db-schema-dark).
