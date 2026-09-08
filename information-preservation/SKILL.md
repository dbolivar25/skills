---
name: information-preservation
description: Use when a summary, handoff, transformation, or intermediate representation may lose information needed downstream. Load it to identify consumer judgments, required fidelity, recoverability, and the losses that are actually permissible.
---

# Information preservation

Use the [core contract](../contracts/composition.md#core-skills) .

**Inputs:** Source and proposed/actual representation, consumer judgments, scope,
recoverability and invalidation constraints; select contract design or actual loss
assessment.

Return a preservation contract and, when a candidate representation exists, concrete
losses or a supported assessment. Do not replace the consumer's purpose with a generic
idea of important information.

Read [dimensions and fidelity](references/dimensions.md) . Preserve its distinction
between exact values, recoverable pointers, classifications, aggregates, decayed
information and intentional dropping.

1. **Work backward from consumers.** Name each downstream judgment and the source
   details that could change it. Include rare high-consequence details,
   disagreement, scope and uncertainty. If consumer needs are unknown, expose
   the missing decision rather than claiming a universally useful summary.
2. **Choose fidelity by need.** For each live dimension state what must remain
   exact, what can be transformed and what may be recovered later. A pointer is
   sufficient only if the consumer can recover the required source before acting;
   account for permissions, availability and invalidation.
3. **Check the proposed loss.** Compare source and representation against those
   requirements. Probe counterexamples: conflicting stakeholders, ambiguous
   dates, changed scope, stale facts, and low-frequency decisive signals.
   Aggregate only when merge semantics preserve the required distinction.
4. **Return the contract.** Map consumer and judgment to dimension, required
   fidelity, representation, recovery path, invalidators and check. Identify
   forbidden losses, allowed losses and unresolved consumer requirements.

A design can return this contract before a transformation exists. A verification claim
requires supplied source and candidate content. Missing content returns an evidence need
identifying the consumer and dimension it prevents checking. The caller owns writing,
compression, persistence and publication; this module supplies their constraints and
loss assessment. Keep domain-specific examples instead of promoting local semantics into
universal truth.
