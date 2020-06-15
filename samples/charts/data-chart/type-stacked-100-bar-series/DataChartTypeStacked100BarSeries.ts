import { SampleBase } from "../../../sample-base";

import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartStackedModule } from 'igniteui-webcomponents-charts';
import { IgcStackedFragmentSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule,
    IgcLegendModule,
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="legend-title">Legend: </span>
        <div class="legend-inline">
            <igc-legend id="legend"
                orientation="Horizontal">
            </igc-legend>
        </div>
    </div>
    <div class="chart" style="height: calc(100% - 35px)">
        <igc-data-chart id="chart" width="100%" height="100%">
            <igc-numeric-x-axis name="xAxis" minimum-value="0">
            </igc-numeric-x-axis>
            <igc-category-y-axis name="yAxis" label="Country">
            </igc-category-y-axis>

            <igc-stacked-100-bar-series name="series" x-axis-name="xAxis" y-axis-name="yAxis">
                <igc-stacked-fragment-series name="coal" value-member-path="Coal" title="Coal"></igc-stacked-fragment-series>
                <igc-stacked-fragment-series name="hydro" value-member-path="Hydro" title="Hydro"></igc-stacked-fragment-series>
                <igc-stacked-fragment-series name="nuclear" value-member-path="Nuclear" title="Nuclear"></igc-stacked-fragment-series>
                <igc-stacked-fragment-series name="gas" value-member-path="Gas" title="Gas"></igc-stacked-fragment-series>
                <igc-stacked-fragment-series name="oil" value-member-path="Oil" title="Oil"></igc-stacked-fragment-series>
            </igc-stacked-100-bar-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeStacked100BarSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeStacked100BarSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeStacked100BarSeries); return this;
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