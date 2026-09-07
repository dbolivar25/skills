# Skill mechanics

The skill-specific branch of [`writing-for-agents`](SKILL.md): what changes when the document is a skill — metadata, the invocation choice, and router skills. Everything else about writing it is the universal reference in `SKILL.md`.

## Invocation

Two choices, trading the two loads:

- A **model-invoked** skill is available for autonomous selection. Its description is the top-level invocation contract: state when the skill loads, why its distinct judgment or protection is needed, and only the nearest ambiguity boundary. The body explains what it does. Human invocation remains available. A discoverable description spends context in exchange for reach; shared reference can live here when several skills need this judgment.
- A **user-invoked** skill requires explicit selection. This spends cognitive load: the human must remember the skill or reach it through a router. Its description can be a human-facing one-line summary. Explicit selection is an authority policy, not a guarantee that its files or description are invisible to the host or to another skill.

Pick model-invocation when the agent must select the skill on its own. Pick user-invocation when the workflow should run only by explicit selection. Another skill may link to readable reference without gaining authority to start that workflow.

### Host configuration

Use the current host's supported metadata rather than assuming a universal frontmatter switch:

- For hosts supporting `disable-model-invocation`, set `disable-model-invocation: true` for explicit-only workflows.
- In Codex, set `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. This disables implicit invocation while keeping explicit `$skill-name` invocation available. Preserve unrelated metadata. The installed official skill-creator reference `references/openai_yaml.md` documents this setting.

Catalog visibility, automatic content injection, invocation permission, and physical file readability are separate mechanisms. Verify the target host before claiming zero context load or inaccessible content. Do not infer Codex behavior from another host's frontmatter.

Shared reference needed by two explicit workflows can live in a plain file that both point to, or in a clearly named reference within one package. Choose its home by ownership and reliable reachability; reading that reference does not select its owner's workflow.

## Splitting by invocation

The invocation cut of splitting (the sequence cut lives in `SKILL.md`): split off a model-invoked skill when a distinct leading word or situation should trigger its own judgment — something you actually use in prompts — or another skill needs independently reachable judgment. The new discoverable description spends context, so independent reach has to be worth it.

## Router skills

When user-invoked skills multiply past what you can remember, use a **router skill**: one entry point that names the others and when to reach for each. The human has one skill to remember instead of many. The router can help select a workflow; its pointer does not override an explicit-only invocation policy. Carry forward a selection already authorized by the user's task rather than asking for the same selection again.
