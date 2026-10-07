import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const auditSource = readFileSync(new URL('./audit.js', import.meta.url), 'utf8');

function auditRoot({ role, style: overrides = {}, svg = false, text = '', pseudo,
  modernColors, faces = [{ family: 'Matter SQ', status: 'loaded' }] } = {}) {
  const root = {
    dataset: { augBranch: 'product' },
    namespaceURI: svg ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml',
    outerHTML: '<main data-aug-branch="product">',
    textContent: text,
    childNodes: text ? [{ nodeType: 3, textContent: text }] : [],
    getBoundingClientRect: () => ({ width: 200, height: 120 }),
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  if (role !== undefined) root.dataset.augRole = role;
  const style = {
    display: 'block', visibility: 'visible', opacity: '1',
    backgroundColor: 'rgb(207, 1, 71)', backgroundImage: 'none',
    borderTopWidth: '0px', borderRightWidth: '0px', borderBottomWidth: '0px', borderLeftWidth: '0px',
    borderRadius: '12px', fill: 'none', stroke: 'none', strokeWidth: '1px',
    fontFamily: '"Matter SQ", sans-serif', fontSize: '16px', fontWeight: '400',
    ...overrides,
  };
  let canvasColor;
  const context = {
    clearRect() {}, fillRect() {},
    set fillStyle(value) { canvasColor = value; },
    getImageData: () => ({ data: modernColors[canvasColor] }),
  };
  const fonts = Object.assign(faces, { check: () => true });
  const document = {
    body: root, fonts,
    querySelectorAll: (selector) => selector === '[data-aug-branch]' ? [root] : [],
    createElement: () => ({ getContext: () => context }),
  };
  const window = {
    location: { search: '' }, addEventListener() {},
    CSS: { supports: (_property, color) => Boolean(modernColors?.[color]) },
    getComputedStyle: (_element, selector) => selector ? (pseudo?.[selector] || { content: 'none' }) : style,
  };
  const console = { group() {}, groupEnd() {}, table() {} };
  vm.runInNewContext(auditSource, { console, document, URLSearchParams, window });
  return window.augAudit();
}

const has = (findings, rule) => findings.some((finding) => finding.rule === rule);

test('audits chromatic paint and radius on the branch root', () => {
  const findings = auditRoot();
  assert(has(findings, 'chromatic-role'));
  assert(has(findings, 'radius'));
});
test('rejects an invalid role declared on the branch root', () => {
  const findings = auditRoot({ role: 'brand', style: { borderRadius: '8px' } });
  assert(findings.some(({ rule, detail }) => rule === 'chromatic-role' && detail.includes('Unknown')));
});
test('accepts a token radius and valid role on the branch root', () => {
  const findings = auditRoot({ role: 'identity', style: { borderRadius: '8px' } });
  assert(!has(findings, 'chromatic-role'));
  assert(!has(findings, 'radius'));
});
for (const property of ['fill', 'stroke']) {
  test(`detects unmarked solid SVG ${property}, previously missed`, () => {
    const findings = auditRoot({ svg: true, style: { backgroundColor: 'transparent', borderRadius: '0px', [property]: 'rgb(207, 1, 71)' } });
    assert(has(findings, 'chromatic-role'));
  });
}
test('classifies OKLCH paint through the browser color parser, previously missed', () => {
  const color = 'oklch(60% 0.2 20)';
  const findings = auditRoot({ style: { backgroundColor: color, borderRadius: '0px' }, modernColors: { [color]: [222, 57, 75, 255] } });
  assert(has(findings, 'chromatic-role'));
  assert(!has(findings, 'paint-coverage'));
});
test('an unclassified color is a coverage finding rather than a neutral false pass', () => {
  assert(has(auditRoot({ style: { backgroundColor: 'oklch(60% 0.2 20)' } }), 'paint-coverage'));
});
test('SVG paint-server URLs and gradient backgrounds require rendered inspection', () => {
  assert(has(auditRoot({ svg: true, style: { fill: 'url("#gradient")' } }), 'paint-coverage'));
  assert(has(auditRoot({ role: 'atmosphere', style: { backgroundImage: 'linear-gradient(red, blue)' } }), 'paint-coverage'));
});
test('audits generated pseudo-element solid paint', () => {
  const findings = auditRoot({ style: { backgroundColor: 'transparent', borderRadius: '0px' }, pseudo: {
    '::before': { content: '""', display: 'block', opacity: '1', backgroundColor: 'rgb(207, 1, 71)' },
  } });
  assert(findings.some(({ rule, detail }) => rule === 'chromatic-role' && detail.includes('::before')));
});
test('loaded Matter SQ does not excuse text styled with a different primary font', () => {
  const findings = auditRoot({ text: 'Hello', style: { fontFamily: 'Arial, sans-serif' } });
  assert(has(findings, 'typeface-applied'));
});
test('fonts.check returning true without any loaded face does not prove Matter SQ loaded', () => {
  assert(has(auditRoot({ faces: [] }), 'typeface'));
});
test('the supplied technical mono token is accepted for visible text', () => {
  assert(!has(auditRoot({ text: 'localhost:3000', style: { fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' } }), 'typeface-applied'));
});

test('invisible SVG fill and stroke do not create a paint finding', () => {
  const findings = auditRoot({ svg: true, style: { backgroundColor: 'transparent', borderRadius: '0px',
    fill: 'rgb(207, 1, 71)', fillOpacity: '0', stroke: 'rgb(207, 1, 71)', strokeOpacity: '0' } });
  assert(!has(findings, 'chromatic-role'));
});
test('hidden generated pseudo paint is skipped', () => {
  const findings = auditRoot({ style: { backgroundColor: 'transparent', borderRadius: '0px' }, pseudo: {
    '::before': { content: '""', display: 'block', visibility: 'hidden', opacity: '1', backgroundColor: 'rgb(207, 1, 71)' },
  } });
  assert(!has(findings, 'chromatic-role'));
});
