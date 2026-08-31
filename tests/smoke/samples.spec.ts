import { test, expect, type Page } from '@playwright/test';

/**
 * Smoke tests against the production build.
 *
 * Guards the regression class this repo has hit before: a sample chunk
 * hosting shared library code so that other pages instantiate the wrong
 * sample ("Cannot set properties of null") or leak foreign CSS.
 *
 * The set spans every chunk-sharing package group; the two category-chart
 * samples specifically exercise cross-sample chunk imports.
 */
const SAMPLE_SLUGS = [
  'charts/category-chart/annotations-all',
  'charts/category-chart/axis-options',
  'charts/financial-chart/overview',
  'grids/grid/overview',
  'excel/spreadsheet/overview',
  'inputs/input/overview',
  'layouts/dock-manager/overview',
  'maps/geo-map/binding-data-model',
];

// External resources (fonts, tiles, shared CSS) may be unreachable in CI —
// their fetch failures are not app regressions.
const IGNORED_CONSOLE = [/Failed to load resource/, /net::ERR_/];

function collectErrors(page: Page) {
  const errors: string[] = [];

  page.on('pageerror', err => {
    errors.push(`pageerror: ${err.message}`);
  });

  page.on('console', msg => {
    const text = msg.text();

    // The [...slug].astro loader logs these when chunk resolution breaks.
    if (text.includes('[astro]')) {
      errors.push(`loader: ${text}`);
      return;
    }
    if (msg.type() === 'error' && !IGNORED_CONSOLE.some(re => re.test(text))) {
      errors.push(`console.error: ${text}`);
    }
  });

  return errors;
}

for (const slug of SAMPLE_SLUGS) {
  test(`sample ${slug} renders without errors`, async ({ page }) => {
    const errors = collectErrors(page);

    await page.goto(`/${slug}`);

    // The sample module is lazy-loaded and must populate the content area.
    const target = page.locator('#router-target');
    await expect(target.locator('*').first()).toBeVisible({ timeout: 30_000 });

    // Give async sample init a moment to surface runtime errors.
    await page.waitForTimeout(1_000);
    expect(errors).toEqual([]);

    // No stylesheet from another sample chunk may load on this page.
    // Sample CSS assets are named after their chunk: group--component--name.
    const ownPrefix = slug.replace(/\//g, '--');
    const foreignCss = await page.evaluate(prefix => {
      return [...document.querySelectorAll('link[rel="stylesheet"]')]
        .map(link => (link as HTMLLinkElement).href.split('/').pop() ?? '')
        .filter(name => /^[a-z0-9-]+--[a-z0-9-]+--/.test(name) && !name.startsWith(prefix));
    }, ownPrefix);
    expect(foreignCss).toEqual([]);
  });
}

test('index page renders the component grid', async ({ page }) => {
  const errors = collectErrors(page);

  await page.goto('/');
  await expect(page.locator('.comp-card').first()).toBeVisible();

  expect(errors).toEqual([]);
});

test('nav sidebar renders on index and survives navigation', async ({ page }) => {
  await page.goto('/');

  const nav = page.locator('#nav-bar');
  await expect(page.locator('html')).toHaveClass(/with-nav/);
  await expect(nav.locator('.nav-logo img')).toBeVisible();

  // Expand the first component group and follow its first sample link.
  await nav.locator('.nav-component').first().click();
  await nav.locator('.nav-list[data-state="expanded"] a').first().click();

  // The sidebar stays visible on the sample page, with the link active.
  await expect(page.locator('html')).toHaveClass(/with-nav/);
  await expect(page.locator('#nav-bar a.active')).toHaveCount(1);
});

test('sidebar column is reserved before nav.json arrives', async ({ page }) => {
  // Arm the visibility flag the way a real visit does.
  await page.goto('/');

  // Stall nav.json — the column must be reserved at first paint regardless,
  // otherwise the async render shifts the whole page (the old behavior).
  await page.route('**/nav.json', () => {});
  await page.goto('/inputs/input/overview');

  const width = await page.evaluate(
    () => document.getElementById('nav-bar')?.offsetWidth ?? 0,
  );
  expect(width).toBeGreaterThan(0);
});

test('sample styles are in head before sample JS runs', async ({ page }) => {
  // Block every sample chunk — the page must still be styled at first paint:
  // the theme as a <link data-ig-theme> and the sample-local CSS as <style>.
  // Before the fix both arrived via the (now blocked) JS, so head has neither.
  await page.route('**/_astro/samples/**', route => route.abort());
  await page.goto('/grids/grid/overview');

  await expect(page.locator('head link[data-ig-theme]')).toHaveCount(1);
  await expect(page.locator('head style')).not.toHaveCount(0);
});

test('nav search filters components', async ({ page }) => {
  await page.goto('/');

  const nav = page.locator('#nav-bar');
  await nav.locator('#nav-search-input').fill('annotations');

  await expect(nav.locator('.nav-component:not(.nav-item-hidden)').first()).toBeVisible();
  await expect(nav.locator('.nav-component.nav-item-hidden').first()).toBeAttached();
});

test('deep link shows no nav sidebar', async ({ page }) => {
  // Direct visits (and docs iframes) get no sidebar — and no nav.json fetch.
  let navJsonRequested = false;
  page.on('request', req => {
    if (req.url().endsWith('/nav.json')) navJsonRequested = true;
  });

  await page.goto('/inputs/input/overview');
  await expect(page.locator('#router-target *').first()).toBeVisible();

  await expect(page.locator('html')).not.toHaveClass(/with-nav/);
  const width = await page.evaluate(
    () => document.getElementById('nav-bar')?.offsetWidth ?? 0,
  );
  expect(width).toBe(0);
  expect(navJsonRequested).toBe(false);
});
