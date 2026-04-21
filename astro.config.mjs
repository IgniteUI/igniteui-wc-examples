// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

/**
 * Vite plugin: strip the module-level `new Sample();` (or `new ClassName();`)
 * from every sample src/index.ts.
 *
 * WHY this is needed
 * ──────────────────
 * Rollup's code-splitting can place shared IgniteUI library symbols inside the
 * *first* sample chunk that imports them (e.g. annotations-all).  Any other
 * sample that uses those same symbols imports from that chunk at runtime.
 * Without this plugin the module-level `new Sample()` inside the host chunk
 * would fire immediately — but the DOM for that sample isn't present on the
 * page — causing "Cannot set properties of null" errors.
 *
 * The `[...slug].astro` loader instead calls `new module.Sample()` explicitly
 * after the dynamic import resolves, so instantiation is always deferred until
 * the correct page is loaded.
 */
/** @returns {import('vite').Plugin} */
function stripSampleInstantiation() {
  // Match the trailing `new ClassName();` that sample generators emit.
  // It is always the last non-empty statement in the file.
  const trailingNewRe = /\bnew\s+\w+\(\)\s*;?\s*$/;

  return {
    name: 'strip-sample-instantiation',
    enforce: /** @type {'pre'} */ ('pre'),
    transform(code, id) {
      // Only touch samples/**/src/index.ts
      if (!id.replace(/\\/g, '/').match(/\/samples\/.+\/src\/index\.ts$/)) return;
      if (!trailingNewRe.test(code)) return;
      return { code: code.replace(trailingNewRe, ''), map: null };
    },
  };
}

/**
 * Vite plugin: convert local CSS/SCSS imports in sample index.ts files to
 * `?inline` imports with dynamic `<style>` injection.
 *
 * WHY this is needed
 * ──────────────────
 * Rollup picks certain sample chunks as "hosts" for shared IgniteUI code.
 * Any CSS imported by those host chunks ends up in a SHA-named CSS file that
 * Vite's `__vite__mapDeps` then preloads on EVERY page that transits through
 * that shared chunk — causing unrelated sample styles to appear on the wrong
 * pages and override each other.
 *
 * By converting  import './index.css'  →  import __css from './index.css?inline'
 * we keep the CSS as a plain string inside the owning JS module.  Vite no
 * longer emits a separate CSS chunk for it, so nothing leaks into other pages.
 * The `<style>` is only injected when that specific sample's JS actually runs.
 */
/** @returns {import('vite').Plugin} */
function inlineSampleCss() {
  // Matches any CSS / SCSS side-effect import inside a sample file (relative or package).
  const localCssRe = /^import\s+['"]([^'"]+\.(?:css|scss))['"];?\s*$/gm;
  let isBuild = false;

  return {
    name: 'inline-sample-css',
    enforce: /** @type {'pre'} */ ('pre'),
    configResolved(config) {
      isBuild = config.command === 'build';
    },
    transform(code, id) {
      // Production build only — in dev, Vite handles CSS imports natively
      // (injects as <style> tags automatically) which works correctly per-module.
      if (!isBuild) return;
      if (!id.replace(/\\/g, '/').match(/\/samples\/.+\/src\/index\.ts$/)) return;
      localCssRe.lastIndex = 0;
      if (!localCssRe.test(code)) return;
      localCssRe.lastIndex = 0;

      let i = 0;
      const newCode = code.replace(localCssRe, (_, cssPath) => {
        const v = `__sampleCss${i++}`;
        // ?inline → Vite compiles SCSS→CSS and returns the result as a string.
        // We inject it via a <style> element so it only appears in the DOM
        // when this exact sample's JS module is imported — never on other pages.
        return [
          `import ${v} from '${cssPath}?inline';`,
          `{const __s=document.createElement('style');__s.textContent=${v};document.head.appendChild(__s);}`,
        ].join('\n');
      });

      return { code: newCode, map: null };
    },
  };
}

/**
 * Vite plugin: rename the dock-manager's internal `igc-splitter` custom element
 * to `igc-dm-splitter` throughout all `igniteui-dockmanager` modules.
 *
 * WHY this is needed
 * ──────────────────
 * Both `igniteui-dockmanager` and `igniteui-webcomponents` ship a class named
 * `IgcSplitterComponent` that registers under the SAME custom-element tag name
 * `igc-splitter`.  The browser's custom-element registry is global and
 * first-registration wins (guarded by `!customElements.get(name)`).
 *
 * When Rollup code-splitting places both libraries' modules into the same
 * executed chunk — or when dependency preloading causes both to run on the same
 * page — whichever `registerComponent()` call fires first "wins", and the other
 * sample silently gets the wrong component backing its `<igc-splitter>` elements.
 *
 * The fix renames every occurrence of the bare tag name `igc-splitter` (but NOT
 * `igc-splitter-docking-indicator` or CSS custom-props like
 * `--igc-splitter-thickness`) inside dock-manager source to `igc-dm-splitter`.
 * The two registrations then target distinct names and can no longer conflict.
 */
/** @returns {import('vite').Plugin} */
function deconflictDockManagerSplitter() {
  // Matches any path segment that belongs to the igniteui-dockmanager package
  // (unscoped or @infragistics/-scoped).
  const isDockManager = /[\\/](?:@infragistics[\\/])?igniteui-dockmanager[\\/]/;

  return {
    name: 'deconflict-dockmanager-splitter',
    enforce: /** @type {'pre'} */ ('pre'),
    transform(code, id) {
      if (!isDockManager.test(id.replace(/\\/g, '/'))) return;
      if (!code.includes('igc-splitter')) return;
      // Replace the exact tag name `igc-splitter` but leave any hyphenated
      // continuations (e.g. `-docking-indicator`, `-thickness`) intact.
      return { code: code.replace(/igc-splitter(?!-)/g, 'igc-dm-splitter'), map: null };
    },
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Ignite UI packages that may be installed either as unscoped (e.g.
 * `igniteui-dockmanager`) or as `@infragistics/`-scoped equivalents.
 * Used by both the resolveId plugin and the optimizeDeps.include list.
 */
const IGNITEUI_PACKAGES = [
  'igniteui-dockmanager',
  'igniteui-webcomponents-core',
  'igniteui-webcomponents-charts',
  'igniteui-webcomponents-gauges',
  'igniteui-webcomponents-datasources',
  'igniteui-webcomponents-excel',
  'igniteui-webcomponents-inputs',
  'igniteui-webcomponents-data-grids',
  'igniteui-webcomponents-maps',
  'igniteui-webcomponents-spreadsheet',
  'igniteui-webcomponents-spreadsheet-chart-adapter',
  'igniteui-webcomponents-layouts',
  'igniteui-webcomponents-dashboards',
  'igniteui-webcomponents-grids',
];

/**
 * Vite plugin: resolve unscoped igniteui-* package names to their @infragistics/
 * scoped equivalents when the unscoped package is not installed.
 *
 * WHY a resolveId plugin instead of resolve.alias
 * ────────────────────────────────────────────────
 * Astro merges its own Vite config last and can replace resolve.alias arrays.
 * A resolveId hook is part of the Rollup plugin pipeline and is always called
 * for every import, regardless of how Astro configures the resolver.
 */
/** @returns {import('vite').Plugin} */
function resolveIgniteUiScoped() {
  // Build a map at startup: unscoped name → scoped name, only for packages
  // that are absent from node_modules unscoped.
  /** @type {Map<string, string>} */
  const redirects = new Map();

  for (const pkg of IGNITEUI_PACKAGES) {
    if (!existsSync(path.resolve(__dirname, 'node_modules', pkg))) {
      redirects.set(pkg, `@infragistics/${pkg}`);
    }
  }

  return {
    name: 'resolve-igniteui-scoped',
    async resolveId(id, importer, options) {
      // Exact match (e.g. 'igniteui-dockmanager')
      if (redirects.has(id)) {
        return this.resolve(redirects.get(id), importer, { ...options, skipSelf: true });
      }
      // Subpath match (e.g. 'igniteui-webcomponents-grids/grids/combined')
      for (const [unscoped, scoped] of redirects) {
        if (id.startsWith(`${unscoped}/`)) {
          const newId = `${scoped}${id.slice(unscoped.length)}`;
          return this.resolve(newId, importer, { ...options, skipSelf: true });
        }
      }
    },
  };
}

// Set BASE_PATH env variable to deploy under a sub-path, e.g. "/webcomponents-demos"
const base = process.env.BASE_PATH ?? '';

/**
 * Returns the installed package name for a given unscoped igniteui-* id.
 * If the unscoped package exists in node_modules it is returned as-is;
 * otherwise the @infragistics/ scoped name is returned.
 * @param {string} pkg
 */
function ig(pkg) {
  return existsSync(path.resolve(__dirname, 'node_modules', pkg))
    ? pkg
    : `@infragistics/${pkg}`;
}

// https://astro.build/config
export default defineConfig({
  // Static output — builds to dist/ as plain HTML + JS assets (ideal for IIS / Nginx / CDN)
  output: 'static',

  // When deploying to https://staging.infragistics.com/webcomponents-demos set:
  //   BASE_PATH=/webcomponents-demos npm run build
  base,

  // Match IIS behaviour: routes are served without trailing slashes
  trailingSlash: 'never',

  vite: {
    plugins: [resolveIgniteUiScoped(), stripSampleInstantiation(), inlineSampleCss(), deconflictDockManagerSplitter()],
    // samples/ and node_modules/ are already at the repo root (__dirname),
    // so no extra fs.allow entries are needed.
    server: {
      fs: {
        allow: [path.resolve(__dirname)],
      },
    },

    // Dep optimisation:
    // noDiscovery stops esbuild from scanning any source files (including
    // [..slug].astro whose client script globs sample TS files that have CSS
    // side-effect imports — causing "Expected ';'" crashes).
    // We explicitly pre-bundle only the igniteui runtime packages so the first
    // sample click is fast without triggering the scanner.
    optimizeDeps: {
      noDiscovery: true,
      include: [
        'igniteui-webcomponents',
        ...IGNITEUI_PACKAGES.map(ig),
        'igniteui-grid-lite',
        // CJS-only packages that need pre-bundling for named-export interop
        'file-saver',
      ],
    },

    // CSS / SCSS:
    // `loadPaths` / `includePaths` make node_modules visible to Sass so
    // samples that @use 'igniteui-theming/sass/...' resolve correctly.
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          loadPaths: [path.resolve(__dirname, 'node_modules')],
        },
      },
    },

    build: {
      chunkSizeWarningLimit: 16000,
      sourcemap: process.env.NODE_ENV !== 'production',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Give every sample its own chunk so Rollup doesn't try to inline
          // all 700+ samples into a single bundle (causes OOM).
          manualChunks(id) {
            const match = id.match(/[\\/]samples[\\/](.+)[\\/]src[\\/]index\.ts$/);
            if (match) {
              return `samples/${match[1].replace(/[\\/]/g, '--')}`;
            }
          },
          // Keep sample CSS files scoped to their own chunk names
          assetFileNames(assetInfo) {
            const name = assetInfo.name ?? '';
            if (name.endsWith('.css') && assetInfo.source) {
              return '_astro/[name].[hash][extname]';
            }
            return '_astro/[name].[hash][extname]';
          },
        },
      },
    },
  },
});
