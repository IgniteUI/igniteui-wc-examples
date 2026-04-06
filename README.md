
<div style="display: flex; flex-flow: row; font-family: 'Titillium Web'">
    <img style="border-radius: 0.25rem" alt="ignite-ui" src="https://dl.infragistics.com/x/img/browsers/ig-banner.png" />
</div>

# Examples of Ignite UI for Web Components

[![Node.js CI](https://github.com/IgniteUI/igniteui-wc-examples/actions/workflows/node.js.yml/badge.svg)](https://github.com/IgniteUI/igniteui-wc-examples/actions/workflows/node.js.yml)

This repository contains over 300 examples on how to use [Ignite UI for Web Components](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/general-getting-started.html):

- Charts:
[Area](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/area-chart),
[Bar](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/bar-chart),
[Column](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/column-chart),
[Composite](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/composite-chart),
[Donut](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/donut-chart),
[Financial/Stock](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/stock-chart),
[Line](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/line-chart),
[Pie](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/pie-chart),
[Polar](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/polar-chart),
[Radial](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/radial-chart),
[Scatter](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/scatter-chart),
[Shape](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/shape-chart),
[Sparkline](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/sparkline-chart),
[Stacked](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/stacked-chart),
[Step](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/step-chart),
- Maps:
[Geographic Map](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/geo-map.html),
[Treemap](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/charts/types/treemap-chart.html),
- Gauges:
[Bullet Graph](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/bullet-graph),
[Linear Gauge](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/linear-gauge.html),
[Radial Gauges](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/radial-gauge.html)
- Grids:
[Table / Grid](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/grids/data-grid.html),
[Excel Spreadsheet](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/spreadsheet_overview.html),
[Excel Library](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/excel_library_using_workbooks.html)
- Other:
[Dock Manager](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/layouts/dock-manager),
[Date Picker](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/editors/date-picker),
[Multi-Column Combobox](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/editors/multi-column-combobox)


## Branches

> **_NOTE:_** Use the [master](https://github.com/IgniteUI/igniteui-wc-examples/tree/master) branch to run samples locally. Use the [vnext](https://github.com/IgniteUI/igniteui-wc-examples/tree/vnext) branch only when contributing new samples.

## Preview

You can preview and browse all samples by opening our [Web Components Browser](https://www.infragistics.com/webcomponents-demos/samples/index). Alternatively, view samples with detailed documentation in the [Web Components Documentation](https://infragistics.com/webcomponentssite/components/general-getting-started.html).

In addition, you can run each sample project individually from the [./samples](./samples) folder or you can run project containing all samples `npm run dev` to browse all samples in one website (see instructions below). You can run each sample on Code Sandbox website by clicking on the **Edit Sandbox** button in a readme file of sample project, e.g.

[./samples/charts/category-chart/overview/README.md](./samples/charts/category-chart/overview/README.md)


## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/IgniteUI/igniteui-wc-examples.git
cd igniteui-wc-examples
git checkout master
npm install
```

## Running All Samples (Dev Server)

Start the Astro development server:

```bash
npm run dev
```

Open [http://localhost:4200](http://localhost:4200) in your browser. You will see a navigation sidebar listing all samples. The dev server compiles samples on demand — no full build required.

## Building for Production

```bash
npm run build
```

This runs two steps automatically:
1. **`prebuild`** — generates `public/assets/code-viewer/**/*.json` files used by the docs site to display sample source code tabs
2. **`astro build`** — compiles all ~900+ samples into static HTML + JS in `dist/`

To preview the production build locally:

```bash
npm run preview
```

Opens [http://localhost:4200](http://localhost:4200) serving the `dist/` output exactly as it would be deployed.

## Adding a New Sample

1. Create a new branch from `vnext`

2. Copy an existing sample folder as a starting point, e.g.:
```
./samples/charts/category-chart/axis-options/  →  ./samples/charts/category-chart/axis-types/
```

3. The folder structure must be exactly **`samples/{group}/{component}/{name}/`** with:
   - `index.html` — sample markup (only the content inside `<body>`, wrapped in `<div id="root">`)
   - `src/index.ts` — sample TypeScript entry point, exporting a class (e.g. `export class Sample { ... }`)
   - `package.json` — with `"main": "src/index.ts"` (used by Astro to discover the sample)

4. Implement your sample in `src/index.ts`. Export the class but **do not** instantiate it at the module level — the browser app calls `new Sample()` automatically when the page loads.

5. Start the dev server and verify:
```bash
npm run dev
```
   - The new sample appears in the navigation sidebar
   - It loads without errors in the browser console

6. Regenerate the code-viewer JSON files:
```bash
npm run generate:code-viewer
```

7. Commit, push, and open a pull request targeting `vnext`. Include a screenshot of the running sample.

## Updating Ignite UI Package Versions

Do **not** manually edit version strings in `package.json` files.

- Open [./scripts/update-ig.js](./scripts/update-ig.js)
- Update the version in the `packageUpgrades` array
- Run from the repo root:
```bash
npm run update:ig
npm install
```
- Create and merge a pull request with the updated `package.json` files

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Astro dev server on port 4200 |
| `npm run build` | Generate code-viewer JSONs then build static site to `dist/` |
| `npm run preview` | Serve the `dist/` production build on port 4200 |
| `npm run generate:code-viewer` | Regenerate `public/assets/code-viewer/**/*.json` |
| `npm run update:ig` | Update Ignite UI package versions across all sample `package.json` files |
| `npm run check` | Run Astro TypeScript type-checking |

## Learn More

To learn more about **Ignite UI for Web Components**, check out the [Web Components documentation](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/general-getting-started.html).
- run `npm install --legacy-peer-deps`
- create a pull request with your changes
- open the [igniteui-xplat-examples](https://github.com/IgniteUI/igniteui-xplat-examples) repo in VS Code
- update the version of **Ignite UI for WebComponent** packages in the [WC template](https://github.com/IgniteUI/igniteui-xplat-examples/blob/23.2.x/editor-templates/WebComponents/main-template/package.json)
- create a pull request with your changes in the [igniteui-xplat-examples](https://github.com/IgniteUI/igniteui-xplat-examples) repo