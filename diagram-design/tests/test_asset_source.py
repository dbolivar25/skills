"""Exact recovery against hashes frozen from the original assets, before bundling."""

import hashlib
from html.parser import HTMLParser
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import unittest
from xml.etree import ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "asset_source.py"
SPEC = importlib.util.spec_from_file_location("diagram_asset_source", SCRIPT)
asset_source = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(asset_source)
ORACLE = json.loads((ROOT / "tests" / "asset_source_hashes.json").read_bytes())


class _Ids(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = []
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        value = dict(attributes).get("id")
        if value is not None:
            self.ids.append(value)


def digest(source):
    return hashlib.sha256(source).hexdigest()


def example_lookup(filename):
    name = filename.removeprefix("example-").removesuffix(".html")
    for variant in ("dark", "full"):
        if name.endswith("-" + variant):
            return name.removesuffix("-" + variant), variant
    return name, "light"


class AssetSourceTests(unittest.TestCase):
    def cli(self, *arguments):
        return subprocess.run([sys.executable, str(SCRIPT), *map(str, arguments)], capture_output=True)

    def test_all_original_examples_recover_exactly(self):
        self.assertEqual(146, len(ORACLE["examples"]))
        bundled = retained = 0
        for filename, expected in ORACLE["examples"].items():
            with self.subTest(filename=filename):
                name, variant = example_lookup(filename)
                source = asset_source.load_source("example", name, variant)
                self.assertEqual(expected, digest(source))
                if variant == "light":
                    retained += 1
                    self.assertTrue((ROOT / "assets" / filename).is_file())
                else:
                    bundled += 1
                    self.assertFalse((ROOT / "assets" / filename).exists())
        self.assertEqual((92, 54), (bundled, retained))

    def test_all_original_complete_icons_recover_exactly(self):
        self.assertEqual(87, len(ORACLE["icons"]))
        for name, expected in ORACLE["icons"].items():
            with self.subTest(name=name):
                source = asset_source.load_source("icon", name)
                self.assertEqual(expected, digest(source))
                self.assertEqual("{http://www.w3.org/2000/svg}svg", ET.fromstring(source).tag)
                self.assertFalse((ROOT / "assets" / "icons" / f"{name}.svg").exists())

    def test_catalog_names_and_real_html_fragments_cover_every_source(self):
        expected_names = {example_lookup(filename)[0] for filename in ORACLE["examples"]}
        self.assertEqual(expected_names, set(asset_source.list_sources("example")))
        self.assertEqual(set(ORACLE["icons"]), set(asset_source.list_sources("icon")))
        for kind, filename, expected in (
            ("example", "index.html", {path.removesuffix(".html") for path in ORACLE["examples"]}),
            ("icon", "icons.html", {"icon-" + name for name in ORACLE["icons"]}),
        ):
            with self.subTest(kind=kind):
                ids = _Ids((ROOT / "assets" / filename).read_bytes().decode("utf-8")).ids
                self.assertEqual(len(ids), len(set(ids)), "gallery IDs must be unique")
                self.assertTrue(expected.issubset(ids))

    def test_existing_icon_preview_markup_is_unchanged(self):
        gallery = (ROOT / "assets" / "icons.html").read_bytes().decode("utf-8")
        previews = re.findall(r'<div class="icon">(.*?)</div><div class="name">([^<]+)</div>', gallery, re.S)
        self.assertEqual(87, len(previews))
        self.assertEqual(ORACLE["icon_previews"], {name: digest(svg.encode("utf-8")) for svg, name in previews})

    def test_cli_stdout_and_one_standalone_output_are_exact(self):
        for arguments, expected in (
            (("example", "architecture", "--variant", "dark"), ORACLE["examples"]["example-architecture-dark.html"]),
            (("example", "architecture"), ORACLE["examples"]["example-architecture.html"]),
            (("icon", "user"), ORACLE["icons"]["user"]),
        ):
            with self.subTest(arguments=arguments):
                result = self.cli(*arguments)
                self.assertEqual(0, result.returncode, result.stderr)
                self.assertEqual(b"", result.stderr)
                self.assertEqual(expected, digest(result.stdout))
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "architecture.html"
            result = self.cli("example", "architecture", "--variant", "full", "--output", output)
            self.assertEqual(0, result.returncode, result.stderr)
            self.assertEqual(b"", result.stdout)
            self.assertEqual(ORACLE["examples"]["example-architecture-full.html"], digest(output.read_bytes()))
            self.assertEqual([output], list(Path(directory).iterdir()))

    def test_invalid_lookups_do_not_resolve_paths_or_variant_suffixes(self):
        cases = [
            ("icon", "../user", "light"),
            ("icon", "/tmp/user", "light"),
            ("icon", "user.svg", "light"),
            ("icon", "User", "light"),
            ("icon", "not-an-icon", "light"),
            ("icon", "user", "dark"),
            ("example", "architecture-dark", "light"),
            ("example", "architecture", "editorial"),
            ("example", "import-drawio", "dark"),
            ("unknown", "user", "light"),
        ]
        for kind, name, variant in cases:
            with self.subTest(kind=kind, name=name, variant=variant):
                with self.assertRaises(ValueError):
                    asset_source.load_source(kind, name, variant)
        result = self.cli("icon", "../user")
        self.assertEqual(2, result.returncode)
        self.assertEqual(b"", result.stdout)
        self.assertIn(b"without a path or extension", result.stderr)
        self.assertNotIn(b"Traceback", result.stderr)

    def test_cli_refuses_outputs_inside_the_skill_including_symlinks(self):
        forbidden = ROOT / "assets" / "should-not-exist.svg"
        self.assertFalse(forbidden.exists())
        result = self.cli("icon", "user", "--output", forbidden)
        self.assertEqual(2, result.returncode)
        self.assertIn(b"outside the skill package", result.stderr)
        self.assertFalse(forbidden.exists())
        with tempfile.TemporaryDirectory() as directory:
            link = Path(directory) / "package"
            link.symlink_to(ROOT, target_is_directory=True)
            result = self.cli("icon", "user", "--output", link / "assets" / forbidden.name)
            self.assertEqual(2, result.returncode)
            self.assertIn(b"outside the skill package", result.stderr)
            self.assertFalse(forbidden.exists())

    def test_cli_list_and_expected_io_errors_are_readable(self):
        result = self.cli("icon", "--list")
        self.assertEqual(0, result.returncode, result.stderr)
        self.assertEqual(set(ORACLE["icons"]), set(result.stdout.decode().splitlines()))
        for arguments in (("example",), ("icon", "user", "--list")):
            result = self.cli(*arguments)
            self.assertEqual(2, result.returncode)
            self.assertNotIn(b"Traceback", result.stderr)
        with tempfile.TemporaryDirectory() as directory:
            result = self.cli("icon", "user", "--output", Path(directory) / "absent" / "user.svg")
            self.assertEqual(2, result.returncode)
            self.assertNotIn(b"Traceback", result.stderr)

    def test_json_html_parser_preserves_closing_scripts_unicode_and_line_endings(self):
        original = '<!doctype html>\r\n<title>café &amp; λ</title>\n<script>const text = "</SCRIPT>";</script>\r\n<svg><svg></svg></svg>\n'.encode("utf-8")
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "assets").mkdir()
            (root / "assets" / "example-probe.html").write_bytes(b"<title>Probe</title>\n")
            payload = json.dumps({"example-probe-dark.html": original.decode("utf-8")}).replace("<", "\\u003c")
            self.assertNotIn("<", payload)
            (root / "assets" / "index.html").write_text('<script id="diagram-example-sources" type="application/json">' + payload + '</script>', encoding="utf-8")
            self.assertEqual(original, asset_source.load_source("example", "probe", "dark", package_root=root))

    def test_malformed_or_ambiguous_catalogs_fail_cleanly(self):
        fixtures = [
            '<script id="diagram-icon-sources" type="text/javascript">{}</script>',
            '<script id="diagram-icon-sources" type="application/json">{}</script>' * 2,
            '<script id="diagram-icon-sources" type="application/json">{"user":"a","user":"b"}</script>',
            '<script id="diagram-icon-sources" type="application/json">{"user":3}</script>',
            '<script id="diagram-icon-sources" type="application/json">{"user":</script>',
            '<script id="diagram-icon-sources" type="application/json">{"user":"a"}',
        ]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "assets").mkdir()
            for source in fixtures:
                with self.subTest(source=source):
                    (root / "assets" / "icons.html").write_text(source, encoding="utf-8")
                    with self.assertRaises(ValueError):
                        asset_source.load_source("icon", "user", package_root=root)

    def test_package_stays_under_the_physical_file_budget(self):
        files = [path for path in ROOT.rglob("*") if path.is_file() and "__pycache__" not in path.parts and path.suffix != ".pyc"]
        self.assertLess(len(files), 200)


if __name__ == "__main__":
    unittest.main()
