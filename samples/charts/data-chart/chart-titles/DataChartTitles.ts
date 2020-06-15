import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcLegendModule
);

let templateHTML = `
<div class="sample-container">
    <div class="legend">
        <igc-legend id="legend" orientation="Horizontal">
        </igc-legend>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            chart-title="Energy Use Per Country"
            subtitle="Results over a two year period">

            <igc-category-x-axis name="xAxis" label="Country">
            </igc-category-x-axis>
            <igc-numeric-y-axis name="yAxis" minimum-value="0">
            </igc-numeric-y-axis>

            <igc-column-series name="series1" title="Coal" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Coal">
            </igc-column-series>
            <igc-column-series name="series2" title="Hydro" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Hydro">
            </igc-column-series>
            <igc-column-series name="series3" title="Nuclear" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Nuclear">
            </igc-column-series>
            <igc-column-series name="series4" title="Gas" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Gas">
            </igc-column-series>
            <igc-column-series name="series5" title="Oil" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Oil">
            </igc-column-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTitles extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTitles");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTitles); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    getData(): any[] {
        const data = [
            { Country: "Canada", Coal: 400, Oil: 100, Gas: 175, Nuclear: 225, Hydro: 350 },
            { Country: "China", Coal: 925, Oil: 200, Gas: 350, Nuclear: 400, Hydro: 625 },
            { Country: "Russia", Coal: 550, Oil: 200, Gas: 250, Nuclear: 475, Hydro: 425 },
            { Country: "Australia", Coal: 450, Oil: 100, Gas: 150, Nuclear: 175, Hydro: 350 },
            { Country: "United States", Coal: 800, Oil: 250, Gas: 475, Nuclear: 575, Hydro: 750 },
            { Country: "France", Coal: 375, Oil: 150, Gas: 350, Nuclear: 275, Hydro: 325 }
        ];

        return data;
    }
}