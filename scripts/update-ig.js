#!/usr/bin/env node
/**
 * scripts/update-ig.js
 *
 * Standalone replacement for the `gulp updateIG` task that used to live in
 * browser/tasks/gulp-samples.js.
 *
 * What it does
 * ─────────────
 *  1. Removes all node_modules directories under samples/ (cleanup so
 *     npm install in each sample starts clean).
 *  2. Updates every package.json under samples/ AND the root package.json
 *     so that the IgniteUI (and related) packages use the versions defined
 *     in the `packageUpgrades` array below.
 *  3. Sorts each file's `dependencies` and `devDependencies` keys
 *     alphabetically, mirroring what the Gulp task did.
 *
 * Usage
 * ──────
 *   node scripts/update-ig.js          (from repo root)
 *   npm run update:ig
 *
 * To bump versions: edit the `packageUpgrades` array below, then run
 * `npm run update:ig`.
 */

import fsp  from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const REPO_ROOT  = path.resolve(__dirname, '..');

// Package version targets
//
// Change any version here and re-run `npm run update:ig` — every
// package.json in samples/ (and the root) will be updated automatically.
//
// To target a ProGet (internal) feed instead of public npm, prefix the name:
//   { version: "7.0.0", name: "@infragistics/igniteui-webcomponents-core" }

const packageUpgrades = [
    // IgniteUI packages — frequently updated
    { name: 'igniteui-webcomponents-core',                    version: '7.0.0'   },
    { name: 'igniteui-webcomponents-charts',                  version: '7.0.0'   },
    { name: 'igniteui-webcomponents-excel',                   version: '7.0.0'   },
    { name: 'igniteui-webcomponents-gauges',                  version: '7.0.0'   },
    { name: 'igniteui-webcomponents-data-grids',              version: '7.0.0'   },
    { name: 'igniteui-webcomponents-inputs',                  version: '7.0.0'   },
    { name: 'igniteui-webcomponents-layouts',                 version: '7.0.0'   },
    { name: 'igniteui-webcomponents-maps',                    version: '7.0.0'   },
    { name: 'igniteui-webcomponents-spreadsheet-chart-adapter', version: '7.0.0' },
    { name: 'igniteui-webcomponents-spreadsheet',             version: '7.0.0'   },
    { name: 'igniteui-webcomponents-datasources',             version: '7.0.0'   },
    { name: 'igniteui-webcomponents-dashboards',              version: '7.0.0'   },
    // IgniteUI packages — occasionally updated
    { name: 'igniteui-i18n-resources',                        version: '^1.0.2'  },
    { name: 'igniteui-grid-lite',                             version: '^0.6.0'  },
    { name: 'igniteui-webcomponents-grids',                   version: '^7.0.0'  },
    { name: 'igniteui-webcomponents',                         version: '^7.0.0'  },
    { name: 'igniteui-dockmanager',                           version: '^2.0.1'  },
    // Other packages kept in sync across sample package.json files
    { name: 'webpack',            version: '^5.101.3' },
    { name: 'webpack-cli',        version: '^6.0.1'   },
    { name: 'webpack-dev-server', version: '^5.2.2'   },
    { name: 'lit',                version: '^3.2.0'   },
    { name: 'lit-html',           version: '^3.3.1'   },
];

// Helpers

function sortByKeys(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

/** Recursively find all package.json files under dir, skipping node_modules */
async function findPackageJsonFiles(dir, results = []) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    await Promise.all(entries.map(async entry => {
        if (entry.name === 'node_modules') return;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await findPackageJsonFiles(full, results);
        } else if (entry.name === 'package.json') {
            results.push(full);
        }
    }));
    return results;
}

// Main

async function run() {
    // Step 1: clean sample node_modules
    console.log('Cleaning node_modules from samples/...');
    const samplesRoot = path.join(REPO_ROOT, 'samples');
    let cleanCount = 0;

    async function cleanNodeModules(dir) {
        const entries = await fsp.readdir(dir, { withFileTypes: true });
        await Promise.all(entries.map(async entry => {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === 'node_modules') {
                    await fsp.rm(full, { recursive: true, force: true });
                    cleanCount++;
                    console.log(`  removed: ${path.relative(REPO_ROOT, full)}`);
                } else {
                    await cleanNodeModules(full);
                }
            }
        }));
    }

    try {
        await fsp.access(samplesRoot);
        await cleanNodeModules(samplesRoot);
    } catch {
        // samplesRoot does not exist — nothing to clean
    }
    console.log(`Removed ${cleanCount} node_modules director${cleanCount === 1 ? 'y' : 'ies'}.\n`);

    // Step 2: build package name → upgrade mapping
    // Strip @infragistics/ prefix so we match both public npm and ProGet names
    const mappings = {};
    for (const item of packageUpgrades) {
        const id = item.name.replace('@infragistics/', '');
        mappings[id] = item;
    }

    // Step 3: update package.json files
    const targets = [
        path.join(REPO_ROOT, 'package.json'),
        ...await findPackageJsonFiles(samplesRoot),
    ];

    console.log(`Processing ${targets.length} package.json file(s)...`);
    let updatedCount = 0;

    await Promise.all(targets.map(async filePath => {
        let original;
        try {
            original = await fsp.readFile(filePath, 'utf8');
        } catch {
            console.warn(`  SKIP (unreadable): ${path.relative(REPO_ROOT, filePath)}`);
            return;
        }

        let pkg;
        try {
            pkg = JSON.parse(original);
        } catch {
            console.warn(`  SKIP (invalid JSON): ${path.relative(REPO_ROOT, filePath)}`);
            return;
        }

        let changed = false;

        for (const section of ['dependencies', 'devDependencies', 'peerDependencies']) {
            if (!pkg[section]) continue;
            for (const [pkgName, currentVersion] of Object.entries(pkg[section])) {
                const id = pkgName.replace('@infragistics/', '');
                const upgrade = mappings[id];
                if (upgrade && currentVersion !== upgrade.version) {
                    pkg[section][pkgName] = upgrade.version;
                    changed = true;
                }
            }
            // Sort keys alphabetically
            const sorted = sortByKeys(pkg[section]);
            if (JSON.stringify(sorted) !== JSON.stringify(pkg[section])) {
                pkg[section] = sorted;
                changed = true;
            }
        }

        if (changed) {
            await fsp.writeFile(filePath, JSON.stringify(pkg, null, 2) + '\n');
            updatedCount++;
            console.log(`  updated: ${path.relative(REPO_ROOT, filePath)}`);
        }
    }));

    console.log(`\nDone. Updated ${updatedCount} of ${targets.length} package.json file(s).`);
}

run();
