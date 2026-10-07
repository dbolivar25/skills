"""Regression checks for extraction fidelity and literal registry projection."""
import base64
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from urllib.parse import quote
from xml.etree import ElementTree as ET
import zlib

SCRIPTS = Path(__file__).resolve().parents[1] / 'scripts'

def load(name):
    spec = importlib.util.spec_from_file_location('diagram_' + name, SCRIPTS / (name + '.py'))
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module

drawio = load('drawio_extract')
excalidraw = load('excalidraw_extract')
mermaid = load('mermaid_extract')
registry = load('export_registry')

MODEL = '''<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/>
<mxCell id="grand" value="Zone" vertex="1" parent="1"><mxGeometry x="100" y="40" width="300" height="200"/></mxCell>
<mxCell id="parent" value="Service" vertex="1" parent="grand"><mxGeometry x="20" y="30" width="160" height="100"/></mxCell>
<mxCell id="child" value="Store" vertex="1" parent="parent"><mxGeometry x="5" y="7" width="40" height="30"/></mxCell>
<mxCell id="edge" edge="1" source="parent" target="child" style="startArrow=classic;endArrow=none"><mxGeometry/></mxCell>
<mxCell id="unknown-edge" edge="1" source="child" target="missing"><mxGeometry/></mxCell>
</root></mxGraphModel>'''

class DrawioTests(unittest.TestCase):
    def parse(self, text):
        wrapper = ET.Element('diagram', {'name': 'Fixture'})
        wrapper.append(ET.fromstring(text))
        return drawio.parse_page(wrapper, 0)

    def test_nested_geometry_is_order_independent(self):
        page = self.parse(MODEL)
        positions = {node.id: (node.x, node.y, node.depth) for node in page.nodes}
        self.assertEqual((125, 77, 2), positions['child'])
        model = ET.fromstring(MODEL)
        root = model.find('root')
        children = list(root)
        root[:] = children[:2] + list(reversed(children[2:]))
        other = self.parse(ET.tostring(model, encoding='unicode'))
        self.assertEqual(positions, {node.id: (node.x, node.y, node.depth) for node in other.nodes})

    def test_start_only_arrow_reverses_semantic_direction(self):
        edge = self.parse(MODEL).edges[0]
        self.assertEqual(('child', 'parent'), (edge.source, edge.target))
        self.assertFalse(edge.bidirectional)
        self.assertFalse(edge.undirected)

    def test_unresolved_endpoint_is_retained_and_counted(self):
        page = self.parse(MODEL)
        self.assertEqual(2, len(page.edges))
        self.assertIsNone(page.edges[1].target)
        self.assertEqual('missing', page.edges[1].target_ref)
        self.assertEqual(1, drawio.analyze(page)['edges_dangling'])

    def test_nonfinite_geometry_and_parent_cycles_fail_cleanly(self):
        for text in [MODEL.replace('x="100"', 'x="nan"'), MODEL.replace('parent="grand"', 'parent="child"')]:
            with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as caught:
                self.parse(text)
            self.assertEqual(2, caught.exception.code)

    def test_duplicate_ids_do_not_overwrite_source_elements(self):
        text = MODEL.replace('id="child" value=', 'id="parent" value=')
        with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as caught:
            self.parse(text)
        self.assertEqual(2, caught.exception.code)

    def test_compressed_page_and_svg_metadata_are_read(self):
        compressor = zlib.compressobj(wbits=-15)
        payload = base64.b64encode(compressor.compress(quote(MODEL).encode()) + compressor.flush()).decode()
        with tempfile.TemporaryDirectory() as folder:
            compressed = Path(folder) / 'fixture.drawio'
            compressed.write_text(f'<mxfile><diagram id="p" name="Fixture">{payload}</diagram></mxfile>')
            self.assertEqual(125, drawio.parse_file(compressed)[0].node_map['child'].x)
            svg = Path(folder) / 'fixture.drawio.svg'
            escaped = MODEL.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;').replace('>', '&gt;')
            svg.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" content="{escaped}"></svg>')
            self.assertEqual(3, len(drawio.parse_file(svg)[0].nodes))

class ExcalidrawTests(unittest.TestCase):
    def scene(self, elements):
        return excalidraw.parse_scene(Path('fixture.excalidraw'), {'elements': elements})

    def test_live_unknown_deleted_invalid_and_editor_content_are_distinct(self):
        scene = self.scene([
            {'id': 'box', 'type': 'rectangle', 'x': 0, 'y': 0, 'width': 100, 'height': 50},
            {'id': 'old', 'type': 'rectangle', 'isDeleted': True},
            {'id': 'new-kind', 'type': 'future-shape'},
            {'id': 'stroke', 'type': 'freedraw'},
            {'id': 'selection', 'type': 'selection'},
            {'id': 'image', 'type': 'image', 'width': 20, 'height': 20},
            {'type': 'rectangle'}, None,
        ])
        self.assertEqual(['box', 'image'], [node.id for node in scene.nodes])
        self.assertEqual(1, scene.discarded['deleted_elements'])
        self.assertEqual(1, scene.discarded['unknown_elements'])
        self.assertEqual(1, scene.discarded['freedraw_strokes'])
        self.assertEqual(1, scene.discarded['image_payloads'])
        self.assertEqual(2, scene.discarded['invalid_elements'])
        self.assertEqual(1, scene.discarded['editor_artifacts'])

    def test_duplicate_live_ids_are_not_silently_merged(self):
        with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as caught:
            self.scene([{'id': 'x', 'type': 'rectangle'}, {'id': 'x', 'type': 'ellipse'}])
        self.assertEqual(2, caught.exception.code)

    def test_deleted_target_leaves_a_dangling_edge(self):
        scene = self.scene([
            {'id': 'a', 'type': 'rectangle'}, {'id': 'b', 'type': 'rectangle', 'isDeleted': True},
            {'id': 'edge', 'type': 'arrow', 'startBinding': {'elementId': 'a'}, 'endBinding': {'elementId': 'b'}},
        ])
        self.assertEqual(('a', None), (scene.edges[0].source, scene.edges[0].target))
        self.assertEqual('b', scene.edges[0].target_ref)
        self.assertEqual(1, excalidraw.analyze(scene)['edges_dangling'])

class MermaidTests(unittest.TestCase):
    def parse(self, text):
        return mermaid.parse_block(mermaid.SourceBlock(0, text, 1))

    def test_unparsed_sequence_statements_and_partial_features_are_reported(self):
        diagram = self.parse('sequenceDiagram\nparticipant A\ncreate participant B\nA->B: hello\nactivate B\nnote over B: known text\ndestroy B\n')
        self.assertEqual(['activate B', 'destroy B'], [item['text'] for item in diagram.unparsed])
        self.assertEqual(2, len(diagram.source_features))
        self.assertFalse(diagram.edges[0].undirected)
        self.assertEqual('none', diagram.edges[0].arrowhead)
        self.assertIn('unparsed statements', mermaid.digest(Path('fixture.mmd'), [diagram], [diagram], 40))
        data = json.loads(mermaid.to_json(Path('fixture.mmd'), [diagram], [diagram]))
        self.assertEqual(diagram.unparsed, data['diagrams'][0]['unparsed'])

    def test_fragment_regions_have_actual_message_bounds(self):
        diagram = self.parse('sequenceDiagram\nalt accepted\nA->>B: one\nelse denied\nA-->>B: two\nend')
        fragment = diagram.fragments[0]
        self.assertEqual((1, 2), (fragment['first_message'], fragment['last_message']))
        self.assertEqual(2, fragment['region_boundaries'][0]['first_message'])
        self.assertEqual(6, fragment['end_line'])

    def test_source_configuration_and_inline_styles_are_accounted(self):
        diagram = self.parse('---\ntitle: Source title\n---\nflowchart LR\nA[Start]:::special --> B[End]\nunsupported syntax here')
        self.assertEqual(4, len(diagram.source_features))
        self.assertEqual('unsupported syntax here', diagram.unparsed[0]['text'])
        self.assertEqual(2, len(diagram.nodes))

    def test_state_and_er_unknown_statements_are_visible(self):
        for text in ['stateDiagram-v2\nstate A\nunsupported statement', 'erDiagram\nA ||--o{ B : owns\nunsupported statement']:
            self.assertEqual('unsupported statement', self.parse(text).unparsed[0]['text'])

class RegistryTests(unittest.TestCase):
    def read(self, source):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'fixture.html'
            path.write_text(source)
            return registry.read_blocks(path).blocks

    def test_projection_preserves_order_decoded_values_empty_and_absence(self):
        blocks = self.read('<g data-block-id="z" data-block-name="名 &amp; identity" data-block-input="  " data-block-output=""/><g data-block-id="a" data-block-name="A" data-block-parent="z"/>')
        self.assertEqual(['z', 'a'], [block['id'] for block in blocks])
        self.assertEqual('名 & identity', blocks[0]['name'])
        self.assertEqual('  ', blocks[0]['input'])
        self.assertEqual('', blocks[0]['output'])
        self.assertNotIn('parent', blocks[0])
        self.assertEqual([], registry.check_blocks(blocks))

    def test_broken_references_export_faithfully_and_check_separately(self):
        blocks = self.read('<g data-block-id="a" data-block-name="A" data-block-parent="missing"/><g data-block-id="a" data-block-name="Duplicate"/>')
        self.assertEqual(2, len(blocks))
        errors = registry.check_blocks(blocks)
        self.assertTrue(any('duplicate' in error for error in errors))
        self.assertTrue(any('unresolved' in error for error in errors))
        cycle = [{'id': 'a', 'name': 'A', 'parent': 'b'}, {'id': 'b', 'name': 'B', 'parent': 'a'}]
        self.assertTrue(any('cycle' in error for error in registry.check_blocks(cycle)))

    def test_empty_registry_and_ambiguous_duplicate_attributes_are_rejected(self):
        for source in ['<svg/>', '<g data-block-id="a" data-block-id="b"/>']:
            with self.assertRaises(ValueError):
                self.read(source)

    def test_export_and_check_are_distinct_source_preserving_actions(self):
        with tempfile.TemporaryDirectory() as folder, contextlib.redirect_stdout(io.StringIO()):
            path = Path(folder) / 'fixture.html'
            source = '<g data-block-id="a" data-block-name="A"/>'
            path.write_text(source)
            self.assertEqual(0, registry.main([str(path), '--check']))
            self.assertFalse(path.with_suffix('.registry.json').exists())
            self.assertEqual(0, registry.main([str(path)]))
            self.assertEqual(source, path.read_text())
            self.assertEqual('fixture.html', json.loads(path.with_suffix('.registry.json').read_text())['source'])
            with contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(2, registry.main([str(path), '--out', str(path)]))

if __name__ == '__main__':
    unittest.main()
