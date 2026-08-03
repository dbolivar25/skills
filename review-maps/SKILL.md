---
name: review-maps
description: Build review maps for work that someone must evaluate. Use when making a change, proposal, design, investigation, or other body of work reviewable, or when another writing skill needs a faithful model of the reviewer's decision, evidence, uncertainty, and attention.
---

# Review Maps

A **review map** is a faithful compression of work for someone who must judge it. It preserves the distinctions necessary to understand the work, navigate its meaningful regions, evaluate its support, and spend judgment where it matters.

A review map is an intermediate model, not a publication format. Construct the map before deciding how to present it as a pull request description, design review, handoff, proposal, or other artifact.

## 1. Establish the review contract

Identify:

- the decision the reviewer must make;
- the reviewer's relevant perspective;
- the real work or evidence being evaluated;
- the source of truth for claims about that work; and
- the consequence of accepting or rejecting it.

Do not substitute the author's intended story for the work itself. When they disagree, preserve the disagreement.

This step is complete when the review decision, reviewer, source of truth, and consequence are explicit.

## 2. Reconstruct the work

Inspect enough of the source material to determine:

- the outcome the work is intended to produce;
- the observable or semantic delta from the prior state;
- the important behavior or scope that deliberately remains unchanged;
- the meaningful regions of the work and the responsibility of each;
- the relationships between those regions;
- the contracts, invariants, constraints, and tradeoffs involved;
- the evidence supporting consequential claims;
- the uncertainties evidence does not settle; and
- any material work that does not contribute clearly to the stated outcome.

Do not organize the map around files, commits, document sections, or chronology unless those are themselves meaningful to the reviewer's decision.

This step is complete when every material region has an understood role or is identified as unexplained scope.

## 3. Construct the review map

Build a working representation containing:

- **Review decision:** What judgment must the reviewer make?
- **Source of truth:** What reality should claims be checked against?
- **Outcome:** What should change if the work is accepted?
- **Non-goals:** What adjacent change is deliberately excluded?
- **Semantic delta:** What is meaningfully different from the prior state?
- **Review regions:** What are the major areas of responsibility?
- **Relationships:** How do those regions interact to produce the outcome?
- **Contracts and invariants:** What must remain true?
- **Evidence:** What supports the consequential claims?
- **Uncertainty:** What remains unverified, inferred, or unresolved?
- **Review focus:** Where can reviewer judgment materially improve the work?

Omit a field only when it does not apply. Do not invent content to make the map appear complete.

Explain consequential claims through mechanism and consequence. A quality claim without the mechanism producing it is not yet mapped.

This step is complete when the reviewer could use the map to understand the change, locate its meaningful regions, distinguish evidence from assertion, and identify the judgment still required.

## 4. Audit fidelity

Check the map against its source of truth.

Verify that:

- every material claim is supported or marked as uncertain;
- every material region is represented;
- intended outcomes are not presented as observed results;
- evidence is distinguished from inference and judgment;
- non-goals and follow-ups are not presented as completed work;
- unexplained scope remains visible;
- no distinction exists only because the source material happened to be organized that way; and
- no compression removes information that could change the review decision.

Delete distinctions that do not change the reviewer's understanding, navigation, or judgment.

The review map is complete when every material part of the work is accounted for and the reviewer can make the required decision without first reconstructing the work from scratch.
