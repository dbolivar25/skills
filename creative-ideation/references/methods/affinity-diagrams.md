# Affinity Diagrams

Jiro Kawakita, *Hassōhō* (1967). The KJ method (Kawakita's initials, Japanese order). Bottom-up procedure for finding structure in qualitative items without imposing it beforehand.

## When to use

- After volume generation when enough ideas need bottom-up grouping
- Qualitative research synthesis (interview transcripts, ethnographic notes, observations)
- Requirements gathering (pile of user requests / bug reports / suggestions)
- Sense-making after a workshop (whiteboard full of stickies)
- Bottom-up taxonomy when no good existing one fits
- Diagnosing what's missing — gaps between clusters often reveal what the data set lacks

## Don't use when

- A small set whose relationships are already easy to inspect directly
- The right structure is already known (use deductive coding)
- Time pressure — done well takes hours
- Solo without enough cognitive distance from items (you'll produce the categories you'd have produced anyway)
- Highly quantitative data (use stats)

## Procedure

1. **Atomize items.** One observation per card. Keep its source and stable identity; splitting a quote must preserve its meaning. Items should be self-contained and comparable in granularity.
2. **Make them physically separable.** Sticky notes; index cards; or a shared canvas (Miro/Mural/FigJam). Free movement matters; a list in a doc doesn't work.
3. **Spread out.** Distribute across a flat surface. No structure yet.
4. **Cluster silently in a group session.** Move items by relationships visible in the material before debating labels. If an item belongs in two places, link or duplicate it with the same source identity; the second placement is not a second independent observation.
5. **Continue until movement slows.**
6. **Name each cluster.** Specific names ("requests for offline functionality"), not generic ("technical issues"). Resist generic names.
7. **Look at orphans and gaps.**
   - Orphans: items not fitting any cluster — often the most surprising data.
   - Gaps: topics absent from this collection suggest questions such as “why didn't anyone mention X?” Absence from the sample does not establish absence in the world.
   - Cluster sizes: very large = items not differentiated enough; very small = specialized concerns worth noting.
8. **Look for relationships between clusters.** Some depend on others. Some conflict.
9. **Narrative test (Kawakita).** Write a 1–2 paragraph narrative using the cluster names to tell a coherent story about the domain. If you can't, the clusters are misapprehension.

## Worked example

Illustrative workshop: a 50-person team produces 108 distinct ideas about “what would make the codebase more maintainable.”

After 45 minutes silent clustering:

- **Dependency hygiene** (~22 items)
- **Test coverage and CI speed** (~18)
- **Documentation drift** (~14)
- **Onboarding friction** (~12)
- **Implicit knowledge** ("only Sara knows how X works") (~10)
- **Tooling fragmentation** (~9)
- **Technical debt visibility** (~8)
- **Orphans** (~7 — scattered specific concerns)

**Gap**: noticeably absent — almost no items about *production reliability*, *security review*, or *cross-team API contracts*. The team's perception of "maintainability" is internal-developer-facing; user-facing reliability is not surfaced.

**Narrative**: "Maintainability concerns cluster around (1) dependencies, (2) tests, (3) docs-code drift, with secondary concerns around onboarding and implicit knowledge. The team experiences maintainability as a developer-experience problem rather than a reliability problem."

The diagram has produced a *map of perceived maintainability problems*. Decisions about which to address require additional inputs (impact, cost, owner). But the map shows what the team thinks the problem is — and the gap is itself useful.

## Anti-slop notes

- Familiar categories can emerge from real data. Check their traceable membership and counterexamples; naming them before inspecting the items is deductive coding, which must not be presented as bottom-up discovery.
- Don't generate fake observations to populate clusters.
- Avoid generic cluster names ("things to improve", "various concerns").
- Don't compress too aggressively. Real data has variable cluster sizes (5–25 typical); uniform sizes suggest forced grouping.
- Affinity diagrams are sense-making, not proof. Clusters represent *the researcher's perception* of items, not objective truth.
- For model-assisted grouping, inspect source-to-cluster membership, ambiguous cases, and orphans with independent judgment. Surprise can prompt a reread; neither surprise nor familiar labels establish faithful synthesis.

Source: Kawakita, *Hassōhō* (Chuko Shinsho, 1967, in Japanese). Mizuno (ed.), *Management for Quality Improvement: The Seven New QC Tools* (Productivity Press, 1988).
