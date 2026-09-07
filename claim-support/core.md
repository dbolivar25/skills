# Claim support core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Claims or candidate actions, purpose/audience, supplied source content and provenance, scope, freshness context, consequence of error.

Return a support assessment, not permission to publish or perform an action.

Read [evidence and confidence](references/evidence-and-confidence.md) before
assessing support. Its examples specialize the method to AI work products;
apply only the confidence dimensions that govern the current claim.

1. **Pin the claim.** Separate assertions that could be independently false.
   Identify who, what, when and where each applies and the decision it informs.
   A plausible sentence is not its own evidence.
2. **Assess supplied support.** Inspect supplied source content, retain its provenance,
   and distinguish direct observation from inference. Examine supplied counterevidence and alternative interpretations, not only
   confirmation; request a scoped counterevidence search when coverage is missing.
   A pointer without content creates an evidence need; name the required span,
   scope and why it matters. Do not invent access or treat a planned query as a result.
3. **Assess each weakness.** Check evidence sufficiency, source quality, scope,
   freshness, interpretation and contradiction status. Preserve the reasons;
   averaging them into one confidence score hides what the caller must decide.
4. **Return a support package.** For each claim give the supported statement,
   source pointers, relevant uncertainty, contradictions, missing evidence and
   justified assertiveness: assert, qualify, tentative, or omit. Keep supported
   components when another component remains uncertain.

For a proposed action, support for its factual premise does not establish that
it is authorized, appropriate for this recipient, or ready to execute. The
caller applies its own publication and action gates. Do not change the claim
silently to make it pass: explain any narrowed scope or qualification.

Finish when every consequential claim has evidence or an explicit gap, and a
reader can recover why its confidence and wording differ from neighboring claims.
