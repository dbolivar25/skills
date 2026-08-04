# Sharpening Contract

Sharpening is an adversarial pass by a separate agent before a phase result is
accepted. Its purpose is faster recognition of drift, not ceremony.

## Reviewer Input

Give the reviewer only the context needed to falsify the candidate:

- current Intent, including applicable Rule versions and Non-goals;
- current Record revision;
- relevant State and governing Claims;
- phase, responsibility, actor, result, and evidence;
- material changes since the work began;
- the requested review axes below.

Ask for evidence-backed findings. Do not ask the reviewer to rewrite the result,
continue execution, schedule agents, or decide an owner-owned question.

## Phase Axes

### Understand And Plan

Try to falsify:

- **surplus specificity:** does the result close a material unknown, authority
  fork, or implementation choice that current Intent, State, evidence, safety,
  real constraints, or phase sufficiency does not require closing? If so, return
  `AT_RISK` or `VIOLATED` and cite the excluded live alternative.

### Understand

Try to falsify:

- **owner meaning:** did the result preserve the request, Why, behavior specs,
  and higher-level context?
- **reality fit:** were current authoritative sources checked?
- **premise quality:** are claims supported, contradicted, or overstated?
- **coverage:** are material unknowns, forks, and authority boundaries visible?
- **phase sufficiency:** is there enough understanding to make the proposed next
  commitment without silently planning through ambiguity?

### Plan

Try to falsify:

- **intent fit:** does the path advance Aim and avoid Non-goals?
- **support:** does each consequential commitment follow from accepted
  understanding rather than inherited assumptions?
- **codebase or system fit:** does the plan use the real seams, conventions, and
  operational boundaries?
- **authority:** are owner and external decisions kept with their owners?
- **closure:** are verification, delivery, and landing obligations explicit?
- **proportionality:** is the plan no broader or more ceremonial than the real
  uncertainty requires?

### Execute

Try to falsify:

- **implementation proportionality:** is the implementation no more specific,
  general, defensive, or broad than current Intent, accepted understanding and
  plan, relevant conditions, and codebase coherence require?
- **correctness:** does the result work under the relevant conditions?
- **codebase fit:** does it match current architecture, conventions, and supported
  APIs?
- **request fit:** does it satisfy the expressed request?
- **mission fit:** does it advance Aim and Why rather than merely complete the
  local task?
- **behavior fit:** does actual conduct and output satisfy applicable behavior
  specifications?
- **evidence:** are claims scoped to what was actually tested or observed?
- **landing:** are local verification, CI, merge, deployment, and observed
  outcome kept distinct?

## Output

Return one review judgment:

```json
{
  "status": "ADHERES | AT_RISK | VIOLATED | UNCERTAIN",
  "evidence": ["Specific observation tied to the candidate and Intent."],
  "confidence": "LOW | MEDIUM | HIGH"
}
```

- `ADHERES`: no material defect was found on the requested axes.
- `AT_RISK`: a concrete weakness may cause drift or failure.
- `VIOLATED`: evidence shows the result conflicts with Intent or reality.
- `UNCERTAIN`: evidence is insufficient to judge safely.

Absence of a finding is not proof. Confidence describes the review's evidence,
not the reviewer's tone.

## Timing And Independence

Every `work.reported` result requires a separate reviewer before acceptance.
Use an additional early sharpening pass when a material doubt appears, before
broad dependent work, before an irreversible action, or before a completion
claim. Early review can send evidence to the active worker; it does not complete
the work item.

Prefer a fresh reviewer when accumulated context could normalize the candidate's
assumptions. A retained reviewer is acceptable when domain context is essential
and it did not produce the reported result.

If no separate agent is available, do not self-grade a consequential result as
accepted. Keep it in review, record the uncertainty, and continue only work that
does not depend on that acceptance.
