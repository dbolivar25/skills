# Integration topology

Use when the question is which source and consumer surfaces connect to which
subsystem, across which boundary, and over what protocol. The reusable
sources → platform → consumers form does not itself imply time, processing
stages, trust, or permissions. A [data flow](data-flow.md) shows movement through
steps; a [permission matrix](permission-matrix.md) shows who can read/write.

## Input model

Give each component a stable ID, name, role, optional technical sublabel, and
zone. Model each edge explicitly: source ID, destination ID, relationship,
protocol, direction, boundary, and known/unknown state. Component identity and
connector meaning are separate; a component's brand color must not silently
recolor its relationships.

```yaml
sources:
  - { id: source-db, name: Operational database, role: source }
  - { id: files, name: Scheduled file drops, role: source }
platform:
  name: Analysis platform
  rows:
    - { kind: bar, id: query, name: Query service, role: query }
    - { kind: row, nodes: [
          { id: ingest, name: Ingest service },
          { id: store, name: Object storage },
          { id: notebook, name: Notebook runtime }
        ] }
    - { kind: bar, id: scheduler, name: Scheduler, role: scheduling }
consumers:
  - { id: reports, name: Reporting application }
  - { id: external-api, name: External API }
edges:
  - { from: files, to: ingest, protocol: SFTP, relation: supplies }
  - { from: source-db, to: query, protocol: SQL, relation: federated query }
  - { from: ingest, to: store, protocol: Object API, relation: writes }
  - { from: scheduler, to: ingest, relation: triggers }
  - { from: query, to: reports, protocol: JDBC, relation: serves }
shared_services:
  - { id: identity, name: Identity service, scope: [query, ingest, notebook],
      relation: authenticates, source: Configuration record }
```

These are illustrative components, not a prescribed technology stack. A missing
edge is unspecified unless the source establishes absence. Unknown protocol or
scope remains labeled unknown rather than filled from convention.

## Parametric layout recipe

A source column on the left, bounded subsystem in the middle, and consumer
column on the right makes integration surfaces independently traceable. Inside
the subsystem, a full-width `bar` can represent a shared service; a `row` holds
peer components. Position is a layout role, not a license to infer that every
bar triggers or serves every peer.

One inherited worked layout:

```text
canvas_width = 1200
side_top = 92; side_width = 160; side_height = 64; side_stride = 88
side_y(i) = side_top + i * side_stride
side_height_needed = max(336, max(n_sources, n_consumers) * side_stride - 24)
left_x = 40; right_x = 1000
zone_x = 260; zone_y = 72; zone_width = 696
zone_height >= side_height_needed
zone_padding = 16; row_height = 72; row_gap = 16
bar_height = 44  # Increase only when its content needs it.
node_width(n) = (zone_width - 2*zone_padding - (n-1)*16) / n
node_x(j) = zone_x + zone_padding + j*(node_width + 16)
bar_x = zone_x + zone_padding
bar_width = zone_width - 2*zone_padding
```

Allocate subsystem rows with a cursor: `y = first_row_top`; assign each row's
height, then increment `y += height + row_gap`. Enlarge the zone to contain the
last row and padding. Align the peer row with a useful source/consumer band when
that reduces routing conflicts. If aligning selected centers is clearer than
evenly spacing all peers, document the actual placement rather than claiming
strict formula reproducibility.

For N shared-service strips below the zone:

```text
shared_top = zone_y + zone_height + 52
shared_height = 56; shared_gap = 8
shared_y(k) = shared_top + k*(shared_height + shared_gap)
shared_bottom = shared_top + N*shared_height + max(0, N-1)*shared_gap
canvas_height >= shared_bottom + legend_space
trunk_x(k) = zone_center + (k - (N-1)/2) * 32
```

N=0 omits that region. These dimensions are examples; readability and source
fidelity decide actual density. Integration diagrams may legitimately carry
many distinct surfaces. Aggregate only genuinely equivalent endpoints, retaining
multiplicity and a fidelity note. Otherwise split data, identity, and
observability planes or overview/detail without erasing the distinct wires.

## Connectors and shared scope

Use independently traceable, directed relationships. For an orthogonal layout,
source exits right, consumer enters left, peer links use clear corridors, and
scheduler drops use their actual target attachment points. Fan multiple edges
at separate points and stagger routes; do not merge strokes into an unlabeled
bus. Label protocol plus relationship when one alone is ambiguous.

Distinguish data, federation, trigger, and identity relationships with labels
and line treatment. Those styles follow meaning, never a product name or an
arbitrary “focal endpoint” rule. Draw nodes after connectors when masking
endpoints, then inspect that arrowheads remain fully visible. See the reusable
[elbows and crossing hops](architecture.md) and [connector craft](../primitives.md).

A shared service connects to the whole zone only if its supported scope is the
whole zone. Identity, logging, secrets, backup, and audit are different effects;
label each actual relationship, never call all of them AUTH. If it applies to
selected components, connect to those components or identify the subset
explicitly. A shared placement or footer is not evidence of layer-wide scope.
A forbidden ingress terminates at the boundary; a possible but unverified path
must not look established.

Use only icon definitions needed by the diagram from the [primitive library](../primitive-icons.md).
Names and protocols must remain readable without recognizing an icon.

## Verify

Reconcile components, multiplicity, every edge direction/protocol, and trust or
shared-service scope with source records. Trace each wire from one endpoint to
the other at the intended display scale. Check crossings, distinct attach
points, marker visibility, zone labels, and legend meanings. Inspect light/dark
variants only when delivered; render symbols and labels so the topology remains
understandable without color. Use a different form if row ordering would imply
a false process or if the actual graph cannot be traced at the intended scale.
