// Paginated PR evidence. Fetch failures and broken cursors must not look complete.
import { ghJson } from "./lib.ts";

export interface Connection<T> {
  nodes: T[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}

export interface ApiComment {
  author: { login: string } | null;
  createdAt: string;
  body: string;
}
export interface ApiReview {
  author: { login: string } | null;
  state: string;
  submittedAt: string | null;
  body: string;
}
export interface ApiThread {
  id: string;
  isResolved: boolean;
  isOutdated: boolean;
  path: string;
  line: number | null;
  originalLine: number | null;
  comments: Connection<ApiComment>;
}

async function query<T>(document: string, fields: string[]): Promise<T> {
  const result = await ghJson<{ data: T; errors?: { message: string }[] }>([
    "api", "graphql", "-f", `query=${document}`, ...fields,
  ]);
  if (result.errors?.length) {
    throw new Error(`GitHub GraphQL: ${result.errors.map((e) => e.message).join("; ")}`);
  }
  if (!result.data) throw new Error("GitHub GraphQL returned no data");
  return result.data;
}

async function collect<T>(fetchPage: (cursor: string | null) => Promise<Connection<T>>): Promise<T[]> {
  const nodes: T[] = [];
  const seen = new Set<string>();
  let cursor: string | null = null;
  do {
    const page = await fetchPage(cursor);
    if (!page || !Array.isArray(page.nodes) || typeof page.pageInfo?.hasNextPage !== "boolean") {
      throw new Error("GitHub returned an unavailable or malformed connection");
    }
    nodes.push(...page.nodes);
    if (!page.pageInfo.hasNextPage) return nodes;
    cursor = page.pageInfo.endCursor;
    if (!cursor || seen.has(cursor)) throw new Error("GitHub pagination did not advance; evidence is incomplete");
    seen.add(cursor);
  } while (cursor);
  return nodes;
}

export async function prNodes<T>(repo: string, number: number, field: string, selection: string): Promise<T[]> {
  const [owner, name] = repo.split("/");
  const document = `query($owner: String!, $repo: String!, $number: Int!, $cursor: String) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $number) {
        ${field}(first: 100, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes { ${selection} }
        }
      }
    }
  }`;
  return collect(async (cursor) => {
    const data = await query<{ repository: { pullRequest: Record<string, Connection<T>> } | null }>(document, [
      "-f", `owner=${owner}`, "-f", `repo=${name}`, "-F", `number=${number}`,
      ...(cursor ? ["-f", `cursor=${cursor}`] : []),
    ]);
    const pr = data.repository?.pullRequest;
    if (!pr) throw new Error(`PR ${repo}#${number} is unavailable`);
    return pr[field];
  });
}

export function prReviews(repo: string, number: number): Promise<ApiReview[]> {
  return prNodes(repo, number, "reviews", "author { login } state submittedAt body");
}
export function prComments(repo: string, number: number): Promise<ApiComment[]> {
  return prNodes(repo, number, "comments", "author { login } createdAt body");
}

export async function prThreads(repo: string, number: number): Promise<ApiThread[]> {
  const threads = await prNodes<ApiThread>(repo, number, "reviewThreads", `
    id isResolved isOutdated path line originalLine
    comments(first: 100) {
      pageInfo { hasNextPage endCursor }
      nodes { author { login } createdAt body }
    }`);
  for (const thread of threads) {
    if (!thread.comments.pageInfo.hasNextPage) continue;
    // Re-fetch this connection from its beginning, then exhaust its own cursor.
    const comments = await collect<ApiComment>(async (cursor) => {
      const data = await query<{ node: { comments: Connection<ApiComment> } | null }>(`
        query($id: ID!, $cursor: String) {
          node(id: $id) { ... on PullRequestReviewThread {
            comments(first: 100, after: $cursor) {
              pageInfo { hasNextPage endCursor }
              nodes { author { login } createdAt body }
            }
          } }
        }`, ["-f", `id=${thread.id}`, ...(cursor ? ["-f", `cursor=${cursor}`] : [])]);
      if (!data.node) throw new Error(`Review thread ${thread.id} is unavailable`);
      return data.node.comments;
    });
    thread.comments = { nodes: comments, pageInfo: { hasNextPage: false, endCursor: null } };
  }
  return threads;
}
