# Vite-Based Samples Browser

This is a Vite-powered samples browser for Ignite UI Web Components. It provides a fast development experience with hot module replacement (HMR) and efficient builds.

## Features

- **Fast Development**: Powered by Vite for instant server start and lightning-fast HMR
- **Sample Navigation**: Browse samples organized by component groups and categories
- **Standalone Sample View**: Each sample can be accessed via a direct URL
- **Simple Copy Process**: No complex build tools - samples are copied from the `/samples` folder using a simple Node.js script

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
cd browser-vite
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

This will:
1. Copy samples from the `/samples` folder
2. Start the Vite development server
3. Open the browser at `http://localhost:3000`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How It Works

### Sample Copying

The `scripts/copy-samples.js` script:
1. Scans the `/samples` directory for all sample folders (identified by `package.json`)
2. Copies the `src` directory from each sample to `browser-vite/src/samples`
3. Generates a `samples-metadata.json` file with sample information

### Routing

The browser supports two routing modes:

1. **Browser View**: Access samples with navigation sidebar at `http://localhost:3000/`
2. **Standalone Sample View**: Access individual samples directly at `http://localhost:3000/{group}/{category}/{sample-name}`

Examples:
- `http://localhost:3000/grids/tree-grid/custom-filtering`
- `http://localhost:3000/charts/category-chart/overview`

### Structure

```
browser-vite/
├── scripts/
│   └── copy-samples.js      # Simple script to copy samples
├── src/
│   ├── main.ts              # Main application entry point
│   ├── samples/             # Copied samples (generated)
│   └── samples-metadata.json # Sample metadata (generated)
├── public/                  # Static assets
├── index.html               # Main HTML file
├── vite.config.js           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Sample Requirements

Samples are expected to have minimal changes from their original structure:
- Each sample must have a `src` directory with TypeScript files
- The main entry point should be `src/index.ts`
- Samples should be self-contained (all dependencies imported)

## Development Notes

- The copy script runs automatically before `dev` and `build` commands
- To manually copy samples: `npm run copy-samples`
- Samples are copied as-is from the `/samples` folder
- HMR works for the browser UI, but sample changes require re-running the copy script
