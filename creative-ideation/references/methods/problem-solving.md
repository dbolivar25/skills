# First Principles

Aristotle's *protai archai*. Decompose a problem to assumptions you trust, then rebuild without inheriting anything by default. Often paired with "5 Whys" excavation of why each assumption is in place.

## When to use

- A domain has accreted practice that may no longer be load-bearing
- You're building enough domain understanding to inspect its assumptions
- You suspect the standard framing is wrong
- Trying to reduce cost or complexity (accumulated overhead is often the main cost)
- Teaching the domain (first-principles reconstruction surfaces what beginners actually need)

## Don't use when

- You don't know the domain well enough — first principles applied by an outsider produces confidently wrong answers
- Transaction costs of replacement exceed the gains
- Problem is irreducible (aesthetic, social, gestalt — decomposition destroys what makes it coherent)
- You're trying to seem original — performance of first-principles thinking is slop

## Procedure

1. **State the problem precisely.**
2. **List consequential assumptions in the conventional solution.** Include ones that “go without saying.” Follow the actual mechanism rather than filling a quota.
3. **Categorize each:**
   - **Physical** — law of nature; can't be relaxed.
   - **Informational** — logical / mathematical / information-theoretic; can't be relaxed without contradiction.
   - **Operational contract** — a required outcome, authority boundary, compatibility promise, or reliability condition. A conventional mechanism may change while this demand remains.
   - **Conventional** — could be different; matters for compatibility.
   - **Historical** — was necessary at some point; may not be now.
   - **Pedagogical** — simplification used for teaching; may not be how experts actually do it.
4. **For each non-physical / non-informational assumption:** still load-bearing? Conventional and historical assumptions are where the gains live.
5. **Rebuild.** Preserve physical and informational constraints and the real operational contracts. Question the mechanism used to meet them. A requirement does not disappear because its current implementation is conventional.
6. **Apply Chesterton's fence.** For each element you've removed, find the original reason it was added. If you can't find a reason, *don't conclude there isn't one* — assume you haven't looked hard enough.
7. **Decide whether to switch.** Even when the rebuild is technically better, consider transaction cost, ecosystem compatibility, team familiarity.

## Worked example

**Illustrative problem**: a small CRUD web app with login, a dashboard, and a few entities. Its current design uses React, Node/Express, PostgreSQL, a REST boundary, and a managed platform. The question is whether each separate mechanism serves this app's actual requirements.

**Assumptions**:
- React: conventional, was historical (SPA promise ~2014), pedagogical (taught everywhere).
- A separate backend and API are mechanisms. Multiple clients, trust boundaries, deployment ownership, or compatibility may make a distinct interface useful; client count alone does not decide.
- Durability, transactions, and concurrent writes are operational contracts. PostgreSQL is one way to meet them, not a physical law. Verify another database against the actual workload.
- A network boundary still needs a protocol even when there is one client. A separate REST service may be unnecessary when the server renders the application and owns its effects.
- A managed platform is a mechanism; uptime, recovery, secret handling, maintenance effort, and deployment requirements remain real.

**Context**: 100 users, ~10 MB data, no real-time, single client (web), no HA constraint.

**Rebuild**:
- Server-rendered HTML + small JS islands. (No SPA. No build pipeline. No API layer.)
- SQLite may remove a database service if its concurrency and recovery behavior fit. Use its [documented backup mechanisms](https://www.sqlite.org/backup.html); a casual copy during writes does not establish a recoverable snapshot.
- Single small VM. (No managed platform. Deploy = `rsync` + `systemctl restart`.)
- Single Go/Python/Ruby binary.

**Decision**: this candidate may reduce moving parts, but the example supplies no measured code-size or cost result. Compare the actual implementation, operating burden, deployment/recovery path, and team familiarity before switching. The simpler topology still needs authentication, transactions, backups, and the requested reliability.

**Chesterton's fence**: the conventional choices are load-bearing for *some* applications. The rebuild is correct *only* for this app's constraints. A different app — high concurrency, multiple clients, large data — needs different choices.

## Anti-slop notes

- Performing a first-principles label without inspecting assumptions adds little. The analysis may validate the existing design; novelty is not proof that the operation happened.
- Don't claim first principles when you're applying common sense.
- Avoid the engineer-hero archetype. Real first principles often reveals what the field already knows.
- Don't recommend removing structure you don't understand. Chesterton's fence applies hard.

---

# Pólya's Heuristics

George Pólya, *How to Solve It* (Princeton UP, 1945). Four-phase problem-solving framework + dictionary of heuristic moves. Written for math but applies to any well-defined "find X such that..." problem.

## When to use

- Math, physics, theoretical problems
- Algorithm design, debugging
- Any problem with a clear target (find X such that...)
- Teaching problem-solving

## Don't use when

- Open-ended creative problems with no defined target
- Difficulty is *understanding the problem space*, not solving within it (use dérive or compression-progress first)
- Solution is more about taste than analysis
- Real-world problems where data is incomplete and conditions vague

## The four phases

### 1. Understand the problem
- What is the **unknown**?
- What are the **data**?
- What is the **condition** linking them?
- Is the condition sufficient? Insufficient? Redundant? Contradictory?
- State in your own words.
- Draw a figure. Introduce notation.

This phase is most often skipped. **Most problem-solving failures are upstream of method** — they're failures to understand the problem precisely.

### 2. Devise a plan
Find the connection between data and unknown. Heuristic moves:
- **Have you seen this problem before?** Or in slightly different form?
- **Do you know a related problem?**
- **Look at the unknown** — find a familiar problem with the same or similar unknown.
- **Could you use a related problem's result? Its method?**
- **Restate.**
- If you can't solve the proposed problem, solve a related one:
  - More general
  - More specific
  - Analogous
  - A part of the problem
  - With a condition relaxed
- **Did you use all the data?** All the conditions?

### 3. Carry out the plan
- Can you see clearly that each step is correct?
- Can you prove it?

### 4. Look back
- Check the result. Check the argument.
- Can you derive it differently? See it at a glance?
- Can you use the result, or the method, for some other problem?

The looking-back phase is the *learning* phase — what makes Pólya's method an *educational* method, not just a problem-solving one.

## Key heuristics from the dictionary

- **Decompose and recombine.** Break into parts; solve each; combine.
- **Generalization.** The general case is sometimes easier than the specific because it forces you to identify essential structure.
- **Specialization.** Try the smallest case, the simplest case, the case where one parameter is zero. Look for pattern.
- **Analogy.** Find a related problem with same structure, different surface.
- **Auxiliary problem.** Solve a related problem first; use its result.
- **Working backwards.** Start from the unknown and work back. Forward direction often has too many branches; backward is more constrained.
- **Setting up an equation.** Most word-problem failure is in translation, not algebra.
- **Reductio ad absurdum.** Assume the conclusion is false; derive contradiction.
- **Pattern recognition.** Small cases → conjecture → prove.
- **Symmetry.** Where there's symmetry in the problem, there's usually symmetry in the solution.

## Anti-slop notes

- Reciting the four phases without doing them = slop. The structure is fine; the value is in actually executing each phase.
- Don't pretend you've understood when you haven't. State the unknown, the data, the condition concretely.
- Don't claim "Pólya'd it" without consulting specific heuristics.
- Don't apply to fuzzy problems. Pólya assumes clear problem statements.

Source: Pólya, *How to Solve It* (Princeton UP, 1945; current edition 2014).
