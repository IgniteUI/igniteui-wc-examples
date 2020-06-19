import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SharedData } from '../utilities/SharedData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcLegendModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcNumberAbbreviatorModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="legend-title">Energy Source: </span>
        <div class="legend-inline">
            <igc-legend id="legend" orientation="Horizontal">
            </igc-legend>
        </div>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
    <igc-data-chart id="chart" width="100%" height="100%"
    is-horizontal-zoom-enabled="true"
    is-vertical-zoom-enabled="true">
        <igc-category-x-axis name="xAxis" label="Country">
        </igc-category-x-axis>
        <igc-numeric-y-axis name="yAxis" minimum-value="0"
            abbreviate-large-numbers="true">
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
`;

export class DataChartLegends extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartLegends");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartLegends); return this;
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
        const data = SharedData.getEnergyProduction();
        return data;
    }
}