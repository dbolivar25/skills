# UML class diagrams

Use this for classes or interfaces, their attributes and operations, and their relationships. Use [ER](er.md) for domain entities, [database schema](db-schema.md) for physical tables, and [deployment](deployment.md) for runtime placement.

Preserve class identity, visibility, types, signatures, and stereotypes when supplied. Compartments can omit implementation detail only within an explicit scope. Unknown types or visibility are not guessed from naming conventions.

Follow the intended notation consistently. Generalization points toward the more general classifier with a hollow triangle. Realization uses a dashed relation with that triangle. Association, dependency, aggregation, and composition express different claims. A diamond sits at the owning whole end; composition implies a stronger ownership/lifecycle relation and must not be inferred merely from a database cascade. Association navigability and multiplicity are separate facts; absence of an arrow does not prove two-way navigation.

Include a legend for unfamiliar notation, but do not display unused relationship types just to fill a legend. Route relationships to the correct class or compartment, preserving endpoint symbols and labels.

Check declarations, relationship kinds, endpoint orientation, multiplicities, and ownership against the source model or code. Inspect long signatures, diamond and triangle placement, and exports at actual reading size. Consult official UML material when formal semantics determine the result.

Reference layouts: [UML class](../../assets/example-uml-class.html), [full](../../assets/example-uml-class-full.html), [dark](../../assets/example-uml-class-dark.html).
