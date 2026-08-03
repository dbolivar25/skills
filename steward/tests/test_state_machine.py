import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / 'scripts' / 'steward.py'


class StewardStateMachineTest(unittest.TestCase):
    def test_open_derives_understanding_work_from_owner_intent(self) -> None:
        intent = {
            'aim': 'Ship the behavior Daniel actually wants.',
            'why': 'Local correctness is useless when the result misses the product intent.',
            'rules': [],
            'nonGoals': ['Do not preserve an obsolete interface.'],
            'done': [
                {
                    'id': 'landed',
                    'expect': 'The intended behavior is observed.',
                    'receipt': 'outcome.landed',
                }
            ],
        }
        events = [
            {
                'type': 'work.added',
                'payload': {
                    'id': 'W-UNDERSTAND',
                    'phase': 'UNDERSTAND',
                    'text': 'Ground the intended behavior in owner context and current reality.',
                    'needsClaims': [],
                    'needsWork': [],
                },
            }
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.run_cli(
                'open',
                '--root',
                temp_dir,
                '--slug',
                'intent-first',
                '--intent-json',
                json.dumps(intent),
                '--events-json',
                json.dumps(events),
                '--presence',
                'PRESENT',
                '--json',
            )
            transition = json.loads(opened.stdout)
            snapshot = json.loads(
                self.run_cli(
                    'inspect',
                    transition['work'],
                    '--presence',
                    'PRESENT',
                    '--json',
                ).stdout
            )

        self.assertEqual(
            transition['next'],
            {'kind': 'UNDERSTAND', 'work': 'W-UNDERSTAND'},
        )
        self.assertEqual(snapshot['intent'], intent)
        self.assertEqual(snapshot['state']['work']['W-UNDERSTAND']['status'], 'AVAILABLE')

    def test_starting_work_exposes_the_next_safe_assignment_then_waits(self) -> None:
        events = [
            self.work('W-SOURCE', 'UNDERSTAND', 'Inspect current source.'),
            self.work('W-OWNER', 'UNDERSTAND', 'Inspect the owner context.'),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'parallel-understanding', events)
            first_started = self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-SOURCE', 'actor': 'source-reader'})],
            )
            second_started = self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-OWNER', 'actor': 'context-reader'})],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(
            first_started['next'],
            {'kind': 'UNDERSTAND', 'work': 'W-OWNER'},
        )
        self.assertEqual(second_started['next'], {'kind': 'WAIT', 'active': ['W-SOURCE', 'W-OWNER']})
        self.assertEqual(snapshot['state']['work']['W-SOURCE']['actor'], 'source-reader')
        self.assertEqual(snapshot['state']['work']['W-OWNER']['actor'], 'context-reader')

    def test_paused_work_can_resume_with_the_same_or_a_replacement_actor(self) -> None:
        events = [self.work('W-DESIGN', 'PLAN', 'Design the next supported commitment.')]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'replace-collaborator', events)
            self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-DESIGN', 'actor': 'planner-one'})],
            )
            paused = self.advance(
                opened['work'],
                [
                    self.event(
                        'work.paused',
                        {
                            'id': 'W-DESIGN',
                            'actor': 'planner-one',
                            'reason': 'Owner context is not available yet.',
                        },
                    )
                ],
            )
            resumed = self.advance(
                opened['work'],
                [
                    self.event(
                        'work.resumed',
                        {
                            'id': 'W-DESIGN',
                            'actor': 'planner-two',
                            'reason': 'A fresh planner can use the newly supplied context.',
                        },
                    )
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(paused['next'], {'kind': 'WAIT', 'paused': ['W-DESIGN']})
        self.assertEqual(resumed['next'], {'kind': 'WAIT', 'active': ['W-DESIGN']})
        self.assertEqual(snapshot['state']['work']['W-DESIGN']['status'], 'ACTIVE')
        self.assertEqual(snapshot['state']['work']['W-DESIGN']['actor'], 'planner-two')

    def test_a_phase_result_is_not_accepted_until_an_independent_agent_sharpens_it(self) -> None:
        events = [self.work('W-IMPLEMENT', 'EXECUTE', 'Implement the intended behavior.')]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'sharpen-execution', events)
            self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-IMPLEMENT', 'actor': 'implementer'})],
            )
            reported = self.advance(
                opened['work'],
                [
                    self.event(
                        'work.reported',
                        {
                            'id': 'W-IMPLEMENT',
                            'report': 'RP-IMPLEMENT',
                            'actor': 'implementer',
                            'result': 'Implemented the behavior.',
                            'evidence': ['focused test passed'],
                        },
                    )
                ],
            )
            sharpened = self.advance(
                opened['work'],
                [
                    self.event(
                        'review.added',
                        {
                            'id': 'R-IMPLEMENT',
                            'report': 'RP-IMPLEMENT',
                            'reviewer': 'execution-critic',
                            'status': 'ADHERES',
                            'evidence': ['The result fits the Intent and current source.'],
                            'confidence': 'HIGH',
                        },
                    )
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(
            reported['next'],
            {
                'kind': 'REVIEW',
                'work': 'W-IMPLEMENT',
                'report': 'RP-IMPLEMENT',
                'phase': 'EXECUTE',
            },
        )
        self.assertEqual(sharpened['next'], {'kind': 'STOP', 'reason': 'No work is available.'})
        self.assertEqual(snapshot['state']['work']['W-IMPLEMENT']['status'], 'DONE')
        self.assertEqual(snapshot['state']['work']['W-IMPLEMENT']['review'], 'R-IMPLEMENT')

    def test_adversarial_review_returns_the_same_responsibility_for_revision(self) -> None:
        events = [self.work('W-MEANING', 'UNDERSTAND', 'Resolve the intended product meaning.')]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'review-revision', events)
            self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-MEANING', 'actor': 'researcher'})],
            )
            self.advance(
                opened['work'],
                [
                    self.event(
                        'work.reported',
                        {
                            'id': 'W-MEANING',
                            'report': 'RP-MEANING-1',
                            'actor': 'researcher',
                            'result': 'The ticket defines the intended meaning.',
                            'evidence': ['ticket text'],
                        },
                    )
                ],
            )
            challenged = self.advance(
                opened['work'],
                [
                    self.event(
                        'review.added',
                        {
                            'id': 'R-MEANING-1',
                            'report': 'RP-MEANING-1',
                            'reviewer': 'meaning-critic',
                            'status': 'AT_RISK',
                            'evidence': ['The current product behavior contradicts the stale ticket.'],
                            'confidence': 'HIGH',
                        },
                    )
                ],
            )
            resumed = self.advance(
                opened['work'],
                [
                    self.event(
                        'work.resumed',
                        {
                            'id': 'W-MEANING',
                            'actor': 'researcher',
                            'reason': 'Check the current product surface before accepting the meaning.',
                        },
                    )
                ],
            )

        self.assertEqual(
            challenged['next'],
            {'kind': 'UNDERSTAND', 'work': 'W-MEANING', 'review': 'R-MEANING-1'},
        )
        self.assertEqual(resumed['next'], {'kind': 'WAIT', 'active': ['W-MEANING']})

    def test_planning_unlocks_only_after_understanding_is_sharpened(self) -> None:
        understand = self.work('W-UNDERSTAND', 'UNDERSTAND', 'Establish the governing meaning.')
        plan = self.work(
            'W-PLAN',
            'PLAN',
            'Choose an executable path.',
            needs_work=['W-UNDERSTAND'],
        )

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'phase-reentry', [understand, plan])
            started = self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-UNDERSTAND', 'actor': 'researcher'})],
            )
            self.advance(
                opened['work'],
                [
                    self.event(
                        'work.reported',
                        {
                            'id': 'W-UNDERSTAND',
                            'report': 'RP-UNDERSTAND',
                            'actor': 'researcher',
                            'result': 'Current source and owner context agree.',
                            'evidence': ['owner context', 'current source'],
                        },
                    )
                ],
            )
            accepted = self.advance(
                opened['work'],
                [
                    self.event(
                        'review.added',
                        {
                            'id': 'R-UNDERSTAND',
                            'report': 'RP-UNDERSTAND',
                            'reviewer': 'understanding-critic',
                            'status': 'ADHERES',
                            'evidence': ['No material contradiction remains.'],
                            'confidence': 'HIGH',
                        },
                    )
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(started['next'], {'kind': 'WAIT', 'active': ['W-UNDERSTAND']})
        self.assertEqual(accepted['next'], {'kind': 'PLAN', 'work': 'W-PLAN'})
        self.assertEqual(snapshot['state']['work']['W-PLAN']['status'], 'AVAILABLE')

    def test_owner_presence_changes_when_an_ask_surfaces_not_who_decides(self) -> None:
        events = [
            self.work('W-DECISION', 'PLAN', 'Plan from the owner-selected meaning.'),
            self.work('W-SAFE', 'UNDERSTAND', 'Inspect an independent source.'),
            self.event(
                'ask.opened',
                {
                    'id': 'A-MEANING',
                    'question': 'Which product meaning should govern?',
                    'owner': 'OWNER',
                    'why': 'Evidence cannot choose the product promise.',
                    'blocksWork': ['W-DECISION'],
                },
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'owner-presence', events)
            present = self.inspect(opened['work'], 'PRESENT')
            away = self.inspect(opened['work'], 'AWAY')

        self.assertEqual(
            present['next'],
            {'kind': 'ASK', 'ask': 'A-MEANING', 'owner': 'OWNER'},
        )
        self.assertEqual(away['next'], {'kind': 'UNDERSTAND', 'work': 'W-SAFE'})

    def test_withdrawing_support_stops_active_dependent_work(self) -> None:
        events = [
            self.event(
                'backing.added',
                {'id': 'B-OWNER', 'kind': 'OWNER', 'text': 'The initial meaning governs.'},
            ),
            self.event(
                'claim.added',
                {
                    'id': 'C-MEANING',
                    'text': 'The initial meaning should be implemented.',
                    'supports': [['backing:B-OWNER']],
                },
            ),
            self.work(
                'W-IMPLEMENT',
                'EXECUTE',
                'Implement the supported meaning.',
                needs_claims=['C-MEANING'],
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'stop-active-work', events)
            self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-IMPLEMENT', 'actor': 'implementer'})],
            )
            stopped = self.advance(
                opened['work'],
                [
                    self.event(
                        'backing.withdrawn',
                        {'id': 'B-OWNER', 'reason': 'Current owner context replaced it.'},
                    )
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(stopped['next'], {'kind': 'STOP', 'reason': 'No work is available.'})
        self.assertEqual(snapshot['state']['claims']['C-MEANING']['status'], 'UNBACKED')
        self.assertEqual(snapshot['state']['work']['W-IMPLEMENT']['status'], 'STOPPED')

    def test_done_reopens_when_reality_withdraws_a_receipt(self) -> None:
        intent = {
            'aim': 'Land the intended outcome.',
            'why': 'Completion must track reality rather than an agent declaration.',
            'rules': [],
            'nonGoals': [],
            'done': [
                {'id': 'local', 'expect': 'Local checks pass.', 'receipt': 'verification.local'},
                {'id': 'landed', 'expect': 'The outcome is observed.', 'receipt': 'outcome.landed'},
            ],
        }
        events = [
            self.event(
                'receipt.added',
                {'id': 'RC-LOCAL', 'type': 'verification.local', 'evidence': ['focused test']},
            ),
            self.event(
                'receipt.added',
                {'id': 'RC-LANDED', 'type': 'outcome.landed', 'evidence': ['observed behavior']},
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'reopen-done', events, intent=intent)
            reopened = self.advance(
                opened['work'],
                [
                    self.event(
                        'receipt.withdrawn',
                        {'id': 'RC-LANDED', 'reason': 'The observed behavior regressed.'},
                    )
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(opened['next'], {'kind': 'DONE'})
        self.assertEqual(reopened['next'], {'kind': 'STOP', 'reason': 'No work is available.'})
        self.assertEqual(snapshot['state']['done'], {'met': ['local'], 'open': ['landed']})

    def test_owner_intent_can_change_and_redirect_the_live_mission_atomically(self) -> None:
        events = [self.work('W-OLD', 'PLAN', 'Plan from the original product meaning.')]
        revised_intent = {
            'aim': 'Honor the corrected product meaning.',
            'why': 'The owner clarified which user experience matters.',
            'rules': [],
            'nonGoals': ['Do not continue the original interpretation.'],
            'done': [
                {'id': 'landed', 'expect': 'The corrected behavior is observed.', 'receipt': 'outcome.landed'}
            ],
        }

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'intent-change', events)
            redirected = self.advance(
                opened['work'],
                [
                    self.event(
                        'intent.revised',
                        {
                            'intent': revised_intent,
                            'reason': 'The owner corrected the governing meaning.',
                            'evidence': ['owner clarification'],
                        },
                    ),
                    self.event(
                        'work.stopped',
                        {'id': 'W-OLD', 'reason': 'It belongs to the superseded Intent.'},
                    ),
                    self.work(
                        'W-REGROUND',
                        'UNDERSTAND',
                        'Reground the work in the corrected Intent.',
                    ),
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(redirected['next'], {'kind': 'UNDERSTAND', 'work': 'W-REGROUND'})
        self.assertEqual(snapshot['intent'], revised_intent)
        self.assertEqual(snapshot['state']['work']['W-OLD']['status'], 'STOPPED')

    def test_intent_rules_guide_judgment_without_encoding_runtime_responses(self) -> None:
        intent = {
            'aim': 'Keep the implementation faithful to the requested behavior.',
            'why': 'A locally correct implementation can still miss the mission.',
            'rules': [
                {
                    'id': 'mission-fit',
                    'version': '1',
                    'kind': 'BEHAVIOR',
                    'when': 'A phase commitment is reviewed.',
                    'expect': 'The commitment advances the owner Intent.',
                    'owner': 'AGENT',
                    'check': 'Compare the candidate with Aim, Why, Rules, Non-goals, and Done.',
                }
            ],
            'nonGoals': [],
            'done': [
                {'id': 'landed', 'expect': 'The intended behavior is observed.', 'receipt': 'outcome.landed'}
            ],
        }

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(
                temp_dir,
                'judgment-rule',
                [self.work('W-CHECK', 'UNDERSTAND', 'Check the governing Intent.')],
                intent=intent,
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(snapshot['intent']['rules'], intent['rules'])

    def test_open_rejects_an_invalid_seed_without_creating_state(self) -> None:
        events = [
            self.work('W-VALID', 'UNDERSTAND', 'Read the current source.'),
            self.work(
                'W-INVALID',
                'PLAN',
                'Plan from missing support.',
                needs_claims=['C-MISSING'],
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            result = self.run_cli(
                'open',
                '--root',
                temp_dir,
                '--slug',
                'invalid-seed',
                '--intent-json',
                json.dumps(self.default_intent()),
                '--events-json',
                json.dumps(events),
                '--presence',
                'PRESENT',
                '--json',
                check=False,
            )

            self.assertEqual(result.returncode, 2)
            self.assertFalse(Path(temp_dir, '.steward', 'invalid-seed').exists())

    def test_advance_rejects_an_invalid_batch_without_partial_state(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(
                temp_dir,
                'invalid-advance',
                [self.work('W-VALID', 'UNDERSTAND', 'Read the current source.')],
            )
            result = self.run_cli(
                'advance',
                str(opened['work']),
                '--events-json',
                json.dumps(
                    [
                        self.event('work.started', {'id': 'W-VALID', 'actor': 'researcher'}),
                        self.event('work.started', {'id': 'W-MISSING', 'actor': 'researcher'}),
                    ]
                ),
                '--presence',
                'PRESENT',
                '--json',
                check=False,
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(result.returncode, 2)
        self.assertEqual(snapshot['revision'], 2)
        self.assertEqual(snapshot['state']['work']['W-VALID']['status'], 'AVAILABLE')

    def test_an_actor_cannot_sharpen_its_own_result(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(
                temp_dir,
                'independent-review',
                [self.work('W-PLAN', 'PLAN', 'Choose the implementation path.')],
            )
            self.advance(
                opened['work'],
                [self.event('work.started', {'id': 'W-PLAN', 'actor': 'planner'})],
            )
            self.advance(
                opened['work'],
                [
                    self.event(
                        'work.reported',
                        {
                            'id': 'W-PLAN',
                            'report': 'RP-PLAN',
                            'actor': 'planner',
                            'result': 'Use the narrow implementation seam.',
                            'evidence': ['current source'],
                        },
                    )
                ],
            )
            result = self.run_cli(
                'advance',
                str(opened['work']),
                '--events-json',
                json.dumps(
                    [
                        self.event(
                            'review.added',
                            {
                                'id': 'R-SELF',
                                'report': 'RP-PLAN',
                                'reviewer': 'planner',
                                'status': 'ADHERES',
                                'evidence': ['The planner approves its own work.'],
                                'confidence': 'HIGH',
                            },
                        )
                    ]
                ),
                '--presence',
                'PRESENT',
                '--json',
                check=False,
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(result.returncode, 2)
        self.assertIn('reviewer must differ from the reporting actor', result.stderr)
        self.assertEqual(snapshot['state']['work']['W-PLAN']['status'], 'REVIEW')

    def test_answering_an_owner_ask_releases_the_work_it_blocked(self) -> None:
        events = [
            self.work('W-PLAN', 'PLAN', 'Plan from the owner-selected meaning.'),
            self.event(
                'ask.opened',
                {
                    'id': 'A-MEANING',
                    'question': 'Which product meaning should govern?',
                    'owner': 'OWNER',
                    'why': 'Evidence cannot choose the product promise.',
                    'blocksWork': ['W-PLAN'],
                },
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'answer-owner-ask', events)
            answered = self.advance(
                opened['work'],
                [
                    self.event(
                        'ask.answered',
                        {
                            'id': 'A-MEANING',
                            'answer': 'Use navigation semantics.',
                            'evidence': ['owner answer'],
                        },
                    )
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(answered['next'], {'kind': 'PLAN', 'work': 'W-PLAN'})
        self.assertEqual(snapshot['state']['asks'], {})

    def test_work_blocked_by_an_owner_ask_cannot_start(self) -> None:
        events = [
            self.work('W-PLAN', 'PLAN', 'Plan from the owner-selected meaning.'),
            self.event(
                'ask.opened',
                {
                    'id': 'A-MEANING',
                    'question': 'Which product meaning should govern?',
                    'owner': 'OWNER',
                    'why': 'Evidence cannot choose the product promise.',
                    'blocksWork': ['W-PLAN'],
                },
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'blocked-by-owner', events)
            result = self.run_cli(
                'advance',
                str(opened['work']),
                '--events-json',
                json.dumps(
                    [self.event('work.started', {'id': 'W-PLAN', 'actor': 'planner'})]
                ),
                '--presence',
                'AWAY',
                '--json',
                check=False,
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(result.returncode, 2)
        self.assertIn('work is blocked by an active ask: W-PLAN', result.stderr)
        self.assertEqual(snapshot['state']['work']['W-PLAN']['status'], 'AVAILABLE')

    def test_active_work_must_pause_before_an_ask_can_block_it(self) -> None:
        ask = self.event(
            'ask.opened',
            {
                'id': 'A-MEANING',
                'question': 'Which product meaning should govern?',
                'owner': 'OWNER',
                'why': 'The active investigation exposed an owner-only fork.',
                'blocksWork': ['W-UNDERSTAND'],
            },
        )

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(
                temp_dir,
                'pause-before-ask',
                [self.work('W-UNDERSTAND', 'UNDERSTAND', 'Investigate the meaning.')],
            )
            self.advance(
                opened['work'],
                [
                    self.event(
                        'work.started',
                        {'id': 'W-UNDERSTAND', 'actor': 'researcher'},
                    )
                ],
            )
            rejected = self.run_cli(
                'advance',
                str(opened['work']),
                '--events-json',
                json.dumps([ask]),
                '--presence',
                'PRESENT',
                '--json',
                check=False,
            )
            accepted = self.advance(
                opened['work'],
                [
                    self.event(
                        'work.paused',
                        {
                            'id': 'W-UNDERSTAND',
                            'actor': 'researcher',
                            'reason': 'Owner judgment is required.',
                        },
                    ),
                    ask,
                ],
            )

        self.assertEqual(rejected.returncode, 2)
        self.assertIn('pause active work before blocking it: W-UNDERSTAND', rejected.stderr)
        self.assertEqual(
            accepted['next'],
            {'kind': 'ASK', 'ask': 'A-MEANING', 'owner': 'OWNER'},
        )

    def test_independent_support_keeps_work_available_after_one_backing_is_withdrawn(self) -> None:
        events = [
            self.event(
                'backing.added',
                {'id': 'B-SOURCE', 'kind': 'EVIDENCE', 'text': 'Current source supports it.'},
            ),
            self.event(
                'backing.added',
                {'id': 'B-OWNER', 'kind': 'OWNER', 'text': 'The owner also supports it.'},
            ),
            self.event(
                'claim.added',
                {
                    'id': 'C-MEANING',
                    'text': 'The meaning is independently supported.',
                    'supports': [['backing:B-SOURCE'], ['backing:B-OWNER']],
                },
            ),
            self.work(
                'W-EXECUTE',
                'EXECUTE',
                'Implement the supported meaning.',
                needs_claims=['C-MEANING'],
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(temp_dir, 'alternate-support', events)
            advanced = self.advance(
                opened['work'],
                [
                    self.event(
                        'backing.withdrawn',
                        {'id': 'B-SOURCE', 'reason': 'That source became stale.'},
                    )
                ],
            )
            snapshot = self.inspect(opened['work'])

        self.assertEqual(advanced['next'], {'kind': 'EXECUTE', 'work': 'W-EXECUTE'})
        self.assertEqual(snapshot['state']['claims']['C-MEANING']['status'], 'BACKED')
        self.assertEqual(snapshot['state']['work']['W-EXECUTE']['status'], 'AVAILABLE')

    def test_a_malformed_record_fails_closed(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(
                temp_dir,
                'malformed-record',
                [self.work('W-READ', 'UNDERSTAND', 'Read current source.')],
            )
            record = Path(str(opened['work'])) / 'record.jsonl'
            with record.open('a', encoding='utf-8') as stream:
                stream.write('{"id":"broken"}\n')
            result = self.run_cli(
                'inspect',
                str(opened['work']),
                '--presence',
                'PRESENT',
                '--json',
                check=False,
            )

        self.assertEqual(result.returncode, 2)
        self.assertIn('record line 3 at must be a non-empty string', result.stderr)

    def test_rules_require_explicit_versions(self) -> None:
        intent = self.default_intent()
        intent['rules'] = [
            {
                'id': 'mission-fit',
                'kind': 'BEHAVIOR',
                'when': 'A phase result is reviewed.',
                'expect': 'The result advances the owner Intent.',
                'owner': 'AGENT',
                'check': 'Compare the result with the current Intent.',
            }
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            result = self.run_cli(
                'open',
                '--root',
                temp_dir,
                '--slug',
                'unversioned-rule',
                '--intent-json',
                json.dumps(intent),
                '--events-json',
                json.dumps([self.work('W-READ', 'UNDERSTAND', 'Read current source.')]),
                '--presence',
                'PRESENT',
                '--json',
                check=False,
            )

            self.assertEqual(result.returncode, 2)
            self.assertIn('version must be a non-empty string', result.stderr)
            self.assertFalse(Path(temp_dir, '.steward', 'unversioned-rule').exists())

    def test_human_inspection_shows_intent_state_and_next_responsibility(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            opened = self.open_work(
                temp_dir,
                'human-view',
                [self.work('W-READ', 'UNDERSTAND', 'Read current source.')],
            )
            result = self.run_cli(
                'inspect',
                str(opened['work']),
                '--presence',
                'PRESENT',
            )

        self.assertIn('Aim: Carry the owner intent through the work.', result.stdout)
        self.assertIn('Why: The outcome must remain faithful while reality changes.', result.stdout)
        self.assertIn('[AVAILABLE] W-READ UNDERSTAND: Read current source.', result.stdout)
        self.assertIn('Next: UNDERSTAND: W-READ', result.stdout)

    def run_cli(self, *args: str, check: bool = True) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT), *args],
            check=check,
            capture_output=True,
            text=True,
        )

    def open_work(
        self,
        root: str,
        slug: str,
        events: list[dict[str, object]],
        *,
        intent: dict[str, object] | None = None,
    ) -> dict[str, object]:
        intent = intent or self.default_intent()
        return json.loads(
            self.run_cli(
                'open',
                '--root',
                root,
                '--slug',
                slug,
                '--intent-json',
                json.dumps(intent),
                '--events-json',
                json.dumps(events),
                '--presence',
                'PRESENT',
                '--json',
            ).stdout
        )

    @staticmethod
    def default_intent() -> dict[str, object]:
        return {
            'aim': 'Carry the owner intent through the work.',
            'why': 'The outcome must remain faithful while reality changes.',
            'rules': [],
            'nonGoals': [],
            'done': [
                {'id': 'landed', 'expect': 'The outcome is observed.', 'receipt': 'outcome.landed'}
            ],
        }

    def advance(
        self,
        work: object,
        events: list[dict[str, object]],
    ) -> dict[str, object]:
        return json.loads(
            self.run_cli(
                'advance',
                str(work),
                '--events-json',
                json.dumps(events),
                '--presence',
                'PRESENT',
                '--json',
            ).stdout
        )

    def inspect(self, work: object, presence: str = 'PRESENT') -> dict[str, object]:
        return json.loads(
            self.run_cli(
                'inspect',
                str(work),
                '--presence',
                presence,
                '--json',
            ).stdout
        )

    @staticmethod
    def event(event_type: str, payload: dict[str, object]) -> dict[str, object]:
        return {'type': event_type, 'payload': payload}

    @classmethod
    def work(
        cls,
        work_id: str,
        phase: str,
        text: str,
        *,
        needs_claims: list[str] | None = None,
        needs_work: list[str] | None = None,
    ) -> dict[str, object]:
        return cls.event(
            'work.added',
            {
                'id': work_id,
                'phase': phase,
                'text': text,
                'needsClaims': needs_claims or [],
                'needsWork': needs_work or [],
            },
        )


if __name__ == '__main__':
    unittest.main()
