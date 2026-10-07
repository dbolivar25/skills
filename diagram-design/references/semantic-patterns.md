# Semantic patterns

Choose a pattern when behavior, enforcement, provenance, or residual risk carries the meaning. The pattern supplies distinctions the diagram must preserve; the type supplies a suitable layout. A pattern is not a fixed node quota. A simple table can be the best representation. For a complex source, preserve scope through linked views rather than dropping essential behavior.

| Reader's question | Pattern | Useful layout |
| --- | --- | --- |
| Why does work wait at finite capacity? | Fan-in queue | Data flow or process |
| How do the same questions differ across stages? | Stage framework | Process grid |
| Where did structured fields come from? | Unstructured input → artifact | Data flow |
| Why did two decisions differ? | Paired evaluation traces | Flowchart or status matrix |
| Which boundary-crossing routes are allowed? | Secure paved road | Architecture |
| Where and by whom is each control enforced? | Control catalog | Layers or matrix |
| What survives each defensive layer? | Compensating layers | Layers |
| Which structural block maps to which record and code? | Traceable decomposition | Tree or nested containment |

## Fan-in queue

Show named producers, ingress, a queue or pending count, the constrained service point, and supported admitted/deferred/rejected outcomes. Capacity, service rate, arrival rate, and queue depth are different quantities; label their units and evidence window. A finite slot drawing must match actual or explicitly illustrative capacity. A blocked arrival is different from a queued item. Preserve ordering only if the service has that ordering policy.

A static view must explain why work waits. Avoid decorative piles, merged ingress that loses identity, and equal-width pipelines that conceal contention. Aggregated producers need a named cohort and source mapping. Animation may explain one arrival, but may not establish performance from invented motion speed.

## Stage framework

Align the actual stages with repeated semantic slots, such as Question, Input, Governance, and Output. Use stable slot labels and order. A slot can be unknown, empty, or not applicable; those are not interchangeable. Stages may have several outputs when the source does. Handoffs preserve the actual sequence and branches.

The complete matrix should work statically. Do not let each column invent a different schema or shrink prose until comparison becomes impossible. Use swimlanes when rows are owners rather than semantic slots.

## Unstructured input → structured artifact

Show representative source utterances, any real clarification, the transformation, extracted fields, and the durable artifact boundary. Attach provenance to representative fields and preserve missing or uncertain values. An inferred field must be distinguished from a directly supported one.

The artifact is a structured record, not merely another chat bubble. A sample is not the full transcript; name its coverage. Avoid an unexplained AI-magic arrow, typing that contains the only readable copy, or a completed field with no evidence behind it. Consult AI engineering when the transformation's inference contract itself needs design or assessment.

## Paired evaluation traces

Align the same ordered rules for two comparable cases. Show the differing inputs, each rule's status, final outcomes, and the first divergence if one exists. Use status text plus a redundant symbol or shape.

PASS, FAIL, SKIPPED, and NOT REACHED mean different things. SKIPPED is an intentional bypass in the applicable flow; NOT REACHED follows an earlier stop. Do not continue a denied trace as though downstream checks ran. If the cases use different rule sets or order, expose that difference rather than forcing false alignment. The static view retains every relevant rule state and both outcomes.

## Secure paved road

Show supported actors and identities, real trust boundaries, permitted entry, forbidden entry, privileged gates, deployment paths, bypasses, runtime isolation, and audit destinations when the source establishes them. Label allowed and blocked routes positively. A forbidden route visibly stops at its actual enforcement point; it must not cross into the protected area and quietly rejoin the permitted path.

Distinguish enforced control from policy or aspiration, authentication from authorization, and audit from prevention. A dashed rectangle named Security establishes none of those. Include exceptions, unknown boundary coverage, and residual exposure. Use line style, labels, or stop symbols in addition to color.

## Control catalog

Group controls by their actual enforcement surface, such as authoring, workspace, merge, deploy, or runtime. Record the control, enforcement actor, timing, coverage, and bypass or exception behavior as needed. A declared policy, human review, platform gate, and technical restriction are different controls.

Keep the complete inventory or an explicit linked mapping. Counts alone require the underlying list. Preserve gaps and unenforced proposals. Use a permission matrix when role/access comparison dominates; a catalog's group placement must not imply access is granted or denied.

## Compensating layers

Start with a named threat or failure. At each layer, show the supported mitigation, its limitation, and the escaped or transferred risk. End with residual risk and consequence or response. Prevention, detection, and recovery differ; audit is not automatically prevention.

Several layers do not prove risk is zero. A narrowing shape needs a measured quantity or an explicit qualitative statement, not an invented percentage. Different threats may require separate threads because one ordered stack can obscure how defenses actually interact. The static view retains limitations and residual risk.

## Traceable block decomposition

Use this for structural parts with stable IDs, parent membership, full records, and implementation links. A tree is suitable for one-parent decomposition; nested containers also support siblings. If the real model has multiple parents, dependencies, or cycles, use the relevant graph rather than forcing it into a tree.

Show each block's stable ID and noun-phrase name. Retain the same identity in its record and implementation reference. An ID such as PAY-001-02 is a structured identifier, not a required naming syntax. In/out labels are optional when useful and readable. Constraints and assumptions that materially affect interpretation must remain visible or clearly called out, not hidden merely to preserve a minimalist box.

For HTML, an element can carry `data-block-id`, `data-block-parent`, `data-block-name`, and optional `data-block-input`, `-output`, `-constraint`, `-assumption`, and `-impl` attributes. Absence of parent means root. Use unique IDs, resolved parents, and no parent cycles for a tree. Long records may live in an accompanying authored registry, with the diagram maintaining an explicit link to it.

The [registry exporter](export-registry.md) projects only literal source attributes. It cannot recover longer records stored elsewhere or supplement missing metadata. An exported projection is not a second independent source of truth. Verify visible badges, attributes, links, parent edges, and the authoritative record against one another.

This is a practical traceability pattern, with vocabulary informed by structural modeling. It does not claim SysML, IDEF0, XMI, or formal tool conformance. Input/output arrows among siblings may belong in a companion data-flow or dependency view. Interaction can help inspect a large record set when requested; a static export still needs identifiable blocks and honest scope.

## Composition

Choose one dominant question per figure. Supporting distinctions can be combined when they remain readable; split views when each needs its own full explanation. Labels and outcomes must work in the complete static frame. Motion is a presentation choice, with its own supported implementation in [animation](animation.md), not evidence of behavior.
