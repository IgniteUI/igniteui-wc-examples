import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcSplineAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleCategoryData } from '../utilities/SampleCategoryData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcLegendModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcSplineAreaSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="legend-title">Legend: </span>
        <div class="legend-inline">
            <igc-legend id="legend" orientation="Horizontal">
            </igc-legend>
        </div>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true">

            <igc-category-x-axis name="xAxis" label="Year"
                title="Olympic Years">
            </igc-category-x-axis>
            <igc-numeric-y-axis name="yAxis" minimum-value="0"
                title="Total Olympic Medals">
            </igc-numeric-y-axis>
            <igc-spline-area-series
                name="series1"
                title="USA"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
                value-member-path="USA">
            </igc-spline-area-series>
            <igc-spline-area-series
                name="series2"
                title="Russia"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
                value-member-path="RUS">
            </igc-spline-area-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeCategorySplineAreaSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeCategorySplineAreaSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeCategorySplineAreaSeries); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleCategoryData.create();

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

}