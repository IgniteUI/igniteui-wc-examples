#!/usr/bin/env node
/**
 * scripts/update-ig.js
 *
 * Standalone replacement for the `gulp updateIG` task that used to live in
 * browser/tasks/gulp-samples.js.
 *
 * What it does
 * ─────────────
 *  1. Updates the root package.json and the sample template
 *     (scripts/sample-template/package.json) so that the IgniteUI (and
 *     related) packages use the versions defined in the `packageUpgrades`
 *     array below. Samples have no package.json of their own: the
 *     code-viewer generator builds one per sample from these two files.
 *  2. Sorts each file's `dependencies` and `devDependencies` keys
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

import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

// Package version targets
//
// Change any version here and re-run `npm run update:ig` — the root
// package.json and the sample template will be updated automatically.
//
// To target a ProGet (internal) feed instead of public npm, prefix the name:
//   { version: "7.0.0", name: "@infragistics/igniteui-webcomponents-core" }

const packageUpgrades = [
  // IgniteUI packages — frequently updated
  { name: "igniteui-webcomponents-core", version: "7.1.0" },
  { name: "igniteui-webcomponents-charts", version: "7.1.0" },
  { name: "igniteui-webcomponents-excel", version: "7.1.0" },
  { name: "igniteui-webcomponents-gauges", version: "7.1.0" },
  { name: "igniteui-webcomponents-data-grids", version: "7.1.0" },
  { name: "igniteui-webcomponents-inputs", version: "7.1.0" },
  { name: "igniteui-webcomponents-layouts", version: "7.1.0" },
  { name: "igniteui-webcomponents-maps", version: "7.1.0" },
  {
    name: "igniteui-webcomponents-spreadsheet-chart-adapter",
    version: "7.1.0",
  },
  { name: "igniteui-webcomponents-spreadsheet", version: "7.1.0" },
  { name: "igniteui-webcomponents-datasources", version: "7.1.0" },
  { name: "igniteui-webcomponents-dashboards", version: "7.1.0" },
  // IgniteUI packages — occasionally updated
  { name: "igniteui-i18n-resources", version: "^2.0.0" },
  { name: "igniteui-theming", version: "^30.2.0" },
  { name: "igniteui-grid-lite", version: "~0.12.0" },
  { name: "igniteui-webcomponents-grids", version: "^7.4.0" },
  { name: "igniteui-webcomponents", version: "7.5.0" },
  { name: "igniteui-dockmanager", version: "~2.3.0" },
  // Other packages kept in sync across sample package.json files
  { name: "webpack", version: "^5.101.3" },
  { name: "webpack-cli", version: "^6.0.1" },
  { name: "webpack-dev-server", version: "^5.2.2" },
  { name: "lit", version: "^3.3.0" },
  { name: "lit-html", version: "^3.3.1" },
];

// Helpers

function sortByKeys(obj) {
  if (!obj || typeof obj !== "object") return obj;
  return Object.fromEntries(
    Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)),
  );
}

// Main

async function run() {
  // Step 1: build package name → upgrade mapping
  // Strip @infragistics/ prefix so we match both public npm and ProGet names
  const mappings = {};
  for (const item of packageUpgrades) {
    const id = item.name.replace("@infragistics/", "");
    mappings[id] = item;
  }

  // Step 2: update package.json files
  const targets = [
    path.join(REPO_ROOT, "package.json"),
    path.join(REPO_ROOT, "scripts", "sample-template", "package.json"),
  ];

  console.log(`Processing ${targets.length} package.json file(s)...`);
  let updatedCount = 0;

  await Promise.all(
    targets.map(async (filePath) => {
      let original;
      try {
        original = await fsp.readFile(filePath, "utf8");
      } catch {
        console.warn(
          `  SKIP (unreadable): ${path.relative(REPO_ROOT, filePath)}`,
        );
        return;
      }

      let pkg;
      try {
        pkg = JSON.parse(original);
      } catch {
        console.warn(
          `  SKIP (invalid JSON): ${path.relative(REPO_ROOT, filePath)}`,
        );
        return;
      }

      let changed = false;

      for (const section of [
        "dependencies",
        "devDependencies",
        "peerDependencies",
      ]) {
        if (!pkg[section]) continue;
        for (const [pkgName, currentVersion] of Object.entries(pkg[section])) {
          const id = pkgName.replace("@infragistics/", "");
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
        await fsp.writeFile(filePath, JSON.stringify(pkg, null, 2) + "\n");
        updatedCount++;
        console.log(`  updated: ${path.relative(REPO_ROOT, filePath)}`);
      }
    }),
  );

  console.log(
    `\nDone. Updated ${updatedCount} of ${targets.length} package.json file(s).`,
  );
}

run();
