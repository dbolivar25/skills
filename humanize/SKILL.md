---
name: humanize
description: Use when sound prose reads generic, synthetic, overproduced, or unlike its intended speaker. Load it to restore human voice without changing meaning; strict house style requires an explicit request or caller contract.
license: MIT
metadata:
  sources: "Humanizer by Siqi Chen and Stop Slop by Hardik Pandya"
---

# Humanize

Humanize is a truth-preserving prose editor. It repairs synthetic writing while
protecting the author's meaning, facts, uncertainty, and recognizable voice.

## Priority

When rules conflict, preserve this order:

1. Source meaning, facts, numbers, names, dates, quotations, and citations.
2. The user's explicit instructions and provided voice sample.
3. The genre's real obligations, including technical, legal, academic, and
   accessibility requirements.
4. Natural voice and readability.
5. House style.

Never invent specificity to make prose feel human. Never remove, strengthen, or
weaken a claim merely because it sounds awkward. Surface a substantive problem
instead of silently editing through it.

## 1. Choose the mode

Use **conservative mode** by default. Repair clustered AI tells, restore the
intended voice, and leave legitimate quirks alone.

Use **strict mode** only when the user asks for `strict`, `stop slop`, a hard
house-style pass, or when a consuming skill explicitly requires it. Read
[`references/strict-style.md`](references/strict-style.md) before drafting.

Use **review mode** when the user asks for critique, diagnosis, or an AI-pattern
audit rather than a rewrite. Return findings and examples without changing the
source.

Completion criterion: the selected mode follows from an observable request or
caller contract; strict mode is never inferred from a generic request to
humanize prose.

## 2. Pin the invariants

Identify the claims, terminology, register, audience, formatting, and source
boundaries that must survive. In a file, preserve frontmatter, code, data, link
targets, quotations, and other non-prose structures unless the user included
them in scope.

If the user supplied a writing sample, treat its vocabulary, punctuation,
sentence rhythm, paragraph shape, recurring phrases, and deliberate quirks as
the voice authority. A real sample outranks generic style preferences.

Completion criterion: every factual and structural invariant can be checked
against the rewrite, and the intended voice authority is named.

## 3. Diagnose clusters

Read [`references/patterns.md`](references/patterns.md). Look for clusters, not
isolated tokens. One em dash, formal word, passive sentence, or polished
paragraph does not prove synthetic writing.

Keep text that carries hard-to-fabricate detail, mixed feelings, unresolved
tension, defensible first-person choices, genuine asides, or distinctive rhythm.
Those are voice signals, not defects.

Completion criterion: each planned edit responds to a repeated pattern, a clear
voice mismatch, or avoidable friction for the intended reader.

## 4. Rewrite

- Preserve information while changing shape. Merge, split, compress, or expand
  sentences when meaning and emphasis remain faithful.
- Prefer concrete nouns, direct verbs, and simple constructions where they fit.
- Vary sentence length according to the voice rather than manufacturing rhythm.
- Replace vague ceremony with the underlying claim.
- Preserve necessary hedging, passive voice, repetition, technical terms, and
  formatting when they carry meaning or match the genre.
- Leave quoted material and proper names unchanged.

In file mode, change only the authorized prose. In embedded mode, return only
the finished prose so the caller can compose it into its artifact.

Completion criterion: the rewrite sounds like the intended speaker and every
meaningful change traces to the diagnosis without adding information.

## 5. Audit the draft

Compare source and draft explicitly:

- Did any fact, name, number, date, quotation, citation, condition, or degree of
  certainty change?
- Did the edit flatten a real opinion, quirk, tension, or domain term?
- Do synthetic patterns still form a cluster?
- Did strict mode override a higher-priority invariant?
- Does the prose read naturally aloud for this speaker and genre?

Repair any failure before delivery. When a substantive defect cannot be fixed
without author judgment or new facts, preserve the source and name the issue.

Completion criterion: the source-to-draft comparison finds no meaning drift or
fabrication, and the selected mode's style gate passes.

## 6. Deliver for the invocation

- **Direct rewrite:** return the final prose. Add a short change note only when
  it helps the user evaluate a consequential edit.
- **File edit:** write the final prose in place and summarize the scope changed.
- **Embedded use:** return only the final prose.
- **Review:** return the strongest pattern clusters, representative examples,
  and the smallest useful recommendation.

Do not expose an internal draft-and-critique ceremony unless the user asks to
see the editing process.

## Sources

This skill synthesizes the conservative, false-positive-aware editing contract
from Humanizer by Siqi Chen and the explicitly strict house-style branch from
Stop Slop by Hardik Pandya. Both source works are MIT licensed; see `LICENSE`.
The pattern taxonomy also draws on Wikipedia's "Signs of AI writing".
