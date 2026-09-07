# Writing-for-agents: initial intent map

Sources: the original [main document](../../writing-for-agents/SKILL.md) and [mechanics reference](../../writing-for-agents/SKILL-MECHANICS.md) at `abd2767`; the package's introduction in `2895660`; and its deliberate invocation-contract revision in `74f219e`. This is an interpretation of those sources, not a revised skill or a completed behavior evaluation.

## Intended change

The declared aim is predictable agent process while faithfully carrying the complexity the work requires. The skill teaches an author to control whether instructions are reached, how their concepts are organized, what work they demand, and what can be removed without losing behavior. Its “smallest honest instruction set” binds pruning to preservation.

The distinctive contribution is a set of causal design choices for agent instructions. It helps distinguish a missing instruction from a weak pointer, a vague stopping condition from an insufficient one, redundant content from badly placed content, and familiar wording from an instruction that actually changes model behavior.

## Details and their functions

| Source detail | What it contributes to the intent | What remains open |
| --- | --- | --- |
| Invocation contract: observable situation, needed judgment/protection, nearest ambiguity boundary | Gets the skill loaded at the right moment. `74f219e` deliberately revised both the description and the authoring rules in this direction. | Exact wording can be evaluated; the trigger role itself is explicit current owner intent. Capability-summary replacements are outside that intent. |
| Each distinct branch has a trigger; collapse synonym branches | Prevents accidental activation breadth while keeping distinct paths discoverable. | Whether a particular branch is genuinely distinct requires examples of its use. |
| Sharpen a weak pointer before inlining its target | Distinguishes a reachability defect from missing knowledge and avoids loading everything unnecessarily. | A pointer's practical reliability requires observed tasks, not just a plausible sentence. |
| Context load and cognitive load | Models costs to the agent and the owner separately. Choosing a method can remain part of human agency. | The desirable tradeoff depends on actual use and the owner's preferences. |
| Steps, in-file reference, disclosed reference | Determines when knowledge is available. A flat set of peer rules is a legitimate structure. | Placement must be assessed against a real branch's information needs. |
| Co-location | Keeps definitions, rules and caveats encountered together. It addresses scattering, which differs from duplication. | The right grouping can change without removing the distinctions. |
| Sprawl even when every line is live | Recognizes a representation problem that deletion alone cannot solve. | The meaningful cost depends on loaded context and observed attention, not word count alone. |
| Completion criteria: clarity and demand | Separates recognizing completion from doing enough work. “Produce a list” and “account for every affected model” require different investigation. | Whether every step needs an explicit written criterion, and how it is rendered, should be tested against the desired process. |
| Premature completion and sequence splitting | Supplies a diagnosis and a conditional intervention: sharpen the bound first, then investigate whether exposure to later work encourages rushing. | The behavioral explanation is a hypothesis to evaluate. Moving text into another file does not itself remove it from an existing context. |
| Leading words; `tight` and `red` examples | Gives complex judgment a reusable handle and connects execution vocabulary with invocation vocabulary. The examples teach different qualities of a feedback loop. | Claims about pretrained associations and reliability vary with model and task. That uncertainty does not make the conceptual-handle technique dispensable. |
| Positive instructions and limited prohibitions | Attempts to direct attention toward the intended action. | The universal claim about negation is stronger than the evidence presently established. Test effectiveness while preserving actual boundaries and their purpose. |
| Single source of truth; environment as source; sediment | Distinguishes enduring guidance from duplicated policy, readily discoverable facts and stale instructions. | A cached fact can still earn its cost when discovery is expensive; easy appearance is not evidence of cheap lookup. |
| Model-relative no-op test | Requires an actual behavioral baseline before declaring an instruction useless. Human obviousness is insufficient. | Representative comparisons must be chosen around the behavior the instruction claims to affect. |
| Scripts for fragile deterministic work | Moves repeatable mechanics into an executable substrate while retaining judgment in the document. | A script's existence does not establish that the encoded rule is correct or within task scope. |
| Invocation modes and router skills | Lets the author allocate discovery and method selection across agent and owner. | Metadata behavior and context-cost guarantees need host-specific verification; the conceptual choice and its implementation claims should be judged separately. |

## What this map establishes

The skill's detail is often its method: definitions, examples and distinctions enable different authoring decisions. The representation can be improved only after those functions are accounted for.

The history provides particularly strong evidence for the trigger contract: the earlier capability-led description was deliberately replaced, with an explanation that the description controls loading and the body explains the work. Other assertions, especially model behavior and host mechanics, currently have declared rationale rather than newly established effectiveness evidence.

## Next evidence before a rewrite proposal

Use concrete authoring cases that distinguish the concepts: an essential reference behind a weak pointer; an observable but shallow stopping condition; a long document containing unique useful material; overlapping trigger branches; a useful conceptual handle; and a candidate no-op. For each, determine the appropriate intervention and what evidence would show that it preserves the intended behavior. Trace consumers before changing any shared convention.

No detail is marked for deletion here merely because it is long, prescriptive or repeated. No unchanged original claim is marked proven merely because it is familiar. The eventual refactoring proposal should follow this investigation, rather than supply its conclusions in advance.
