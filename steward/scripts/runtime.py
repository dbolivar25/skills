"""Persist Steward events and derive mission state."""

from __future__ import annotations

import json
import re
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


SLUG_PATTERN = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
PHASES = {'UNDERSTAND', 'PLAN', 'EXECUTE'}
REVIEW_STATUSES = {'ADHERES', 'AT_RISK', 'VIOLATED', 'UNCERTAIN'}


class StewardError(Exception):
    """Raised when input or persisted state breaks the Steward contract."""


def open_work(
    root: Path,
    slug: str,
    intent_json: str,
    events_json: str,
    presence: str,
) -> dict[str, Any]:
    if not SLUG_PATTERN.fullmatch(slug):
        raise StewardError('slug must use lowercase words joined by hyphens')
    intent = parse_intent(json.loads(intent_json))
    seed = parse_event_batch(json.loads(events_json), 'open events')
    work_dir = (root / '.steward' / slug).resolve()
    if work_dir.exists():
        raise StewardError(f'work already exists: {work_dir}')

    history = [make_event('work.opened', {'intent': intent})]
    for event in seed:
        history.extend(apply_event(history, event['type'], event['payload']))
    view = derive_view(history)
    next_action = choose_next(view, presence)
    if next_action == {'kind': 'STOP', 'reason': 'No work is available.'}:
        raise StewardError('seed does not yield available work, an ask, or done state')

    work_dir.mkdir(parents=True)
    append_events(work_dir, history)
    return transition(work_dir, view, next_action)


def advance_work(work_dir: Path, events_json: str, presence: str) -> dict[str, Any]:
    history = read_record(work_dir)
    batch = parse_event_batch(json.loads(events_json), 'advance events')
    pending: list[dict[str, Any]] = []
    for event in batch:
        added = apply_event(history, event['type'], event['payload'])
        history.extend(added)
        pending.extend(added)
    append_events(work_dir, pending)
    view = derive_view(history)
    return transition(work_dir, view, choose_next(view, presence))


def inspect_work(work_dir: Path, presence: str) -> dict[str, Any]:
    view = derive_view(read_record(work_dir))
    return {
        'work': str(work_dir.resolve()),
        **view,
        'next': choose_next(view, presence),
    }


def transition(
    work_dir: Path,
    view: dict[str, Any],
    next_action: dict[str, Any],
) -> dict[str, Any]:
    return {
        'work': str(work_dir.resolve()),
        'revision': view['revision'],
        'next': next_action,
    }


def derive_view(events: list[dict[str, Any]]) -> dict[str, Any]:
    if not events or events[0]['type'] != 'work.opened':
        raise StewardError('record does not start with work.opened')
    intent = derive_intent(events)
    backings = derive_backings(events)
    claims = derive_claims(events, backings)
    receipts = derive_receipts(events)
    receipt_types = {receipt['type'] for receipt in receipts.values()}
    met = [item['id'] for item in intent['done'] if item['receipt'] in receipt_types]
    open_items = [item['id'] for item in intent['done'] if item['id'] not in met]
    return {
        'intent': intent,
        'state': {
            'asks': derive_asks(events),
            'backings': backings,
            'claims': claims,
            'done': {'met': met, 'open': open_items},
            'receipts': receipts,
            'reviews': derive_reviews(events),
            'work': derive_work(events, claims),
        },
        'revision': len(events),
    }


def choose_next(view: dict[str, Any], presence: str) -> dict[str, Any]:
    state = view['state']
    asks = state['asks']
    work = state['work']

    if presence == 'PRESENT' and asks:
        ask_id, ask = next(iter(asks.items()))
        return {'kind': 'ASK', 'ask': ask_id, 'owner': ask['owner']}

    for work_id, item in work.items():
        if item['status'] == 'REVIEW' and 'review' not in item:
            return {
                'kind': 'REVIEW',
                'work': work_id,
                'report': item['report'],
                'phase': item['phase'],
            }
        if item['status'] == 'REVIEW':
            return {
                'kind': item['phase'],
                'work': work_id,
                'review': item['review'],
            }

    blocked = {
        work_id
        for ask in asks.values()
        for work_id in ask['blocksWork']
    }
    for work_id, item in work.items():
        if item['status'] == 'AVAILABLE' and work_id not in blocked:
            return {'kind': item['phase'], 'work': work_id}

    if asks:
        ask_id, ask = next(iter(asks.items()))
        return {'kind': 'ASK', 'ask': ask_id, 'owner': ask['owner']}

    active = [work_id for work_id, item in work.items() if item['status'] == 'ACTIVE']
    if active:
        return {'kind': 'WAIT', 'active': active}
    paused = [work_id for work_id, item in work.items() if item['status'] == 'PAUSED']
    if paused:
        return {'kind': 'WAIT', 'paused': paused}
    if not state['done']['open']:
        return {'kind': 'DONE'}
    return {'kind': 'STOP', 'reason': 'No work is available.'}


def apply_event(
    events: list[dict[str, Any]],
    event_type: str,
    raw_payload: Any,
) -> list[dict[str, Any]]:
    payload = parse_event_payload(event_type, raw_payload)
    backings = derive_backings(events)
    claims = derive_claims(events, backings)
    work = derive_work(events, claims)
    asks = derive_asks(events)

    identity_events = {
        'ask.opened': 'ask',
        'backing.added': 'backing',
        'claim.added': 'claim',
        'receipt.added': 'receipt',
        'review.added': 'review',
        'work.added': 'work',
    }
    if event_type in identity_events and any(
        event['type'] == event_type and event['payload']['id'] == payload['id']
        for event in events
    ):
        raise StewardError(f"duplicate {identity_events[event_type]}: {payload['id']}")

    if event_type == 'backing.withdrawn' and payload['id'] not in backings:
        raise StewardError(f"unknown active backing: {payload['id']}")
    if event_type == 'receipt.withdrawn' and payload['id'] not in derive_receipts(events):
        raise StewardError(f"unknown active receipt: {payload['id']}")
    if event_type == 'claim.added':
        for support_set in payload['supports']:
            for ref in support_set:
                kind, ref_id = ref.split(':')
                if kind == 'backing' and ref_id not in backings:
                    raise StewardError(f'unknown support: {ref}')
                if kind == 'claim' and ref_id not in claims:
                    raise StewardError(f'unknown support: {ref}')
    if event_type == 'work.added':
        for claim_id in payload['needsClaims']:
            if claim_id not in claims:
                raise StewardError(f'unknown claim: {claim_id}')
        for work_id in payload['needsWork']:
            if work_id not in work:
                raise StewardError(f'unknown work: {work_id}')
    if event_type == 'work.started':
        require_work_status(work, payload['id'], {'AVAILABLE'}, 'work is not available')
        require_no_blocking_ask(asks, payload['id'])
    if event_type == 'work.paused':
        item = require_work_status(work, payload['id'], {'ACTIVE'}, 'work is not active')
        if item.get('actor') != payload['actor']:
            raise StewardError(f"work is not active for actor: {payload['id']}")
    if event_type == 'work.resumed':
        require_work_status(work, payload['id'], {'PAUSED', 'REVIEW'}, 'work cannot resume')
        require_no_blocking_ask(asks, payload['id'])
    if event_type == 'work.reported':
        item = require_work_status(work, payload['id'], {'ACTIVE'}, 'work is not active')
        if item.get('actor') != payload['actor']:
            raise StewardError(f"work is not active for actor: {payload['id']}")
        if find_report(events, payload['report']) is not None:
            raise StewardError(f"duplicate report: {payload['report']}")
    if event_type == 'review.added':
        report = find_report(events, payload['report'])
        if report is None:
            raise StewardError(f"unknown report: {payload['report']}")
        item = work[report['id']]
        if item['status'] != 'REVIEW' or item.get('report') != payload['report']:
            raise StewardError(f"report is not awaiting review: {payload['report']}")
        if report['actor'] == payload['reviewer']:
            raise StewardError('reviewer must differ from the reporting actor')
        if any(
            event['type'] == 'review.added' and event['payload']['report'] == payload['report']
            for event in events
        ):
            raise StewardError(f"report already reviewed: {payload['report']}")
    if event_type == 'work.stopped':
        require_work_status(
            work,
            payload['id'],
            {'AVAILABLE', 'BLOCKED', 'ACTIVE', 'PAUSED', 'REVIEW'},
            'work cannot stop',
        )
    if event_type == 'ask.opened':
        for work_id in payload['blocksWork']:
            if work_id not in work:
                raise StewardError(f'ask blocks unknown work: {work_id}')
            if work[work_id]['status'] == 'ACTIVE':
                raise StewardError(f'pause active work before blocking it: {work_id}')
    if event_type == 'ask.answered' and payload['id'] not in derive_asks(events):
        raise StewardError(f"unknown active ask: {payload['id']}")

    added = [make_event(event_type, payload)]
    if event_type in {'backing.withdrawn', 'work.stopped'}:
        future_events = events + added
        future_backings = derive_backings(future_events)
        future_claims = derive_claims(future_events, future_backings)
        future_work = derive_work(future_events, future_claims)
        for work_id in work_to_stop(future_work, future_claims):
            added.append(
                make_event(
                    'work.stopped',
                    {'id': work_id, 'reason': stop_reason(event_type, payload)},
                )
            )
    return added


def require_work_status(
    work: dict[str, dict[str, Any]],
    work_id: str,
    statuses: set[str],
    message: str,
) -> dict[str, Any]:
    item = work.get(work_id)
    if item is None:
        raise StewardError(f'unknown work: {work_id}')
    if item['status'] not in statuses:
        raise StewardError(f'{message}: {work_id}')
    return item


def require_no_blocking_ask(asks: dict[str, dict[str, Any]], work_id: str) -> None:
    if any(work_id in ask['blocksWork'] for ask in asks.values()):
        raise StewardError(f'work is blocked by an active ask: {work_id}')


def find_report(events: list[dict[str, Any]], report_id: str) -> dict[str, Any] | None:
    for event in events:
        if event['type'] == 'work.reported' and event['payload']['report'] == report_id:
            return event['payload']
    return None


def stop_reason(event_type: str, payload: dict[str, Any]) -> str:
    if event_type == 'backing.withdrawn':
        return f"Backing {payload['id']} was withdrawn."
    return f"Required work {payload['id']} stopped."


def render_view(view: dict[str, Any]) -> str:
    intent = view['intent']
    state = view['state']
    lines = [f"Aim: {intent['aim']}", f"Why: {intent['why']}"]
    if intent['nonGoals']:
        lines.extend(['', 'Non-goals:', *[f'- {item}' for item in intent['nonGoals']]])
    if intent['rules']:
        lines.extend(['', 'Rules:'])
        for rule in intent['rules']:
            lines.append(f"- {rule['id']}@{rule['version']} {rule['kind']}: {rule['expect']}")

    lines.extend(['', 'Done:'])
    met = set(state['done']['met'])
    for item in intent['done']:
        mark = 'x' if item['id'] in met else ' '
        lines.append(f"- [{mark}] {item['expect']}")

    if state['claims']:
        lines.extend(['', 'Claims:'])
        for claim_id, claim in state['claims'].items():
            lines.append(f"- [{claim['status']}] {claim_id}: {claim['text']}")
    if state['work']:
        lines.extend(['', 'Work:'])
        for work_id, item in state['work'].items():
            actor = f" @{item['actor']}" if 'actor' in item else ''
            lines.append(f"- [{item['status']}] {work_id} {item['phase']}{actor}: {item['text']}")
    if state['asks']:
        lines.extend(['', 'Asks:'])
        for ask_id, ask in state['asks'].items():
            lines.append(f"- {ask_id} {ask['owner']}: {ask['question']}")
    if state['reviews']:
        lines.extend(['', 'Reviews:'])
        for review_id, review in state['reviews'].items():
            lines.append(
                f"- [{review['status']}/{review['confidence']}] "
                f"{review_id} {review['work']} by {review['reviewer']}"
            )
    lines.extend(['', f"Record revision: {view['revision']}"])
    return '\n'.join(lines)


def render_next(next_action: dict[str, Any]) -> str:
    if next_action['kind'] == 'REVIEW':
        return f"REVIEW: {next_action['work']} ({next_action['report']})"
    if 'ask' in next_action:
        return f"ASK: {next_action['ask']} ({next_action['owner']})"
    if 'work' in next_action:
        return f"{next_action['kind']}: {next_action['work']}"
    if 'active' in next_action:
        return f"WAIT: {', '.join(next_action['active'])} active"
    if 'paused' in next_action:
        return f"WAIT: {', '.join(next_action['paused'])} paused"
    if 'reason' in next_action:
        return f"{next_action['kind']}: {next_action['reason']}"
    return next_action['kind']


def render_transition(result: dict[str, Any]) -> str:
    return '\n'.join(
        [
            f"Work: {result['work']}",
            f"Revision: {result['revision']}",
            f"Next: {render_next(result['next'])}",
        ]
    )


def render_snapshot(snapshot: dict[str, Any]) -> str:
    return f"{render_view(snapshot)}\n\nNext: {render_next(snapshot['next'])}"


def make_event(event_type: str, payload: dict[str, Any]) -> dict[str, Any]:
    return {
        'id': str(uuid.uuid4()),
        'at': datetime.now(timezone.utc).isoformat(),
        'type': event_type,
        'payload': payload,
    }


def append_events(work_dir: Path, events: list[dict[str, Any]]) -> None:
    record_path = work_dir / 'record.jsonl'
    with record_path.open('a', encoding='utf-8') as record:
        record.write(''.join(json.dumps(event, sort_keys=True) + '\n' for event in events))


def read_record(work_dir: Path) -> list[dict[str, Any]]:
    record_path = work_dir / 'record.jsonl'
    if not record_path.is_file():
        raise StewardError(f'missing record: {record_path}')
    events: list[dict[str, Any]] = []
    event_ids: set[str] = set()
    for line_number, line in enumerate(record_path.read_text(encoding='utf-8').splitlines(), 1):
        raw = json.loads(line)
        if not isinstance(raw, dict):
            raise StewardError(f'record line {line_number} must be an object')
        event = parse_record_event(raw, line_number)
        if event['id'] in event_ids:
            raise StewardError(f"duplicate record event id: {event['id']}")
        event_ids.add(event['id'])
        events.append(event)
    return events


def parse_record_event(raw: dict[str, Any], line_number: int) -> dict[str, Any]:
    label = f'record line {line_number}'
    event_id = require_text(raw, 'id', label)
    at = require_text(raw, 'at', label)
    event_type = require_text(raw, 'type', label)
    payload = raw.get('payload')
    if not isinstance(payload, dict):
        raise StewardError(f'{label} payload must be an object')
    if event_type == 'work.opened':
        if line_number != 1:
            raise StewardError('work.opened is only valid on record line 1')
        parsed_payload = {'intent': parse_intent(payload.get('intent'))}
    else:
        parsed_payload = parse_event_payload(event_type, payload)
    return {'id': event_id, 'at': at, 'type': event_type, 'payload': parsed_payload}


def parse_intent(raw: Any) -> dict[str, Any]:
    if not isinstance(raw, dict):
        raise StewardError('intent must be an object')
    aim = require_text(raw, 'aim', 'intent')
    why = require_text(raw, 'why', 'intent')
    rules = raw.get('rules')
    non_goals = raw.get('nonGoals')
    done = raw.get('done')
    if not isinstance(rules, list):
        raise StewardError('intent.rules must be a list')
    if not isinstance(non_goals, list) or not all(
        isinstance(item, str) and item.strip() for item in non_goals
    ):
        raise StewardError('intent.nonGoals must be a string list')
    if not isinstance(done, list) or not done:
        raise StewardError('intent.done must be a non-empty list')
    parsed_rules = [parse_rule(item, index) for index, item in enumerate(rules)]
    parsed_done = [parse_done_item(item, index) for index, item in enumerate(done)]
    ensure_unique_ids(parsed_rules, 'intent.rules')
    ensure_unique_ids(parsed_done, 'intent.done')
    return {
        'aim': aim,
        'why': why,
        'rules': parsed_rules,
        'nonGoals': [item.strip() for item in non_goals],
        'done': parsed_done,
    }


def parse_rule(raw: Any, index: int) -> dict[str, str]:
    if not isinstance(raw, dict):
        raise StewardError(f'intent.rules[{index}] must be an object')
    label = f'intent.rules[{index}]'
    return {
        'id': require_text(raw, 'id', label),
        'version': require_text(raw, 'version', label),
        'kind': require_choice(raw, 'kind', label, {'MUST', 'PREFER', 'AUTHORITY', 'BEHAVIOR'}),
        'when': require_text(raw, 'when', label),
        'expect': require_text(raw, 'expect', label),
        'owner': require_choice(raw, 'owner', label, {'AGENT', 'OWNER', 'EXTERNAL', 'SYSTEM'}),
        'check': require_text(raw, 'check', label),
    }


def parse_done_item(raw: Any, index: int) -> dict[str, str]:
    if not isinstance(raw, dict):
        raise StewardError(f'intent.done[{index}] must be an object')
    label = f'intent.done[{index}]'
    return {
        'id': require_text(raw, 'id', label),
        'expect': require_text(raw, 'expect', label),
        'receipt': require_text(raw, 'receipt', label),
    }


def parse_event_payload(event_type: str, raw: Any) -> dict[str, Any]:
    if not isinstance(raw, dict):
        raise StewardError('event payload must be an object')
    if event_type == 'intent.revised':
        return {
            'intent': parse_intent(raw.get('intent')),
            'reason': require_text(raw, 'reason', event_type),
            'evidence': require_text_list(raw, 'evidence', event_type),
        }
    if event_type == 'receipt.added':
        return {
            'id': require_text(raw, 'id', event_type),
            'type': require_text(raw, 'type', event_type),
            'evidence': require_text_list(raw, 'evidence', event_type),
        }
    if event_type == 'receipt.withdrawn':
        return {
            'id': require_text(raw, 'id', event_type),
            'reason': require_text(raw, 'reason', event_type),
        }
    if event_type == 'backing.added':
        return {
            'id': require_text(raw, 'id', event_type),
            'kind': require_choice(raw, 'kind', event_type, {'EVIDENCE', 'OWNER', 'POLICY'}),
            'text': require_text(raw, 'text', event_type),
        }
    if event_type == 'backing.withdrawn':
        return {
            'id': require_text(raw, 'id', event_type),
            'reason': require_text(raw, 'reason', event_type),
        }
    if event_type == 'claim.added':
        supports = raw.get('supports')
        if not isinstance(supports, list) or not supports:
            raise StewardError('claim.added supports must be a non-empty list')
        return {
            'id': require_text(raw, 'id', event_type),
            'text': require_text(raw, 'text', event_type),
            'supports': [
                parse_support_set(item, index)
                for index, item in enumerate(supports)
            ],
        }
    if event_type == 'work.added':
        return {
            'id': require_text(raw, 'id', event_type),
            'phase': require_choice(raw, 'phase', event_type, PHASES),
            'text': require_text(raw, 'text', event_type),
            'needsClaims': require_text_list(raw, 'needsClaims', event_type, allow_empty=True),
            'needsWork': require_text_list(raw, 'needsWork', event_type, allow_empty=True),
        }
    if event_type == 'work.started':
        return {
            'id': require_text(raw, 'id', event_type),
            'actor': require_text(raw, 'actor', event_type),
        }
    if event_type in {'work.paused', 'work.resumed'}:
        return {
            'id': require_text(raw, 'id', event_type),
            'actor': require_text(raw, 'actor', event_type),
            'reason': require_text(raw, 'reason', event_type),
        }
    if event_type == 'work.reported':
        return {
            'id': require_text(raw, 'id', event_type),
            'report': require_text(raw, 'report', event_type),
            'actor': require_text(raw, 'actor', event_type),
            'result': require_text(raw, 'result', event_type),
            'evidence': require_text_list(raw, 'evidence', event_type),
        }
    if event_type == 'work.stopped':
        return {
            'id': require_text(raw, 'id', event_type),
            'reason': require_text(raw, 'reason', event_type),
        }
    if event_type == 'review.added':
        return {
            'id': require_text(raw, 'id', event_type),
            'report': require_text(raw, 'report', event_type),
            'reviewer': require_text(raw, 'reviewer', event_type),
            'status': require_choice(raw, 'status', event_type, REVIEW_STATUSES),
            'evidence': require_text_list(raw, 'evidence', event_type),
            'confidence': require_choice(raw, 'confidence', event_type, {'LOW', 'MEDIUM', 'HIGH'}),
        }
    if event_type == 'ask.opened':
        return {
            'id': require_text(raw, 'id', event_type),
            'question': require_text(raw, 'question', event_type),
            'owner': require_choice(raw, 'owner', event_type, {'OWNER', 'EXTERNAL'}),
            'why': require_text(raw, 'why', event_type),
            'blocksWork': require_text_list(raw, 'blocksWork', event_type, allow_empty=True),
        }
    if event_type == 'ask.answered':
        return {
            'id': require_text(raw, 'id', event_type),
            'answer': require_text(raw, 'answer', event_type),
            'evidence': require_text_list(raw, 'evidence', event_type),
        }
    raise StewardError(f'unsupported event type: {event_type}')


def parse_event_batch(raw: Any, label: str) -> list[dict[str, Any]]:
    if not isinstance(raw, list) or not raw:
        raise StewardError(f'{label} must be a non-empty list')
    batch: list[dict[str, Any]] = []
    for index, item in enumerate(raw):
        if not isinstance(item, dict):
            raise StewardError(f'{label}[{index}] must be an object')
        event_type = require_text(item, 'type', f'{label}[{index}]')
        batch.append({'type': event_type, 'payload': item.get('payload')})
    return batch


def derive_intent(events: list[dict[str, Any]]) -> dict[str, Any]:
    intent = events[0]['payload']['intent']
    for event in events:
        if event['type'] == 'intent.revised':
            intent = event['payload']['intent']
    return intent


def derive_backings(events: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    active: dict[str, dict[str, Any]] = {}
    for event in events:
        if event['type'] == 'backing.added':
            active[event['payload']['id']] = event['payload']
        elif event['type'] == 'backing.withdrawn':
            active.pop(event['payload']['id'], None)
    return active


def derive_claims(
    events: list[dict[str, Any]],
    backings: dict[str, dict[str, Any]],
) -> dict[str, dict[str, Any]]:
    claims: dict[str, dict[str, Any]] = {}
    for event in events:
        if event['type'] == 'claim.added':
            claims[event['payload']['id']] = {
                **event['payload'],
                'status': 'UNBACKED',
            }
    for _ in range(len(claims)):
        changed = False
        for claim in claims.values():
            backed = any(
                all(support_is_live(ref, backings, claims) for ref in support_set)
                for support_set in claim['supports']
            )
            status = 'BACKED' if backed else 'UNBACKED'
            if claim['status'] != status:
                claim['status'] = status
                changed = True
        if not changed:
            break
    return claims


def derive_work(
    events: list[dict[str, Any]],
    claims: dict[str, dict[str, Any]],
) -> dict[str, dict[str, Any]]:
    work: dict[str, dict[str, Any]] = {}
    for event in events:
        payload = event['payload']
        if event['type'] == 'work.added':
            work[payload['id']] = {**payload, 'status': 'BLOCKED'}
        elif event['type'] == 'work.started' and payload['id'] in work:
            item = work[payload['id']]
            item['status'] = 'ACTIVE'
            item['actor'] = payload['actor']
        elif event['type'] == 'work.paused' and payload['id'] in work:
            item = work[payload['id']]
            item['status'] = 'PAUSED'
            item['pauseReason'] = payload['reason']
        elif event['type'] == 'work.resumed' and payload['id'] in work:
            item = work[payload['id']]
            item['status'] = 'ACTIVE'
            item['actor'] = payload['actor']
            for key in ('pauseReason', 'report', 'result', 'evidence', 'review', 'reviewStatus'):
                item.pop(key, None)
        elif event['type'] == 'work.reported' and payload['id'] in work:
            item = work[payload['id']]
            item['status'] = 'REVIEW'
            item['report'] = payload['report']
            item['result'] = payload['result']
            item['evidence'] = payload['evidence']
        elif event['type'] == 'review.added':
            for item in work.values():
                if item.get('report') != payload['report']:
                    continue
                item['review'] = payload['id']
                item['reviewStatus'] = payload['status']
                if payload['status'] == 'ADHERES':
                    item['status'] = 'DONE'
                break
        elif event['type'] == 'work.stopped' and payload['id'] in work:
            item = work[payload['id']]
            if item['status'] != 'DONE':
                item['status'] = 'STOPPED'
                item['stopReason'] = payload['reason']

    for item in work.values():
        if item['status'] not in {'AVAILABLE', 'BLOCKED'}:
            continue
        claims_met = all(
            claim_id in claims and claims[claim_id]['status'] == 'BACKED'
            for claim_id in item['needsClaims']
        )
        work_met = all(
            work_id in work and work[work_id]['status'] == 'DONE'
            for work_id in item['needsWork']
        )
        item['status'] = 'AVAILABLE' if claims_met and work_met else 'BLOCKED'
    return work


def derive_reviews(events: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    reports = {
        event['payload']['report']: event['payload']['id']
        for event in events
        if event['type'] == 'work.reported'
    }
    return {
        event['payload']['id']: {
            **event['payload'],
            'work': reports[event['payload']['report']],
        }
        for event in events
        if event['type'] == 'review.added'
    }


def derive_asks(events: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    active: dict[str, dict[str, Any]] = {}
    for event in events:
        if event['type'] == 'ask.opened':
            active[event['payload']['id']] = event['payload']
        elif event['type'] == 'ask.answered':
            active.pop(event['payload']['id'], None)
    return active


def derive_receipts(events: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    active: dict[str, dict[str, Any]] = {}
    for event in events:
        if event['type'] == 'receipt.added':
            active[event['payload']['id']] = event['payload']
        elif event['type'] == 'receipt.withdrawn':
            active.pop(event['payload']['id'], None)
    return active


def work_to_stop(
    work: dict[str, dict[str, Any]],
    claims: dict[str, dict[str, Any]],
) -> list[str]:
    stopped = {
        work_id
        for work_id, item in work.items()
        if item['status'] == 'STOPPED'
    }
    changed = True
    while changed:
        changed = False
        for work_id, item in work.items():
            if work_id in stopped or item['status'] == 'DONE':
                continue
            lost_claim = any(
                claim_id not in claims or claims[claim_id]['status'] != 'BACKED'
                for claim_id in item['needsClaims']
            )
            lost_work = any(required_id in stopped for required_id in item['needsWork'])
            if lost_claim or lost_work:
                stopped.add(work_id)
                changed = True
    return [
        work_id
        for work_id, item in work.items()
        if work_id in stopped and item['status'] != 'STOPPED'
    ]


def support_is_live(
    ref: str,
    backings: dict[str, dict[str, Any]],
    claims: dict[str, dict[str, Any]],
) -> bool:
    kind, _, ref_id = ref.partition(':')
    if kind == 'backing':
        return ref_id in backings
    if kind == 'claim':
        return ref_id in claims and claims[ref_id]['status'] == 'BACKED'
    return False


def parse_support_set(raw: Any, index: int) -> list[str]:
    if not isinstance(raw, list) or not raw:
        raise StewardError(f'claim.added supports[{index}] must be a non-empty list')
    parsed: list[str] = []
    for ref in raw:
        if not isinstance(ref, str) or ref.count(':') != 1:
            raise StewardError(f'claim.added supports[{index}] has an invalid reference')
        kind, ref_id = ref.split(':')
        if kind not in {'backing', 'claim'} or not ref_id:
            raise StewardError(f'claim.added supports[{index}] has an invalid reference')
        parsed.append(ref)
    return parsed


def require_text(raw: dict[str, Any], field: str, label: str) -> str:
    value = raw.get(field)
    if not isinstance(value, str) or not value.strip():
        raise StewardError(f'{label} {field} must be a non-empty string')
    return value.strip()


def require_text_list(
    raw: dict[str, Any],
    field: str,
    label: str,
    *,
    allow_empty: bool = False,
) -> list[str]:
    value = raw.get(field)
    if not isinstance(value, list) or (not allow_empty and not value):
        raise StewardError(f'{label} {field} must be a string list')
    if not all(isinstance(item, str) and item.strip() for item in value):
        raise StewardError(f'{label} {field} must be a string list')
    return [item.strip() for item in value]


def require_choice(
    raw: dict[str, Any],
    field: str,
    label: str,
    choices: set[str],
) -> str:
    value = require_text(raw, field, label)
    if value not in choices:
        raise StewardError(f"{label} {field} must be one of: {', '.join(sorted(choices))}")
    return value


def ensure_unique_ids(items: list[dict[str, str]], label: str) -> None:
    ids = [item['id'] for item in items]
    if len(ids) != len(set(ids)):
        raise StewardError(f'{label} ids must be unique')
