# Icon lookup

Find the required name below, then use [targeted source retrieval](asset-sources.md) to read only that SVG. Use it as a recognition aid beside a meaningful text label. An icon does not establish a system's function, deployment, trust, or permission.

Each named source is a complete standalone SVG, stored in the gallery catalog and recoverable with its original bytes, geometry, and IDs. Generic icons are usually stroked; brand silhouettes are usually filled. Most use currentColor, but some supplied brand assets contain fixed paints. Inspect the chosen asset before recoloring. Refer to [attribution](../assets/icons/ATTRIBUTION.md) for source and license information; direct-fetch assets still have unresolved licenses rather than a blanket redistribution claim.

Inline the selected SVG's children or use the standalone file as an image. Preserve its viewBox and scale uniformly. A CSS color on a parent affects currentColor only when the SVG is inline; an external image does not inherit the page's color. When several copies are inlined, namespace IDs and their matching fragment references to avoid collisions. Do not rename original catalog IDs in the library itself.

Decorative icons can remain aria-hidden when nearby text supplies their meaning. If an icon carries unique meaning, provide an accessible name in the enclosing figure or control. Inspect the actual size, paint, alignment, theme, and export.

The [icon gallery](../assets/icons.html) preserves the original visual examples. It is useful for browsing, while the index below gives targeted source lookup without loading every SVG into context.

| Name | Use | Retained source and license label |
| --- | --- | --- |
| [laptop](../assets/icons.html#icon-laptop) | User laptop or workstation. | Tabler Icons / `device-laptop` (MIT) |
| [phone](../assets/icons.html#icon-phone) | Mobile phone or tablet client. | Tabler Icons / `device-mobile` (MIT) |
| [desktop](../assets/icons.html#icon-desktop) | Desktop computer. | Tabler Icons / `device-desktop` (MIT) |
| [server](../assets/icons.html#icon-server) | Physical server or VM host. | Tabler Icons / `server` (MIT) |
| [container](../assets/icons.html#icon-container) | Container image or running instance. | Tabler Icons / `package` (MIT) |
| [vm](../assets/icons.html#icon-vm) | Virtual machine. | Tabler Icons / `cube` (MIT) |
| [user](../assets/icons.html#icon-user) | End user or single actor. | Tabler Icons / `user` (MIT) |
| [users](../assets/icons.html#icon-users) | Group / cohort / team. | Tabler Icons / `users` (MIT) |
| [admin](../assets/icons.html#icon-admin) | Privileged user / admin. | Tabler Icons / `user-shield` (MIT) |
| [robot](../assets/icons.html#icon-robot) | Bot, agent, or automated process. | Tabler Icons / `robot` (MIT) |
| [cloud](../assets/icons.html#icon-cloud) | Cloud provider or boundary. | Tabler Icons / `cloud` (MIT) |
| [internet](../assets/icons.html#icon-internet) | Public internet. | Tabler Icons / `world` (MIT) |
| [cdn](../assets/icons.html#icon-cdn) | CDN or edge cache. | Tabler Icons / `world-www` (MIT) |
| [firewall](../assets/icons.html#icon-firewall) | Firewall or perimeter control. | Tabler Icons / `wall` (MIT) |
| [vpn](../assets/icons.html#icon-vpn) | VPN or encrypted tunnel. | Tabler Icons / `shield-lock` (MIT) |
| [load-balancer](../assets/icons.html#icon-load-balancer) | Load balancer / traffic split. | Tabler Icons / `arrows-split` (MIT) |
| [gateway](../assets/icons.html#icon-gateway) | API gateway or ingress door. | Tabler Icons / `door-enter` (MIT) |
| [dns](../assets/icons.html#icon-dns) | DNS / name resolution. | Tabler Icons / `tag` (MIT) |
| [database](../assets/icons.html#icon-database) | Relational or document database. | Tabler Icons / `database` (MIT) |
| [file](../assets/icons.html#icon-file) | Generic file. | Tabler Icons / `file` (MIT) |
| [log](../assets/icons.html#icon-log) | Log file / event stream. | Tabler Icons / `file-text` (MIT) |
| [queue](../assets/icons.html#icon-queue) | Message queue / FIFO. | Tabler Icons / `stack-2` (MIT) |
| [cache](../assets/icons.html#icon-cache) | Cache layer. | Tabler Icons / `bolt` (MIT) |
| [bucket](../assets/icons.html#icon-bucket) | Object storage / S3 bucket. | Tabler Icons / `bucket` (MIT) |
| [backup](../assets/icons.html#icon-backup) | Backup or snapshot. | Tabler Icons / `device-floppy` (MIT) |
| [search](../assets/icons.html#icon-search) | Search index / query. | Tabler Icons / `search` (MIT) |
| [pod](../assets/icons.html#icon-pod) | Pod (smallest deployable unit). | Tabler Icons / `hexagon` (MIT) |
| [node](../assets/icons.html#icon-node) | Cluster node. | Tabler Icons / `topology-star` (MIT) |
| [service](../assets/icons.html#icon-service) | K8s service / virtual endpoint. | Tabler Icons / `world-cog` (MIT) |
| [deployment](../assets/icons.html#icon-deployment) | Deployment rollout. | Tabler Icons / `rocket` (MIT) |
| [ingress](../assets/icons.html#icon-ingress) | Ingress controller / route in. | Tabler Icons / `arrow-right-rhombus` (MIT) |
| [volume](../assets/icons.html#icon-volume) | Persistent volume. | Tabler Icons / `device-sd-card` (MIT) |
| [api](../assets/icons.html#icon-api) | API surface / endpoint. | Tabler Icons / `braces` (MIT) |
| [request](../assets/icons.html#icon-request) | Outbound request. | Tabler Icons / `arrow-right` (MIT) |
| [response](../assets/icons.html#icon-response) | Inbound response. | Tabler Icons / `arrow-left` (MIT) |
| [sync](../assets/icons.html#icon-sync) | Sync / reconcile loop. | Tabler Icons / `refresh` (MIT) |
| [lock](../assets/icons.html#icon-lock) | Locked / authenticated. | Tabler Icons / `lock` (MIT) |
| [key](../assets/icons.html#icon-key) | Key / secret. | Tabler Icons / `key` (MIT) |
| [alert](../assets/icons.html#icon-alert) | Warning / paged alert. | Tabler Icons / `alert-triangle` (MIT) |
| [git-branch](../assets/icons.html#icon-git-branch) | Branch / fork point. | Tabler Icons / `git-branch` (MIT) |
| [terminal](../assets/icons.html#icon-terminal) | Shell / CLI. | Tabler Icons / `terminal` (MIT) |
| [pipeline](../assets/icons.html#icon-pipeline) | CI/CD pipeline. | Tabler Icons / `git-merge` (MIT) |
| [bug](../assets/icons.html#icon-bug) | Bug / defect. | Tabler Icons / `bug` (MIT) |
| [monitoring](../assets/icons.html#icon-monitoring) | Metrics / observability. | Tabler Icons / `chart-line` (MIT) |
| [test](../assets/icons.html#icon-test) | Test / experiment. | Tabler Icons / `test-pipe` (MIT) |
| [docker](../assets/icons.html#icon-docker) | Docker engine / image. | Tabler Icons / `brand-docker` (MIT) |
| [terraform](../assets/icons.html#icon-terraform) | Terraform IaC. | Tabler Icons / `brand-terraform` (MIT) |
| [aws](../assets/icons.html#icon-aws) | Amazon Web Services. | Tabler Icons / `brand-aws` (MIT) |
| [azure](../assets/icons.html#icon-azure) | Microsoft Azure. | Tabler Icons / `brand-azure` (MIT) |
| [github](../assets/icons.html#icon-github) | GitHub. | Tabler Icons / `brand-github` (MIT) |
| [kubernetes](../assets/icons.html#icon-kubernetes) | Kubernetes. | Simple Icons / `kubernetes` (CC0) |
| [gcp](../assets/icons.html#icon-gcp) | Google Cloud. | Simple Icons / `googlecloud` (CC0) |
| [postgres](../assets/icons.html#icon-postgres) | PostgreSQL. | Simple Icons / `postgresql` (CC0) |
| [redis](../assets/icons.html#icon-redis) | Redis. | log-z/logos / `redis` (MIT) |
| [nginx](../assets/icons.html#icon-nginx) | Nginx. | Simple Icons / `nginx` (CC0) |
| [gitea](../assets/icons.html#icon-gitea) | Gitea self-hosted git. | Simple Icons / `gitea` (CC0) |
| [keycloak](../assets/icons.html#icon-keycloak) | Keycloak identity / SSO. | Simple Icons / `keycloak` (CC0) |
| [active-directory](../assets/icons.html#icon-active-directory) | Active Directory / LDAP identity directory. | Tabler Icons / `address-book` (MIT) |
| [minio](../assets/icons.html#icon-minio) | MinIO S3-compatible object storage. | Simple Icons / `minio` (CC0) |
| [mysql](../assets/icons.html#icon-mysql) | MySQL. | log-z/logos / `mysql` (MIT) |
| [oracle](../assets/icons.html#icon-oracle) | Oracle Database. | Simple Icons / `oracle` (CC0) |
| [sqlserver](../assets/icons.html#icon-sqlserver) | Microsoft SQL Server. | Simple Icons / `microsoftsqlserver` (CC0) |
| [sqlite](../assets/icons.html#icon-sqlite) | SQLite embedded database. | Simple Icons / `sqlite` (CC0) |
| [hive](../assets/icons.html#icon-hive) | Apache Hive data warehouse. | Simple Icons / `apachehive` (CC0) |
| [starrocks](../assets/icons.html#icon-starrocks) | StarRocks MPP analytical DB. | log-z/logos / `starrocks` (MIT) |
| [nifi](../assets/icons.html#icon-nifi) | Apache NiFi data flow. | Simple Icons / `apachenifi` (CC0) |
| [airflow](../assets/icons.html#icon-airflow) | Apache Airflow scheduler / DAG runner. | Simple Icons / `apacheairflow` (CC0) |
| [hop](../assets/icons.html#icon-hop) | Apache Hop data orchestration / ETL. | Direct fetch / `hop.apache.org` ; verify license before use |
| [pentaho](../assets/icons.html#icon-pentaho) | Pentaho PDI (Kettle) ETL & data integration. | Direct fetch / `cdn.worldvectorlogo.com` ; verify license before use |
| [dagster](../assets/icons.html#icon-dagster) | Dagster data orchestration platform. | Direct fetch / `cdn.prod.website-files.com` ; verify license before use |
| [trino](../assets/icons.html#icon-trino) | Trino distributed SQL query engine. | Simple Icons / `trino` (CC0) |
| [superset](../assets/icons.html#icon-superset) | Apache Superset BI / dashboards. | Simple Icons / `apachesuperset` (CC0) |
| [redash](../assets/icons.html#icon-redash) | Redash open-source BI & dashboards. | Simple Icons / `redash` (CC0) |
| [tableau](../assets/icons.html#icon-tableau) | Tableau data visualization. | Simple Icons / `tableau` (CC0) |
| [powerbi](../assets/icons.html#icon-powerbi) | Microsoft Power BI. | Simple Icons / `powerbi` (CC0) |
| [jupyter](../assets/icons.html#icon-jupyter) | Jupyter / JupyterLab notebooks. | Simple Icons / `jupyter` (CC0) |
| [python](../assets/icons.html#icon-python) | Python. | Simple Icons / `python` (CC0) |
| [r](../assets/icons.html#icon-r) | R statistical language. | Simple Icons / `r` (CC0) |
| [sql](../assets/icons.html#icon-sql) | SQL / generic relational query. | Tabler Icons / `sql` (MIT) |
| [spss](../assets/icons.html#icon-spss) | IBM SPSS Statistics. | Devicon / `spss-plain` (MIT) |
| [sas](../assets/icons.html#icon-sas) | SAS analytics platform. | Direct fetch / `upload.wikimedia.org` ; verify license before use |
| [stata](../assets/icons.html#icon-stata) | Stata statistical software. | Direct fetch / `icon.icepanel.io` ; verify license before use |
| [rstudio](../assets/icons.html#icon-rstudio) | RStudio / Posit IDE for R and Python. | Devicon / `rstudio-plain` (MIT) |
| [qgis](../assets/icons.html#icon-qgis) | QGIS open-source GIS platform. | Simple Icons / `qgis` (CC0) |
| [excel](../assets/icons.html#icon-excel) | Microsoft Excel spreadsheet. | Tabler Icons / `file-type-xls` (MIT) |
| [csv](../assets/icons.html#icon-csv) | Comma-separated values file. | Tabler Icons / `file-type-csv` (MIT) |
| [txt](../assets/icons.html#icon-txt) | Plain text file. | Tabler Icons / `file-type-txt` (MIT) |
