# State machines

Use this for states and allowed transitions. Distinguish a state from an action performed during a transition.

Preserve start and end markers, event, guard, and action where the source supplies them. Show self-loops, composite states, global timeouts, and exceptions in their actual scope. A transition count limit is not a reason to drop valid behavior. An unreachable or unspecified state may be an important finding, not disposable clutter.

Arrow direction defines the allowed transition. Label guards clearly enough to distinguish competing paths. Unknown behavior remains explicit. Arrange for readability without changing the state graph.

Walk representative event sequences and boundary conditions against the source. Check outgoing guards, retry paths, terminal states, and nested scope. Inspect labels and arrow endpoints at the delivered size.

Reference layouts: [state](../../assets/example-state.html), [full](../../assets/example-state-full.html), [dark](../../assets/example-state-dark.html).
