"""Exercise the real CLI entry points against a deterministic paginated gh fixture."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"
FAKE_GH = r'''#!/usr/bin/env python3
import json, os, sys
a = sys.argv[1:]
fields = dict(x.split('=', 1) for x in a if '=' in x)
q = fields.get('query', '')
mode = os.environ.get('FIXTURE_MODE', '')
def emit(value):
    print(json.dumps(value))
def connection(nodes, cursor):
    start = 100 if cursor else 0
    next_page = len(nodes) > start + 100
    return {'nodes': nodes[start:start+100], 'pageInfo': {
        'hasNextPage': next_page, 'endCursor': None if mode == 'bad-cursor' else ('second' if next_page else None)}}
def comment(i):
    return {'author': {'login': 'reader'}, 'createdAt': '2026-10-06T00:00:00Z', 'body': f'comment {i}'}
if a[:2] == ['pr', 'view']:
    emit({'number': 1, 'title': 'Fixture', 'state': 'OPEN', 'isDraft': False,
        'author': {'login': 'owner'}, 'url': 'https://github.com/x/y/pull/1',
        'createdAt': '2026-10-06T00:00:00Z', 'baseRefName': 'main', 'headRefName': 'topic',
        'headRefOid': 'a'*40, 'mergeable': 'MERGEABLE', 'mergeStateStatus': 'CLEAN',
        'reviewDecision': '', 'additions': 101, 'deletions': 0, 'changedFiles': 102 if mode == 'file-cap' else 101, 'body': 'Fixture'})
elif a[:2] == ['pr', 'checks']:
    emit([{'name': 'ci', 'state': 'PENDING', 'bucket': 'pending'}])
    sys.exit(8)
elif a[:2] == ['api', 'graphql']:
    if mode == 'graphql-error':
        emit({'data': {}, 'errors': [{'message': 'fixture denied'}]})
    elif 'node(id:' in q:
        emit({'data': {'node': {'comments': connection([comment(i) for i in range(101)], fields.get('cursor'))}}})
    else:
        if 'reviewThreads(first:' in q:
            field = 'reviewThreads'
            nodes = []
            for i in range(101):
                t = {'id': f'T{i}', 'isResolved': i == 0, 'isOutdated': False, 'path': f'f{i}', 'line': 1, 'originalLine': 1}
                if 'comments(first:' in q:
                    t['comments'] = connection([comment(j) for j in range(101 if i == 100 else 1)], None)
                nodes.append(t)
        elif 'reviews(first:' in q:
            field = 'reviews'
            nodes = [{'author': {'login': 'reviewer'}, 'state': 'APPROVED' if i == 100 else 'COMMENTED',
                'submittedAt': '2026-10-06T00:00:00Z', 'body': f'review {i}'} for i in range(101)]
        elif 'files(first:' in q:
            field = 'files'
            nodes = [{'path': f'f{i}', 'additions': 1, 'deletions': 0} for i in range(101)]
        elif 'comments(first:' in q:
            field = 'comments'
            nodes = [comment(i) for i in range(101)]
        else:
            raise SystemExit('Unexpected query')
        emit({'data': {'repository': {'pullRequest': {field: connection(nodes, fields.get('cursor'))}}}})
else:
    raise SystemExit('Unexpected gh arguments')
'''


class PaginationTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        fake = Path(self.temp.name) / "gh"
        fake.write_text(FAKE_GH)
        fake.chmod(0o755)
        self.env = {**os.environ, "PATH": f"{self.temp.name}{os.pathsep}{os.environ['PATH']}"}

    def tearDown(self):
        self.temp.cleanup()

    def cli(self, name, *args, mode=""):
        return subprocess.run(["node", str(SCRIPTS / name), "1", "-R", "x/y", *args],
                              env={**self.env, "FIXTURE_MODE": mode}, text=True, capture_output=True, timeout=30)

    def test_conversation_exhausts_all_four_connections(self):
        result = self.cli("pr-threads.ts", "--all", "--json")
        self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(len(data["conversation"]), 202)
        self.assertEqual(len(data["threads"]), 101)
        self.assertEqual(len(data["threads"][-1]["comments"]), 101)
        self.assertEqual(data["coverage"], {"complete": True, "reviews": 101, "issueComments": 101,
                                            "threads": 101, "threadComments": 201})
        self.assertFalse(any(t["moreComments"] for t in data["threads"]))

    def test_filters_preserve_unfiltered_coverage(self):
        result = self.cli("pr-threads.ts", "--json", "--author", "nobody")
        self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data["threads"], [])
        self.assertEqual(data["conversation"], [])
        self.assertEqual(data["coverage"]["threads"], 101)
        self.assertEqual(data["filters"]["author"], "nobody")

    def test_snapshot_has_complete_counts_and_latest_review(self):
        result = self.cli("pr-snapshot.ts", "--json")
        self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(len(data["files"]), 101)
        self.assertEqual(len(data["comments"]), 101)
        self.assertEqual(data["threads"], {"open": 100, "total": 101, "capped": False})
        self.assertEqual(data["reviewsLatest"]["reviewer"], "APPROVED")
        self.assertTrue(data["coverage"]["complete"])
        self.assertEqual(data["checks"][0]["bucket"], "pending")

    def test_incomplete_or_denied_evidence_fails_without_success_json(self):
        for script, mode, message in [
            ("pr-threads.ts", "bad-cursor", "pagination did not advance"),
            ("pr-snapshot.ts", "graphql-error", "fixture denied"),
            ("pr-snapshot.ts", "file-cap", "File coverage 101/102"),
        ]:
            with self.subTest(script=script, mode=mode):
                result = self.cli(script, "--json", mode=mode)
                self.assertEqual(result.returncode, 1)
                self.assertEqual(result.stdout, "")
                self.assertIn(message, result.stderr)


if __name__ == "__main__":
    unittest.main()
