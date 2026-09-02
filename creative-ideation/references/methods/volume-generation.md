# Volume Generation

Three traditions for producing many ideas fast:
- **Crazy 8s** — Google Ventures Sprint method. Codified in *Sprint* (Knapp et al., 2016).
- **Brainwriting 6-3-5** — Bernd Rohrbach, 1968. German design-method literature.
- **James Webb Young** — *A Technique for Producing Ideas* (1940). 60-page book; canonical advertising-copywriter manual.

## When to use

- Time pressure with a generative goal
- Group ideation (brainwriting reliably outperforms verbal brainstorming)
- Quantity-before-quality phase
- You need to produce many to find the few good ones

## Don't use when

- You don't have material yet (Young's stage 1: gather first)
- The right answer is rare and you'll know it when you see it (volume can paradoxically miss it)
- Solo with no time pressure (use deliberative methods instead)

## Crazy 8s

1. Fold a sheet into 8 panels (or use a printed grid).
2. Set a timer for **8 minutes**.
3. Sketch one idea per panel — eight ideas, one minute each.
4. Sketch, don't write. Visual format forces concretization.
5. After timer: pick 1–3 strongest panels.
6. Group share.

The first 4–5 panels are usually slop; the last 3–4 are where surprises live (the easy ideas have been exhausted).

## Brainwriting 6-3-5

Outperforms verbal brainstorming consistently in academic creativity research (Diehl & Stroebe, 1987 + many replications). Verbal brainstorming has well-documented production blocking, evaluation apprehension, and social loafing. Brainwriting eliminates all three.

1. **6 participants**, each with a sheet.
2. Each writes **3 ideas** in **5 minutes**, in a row at the top.
3. Papers rotate. Each participant now sees the previous 3 ideas; writes 3 *new* ones — building or fresh.
4. Repeat until each sheet has been seen by all 6.
5. Result: 6 × 6 × 3 = 108 ideas in 30 minutes.

## James Webb Young — 5 stages

Honest about the *temporal* structure of idea formation. Most methods assume ideas come on demand; Young's account is that they often don't, and the work is upstream.

1. **Gather material.** Specific *and* general material. Most idea-generators fail here. *"Just one more idea about the product, just one more bit of factual material — many a time these have made all the difference."*
2. **Mentally digest.** Turn the material over. Make tentative partial connections. Don't reach for a final idea.
3. **Drop it.** Stop working. Sleep, walk, watch a movie. The unconscious works on it.
4. **The idea arrives.** Often during a shower or walk. *"It will come to you when you are least expecting it."*
5. **Shape and develop.** The arriving idea is half-formed. Subject it to actual scrutiny.

The drop stage is non-negotiable. Compressing it back into 1→2→4 produces incomplete ideas.

## Seeded Range

Use when an AI produces several candidates that are cosmetically varied but
structurally identical. The seed distributes a batch across different regions;
it does not decide which result is good.

1. **Lock the invariant brief.** Hold the user, purpose, required content,
   constraints, and quality floor constant across the batch. Randomness must not
   rewrite the problem.
2. **Choose the range axes.** Name the dimensions on which meaningful difference
   can appear: sequence, composition, density, relationship, material,
   interaction, mechanism, voice, or another domain-specific structure.
3. **Draw one real seed per direction.** Use an external random source: a random
   noun, object, place, artwork, physical mechanism, reference, or random indices
   into explicit axis-value lists. Prefer semantic stimuli or procedural
   assignments over an opaque string. An opaque value may identify the run, but
   leaves the model free to invent a familiar interpretation after the fact.
4. **Translate before making.** Record `seed → stimulus → forced decisions`.
   State which range axes the stimulus changes and how. If the translation does
   not force a structural decision, draw again.
5. **Generate independently.** Give each direction only its invariant brief and
   its own translation. Do not let later directions imitate or merely restyle
   earlier ones.
6. **Compare after the batch exists.** Reject directions that violate the brief
   or differ only cosmetically. Select with domain judgment, then deepen the
   winner through the appropriate development method.

For every surfaced direction, report the seed or random draw, its stimulus, the
structural decisions it forced, what remained invariant, and its likely failure
mode. Completion criterion: each surviving direction differs on at least two
named range axes while satisfying the same invariant brief.

## When to use which

| Time available | Group size | Use |
|---|---|---|
| 8 minutes | Solo | Crazy 8s |
| 8 minutes | Group | Crazy 8s + share |
| 30 minutes | Solo | Crazy 8s + 22 min elaboration |
| 30 minutes | Group of 4–8 | Brainwriting 6-3-5 |
| 1 hour | Group | Brainwriting + 30 min affinity diagram |
| 1 day | Solo | Young stages 1–3 |
| 1 week | Solo or small group | Full Young 5 stages |
| One AI-generated batch | Solo or small group | Seeded Range |

## Anti-slop notes

- **Volume of equal quality is not volume.** Eight panels of identical structure is one idea drawn eight times. Force divergence by applying different generative methods to different panels.
- **Entropy is not direction.** A random token with no recorded translation can
  become a post-hoc excuse for the model's default taste. Make the stimulus and
  forced decisions inspectable.
- **Randomness creates candidates, not verdicts.** Preserve the invariant brief
  and use human or domain judgment to select what earns depth.
- Don't pad to round numbers. If only 5 of the 8 panels produced anything, surface 5.
- Surface 1–3 to the user, not all 8 / all 108.
- Don't conflate volume with depth. Volume is breadth-first; depth comes later with elaboration methods.
- Respect Young's drop stage. Rushing from gather → idea in one session usually fails.

Sources: Young, *A Technique for Producing Ideas* (Advertising Publications, 1940); Rohrbach, "Methode 635" (*Absatzwirtschaft* 12, 1968); Knapp et al., *Sprint* (Simon & Schuster, 2016).
