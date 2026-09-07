# Make work reviewable

Use this branch for a PR description, review guide, or other artifact that helps
someone judge work. It applies to non-code work too. The output is a faithful
account, not a verdict unless the user also selected code judgment.

Start with the shared [reconstruction method](../references/reconstruct-work.md).
For a PR description, also read [the PR artifact guidance](../references/pull-request.md)
before starting: the final aggregate base-to-head behavior is the source of truth.

## Render for the reviewer's questions

Choose the visible structure by what the reviewer must understand, find, compare,
or decide. Explain behavior before implementation. Connect each meaningful
region to its responsibility and the outcome; do not narrate the commit history.
Use prose for causality, tables for exact comparisons or mappings, and lists for
independent facts. Use `show-me` when a material relationship is clearer visually.

Preserve the distinctions that affect judgment:

- prior state versus proposed state, and behavior versus mechanism;
- intended outcome versus observed result;
- evidence versus inference and judgment;
- included scope versus non-goals;
- settled facts versus decisions still requested from the reviewer.

A section earns its place by changing understanding, navigation, judgment, or the
next move. Every material reviewer question needs an answer or an explicit gap;
every field in the working map does not need a heading.

## Audit fidelity against reality

Recheck every consequential claim and material region against the actual source.
Support the claim or mark its uncertainty. Do not report intended outcomes as
observations or hide unexplained scope. Preserve conflicts between source and
author explanation rather than smoothing them away.

Delete passages and distinctions inherited only from source layout when removing
them would not change the review decision. Compression must not remove a contract,
tradeoff, uncertainty, or evidence gap that could change that decision.

Deliver when the reviewer can begin from a reliable model of the work without
reconstructing it from scratch. Drafting produces copy. Publishing requires the
surrounding task's explicit authority and a read-back of the published artifact.
