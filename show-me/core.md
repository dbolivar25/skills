# Show me core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Question to explain, established source relationship and uncertainty, domain labels/data, audience and any existing product visual grammar.

Choose the smallest representation that makes the requested relationship clear.
Apply [visual forms](references/visual-forms.md): pseudocode for logic, call trees
for control, component/file trees for ownership, diffs for a known changed shape,
Mermaid for interaction and focused HTML for relationships that need interaction.

Keep real labels, relevant states, ownership and order. Retain context whose
omission would change the explanation. Example data stays labeled. A proposed
visual is not evidence that its source relation is true; return a specific source
need when that relation is unestablished.

Return the diagram, sketch or artifact specification with the inference it
supports and its limits. If learning requires trying an unsettled model, return
that experiment need to the shell rather than invoking a prototype workflow.
An interactive explanation of a known result remains an explanation.

When rendered evidence is supplied, check legibility, source accuracy and the
relationship it reveals. Without a render, distinguish a proposed artifact from
one observed working. File creation, rendering and opening belong to the shell.
