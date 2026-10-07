# Entity relationships

Use this for domain entities and their relationships. A physical table/column map belongs in [database schema](db-schema.md).

Name entities and relationships from the domain source. Put cardinality and optionality at the correct endpoints: minimum participation and maximum participation are separate claims. Preserve a relationship's name, direction where meaningful, and any associative entity needed for a many-to-many relationship. Do not invent cardinality when the source only says that two entities are related.

Attributes are useful when they establish identity or explain the relationship, but implementation field lists can obscure a conceptual view. If the source is a physical schema, disclose which conceptual conclusions were inferred from keys and constraints.

Choose a consistent notation, such as crow's foot, and include a legend for symbols the audience may not know. Lay out for endpoint readability; moving a relationship label must not make it appear attached to another edge.

Check identity, cardinality, optionality, and relationship labels against the source. Include unknowns and exceptions that change the domain interpretation.

Reference layouts: [ER](../../assets/example-er.html), [full](../../assets/index.html#example-er-full), [dark](../../assets/index.html#example-er-dark).
