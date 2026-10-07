# Faithful accounts of current work

Use this method when drafting or updating an explanation, PR description, review guide, proposal account or work report from current source material. An existing description is evidence of intent, not authority over the actual change. A request to rewrite supplied prose for voice alone protects the supplied claims and does not require this reconstruction unless the user also asks to refresh them.

## Establish the reader's question and authoritative source

Identify what the reader must understand, find, compare or decide, the actual work, its intended outcome, the source versions and the evidence for consequential claims. A standalone explanation need not invent an approval decision. Recover intent from current user instructions or an accepted specification, then the work description and linked decisions. Preserve disagreement between intent and reality. If intent is missing, state that limit rather than inventing requirements.

For a PR or code change, obtain current base/head identity, the aggregate delta, meaningful changed regions, relevant callers/state transitions, commit or discussion context that affects the final design, and validation receipts. For a local draft, pin the local comparison and retain the lack of live PR evidence. Use the equivalent source and prior state for non-code work. Reuse a current change map, refreshing changed sources and filling gaps instead of repeating sound investigation.

Acquire material available within the task's authority. If consequential behavior depends on an absent caller, transition or source outside an excerpt, inspect it or name the exact evidence limit and affected conclusion. Do not make the author supply data the agent can obtain. Author prose alone cannot establish a passed check or observed behavior.

## Account for the whole material change

Reconstruct the final aggregate outcome:

- Intended behavior and the semantic delta from the prior state.
- Adjacent behavior, non-goals and excluded work when they affect the reader's decision.
- Every meaningful region of responsibility and how the regions produce the outcome together.
- Contracts, invariants, constraints and surviving tradeoffs.
- Actual observations and validation, with source, version, environment and limits.
- Uncertainty, unexplained scope and decisions the evidence cannot settle.

Organize by meaning. Files, commits and document sections aid navigation but do not automatically define responsibilities. Distinguish tests, generated output, configuration, migrations, documentation and mechanical work when their different roles matter. Account for each material region or explicitly leave its role unresolved. Do not turn a documentation refresh into a full merge verdict or an implementation task unless requested.

Keep a working map with the applicable elements:

| Element | Reader question |
| --- | --- |
| Purpose and source | What must be understood, and against which reality? |
| Outcome and semantic delta | What should change, and what actually differs? |
| Responsibilities and relationships | How does the work produce the outcome? |
| Contracts and surviving tradeoffs | What must hold, and what cost remains? |
| Evidence and uncertainty | What is observed, inferred, missing or unresolved? |
| Requested judgment | Where can the reader's decision change the result? |

Omit inapplicable fields. Preserve a missing element when its absence matters. A change being called robust, simple or safe does not establish the mechanism that makes the claim true.

## Render for comprehension

Explain behavior before implementation. Connect mechanisms to consequences, and meaningful regions to their responsibility. Use prose for causality, tables for exact comparisons and lists for independent facts. A small diagram can clarify a material relationship; a source-sensitive or exportable diagram can use Diagram Design. Inspect any rendered artifact the user will actually use.

Keep prior and proposed state, intended and observed behavior, evidence and inference, included scope and non-goals, and settled facts versus requested decisions distinguishable. A section earns its place by changing understanding, navigation, judgment or the next action. Private coverage does not require a long public account or a heading for every field.

## Audit against current reality

Compare consequential claims and material regions with the authoritative versions. Support them or preserve their qualification and evidence gaps. When support, contradictions, freshness or scope needs deliberate assessment, use [claim support](../../review/references/claim-support.md). Preserve a conflict between source and author explanation rather than smoothing it away.

Remove details inherited only from source layout when removal cannot change comprehension or judgment. For consequential compression, use [information fidelity](information-fidelity.md). Keep a contract, surviving tradeoff, uncertainty or validation limit that could change the reader's conclusion. Do not present a planned follow-up as completed, a green build as interaction evidence, or staging behavior as production acceptance.

The account is ready when its reader can understand and navigate the work, distinguish observation from assertion and locate the remaining decision without reconstructing the source from scratch. Write the requested artifact at the scale the work needs; publishing or messaging follows the task's authority.

Source: combines the personal Understand Change and Reviewability methods.
