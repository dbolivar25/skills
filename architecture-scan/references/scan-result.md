# Scan result contract

Begin with a concise scan summary: candidate boundary, evidence halo, covered
inventory categories, governing context/decision sources and material exclusions.
This states the universe in which the ranking means anything.

For each surviving candidate, use:

```md
### <Candidate> — <Strong | Worth exploring>

- **Standards:** <applicable principle names>
- **Files/modules:** <path:line citations>
- **Current friction:** <caller burden, risk, duplicated policy, leakage or test friction>
- **Evidence:** <concrete trace, repetition, invalid state path or test contortion>
- **Ownership move:** <current owner/callers> -> <proposed owner>
- **Expected leverage:** <burden/risk removed relative to introduced machinery>
- **Existing test evidence:** <test path:line, or none found>
- **Verification seam:** <public interface or real adapter that would test the move>
- **Evidence gap:** <required for Worth exploring; exact source-unverifiable claim>
- **Context/ADR note:** <only for a durable term, conflict or decision>
```

Cite representative evidence rather than every occurrence. Conclude a nonempty
ranking with the top recommendation, why its leverage is greatest, and the
candidate-selection question. For zero candidates, give the evidence-backed
reason none survived and omit both recommendation and specification prompt.
