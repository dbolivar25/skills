# Reviewability core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Audience/decision, actual or proposed work, current change map and evidence, source versions, format and any already supported judgment.

Use this skill for a PR description, review guide, or other artifact that helps
someone judge work. It applies to non-code work too. The output is a faithful
account, not a verdict unless the task includes a separately supported judgment.

Use a supplied current change map, or apply the
[change-understanding core](../understand-change/core.md) to the supplied sources.
For a PR description, also read [the PR artifact guidance](references/pull-request.md)
before starting: the final aggregate base-to-head behavior is the source of truth.

## Render for the reviewer's questions

Choose the visible structure by what the reviewer must understand, find, compare,
or decide. Explain behavior before implementation. Connect each meaningful
region to its responsibility and the outcome; do not narrate the commit history.
Use prose for causality, tables for exact comparisons or mappings, and lists for
independent facts. Use the [visual core](../show-me/core.md) to propose a representation when a
material relationship is clearer visually; rendering belongs to the shell.

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

Check every consequential claim and material region against the supplied source
version. Return a freshness or source need when that comparison is unavailable.
Support the claim or mark its uncertainty. When consequential source support
is disputed, use [claim support](../claim-support/core.md) and preserve its
qualification and gaps in the artifact. Do not report intended outcomes as
observations or hide unexplained scope. Preserve conflicts between source and
author explanation rather than smoothing them away.

Delete passages and distinctions inherited only from source layout when removing
them would not change the review decision. Compression must not remove a contract,
tradeoff, uncertainty, or evidence gap that could change that decision.

Deliver when the reviewer can begin from a reliable model of the work without
reconstructing it from scratch. The core returns copy and its evidence limits. Writing files and publication
remain shell effects with their own authority and receipts.
