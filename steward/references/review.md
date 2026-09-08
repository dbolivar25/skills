# Review a reported result

Before accepting a reported result, give it to a separate agent to look for
evidence that it is wrong, insufficient, or inconsistent with Intent. Review
should reveal what needs to change before other work relies on the result.

Use [critique](../../critique/SKILL.md) for the falsification method. These instructions
define the work context, review criteria, response format, and acceptance boundary.
Critique returns an assessment; the stewarding agent records acceptance.

## Give the reviewer context

Give the reviewer only the context needed to falsify the candidate:

- current Intent, including applicable Rule versions and Non-goals;
- current Record revision;
- relevant State and governing Claims;
- phase, responsibility, actor, result, and evidence;
- material changes since the work began;
- the applicable review criteria below.

Ask for evidence-backed findings. Do not ask the reviewer to rewrite the result,
continue execution, schedule agents, or decide an owner-owned question.

## Select the criteria for this responsibility

For `UNDERSTAND` and `PLAN`, apply both the shared criterion and the criteria
for that responsibility. For `EXECUTE`, apply its criteria.

### Understand and Plan

Check:

- **Premature decisions:** did the result settle an unknown, authority question,
  or implementation choice before a decision was needed? Judge that need against
  Intent, current State, evidence, safety, constraints, and the next commitment.
  If a viable alternative was excluded without that need, return `AT_RISK` or
  `VIOLATED` and name it.

### Understand

Check:

- **Owner meaning:** did the result preserve the request, Why, behavior specs,
  and higher-level context?
- **Reality fit:** were current authoritative sources checked?
- **Premise quality:** are claims supported, contradicted, or overstated?
- **Coverage:** are material unknowns, forks, and authority boundaries visible?
- **Enough to proceed:** can the proposed next commitment follow from this
  understanding without silently deciding unresolved questions?

### Plan

Check:

- **Intent fit:** does the path advance Aim and avoid Non-goals?
- **Support:** does each consequential commitment follow from accepted
  understanding rather than inherited assumptions?
- **Codebase or system fit:** does the plan use the real seams, conventions, and
  operational boundaries?
- **Authority:** are owner and external decisions kept with their owners?
- **Closure:** are verification, delivery, and landing obligations explicit?
- **Proportionality:** is the plan no broader or more ceremonial than the real
  uncertainty requires?

### Execute

Check:

- **Implementation scope:** does the implementation add specificity, generality,
  defensive behavior, or breadth beyond what Intent, accepted understanding and
  plan, relevant conditions, and codebase fit require?
- **Correctness:** does the result work under the relevant conditions?
- **Codebase fit:** does it match current architecture, conventions, and supported
  APIs?
- **Request fit:** does it satisfy the expressed request?
- **Mission fit:** does it advance Aim and Why rather than merely complete the
  local task?
- **Behavior fit:** does actual conduct and output satisfy applicable behavior
  specifications?
- **Evidence:** are claims scoped to what was actually tested or observed?
- **Landing:** are local verification, CI, merge, deployment, and observed
  outcome kept distinct?

## Return the judgment

Return one review judgment:

```json
{
  "status": "ADHERES | AT_RISK | VIOLATED | UNCERTAIN",
  "evidence": ["Specific observation tied to the candidate and Intent."],
  "confidence": "LOW | MEDIUM | HIGH"
}
```

- `ADHERES`: no material defect was found on the requested criteria.
- `AT_RISK`: a concrete weakness may cause drift or failure.
- `VIOLATED`: evidence shows the result conflicts with Intent or reality.
- `UNCERTAIN`: evidence is insufficient to judge safely.

Evidence must name what the reviewer checked and any known material source or
requested criterion left unchecked. Return `ADHERES` only after checking every
requested criterion. Confidence measures the evidence behind the status. `HIGH`
requires authoritative evidence for the judgment and every material finding.
Lower confidence when support is indirect or incomplete. Return `UNCERTAIN`
when missing evidence prevents a safe judgment.

## Review at the right time, with a separate actor

Every `work.reported` result requires a separate reviewer before acceptance.
Use an additional early review when a material doubt appears, before
broad dependent work, before an irreversible action, or before a completion
claim. Early review can send evidence to the active worker; it does not complete
the work item.

Prefer a fresh reviewer when accumulated context could normalize the candidate's
assumptions. A retained reviewer is acceptable when domain context is essential
and it did not produce the reported result.

If no separate agent is available, do not self-grade a consequential result as
accepted. Keep it in review, record the uncertainty, and continue only work that
does not depend on that acceptance.
