import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  projectRoot: path.resolve(__dirname, "../.."),
  get samples() {
    return path.join(this.projectRoot, "samples");
  },
  get target() {
    return path.join(__dirname, "..", "src", "samples");
  },
  get metadata() {
    return path.join(__dirname, "..", "src", "samples-metadata.json");
  },
};

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    })
  );
}

async function cleanDirectory(dir) {
  if (existsSync(dir)) {
    await fs.rm(dir, { recursive: true, force: true });
  }
  await fs.mkdir(dir, { recursive: true });
}

async function readJsonFile(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function extractHtmlContent(htmlFilePath) {
  try {
    const htmlContent = await fs.readFile(htmlFilePath, "utf-8");

    const rootStartMatch = htmlContent.match(/<div id="root">/i);
    if (!rootStartMatch) return "";

    const startIndex = rootStartMatch.index + rootStartMatch[0].length;
    const bodyEndIndex = htmlContent.indexOf("</body>", startIndex);
    if (bodyEndIndex === -1) return "";

    const beforeBody = htmlContent.substring(startIndex, bodyEndIndex);
    const lastDivIndex = beforeBody.lastIndexOf("</div>");
    if (lastDivIndex === -1) return "";

    return beforeBody.substring(0, lastDivIndex).trim();
  } catch {
    console.warn(`Could not extract HTML content from ${htmlFilePath}`);
    return "";
  }
}

async function findSamples(dir, basePath = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory());

  const nestedSamples = await Promise.all(
    directories.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      const packageJsonPath = path.join(fullPath, "package.json");

      // If package.json exists, this is a sample directory
      if (existsSync(packageJsonPath)) {
        return [
          {
            name: entry.name,
            path: fullPath,
            relativePath,
          },
        ];
      }

      // Otherwise, recurse into subdirectory
      return findSamples(fullPath, relativePath);
    })
  );

  return nestedSamples.flat();
}

async function processSample(sample) {
  const srcPath = path.join(sample.path, "src");

  if (!existsSync(srcPath)) {
    return null;
  }

  const targetPath = path.join(PATHS.target, sample.relativePath);

  // Copy sample source files
  await copyDirectory(srcPath, targetPath);

  // Build metadata
  try {
    const packageJsonPath = path.join(sample.path, "package.json");
    const htmlFilePath = path.join(sample.path, "index.html");

    const [packageJson, htmlContent] = await Promise.all([
      readJsonFile(packageJsonPath),
      extractHtmlContent(htmlFilePath),
    ]);

    return {
      name: sample.name,
      path: sample.relativePath,
      description: packageJson.description || sample.name,
      htmlContent,
    };
  } catch {
    console.warn(`Warning: Could not read package.json for ${sample.name}`);
    return null;
  }
}

async function main() {
  console.log("Cleaning samples directory...");
  await cleanDirectory(PATHS.target);

  console.log("Finding samples...");
  const samples = await findSamples(PATHS.samples);
  console.log(`Found ${samples.length} samples`);

  console.log("Copying samples...");
  const results = await Promise.all(samples.map(processSample));

  // Filter out null results (samples without src directories or failed reads)
  const sampleMetadata = results.filter(Boolean);

  await writeJsonFile(PATHS.metadata, sampleMetadata);

  console.log(`Copied ${sampleMetadata.length} samples to ${PATHS.target}`);
  console.log("Sample metadata written to:", PATHS.metadata);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
