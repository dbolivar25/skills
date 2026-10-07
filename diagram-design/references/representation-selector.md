# Representation selector

When behavior, state, enforcement, or risk carries the meaning, first load [`semantic-patterns.md`](semantic-patterns.md) and choose one primary pattern. Then choose the nearest visual type for layout. If no pattern matches, choose the type directly.

| Behavioral trigger | Semantic pattern → nearest type |
|---|---|
| Fan-in, queue depth, finite capacity, bottleneck | **Fan-in queue / bottleneck** → Data flow |
| Repeated Question / Input / Governance / Output slots across stages | **Stage framework with semantic slots** → Process |
| Conversation or loose input becomes a structured durable artifact | **Unstructured input → structured artifact** → Data flow |
| Two rule traces need pass/fail/skipped/not-reached and first divergence | **Paired policy-evaluation traces** → Flowchart |
| Trust boundaries plus permitted/forbidden ingress or deploy paths | **Secure paved road** → Architecture |
| Controls grouped by where they are enforced | **Governance / control catalog** → Layer stack |
| Defenses compensate for prior gaps and residual risk propagates | **Compensating security layers** → Layer stack |
| Hierarchical, ID-addressable decomposition needing per-block I/O, constraints, and a code link | **Traceable block decomposition** → Tree |

The pattern preserves semantic distinctions; the recipe supplies an adaptable layout. Its numeric budgets are readability guidance, not a quota that justifies dropping source meaning. Use [`animation.md`](animation.md) only when motion is requested or materially clarifies ordered change; static remains the default.

## Representation recipes

| If you're showing… | Use | Reference |
|---|---|---|
| Components + connections in a system | **Architecture** | [types/architecture.md](types/architecture.md) |
| Legacy IT landscape grouped by phase/department; documents the *before* state in modernization proposals | **IT current-state** | [types/it-state.md](types/it-state.md) |
| Decision logic with branches | **Flowchart** | [types/flowchart.md](types/flowchart.md) |
| Time-ordered messages between actors | **Sequence** | [types/sequence.md](types/sequence.md) |
| States + transitions + guards | **State machine** | [types/state.md](types/state.md) |
| Entities + fields + relationships | **ER / data model** | [types/er.md](types/er.md) |
| Events positioned in time | **Timeline** | [types/timeline.md](types/timeline.md) |
| Cross-functional process with handoffs | **Swimlane** | [types/swimlane.md](types/swimlane.md) |
| Two-axis positioning / prioritization | **Quadrant** | [types/quadrant.md](types/quadrant.md) |
| Multiple entities scored across 3–5 quantitative criteria | **Radar / Spider** | [types/radar.md](types/radar.md) |
| One quantitative series across cyclic categories; angle=category, radius=magnitude | **Polar chart** | [types/polar.md](types/polar.md) |
| Reinforcing cycle / flywheel where the last step feeds the first and a shared hub accumulates state | **Loop** | [types/loop.md](types/loop.md) |
| Hierarchy through containment / scope | **Nested** | [types/nested.md](types/nested.md) |
| Parent → children relationships | **Tree** | [types/tree.md](types/tree.md) |
| Human/agent/team ownership, reporting, routing, escalation | **Org chart** | [types/org-chart.md](types/org-chart.md) |
| Stacked abstraction levels | **Layer stack** | [types/layers.md](types/layers.md) |
| Overlap between sets | **Venn** | [types/venn.md](types/venn.md) |
| Ranked hierarchy or conversion drop-off | **Pyramid / funnel** | [types/pyramid.md](types/pyramid.md) |
| Quantitative comparison across categories | **Bar chart** | [types/bar.md](types/bar.md) |
| A start total bridged to an end total by signed contributions (budget bridge, headcount deltas) | **Waterfall** | [types/waterfall.md](types/waterfall.md) |
| Part-of-whole where the relative sizes are the story | **Treemap** | [types/treemap.md](types/treemap.md) |
| Continuous trends over time, change between exactly two states (slopegraph), one distribution per series (ridgeline), or rank movement across several snapshots (bump) | **Line chart** | [types/line.md](types/line.md) |
| Tasks and phases on a timeline | **Gantt** | [types/gantt.md](types/gantt.md) |
| Distribution and correlation between two variables, three with area-sized marks (bubble), or one variable with a dot per item (beeswarm) | **Scatter plot** | [types/scatter.md](types/scatter.md) |
| End-to-end data stack on a container cluster | **High-Level** | [types/high-level.md](types/high-level.md) |
| Multi-actor sequential process with data handoffs | **Process** | [types/process.md](types/process.md) |
| Multi-tier data storage with quality levels and access policies | **Storage tiers** | [types/storage-tiers.md](types/storage-tiers.md) |
| Role-scoped data flow: who does what at each pipeline step | **Data flow** | [types/data-flow.md](types/data-flow.md) |
| Integration topology of a data platform — sources → core → consumers | **Integration topology** | [types/integration-topology.md](types/integration-topology.md) |
| Per-role / per-component access permissions matrix | **Permission matrix** | [types/permission-matrix.md](types/permission-matrix.md) |
| A quantity splitting and merging across stages, band width = amount | **Sankey** | [types/sankey.md](types/sankey.md) |
| Causes of one observed effect, grouped by category (root-cause analysis) | **Fishbone** | [types/fishbone.md](types/fishbone.md) |
| Value chain against evolution — what to build, buy, and what is moving | **Wardley map** | [types/wardley.md](types/wardley.md) |
| Work-in-progress by state, with WIP limits and blocked items | **Kanban** | [types/kanban.md](types/kanban.md) |
| What a person does across stages of an experience, and how it feels | **User journey** | [types/journey.md](types/journey.md) |
| Where software runs — zones, hosts, artifacts, replicas, ports | **Deployment** | [types/deployment.md](types/deployment.md) |
| What depends on what, with fan-in and cycles a tree cannot express | **Dependency graph** | [types/dependency.md](types/dependency.md) |
| Classes with operations, inheritance, composition (other UML routes elsewhere) | **UML class** | [types/uml-class.md](types/uml-class.md) |
| Narrative backbone sliced into releases, with the cut line | **Story map** | [types/story-map.md](types/story-map.md) |
| Physical tables: SQL types, constraints, indexes, column-level FKs | **Database schema** | [types/db-schema.md](types/db-schema.md) |

Rules of thumb:

- If a 3-column table communicates the same thing, pick the table.
- If two types seem useful, pick the dominant axis; a semantic pattern may add behavior-specific primitives, not a second layout grammar.
- If density obscures relationships, split into an overview and linked detail, or select a form that holds the data honestly.

**Read the selected full recipe before drawing.** When routed above, also load `semantic-patterns.md`; when animation is chosen, load `animation.md`.


## Format follows the question

A tiny static software graph may use native Mermaid. A scientific or publication
figure should use a standard plotting tool, preserving data, units, scale, and
uncertainty in its plotting source. A handmade SVG is useful when its custom
semantics or layout earns the work; it is not a requirement for every shape.
Use native diagram source when editability or round-trip fidelity is the goal.
An HTML explanation is useful for interactions that reveal an actual comparison.
For ordinary inline explanations, use the host's visualization capability
without this specialist lifecycle.

The line recipe includes slopegraph, ridgeline, and bump variants; scatter
includes bubble and beeswarm; bar includes dumbbell. These remain full methods,
not names forced into a smaller catalog. A table or a form absent from this
index can be correct when it best preserves the relationship.
