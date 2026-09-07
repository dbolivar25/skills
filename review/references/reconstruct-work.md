# Reconstructing work

Use this common method before a code judgment or a reviewer-facing artifact.
The caller supplies the source and the decision the reviewer must make. Return
a current review map with evidence and gaps; this method neither issues a verdict
nor starts a writing workflow. Read this file directly without loading review.

## Establish the contract

Identify the requested outcome, the reviewer and their perspective, the actual
work being evaluated, the authoritative source for claims, and the consequence
of accepting or rejecting it. Recover the intended behavior from the user's
instructions or spec, then the work's description and linked decisions, then
other source references. If intent cannot be found, state the limitation rather
than inventing requirements. Preserve disagreement between intent and reality.

For code judgment, the caller supplies target selection, repository standards,
local precedent, and the two review axes. For a PR, pin the current base and head,
complete base-to-head diff, file/size distribution, commit and discussion context,
linked requirements, and the checks actually performed. Read [PR operations](../../github-evidence/references/pr-operations.md)
before acquiring a live PR; a local checkout or old description is not live
head evidence. For non-code work, identify the equivalent source and prior state
without manufacturing a repository workflow.

## Account for the whole material change

Inspect enough source to establish:

- the intended outcome and semantic delta from the prior state;
- behavior deliberately unchanged and adjacent work deliberately excluded;
- every meaningful region of responsibility and how the regions work together;
- contracts, invariants, constraints, and surviving tradeoffs;
- evidence for consequential claims, with its provenance and limits;
- uncertainty, unexplained scope, and decisions the evidence cannot settle.

Organize by meaning to the reviewer. Files, commits, and document sections are
navigation aids, not automatic responsibility boundaries. Distinguish tests,
generated output, configuration, migrations, documentation, and mechanical work
when their different roles affect the decision. Follow behavior beyond edited
lines or supplied excerpts when its consequence depends on a caller, state
transition, or source elsewhere.

Completion: every material region has an understood role or is explicitly
unexplained. Every available validation claim has been checked. No claim of a
passed check, observed behavior, or satisfied requirement rests on author prose
alone.

## Hold a review map

Keep the applicable elements together in working context:

| Element | Question it preserves |
| --- | --- |
| Decision and source of truth | What must be judged, and against what reality? |
| Outcome, non-goals, semantic delta | What should change, what will not, and what actually differs? |
| Regions and relationships | Where are responsibilities, and how do they produce the outcome? |
| Contracts and invariants | What must remain true? |
| Evidence and uncertainty | What is supported, inferred, missing, or unresolved? |
| Review focus | Where can the reviewer's judgment change the result? |

Omit inapplicable fields; keep an absence visible when the absence matters.
Explain claims through mechanism and consequence. Saying a change is robust,
simple, or safe does not establish the mechanism that makes it so.

The map is ready when a reviewer can understand and navigate the work,
distinguish support from assertion, and locate the remaining judgment. The
artifact need not print this map, and a verdict must do more than summarize it.
