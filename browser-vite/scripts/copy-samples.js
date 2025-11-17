import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../..');
const samplesDir = path.join(projectRoot, 'samples');
const targetDir = path.join(__dirname, '..', 'src', 'samples');

// Function to recursively copy directory
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Extract HTML content from body div#root
function extractHtmlContent(htmlFilePath) {
  try {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    
    // Extract content between <div id="root"> and </div> before </body>
    const rootStartMatch = htmlContent.match(/<div id="root">/i);
    
    if (!rootStartMatch) {
      return '';
    }
    
    const startIndex = rootStartMatch.index + rootStartMatch[0].length;
    const bodyEndIndex = htmlContent.indexOf('</body>', startIndex);
    
    if (bodyEndIndex === -1) {
      return '';
    }
    
    // Find the last </div> before </body>
    const beforeBody = htmlContent.substring(startIndex, bodyEndIndex);
    const lastDivIndex = beforeBody.lastIndexOf('</div>');
    
    if (lastDivIndex === -1) {
      return '';
    }
    
    return beforeBody.substring(0, lastDivIndex).trim();
  } catch (e) {
    console.warn(`Could not extract HTML content from ${htmlFilePath}`);
    return '';
  }
}

// Function to find all samples
function findSamples(dir, basePath = '') {
  const samples = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    // Check if this directory contains a package.json (indicating it's a sample)
    const packageJsonPath = path.join(fullPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      samples.push({
        name: entry.name,
        path: fullPath,
        relativePath: relativePath
      });
    } else {
      // Recurse into subdirectories
      samples.push(...findSamples(fullPath, relativePath));
    }
  }

  return samples;
}

// Clean target directory
console.log('Cleaning samples directory...');
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// Find all samples
console.log('Finding samples...');
const samples = findSamples(samplesDir);
console.log(`Found ${samples.length} samples`);

// Copy samples
console.log('Copying samples...');
let copiedCount = 0;
const sampleMetadata = [];

for (const sample of samples) {
  const targetPath = path.join(targetDir, sample.relativePath);
  const srcPath = path.join(sample.path, 'src');
  
  // Copy only the src directory content
  if (fs.existsSync(srcPath)) {
    copyDirectory(srcPath, targetPath);
    copiedCount++;
    
    // Read package.json for metadata
    const packageJsonPath = path.join(sample.path, 'package.json');
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      // Extract HTML content from index.html
      const htmlFilePath = path.join(sample.path, 'index.html');
      const htmlContent = extractHtmlContent(htmlFilePath);
      
      sampleMetadata.push({
        name: sample.name,
        path: sample.relativePath,
        description: packageJson.description || sample.name,
        htmlContent: htmlContent
      });
    } catch (e) {
      console.warn(`Warning: Could not read package.json for ${sample.name}`);
    }
  }
}

// Generate samples metadata file
const metadataPath = path.join(__dirname, '..', 'src', 'samples-metadata.json');
fs.writeFileSync(metadataPath, JSON.stringify(sampleMetadata, null, 2));

console.log(`Copied ${copiedCount} samples to ${targetDir}`);
console.log('Sample metadata written to:', metadataPath);

