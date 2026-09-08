# Premortem and Inversion

Core: external steps below are proposals or supplied evidence; the operational caller executes them.


Two methods for failure-oriented ideation:
- **Premortem** — Gary Klein, *HBR* September 2007. Imagine the project has already failed catastrophically; work backwards to causes.
- **Inversion** — Charlie Munger via Carl Jacobi: *"Tell me where I'm going to die so I'll never go there."* Solve problems by figuring out how to fail and avoiding that.

Both exploit prospective hindsight (Mitchell, Russo, Pennington 1989): people generate more concrete reasons for an event when imagining it has *already happened* than when imagining it might.

## When to use

### Premortem
- Choosing between project options
- Pressure-testing a near-term decision
- Late-stage planning for a long-horizon project
- Group decisions with social pressure suppressing dissent

### Inversion
- Strategic direction choice (easier to identify clear failures than clear successes)
- Personal life decisions (career, marriage, investments, health)
- Identifying hidden anti-patterns in your own behavior
- Designing systems against adversaries (security, abuse-prevention)

## Don't use when

- Early generative phase — corrosive to fragile ideas
- You can't act on the failure modes (anxiety, not planning)
- Group lacks psychological safety to articulate fears about the leader's project
- Decisions that need urgency (premortem takes 60–90 minutes done well)

## Premortem procedure

1. **State the project as if it's complete and failed.** "It is [date 6 months from now]. We launched. The result was a complete disaster."
2. **Generate failure narratives independently.** Each member writes a paragraph describing what happened, in concrete terms. *Independence is essential* — group brainstorming surfaces socially safe concerns; independent writing surfaces uncomfortable ones.
3. **Round-robin failure causes.** Each shares one cause; no comment. Continue until exhausted.
4. **Cluster and assess.** Group similar; estimate probability and severity.
5. **Generate mitigations for the top 3.** Update the plan.
6. **Re-run periodically.** Failures unlikely at planning time may have become likely.

## Inversion procedure

1. State the goal: "I want to [original goal]."
2. Invert: "How would I guarantee the *opposite*?"
3. List 5–10 things that would guarantee the inverted goal. Be specific.
4. Self-check: which am I accidentally doing or could drift into?
5. Avoid those; return to original goal.

## Worked inversion example

**Goal**: I want my open-source project to attract sustained contributors.

**Inversion**: how would I guarantee that no one ever contributes?

1. Have no CONTRIBUTING.md or unclear norms.
2. Reject PRs without explanation, slowly.
3. Make the build hard to reproduce locally.
4. Use a tone in issue threads that makes contributors feel stupid.
5. Use a license requiring CLAs new contributors won't sign.
6. Take 6+ months to merge anything.
7. Reply to issues with one-word answers.
8. Have only the founders in the maintainer org.

**Self-check**: which am I doing? Honest answer surfaces 2–3 of these. Those are the highest-leverage fixes.

## Anti-slop notes

- Premortem slop = generic risk lists ("execution risk", "market risk"). Real premortem narrative says *specifically* what went wrong.
- Inversion slop = "do the opposite of successful people" — that's contrarianism. Real inversion identifies *specific* failure-guaranteeing actions in *your* situation.
- Don't generate fake fears. If there are no real concerns, the premortem is short.
- Don't use these to talk users out of pursuing things they should pursue. Premortem and inversion are pressure tests, not vetoes.

Source: Klein, "Performing a Project Premortem", *HBR* Sept 2007. Munger, *Poor Charlie's Almanack* (PCA, 2005).

---

# Compression Progress

Jürgen Schmidhuber, *Formal Theory of Creativity* (1990–2010). Beauty = compressibility given prior knowledge. Interestingness = the *change* in compressibility as you learn. A worthwhile project is one that, on completion, would compress your model of the world.

## Core formula

```
I(D, O(t)) = B(D, O(t)) − B(D, O(t−1))
```

Interestingness = first derivative of beauty over time. Pure noise (no learnable pattern) and fully-known pattern (already compressed) are both boring. Beauty lives between.

## When to use

- Picking a research question
- Selecting between candidate projects ("which would teach me the most?")
- Diagnosing aesthetic dissatisfaction ("this is fine but not interesting")
- Choosing what to read

## Don't use when

- Fast generation (this is reflective, not generative)
- Group decisions where audiences differ (single-observer model)

## Procedure

### For picking a research question
1. List 5–10 things you currently *cannot predict well* in your domain. Be specific: not "the future of AI", but "why X 7B model trained with technique A performs worse than Y 1.3B model with technique B on benchmark Z".
2. For each: would understanding it compress only this fact, or re-organize a broader domain? Prefer the latter.
3. For each: is the answer learnable from where you are? (Not noise; not too far above your prior.)
4. Pick the highest learnable compression-progress potential.

### For evaluating ideas
For each candidate, ask:
- What would I understand differently if this were complete?
- Would that understanding compress this domain or only this idea?
- Is it currently learnable from where I am?

Highest answers across all three = pursue.

### For aesthetic critique
Where is the work entirely predictable? (too known) Entirely unpredictable? (too random) Where does it sit in the learnable-but-not-yet-learned zone? Strong work has more of the third.

## Worked example

User has three options:
- A. Build a habit tracker.
- B. Build a tool that explains why a `git rebase --interactive` produced its conflicts, by reconstructing the commit graph mid-rebase.
- C. Read Lacan.

Analysis:
- A: no compression progress; user already has model of habit trackers. Reject.
- B: high. User doesn't currently have strong model of how rebase constructs intermediate states; building this requires learning that, and the resulting model re-organizes how the user thinks about all VCS internals.
- C: real compression-progress potential, but prior is missing. Long path to get there. Worthwhile if on the prerequisite track; otherwise read Žižek/Bruce Fink first as scaffolding.

Recommend B.

## Anti-slop notes

- "Compression progress" as slogan ≠ doing the analysis. State the actual model gaps you'd close.
- Don't claim every idea has high compression-progress. Most don't. The framework is useful because it discriminates.
- Don't impose this lens on artistic work without acknowledging its limits.

Source: people.idsia.ch/~juergen/creativity.html
