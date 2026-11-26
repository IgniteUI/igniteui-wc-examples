#!/usr/bin/env node
/**
 * scripts/generate-code-viewer.js
 *
 * Generates one JSON file per sample for the code viewer embedded in the
 * documentation site. The docs widget shows the sample's main files as code
 * tabs and opens the whole file list in StackBlitz with `sdk.openProject()`,
 * so every JSON must describe a complete, runnable project.
 *
 * Sample folders hold only the sample's own files (index.html, src/, and the
 * Tailwind samples' postcss/tailwind configs). The project boilerplate comes
 * from scripts/sample-template/ and is added here:
 *
 *   tsconfig.json      copied from the template
 *   webpack.config.js  copied from the template
 *   package.json       the template, plus the packages the sample imports
 *                      (and their Ignite UI peers), with versions taken from
 *                      the root package.json
 *
 * Output location
 * ───────────────
 *   public/assets/code-viewer/{group}/{component}/{name}.json
 *   → <base>/assets/code-viewer/grids/grid/overview.json
 *
 * The output schema is unchanged, so the docs widget needs no change.
 *
 * Usage
 * ─────
 *   npm run generate:code-viewer   (also runs as part of `npm run build`)
 */

import fs   from 'node:fs';
import fsp  from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const REPO_ROOT  = path.resolve(__dirname, '..');

// Configuration

const SAMPLES_ROOT  = path.join(REPO_ROOT, 'samples');
const OUTPUT_ROOT   = path.join(REPO_ROOT, 'public', 'assets', 'code-viewer');
const TEMPLATE_DIR  = path.join(__dirname, 'sample-template');

// File extensions that are included in the code-viewer JSON
const INCLUDE_EXTS  = new Set(['.ts', '.css', '.html', '.json']);

// Files to always skip
const SKIP_FILES    = new Set(['typedecls.d.ts', 'package-lock.json']);

// Sample-specific build configs, kept in the sample folder and passed through as-is.
const SAMPLE_CONFIG_FILES = ['postcss.config.mjs', 'tailwind.config.cjs'];

// Packages a Tailwind sample (one with postcss.config.mjs) needs at build time.
const TAILWIND_DEV_DEPS = ['@tailwindcss/postcss', 'postcss', 'tailwindcss'];

// Entry points that need a package's optional peers, which the peer walk skips.
const SUBPATH_PEERS = {
  'igniteui-webcomponents/extras': ['dompurify', 'marked', 'marked-shiki', 'shiki'],
};

// Licensed builds install @infragistics/igniteui-*; docs always show the public names.
const LICENSED_PREFIX = '@infragistics/';

// Template and version catalog

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

const TEMPLATE_PKG      = readJson(path.join(TEMPLATE_DIR, 'package.json'));
const TEMPLATE_TSCONFIG = fs.readFileSync(path.join(TEMPLATE_DIR, 'tsconfig.json'), 'utf8');
const TEMPLATE_WEBPACK  = fs.readFileSync(path.join(TEMPLATE_DIR, 'webpack.config.js'), 'utf8');

const publicName = name => name.startsWith(LICENSED_PREFIX + 'igniteui') ? name.slice(LICENSED_PREFIX.length) : name;

/**
 * Package versions, by public name. The root package.json wins: it is what the
 * samples browser builds and is tested against, and `npm run update:ig` keeps
 * it current. The template covers packages the root does not list.
 */
const VERSIONS = (() => {
  const rootPkg = readJson(path.join(REPO_ROOT, 'package.json'));
  const versions = {};
  for (const deps of [TEMPLATE_PKG.dependencies, TEMPLATE_PKG.devDependencies, rootPkg.devDependencies, rootPkg.dependencies]) {
    for (const [name, version] of Object.entries(deps ?? {})) {
      versions[publicName(name)] = version;
    }
  }
  return versions;
})();

/** package.json of an installed package, public or licensed, or null. */
function installedPackage(name) {
  for (const candidate of [name, LICENSED_PREFIX + name]) {
    const file = path.join(REPO_ROOT, 'node_modules', candidate, 'package.json');
    if (fs.existsSync(file)) return readJson(file);
  }
  return null;
}

/** Version for a package: the catalog first, then what is installed. */
function versionOf(name, unknown) {
  if (VERSIONS[name]) return VERSIONS[name];
  const installed = installedPackage(name);
  if (installed?.version) return `^${installed.version}`;
  unknown.add(name);
  return '*';
}

// Dependency detection

// import x from 'pkg' / import 'pkg' / export … from 'pkg' / import('pkg') / require('pkg')
const IMPORT_RE = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)/g;
// @import "pkg/…" in CSS
const CSS_IMPORT_RE = /@import\s+(?:url\()?\s*['"]~?([^'"]+)['"]/g;

const packageOf = spec => spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
const isBare    = spec => !/^(\.|\/|[a-z]+:)/i.test(spec);

async function listFiles(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const nested  = await Promise.all(entries.map(e =>
    e.isDirectory() ? listFiles(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  return nested.flat();
}

/** Packages a sample's sources import. */
async function importedPackages(srcDir) {
  const packages = new Set();
  const files = (await listFiles(srcDir)).filter(f => /\.(ts|css|scss)$/.test(f));
  for (const file of files) {
    const text = await fsp.readFile(file, 'utf8');
    for (const re of [IMPORT_RE, CSS_IMPORT_RE]) {
      for (const match of text.matchAll(re)) {
        const spec = match.slice(1).find(Boolean);
        if (!spec || !isBare(spec)) continue;
        packages.add(publicName(packageOf(spec)));
        for (const peer of SUBPATH_PEERS[spec] ?? []) packages.add(peer);
      }
    }
  }
  return packages;
}

/** Add the Ignite UI peers (e.g. -core, -inputs, -layouts) that installed packages ask for. */
function addIgnitePeers(packages) {
  const queue = [...packages];
  while (queue.length) {
    const peers = installedPackage(queue.pop())?.peerDependencies ?? {};
    for (const peer of Object.keys(peers).map(publicName)) {
      if (peer.startsWith('igniteui-webcomponents') && !packages.has(peer)) {
        packages.add(peer);
        queue.push(peer);
      }
    }
  }
  return packages;
}

const sortKeys = obj => Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));

/** package.json for one sample: the template plus what the sample needs. */
async function samplePackageJson(folderPath, slug, unknown) {
  const [group, component, name] = slug.split('/');
  const deps    = { ...TEMPLATE_PKG.dependencies };
  const devDeps = { ...TEMPLATE_PKG.devDependencies };

  for (const pkg of addIgnitePeers(await importedPackages(path.join(folderPath, 'src')))) {
    if (!(pkg in deps) && !(pkg in devDeps)) deps[pkg] = versionOf(pkg, unknown);
    // Typings the samples browser uses for this package, e.g. @types/file-saver.
    if (VERSIONS[`@types/${pkg}`]) devDeps[`@types/${pkg}`] = VERSIONS[`@types/${pkg}`];
  }
  if (fs.existsSync(path.join(folderPath, 'postcss.config.mjs'))) {
    for (const pkg of TAILWIND_DEV_DEPS) {
      if (!(pkg in deps)) devDeps[pkg] = versionOf(pkg, unknown);
    }
  }

  return {
    ...TEMPLATE_PKG,
    name: `wc-${group}-${component}-${name}`,
    dependencies: sortKeys(deps),
    devDependencies: sortKeys(devDeps),
  };
}

// Code-viewer entries

async function fileExists(p) {
  try { await fsp.access(p); return true; } catch { return false; }
}

function entry(filePath, content, ext, header, isMain) {
  return { path: filePath, content, fileExtension: ext, fileHeader: header, isMain, hasRelativeAssetsUrls: false };
}

/** The fileHeader label, shown as the tab title in the code viewer. */
function getFileHeader(filePath, ext) {
  if (ext === 'css')  return 'css';
  if (ext === 'html') return 'html';
  if (path.basename(filePath) === 'index.ts') return 'ts';
  // Data/utility files get a "DATA" header
  return 'DATA';
}

/**
 * Collect all files to include for one sample folder, in code-viewer order:
 * src/index.ts, src/ stylesheets, index.html, data files, then the project files.
 */
async function collectSampleFiles(folderPath, slug, unknown) {
  const srcDir = path.join(folderPath, 'src');
  const items  = [];

  // 1. Main TypeScript file (always first)
  items.push(entry('src/index.ts', await fsp.readFile(path.join(srcDir, 'index.ts'), 'utf8'), 'ts', 'ts', true));

  const srcFiles = (await fsp.readdir(srcDir))
    .filter(f => f !== 'index.ts' && !SKIP_FILES.has(f) && INCLUDE_EXTS.has(path.extname(f).toLowerCase()))
    .sort();

  const dataFileItems = [];
  for (const file of srcFiles) {
    let content;
    try {
      content = await fsp.readFile(path.join(srcDir, file), 'utf8');
    } catch {
      continue; // a directory, or unreadable
    }
    const ext     = path.extname(file).slice(1).toLowerCase();
    const relPath = `src/${file}`;
    const header  = getFileHeader(relPath, ext);
    const item    = entry(relPath, content, ext, header, ext === 'css' || ext === 'ts');
    (header === 'DATA' ? dataFileItems : items).push(item);
  }

  // 2. index.html
  const htmlPath = path.join(folderPath, 'index.html');
  if (await fileExists(htmlPath)) {
    items.push(entry('index.html', await fsp.readFile(htmlPath, 'utf8'), 'html', 'html', true));
  }

  // 3. Data files, each under its own name so the imports in index.ts still resolve.
  items.push(...dataFileItems);

  // 4. Project files, so StackBlitz sdk.openProject() gets a complete runnable project.
  const pkg = await samplePackageJson(folderPath, slug, unknown);
  items.push(entry('tsconfig.json', TEMPLATE_TSCONFIG, 'json', 'json', false));
  items.push(entry('webpack.config.js', TEMPLATE_WEBPACK, 'js', 'js', false));
  items.push(entry('package.json', JSON.stringify(pkg, null, 2) + '\n', 'json', 'json', false));

  for (const file of SAMPLE_CONFIG_FILES) {
    const configPath = path.join(folderPath, file);
    if (await fileExists(configPath)) {
      items.push(entry(file, await fsp.readFile(configPath, 'utf8'), 'js', 'js', false));
    }
  }

  return items;
}

// Main

/** Every samples/{group}/{component}/{name}/ folder with a src/index.ts. */
async function findSamples() {
  const dirs = async dir => (await fsp.readdir(dir, { withFileTypes: true }))
    .filter(e => e.isDirectory() && e.name !== 'node_modules')
    .map(e => e.name)
    .sort();

  const samples = [];
  for (const group of await dirs(SAMPLES_ROOT)) {
    for (const component of await dirs(path.join(SAMPLES_ROOT, group))) {
      for (const name of await dirs(path.join(SAMPLES_ROOT, group, component))) {
        const folderPath = path.join(SAMPLES_ROOT, group, component, name);
        if (fs.existsSync(path.join(folderPath, 'src', 'index.ts'))) {
          samples.push({ slug: `${group}/${component}/${name}`, folderPath });
        }
      }
    }
  }
  return samples;
}

async function run() {
  await fsp.rm(OUTPUT_ROOT, { recursive: true, force: true });
  await fsp.mkdir(OUTPUT_ROOT, { recursive: true });

  const samples  = await findSamples();
  const unknowns = new Map(); // package → slugs that import it with no known version
  let errors = 0;

  await Promise.all(samples.map(async ({ slug, folderPath }) => {
    const unknown = new Set();
    try {
      const sampleFiles = await collectSampleFiles(folderPath, slug, unknown);
      const outputFile  = path.join(OUTPUT_ROOT, `${slug}.json`);
      await fsp.mkdir(path.dirname(outputFile), { recursive: true });
      await fsp.writeFile(outputFile, JSON.stringify({ sampleFiles }, null, ' '));
    } catch (err) {
      errors++;
      console.error(`  ERR   ${slug}`, err.message);
    }
    for (const pkg of unknown) unknowns.set(pkg, [...(unknowns.get(pkg) ?? []), slug]);
  }));

  for (const [pkg, slugs] of unknowns) {
    console.warn(`  WARN  no version for "${pkg}" (add it to scripts/sample-template/package.json): ${slugs.join(', ')}`);
  }

  console.log(`\nDone — generated ${samples.length - errors} code-viewer JSON files → ${path.relative(REPO_ROOT, OUTPUT_ROOT)}`);
  if (errors > 0) {
    console.error(`       ${errors} error(s) encountered.`);
    process.exit(1);
  }
}

run();
