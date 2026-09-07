# First Principles

Aristotle's *protai archai*. Decompose a problem to assumptions you trust, then rebuild without inheriting anything by default. Often paired with "5 Whys" excavation of why each assumption is in place.

## When to use

- A domain has accreted practice that may no longer be load-bearing
- You're in an unfamiliar domain and bootstrapping understanding
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
2. **List assumptions in the conventional solution.** What does the standard approach take for granted? List 5–10, including ones that "go without saying."
3. **Categorize each:**
   - **Physical** — law of nature; can't be relaxed.
   - **Informational** — logical / mathematical / information-theoretic; can't be relaxed without contradiction.
   - **Conventional** — could be different; matters for compatibility.
   - **Historical** — was necessary at some point; may not be now.
   - **Pedagogical** — simplification used for teaching; may not be how experts actually do it.
4. **For each non-physical / non-informational assumption:** still load-bearing? Conventional and historical assumptions are where the gains live.
5. **Rebuild.** Construct a candidate respecting only physical and informational constraints, plus your specific context.
6. **Apply Chesterton's fence.** For each element you've removed, find the original reason it was added. If you can't find a reason, *don't conclude there isn't one* — assume you haven't looked hard enough.
7. **Decide whether to switch.** Even when the rebuild is technically better, consider transaction cost, ecosystem compatibility, team familiarity.

## Worked example

**Problem**: typical CRUD web app — login, dashboard, few CRUD entities. Conventional stack: React + Node/Express + PostgreSQL + REST API + managed platform. ~12,000 LOC, monthly hosting ~$100.

**Assumptions**:
- React: conventional, was historical (SPA promise ~2014), pedagogical (taught everywhere).
- Backend separate from frontend: conventional; informational *if* multi-client, otherwise historical.
- PostgreSQL: physical *if* concurrency/ACID required; otherwise conventional.
- REST API between frontend and backend: was informational (network boundary), now historical for single-client apps.
- Managed platform: conventional; was historical (datacenter complexity); pedagogical.

**Context**: 100 users, ~10 MB data, no real-time, single client (web), no HA constraint.

**Rebuild**:
- Server-rendered HTML + small JS islands. (No SPA. No build pipeline. No API layer.)
- SQLite single file. (No PG server. Backup = copy a file.)
- Single small VM. (No managed platform. Deploy = `rsync` + `systemctl restart`.)
- Single Go/Python/Ruby binary.

**Result**: ~1,500 LOC vs 12,000. ~$5/month vs $100. Tradeoffs: less impressive on resume, fewer contractors familiar with this style, no immediate path to 1M users.

**Chesterton's fence**: the conventional choices are load-bearing for *some* applications. The rebuild is correct *only* for this app's constraints. A different app — high concurrency, multiple clients, large data — needs different choices.

## Anti-slop notes

- The biggest slop is the *performance* of first-principles thinking. "I'm going to think from first principles" followed by a slightly-rearranged conventional answer is slop. Output should look measurably different.
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
