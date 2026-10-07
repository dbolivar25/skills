# Handoff and implement a derivation design

Use this method when an accepted derivation design needs to become code, a stored workflow, a prompt graph, an evaluation harness or implementation tasks. A handoff request returns an implementable mapping and its verification obligations. When implementation is authorized, carry that mapping through the actual stored artifacts and consuming path. A plan is not an execution receipt.

Read the [derivation contract](../references/derivation/contract.md). The design is the semantic contract; implement it through the target system's existing models, retrieval, control flow, gates and delivery seams. Follow local conventions and ownership. Do not replace it with a universal summary object or a new framework merely to make the mapping uniform.

## Resolve readiness at the affected boundary

Check the work product, obligations, judgments, source access, fidelity, dependencies, support, relevant gates, lifetime policy and evaluation plan. Identify the exact open decision, its owner and the work it blocks. Use reversible implementation choices within task authority; do not invent missing domain answers or reopen accepted tradeoffs without material new evidence.

A partially resolved design can support independent implementation work. Keep the unresolved branch or effect gated instead of calling the whole spec ready or stalled.

## Map the design into the real system

Read [judgment DAGs and edges](../references/derivation/judgment-dags-and-edges.md) before mapping responsibilities. Assign each material judgment to the actual query, deterministic function, service, model request, tool, verifier, gate or manual/user step. Name its input/output and consuming boundary. A one-to-one node-to-agent mapping is unnecessary.

Turn material edge and intermediate contracts into the target's schemas or payloads. Preserve meaning, scope, exact fields, source handles, transformed values, uncertainty, relevant confidence weaknesses, invalidators, recomputation and allowed consumers. Distinguish a valid negative or no-match from unknown evidence and execution failure.

Keep source identity, spans or recoverable handles, permissions, timestamps, actors and object links until consumers have the fidelity they need. Check actual recovery and access rather than assuming a stored URL is sufficient. Use [information fidelity](../../writing/references/information-fidelity.md) where a representation changes or leaves context.

Read [publication and rendering](../references/derivation/publication-and-rendering.md) before implementing effects. Generation may run speculatively, but required support, access, scope, freshness and other gates control the affected display, send, persistence or action. Implement the defined fail behavior and recheck changed inputs. Read [claim support](../../review/references/claim-support.md) when confidence and support must change wording or omission; do not turn every confidence example into a compulsory schema.

Read [durable state and promotion](../references/derivation/durable-state-and-promotion.md) before choosing persistence or cross-consumer reuse. Classify persisted state by purpose and contract, then implement its invalidation, correction and maintenance path. An accepted historical result may need fresh support before reuse.

## Verify the integrated result

Read [evaluation](../../evaluation/references/evals-and-ablations.md) for semantic comparison or ablation work. Use relevant checks at the actual retrieval, judgment, transformation, gate and final-output boundaries. Include representative false positives, valid abstentions, source removal or stale reuse where those can change the result. Keep typed validity separate from semantic quality and publication readiness.

When handing off, provide responsibilities, concrete contracts, dependencies, known open decisions, verification cases and runnable checks at the scale the implementer needs. When implementing, inspect actual code or stored workflow against the accepted design, exercise the consuming behavior, repair meaningful failures and retain observations. Optimize only after the quality path is coherent, then compare the same workload without losing its protected obligations.

Warning signs include hidden judgments inside an undifferentiated prompt, one summary feeding incompatible consumers, exact values becoming prose before verification, dropped source pointers, candidate and published output sharing uncontrolled state, model confidence replacing support, and persistence without invalidators. Investigate their consequence rather than treating each shape as automatically wrong.

Finish with the requested handoff or verified implementation stage, remaining decisions and exact evidence limits. Neither a completed mapping nor passing offline checks establishes deployment, publication or production acceptance.

Source: adapted from the corresponding contract, glossary, reference, guide or template in the personal Faithful Derivation skill.
