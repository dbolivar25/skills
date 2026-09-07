---
name: information-preservation
description: Use when a summary, handoff, transformation, or intermediate representation may lose information needed downstream. Load it to identify consumer judgments, required fidelity, recoverability, and the losses that are actually permissible.
---

# Information preservation

Read the [core](core.md) and its dimension/fidelity method. Establish whether the
request designs a future transformation or assesses an actual one. Collect the
consumer judgments and constraints. For assessment, acquire both source and
candidate at identified versions; pointers alone do not establish preservation.

Apply the core. Recover a missing source or consumer contract through available
reads when it could change the result. Ask for the consumer's decision only when
its required judgment cannot be learned from the task or system. Keep access and
source-recovery limits visible rather than silently lowering required fidelity.

Return a preservation contract or evidence-backed losses with affected consumers.
When a rewrite or handoff artifact is also authorized, apply the contract and
check the resulting representation against it. Do not persist or publish solely
because the preservation judgment is favorable.
