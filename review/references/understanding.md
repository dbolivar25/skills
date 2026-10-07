# Semantic reconstruction

Use when an existing change, proposal, or work product must be understood before it can
be judged or explained. This is the canonical method for reconstructing its meaning from
source. Review owns a verdict; Writing owns a reader-facing account. A current supplied
map can satisfy this method after its sources, coverage, and gaps have been checked.

Start with the consumer's question, actual and prior source versions, intended behavior,
meaningful changed regions, relevant context, and validation receipts. Add acceptance
criteria only when a judgment is requested. A standalone explanation need not invent an
approval decision, and building the map does not authorize edits or publication.

## Find the question and source of truth

Identify what must be understood, who will use that understanding, and which source can
establish each consequential claim. Recover intended behavior from current instructions
or the spec, then descriptions and linked decisions. Preserve disagreement between intent
and reality rather than quietly choosing whichever makes the work look complete.

For code, pin the target/comparison, governing contracts, and local precedent. For a PR,
identify base/head, aggregate changed regions, relevant commit/discussion context, and
check receipts. Use [GitHub evidence](../../github/SKILL.md) when current platform state
or complete conversation is needed. A local checkout, old comment, or author summary does
not establish the current remote change.

For non-code work, identify the equivalent authoritative material and prior state:
the original plan, edited draft, design artifact, underlying sources, or observed result.
Do not invent a repository workflow for a document. If intent or a prior version cannot
be recovered, name the affected conclusion and keep that limitation visible.

## Account for the whole material change

Read enough actual source and surrounding context to establish:

- the intended outcome and semantic delta from the prior state;
- behavior deliberately unchanged and adjacent work deliberately excluded;
- every meaningful region of responsibility and how those regions work together;
- contracts, invariants, constraints, and surviving owner tradeoffs;
- support for consequential claims, with provenance and limits;
- unexplained scope, uncertainty, and decisions the evidence cannot settle.

Organize by meaning to the consumer. Files, commits, and document sections are navigation
aids, not automatic responsibility boundaries. Tests, generated output, configuration,
migrations, documentation, and mechanical edits have different roles; retain those
distinctions when they affect the consumer's judgment.

Trace a changed mechanism far enough to explain its consequence. A new retry parameter
cannot establish durable recovery without the owner, state, and caller that use it. A
rewritten policy sentence may alter who can act even if its heading stays the same. When
a claim depends on a caller, transition, or source outside the excerpt, obtain it or name
the exact gap. Do not let an easy-to-explain region stand in for the difficult one.

Every material region must have an understood role or remain explicitly unexplained.
Every validation claim needs an actual receipt or an unverified label. Author prose may
explain intent; it cannot prove a passed check, observed behavior, or satisfied requirement.
Use [claim support](claim-support.md) when freshness, source independence, contradictions,
or wording strength requires deeper judgment.

## Keep one reusable change map

Hold the applicable elements together in working context:

| Element | Question it preserves |
| --- | --- |
| Consumer question and source of truth | What must be understood or judged, and against what reality? |
| Outcome, non-goals, semantic delta | What should change, what is excluded, and what actually differs? |
| Regions and relationships | Where are responsibilities, and how do they produce the outcome? |
| Contracts and invariants | What must remain true? |
| Evidence and uncertainty | What is observed, supported, inferred, missing, or unresolved? |
| Review focus, when needed | Where can the reviewer's judgment change the result? |

This is a working model, not a compulsory public form. Omit inapplicable fields; preserve
an absence when the absence matters. Explain claims through mechanism and consequence.
Calling a change robust, simple, or safe does not establish what makes it so.

Reuse sound investigation. On a new version or rereview, refresh changed premises,
affected regions, and their dependent conclusions. Recheck material state that can change
without a code commit, such as review discussion, checks, a serving configuration, or
owner decisions. Record what version and coverage the reused map still represents.

The map is ready when its consumer can understand and navigate the whole material work,
distinguish support from assertion, and locate the remaining judgment. A final account
may selectively present that model for its reader. A verdict must assess it against the
requested criteria rather than merely summarize it.
