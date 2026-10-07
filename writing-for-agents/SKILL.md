---
name: writing-for-agents
description: Use when creating or changing instructions an agent will execute. Make the trigger, required behavior, context pointers, and completion conditions precise; preserve the demand and verify packaging and reachability. Shorter wording alone does not prove better behavior.
---

# Writing for Agents

Own an executable instruction interface, not just polished prose. Recover the actual task, intended actor, required result, host, authority, and failure examples. For an edit, identify the behavior that must change and the demands that must survive.

## Design from real jobs

Read [the instruction-design method](references/instruction-design.md) for a new interface or a substantial change to triggers, demands, hierarchy, context pointers or completion. It preserves the full authoring method and examples; a narrow edit can use the relevant decisions.

Give the instruction a distinct responsibility and usable result. Work through complete user jobs before splitting it into supporting abstractions. Keep tightly coupled knowledge in private methods; add a public skill only when its independent job or result earns the selection burden.

Expose the trigger and nearest ambiguity boundary in the description. Use the body for a short operating method, consequential limits, and observable completion. The interface should carry the complete job so its caller can use the result without reconstructing internal steps or reconciling a collection of judgment packets.

## Put information where it is needed

Keep always-applicable relationship and workspace rules in AGENTS. Put reusable selected methods in Skills, exact tool mechanics in references or scripts, private brand/domain knowledge with its owner, and historical examples in recoverable references.

Use conditional pointers for depth: the reader should know when the reference is necessary and what it contributes. Preserve real teaching examples, exceptions, and failure distinctions; compressing them to slogans may remove the skill's value. Remove redundant envelopes and compulsory sections that do not help the next action.

Do not cache live product contracts or host tool instructions when the authoritative source can be reached. Use current host-supported metadata for discovery and explicit invocation. Catalog visibility, readable files, content injection, and invocation permission are separate mechanisms.

## Verify demands and behavior separately

Read [skill mechanics](SKILL-MECHANICS.md) when packaging or choosing invocation metadata. Check names, metadata, links, assets, script runtimes, dependency reachability, and distribution in the actual target host. A reference path must survive packaging; do not assume another separately published skill exists.

Test meaningful positive, negative, and collision cases. Structural validation establishes packaging, not model selection or effective execution. For consequential redesign, compare representative tasks with independent judgments and preserve regressions and context-loss evidence.

Finish with a usable instruction or reviewable proposal, exact retained and removed demands, verified mechanics, and the real limits of behavioral evidence. A shorter entry is a design choice, not proof of better work.
