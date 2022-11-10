
<div style="display: flex; flex-flow: row;">
<img height="70px" style="border-radius: 0.25rem" alt="ignite-ui" src="../browser/public/logo-ignite-ui.svg"/>
<!-- <div style="font-size: 2.5rem; align-self: start; justify-content: start; margin: 0px; margin-left: 0.5rem; margin-right: 0.5rem">FOR</div>
<img height="52px" style="border-radius: 0.25rem" alt="ignite-wc" src="../browser/public/wc.png"/>
<div style="font-size: 2.5rem; align-self: start; justify-content: start; margin: 0px; margin-left: 0.5rem; margin-right: 0.5rem">BROWSER</div> -->
</div>

# Browser App for Web Components

This browser application allows you to browse all samples of the [IgniteUI for Web Components](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/general-getting-started.html) in a single website.

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

# Instructions

Follow these instructions to run all samples locally in a browser application.

- open VS Code as Administrator

- open the [./browser](./browser) folder

- select **View** - **Terminal** menu item

- type `npm install --legacy-peer-deps` command in terminal window

This will install required packages and [Ignite UI for Web Components](https://infragistics.com/webcomponentssite/components/general-getting-started.html) packages from npm website.

Next, follow these steps:

- type `gulp updateBrowser` command in terminal window. This will copy and transform all source files of individually sample projects from [./samples](./samples) to the [./browser](./browser) folder.

- type `npm run start` command in terminal window to start the browser application locally

- Wait until the build is completed and then open [http://localhost:4200](http://localhost:4200) in your browser. You should see a website with navigation menu for browning all samples in this repository.