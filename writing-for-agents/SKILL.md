---
name: writing-for-agents
description: Use when creating or editing skills, AGENTS.md, CLAUDE.md, or another document that directs an agent. Load it to design invocation, context pointers, information hierarchy, and completion criteria for predictable behavior.
---

# Writing for agents

Write for a predictable **process**, not identical outputs. The target is the
**smallest honest instruction set**: remove accidental complexity while carrying
the real judgment, posture, constraints, and detail the agent needs. A shorter
instruction that loses the reason for the work is a worse instruction.

Make the following authoring decisions against the actual task. They are lenses
for writing and review, not a required outline to impose on every document.
For skill packaging, also read [skill mechanics](SKILL-MECHANICS.md).

## 1. Decide what must change in the run

Name what the instruction should make the agent notice, judge, do, or prove that
it would otherwise miss. Preserve details that produce that effect: a teaching
example, an exact exclusion, a stopping condition, or a way of investigating can
be part of the intent. Do not classify detail as accidental merely because it
looks procedural or specific.

A **no-op** does not change behavior compared with the model's default. That is
a model-relative claim, not a judgment that a sentence sounds obvious to a human.
Test a suspected no-op on relevant runs with and without it. If it changes
nothing, remove the whole instruction instead of polishing its words. If it is
too weak, sharpen the demanded behavior; a synonym is not a stronger demand.

## 2. Make the material reachable at the right moment

A **context pointer** names out-of-context material and the condition for reading
it. Skill descriptions and `AGENTS.md` links are the same kind of object. The
pointer's wording controls whether the target is reached. An essential reference
behind a weak pointer is a reachability defect: sharpen the pointer before
inlining its target. If sharpening still fails in relevant runs, bring the
needed material into the active context.

A model-facing pointer is an **invocation contract**:

> Use when **[observable situation]**. Load it to **[distinct judgment,
> protection, or authority]**. **[Nearest ambiguity boundary, if needed.]**

State when it must load and why default context is insufficient. “Ensure quality”
does not explain a missing behavior. Front-load the useful leading word. Give
each genuinely distinct branch a trigger; collapse synonyms that merely rename
one branch. Keep identity, procedure, and phrases that do not affect selection
in the target rather than the pointer.

Reachability spends two different loads:

- **Context load:** descriptions, instructions, and other material present in
  context whether needed or not. An always-loaded pointer pays on every turn.
- **Cognitive load:** the human remembering what exists and choosing when to use
  it. This can be the appropriate price of human agency; do not optimize it away
  where the owner should choose.

Disclosed material trades its full load for a pointer. Material with no pointer
relies on human discovery. Host behavior determines the actual load and invocation
mechanics; the packaging reference distinguishes those mechanisms from policy.

## 3. Organize by when knowledge is needed

The **information hierarchy** has three useful positions: in-file steps, in-file
reference, and disclosed reference. A document may be a recipe, a flat set of
peer rules, or a mixture. A flat reference is not inherently disorganized.

Use **progressive disclosure** by branch: keep what every branch needs in the
common path and put narrower methods behind explicit pointers. Before moving
material, ask whether its absence would fail the run, change the posture, or erase
the document's purpose. Such material must remain in the main path or behind a
pointer that reliably loads it before the governed decision. Hiding knowledge
behind an optional “more detail” link does not preserve a required method.

Use **co-location** within that hierarchy. Keep a concept's definition, rules,
examples, and caveats together. Scattering fragments one meaning; duplication
repeats it. Repair the correct problem rather than deleting a caveat as redundant.

**Sprawl** can exist even when every line is live and unique. Disclose by branch
or sequence so each path carries what it needs; deleting essential content is not
the cure. In a procedural document, long reference detours can bury the next
operation. In a reference document, peer rules may rightly stay together.

Split a sequence only for a demonstrated sequence problem. Later steps can pull
attention toward finishing before the current work is complete. First sharpen
the stopping condition. If it remains irreducibly fuzzy and runs still rush,
hide later work across a real context boundary, such as a handoff or subagent
dispatch. Moving text to another file or calling it inline does not clear an
already-loaded context. Splitting by independent invocation is a separate choice
covered in skill mechanics.

## 4. Write instructions that carry judgment and demand

A **completion criterion** tells the agent when enough work has been done. It has
two independent qualities:

- **Clarity:** “every modified model accounted for” can be checked;
  “understanding reached” cannot reliably distinguish done from unfinished.
- **Demand:** “produce a change list” can end after shallow inspection;
  “account for every modified model” requires the legwork to discover omissions.

Strong criteria are checkable and exhaustive over the intended scope. Demand is
not confined to numbered steps: “apply every rule” can govern a flat reference.
Keep that internal investigation obligation even when the final answer is short.

Use **leading words** as stable handles for larger concepts. Familiar terms such
as *lesson*, *fog of war*, or *tracer bullet* can recruit useful associations.
A coined term can work when defined clearly, but its meaning is not free. Keep
the handle consistent in pointers, prompts, documents, and code so it helps both
selection and execution. Define the judgment once; repeat the handle, not its
full explanation everywhere.

- “Fast, deterministic, low-overhead” can become a **tight** loop.
- “A loop you believe in” should become **red** when the actual gate is an
  observable failure on the bug. This sharpens the condition, not just the prose.

Test whether a handle carries the necessary distinctions. A compact word is not
a substitute for a definition the model lacks. Prefer positive target behavior
when it fully expresses the rule, but retain exact prohibitions, authority
boundaries, and failure conditions. Pair a prohibition with the permitted action
where useful. Do not weaken a real constraint to avoid mentioning it.

## 5. Give each meaning one owner

Keep one authoritative explanation of each rule. Repeat a small gate where an
isolated consumer needs it, but do not make several workflows independently own
the same method. A caller should name the required result and reliably reach the
owner's instructions. Consolidate duplicated methods; do not merely hide copies
in references.

The environment is also a source of truth. A document that repeats `package.json`,
configuration, directory layout, or `--help` output is a **cache**. Keep it only
when lookup cost or an otherwise invisible convention justifies it. Preserve the
reason, unwritten rule, or gotcha that the environment cannot explain.

Use scripts for fragile deterministic work—validation, parsing, formatting,
generation, or repeatable assembly. Leave taste, diagnosis, and tradeoffs with
the agent. Automation can remove mechanical variance; it cannot make an
unjustified judgment true.

Finish by checking relevance and behavior. Remove **sediment**: stale facts,
unrelated exposition, and branches that no longer serve the task. Compare the
revision with the original intent on representative cases, especially where
something was merged, disclosed, or removed. Verify needed references are reached
and real constraints survive. Do not declare a no-op or an improvement from word
count alone.

When a consequential instruction change needs behavioral evidence, use
[evaluation-design](../evaluation-design/SKILL.md) with the behavior it should
change, representative caller tasks and failure consequences. Apply the returned
comparison plan within the task's authority; a valid description or a shorter
file does not establish better agent behavior.
