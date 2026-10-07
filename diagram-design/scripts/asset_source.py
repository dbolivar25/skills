#!/usr/bin/env python3
"""Recover one original diagram example or icon without extracting the catalog."""

import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys


PACKAGE_ROOT = Path(__file__).resolve().parents[1]
CATALOGS = {
    "example": ("index.html", "diagram-example-sources"),
    "icon": ("icons.html", "diagram-icon-sources"),
}
NAME = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*\Z")
VARIANTS = ("light", "dark", "full")


class _CatalogParser(HTMLParser):
    def __init__(self, data_id):
        super().__init__(convert_charrefs=False)
        self.data_id = data_id
        self.records = []
        self.parts = None

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag == "script" and attributes.get("id") == self.data_id:
            if attributes.get("type") != "application/json":
                raise ValueError(f"Source catalog {self.data_id!r} must contain JSON")
            self.parts = []

    def handle_data(self, data):
        if self.parts is not None:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self.parts is not None:
            self.records.append("".join(self.parts))
            self.parts = None


def _unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate source catalog key {key!r}")
        result[key] = value
    return result


def _catalog(kind, package_root):
    filename, data_id = CATALOGS[kind]
    parser = _CatalogParser(data_id)
    parser.feed((package_root / "assets" / filename).read_bytes().decode("utf-8"))
    parser.close()
    if len(parser.records) != 1 or parser.parts is not None:
        raise ValueError(f"Expected one complete source catalog {data_id!r}")
    try:
        sources = json.loads(parser.records[0], object_pairs_hook=_unique_object)
    except json.JSONDecodeError as error:
        raise ValueError(f"Invalid JSON in source catalog {data_id!r}: {error.msg}") from error
    if not isinstance(sources, dict) or not all(
        isinstance(name, str) and isinstance(source, str)
        for name, source in sources.items()
    ):
        raise ValueError(f"Source catalog {data_id!r} must map names to source text")
    return sources


def _root(package_root):
    return PACKAGE_ROOT if package_root is None else Path(package_root).resolve()


def _check_kind(kind):
    if kind not in CATALOGS:
        raise ValueError("Asset kind must be 'example' or 'icon'")


def list_sources(kind, *, package_root=None):
    """Return available names; example names include the retained single demos."""
    _check_kind(kind)
    root = _root(package_root)
    if kind == "icon":
        return tuple(sorted(_catalog(kind, root)))
    return tuple(sorted(
        path.stem.removeprefix("example-")
        for path in (root / "assets").glob("example-*.html")
    ))


def load_source(kind, name, variant="light", *, package_root=None):
    """Return byte-exact UTF-8 source for a named example or complete SVG icon."""
    _check_kind(kind)
    if not isinstance(name, str) or not NAME.fullmatch(name):
        raise ValueError("Use an asset name from --list, without a path or extension")
    if variant not in VARIANTS:
        raise ValueError("Example variant must be light, dark, or full")
    root = _root(package_root)
    if kind == "icon":
        if variant != "light":
            raise ValueError("Icons do not have theme variants")
        sources = _catalog(kind, root)
        if name not in sources:
            raise ValueError(f"Unknown icon {name!r}; use icon --list")
        return sources[name].encode("utf-8")
    if name not in list_sources(kind, package_root=root):
        raise ValueError(f"Unknown example {name!r}; use example --list")
    if variant == "light":
        return (root / "assets" / f"example-{name}.html").read_bytes()
    filename = f"example-{name}-{variant}.html"
    sources = _catalog(kind, root)
    if filename not in sources:
        raise ValueError(f"Example {name!r} has no {variant} variant")
    return sources[filename].encode("utf-8")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="kind", required=True)
    for kind in CATALOGS:
        command = subparsers.add_parser(kind)
        command.add_argument("name", nargs="?")
        command.add_argument("--list", action="store_true", help="list available names")
        command.add_argument("--output", type=Path, help="write one source outside this skill package")
        if kind == "example":
            command.add_argument("--variant", choices=VARIANTS, default="light")
    args = parser.parse_args(argv)
    try:
        if args.list:
            if args.name or args.output or getattr(args, "variant", "light") != "light":
                parser.error("--list cannot be combined with a name, output, or variant")
            print("\n".join(list_sources(args.kind)))
            return 0
        if args.name is None:
            parser.error("an asset name is required; use --list to see available names")
        source = load_source(args.kind, args.name, getattr(args, "variant", "light"))
        if args.output is None:
            sys.stdout.buffer.write(source)
        else:
            output = args.output.expanduser().resolve()
            if output == PACKAGE_ROOT or PACKAGE_ROOT in output.parents:
                parser.error("--output must be outside the skill package")
            output.write_bytes(source)
        return 0
    except (OSError, UnicodeError, ValueError) as error:
        parser.error(str(error))


if __name__ == "__main__":
    raise SystemExit(main())
