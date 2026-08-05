# Routing Heuristics

Decision tree for picking a method. Read top to bottom; first match wins.

**T&P** means the named section in `methods/transform-and-provoke.md`.

## Phase signals — what stage is the user in?

| Signal | Method |
|---|---|
| Blank page, no domain | constraint dispatch (`full-prompt-library.md`) |
| Has a domain, no project | route by domain (next section) |
| Has one idea, want variations | **T&P: SCAMPER** |
| Need many ideas fast | `methods/volume-generation.md` |
| Idea too safe | **T&P: Lateral Provocations** |
| Many ideas, need to choose | `methods/premortem-and-inversion.md` |
| Have idea, want to sharpen | `methods/creative-discipline.md` (Tharp's spine) |
| Stuck mid-project | **T&P: Oblique Strategies** |
| "Is this any good?" | `methods/premortem-and-inversion.md` + `methods/compression-progress.md` |

## Domain signals

| Domain | Method |
|---|---|
| Fiction with formal interest | **T&P: OuLiPo** |
| Narrative with story shape | `methods/story-skeletons.md` |
| Essay / non-fiction | **T&P: Defamiliarization** + `methods/compression-progress.md` |
| Poetry | **T&P: OuLiPo** or **Chance and Remix** |
| Lyrics / songwriting | **T&P: Oblique Strategies** + **Chance and Remix** |
| Music / sound | **T&P: Oblique Strategies** (origin domain) |
| Visual art / sculpture / installation | **T&P: Oblique Strategies** + `methods/creative-discipline.md` (LeWitt) |
| Performance / theater | **T&P: Defamiliarization** (Brecht) |
| Site-specific | `methods/derive-and-mapping.md` |
| Engineering invention | `methods/triz-principles.md` |
| Software architecture | `methods/pattern-languages.md` |
| Algorithm / data structure | `methods/polya.md` + `methods/first-principles.md` |
| Civic / policy | `methods/leverage-points.md` |
| Org design | `methods/leverage-points.md` + `methods/pattern-languages.md` |
| Research / picking a question | `methods/compression-progress.md` |
| Attacking a known problem | `methods/polya.md` + `methods/first-principles.md` |
| Product strategy / why-does-this-exist | `methods/jobs-to-be-done.md` |
| New venture from scratch | `full-prompt-library.md` "solve your own itch" + `methods/jobs-to-be-done.md` |
| Career / what to study | `methods/derive-and-mapping.md` + `methods/compression-progress.md` |
| Habit / discipline | `methods/creative-discipline.md` |

## Mood / tone signals

| User wants | Method |
|---|---|
| Beautiful / elegant | `methods/compression-progress.md` |
| Weird / strange | **T&P: Pataphysics** + **Chance and Remix** |
| Useful / practical | `methods/triz-principles.md`, `methods/jobs-to-be-done.md`, "solve your own itch" |
| Fun / playful | **T&P: OuLiPo** + **Oblique Strategies** |
| Serious / rigorous | `methods/polya.md`, `methods/first-principles.md`, `methods/compression-progress.md` |
| Personal / intimate | `methods/creative-discipline.md`, `methods/derive-and-mapping.md` |
| Political / intervention | `methods/leverage-points.md` + **T&P: Chance and Remix** (détournement) |
| Critical / subversive | **T&P: Defamiliarization** + **Pataphysics** |

## When to stack methods (rare)

Most invocations: one method. Stack only when:

- **Domain method + provocation.** OuLiPo + de Bono PO when the constraint alone produces predictable output.
- **Generation + selection.** Crazy 8s → premortem on top three.
- **Drift + pattern.** Dérive then affinity-map.
- **Theoretical + practical.** TRIZ identifies the contradiction → biomimicry supplies the analog.

**Anti-pattern:** stacking three+ methods. Becomes process performance rather than ideation.

## Edge cases

- **Wild prompt that fits no path** → constraint dispatch with the closest matching constraint.
- **User asks for method recommendation, not ideas** → surface 2–3 candidate methods, ask which to apply. Don't silently default.
- **High-slop terrain** ("AI ideas", "startup ideas", "habit tracker") → force **T&P: Lateral Provocations** or **Pataphysics** over the obvious method. Refuse the first 5 ideas, not 3.
- **Same question asked again** → switch methods. Variation in method = variation in idea distribution.
- **User frustrated / says everything is bad** → don't keep generating. `methods/creative-discipline.md` (Cleese open mode, Tharp scratching). Sometimes the right move is to stop ideating.
- **User wants to be talked out of starting** → premortem. Inversion. Sometimes the right answer is "don't do this".

## Anti-patterns

1. Defaulting to constraint dispatch when the user has rich domain signals. Read first.
2. SCAMPER without a base idea. SCAMPER amplifies; doesn't generate from nothing.
3. TRIZ on artistic or social problems. Its parameters are physical/engineering.
4. Leverage points on a single-creator project. Overkill — Meadows is for multi-actor systems.
5. Reaching for the most exotic method to seem sophisticated. Constraint dispatch is right most of the time.
6. Stacking methods to compensate for not picking well. Bad choice + bad choice ≠ better choice.
7. Generating finished work when the user asked for direction. Wait until they pick.
