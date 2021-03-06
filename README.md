
<div style="display: flex; flex-flow: row;">
<img height="70px" style="border-radius: 0.25rem" alt="ignite-ui" src="./browser/public/logo-ignite-ui.svg"/>
<!-- <div style="font-size: 2.5rem; align-self: start; justify-content: start; margin: 0px; margin-left: 0.5rem; margin-right: 0.5rem">FOR</div> -->
<!-- <img height="52px" style="border-radius: 0.25rem" alt="ignite-wc" src="./browser/public/wc.png"/> -->
</div>

# Web Component Examples

This repository contains over 250 examples on how to use [Ignite UI for Web Components](https://infragistics.com/webcomponentssite/components/general-getting-started.html)

- [Bullet Graph, Linear Gauge, Radial Gauges](https://infragistics.com/webcomponentssite/components/radial-gauge.html)
- [Data Chart, Category Chart, Financial Chart, Pie Chart](https://infragistics.com/webcomponentssite/components/data-chart.html)
- [Data Grid / Data Table](https://infragistics.com/webcomponentssite/components/data-grid.html)
- [Geographic Map](https://infragistics.com/webcomponentssite/components/geo-map.html)
- [Treemap](https://infragistics.com/webcomponentssite/components/treemap-overview.html)
- [Excel Spreadsheet](https://infragistics.com/webcomponentssite/components/spreadsheet_overview.html)
- [Excel Library](https://infragistics.com/webcomponentssite/components/excel_library_using_workbooks.html)
- and many more

You can run each sample project individually from the [./samples](./samples) folder or you can browse all samples in one website from the [./browser](./browser) folder. Also, you can run each sample on Code Sandbox website by clicking on the `Edit on CodeSandbox` button in a readme file of sample project, .e.g. [./samples/charts/category-chart/overview/README.md](./samples/charts/category-chart/overview/README.md)


## Setup

To set up this project locally, clone this repository:
```
git clone https://github.com/IgniteUI/igniteui-wc-examples.git
```

## Running Individual Sample

- in VS Code, open a folder with existing sample, e.g.

```
./samples/charts/category-chart/axis-options/
```

- type `npm install` command in terminal window

- type `npm run start` command in terminal window

- Wait until the build is completed and then open [http://localhost:4200](http://localhost:4200) in your browser.

At this point, you should see a website hosted example of [Ignite UI for Web Components](https://infragistics.com/webcomponentssite/components/general-getting-started.html)


## Running All Samples

- open VS Code as Administrator

- open the [./browser](./browser) folder

- select **View** - **Terminal** menu item

- type `npm install` command in terminal window

This will install required packages and [Ignite UI for Web Components](https://infragistics.com/webcomponentssite/components/general-getting-started.html) packages from npm website:

1. [igniteui-webcomponents-core](https://www.npmjs.com/package/igniteui-webcomponents-core)
2. [igniteui-webcomponents-charts](https://www.npmjs.com/package/igniteui-webcomponents-charts)
3. [igniteui-webcomponents-excel](https://www.npmjs.com/package/igniteui-webcomponents-excel)
4. [igniteui-webcomponents-gauges](https://www.npmjs.com/package/igniteui-webcomponents-gauges)
5. [igniteui-webcomponents-grids](https://www.npmjs.com/package/igniteui-webcomponents-grids)
6. [igniteui-webcomponents-maps](https://www.npmjs.com/package/igniteui-webcomponents-maps)
7. [igniteui-webcomponents-spreadsheet](https://www.npmjs.com/package/igniteui-webcomponents-spreadsheet)
8. [igniteui-webcomponents-datasources](https://www.npmjs.com/package/igniteui-webcomponents-datasources)

Next, follow these steps:

- type `gulp updateBrowser` command in terminal window. This will copy all source files of individually sample projects from [./samples](./samples) to the [./browser](./browser) folder.

- type `npm run start` command in terminal window to start the browser application locally

Wait until the build is completed and then open [http://localhost:4200](http://localhost:4200) in your browser. You should see a website with navigation menu for browning all samples in this repository.

## Adding New Sample

- create a new branch from the `vnext` branch

- open a folder with existing sample, e.g.
```
./samples/charts/category-chart/axis-options/
```
- copy the sample and rename the new folder, e.g.
```
./samples/charts/category-chart/axis-types/
```
- open the newly created folder in VS Code

- rename the .ts file in src folder, using this naming convention:

`ControlNameSampleName.ts`

```
./samples/charts/category-chart/axis-types/src/CategoryChartAxisTypes.ts
```

- open the .ts file

- rename class to the name of .tsx file

- type `npm install` command in terminal window

- type `npm run start` command in terminal window

- implement the new sample in the .tsx file

- close the new sample project in VS Code

- delete `node_modules` folder in the new sample project

- follow instructions in the next section

## Verify New Sample

- open the [./browser](./browser) folder of this repository in VS Code

- type `gulp updateSamples` command in terminal window

NOTE this will re-generate the Readme.md file in the new sample

- type `npm run start` command in terminal window

- open [http://localhost:4200](http://localhost:4200) in your browser

- verify that the new sample is listed in the navigation menu

- verify that the new sample loads by clicking navigation link

- verify that there are no errors in DEV console

- take a screenshot of the new sample with navigation menu

- commit your changes

- create a pull request and target the `vnext` branch

- paste the screenshot in you pull request

- submit your pull request



## Learn More

To learn more about **Ignite UI for Web Components** components, check out the [Web Components documentation](https://infragistics.com/webcomponentssite/components/general-getting-started.html).
