import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import Content from "./pre-defined-content.js";

const PLACEHOLDER_FILES = new Map(
  Object.entries({
    "index.html": Content.INDEX_HTML_CONTENT,
    "src/index.ts": Content.TYPESCRIPT_INDEX_CONTENT,
    "src/index.css": Content.CSS_INDEX_CONTENT,
    "tsconfig.json": Content.TSCONFIG_CONTENT,
    ".prettierrc": Content.PRETTIER_CONFIG_CONTENT,
    "package.json": Content.PACKAGE_JSON_CONTENT,
  }),
);

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("Usage: node scripts/add-sample.js <sample-name>");
    console.error("node scripts/add-sample.js inputs/input/some-new-sample");
    process.exit(1);
  }
  return args[0];
}

/**
 * Get the absolute path to the sample directory based on the sample name.
 * @param {string} sampleName - The name of the sample.
 * @returns {string} The absolute path to the sample directory.
 */
function getSamplePath(sampleName) {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const samplePath = path.join(__dirname, "..", "samples", sampleName);
  return samplePath;
}

/**
 * Create placeholder files in the specified sample directory.
 * @param {string} samplePath - The absolute path to the sample directory.
 * @returns {Promise<void>} A promise that resolves when all files are created.
 */
async function createPlaceholderFiles(samplePath) {
  await Promise.all(
    Array.from(PLACEHOLDER_FILES.entries()).map(async ([filePath, content]) => {
      const fullPath = path.join(samplePath, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content.trimStart());
    }),
  );
}

async function main() {
  const sampleName = parseArgs();
  const samplePath = getSamplePath(sampleName);

  try {
    await fs.access(samplePath);
    console.log(`Sample "${sampleName}" already exists at ${samplePath}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(samplePath, { recursive: true });
      console.log(`Created new sample directory at ${samplePath}`);
      await createPlaceholderFiles(samplePath);
    } else {
      console.error(`Error accessing sample directory: ${err.message}`);
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error(`Unexpected error: ${err.message}`);
  process.exit(1);
});
