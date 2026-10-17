// Development-only browser checks; the demo has no runtime dependencies.
// PLAYWRIGHT_MODULE=/path/to/playwright node verify-matrix-studio.cjs
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_BIN ? { executablePath: process.env.CHROMIUM_BIN } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(pathToFileURL(path.join(__dirname, 'matrix-studio.html')).href);
    await page.locator('[data-action="checks"]').click();
    await page.waitForFunction(() => document.querySelectorAll('#ms-check-output .ms-fail').length === 2);
    await page.locator('[data-action="tour"]').click();
    await page.waitForFunction(() => document.querySelector('#ms-next').textContent === 'Review patch →');
    await page.locator('#ms-next').click();
    assert.equal(await page.locator('#ms-review').isVisible(), true);
    await page.locator('[data-action="apply"]').click();
    await page.waitForFunction(() => document.querySelectorAll('#ms-check-output .ms-pass').length === 3);
    assert.match(await page.locator('#ms-source').inputValue(), /disabled=\{pending\}/);
    await page.locator('#ms-next').click();
    await page.locator('[data-action="contrast"]').click();
    await page.locator('#ms-preview-cta').click();
    assert.equal(await page.locator('#ms-preview-cta').isDisabled(), true);
    await page.waitForFunction(() => !document.querySelector('#ms-preview-cta').disabled);
    await page.locator('[data-action="density"]').click();
    await page.locator('[data-action="palette"]').click();
    await page.locator('#ms-next').click();
    assert.equal(await page.locator('#ms-helper-name').innerText(), 'Rook');
    await page.locator('[data-action="reset"]').click();
    await page.locator('#ms-prompt').fill('Improve the design');
    await page.locator('#ms-command button').click();
    await page.waitForFunction(() => !document.querySelector('#ms-design').hidden);
    for (const width of [320, 390, 768, 1024]) {
      await page.setViewportSize({ width, height: 1200 });
      for (const view of ['code', 'design', 'review']) {
        await page.locator('#ms-tab-' + view).click();
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow: ${width}/${view}`);
      }
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.querySelector('[data-action="motion"]').textContent === 'Play motion');
    const still = await page.locator('#ms-hero-avatar').evaluate(c => c.toDataURL());
    await page.waitForTimeout(200);
    assert.equal(await page.locator('#ms-hero-avatar').evaluate(c => c.toDataURL()), still);
    await page.locator('[data-action="reset"]').click();
    await page.locator('#ms-source').fill('edited component without the expected button');
    await page.locator('#ms-tab-review').click();
    await page.locator('[data-action="apply"]').click();
    assert.equal(await page.locator('#ms-patch-status').innerText(), 'Source changed; patch not applied');
    await page.locator('[data-action="tour"]').click();
    await page.locator('[data-action="reset"]').click();
    await page.waitForTimeout(1750);
    assert.equal(await page.locator('#ms-moment-title').innerText(), 'Meet your collaborators.');
    assert.deepEqual(errors, []);
    console.log('PASS: guided workflow, source patch, checks, pending preview, design controls, helper routing, 12 responsive views, reduced motion, changed-source rejection, reset timer cancellation.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
