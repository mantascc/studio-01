// Development-only verification. The gallery itself has no dependencies.
// PLAYWRIGHT_MODULE=/path/to/playwright node verify.cjs
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const source = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const evidence = path.join(__dirname, 'evidence');
fs.mkdirSync(evidence, { recursive: true });
const report = { date: new Date().toISOString(), engine: 'Chromium', physicalDevice: false, tests: [], errors: [], limitations: ['Android-sized Chromium touch emulation, not a physical Android device.', 'Managed browser policy blocks file:// navigation; offline execution is tested from the exact HTML in a network-disabled context.'] };
let browser, server;
async function check(name, fn) {
  const start = Date.now();
  try { const detail = await fn(); report.tests.push({ name, passed: true, milliseconds: Date.now() - start, detail }); console.log('PASS', name); }
  catch (e) { report.tests.push({ name, passed: false, error: e.message }); console.error('FAIL', name, e.message); }
}
async function noOverflow(page) {
  const result = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, dialogs: [...document.querySelectorAll('dialog[open] .dialog-scroll')].map(e => ({ width: e.clientWidth, scroll: e.scrollWidth })) }));
  assert.ok(result.scroll <= result.width, JSON.stringify(result));
  for (const d of result.dialogs) assert.ok(d.scroll <= d.width + 1, JSON.stringify(d));
  return result;
}
async function screenshot(page, name, fullPage = false) { await page.screenshot({ path: path.join(evidence, name + '.png'), fullPage, style: '.toast{visibility:hidden!important}' }); }
async function setRange(page, id, value) { await page.locator('#' + id).evaluate((el, value) => { el.value = value; el.dispatchEvent(new Event('input', { bubbles: true })); }, String(value)); }
async function download(page, button, filename) {
  const event = page.waitForEvent('download'); await page.locator('#' + button).click(); const item = await event;
  const dest = path.join(evidence, filename); await item.saveAs(dest); assert.equal(await item.failure(), null); return dest;
}
(async () => {
  server = http.createServer((req, res) => { if (req.url === '/favicon.ico') { res.writeHead(204); res.end(); return; } res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(source); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/`;
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_BIN || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  report.browserVersion = browser.version();
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1080 }, deviceScaleFactor: 1, acceptDownloads: true });
  const page = await desktop.newPage(), requests = [];
  page.on('pageerror', e => report.errors.push(e.message)); page.on('request', r => requests.push(r.url()));
  await page.goto(url);
  await check('80 specimens; ten families; no external runtime or assets', async () => {
    assert.equal(await page.locator('.card').count(), 80); assert.equal(await page.locator('.family').count(), 10);
    assert.equal(await page.locator('script[src],link[rel="stylesheet"],img[src],iframe,video').count(), 0);
    assert.equal(requests.filter(r => !r.startsWith(url)).length, 0); await noOverflow(page);
    await screenshot(page, 'desktop-dark'); return { specimens: 80, families: 10, externalRequests: 0 };
  });
  await check('1,280 deterministic state/theme/extreme-parameter renders; bounds and topology', async () => {
    const result = await page.evaluate(() => {
      const api = presenceAtlas, host = document.createElement('div'), issues = [], unique = new Set(); let renders = 0;
      host.style.cssText = 'position:absolute;left:-9999px;top:0'; document.body.append(host);
      for (let f = 0; f < 10; f++) for (let v = 0; v < 8; v++) {
        const c = api.defaults(f, v), states = [];
        for (const state of ['idle', 'working', 'attention', 'failure']) for (const theme of ['light', 'dark']) for (const extreme of [false, true]) {
          const cfg = structuredClone(c);
          if (extreme) { cfg.aspect = 125; cfg.spread = 125; cfg.weight = 125; cfg.rotation = 45; cfg.offsets[api.makeGeometry(cfg).parts[0].id] = [22, -22]; }
          const markup = api.svg(cfg, state, theme, 128, true);
          if (/NaN|undefined|Infinity/.test(markup)) issues.push({ f, v, state, reason: 'invalid geometry' });
          if (markup !== api.svg(cfg, state, theme, 128, true)) issues.push({ f, v, state, reason: 'nondeterministic' });
          const xml = new DOMParser().parseFromString(markup, 'image/svg+xml'); if (xml.querySelector('parsererror')) issues.push({ f, v, state, reason: 'invalid XML' });
          host.innerHTML = markup;
          const g = host.querySelector('.geometry'), r = g.getBBox(), m = g.transform.baseVal.consolidate().matrix;
          const points = [[r.x, r.y], [r.x + r.width, r.y], [r.x, r.y + r.height], [r.x + r.width, r.y + r.height]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(m));
          if (points.some(p => p.x < -.5 || p.y < -.5 || p.x > 128.5 || p.y > 128.5)) issues.push({ f, v, state, extreme, reason: 'clipped bounds' });
          if (theme === 'dark' && !extreme) states.push(g.innerHTML);
          renders++;
        }
        if (new Set(states).size !== 4) issues.push({ f, v, reason: 'identical state poses' });
        unique.add(api.makeGeometry(c).markup);
      }
      host.remove(); return { renders, distinctStructures: unique.size, issues };
    });
    assert.deepEqual(result.issues, []); assert.equal(result.distinctStructures, 80); return result;
  });
  await check('Construction/vibe filters and exact 64 px gallery footprints', async () => {
    await page.locator('#vibeFilter').selectOption('0'); assert.equal(await page.locator('.card').count(), 20);
    await page.locator('#familyFilter').selectOption('3'); assert.equal(await page.locator('.card').count(), 2);
    await page.locator('#vibeFilter').selectOption('all'); assert.equal(await page.locator('.card').count(), 8);
    await page.locator('#sizeSmall').click(); const rect = await page.locator('.art svg').first().boundingBox(); assert.equal(rect.width, 64); assert.equal(rect.height, 64);
    await page.locator('#sizeLarge').click(); await page.locator('#familyFilter').selectOption('all');
    return { kawaii: 20, perFamily: 8, familyAndVibe: 2, interfacePixels: 64 };
  });
  await check('All controls change the identity; palette, dimensions, seed, arrangement and reload persist', async () => {
    await page.locator('[data-open="3-4"]').first().click();
    await page.locator('[data-palette="6"]').click();
    for (const [id, value] of Object.entries({ softness: 71, aspect: 111, spread: 92, weight: 107, rotation: 13 })) await setRange(page, id, value);
    await page.locator('#seedInput').fill('4117'); await page.locator('#seedInput').press('Tab');
    await page.locator('#arrangeButton').click(); await page.locator('#partSelect').selectOption('module1'); await page.locator('[data-nudge="2,0"]').click();
    const c = await page.evaluate(() => presenceAtlas.snapshot().current);
    assert.equal(c.palette, 6); assert.equal(c.softness, 71); assert.equal(c.aspect, 111); assert.equal(c.spread, 92); assert.equal(c.weight, 107); assert.equal(c.rotation, 13); assert.equal(c.seed, 4117); assert.deepEqual(c.offsets.module1, [2, 0]);
    await page.locator('#closeEditor').click(); await page.reload(); await page.locator('[data-open="3-4"]').first().click();
    assert.deepEqual(await page.evaluate(() => presenceAtlas.snapshot().current), c);
    await page.locator('#resetIdentity').click(); await screenshot(page, 'laboratory-desktop'); await page.locator('#closeEditor').click();
    return { persistedFields: 8, partOffsetsPreserved: true };
  });
  await check('Saved studies, four-way comparison and persistence', async () => {
    for (const key of ['3-4', '1-7', '2-1', '6-3']) await page.locator(`[data-favorite="${key}"]`).click();
    await page.locator('#shortlistButton').click(); assert.equal(await page.locator('.card').count(), 4);
    await page.locator('#compareButton').click(); assert.equal(await page.locator('.compare-card').count(), 4); assert.equal(await page.locator('.compare-state').count(), 16);
    await screenshot(page, 'comparison-desktop'); await page.locator('#closeCompare').click(); await page.reload();
    assert.equal(await page.locator('#savedCount').innerText(), '4'); return { saved: 4, comparisonStatePreviews: 16 };
  });
  await check('Motion at both scales, geometry interpolation, exact pause and static phase', async () => {
    await page.locator('[data-open="3-4"]').first().click(); await page.locator('[data-state="working"]').click(); await page.locator('#tabStates').click();
    const still = await page.locator('#miniDark').innerHTML(); await page.waitForTimeout(180); assert.equal(await page.locator('#miniDark').innerHTML(), still);
    await page.locator('#playMotion').click(); await page.waitForTimeout(160); const animated = await page.locator('#miniDark').innerHTML(); await page.waitForTimeout(260); assert.notEqual(await page.locator('#miniDark').innerHTML(), animated);
    await page.locator('[data-state="attention"]').click(); await page.waitForTimeout(180); const blend = await page.evaluate(() => presenceAtlas.snapshot().poseMix); assert.ok(blend[0] > 0 && blend[1] > 0);
    await page.locator('#playMotion').click(); const paused = await page.locator('#stage svg').innerHTML(); await page.waitForTimeout(220); assert.equal(await page.locator('#stage svg').innerHTML(), paused);
    await page.locator('[data-state="working"]').click(); await setRange(page, 'phase', 37); assert.equal(await page.evaluate(() => presenceAtlas.snapshot().phase), .37);
    await page.locator('#cycleMotion').click(); await page.waitForTimeout(3450); assert.equal(await page.evaluate(() => presenceAtlas.snapshot().state), 'working'); await page.locator('#cycleMotion').click();
    await page.locator('#closeEditor').click(); return { staticDefault: true, compactMotion: true, interpolation: true, pauseFrozen: true, cycle: true };
  });
  await check('SVG, PNG, state-sheet, identity and session export; recipe round trip and invalid import', async () => {
    await page.locator('[data-open="3-4"]').first().click(); await page.locator('[data-state="working"]').click(); await page.locator('#tabStates').click(); await setRange(page, 'phase', 37);
    await page.locator('#tabExport').click(); await page.locator('#exportSize').selectOption('64');
    const svgFile = await download(page, 'exportSVG', 'sample-interface.svg'); const svgText = fs.readFileSync(svgFile, 'utf8'); assert.ok(svgText.includes('width="64"')); assert.ok(svgText.includes('<metadata>'));
    const pngFile = await download(page, 'exportPNG', 'sample-interface.png'); const png = fs.readFileSync(pngFile); assert.equal(png.readUInt32BE(16), 64); assert.equal(png.readUInt32BE(20), 64);
    await page.locator('#exportSize').selectOption('512'); await download(page, 'exportPNG', 'sample-communication.png');
    await download(page, 'exportSheet', 'sample-state-sheet.svg'); const recipeFile = await download(page, 'exportRecipe', 'sample-identity.json');
    const sessionFile = await download(page, 'exportSession', 'sample-session.json'); const session = JSON.parse(fs.readFileSync(sessionFile)); assert.equal(session.favorites.length, 4);
    const before = await page.locator('#stage svg').innerHTML();
    await page.locator('#tabShape').click(); await page.locator('[data-palette="2"]').click(); await page.locator('#tabExport').click(); await page.locator('#recipeFile').setInputFiles(recipeFile); await page.waitForTimeout(120);
    assert.equal(await page.locator('#stage svg').innerHTML(), before);
    const config = await page.evaluate(() => presenceAtlas.snapshot().current);
    await page.locator('#recipeFile').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{"format":"min1-presence-identity","version":1,"identity":{"family":999}}') }); await page.waitForTimeout(100);
    assert.deepEqual(await page.evaluate(() => presenceAtlas.snapshot().current), config); assert.ok((await page.locator('#toast').innerText()).includes('Import rejected'));
    await page.locator('#recipeFile').setInputFiles(sessionFile); await page.waitForTimeout(100); assert.equal((await page.evaluate(() => presenceAtlas.snapshot().favorites)).length, 4);
    await page.locator('#closeEditor').click(); return { interfacePNG: '64 × 64', communicationPNG: '512 × 512', sheet: '512 × 160 SVG', exactRecipeRoundTrip: true, invalidImportAtomic: true, sessionRoundTrip: true };
  });
  await check('320/360/390/412/768/844/1440 px responsive layouts in both themes', async () => {
    const sizes = [[320, 740], [360, 800], [390, 844], [412, 915], [768, 1024], [844, 390], [1440, 960]], widths = [];
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      for (const theme of ['dark', 'light']) { if (await page.evaluate(() => document.documentElement.dataset.theme) !== theme) await page.locator('#themeToggle').click(); await noOverflow(page); }
      const filters = await page.locator('#familyFilter').boundingBox(); assert.ok(filters.width > 100);
      await page.locator('[data-open="3-4"]').first().click(); await noOverflow(page);
      const mini = await page.locator('#miniLight svg').boundingBox(); assert.equal(mini.width, 64);
      await page.locator('#closeEditor').click(); widths.push(width);
    }
    return { widths, themes: ['dark', 'light'], exactMiniPixels: 64 };
  });
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const mobile = await mobileContext.newPage(); mobile.on('pageerror', e => report.errors.push(e.message)); await mobile.goto(url);
  await check('Android-sized touch: filtering, palette, part drag, nudge and state selection', async () => {
    await screenshot(mobile, 'mobile-dark'); await mobile.locator('#familyFilter').selectOption('3'); await mobile.locator('#family-3').evaluate(e => e.scrollIntoView({block:'start'}));
    await screenshot(mobile, 'mobile-gallery-dark');
    await mobile.locator('[data-open="3-4"]').first().tap(); await mobile.locator('[data-state="working"]').tap(); assert.equal(await mobile.evaluate(() => presenceAtlas.snapshot().state), 'working');
    await mobile.locator('[data-state="idle"]').tap(); await screenshot(mobile, 'laboratory-mobile');
    await mobile.locator('[data-palette="6"]').tap(); await mobile.locator('#arrangeButton').tap();
    const point = await mobile.evaluate(() => { const api = presenceAtlas, c = api.snapshot().current, part = api.makeGeometry(c).parts[0], matrix = document.querySelector('#stage .geometry').getScreenCTM(), p = new DOMPoint(part.cx, part.cy).matrixTransform(matrix); return { x: p.x, y: p.y }; });
    const cdp = await mobileContext.newCDPSession(mobile);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
    for (let step = 1; step <= 5; step++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: point.x + step * 4, y: point.y + step * 2 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    let c = await mobile.evaluate(() => presenceAtlas.snapshot().current); assert.ok(c.offsets.module0[0] > 6); assert.equal(c.palette, 6);
    const before = c.offsets.module0[0]; await mobile.locator('[data-nudge="2,0"]').tap(); c = await mobile.evaluate(() => presenceAtlas.snapshot().current); assert.equal(c.offsets.module0[0], before + 2);
    await noOverflow(mobile); await mobile.locator('#closeEditor').tap(); await mobile.locator('#themeToggle').tap();
    await mobile.locator('#family-3').evaluate(e => e.scrollIntoView({block:'start'})); await screenshot(mobile, 'mobile-gallery-light');
    return { viewport: '390 × 844', touchEnabled: true, realTouchEvents: true, draggedOffset: c.offsets.module0 };
  });
  await check('Reduced-motion startup and live preference changes; no autonomous motion', async () => {
    await mobile.emulateMedia({ reducedMotion: 'reduce' }); await mobile.locator('[data-open="3-4"]').first().tap(); await mobile.locator('#tabStates').tap();
    assert.equal(await mobile.locator('#playMotion').isDisabled(), true); assert.equal(await mobile.locator('#cycleMotion').isDisabled(), true);
    const html = await mobile.locator('#stage svg').innerHTML(); await mobile.waitForTimeout(200); assert.equal(await mobile.locator('#stage svg').innerHTML(), html);
    await mobile.locator('[data-state="working"]').tap(); await setRange(mobile, 'phase', 25); const scrubbed = await mobile.locator('#stage svg').innerHTML(); await mobile.waitForTimeout(160); assert.equal(await mobile.locator('#stage svg').innerHTML(), scrubbed);
    await mobile.emulateMedia({ reducedMotion: 'no-preference' }); await mobile.locator('#playMotion').tap(); await mobile.waitForTimeout(120); await mobile.emulateMedia({ reducedMotion: 'reduce' }); await mobile.waitForFunction(() => presenceAtlas.snapshot().mode === 'none', {}, {timeout:1000});
    await mobile.locator('#closeEditor').tap(); return { startupStatic: true, manualScrubbing: true, livePreferenceStopsMotion: true };
  });
  await check('Keyboard tab navigation, modal dismissal and focus restoration', async () => {
    await page.setViewportSize({ width: 1440, height: 1080 }); await page.locator('[data-open="3-4"]').first().click(); await page.locator('#tabShape').focus(); await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tabStates').getAttribute('aria-selected'), 'true');
    await page.keyboard.press('End'); assert.equal(await page.locator('#tabExport').getAttribute('aria-selected'), 'true'); await page.keyboard.press('Escape'); assert.equal(await page.locator('#editor').evaluate(e => e.open), false);
    assert.equal(await page.evaluate(() => document.activeElement.dataset.open), '3-4');
    return { tabArrows: true, escape: true, focusRestored: true };
  });
  await check('Self-contained offline execution and storage-denied fallback', async () => {
    const context = await browser.newContext({ offline: true, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const offline = await context.newPage(), offlineRequests = []; offline.on('request', r => offlineRequests.push(r.url())); offline.on('pageerror', e => report.errors.push(e.message));
    await offline.setContent(source); assert.equal(await offline.locator('.card').count(), 80); await offline.locator('[data-open="1-7"]').first().tap(); await offline.locator('[data-state="attention"]').tap(); await offline.locator('[data-palette="4"]').tap();
    assert.equal(await offline.evaluate(() => presenceAtlas.snapshot().current.palette), 4); assert.equal(offlineRequests.length, 0); assert.equal(await offline.evaluate(() => presenceAtlas.snapshot().storage), false); await noOverflow(offline);
    await context.close(); return { exactHTML: true, networkDisabled: true, requests: 0, storageFailureGraceful: true };
  });
  await check('Complete visual contact sheets in light and dark', async () => {
    const contactContext = await browser.newContext(); const contacts = await contactContext.newPage(); await contacts.goto(url); await contacts.setViewportSize({ width: 1500, height: 1000 });
    await contacts.addStyleTag({ content: '.skip,.topbar,.hero,.hero-strip,.hero-note,.toolbar-wrap,.assessment,footer,.family-header .eyebrow,.description,.parameters,.criteria,.axis-caption,.family-foot,.favorite{display:none!important}.shell{max-width:none;padding:0 20px}.family{padding:10px 0}.family-header{display:block;margin-bottom:8px}.family-title{margin:0}.family-title h2{font-size:18px}.cards{grid-template-columns:repeat(8,1fr);gap:8px}.art{height:130px}.art svg{width:116px;height:116px}.card-copy{min-height:58px;padding:7px}.card-name{font-size:12px}.vibe-tag{font-size:8px}.card-recipe{display:none}.card-no{font-size:8px;top:6px;left:6px}.collection{padding:0}' });
    for (const theme of ['dark', 'light']) {
      await contacts.evaluate(theme => { if (document.documentElement.dataset.theme !== theme) document.getElementById('themeToggle').click(); }, theme);
      for (let half = 0; half < 2; half++) { await contacts.evaluate(half => { document.querySelectorAll('.family').forEach((e, i) => e.style.display = i >= half * 5 && i < (half + 1) * 5 ? 'block' : 'none'); }, half); await screenshot(contacts, `contact-${theme}-${half + 1}`, true); }
    }
    await contactContext.close(); return { sheets: 4, subjectsPerSheet: 40 };
  });
  assert.equal(report.errors.length, 0, report.errors.join('\n'));
})().catch(e => { report.errors.push(e.stack); console.error(e); }).finally(async () => {
  report.passed = report.errors.length === 0 && report.tests.every(t => t.passed);
  fs.writeFileSync(path.join(evidence, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
  if (browser) await browser.close(); if (server) server.close();
  console.log(JSON.stringify({ passed: report.passed, tests: report.tests.length, errors: report.errors }));
  process.exitCode = report.passed ? 0 : 1;
});
