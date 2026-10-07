# Deployment

Use this for where software runs: environments, accounts, regions, clusters, hosts, containers, instances, and replicas. Use architecture for responsibilities and data flow for transformations.

Separate logical services from deployed instances. Record the actual environment and observation date. Versions, replica counts, ports, protocols, and resource classes appear only when known and relevant. A missing version is not a default version; a planned instance is not a running one.

Nest components within real deployment boundaries. Explain whether a boundary means network isolation, administrative ownership, geography, or scheduling. A cloud-shaped container does not prove a trust boundary. Show external systems and traffic crossing the boundary with supported direction and protocol.

When representing replicas as a stack or count badge, make clear whether the count is observed, desired, or an example. Separate redundant instances from different service roles. Keep identity links to the logical architecture if a deployment expands one service into several instances.

Verify placement, instance counts, environment, connection direction, and boundary crossings from configuration or current evidence. Inspect long host names and nested labels at the destination size. Unknown placement remains explicit rather than being assigned to a convenient box.

Reference layouts: [deployment](../../assets/example-deployment.html), [full](../../assets/index.html#example-deployment-full), [dark](../../assets/index.html#example-deployment-dark).
