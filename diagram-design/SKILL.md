---
name: diagram-design
description: Use for standalone, imported, exportable, or source-sensitive diagrams and charts that need specialist representation or fidelity work. Choose a form that preserves the source meaning and verify the intended artifact. Ordinary conversational explanations can use the host's visualization capability directly.
---

# Diagram Design

Own an accurate, readable visual artifact when specialist diagram work is needed. Identify what the reader needs to see, the source and certainty of the relationship, the important distinctions, and the intended artifact. If the relationship itself is unresolved, obtain the appropriate investigation before drawing it as established fact. For an ordinary inline explanation, use the current host visualization capability directly; this skill need not wrap it.

## Choose the representation

Select by semantics, not a favored visual style:

- Structure and responsibility: topology, hierarchy, ownership, layers, or decomposition.
- Sequence, transition, and movement: flow, state, sequence, causal hypothesis, or Sankey.
- Time, work, and experience: timeline, Gantt, journey, story map, or Kanban.
- Quantities and distributions: appropriate charts with real axes, units, denominators, and uncertainty.
- Overlap, containment, and position: sets, nesting, matrix, Venn, spatial or strategic maps.
- Import/export: preserve the source model and destination's real format obligations.

Use `references/representation-selector.md` and the selected recipe under `references/types/`, including useful less-common forms. Resolve consequential fidelity, audience, and destination choices with `references/output-spec.md` before drawing. No arbitrary type cap should force a relationship into the wrong structure. For scientific or publication figures, use standard plotting tools. Small static software graphs may use Mermaid. For an import, read `references/imports.md` before changing the source model; for a brand skin, select `references/skins.md` and the actual brand's rules.

## Make meaning visible

Preserve direction, identity, uncertainty, source/provenance, temporal boundaries, and meaningful absences. Unknown is distinct from false, denied, or zero. A layout must not imply causation, chronology, exclusivity, permission, or completeness the source does not support.

Use hierarchy, alignment, labels, grouping, and restrained emphasis to make the relationship legible. Apply the selected brand skin when relevant. Motion or controls should clarify a real relationship or comparison; they should not hide important information or add arbitrary interactivity.

For conversational interactive explanations, read and use the current host's visualization capability. For a standalone shared artifact, use the selected HTML, SVG, PNG, plotting, or source-diagram method. Preserve accessible text, keyboard interaction where applicable, reduced motion, and honest behavior.

## Verify the intended output

Read `references/export.md` and `references/verification.md` for the selected output. Inspect the rendered artifact, important states, labels, collisions, bounds, readability, and semantic fidelity. Check actual export dimensions, fonts, scaling, and destination rendering. A parser or self-check can establish only its inspected conditions.

Finish with the usable visual and source where appropriate, its material source or uncertainty, and exact export or interaction limits. Do not turn a visual request into a compulsory research or UI-prototype workflow.
