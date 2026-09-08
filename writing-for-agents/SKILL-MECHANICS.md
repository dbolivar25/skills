# Skill mechanics

Use this reference when packaging [agent instructions](SKILL.md) as a skill.
It covers module boundaries, invocation, host metadata and discovery. The
authoring method remains in the skill entry point.

## Design the capability

Give a skill a responsibility its caller can delegate. Its interface names the
purpose, essential inputs, usable result and relevant limits. Its implementation
hides the judgments, transformations or operational coordination needed to produce
that result. A long implementation or many dependencies do not establish depth.

Work from both ends: examine real jobs the user delegates, and identify the
reusable capabilities those jobs share. Walk a complete job through the proposed
interfaces, then use its supporting capabilities independently. If the caller
must sequence internal steps or reconcile all intermediate reports, the larger
skill has not taken responsibility for the job.

Use the [composition contract](../contracts/composition.md) to place judgment and
effects. Core skills reason over supplied context and may compose other cores.
Workflows own acquisition, feedback, effects and the integrated outcome. Platform
skills can hide a bounded operational responsibility within a larger workflow.
There is no required number of layers or one-to-one pairing of cores and workflows.

Extract a skill when another caller needs its distinct result or the user needs
to invoke that judgment independently. Keep coupled rules, examples and methods
together when separating them would make every caller rebuild their relationship.
Passive references can hold depth without adding another catalog entry.

Use `SKILL.md` as the normal interface for both direct use and composition.
Callers should not need a private file path to obtain the useful capability.
Describe supporting calls by the result needed and the condition for using it;
a dependency list is not a mandatory pipeline. The composing skill owns conflicting
assessments, missing inputs and the stopping condition for the combined work.

For an ad hoc request with a path or URL, the surrounding task acquires the
material and resolves a core's evidence needs. Do not make the user supply data
the agent can obtain, and do not add a generic wrapper skill solely to read and
write files. A dedicated workflow earns an interface when its method of acquiring,
coordinating or observing work is independently valuable.

## Invocation

Two choices, trading the two loads:

- A **model-invoked** skill is available for autonomous selection. Its description is the top-level invocation contract: state when the skill loads, why its distinct judgment or protection is needed, and only the nearest ambiguity boundary. The body explains what it does. Human invocation remains available. A discoverable description spends context in exchange for reach; shared reference can live here when several skills need this judgment.
- A **user-invoked** skill requires explicit selection. This spends cognitive load: the human must remember the skill or reach it through a router. Its description can be a human-facing one-line summary. Explicit selection is an authority policy, not a guarantee that its files or description are invisible to the host or to another skill.

Pick model-invocation when the agent must select the skill on its own. Pick user-invocation when the workflow should run only by explicit selection. Another skill may link to readable reference without gaining authority to start that workflow.

### Host configuration

Use the current host's supported metadata rather than assuming a universal frontmatter switch:

- For hosts supporting `disable-model-invocation`, set `disable-model-invocation: true` for explicit-only workflows.
- In Codex, set `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. This disables implicit invocation while keeping explicit `$skill-name` invocation available. Preserve unrelated metadata. The installed official skill-creator reference `references/openai_yaml.md` documents this setting.

Catalog visibility, automatic content injection, invocation permission, and physical file readability are separate mechanisms. Require supplied target-host evidence before claiming zero context load or inaccessible content. Do not infer Codex behavior from another host's frontmatter.

Shared reference needed by two explicit workflows can live in a plain file that both point to, or in a clearly named reference within one package. Choose its home by ownership and reliable reachability; reading that reference does not select its owner's workflow.

## Splitting by invocation

The invocation cut of splitting (the sequence cut lives in `SKILL.md`): split off a model-invoked skill when a distinct leading word or situation should trigger its own judgment — something you actually use in prompts — or another skill needs independently reachable judgment. The new discoverable description spends context, so independent reach has to be worth it.

## Router skills

When user-invoked skills multiply past what you can remember, use a **router skill**: one entry point that names the others and when to reach for each. The human has one skill to remember instead of many. The router can help select a workflow; its pointer does not override an explicit-only invocation policy. Carry forward a selection already authorized by the user's task rather than asking for the same selection again.
