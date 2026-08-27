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
 * Vite plugin: take the stylesheet imports out of every sample entry module.
 *
 * WHY this is needed
 * ──────────────────
 * A sample's entry module is loaded lazily, by slug, from a dynamic import that
 * only runs after DOMContentLoaded — and it drags in megabytes of library code.
 * While that is in flight the page has already painted, so any CSS the module
 * owns arrives far too late: the sample flashes unstyled first.
 *
 * It was also a correctness problem. Rollup hoists shared code into some
 * chunk, and evaluating a chunk runs the whole module body — so a *different*
 * sample's theme import could land in the document first and win the library's
 * one-shot `getTheme()` check, rendering material samples with the bootstrap
 * theme.
 *
 * So `[...slug].astro` now emits these stylesheets into <head> at build time
 * (see resolveSampleStyles): themes as <link>s to public/ig-themes/, everything
 * sample-local inlined. This plugin drops the imports it has taken over, so the
 * two can't both own the same sheet — otherwise the module's copy would
 * re-append itself last on every load and clobber a theme swap.
 *
 * Anything whose shape the page does NOT resolve is deliberately left alone and
 * still injected at runtime, so an unrecognised import degrades to the old
 * behaviour instead of silently losing its styles.
 */
/** @returns {import('vite').Plugin} */
function inlineSampleCss() {
  // Matches any CSS / SCSS side-effect import inside a sample file (relative or package).
  const cssImportRe = /^import\s+['"]([^'"]+\.(?:css|scss))['"];?\s*$/gm;

  // The two shapes [...slug].astro knows how to put in <head>. Keep in sync
  // with resolveSampleStyles() in src/utils/samples.ts.
  const themeSpecRe =
    /^igniteui-webcomponents(-grids\/grids)?\/themes\/(light|dark)\/(material|bootstrap|fluent|indigo)\.css$/;
  const sampleLocalRe = /^\.\/[^/]+\.(?:css|scss)$/;

  const handledInHead = spec => themeSpecRe.test(spec) || sampleLocalRe.test(spec);

  let isBuild = false;

  return {
    name: 'inline-sample-css',
    enforce: /** @type {'pre'} */ ('pre'),
    configResolved(config) {
      isBuild = config.command === 'build';
    },
    transform(code, id) {
      if (!id.replace(/\\/g, '/').match(/\/samples\/.+\/src\/index\.ts$/)) return;
      cssImportRe.lastIndex = 0;
      if (!cssImportRe.test(code)) return;
      cssImportRe.lastIndex = 0;

      let i = 0;
      const newCode = code.replace(cssImportRe, (line, spec) => {
        // Already in <head> — drop it so nothing is styled twice.
        if (handledInHead(spec)) return '';

        // In dev Vite injects CSS imports natively, which is correct per-module.
        if (!isBuild) return line;

        // Production fallback for shapes the page could not resolve. ?inline
        // keeps the CSS as a string inside this module, so Vite emits no shared
        // CSS chunk that could leak onto unrelated pages.
        const v = `__sampleCss${i++}`;
        return [
          `import ${v} from '${spec}?inline';`,
          `{const __s=document.createElement('style');__s.textContent=${v};document.head.appendChild(__s);}`,
        ].join('\n');
      });

      return { code: newCode, map: null };
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
    plugins: [resolveIgniteUiScoped(), stripSampleInstantiation(), inlineSampleCss()],
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
          //
          // Library code goes into vendor/<package> chunks.  Without this,
          // Rollup picks an arbitrary *sample* chunk to host the shared
          // IgniteUI code, so loading any sample also evaluates that host
          // sample's module body — running its `defineAllComponents()` and
          // injecting its theme CSS on a page it has nothing to do with.
          // That is what made the material-themed samples (button-group)
          // render with the bootstrap theme: the host chunk injected
          // bootstrap.css and defined the elements first, so the library's
          // one-shot `getTheme()` latched onto `--ig-theme: bootstrap`
          // before the sample's own material.css was ever added.
          manualChunks(id) {
            const match = id.match(/[\\/]samples[\\/](.+)[\\/]src[\\/]index\.ts$/);
            if (match) {
              return `samples/${match[1].replace(/[\\/]/g, '--')}`;
            }

            const dep = id.replace(/\\/g, '/').match(/\/node_modules\/((?:@[^/]+\/)?[^/]+)\//);
            if (dep) {
              return `vendor/${dep[1].replace('/', '--')}`;
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
