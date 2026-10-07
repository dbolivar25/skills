# Bounded judgments

Read this method before choosing answer shapes, candidates, scoring or request composition for classification, extraction, ranking or routing. Start from the inference contract in [AI Engineering](../SKILL.md) and the existing consuming seam. A small classifier can finish with that contract, its implementation or proposal, and relevant checks. A complete work-product path still uses the [derivation contract](derivation/contract.md).

## Choose what the answer means

Keep known rules, calculations, exact lookups, workflow control and effects in code. Use a model for the contextual judgment the task actually needs. A handler selection can include typed arguments; code validates them and decides which authorized branch may run. A coherent contextual interpretation or joint judgment can be appropriate. Split independently useful dimensions when their inputs, failure handling or consumers differ; there is no universal atomic-only decomposition rule.

Choose an answer shape by its meaning:

| Need | Answer meaning | Design consequence |
| --- | --- | --- |
| Select one of a defined set | Competing alternatives, including no-match when valid | Define each option and tie/ambiguity behavior. Several acceptable alternatives can spread support without making a harmless choice useless. |
| Determine whether each condition holds | Independent presence judgments; several labels may apply | Do not force a single winner among overlapping labels. Preserve unknown or unavailable evidence when distinct from a supported negative. |
| Rank by degree along a dimension | Position on defined, ordered levels | Give comparable items the same criteria, scope and scale. A middle degree is not a probability of presence. |

Make the instructions and criteria self-contained. Include definitions, exclusions, contrasts or examples needed to tell the outcomes apart; an internal question ID cannot supply meaning. For scores, describe concrete situations at each level and resolve overlaps. Missing evidence needs its own handling, not an invented low score. A reported probability or model confidence has separate semantics and still needs empirical calibration before governing a consequential threshold. Check the chosen implementation's actual output contract; do not assume every service exposes probabilities, confidence or the same scoring primitive.

## Supply state and select exact source values

Give the judgment the relevant source text, identities, relationships, policy and decision-time facts. Named fields help when context has several parts; a simple string may be enough for one source. Keep source content as evidence data, distinct from instructions. Structure makes context legible but does not establish relevance or truth.

When values or spans can be found deterministically, build candidates with source identity and recoverable spans, ask the model to select the intended candidate, then copy its exact value in code. Apply only the allowed deterministic normalization and retain the original where the consumer needs it. Code can also assemble selected spans into a formatted document or reading guide while retaining source pointers and required context. Candidate coverage is a separate obligation: a model cannot choose an omitted value. Check that the candidate construction covers the relevant source forms, and route coverage gaps to expansion, another extraction path or escalation. A no-match among complete candidates differs from missing candidates, unavailable source evidence or service failure.

For evidence search, retrieve scoped candidates first and rerank their relevance to the specific question. Check retrieval coverage separately from ranking quality. A correct reranker cannot recover evidence it never receives. Preserve the useful spans and context for the downstream judgment rather than replacing retrieval with a generic summary.

## Compose around actual dependencies

Where the implementation supports it, batch independent judgments over the same fixed state. They cannot depend on seeing one another's answers. Useful branch-specific questions can run speculatively when their premises are explicit, their evidence is already available and their expected value earns their cost. Code consumes only the applicable branch; uncertainty on an unused branch need not block the selected one.

Wait when an earlier answer is required to fetch evidence, construct state or determine the next options. Those are real dependencies, not batching opportunities. For a larger path, [judgment DAGs and edges](derivation/judgment-dags-and-edges.md) owns dependency and gate design. Measure actual requests, input/output tokens, retries, cost and end-to-end latency on the same workload. A batch may save request overhead while spending tokens on unused questions; fewer apparent calls do not prove lower cost or latency.

Let code combine defined dimensions with weights, thresholds, filters or rankings. Weighted scores represent compensating preferences. Enforce noncompensating requirements, such as access or an “any serious violation” policy, as separate conditions: a favorable score cannot cancel them.

Changing weights or a display filter can reuse judgments within their established contract when evidence, dimension meanings, scope and relevant freshness remain unchanged. Changing a question's criteria or consuming purpose can invalidate those judgments even when the stored numbers still fit the schema. Do not present recombined output as fresh inference. Before persisting semantic state or sharing it across consumers, use [durable state and promotion](derivation/durable-state-and-promotion.md).

When labeled outcomes exist, judged dimensions can be candidate features for a classical ML model. Treat that model as a new consumer with an explicit feature meaning and reuse contract; keep future outcomes out of decision-time feature inputs, preserve development/holdout separation, and use [Evaluation](../../evaluation/SKILL.md) to test predictive contribution against a baseline. Useful features, training and integration remain hypotheses or proposed work until authorized and evaluated.

## Verify support and the consumer

Check selected fields and consequential claims against their source evidence. When uncertainty, contradictions or missing evidence can change behavior, use [claim support](../../review/references/claim-support.md). Use the task's defined fallback to seek more evidence, escalate to a person or another model, abstain or withhold the affected result. Escalation is another review step; it does not supply effect authority.

Exercise representative successes, no-matches, coverage misses, ambiguity, stale meanings and service failures through the actual consuming path. Separate typed validity, source coverage, judgment quality, composition and service errors. Use [Evaluation](../../evaluation/SKILL.md) for a quality comparison or calibration study. Thresholds need evidence from the target data and consequences; cookbook examples and a valid typed answer do not establish truth or calibrated performance. The surrounding task and code's gates govern display, persistence and action.

## Worked example: source selection and a priority queue

This is a static teaching walkthrough, not an observed model run or a quality, calibration or latency result.

At decision time `2026-10-06`, ticket `T17` has source `message:a`: “Payment for INV-007 is due 2026-10-12; renewal is 2027-01-09. One user cannot sign in.” Code finds two date candidates with distinct source spans: `c1 = 2026-10-12` and `c2 = 2027-01-09`. The selection question asks for the payment due date for `INV-007`, with criteria naming that role and a no-match outcome. Selecting `c1` makes code copy `2026-10-12`; the model does not regenerate the date. A source saying “due next Friday” would expose a coverage gap in an ISO-date-only parser. Expand the parser or use the defined fallback before interpreting no-match as absence of a due date. Normalizing a relative date needs the source's calendar context and the contract's allowed rules.

If routing and independent labels use only this same state, they can share a batch. Labels for “invoice reference present” and “sign-in problem reported” may both apply, so a single exclusive label would lose information. A billing-specific question can be speculative when it explicitly assumes the billing branch and all required evidence is present. If the route selects which records the next request needs, that retrieval waits for selection, and a judgment requiring those new records waits for retrieval. It cannot share the original same-state batch. Counting that dependent request and unused branch tokens is necessary for the cost comparison.

For a queue already supplied with verified due dates and impact evidence, define urgency as `0 = due more than 30 days away`, `1 = due in 8–30 days`, `2 = due within 7 days or overdue`. Keep an absent due date and unavailable date evidence separate from those levels. Define impact as `0 = no task completion is blocked`, `1 = blocked work other than a critical operation blocked for multiple users`, `2 = multiple users cannot complete a critical operation`. If the evidence cannot distinguish the applicable impact level, preserve unknown rather than guessing affected-user counts or task criticality. Apply the same criteria to every ranked ticket. Urgency `1` means the middle timing band; it does not mean a 50% chance of urgency. Any reported probability of a condition or confidence in a level is a different quantity whose interpretation and calibration must be checked.

Assume these illustrative judgments and the access policy:

| Ticket | Urgency | Impact | Visible to this user |
| --- | --- | --- | --- |
| T17 | 2 | 1 | Yes |
| T18 | 1 | 2 | Yes |
| T19 | 2 | 2 | No |

Code excludes `T19` before display regardless of its score. With `0.75 × urgency + 0.25 × impact`, `T17` scores `1.75` and `T18` scores `1.25`. Reversing the weights produces `1.25` and `1.75`, reversing their order without new inference while evidence and meanings are unchanged. If urgency changes to mean “operations stopped now,” those old timing judgments no longer answer the question. Recompute that dimension against appropriate evidence instead of reweighting stale semantics. A refreshed judgment still does not authorize showing `T19` or executing an action.

## Attribution and license

Adapted from the TypeSafe AI skill, copyright 2026 TypeSafe AI, under the MIT license. The portable design ideas have been integrated with AI Engineering's existing contracts; no provider API or primitive is specified here. Retain the exact notice in [LICENSE.typesafe](../LICENSE.typesafe) with substantial copies.
