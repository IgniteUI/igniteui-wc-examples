// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

// A sample's entry module, samples/<path>/src/index.ts (captures <path>).
const SAMPLE_ENTRY_RE = /[\\/]samples[\\/](.+)[\\/]src[\\/]index\.ts$/;

/**
 * Vite plugin: strip the module-level `new Sample();` (or `new ClassName();`)
 * from every sample src/index.ts.
 *
 * WHY this is needed
 * ──────────────────
 * The `[...slug].astro` loader calls `new module.Sample()` explicitly after
 * the dynamic import resolves, so the page controls when a sample
 * instantiates.  Keeping the module-level `new Sample()` as well would run
 * every sample twice.  Stripping it here (instead of editing 900+ samples)
 * keeps each sample runnable standalone while the browser instantiates it
 * exactly once.
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
      if (!SAMPLE_ENTRY_RE.test(id)) return;
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
      if (!SAMPLE_ENTRY_RE.test(id)) return;
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

/**
 * Vite plugin: the browser build's chunk layout — one chunk per sample and
 * one per node_modules package.
 *
 * WHY a plugin instead of build.rolldownOptions
 * ──────────────────────────────────────────────
 * The vendor group must not capture its modules' dependencies, which Rolldown
 * allows only when preserveEntrySignatures is 'allow-extension' or false.
 * Astro hard-codes 'exports-only' into the client build options; the
 * configEnvironment hook runs after that, so its override sticks. Astro's
 * client entries are page scripts that export nothing, and the option doesn't
 * apply to dynamically imported samples, so only the validation changes.
 */
/** @returns {import('vite').Plugin} */
function sampleChunking() {
  /** @type {import('vite').Rolldown.CodeSplittingGroup[]} */
  const groups = [
    {
      // Vite's dynamic-import preload helper is shared by every lazy chunk.
      // Left unassigned, the bundler hosts it inside one vendor chunk and the
      // others import it back — a chunk cycle (grid-lite → webcomponents →
      // grid-lite warning).
      name: 'preload-helper',
      test: /vite\/preload-helper/,
      priority: 3,
    },
    {
      // One chunk per node_modules package. It outranks the sample group (a
      // module claimed by several groups goes to the higher priority), so
      // library code never lands in a sample chunk, and it doesn't capture
      // dependencies, so each chunk holds only its own package.
      test: /[\\/]node_modules[\\/]/,
      priority: 2,
      includeDependenciesRecursively: false,
      name(id) {
        const file = id.replace(/\\/g, '/');

        // Shared IgniteUI runtime → one vendor chunk per package.
        // Without this, the bundler hosts shared library code inside the
        // first sample chunk that imports it, so every other sample transits
        // through that chunk (e.g. an 11MB annotations-all hosting the charts
        // runtime) and pulls in its side effects.
        const vendor = file.match(/\/node_modules\/(?:@infragistics\/)?(igniteui-[^/]+)\//);
        if (vendor) {
          return `vendor/${vendor[1]}`;
        }

        // Every other node_modules package too.  A shared non-IgniteUI
        // dep (lit, file-saver, …) left unassigned gets hosted inside the
        // first *sample* chunk that imports it, so unrelated pages
        // evaluate that sample's module body — its defineAllComponents()
        // and theme CSS included (the bootstrap-instead-of-material bug).
        const dep = file.match(/\/node_modules\/((?:@[^/]+\/)?[^/]+)\//);
        return dep ? `vendor/${dep[1].replace('/', '--')}` : null;
      },
    },
    {
      // One chunk per sample, so the bundler doesn't try to inline all 700+
      // samples into a single bundle (causes OOM). Unlike the vendor group it
      // captures dependencies (Rolldown's default), which is what pulls each
      // sample's local files (data sources, helpers) into its chunk.
      test: SAMPLE_ENTRY_RE,
      priority: 1,
      name(id) {
        const match = id.match(SAMPLE_ENTRY_RE);
        return match && `samples/${match[1].replace(/[\\/]/g, '--')}`;
      },
    },
  ];

  return {
    name: 'sample-chunking',
    apply: 'build',
    configEnvironment(name, config) {
      if (name !== 'client') return;
      // Set the options rather than return them: Vite runs this hook on every
      // config pass and merges a returned config by concatenating arrays, so
      // each pass would add another copy of the groups.
      const rolldownOptions = ((config.build ??= {}).rolldownOptions ??= {});
      rolldownOptions.preserveEntrySignatures = 'allow-extension';
      rolldownOptions.output = { ...rolldownOptions.output, codeSplitting: { groups } };
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

  // Keep every stylesheet as an emitted file.  With the default 'auto',
  // Astro inlines small CSS assets into page HTML and deletes the files,
  // but the sample chunks' __vite__mapDeps still preload them at runtime
  // → "Unable to preload CSS" on every sample page.
  build: {
    inlineStylesheets: 'never',
  },

  vite: {
    plugins: [
      resolveIgniteUiScoped(),
      stripSampleInstantiation(),
      inlineSampleCss(),
      sampleChunking(),
    ],
    // samples/ and node_modules/ are already at the repo root (__dirname),
    // so no extra fs.allow entries are needed.
    server: {
      fs: {
        allow: [path.resolve(__dirname)],
      },
    },

    // Workaround for a Vite 8 bug (https://github.com/vitejs/vite/issues/23096):
    // in a server environment — Astro prerenders pages in one — the CSS
    // `@import` resolver externalizes bare package specifiers, so the tailwind
    // samples' `@import "tailwindcss";` resolves to <root>/tailwindcss and the
    // build fails with ENOENT. Nothing imports tailwindcss from JS, so never
    // externalizing it is harmless. Remove once the upstream fix ships.
    resolve: {
      noExternal: ['tailwindcss'],
    },

    // Dep optimisation:
    // noDiscovery stops the dependency scanner from crawling any source files
    // (including [..slug].astro whose client script globs sample TS files that
    // have CSS side-effect imports — causing "Expected ';'" crashes).
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
    // Resolve bare @use specifiers such as 'igniteui-theming/sass/...' from
    // node_modules. `loadPaths` can't: Vite 8's own Sass importer runs first
    // and throws on subpaths `exports` doesn't cover, and igniteui-theming's
    // "./sass/**/*.*" key covers none (a pattern may hold only one `*`).
    // Custom importers run before Vite's. Remove once that key is fixed.
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          importers: [
            {
              findFileUrl(url) {
                // Bare package specifiers only; relative and scheme URLs pass.
                if (!/^[\w@]/.test(url) || url.includes(':')) return null;
                return pathToFileURL(path.join(__dirname, 'node_modules', url));
              },
            },
          ],
        },
      },
    },

    build: {
      chunkSizeWarningLimit: 16000,
      sourcemap: process.env.NODE_ENV !== 'production',
      cssCodeSplit: true,
      // Chunk layout lives in the sampleChunking() plugin above.
    },
  },
});
