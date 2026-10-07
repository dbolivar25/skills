import importlib.util
from pathlib import Path
import tempfile
import unittest

MODULE = Path(__file__).resolve().parents[1] / 'scripts' / 'self_check.py'
spec = importlib.util.spec_from_file_location('diagram_self_check', MODULE)
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)

SVG = '<svg role="img" aria-labelledby="fixture-title fixture-desc" viewBox="0 0 100 60"><title id="fixture-title">Fixture</title><desc id="fixture-desc">A source-check fixture.</desc><rect width="100" height="60" fill="white"/></svg>'

class SourceCheckTests(unittest.TestCase):
    def verify(self, css='', inline=''):
        source = f'<html><style>{css}</style><body><div style="{inline}"></div>{SVG}</body></html>'
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'fixture.html'
            path.write_text(source)
            return checker.verify(path)

    def test_remote_css_url_in_style_sheet_is_rejected(self):
        self.assertTrue(any('remote reference' in e for e in self.verify('.figure { background: url(https://example.com/photo.png) }')))

    def test_remote_css_url_in_inline_style_is_rejected(self):
        self.assertTrue(any('remote reference' in e for e in self.verify(inline="background-image: url('https://example.com/photo.png')")))

    def test_remote_pseudo_element_url_is_rejected(self):
        self.assertTrue(self.verify(".figure::before { content: url('//example.com/photo.png'); }"))

    def test_escaped_css_identifiers_and_urls_are_rejected(self):
        self.assertTrue(self.verify(r'.figure { background: u\72l(\68ttps://example.com/photo.png) }'))
        self.assertTrue(self.verify(r'@\69mport "https://example.com/theme.css";'))

    def test_image_set_string_and_url_candidates_are_rejected(self):
        self.assertTrue(self.verify('.figure { background: image-set("https://example.com/a.png" 1x, url(local.png) 2x); }'))
        self.assertTrue(self.verify('.figure { background: -webkit-image-set(url("//example.com/a.png") 1x); }'))

    def test_quoted_remote_import_is_rejected(self):
        self.assertTrue(self.verify('@import "https://example.com/style.css";'))

    def test_only_exact_approved_google_fonts_import_is_allowed(self):
        self.assertEqual([], self.verify('@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");'))
        self.assertEqual([], self.verify('@import "https://fonts.googleapis.com/css2?family=Noto+Sans+KR";'))
        self.assertTrue(self.verify('@import "https://fonts.googleapis.com.evil.test/css2?family=Other";'))

    def test_local_fonts_fragments_and_data_images_remain_allowed(self):
        self.assertEqual([], self.verify('@font-face { src:url("fonts/MatterSQ-Regular.woff2"); } .figure { filter:url(#soften); background:url("data:image/svg+xml,%3Csvg%3E%3C/svg%3E") }'))

    def test_comments_and_ordinary_strings_do_not_become_remote_assets(self):
        self.assertEqual([], self.verify('/* url(https://example.com/unused.png) */ .label::after { content: "https://example.com"; }'))

    def test_executable_css_url_is_rejected(self):
        self.assertTrue(any('executable URL' in e for e in self.verify('.figure { background:url("javascript:alert(1)") }')))

    def test_existing_accessible_svg_and_canonical_controller_checks_remain(self):
        self.assertEqual([], self.verify())
        template = MODULE.parents[1] / 'assets' / 'template-motion.html'
        self.assertEqual([], checker.verify(template))

if __name__ == '__main__':
    unittest.main()
