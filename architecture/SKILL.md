---
name: architecture
description: Scan for evidence-backed ownership moves or specify a selected change as typed contracts and end-to-end flows.
disable-model-invocation: true
---

# Architecture

Run only when explicitly selected. Choose the branch from what the user wants
to decide: **where architecture should change**, or **how a particular change
should work**. Reading this package's references does not select either workflow.

| Request and available context | Branch | Boundary |
| --- | --- | --- |
| Find or rank architectural improvements in a repository, area or concern | [Scan](branches/scan.md) | Read-only evidence and ownership moves; stop before final interface design or specification. |
| Produce a specification for a change whose problem and context are available | [Specify](branches/spec.md) | Compare alternatives and deliver typed contracts with complete affected flows; design only. No preliminary scan is required. |
| Produce a specification but problem, constraints, affected code, direction or acceptance criteria remain insufficient | [Specify: establish context](branches/spec.md#1-establish-the-design-problem) | Inspect discoverable facts, then use grilling for unresolved decisions; convert to spec once sufficient context exists. |

Use a selection already expressed in the task; do not ask the user to choose
again. A scan result does not select specification, and a specification does not
authorize implementation. After a scan candidate is selected, prepare its brief;
start specification only when the user's request also selects that work.

The shared engineering vocabulary, TypeScript law and testing evidence live in
[software-engineering](../software-engineering/SKILL.md). Read the references the
branch requires without starting its implementation workflows.
