# Process diagrams

Use this to explain actions, their ordering, and handoffs toward an outcome. Use [flowchart](flowchart.md) for branching decisions, [swimlane](swimlane.md) for responsibility handoffs, or [data flow](data-flow.md) when payloads and transformations matter more than actions.

Name the actual stages in their real order. Record who acts, what starts the stage, what is done, and what leaves it. A simple linear layout works only if the process is linear. Preserve branches, retries, skipped stages, shared work, and loops that affect the reader's task. Never swap step assignments to eliminate crossings.

A stage framework can align input, work, and output under each stage. Use those slots when they answer the question; do not populate them with invented tools or repeat every stage name as an action. An empty slot may mean unknown, absent, or not applicable. Show that distinction where readers could otherwise infer a missing responsibility. Initial inputs and final outputs remain meaningful even when they have no preceding or following stage.

Keep step identity separate from role labels and artifact chips. Use full names or a declared local abbreviation legend. Show a tool only where its use is supported. Highlighting a bottleneck or recommended change requires evidence and a stated current-versus-proposed distinction, not an automatic single accent node.

Route edges after ordering is settled. If the complete process is too dense, choose a scoped view with a named omission ledger or separate a main path from exceptions, keeping their rejoining points identifiable.

Verify one ordinary execution and relevant exceptions against the source. Check actors, inputs, outputs, stage order, decisions, feedback, and endpoint visibility in the final artifact.

Reference layouts: [process](../../assets/example-process.html), [full](../../assets/index.html#example-process-full), [dark](../../assets/index.html#example-process-dark). Fixed cell dimensions and sample counts are optional layout starting points.
