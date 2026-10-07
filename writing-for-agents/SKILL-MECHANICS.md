# Skill mechanics

Read this reference when packaging [agent instructions](SKILL.md) as a skill, selecting invocation metadata or distributing the package. It covers interfaces, host mechanics and reachability. The detailed authoring method is [instruction design](references/instruction-design.md).

## Package the job the instruction owns

Use [instruction design](references/instruction-design.md) when deciding responsibility, trigger, demand, information hierarchy or completion. Packaging exposes that job to its intended host; it cannot repair a shallow job or supply new task authority.

For direct use, `SKILL.md` is the normal interface. A caller can point to a supporting method without selecting the owner's whole job when it names the condition, governed decision and contribution. Required material must load before that decision. A dependency list is not a compulsory pipeline, and reading an explicit-only package does not authorize invoking its workflow.

## Choose invocation deliberately

A model-invoked skill is available for autonomous selection. Its description is the top-level trigger: the observable situation, distinct job or protection, and nearest ambiguity boundary. Keep the operating method in the body. Human invocation remains available. A discoverable description spends context in exchange for reach.

A user-invoked skill requires explicit selection. This spends cognitive load because the person must remember it or reach it through a known navigation path. Explicit selection is an authority policy; it does not guarantee that the description or files are invisible or unreadable. A reference may be read without gaining authority to start an explicit-only workflow.

Choose autonomous selection when the agent must recognize the job itself. Choose explicit selection for a workflow that should run only when selected. A description or another skill's pointer cannot override invocation policy. Preserve a selection already authorized by the user's request rather than asking for it again.

## Use actual target-host metadata

Host switches differ. Use the supported mechanism for the target host and preserve unrelated metadata:

- Hosts that support `disable-model-invocation` can use `disable-model-invocation: true` for explicit-only skills. Do not assume this switch controls Codex.
- In Codex, `agents/openai.yaml` supports `policy.allow_implicit_invocation: false`. The target host's installed `skill-creator/references/openai_yaml.md` documents that false prevents default content injection while explicit `$skill-name` invocation remains available. Its default is true.

For example, when the task actually selects an explicit-only Codex package:

```yaml
policy:
  allow_implicit_invocation: false
```

Codex's `agents/openai.yaml` also carries machine-facing interface metadata and declared MCP tool dependencies. The installed official reference specifies quoted string values, UI display fields and a `default_prompt` that explicitly mentions `$skill-name`. Locate and read that official reference in the current environment when changing metadata; the 2026-10-06 installed version confirms these fields. Verify future field support there rather than copying configuration from a different host or inventing unsupported frontmatter. Changing a description does not silently change invocation authority.

Keep these mechanisms separate:

| Mechanism | What evidence it needs |
| --- | --- |
| Catalog visibility | Whether the target host lists the entry or description |
| Content injection | Which body or other material is actually placed in model context |
| Invocation permission | Whether implicit and explicit selection are allowed |
| File readability | Whether an actor can read package files through available tools |
| Runtime availability | Whether the needed scripts, libraries, tools or services can execute |

Supported metadata establishes its documented policy. Require target-host observations before claiming zero context load, an inaccessible file, effective selection or a reloaded catalog. Do not infer one mechanism from another.

## Package the reachable method

Keep one top-level `SKILL.md` per skill package. Use ordinary Markdown for supporting methods, examples and references, with stable relative paths and no nested skill entrypoints. Every named installed reference must exist. Include required licenses/notices with substantial copied material.

A file pointer must survive the actual distribution boundary. Relative links within one package normally travel with it; a sibling-package link requires that package in the installed suite. If publishing separately, either include the needed passive method under a clear owner, declare and verify the real dependency mechanism, or change the package boundary. Do not assume another separately published skill exists because it is present locally.

Check the actual host's accepted frontmatter, names and limits; YAML fields; asset paths; script imports and runtime; external tool dependencies; and every link or prose pointer. Scripts help with deterministic validation, but validators have bounded coverage. Broken links, invalid YAML, absent assets and unavailable runtimes are packaging defects. A valid artifact does not establish behavior or another host's reload.

## Distinguish packaging proof from behavioral evidence

Test relevant explicit invocation, autonomous positive triggers when enabled, negative prompts, neighboring-skill collisions and conditional reference reachability. Retain what the host actually loaded or invoked and what the agent did with it. A smoke test may establish that an explicit skill can load; it cannot establish improved quality across its jobs.

For consequential redesign, compare representative tasks with independent judgments using [evaluation](../evaluation/references/evals-and-ablations.md). Preserve failures where a demand was weakened, a method became unreachable or context was lost. Treat packaging, invocation, execution, output quality and distribution/reload as separate receipts. Finish the requested edit or proposal with the actual evidence and remaining limits.

Source: retains the personal Writing for Agents skill-mechanics method. Codex metadata details were checked against the installed official skill-creator reference during consolidation; verify again when the host changes.
