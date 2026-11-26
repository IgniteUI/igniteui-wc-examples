
<div style="display: flex; flex-flow: row; font-family: 'Titillium Web'">
    <img style="border-radius: 0.25rem" alt="ignite-ui" src="https://dl.infragistics.com/x/img/browsers/ig-banner.png"/>
</div>

# Individual Samples of Web Components

In this folder, you will find individual **samples** on how to use the [IgniteUI for Web Components](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/general-getting-started.html)

- [Bullet Graph, Linear Gauge, Radial Gauges](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/radial-gauge.html)
- [Data Chart, Category Chart, Financial Chart, Pie Chart](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/data-chart.html)
- [Data Grid / Data Table](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/data-grid.html)
- [Geographic Map](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/geo-map.html)
- [Treemap](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/treemap-overview.html)
- [Excel Spreadsheet](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/spreadsheet_overview.html)
- [Excel Library](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/excel_library_using_workbooks.html)
- and many more

## Branches

> **_NOTE:_** You should use [master](https://github.com/IgniteUI/igniteui-wc-examples/tree/master) branch of this repository if you want to run samples on your computer. Use the [vnext](https://github.com/IgniteUI/igniteui-wc-examples/tree/vnext) branch only when you want to contribute new samples to this repository.

## Sample structure

Each sample folder, `samples/{group}/{component}/{name}/`, holds only the sample's own files:

- `index.html`: the sample markup
- `src/index.ts`: the sample code
- `src/index.css`, plus any data or helper files the sample imports

The project files (`package.json`, `tsconfig.json`, `webpack.config.js`) are not stored per sample. They come from
[../scripts/sample-template/](../scripts/sample-template/) when `npm run generate:code-viewer` builds the files that the
documentation opens in StackBlitz.

To run the samples locally, run `npm install` and `npm run dev` from the repository root. See the
[root README](../README.md) for details.
