# Sequence diagrams

Use this for ordered messages among participants, including branches, repetition, and control. The vertical axis usually shows order, not elapsed time. A scaled timing diagram must say so explicitly.

Retain participant identity, message source and target, label, order, and arrow semantics from the source. A synchronous call, asynchronous signal, reply, and undirected relation differ. Follow the selected formal notation or supply a legend for a custom one. Color is supplementary; it must not turn a reply into a call or change direction.

Preserve meaningful fragments such as alternative, optional, loop, parallel, critical, and break regions, including guards and the messages they enclose. Notes attach to their actual participants and point in the sequence. Creation, destruction, activation, and deactivation matter when the source uses them; do not omit them as decoration during a faithful conversion.

Arrange lifelines for readability while keeping message order intact. Self-messages need recognizable loops. For a large interaction, scope a view or split at explicit continuation points instead of enforcing a fixed participant or message limit.

Check the ordinary path, branch guards, parallel regions, retries, replies, and lifecycle events against the source. Inspect fragment nesting, note placement, label collisions, and arrowheads at delivery size. Import helpers provide only part of this information; consult the source and their coverage report before reproducing a sequence.

Reference layouts: [sequence](../../assets/example-sequence.html), [full](../../assets/index.html#example-sequence-full), [dark](../../assets/index.html#example-sequence-dark).
