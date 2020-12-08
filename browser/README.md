
<div style="display: flex; flex-flow: row;">
<img height="70px" style="border-radius: 0.25rem" alt="ignite-ui" src="../browser/public/logo-ignite-ui.svg"/>
<div style="font-size: 2.5rem; align-self: start; justify-content: start; margin: 0px; margin-left: 0.5rem; margin-right: 0.5rem">FOR</div>
<img height="52px" style="border-radius: 0.25rem" alt="ignite-wc" src="../browser/public/wc.png"/>
<div style="font-size: 2.5rem; align-self: start; justify-content: start; margin: 0px; margin-left: 0.5rem; margin-right: 0.5rem">BROWSER</div>
</div>

This browser application will allows you to browse all samples of the [IgniteUI for Web Components](https://www.infragistics.com/webcomponentssite/components/general-getting-started.html) in a single website.

- [Bullet Graph, Linear Gauge, Radial Gauges](https://infragistics.com/webcomponentssite/components/radial-gauge.html)
- [Data Chart, Category Chart, Financial Chart, Pie Chart](https://infragistics.com/webcomponentssite/components/data-chart.html)
- [Data Grid / Data Table](https://infragistics.com/webcomponentssite/components/data-grid.html)
- [Geographic Map](https://infragistics.com/webcomponentssite/components/geo-map.html)
- [Treemap](https://infragistics.com/webcomponentssite/components/treemap-overview.html)
- [Excel Spreadsheet](https://infragistics.com/webcomponentssite/components/spreadsheet_overview.html)
- [Excel Library](https://infragistics.com/webcomponentssite/components/excel_library_using_workbooks.html)
- and many more

# Instructions

- open VS Code as Administrator

- open the [./browser](./browser) folder

- select **View** - **Terminal** menu item

- type `npm install` command in terminal window

This will install required packages and [Ignite UI for Web Components](https://infragistics.com/webcomponentssite/components/general-getting-started.html) packages from npm website.

Next, follow these steps:

- type `gulp updateBrowser` command in terminal window. This will copy all source files of individually sample projects from [./samples](./samples) to the [./browser](./browser) folder.

- type `npm run start` command in terminal window to start the browser application locally

Wait until the build is completed and then open [http://localhost:4200](http://localhost:4200) in your browser. You should see a website with navigation menu for browning all samples in this repository.