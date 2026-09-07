---
name: tech-spec
description: Specify a selected software change as typed contracts and complete end-to-end flows.
disable-model-invocation: true
---

# Typed architecture specification

Run only when explicitly selected. Read the [core](core.md) and output contract.
Acquire current code, governing docs, domain language, adapters, runtime behavior
and test conventions for the selected problem. No preliminary architecture scan
is required and a completed scan does not automatically select this workflow.

Apply the core. Resolve its discoverable context gaps through reads. Use grilling
for unresolved owner decisions, retaining settled answers and only persisting
language/ADRs when that documentation is in scope. Supply the resolved context
back to the core before presenting invented completeness.

If independent alternative designs are selected, use module-design's exploration
shell and pass the resulting briefs to the core. The core still owns one complete
typed coverage map and handoff, including vertical RGR verification planning.

Return the spec inline or write the requested file. Recheck its coverage against
the core's full obligations; do not omit hard contracts or execution paths to make
it look finished. Stop at design unless implementation was separately requested;
a specification is not an execution or test receipt.
