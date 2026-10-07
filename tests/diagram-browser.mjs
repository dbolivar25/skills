#!/usr/bin/env node
/** HTTP-only browser acceptance against an independently frozen package.
 * No dependencies are installed. Pass an existing Playwright package directory.
 * Usage: node tests/diagram-browser.mjs --package <diagram-design> --baseline
 * <original-diagram-design> --evidence <outside-repo-directory> --runtime
 * <node_modules> [--chromium <executable>] [--keep-open-ms 300000]
 * [--stage icons-motion] skips the expensive independent gallery comparison.
 * Remote requests are blocked equally in both copies: this checks offline
 * fallback rendering, while source equality preserves authored font imports.
 */
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';
import { createHash } from 'node:crypto';

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, arg, i, all) => {
  if (arg.startsWith('--')) pairs.push([arg.slice(2), all[i + 1]]);
  return pairs;
}, []));
for (const key of ['package', 'baseline', 'evidence', 'runtime']) {
  assert(args[key] && !args[key].startsWith('--'), `Required --${key} argument`);
}
const packageRoot = path.resolve(args.package);
const baselineRoot = path.resolve(args.baseline);
const evidence = path.resolve(args.evidence);
const stage = args.stage || 'all';
assert(['all', 'icons-motion'].includes(stage), '--stage must be all or icons-motion');
assert(!evidence.startsWith(packageRoot + path.sep), 'Evidence must be outside the package');
const require = createRequire(path.join(path.resolve(args.runtime), 'package.json'));
const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const report = { started: new Date().toISOString(), stage, viewport: { width: 1440, height: 1000 },
  transport: 'HTTP loopback, assets only', fontCondition: 'remote requests blocked in both copies; identical system fallback',
  limitations: ['Direct file:// browser behavior is untested because the host URL policy rejects it.',
    'Comparison preserves remote font imports but does not establish their online/offline availability.'],
  cases: [], failures: [], remoteRequests: new Set() };
const exports = new Map();
await mkdir(evidence, { recursive: true });
for (const dir of ['golden', 'current', 'downloads', 'motion', 'export']) await mkdir(path.join(evidence, dir), { recursive: true });

// Only explicit asset roots and the two generated figure exports are reachable.
const roots = { current: path.join(packageRoot, 'assets'), baseline: path.join(baselineRoot, 'assets') };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    if (exports.has(url.pathname)) {
      const item = exports.get(url.pathname);
      response.writeHead(200, { 'Content-Type': item.type, 'Cache-Control': 'no-store' });
      response.end(item.bytes); return;
    }
    const parts = decodeURIComponent(url.pathname).split('/').filter(Boolean);
    const root = roots[parts.shift()];
    assert(root && parts.length && parts.every((part) => part !== '..' && part !== '.'), 'Asset path required');
    const target = path.resolve(root, ...parts);
    assert(target.startsWith(root + path.sep) && /\.(html|svg|woff2?|ttf|png)$/.test(target), 'Public assets only');
    assert((await stat(target)).isFile(), 'Asset file required');
    const bytes = await readFile(target);
    const types = { '.html': 'text/html;charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.png': 'image/png' };
    response.writeHead(200, { 'Content-Type': types[path.extname(target)], 'Cache-Control': 'no-store' }); response.end(bytes);
  } catch { response.writeHead(404); response.end('Not an exposed asset'); }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const baseURL = `http://127.0.0.1:${server.address().port}`;
report.previewURL = `${baseURL}/current/index.html`;
console.log(`Assets-only preview: ${report.previewURL}`);
const browser = await chromium.launch({ headless: true, ...(args.chromium ? { executablePath: args.chromium } : {}) });
report.browser = await browser.version();

async function context(options = {}, allowRemoteFonts = false) {
  const instance = await browser.newContext({ viewport: report.viewport, acceptDownloads: true, ...options });
  await instance.route('**/*', async (route) => {
    const url = route.request().url();
    if (url.startsWith(baseURL + '/') || url.startsWith('blob:') || url.startsWith('data:')) return route.continue();
    report.remoteRequests.add(url);
    if (allowRemoteFonts && /^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(url)) return route.continue();
    await route.abort();
  });
  return instance;
}
async function check(name, action) {
  try { const details = await action(); report.cases.push({ name, ...details }); }
  catch (error) { report.failures.push({ name, error: error.stack || String(error) }); console.error(`FAIL ${name}: ${error.message}`); }
}
async function settle(frame) {
  await frame.waitForLoadState('load');
  await frame.evaluate(async () => { await document.fonts.ready; await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
}
async function preview(page, filename) {
  await page.waitForFunction((name) => {
    const iframe = document.querySelector('#preview');
    const source = iframe.getAttribute('srcdoc');
    if (source !== null) return document.querySelector('#open-raw').dataset.filename === name && iframe.contentDocument?.readyState === 'complete' && iframe.contentDocument?.title;
    return iframe.contentWindow?.location.pathname.endsWith('/' + name) && iframe.contentDocument?.readyState === 'complete';
  }, filename);
  const frame = await (await page.locator('#preview').elementHandle()).contentFrame();
  await settle(frame); return frame;
}
async function rawBytes(page) {
  return Buffer.from(await page.evaluate(async () => Array.from(new Uint8Array(await (await fetch(location.href)).arrayBuffer()))));
}
async function pixelsEqual(actual, expected, label) {
  const a = PNG.sync.read(actual), b = PNG.sync.read(expected);
  assert.deepEqual([a.width, a.height], [b.width, b.height], `${label}: PNG dimensions`);
  let differing = 0;
  for (let i = 0; i < a.data.length; i += 4) if (!a.data.subarray(i, i + 4).equals(b.data.subarray(i, i + 4))) differing++;
  assert.equal(differing, 0, `${label}: ${differing} differing pixels`);
  return { width: a.width, height: a.height, differingPixels: differing };
}
// Preserve actual paint and authored paths; ignore only document placement.
async function svgOracle(locator) {
  return locator.evaluate((svg) => {
    const paints = ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'text-anchor', 'dominant-baseline', 'display', 'visibility'];
    return [svg, ...svg.querySelectorAll('*')].map((element, index) => {
      const css = getComputedStyle(element);
      const bbox = element instanceof SVGGraphicsElement && css.display !== 'none' ? element.getBBox() : null;
      return { tag: element.localName, text: element.childElementCount ? '' : element.textContent,
        attributes: [...element.attributes].filter((attribute) => attribute.name !== 'style').map((attribute) => [attribute.name, attribute.value]).sort(),
        paint: Object.fromEntries(paints.filter((key) => index || !key.startsWith('font')).map((key) => [key, css.getPropertyValue(key)])),
        bbox: bbox && Object.fromEntries(['x', 'y', 'width', 'height'].map((key) => [key, Math.round(bbox[key] * 100000) / 100000])),
        textLength: element instanceof SVGTextContentElement ? element.getComputedTextLength() : null,
      };
    });
  });
}
async function selection(page, type, variant) {
  await page.locator(`#type-tabs [data-type="${type}"]`).click();
  if (variant) await page.locator(`#variant-tabs [data-variant="${variant}"]`).click();
  else await page.locator('#variant-tabs [data-variant=""]').click();
  return preview(page, `example-${type}${variant}.html`);
}
async function radios(page, type, variant, single) {
  const value = await page.evaluate(() => ({
    groups: [...document.querySelectorAll('[role="radiogroup"]')].map((group) => ({
      selected: [...group.querySelectorAll('[role="radio"][aria-checked="true"]')].map((tab) => [tab.dataset.type ?? tab.dataset.variant, tab.tabIndex]),
      focusable: [...group.querySelectorAll('[role="radio"]')].filter((tab) => tab.tabIndex === 0).length,
    })), disabled: [...document.querySelectorAll('#variant-tabs .tab')].map((tab) => tab.disabled),
    labelled: document.querySelector('#preview').getAttribute('aria-labelledby').split(' ').every((id) => document.getElementById(id)?.getAttribute('aria-checked') === 'true'),
  }));
  assert.deepEqual(value.groups.map((g) => g.selected), [[[type, 0]], [[variant, 0]]]);
  assert(value.groups.every((g) => g.focusable === 1) && value.labelled);
  assert.deepEqual(value.disabled, single ? [false, true, true] : [false, false, false]);
}

try {
  const main = await context();
  if (stage === 'all') {
  const current = await main.newPage(), golden = await main.newPage();
  await Promise.all([current.goto(`${baseURL}/current/index.html`), golden.goto(`${baseURL}/baseline/index.html`)]);
  const types = await current.locator('#type-tabs .tab').evaluateAll((tabs) => tabs.map((tab) => ({ type: tab.dataset.type, single: tab.hasAttribute('data-single') })));
  assert.equal(types.length, 54); assert.equal(types.filter((type) => type.single).length, 8);
  const sources = await current.locator('#diagram-example-sources').evaluate((script) => JSON.parse(script.textContent));
  assert.equal(Object.keys(sources).length, 92);
  let staticCount = 0, total = 0;
  for (const { type, single } of types) {
    for (const variant of single ? [''] : ['', '-dark', '-full']) {
      const filename = `example-${type}${variant}.html`;
      await check(`gallery:${filename}`, async () => {
        await Promise.all([selection(current, type, variant), selection(golden, type, variant)]);
        await radios(current, type, variant, single);
        const expected = await readFile(path.join(baselineRoot, 'assets', filename));
        if (variant) assert.equal(digest(Buffer.from(sources[filename])), digest(expected), 'Original source bytes');
        if (!single) {
          const [actual, original] = await Promise.all([
            current.locator('#preview').screenshot({ path: path.join(evidence, 'current', filename + '.png'), animations: 'disabled' }),
            golden.locator('#preview').screenshot({ path: path.join(evidence, 'golden', filename + '.png'), animations: 'disabled' }),
          ]);
          staticCount++; return await pixelsEqual(actual, original, filename);
        }
        return { singleDemonstration: true, title: await (await (await current.locator('#preview').elementHandle()).contentFrame()).title() };
      }); total++;
    }
    if (total % 15 < 3) console.log(`Gallery selections: ${total}/146`);
  }
  report.gallery = { typeSelections: types.length, variantSelections: total, staticScreenshots: staticCount, singleDemonstrations: 8 };

  await check('gallery:keyboard', async () => {
    await selection(current, 'architecture', '');
    const first = current.locator('#type-tabs [data-type="architecture"]'); await first.focus();
    for (const [key, expected] of [['ArrowRight', 'flowchart'], ['ArrowDown', 'sequence'], ['ArrowLeft', 'flowchart'], ['ArrowUp', 'architecture'], ['End', 'import-excalidraw'], ['Home', 'architecture']]) {
      await current.keyboard.press(key);
      assert.equal(await current.locator(':focus').getAttribute('data-type'), expected);
      await radios(current, expected, '', expected === 'import-excalidraw');
    }
    await current.locator('#variant-tabs [data-variant=""]').focus();
    for (const [key, expected] of [['ArrowRight', '-dark'], ['ArrowDown', '-full'], ['ArrowRight', ''], ['ArrowLeft', '-full'], ['Home', ''], ['End', '-full']]) {
      await current.keyboard.press(key); assert.equal(await current.locator(':focus').getAttribute('data-variant'), expected);
      await radios(current, 'architecture', expected, false);
    }
    await selection(current, 'import-drawio', ''); await current.locator('#variant-tabs [data-variant=""]').focus();
    for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) { await current.keyboard.press(key); await radios(current, 'import-drawio', '', true); }
    return { arrows: 4, homeEnd: true, focusAndAria: true, disabledVariantsSkipped: true };
  });

  for (const filename of Object.keys(sources)) await check(`deep-link:${filename}`, async () => {
    await current.goto(`${baseURL}/current/index.html#${filename.slice(0, -5)}`);
    const frame = await preview(current, filename);
    const state = await current.locator('#preview').evaluate((iframe) => iframe.getAttribute('srcdoc'));
    assert.equal(digest(Buffer.from(state)), digest(await readFile(path.join(baselineRoot, 'assets', filename))));
    assert.equal(await frame.title(), (await frame.locator('title').first().textContent()));
    return { selectedHash: new URL(current.url()).hash };
  });
  report.bundledDeepLinks = Object.keys(sources).length;

  const popups = [];
  for (const [type, variant] of [['architecture', '-dark'], ['tree', '-full'], ['architecture', ''], ['paved-road-animated', '']]) await check(`standalone:${type}${variant}`, async () => {
    await selection(current, type, variant);
    const [popup] = await Promise.all([current.waitForEvent('popup'), current.locator('#open-raw').click()]); await settle(popup);
    const filename = `example-${type}${variant}.html`;
    assert.equal(digest(await rawBytes(popup)), digest(await readFile(path.join(baselineRoot, 'assets', filename))));
    popups.push({ popup, filename, title: await popup.title() });
    const [download] = await Promise.all([current.waitForEvent('download'), current.locator('#download-source').click()]);
    const target = path.join(evidence, 'downloads', filename); await download.saveAs(target);
    assert.equal(digest(await readFile(target)), digest(await readFile(path.join(baselineRoot, 'assets', filename))));
    return { exactBytes: true, downloadedFilename: download.suggestedFilename() };
  });
  await selection(current, 'bar', '-dark');
  await check('standalone:retained-after-selection', async () => {
    for (const { popup, filename, title } of popups) { assert.equal(await popup.title(), title); assert.equal(digest(await rawBytes(popup)), digest(await readFile(path.join(baselineRoot, 'assets', filename)))); }
    return { retainedTabs: popups.length };
  });
  await Promise.all(popups.map(({ popup }) => popup.close()));
  await current.goto(`${baseURL}/current/index.html#example-architecture-dark`); await preview(current, 'example-architecture-dark.html');
  await current.screenshot({ path: path.join(evidence, 'gallery-dark.png'), animations: 'disabled' });
  }

  const icons = await main.newPage(), oldIcons = await main.newPage();
  await Promise.all([icons.goto(`${baseURL}/current/icons.html`), oldIcons.goto(`${baseURL}/baseline/icons.html`)]); await Promise.all([settle(icons), settle(oldIcons)]);
  const iconSources = await icons.locator('#diagram-icon-sources').evaluate((script) => JSON.parse(script.textContent));
  const oldNames = await oldIcons.locator('.cell .name').allTextContents(); assert.equal(Object.keys(iconSources).length, 87);
  for (const [name, source] of Object.entries(iconSources)) await check(`icon:${name}`, async () => {
    const expected = await readFile(path.join(baselineRoot, 'assets/icons', name + '.svg'));
    assert.equal(digest(Buffer.from(source)), digest(expected));
    const oldIndex = oldNames.indexOf(name); assert(oldIndex >= 0);
    await Promise.all([icons.mouse.move(0, 0), oldIcons.mouse.move(0, 0)]);
    const currentSVG = icons.locator(`#icon-${name} .icon svg`), oldSVG = oldIcons.locator('.cell .icon svg').nth(oldIndex);
    const [actual, original] = await Promise.all([svgOracle(currentSVG), svgOracle(oldSVG)]);
    assert.deepEqual(actual, original, `Inline ${name}: source shapes, computed paint, font and SVG geometry`);
    const [actualBox, originalBox] = await Promise.all([currentSVG.boundingBox(), oldSVG.boundingBox()]);
    assert.deepEqual([actualBox.width, actualBox.height], [originalBox.width, originalBox.height]);
    const open = icons.locator(`[data-icon-source="${name}"][target="_blank"]`);
    const [popup] = await Promise.all([icons.waitForEvent('popup'), open.click()]); await settle(popup);
    assert.equal(digest(await rawBytes(popup)), digest(expected)); await popup.close();
    // A direct 28-selection probe lost 6 downloads in an unpaced burst and
    // observed all 28 at 160 ms pacing. Test each user selection below the
    // observed browser burst limit; never retry a missing event silently.
    await icons.waitForTimeout(160);
    const [download] = await Promise.all([icons.waitForEvent('download'), icons.locator(`[data-icon-source="${name}"][download]`).click()]);
    const target = path.join(evidence, 'downloads', name + '.svg'); await download.saveAs(target);
    assert.equal(digest(await readFile(target)), digest(expected)); assert.equal(download.suggestedFilename(), name + '.svg');
    return { width: actualBox.width, height: actualBox.height, identicalShapePaintGeometry: true, rawAndDownloadExact: true };
  });
  report.icons = { expected: 87, passed: report.cases.filter((test) => test.name.startsWith('icon:') && test.rawAndDownloadExact).length,
    oracle: 'Complete inline shape/paint/font/local geometry, exact original raw and downloaded bytes', downloadPacingMs: 160 };
  await check('icon:currentColor-and-definitions', async () => {
    await icons.evaluate(() => { for (const name of ['user', 'aws', 'postgres']) document.querySelector(`#icon-${name} .icon`).style.color = 'rgb(11, 22, 33)'; });
    await icons.waitForFunction(() => ['user', 'aws', 'postgres'].every((name) => getComputedStyle(document.querySelector(`#icon-${name} .icon`)).color === 'rgb(11, 22, 33)'));
    const results = await icons.evaluate(() => {
      return ['user', 'aws', 'postgres', 'hop', 'sas'].map((name) => {
        const svg = document.querySelector(`#icon-${name} svg`), style = getComputedStyle(svg);
        const refs = [...svg.querySelectorAll('*')].flatMap((element) => [...element.attributes].flatMap((attribute) => [...attribute.value.matchAll(/url\(#([^)]*)\)/g)].map((match) => match[1])));
        return { name, stroke: style.stroke, fill: style.fill, definitions: svg.querySelectorAll('defs').length,
          ids: [svg, ...svg.querySelectorAll('[id]')].map((element) => element.id).filter(Boolean),
          unresolved: refs.filter((id) => !svg.querySelector(`[id="${id}"]`)) };
      });
    });
    assert.equal(results[0].stroke, 'rgb(11, 22, 33)'); assert.equal(results[1].stroke, 'rgb(11, 22, 33)'); assert.equal(results[2].fill, 'rgb(11, 22, 33)');
    assert.equal(results[3].definitions, 1); assert.equal(results[4].definitions, 1);
    assert(results.every((item) => item.unresolved.length === 0)); return { representatives: results };
  });
  await icons.goto(`${baseURL}/current/icons.html#icon-user`); await settle(icons);
  await check('icon:deep-link', async () => { assert.equal(await icons.locator('#icon-user').count(), 1); assert(await icons.locator('#icon-user').isVisible()); return { hash: '#icon-user' }; });
  await check('icon:native-source-URL-and-middle-click', async () => {
    const link = icons.locator('[data-icon-source="user"][target="_blank"]');
    assert((await link.getAttribute('href')).startsWith('blob:'), 'Native open actions require a source URL before click');
    const expected = await readFile(path.join(baselineRoot, 'assets/icons/user.svg'));
    const hrefBytes = Buffer.from(await link.evaluate(async (anchor) => Array.from(new Uint8Array(await (await fetch(anchor.href)).arrayBuffer()))));
    assert.equal(digest(hrefBytes), digest(expected));
    const [popup] = await Promise.all([main.waitForEvent('page', { timeout: 1500 }).catch(() => null), link.click({ button: 'middle' })]);
    if (popup) { await settle(popup); assert.equal(digest(await rawBytes(popup)), digest(expected)); await popup.close(); }
    else report.limitations.push('Headless Chromium did not expose a native middle-click tab; pre-click Blob href and fetched source bytes are verified.');
    return { nativeMiddleClickTabObserved: Boolean(popup), preClickSourceURLExact: true };
  });
  await icons.screenshot({ path: path.join(evidence, 'icons-user.png'), animations: 'disabled' });

  const motion = await main.newPage(); await motion.goto(`${baseURL}/current/template-motion.html`); await settle(motion);
  const root = motion.locator('[data-motion-root]');
  const action = (name) => motion.locator(`[data-motion-action="${name}"]`);
  const step = async (expected) => assert.equal(await root.getAttribute('data-step-current'), String(expected));
  await check('motion:playback-and-scoped-keys', async () => {
    await step(0); assert(await action('prev').isDisabled()); await action('next').click(); await step(1); await action('prev').click(); await step(0);
    await action('play').click(); assert.equal(await action('play').getAttribute('aria-pressed'), 'true');
    await motion.waitForFunction(() => document.querySelector('[data-motion-root]').dataset.stepCurrent === '1');
    await action('pause').click(); await step(1); await motion.waitForTimeout(800); await step(1);
    await action('replay').click(); await step(0); await action('pause').click();
    await root.evaluate((element) => { element.tabIndex = 0; element.focus(); });
    for (const [key, expected] of [['End', 5], ['Home', 0], ['ArrowRight', 1], ['ArrowLeft', 0]]) { await motion.keyboard.press(key); await step(expected); }
    await motion.keyboard.press('Space'); assert.equal(await action('play').getAttribute('aria-pressed'), 'true'); await motion.keyboard.press('Space'); assert.equal(await action('pause').getAttribute('aria-pressed'), 'true');
    await motion.keyboard.press('r'); await step(0); await action('pause').click();
    await motion.evaluate(() => { const input = document.createElement('input'); input.id = 'keyboard-probe'; document.querySelector('[data-motion-root]').append(input); input.focus(); });
    await motion.keyboard.press('End'); await step(0); await motion.locator('#keyboard-probe').fill('r'); await step(0);
    await motion.evaluate(() => { document.querySelector('#keyboard-probe').remove(); document.body.tabIndex = 0; document.body.focus(); });
    await motion.keyboard.press('End'); await step(0);
    await root.focus(); await motion.keyboard.press('End'); await step(5); assert(await action('next').isDisabled());
    return { playPauseReplay: true, previousNext: true, scopedKeys: true, boundaryDisabled: true };
  });
  async function completeFrame(page, mode) {
    if (mode === 'no-js') {
      await page.waitForLoadState('load'); assert.equal(await page.evaluate(() => document.fonts.status), 'loaded');
    } else await settle(page);
    const state = await page.locator('[data-motion-root]').evaluate((element) => ({
      frame: element.dataset.frame, step: element.dataset.stepCurrent,
      items: [...element.querySelectorAll('[data-motion-item]:not([data-motion-decorative])')].map((item) => ({ opacity: getComputedStyle(item).opacity, transform: getComputedStyle(item).transform })),
      controlsDisplay: getComputedStyle(element.querySelector('[data-motion-controls]')).display,
      disabled: [...element.querySelectorAll('[data-motion-controls] button')].every((button) => button.disabled),
    }));
    if (mode !== 'print') assert.equal(state.step, '5');
    assert(state.items.every((item) => item.opacity === '1' && item.transform === 'none'));
    assert.equal(state.controlsDisplay, 'none'); if (mode !== 'no-js' && mode !== 'print') { assert.equal(state.frame, 'static'); assert(state.disabled); }
    return state;
  }
  await check('motion:static-deterministic', async () => {
    await motion.goto(`${baseURL}/current/template-motion.html?motion=static`); const state = await completeFrame(motion, 'static');
    const first = await motion.screenshot({ path: path.join(evidence, 'motion', 'static-1.png'), animations: 'disabled' });
    await motion.reload(); await completeFrame(motion, 'static');
    const second = await motion.screenshot({ path: path.join(evidence, 'motion', 'static-2.png'), animations: 'disabled' });
    return { ...state, ...await pixelsEqual(first, second, 'deterministic static frame') };
  });
  const reducedContext = await context({ reducedMotion: 'reduce' }); const reduced = await reducedContext.newPage();
  await check('motion:reduced', async () => { await reduced.goto(`${baseURL}/current/template-motion.html`); const state = await completeFrame(reduced, 'reduced'); await reduced.screenshot({ path: path.join(evidence, 'motion', 'reduced.png') }); return state; });
  const noJsContext = await context({ javaScriptEnabled: false }); const noJs = await noJsContext.newPage();
  await check('motion:no-js', async () => { await noJs.goto(`${baseURL}/current/template-motion.html`); const state = await completeFrame(noJs, 'no-js'); assert(await noJs.locator('noscript').isVisible()); await noJs.screenshot({ path: path.join(evidence, 'motion', 'no-js.png') }); return state; });
  await check('motion:print', async () => { await motion.goto(`${baseURL}/current/template-motion.html`); await motion.emulateMedia({ media: 'print' }); const state = await completeFrame(motion, 'print'); await motion.screenshot({ path: path.join(evidence, 'motion', 'print.png') }); await motion.emulateMedia({ media: 'screen' }); return state; });

  await check('export:actual-selected-SVG-and-PNG', async () => {
    await motion.goto(`${baseURL}/current/template-motion.html?motion=static`); await completeFrame(motion, 'static');
    const figure = motion.locator('svg[role="img"][aria-labelledby="template-motion-title template-motion-desc"]'); assert.equal(await figure.count(), 1);
    const box = await figure.boundingBox(); assert(box && box.width > 0 && box.height > 0);
    const sourcePNG = await motion.screenshot({ path: path.join(evidence, 'export', 'request-evaluation.png'), clip: box, animations: 'disabled' });
    const sourceOracle = await svgOracle(figure);
    const sourceGeometry = await figure.evaluate((svg) => ({ viewBox: svg.getAttribute('viewBox'), title: svg.querySelector('title').textContent,
      bbox: Object.fromEntries(['x', 'y', 'width', 'height'].map((key) => [key, svg.getBBox()[key]])),
      fonts: [...new Set([...svg.querySelectorAll('text')].map((text) => getComputedStyle(text).fontFamily))] }));
    assert.deepEqual(sourceGeometry.bbox, { x: 0, y: 0, width: 960, height: 480 });
    const xml = await figure.evaluate((svg) => {
      const clone = svg.cloneNode(true); clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const attributes = ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'text-anchor', 'dominant-baseline', 'display', 'visibility'];
      [svg, ...svg.querySelectorAll('*')].forEach((original, index) => { const item = [clone, ...clone.querySelectorAll('*')][index], css = getComputedStyle(original); for (const key of attributes) item.style.setProperty(key, css.getPropertyValue(key)); });
      clone.setAttribute('width', svg.getBoundingClientRect().width); clone.setAttribute('height', svg.getBoundingClientRect().height);
      return new XMLSerializer().serializeToString(clone);
    });
    const svgBytes = Buffer.from(xml); await writeFile(path.join(evidence, 'export', 'request-evaluation.svg'), svgBytes);
    exports.set('/exports/request-evaluation.svg', { type: 'image/svg+xml', bytes: svgBytes });
    exports.set('/exports/request-evaluation.png', { type: 'image/png', bytes: sourcePNG });
    const reopened = await main.newPage(); await reopened.goto(`${baseURL}/exports/request-evaluation.svg`); await settle(reopened);
    const target = reopened.locator('svg').first(); const reopenedPNG = await target.screenshot({ path: path.join(evidence, 'export', 'reopened-svg.png') });
    const targetOracle = await svgOracle(target);
    assert.deepEqual(targetOracle.map(({ paint, bbox, textLength, tag, text }) => ({ paint, bbox, textLength, tag, text })), sourceOracle.map(({ paint, bbox, textLength, tag, text }) => ({ paint, bbox, textLength, tag, text })), 'Reopened SVG paint, fonts, text metrics and geometry');
    const comparison = { width: PNG.sync.read(reopenedPNG).width, height: PNG.sync.read(reopenedPNG).height, identicalShapePaintGeometry: true,
      rasterOrigin: 'Source has fractional document Y; reopened SVG starts at zero, so anti-alias pixels are not an exact oracle.' };
    assert.equal(await target.locator('title').textContent(), sourceGeometry.title);
    const imagePage = await main.newPage(); await imagePage.goto(`${baseURL}/exports/request-evaluation.png`);
    const dimensions = await imagePage.locator('img').evaluate((image) => ({ width: image.naturalWidth, height: image.naturalHeight }));
    assert.deepEqual(dimensions, { width: Math.round(box.width), height: Math.round(box.height) });
    return { title: sourceGeometry.title, cssBounds: box, svgBounds: sourceGeometry.bbox, fonts: sourceGeometry.fonts, viewBox: sourceGeometry.viewBox, png: dimensions, reopened: comparison };
  });
  const onlineContext = await context({}, true), online = await onlineContext.newPage();
  const onlineFailures = [], onlineResponses = [];
  onlineContext.on('requestfailed', (request) => { if (request.url().startsWith('https://fonts.')) onlineFailures.push({ url: request.url(), error: request.failure()?.errorText }); });
  onlineContext.on('response', (response) => { if (response.url().startsWith('https://fonts.')) onlineResponses.push({ url: response.url(), status: response.status() }); });
  report.onlineFonts = { failures: onlineFailures, responses: onlineResponses, samples: [] };
  for (const source of ['index.html#example-architecture-dark', 'index.html#example-tree-full', 'template-motion.html?motion=static', 'template-augment.html']) {
    if (source.startsWith('template-augment') && !(await stat(path.join(packageRoot, 'assets', source)).catch(() => null))) continue;
    await check(`online-fonts:${source}`, async () => {
      await online.goto(`${baseURL}/current/${source}`, { timeout: 30000 });
      const frame = source.startsWith('index') ? await preview(online, source.split('#')[1] + '.html') : online; await settle(frame);
      const fonts = await frame.evaluate(() => ({ status: document.fonts.status, ready: document.fonts.status === 'loaded',
        faces: [...document.fonts].map((font) => ({ family: font.family, weight: font.weight, style: font.style, status: font.status })),
        selectedFamilies: [...new Set([...document.querySelectorAll('text,h1,h2,p')].slice(0, 50).map((element) => getComputedStyle(element).fontFamily))] }));
      assert(fonts.ready); const name = source.replaceAll(/[^a-z0-9-]/gi, '_') + '.png';
      await online.screenshot({ path: path.join(evidence, name), animations: 'disabled' });
      report.onlineFonts.samples.push({ source, ...fonts }); return fonts;
    });
  }
  await check('local-fonts:Matter-SQ-browser-decoding', async () => {
    const files = (await readdir(path.join(packageRoot, 'assets/fonts'))).filter((name) => name.endsWith('.woff2')).sort();
    assert.equal(files.length, 12);
    await online.goto(`${baseURL}/current/template-motion.html?motion=static`);
    const faces = await online.evaluate(async ({ files, baseURL }) => Promise.all(files.map(async (file, index) => {
      const face = new FontFace(`AcceptanceMatter${index}`, `url("${baseURL}/current/fonts/${file}")`);
      await face.load(); document.fonts.add(face);
      return { file, status: face.status };
    })), { files, baseURL });
    assert(faces.every((face) => face.status === 'loaded')); report.localFonts = faces;
    return { decodedFaces: faces.length, faces, scope: 'Path and WOFF2 decoding probe; templates retain their authored sample fonts.' };
  });
  await onlineContext.close();
  await main.close(); await reducedContext.close(); await noJsContext.close();
} finally {
  await browser.close(); report.finished = new Date().toISOString(); report.remoteRequests = [...report.remoteRequests];
  report.passed = report.failures.length === 0;
  await writeFile(path.join(evidence, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ passed: report.passed, cases: report.cases.length, failures: report.failures.length, evidence, previewURL: report.previewURL, gallery: report.gallery, icons: report.icons }));
  const keep = Number(args['keep-open-ms'] || 0); assert(Number.isFinite(keep) && keep >= 0 && keep <= 900000, '--keep-open-ms must be 0..900000');
  if (keep) { console.log(`Preview remains available for ${keep} ms`); await new Promise((resolve) => setTimeout(resolve, keep)); }
  await new Promise((resolve) => server.close(resolve));
  process.exitCode = report.passed ? 0 : 1;
}
