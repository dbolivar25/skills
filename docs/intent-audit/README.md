# Skill suite: intent before refactoring

This is a fresh investigation from `abd276763cd80ceed29c29d1f4331e4173709744` on `daniel/skill-suite-intent-audit`. The superseded attempt is preserved on `daniel/skill-suite-refactor` at `61e55d7`; its proposed topology and dispositions are not inputs to this investigation. The investigation restarted from original shared skill files. Scope is only this repository; pet skills and external installations are excluded.

## Owner intent

Find the best shape for the whole suite by recovering what its skills are trying to accomplish and separating accidental from essential complexity. Details can express the intended behavior, make it happen, teach a distinction, preserve a constraint, or merely reflect a historical representation. Length, specificity, repetition, and procedural form do not determine their value.

The original text is evidence of intent. It can also express that intent poorly, contain an ineffective method, or combine conflicting intentions. Preserve the owner's current constraints and use original source, relevant history, consumers, scripts/tests, and concrete task examples to understand the rest. Do not presume that all original wording is essential or that an obvious-looking instruction is redundant.

## Investigation

For each skill, establish the problem it addresses and what it should change in the agent's noticing, judgment, action, or proof. Trace the specific details that produce that effect. Distinguish direct owner/source evidence from inference; retain uncertainty where the purpose or effectiveness is unresolved.

Examine a detail by asking what would fail or become harder if it disappeared, and whether another representation could carry the same function better. A claim of model redundancy needs a relevant with/without comparison. A factual implementation claim needs evidence from the actual environment. A policy or taste decision belongs to the owner; do not silently turn it into a prose cleanup.

Only after individual intent is understood should the suite's overlaps and boundaries be judged. Similar wording can serve different purposes; distinct skills can carry the same responsibility. Merging, splitting, relocation, rewriting, retention, and retirement remain open possibilities. There is no target skill count or word reduction.

Outputs of this investigation are working explanations and evidence, not a universal template to install in every skill. Before implementation, make the proposed changes and preserved intent concrete enough for the owner to judge. During implementation, check original-to-new preservation and realistic artifacts, including relevant combinations of skills.

## Evidence and delivery

- [Source inventory](inventory.json): baseline paths and hashes.
- [Suite intent](suite-intent.md): per-skill purpose and essential details.
- [Authoring intent](writing-for-agents.md) and [architecture investigation](architecture-and-discovery.md): deeper source/history maps.
- [Consolidation design](consolidation.md): current owners, branches, and preservation requirements.
- [Ownership map](ownership-map.md): where the original functions live.
- [Paired probes](probes/comparison.md): original and consolidated task responses.
- [Earlier maintenance proposal](proposal.md): superseded after owner feedback.
- [Results](results.md): final dispositions, preservation checks, and observed evidence.
- [Restart receipt](restart.json): source branch recovery.

The creative pair remains outside redesign scope. No pet skill, built-in package,
plugin-managed package, app-managed package, or external installation is part of
this delivery.
