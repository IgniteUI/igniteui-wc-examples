import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';

// series' module:
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';

// legend's module:
import { IgcLegendModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SharedData } from '../utilities/SharedData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcColumnSeriesModule,
    IgcLegendModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="legend-title">Energy Source: </span>
        <div class="legend-inline">
            <igc-legend id="legend" orientation="Horizontal">
            </igc-legend>
        </div>
    </div>
    <div class="chart"  style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
        is-horizontal-zoom-enabled="true"
        is-vertical-zoom-enabled="true">
            <igc-category-x-axis name="xAxis"
                label="Country"
                label-text-style="9pt Verdana"
                label-top-margin="5"
                label-text-color="gray"
                title="Countries"
                title-text-color="gray"
                title-text-style="12pt Verdana"
                title-angle="0"
                tick-length="10"
                tick-stroke-thickness="0.5"
                tick-stroke="gray"
                interval="1"
                major-stroke="gray"
                major-stroke-thickness="0.5"
                gap="0.125"
                overlap="0">
            </igc-category-x-axis>

            <igc-numeric-y-axis name="yAxis"
                label-location="OutsideRight"
                label-text-style="9pt Verdana"
                label-right-margin="0"
                label-text-color="gray"
                label-horizontal-alignment="left"
                title="Energy Production (Wh)"
                title-text-style="10pt Verdana"
                title-text-color="gray"
                title-angle="90"
                title-left-margin="5"
                tick-length="10"
                tick-stroke-thickness="0.5"
                tick-stroke="black"
                minimum-value="0"
                maximum=value="1000000000"
                interval="100000000"
                major-stroke="black"
                major-stroke-thickness="1"
                minor-interval="25000000"
                minor-stroke="gray"
                minor-stroke-thickness="0.5"
                abbreviate-large-numbers="true">
            </igc-numeric-y-axis>

            <igc-column-series name="series1" title="Coal" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Coal"
                is-transition-in-enabled="true">
            </igc-column-series>
            <igc-column-series name="series2" title="Hydro" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Hydro"
                is-transition-in-enabled="true">
            </igc-column-series>
            <igc-column-series name="series3" title="Nuclear" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Nuclear"
                is-transition-in-enabled="true">
            </igc-column-series>
            <igc-column-series name="series4" title="Gas" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Gas"
                is-transition-in-enabled="true">
            </igc-column-series>
            <igc-column-series name="series5" title="Oil" x-axis-name="xAxis"
                y-axis-name="yAxis" value-member-path="Oil"
                is-transition-in-enabled="true">
            </igc-column-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartAxisSettings extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartAxisSettings");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartAxisSettings); return this;
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