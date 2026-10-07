#!/usr/bin/env python3
"""Project literal data-block-* attributes from HTML to a registry JSON sidecar.

Export preserves decoded attribute values and document order, including empty
values and invalid references. --check performs a separate structural check
without writing a sidecar. Neither mode infers records from rendered text.
"""
from __future__ import annotations

import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import sys

MAX_INPUT_BYTES = 16 * 1024 * 1024
FIELDS = ("id", "parent", "name", "input", "output", "constraint", "assumption", "impl")


class BlockReader(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.blocks: list[dict[str, str]] = []
        self.attribute_errors: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if "data-block-id" not in data:
            return
        names = [name for name, _value in attrs if name.startswith("data-block-")]
        if len(names) != len(set(names)):
            self.attribute_errors.append("duplicate data-block attributes on an element")
        self.blocks.append({
            field: data["data-block-" + field] or ""
            for field in FIELDS if "data-block-" + field in data
        })

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def read_blocks(path: Path) -> BlockReader:
    if path.stat().st_size > MAX_INPUT_BYTES:
        raise ValueError("input exceeds 16 MiB")
    reader = BlockReader()
    reader.feed(path.read_text(encoding="utf-8"))
    reader.close()
    if not reader.blocks:
        raise ValueError("no data-block-id attributes; select a traceable diagram")
    # HTML gives duplicate attributes no unambiguous literal value. Do not pick
    # one silently; duplicate IDs on different elements remain exportable.
    if reader.attribute_errors:
        raise ValueError("; ".join(reader.attribute_errors))
    return reader


def check_blocks(blocks: list[dict[str, str]]) -> list[str]:
    errors: list[str] = []
    counts = Counter(block["id"] for block in blocks)
    for block_id, count in counts.items():
        if not block_id.strip():
            errors.append("empty block ID")
        if count > 1:
            errors.append(f"duplicate block ID {block_id!r} ({count} entries)")
    for block in blocks:
        if not block.get("name", "").strip():
            errors.append(f"block {block['id']!r} has no nonempty name")
        if "parent" in block and block["parent"] not in counts:
            errors.append(f"block {block['id']!r} has unresolved parent {block['parent']!r}")
    # Duplicate IDs prevent an unambiguous graph, already reported above.
    if any(count > 1 for count in counts.values()):
        return errors
    parents = {block["id"]: block.get("parent") for block in blocks}
    complete: set[str] = set()
    for block_id in parents:
        path: set[str] = set()
        current: str | None = block_id
        while current in parents and current not in complete:
            if current in path:
                errors.append(f"parent cycle involving {current!r}")
                break
            path.add(current)
            current = parents[current]
        complete.update(path)
    return errors


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("file", type=Path)
    parser.add_argument("--out", type=Path, help="explicit JSON destination")
    parser.add_argument("--check", action="store_true", help="check structure only; write no JSON")
    args = parser.parse_args(argv)
    if args.check and args.out:
        parser.error("--check writes no sidecar; omit --out")
    try:
        reader = read_blocks(args.file)
        if args.check:
            errors = check_blocks(reader.blocks)
            for error in errors:
                print(f"export_registry: {error}", file=sys.stderr)
            if errors:
                return 1
            print(f"checked {len(reader.blocks)} blocks: unique IDs, named blocks, resolved acyclic parents")
            return 0
        target = args.out or args.file.with_suffix(".registry.json")
        if target.resolve() == args.file.resolve():
            raise ValueError("output must not overwrite the source HTML")
        target.write_text(json.dumps({"source": args.file.name, "blocks": reader.blocks},
                                     ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {target} ({len(reader.blocks)} blocks)")
        return 0
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"export_registry: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
