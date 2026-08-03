#!/usr/bin/env python3
"""Run the Steward command-line interface."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from runtime import (
    StewardError,
    advance_work,
    inspect_work,
    open_work,
    render_snapshot,
    render_transition,
)


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        if args.command == 'open':
            result = open_work(
                Path(args.root),
                args.slug,
                args.intent_json,
                args.events_json,
                args.presence,
            )
        elif args.command == 'advance':
            result = advance_work(Path(args.work), args.events_json, args.presence)
        else:
            result = inspect_work(Path(args.work), args.presence)
        print_result(result, args.json, args.command)
    except (OSError, json.JSONDecodeError, StewardError) as error:
        print(f'steward: {error}', file=sys.stderr)
        return 2
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog='steward.py')
    commands = parser.add_subparsers(dest='command', required=True)

    open_parser = commands.add_parser('open')
    open_parser.add_argument('--root', required=True)
    open_parser.add_argument('--slug', required=True)
    open_parser.add_argument('--intent-json', required=True)
    open_parser.add_argument('--events-json', required=True)
    add_common_options(open_parser)

    advance_parser = commands.add_parser('advance')
    advance_parser.add_argument('work')
    advance_parser.add_argument('--events-json', required=True)
    add_common_options(advance_parser)

    inspect_parser = commands.add_parser('inspect')
    inspect_parser.add_argument('work')
    add_common_options(inspect_parser)
    return parser


def add_common_options(parser: argparse.ArgumentParser) -> None:
    parser.add_argument('--presence', choices=('PRESENT', 'AWAY'), default='PRESENT')
    parser.add_argument('--json', action='store_true')


def print_result(result: dict[str, object], as_json: bool, command: str) -> None:
    if as_json:
        indent = 2 if command == 'inspect' else None
        print(json.dumps(result, indent=indent, sort_keys=True))
    elif command == 'inspect':
        print(render_snapshot(result))
    else:
        print(render_transition(result))


if __name__ == '__main__':
    raise SystemExit(main())
