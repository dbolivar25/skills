# Expert Interview

Use this guide when the domain expert knows what good looks like but the workflow
shape is not yet clear. Ask only the unresolved questions that can change the design, using available source evidence first. Translate actual expert answers into the design; do not invent answers or treat missing expertise as model certainty. Asking or sending questions through an external channel requires the task's messaging authority.

Apply the shared [derivation contract](../references/derivation/contract.md). This guide owns the
task-specific method below; read its references before their governed decisions.

## Roles

Domain Expert:

- owns the reality of the work product
- defines quality, failure modes, user value, and expert signals

Meta-Workflow Assistant:

- asks concrete questions the expert can answer
- extracts output obligations, judgments, dependencies, evidence needs, fidelity requirements, confidence structure, and eval ideas
- produces a draft derivation spec

Engineer:

- implements the DAG, retrieval, prompts or tools, node contracts, evals, persistence strategy, and runtime behavior

Reviewer:

- validates whether the workflow output is faithful, useful, and shippable

## Interview Rule

Do not ask abstract questions like "what dimensions matter?" Ask concrete questions about excellent output, bad output, source evidence, failure, and trust. Translate answers into workflow design.

## Question Bank

Start with only the questions needed to expose the next hidden fork. Do not turn the full bank into an interrogation if the answer is already available.

Work product:

- What should this output help the user do?
- When this output is excellent, what does it correctly notice?
- When this output is bad, what does it usually miss?
- What would make the user pay attention immediately?
- What should be explicitly out of scope?

Raw state:

Before this decision, read [`raw-state-and-semantics`](../references/derivation/raw-state-and-semantics.md).

- What would a skilled human look for in the raw emails, meetings, CRM, documents, tasks, product usage, or messages?
- What old context matters?
- What old context should be ignored?
- What exact facts must never be wrong?
- What wording, tone, silence, or context changes the answer?

Judgment and evidence:

Before this decision, read [`compression-and-dimensions`](../../writing/references/information-fidelity.md), [`evidence-support-and-confidence`](../../review/references/claim-support.md).

- What should the model avoid saying unless directly supported?
- What would count as strong evidence?
- What looks like evidence but is misleading?
- What alternative interpretations should remain visible?
- What contradicting evidence would change the output?

Freshness and decay:

- What makes this output stale?
- What should cause the output to disappear, downgrade, or change?
- What future event invalidates the claim or action?

Trust and rendering:

Before this decision, read [`publication-and-rendering`](../references/derivation/publication-and-rendering.md).

- What would make a user trust it?
- What would make a user dismiss it?
- When should the output be assertive, qualified, tentative, omitted, escalated, or demoted?
- What does the model tend to overstate?
- What does the model tend to miss?

False positives:

- What are subtle false positives?
- Where does politeness look like agreement?
- Where does silence look like approval?
- Where does process delay look like hesitation?
- Where do stakeholder views conflict?

## Translation Step

Before translating answers or supplied context, read the references governing
the resulting decisions even when their question-bank sections were skipped:
[raw state](../references/derivation/raw-state-and-semantics.md),
[dimensions and fidelity](../../writing/references/information-fidelity.md),
[support and confidence](../../review/references/claim-support.md), and
[publication and rendering](../references/derivation/publication-and-rendering.md).

Before this decision, read [`evals-and-ablations`](../../evaluation/references/evals-and-ablations.md).

Read the [derivation spec](../templates/derivation-spec.md) before translating the
first round. After each interview round, translate answers into:

- candidate work product contract
- output obligations
- candidate judgments
- candidate raw signals
- candidate counter-signals
- candidate dimensions
- fidelity requirements
- dependencies
- structured confidence
- publication gates
- evals and ablations
- open questions

Completion criterion: the expert reviews the translated derivation spec, not a vague brainstorm.

Source: adapted from the corresponding contract, glossary, reference, guide or template in the personal Faithful Derivation skill.
