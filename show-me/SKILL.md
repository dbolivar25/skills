---
name: show-me
description: Use when the user asks for a visual explanation or interactive demonstration of an established relationship, or a material relationship is hard to understand in prose. Load it to choose the smallest visible explanation grounded in the actual source.
---

# Explain a relationship visually

Own the path from an established relationship to a visible explanation. Acquire the
source, choose a useful representation, construct the requested artifact and inspect it
when rendering is involved. Use the
[composition contract](../contracts/composition.md#operational-callers) .

Establish the question, audience, real labels/data and relevant product grammar.
Preserve the requested scope: “show me the PR URL” can be ordinary retrieval. Use
[understand-change](../understand-change/SKILL.md) when the explanation needs a grounded
map; obtain the sources it needs rather than relying on author prose.

Choose the smallest useful form from [visual forms](references/visual-forms.md) :
pseudocode for logic, call trees for control, trees for ownership, diffs for a known
changed shape, Mermaid for interaction, and focused HTML for relationships that benefit
from interaction. Keep states, ownership, order and context whose omission would change
the explanation. Label example data and inferences.

If the relationship is unsettled, obtain the missing source evidence. When the answer
requires an experiment, delegate the question and constraints to
[prototype](../prototype/SKILL.md) , then use its observed learning if an explanation is
still needed. An interactive explanation of a known algorithm does not inherit prototype
shortcuts.

Deliver inline diagrams directly. For a requested or useful HTML artifact, write one
focused file, inspect its rendering and open it through the host's viewer. Use the
product's grammar; apply [Augment design](../augment-design/SKILL.md) when its identity
governs the artifact, including its production checks. Check legibility, source accuracy
and the relationship revealed. Report unavailable rendering instead of claiming the
artifact was exercised.

Keep the visual next to the point it explains and prose brief. Return the explanation,
artifact when applicable, and material limits. Explanation does not expand the task into
product redesign or production changes.
