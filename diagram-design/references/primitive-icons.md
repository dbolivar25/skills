# Icon lookup

Find the required name below, then read only that SVG asset. Use it as a recognition aid beside a meaningful text label. An icon does not establish a system's function, deployment, trust, or permission.

Each named file is a standalone SVG, preserving the catalog's original geometry and IDs. Generic icons are usually stroked; brand silhouettes are usually filled. Most use currentColor, but some supplied brand assets contain fixed paints. Inspect the chosen asset before recoloring. Refer to [attribution](../assets/icons/ATTRIBUTION.md) for source and license information; direct-fetch assets still have unresolved licenses rather than a blanket redistribution claim.

Inline the selected SVG's children or use the standalone file as an image. Preserve its viewBox and scale uniformly. A CSS color on a parent affects currentColor only when the SVG is inline; an external image does not inherit the page's color. When several copies are inlined, namespace IDs and their matching fragment references to avoid collisions. Do not rename original catalog IDs in the library itself.

Decorative icons can remain aria-hidden when nearby text supplies their meaning. If an icon carries unique meaning, provide an accessible name in the enclosing figure or control. Inspect the actual size, paint, alignment, theme, and export.

The [icon gallery](../assets/icons.html) preserves the original visual examples. It is useful for browsing, while the index below gives targeted source lookup without loading every SVG into context.

| Name | Use | Retained source and license label |
| --- | --- | --- |
| [laptop](../assets/icons/laptop.svg) | User laptop or workstation. | Tabler Icons / `device-laptop` (MIT) |
| [phone](../assets/icons/phone.svg) | Mobile phone or tablet client. | Tabler Icons / `device-mobile` (MIT) |
| [desktop](../assets/icons/desktop.svg) | Desktop computer. | Tabler Icons / `device-desktop` (MIT) |
| [server](../assets/icons/server.svg) | Physical server or VM host. | Tabler Icons / `server` (MIT) |
| [container](../assets/icons/container.svg) | Container image or running instance. | Tabler Icons / `package` (MIT) |
| [vm](../assets/icons/vm.svg) | Virtual machine. | Tabler Icons / `cube` (MIT) |
| [user](../assets/icons/user.svg) | End user or single actor. | Tabler Icons / `user` (MIT) |
| [users](../assets/icons/users.svg) | Group / cohort / team. | Tabler Icons / `users` (MIT) |
| [admin](../assets/icons/admin.svg) | Privileged user / admin. | Tabler Icons / `user-shield` (MIT) |
| [robot](../assets/icons/robot.svg) | Bot, agent, or automated process. | Tabler Icons / `robot` (MIT) |
| [cloud](../assets/icons/cloud.svg) | Cloud provider or boundary. | Tabler Icons / `cloud` (MIT) |
| [internet](../assets/icons/internet.svg) | Public internet. | Tabler Icons / `world` (MIT) |
| [cdn](../assets/icons/cdn.svg) | CDN or edge cache. | Tabler Icons / `world-www` (MIT) |
| [firewall](../assets/icons/firewall.svg) | Firewall or perimeter control. | Tabler Icons / `wall` (MIT) |
| [vpn](../assets/icons/vpn.svg) | VPN or encrypted tunnel. | Tabler Icons / `shield-lock` (MIT) |
| [load-balancer](../assets/icons/load-balancer.svg) | Load balancer / traffic split. | Tabler Icons / `arrows-split` (MIT) |
| [gateway](../assets/icons/gateway.svg) | API gateway or ingress door. | Tabler Icons / `door-enter` (MIT) |
| [dns](../assets/icons/dns.svg) | DNS / name resolution. | Tabler Icons / `tag` (MIT) |
| [database](../assets/icons/database.svg) | Relational or document database. | Tabler Icons / `database` (MIT) |
| [file](../assets/icons/file.svg) | Generic file. | Tabler Icons / `file` (MIT) |
| [log](../assets/icons/log.svg) | Log file / event stream. | Tabler Icons / `file-text` (MIT) |
| [queue](../assets/icons/queue.svg) | Message queue / FIFO. | Tabler Icons / `stack-2` (MIT) |
| [cache](../assets/icons/cache.svg) | Cache layer. | Tabler Icons / `bolt` (MIT) |
| [bucket](../assets/icons/bucket.svg) | Object storage / S3 bucket. | Tabler Icons / `bucket` (MIT) |
| [backup](../assets/icons/backup.svg) | Backup or snapshot. | Tabler Icons / `device-floppy` (MIT) |
| [search](../assets/icons/search.svg) | Search index / query. | Tabler Icons / `search` (MIT) |
| [pod](../assets/icons/pod.svg) | Pod (smallest deployable unit). | Tabler Icons / `hexagon` (MIT) |
| [node](../assets/icons/node.svg) | Cluster node. | Tabler Icons / `topology-star` (MIT) |
| [service](../assets/icons/service.svg) | K8s service / virtual endpoint. | Tabler Icons / `world-cog` (MIT) |
| [deployment](../assets/icons/deployment.svg) | Deployment rollout. | Tabler Icons / `rocket` (MIT) |
| [ingress](../assets/icons/ingress.svg) | Ingress controller / route in. | Tabler Icons / `arrow-right-rhombus` (MIT) |
| [volume](../assets/icons/volume.svg) | Persistent volume. | Tabler Icons / `device-sd-card` (MIT) |
| [api](../assets/icons/api.svg) | API surface / endpoint. | Tabler Icons / `braces` (MIT) |
| [request](../assets/icons/request.svg) | Outbound request. | Tabler Icons / `arrow-right` (MIT) |
| [response](../assets/icons/response.svg) | Inbound response. | Tabler Icons / `arrow-left` (MIT) |
| [sync](../assets/icons/sync.svg) | Sync / reconcile loop. | Tabler Icons / `refresh` (MIT) |
| [lock](../assets/icons/lock.svg) | Locked / authenticated. | Tabler Icons / `lock` (MIT) |
| [key](../assets/icons/key.svg) | Key / secret. | Tabler Icons / `key` (MIT) |
| [alert](../assets/icons/alert.svg) | Warning / paged alert. | Tabler Icons / `alert-triangle` (MIT) |
| [git-branch](../assets/icons/git-branch.svg) | Branch / fork point. | Tabler Icons / `git-branch` (MIT) |
| [terminal](../assets/icons/terminal.svg) | Shell / CLI. | Tabler Icons / `terminal` (MIT) |
| [pipeline](../assets/icons/pipeline.svg) | CI/CD pipeline. | Tabler Icons / `git-merge` (MIT) |
| [bug](../assets/icons/bug.svg) | Bug / defect. | Tabler Icons / `bug` (MIT) |
| [monitoring](../assets/icons/monitoring.svg) | Metrics / observability. | Tabler Icons / `chart-line` (MIT) |
| [test](../assets/icons/test.svg) | Test / experiment. | Tabler Icons / `test-pipe` (MIT) |
| [docker](../assets/icons/docker.svg) | Docker engine / image. | Tabler Icons / `brand-docker` (MIT) |
| [terraform](../assets/icons/terraform.svg) | Terraform IaC. | Tabler Icons / `brand-terraform` (MIT) |
| [aws](../assets/icons/aws.svg) | Amazon Web Services. | Tabler Icons / `brand-aws` (MIT) |
| [azure](../assets/icons/azure.svg) | Microsoft Azure. | Tabler Icons / `brand-azure` (MIT) |
| [github](../assets/icons/github.svg) | GitHub. | Tabler Icons / `brand-github` (MIT) |
| [kubernetes](../assets/icons/kubernetes.svg) | Kubernetes. | Simple Icons / `kubernetes` (CC0) |
| [gcp](../assets/icons/gcp.svg) | Google Cloud. | Simple Icons / `googlecloud` (CC0) |
| [postgres](../assets/icons/postgres.svg) | PostgreSQL. | Simple Icons / `postgresql` (CC0) |
| [redis](../assets/icons/redis.svg) | Redis. | log-z/logos / `redis` (MIT) |
| [nginx](../assets/icons/nginx.svg) | Nginx. | Simple Icons / `nginx` (CC0) |
| [gitea](../assets/icons/gitea.svg) | Gitea self-hosted git. | Simple Icons / `gitea` (CC0) |
| [keycloak](../assets/icons/keycloak.svg) | Keycloak identity / SSO. | Simple Icons / `keycloak` (CC0) |
| [active-directory](../assets/icons/active-directory.svg) | Active Directory / LDAP identity directory. | Tabler Icons / `address-book` (MIT) |
| [minio](../assets/icons/minio.svg) | MinIO S3-compatible object storage. | Simple Icons / `minio` (CC0) |
| [mysql](../assets/icons/mysql.svg) | MySQL. | log-z/logos / `mysql` (MIT) |
| [oracle](../assets/icons/oracle.svg) | Oracle Database. | Simple Icons / `oracle` (CC0) |
| [sqlserver](../assets/icons/sqlserver.svg) | Microsoft SQL Server. | Simple Icons / `microsoftsqlserver` (CC0) |
| [sqlite](../assets/icons/sqlite.svg) | SQLite embedded database. | Simple Icons / `sqlite` (CC0) |
| [hive](../assets/icons/hive.svg) | Apache Hive data warehouse. | Simple Icons / `apachehive` (CC0) |
| [starrocks](../assets/icons/starrocks.svg) | StarRocks MPP analytical DB. | log-z/logos / `starrocks` (MIT) |
| [nifi](../assets/icons/nifi.svg) | Apache NiFi data flow. | Simple Icons / `apachenifi` (CC0) |
| [airflow](../assets/icons/airflow.svg) | Apache Airflow scheduler / DAG runner. | Simple Icons / `apacheairflow` (CC0) |
| [hop](../assets/icons/hop.svg) | Apache Hop data orchestration / ETL. | Direct fetch / `hop.apache.org` ; verify license before use |
| [pentaho](../assets/icons/pentaho.svg) | Pentaho PDI (Kettle) ETL & data integration. | Direct fetch / `cdn.worldvectorlogo.com` ; verify license before use |
| [dagster](../assets/icons/dagster.svg) | Dagster data orchestration platform. | Direct fetch / `cdn.prod.website-files.com` ; verify license before use |
| [trino](../assets/icons/trino.svg) | Trino distributed SQL query engine. | Simple Icons / `trino` (CC0) |
| [superset](../assets/icons/superset.svg) | Apache Superset BI / dashboards. | Simple Icons / `apachesuperset` (CC0) |
| [redash](../assets/icons/redash.svg) | Redash open-source BI & dashboards. | Simple Icons / `redash` (CC0) |
| [tableau](../assets/icons/tableau.svg) | Tableau data visualization. | Simple Icons / `tableau` (CC0) |
| [powerbi](../assets/icons/powerbi.svg) | Microsoft Power BI. | Simple Icons / `powerbi` (CC0) |
| [jupyter](../assets/icons/jupyter.svg) | Jupyter / JupyterLab notebooks. | Simple Icons / `jupyter` (CC0) |
| [python](../assets/icons/python.svg) | Python. | Simple Icons / `python` (CC0) |
| [r](../assets/icons/r.svg) | R statistical language. | Simple Icons / `r` (CC0) |
| [sql](../assets/icons/sql.svg) | SQL / generic relational query. | Tabler Icons / `sql` (MIT) |
| [spss](../assets/icons/spss.svg) | IBM SPSS Statistics. | Devicon / `spss-plain` (MIT) |
| [sas](../assets/icons/sas.svg) | SAS analytics platform. | Direct fetch / `upload.wikimedia.org` ; verify license before use |
| [stata](../assets/icons/stata.svg) | Stata statistical software. | Direct fetch / `icon.icepanel.io` ; verify license before use |
| [rstudio](../assets/icons/rstudio.svg) | RStudio / Posit IDE for R and Python. | Devicon / `rstudio-plain` (MIT) |
| [qgis](../assets/icons/qgis.svg) | QGIS open-source GIS platform. | Simple Icons / `qgis` (CC0) |
| [excel](../assets/icons/excel.svg) | Microsoft Excel spreadsheet. | Tabler Icons / `file-type-xls` (MIT) |
| [csv](../assets/icons/csv.svg) | Comma-separated values file. | Tabler Icons / `file-type-csv` (MIT) |
| [txt](../assets/icons/txt.svg) | Plain text file. | Tabler Icons / `file-type-txt` (MIT) |
