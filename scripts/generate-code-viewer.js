#!/usr/bin/env node
/**
 * scripts/generate-code-viewer.js
 *
 * Standalone Node.js script (no Gulp, no Astro) that generates one JSON file
 * per sample for the code-viewer widget embedded in the documentation site.
 *
 * It is a direct replacement for the updateCodeViewer() function that lives in
 * browser/tasks/gulp-samples.js.  The output schema is IDENTICAL so the
 * igniteui-docfx-template code-view widget continues to work without changes.
 *
 * Output location
 * ───────────────
 *   astro/public/assets/code-viewer/{group}/{component}/{name}.json
 *
 * This corresponds to the URL path:
 *   /assets/code-viewer/grids/grid/overview.json
 *
 * Which is what xplat-code-service.ts reads:
 *   samplesCodeBasePath = "/assets/code-viewer/"
 *
 * Usage
 * ─────
 *   node scripts/generate-code-viewer.js            (from repo root)
 *   npm run generate:code-viewer  (from astro/)      → calls this script
 *
 * The script must be run BEFORE `astro build` (or `astro dev`) so that
 * the JSON files end up in astro/public/ and are served as static assets.
 *
 * Alternatively, run it once after installing dependencies — the output
 * files are committed to source control and only need regenerating when
 * samples change.
 */

import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const REPO_ROOT  = path.resolve(__dirname, '..');

// ── Configuration ──────────────────────────────────────────────────────────

const SAMPLES_ROOT  = path.join(REPO_ROOT, 'samples');
const OUTPUT_ROOT   = path.join(REPO_ROOT, 'public', 'assets', 'code-viewer');

// File extensions that are included in the code-viewer JSON
const INCLUDE_EXTS  = new Set(['.ts', '.css', '.html', '.json']);

// Files to always skip
const SKIP_FILES    = new Set(['typedecls.d.ts', 'package-lock.json']);

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Determine the fileHeader label (shown as the tab title in the code viewer).
 * Mirrors the logic in updateCodeViewer() from gulp-samples.js.
 */
function getFileHeader(filePath, isMainTs, ext) {
  const basename = path.basename(filePath);
  if (isMainTs)              return 'ts';
  if (ext === 'css')         return 'css';
  if (ext === 'html')        return 'html';
  if (basename === 'index.ts')  return 'ts';
  // Data/utility files get a "DATA" header
  return 'DATA';
}

/**
 * Collect all files to include for one sample folder.
 * Returns { mainTs, cssFiles, htmlFiles, tsFiles, dataFiles }
 */
function collectSampleFiles(folderPath, group, component, name) {
  const srcDir = path.join(folderPath, 'src');

  const mainTsPath    = path.join(srcDir, 'index.ts');
  const htmlPath      = path.join(folderPath, 'index.html');
  const mainTsRelPath = `./samples/${group}/${component}/${name}/src/index.ts`;
  const htmlRelPath   = `./samples/${group}/${component}/${name}/index.html`;

  const items = [];

  // 1. Main TypeScript file (always first)
  if (fs.existsSync(mainTsPath)) {
    items.push({
      path:             mainTsRelPath,
      content:          fs.readFileSync(mainTsPath, 'utf8'),
      fileExtension:    'ts',
      fileHeader:       'ts',
      isMain:           true,
      hasRelativeAssetsUrls: false,
    });
  }

  if (!fs.existsSync(srcDir)) return items;

  const srcFiles = fs.readdirSync(srcDir)
    .filter(f => !SKIP_FILES.has(f))
    .sort();

  const dataFileItems = [];

  for (const file of srcFiles) {
    if (file === 'index.ts') continue; // already added above

    const ext     = path.extname(file).slice(1).toLowerCase();
    const filePath = path.join(srcDir, file);
    const relPath  = `./samples/${group}/${component}/${name}/src/${file}`;

    if (!INCLUDE_EXTS.has('.' + ext)) continue;
    if (!fs.statSync(filePath).isFile()) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const header  = getFileHeader(relPath, false, ext);
    const item    = {
      path:             relPath,
      content,
      fileExtension:    ext,
      fileHeader:       header,
      isMain:           ext === 'css' || ext === 'ts',
      hasRelativeAssetsUrls: false,
    };

    if (header === 'DATA') {
      dataFileItems.push(item);
    } else {
      items.push(item);
    }
  }

  // 2. index.html
  if (fs.existsSync(htmlPath)) {
    items.push({
      path:             htmlRelPath,
      content:          fs.readFileSync(htmlPath, 'utf8'),
      fileExtension:    'html',
      fileHeader:       'html',
      isMain:           true,
      hasRelativeAssetsUrls: false,
    });
  }

  // 3. Data files — combine multiple into one block, same as original Gulp code
  if (dataFileItems.length === 1) {
    items.push(dataFileItems[0]);
  } else if (dataFileItems.length > 1) {
    const dataFolder  = `./samples/${group}/${component}/${name}/src`;
    let combinedContent = '// NOTE this file contains multiple data sources:';
    for (let i = 0; i < dataFileItems.length; i++) {
      combinedContent += `\n\n// Data Source #${i + 1}\n`;
      combinedContent += dataFileItems[i].content + '\n';
    }
    items.push({
      path:             `${dataFolder}/DataSources.ts`,
      content:          combinedContent,
      fileExtension:    'ts',
      fileHeader:       'DATA',
      isMain:           false,
      hasRelativeAssetsUrls: false,
    });
  }

  return items;
}

// ── Main ───────────────────────────────────────────────────────────────────

function run() {
  // Clean output directory
  if (fs.existsSync(OUTPUT_ROOT)) {
    fs.rmSync(OUTPUT_ROOT, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

  let count = 0;
  let errors = 0;

  // Walk samples/{group}/{component}/{name}/
  const groups = fs.readdirSync(SAMPLES_ROOT)
    .filter(e => fs.statSync(path.join(SAMPLES_ROOT, e)).isDirectory())
    .sort();

  for (const group of groups) {
    const groupPath = path.join(SAMPLES_ROOT, group);
    const components = fs.readdirSync(groupPath)
      .filter(e => fs.statSync(path.join(groupPath, e)).isDirectory())
      .sort();

    for (const component of components) {
      const componentPath = path.join(groupPath, component);
      const names = fs.readdirSync(componentPath)
        .filter(e => fs.statSync(path.join(componentPath, e)).isDirectory())
        .sort();

      for (const name of names) {
        const folderPath = path.join(componentPath, name);
        const htmlPath   = path.join(folderPath, 'index.html');
        const pkgPath    = path.join(folderPath, 'package.json');

        // Skip non-sample dirs (e.g. node_modules)
        if (!fs.existsSync(htmlPath) || !fs.existsSync(pkgPath)) continue;

        try {
          const sampleFiles = collectSampleFiles(folderPath, group, component, name);

          if (sampleFiles.length === 0) {
            console.warn(`  SKIP  ${group}/${component}/${name}  (no files)`);
            continue;
          }

          const json        = { sampleFiles };
          const outputDir   = path.join(OUTPUT_ROOT, group, component);
          const outputFile  = path.join(outputDir, `${name}.json`);

          fs.mkdirSync(outputDir, { recursive: true });
          fs.writeFileSync(outputFile, JSON.stringify(json, null, ' '));

          count++;
          console.log(`  OK    ${group}/${component}/${name}  (${sampleFiles.length} files)`);
        } catch (err) {
          errors++;
          console.error(`  ERR   ${group}/${component}/${name}`, err.message);
        }
      }
    }
  }

  console.log(`\nDone — generated ${count} code-viewer JSON files → ${OUTPUT_ROOT}`);
  if (errors > 0) {
    console.error(`       ${errors} error(s) encountered.`);
    process.exit(1);
  }
}

run();
