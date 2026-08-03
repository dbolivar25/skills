import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
SCRIPT = SKILL_ROOT / 'scripts' / 'steward.py'
FIXTURES = SKILL_ROOT / 'tests' / 'fixtures' / 'trajectories.json'
DEFAULT_RULES = SKILL_ROOT / 'rules' / 'default-rules.json'


class StewardReplayTest(unittest.TestCase):
    def run_cli(self, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), *args],
            check=True,
            capture_output=True,
            text=True,
        )

    def test_representative_trajectories(self) -> None:
        fixtures = json.loads(FIXTURES.read_text())
        rules = {rule['id']: rule for rule in json.loads(DEFAULT_RULES.read_text())}

        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            for fixture in fixtures:
                with self.subTest(fixture=fixture['id']):
                    intent = {
                        **fixture['intent'],
                        'rules': [rules[rule_id] for rule_id in fixture['ruleIds']],
                    }
                    first, *remaining = fixture['steps']
                    result = self.run_cli(
                        'open',
                        '--root',
                        str(root),
                        '--slug',
                        fixture['id'],
                        '--intent-json',
                        json.dumps(intent),
                        '--events-json',
                        json.dumps(first['events']),
                        '--presence',
                        first.get('presence', 'PRESENT'),
                        '--json',
                    )
                    transition = json.loads(result.stdout)
                    self.assertEqual(transition['next'], first['expectNext'])
                    work_dir = transition['work']

                    for step in remaining:
                        transition = json.loads(
                            self.run_cli(
                                'advance',
                                work_dir,
                                '--events-json',
                                json.dumps(step['events']),
                                '--presence',
                                step.get('presence', 'PRESENT'),
                                '--json',
                            ).stdout
                        )
                        self.assertEqual(transition['next'], step['expectNext'])

                    for presence, expected in fixture.get('expectInspect', {}).items():
                        snapshot = self.inspect(work_dir, presence)
                        self.assertEqual(snapshot['next'], expected)

                    snapshot = self.inspect(work_dir, 'PRESENT')
                    expected_state = fixture.get('expectState', {})
                    if 'done' in expected_state:
                        self.assertEqual(snapshot['state']['done'], expected_state['done'])
                    for claim_id, status in expected_state.get('claims', {}).items():
                        self.assertEqual(snapshot['state']['claims'][claim_id]['status'], status)
                    for work_id, status in expected_state.get('work', {}).items():
                        self.assertEqual(snapshot['state']['work'][work_id]['status'], status)
                    for work_id, actor in expected_state.get('actors', {}).items():
                        self.assertEqual(snapshot['state']['work'][work_id]['actor'], actor)

    def inspect(self, work: str, presence: str) -> dict[str, object]:
        return json.loads(
            self.run_cli(
                'inspect',
                work,
                '--presence',
                presence,
                '--json',
            ).stdout
        )


if __name__ == '__main__':
    unittest.main()
