# Composing skills

A skill owns a useful result. Its `SKILL.md` is the interface for direct use and
for other skills. The caller supplies purpose, material and constraints; the
skill hides the method needed to produce its result. Read required references
before the judgment they govern. A small interface can have a deep implementation.

## Core skills

A core skill reasons over supplied context and returns an assessment,
transformation, design or next evidence need. It can read its own methods and
packaged knowledge, and compose other core skills with the inputs they require.
It does not fetch task-specific live sources, run commands or tests, mutate
files, dispatch agents, ask the user directly, or wait for answers.

Return useful partial work when information is missing. Name the exact input,
the conclusion it affects and the observation that would settle it. A source
pointer is not source content; an unavailable fact is not false. When evidence
cannot settle a tradeoff, return the owner decision, alternatives and recommendation.
Use the result's natural form rather than a compulsory envelope or visible ritual.
An evidence need may name an operational method for the caller to use. Returning
that route does not invoke the method or transfer execution into the core.

## Operational callers

A workflow or the surrounding agent task owns acquisition and effects. Obtain
the context a selected core needs, supply it, and resolve obtainable evidence
needs before returning the result. Reuse current source already in context.
When the user gives a path or URL, the operational caller reads it; do not make
the user assemble inputs the task can obtain.

A workflow can delegate a bounded investigation or platform operation to another
operational skill. Supply its purpose, scope, existing evidence and authority;
consume the result without managing that skill's internal steps. Supporting
work returns to its caller. It does not take over the parent task.

Own retries, waits, cancellation, cleanup and observation. Ask only for missing
access or owner judgment; elapsed time supplies neither. After an unchanged
acquisition failure, preserve the supported limit and continue independent work
instead of repeating the same request.

## Integration

Select dependencies when their result can change the work. A dependency list is
not a mandatory pipeline. Skills may compose several levels of useful capabilities;
loading a skill does not itself require another agent or a context handoff.

Carry source identity, relevant revision, scope, freshness and acquisition limits
with results. A later observation can invalidate a premise: refresh affected
judgments and retain unaffected support. Keep factual disagreements and owner
tradeoffs distinct; reconcile reasons rather than averaging verdicts.

The composing caller owns the combined outcome. Before a freshness-sensitive
effect, recheck its source and reassess affected conclusions. A recommendation
does not grant authority, and one requested operation does not authorize another.
Return receipts for the stage actually observed: drafting, checks, publication,
delivery and the resulting behavior establish different things.

Keep a method private when its responsibility is coupled to its workflow.
Expose a separate skill when it offers an independently useful result. Core
dependencies stay within core skills and passive knowledge; they do not invoke
their operational callers. Feedback belongs to the workflow's observation loop.

These are instruction responsibilities, not an enforced tool sandbox or a promise
of deterministic model output.
