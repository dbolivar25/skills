import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const auditSource = readFileSync(new URL('./audit.js', import.meta.url), 'utf8');

function auditRoot({ role, backgroundColor = 'rgb(207, 1, 71)', borderRadius = '12px' } = {}) {
  const root = {
    dataset: { augBranch: 'product' },
    outerHTML: '<main data-aug-branch="product">',
    getBoundingClientRect: () => ({ width: 200, height: 120 }),
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  if (role !== undefined) root.dataset.augRole = role;

  const style = {
    display: 'block',
    visibility: 'visible',
    opacity: '1',
    backgroundColor,
    borderTopWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '0px',
    borderLeftWidth: '0px',
    borderTopColor: 'rgba(0, 0, 0, 0)',
    borderRightColor: 'rgba(0, 0, 0, 0)',
    borderBottomColor: 'rgba(0, 0, 0, 0)',
    borderLeftColor: 'rgba(0, 0, 0, 0)',
    borderRadius,
  };

  const document = {
    body: root,
    fonts: { check: () => true },
    querySelectorAll: (selector) => selector === '[data-aug-branch]' ? [root] : [],
  };
  const window = {
    location: { search: '' },
    addEventListener: () => {},
    getComputedStyle: () => style,
  };
  const console = { group: () => {}, groupEnd: () => {}, table: () => {} };

  vm.runInNewContext(auditSource, { console, document, URLSearchParams, window });
  return window.augAudit();
}

test('audits chromatic paint and radius on the branch root', () => {
  const findings = auditRoot();

  assert(findings.some(({ rule }) => rule === 'chromatic-role'));
  assert(findings.some(({ rule }) => rule === 'radius'));
});

test('rejects an invalid role declared on the branch root', () => {
  const findings = auditRoot({ role: 'brand', borderRadius: '8px' });

  assert(findings.some(({ rule, detail }) => rule === 'chromatic-role' && detail.includes('Unknown')));
});

test('accepts a token radius and valid role on the branch root', () => {
  const findings = auditRoot({ role: 'identity', borderRadius: '8px' });

  assert(!findings.some(({ rule }) => rule === 'chromatic-role'));
  assert(!findings.some(({ rule }) => rule === 'radius'));
});
