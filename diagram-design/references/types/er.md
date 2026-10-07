> This is a retained, worked representation recipe. Its aesthetic values and
> count budgets describe the example treatment; adapt them to the actual data,
> reader, destination, and [selected skin](../skins.md). Preserve the semantic
> encoding and source distinctions. Publication figures may use plotting tools.
> The bundled [verification method](../verification.md) states actual helper coverage.

# ER / Data Model

**Best for:** conceptual and logical data models, API resource relationships, domain models — anything where the story is *entities and cardinality*.

**Not for the physical schema.** ER is entity-level: relationship lines join *boxes* and carry cardinality at each end. When the point is real tables with SQL types, constraint chips, indexes, and foreign keys that anchor **column to column**, use [`db-schema.md`](db-schema.md) instead.

## Layout conventions
- Each entity is a two-section box:
  - **Header**: type tag (`ENTITY`) + entity name in Geist.
  - **Body**: field list in Geist Mono, one per line. PK prefixed with `#`, FK prefixed with `→`.
- Relationships: lines between entities with cardinality at each end:
  - `1`, `N`, `0..1`, `1..*` in Geist Mono, 8px, placed 10–12px from the entity edge.
  - Optional relationship label ("has", "belongs to") centered on the line.
- Group related entities close; lay out so most relationships are straight lines, not tangles.
- Coral on the aggregate root or central entity of the model.

## Anti-patterns
- Drawing an arrow for every FK on a model with dozens — lay out by cluster instead.
- Inconsistent cardinality notation between ends of the same relationship.
- Fields padded to equal-height boxes — natural height by content is fine.

## Examples
- `../../assets/example-er.html` — minimal light
- `../../assets/example-er-dark.html` — minimal dark
- `../../assets/example-er-full.html` — full editorial
