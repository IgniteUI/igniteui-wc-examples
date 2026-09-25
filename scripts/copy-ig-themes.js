/**
 * copy-ig-themes.js
 *
 * Copies the Ignite UI theme stylesheets out of node_modules into
 * public/ig-themes/ so the sample pages can reference them with a real
 * <link rel="stylesheet"> in <head>.
 *
 * WHY this is needed
 * ──────────────────
 * Sample entry modules used to `import 'igniteui-webcomponents/themes/...css'`,
 * which the inline-sample-css plugin turned into a runtime `<style>` injection.
 * That meant no theme existed until megabytes of sample JS had downloaded and
 * evaluated — the page painted unstyled first (FOUC), and the library's
 * one-shot `getTheme()` could latch onto the wrong theme before the right
 * sheet ever landed.
 *
 * Serving them as static files instead gives us a stylesheet that:
 *   • blocks first paint, so the sample never renders unthemed,
 *   • is cached once and reused by all ~980 pages,
 *   • can be re-pointed by changing one `href` (see sample-theme handling).
 *
 * Output layout:
 *   public/ig-themes/webcomponents/{light,dark}/{material,bootstrap,fluent,indigo}.css
 *   public/ig-themes/grids/{light,dark}/{material,bootstrap,fluent,indigo}.css
 */
import { existsSync, mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Unscoped package if installed, otherwise the @infragistics/ scoped build. */
function pkgDir(pkg) {
  const unscoped = path.join(root, 'node_modules', pkg);
  if (existsSync(unscoped)) return unscoped;
  const scoped = path.join(root, 'node_modules', '@infragistics', pkg);
  return existsSync(scoped) ? scoped : null;
}

// key → directory inside the package that holds {light,dark}/*.css
const SOURCES = {
  webcomponents: ['igniteui-webcomponents', 'themes'],
  grids: ['igniteui-webcomponents-grids', 'grids/themes'],
};

const outRoot = path.join(root, 'public', 'ig-themes');
rmSync(outRoot, { recursive: true, force: true });

let copied = 0;
for (const [key, [pkg, subdir]] of Object.entries(SOURCES)) {
  const dir = pkgDir(pkg);
  if (!dir) {
    console.warn(`[copy-ig-themes] ${pkg} not installed — skipping`);
    continue;
  }

  for (const variant of ['light', 'dark']) {
    const from = path.join(dir, ...subdir.split('/'), variant);
    if (!existsSync(from)) continue;

    const to = path.join(outRoot, key, variant);
    mkdirSync(to, { recursive: true });

    for (const file of readdirSync(from)) {
      if (!file.endsWith('.css')) continue;
      copyFileSync(path.join(from, file), path.join(to, file));
      copied++;
    }
  }
}

console.log(`[copy-ig-themes] copied ${copied} stylesheet(s) to public/ig-themes/`);
