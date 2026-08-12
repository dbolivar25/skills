---
name: reviewability
description: Use when drafting a pull request description or review guide, or when work must become legible to someone who will judge it. Load it to preserve the reviewer's decision, semantic delta, evidence, uncertainty, and attention through compression; use code-review when the requested outcome is the verdict itself.
---

# Reviewability

A **review map** is a faithful compression of work for someone who must judge
it. It preserves the distinctions needed to understand the work, navigate its
meaningful regions, evaluate its support, and spend judgment where it matters.

This skill makes a review artifact; it does not supply the verdict. Treat the
work or evidence under review as authoritative over the author's preferred
story. Drafting does not authorize publication, approval, or any other review
state change.

When the requested artifact is a pull request description, read
[`references/pull-request.md`](references/pull-request.md) before starting. It
specializes the source of truth and rendering steps for a live branch. For any
other review guide, use the core process below without inventing a new format
branch.

## 1. Establish the review contract

Identify:

- the decision the reviewer must make;
- the reviewer's relevant perspective;
- the real work or evidence being evaluated;
- the source of truth for claims about that work; and
- the consequence of accepting or rejecting it.

Preserve disagreement between the source and the author's explanation.

Completion criterion: the decision, reviewer, source of truth, consequence, and
requested artifact are explicit.

## 2. Reconstruct the work

Inspect enough of the source material to determine:

- the outcome the work is intended to produce;
- the semantic delta from the prior state;
- behavior or scope that deliberately remains unchanged;
- the meaningful regions of responsibility and their relationships;
- the contracts, invariants, constraints, and tradeoffs involved;
- the evidence supporting consequential claims;
- the uncertainty evidence does not settle; and
- any material scope that does not contribute clearly to the outcome.

Organize by reviewer meaning, not by files, commits, document sections, or
chronology unless that structure itself affects the decision.

Completion criterion: every material region has an understood role or remains
visible as unexplained scope.

## 3. Construct the review map

Build a working representation containing the applicable fields:

- **Review decision:** What judgment must the reviewer make?
- **Source of truth:** What reality should claims be checked against?
- **Outcome:** What should change if the work is accepted?
- **Non-goals:** What adjacent change is deliberately excluded?
- **Semantic delta:** What is meaningfully different from the prior state?
- **Review regions:** What are the major areas of responsibility?
- **Relationships:** How do those regions produce the outcome together?
- **Contracts and invariants:** What must remain true?
- **Evidence:** What supports the consequential claims?
- **Uncertainty:** What remains unverified, inferred, or unresolved?
- **Review focus:** Where can reviewer judgment materially improve the work?

Omit inapplicable fields. Keep a field empty only when its absence is itself
material. Explain consequential claims through mechanism and consequence; a
quality claim without its producing mechanism is not yet mapped.

Completion criterion: the reviewer can understand the change, locate its
meaningful regions, distinguish evidence from assertion, and identify the
judgment still required.

## 4. Render the requested artifact

Choose structure by reviewer question, not from a fixed template. Use prose for
causality, tables for exact parallel mappings or comparisons, and lists for
independent facts. Describe behavior before implementation and connect each
region to the responsibility it owns.

Keep these distinctions visible:

- prior state versus proposed state;
- behavior versus mechanism;
- intended outcome versus observed result;
- evidence versus inference and judgment;
- included scope versus non-goals; and
- settled facts versus requested reviewer judgment.

Use `show-me` only when a material relationship is genuinely clearer as a
diagram or focused visual.

Completion criterion: every section changes the reviewer's understanding,
navigation, judgment, or next move, and every material reviewer question has a
place to be answered.

## 5. Audit fidelity

Recheck the rendered artifact against its source of truth. Verify that every
material claim is supported or marked uncertain, every material region is
represented, intended outcomes are not reported as observations, evidence is
separated from inference, and unexplained scope remains visible.

Delete distinctions inherited only from source layout and passages whose
removal would not change the reviewer's understanding or decision. No
compression may remove information that could change the review decision.

Completion criterion: the reviewer can begin from a reliable model of the work
without reconstructing it from scratch.
