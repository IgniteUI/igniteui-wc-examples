import { SampleBase } from "../../../sample-base";
import { SampleRangeData } from "../utilities/SampleRangeData";

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcRangeAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcRangeAreaSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="chart" style="height: calc(100% - 35px)">
        <igc-data-chart id="chart"
            width="100%"
            height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            chart-title="ANNUAL TEMPERATURE CHANGES">
            <igc-category-x-axis name="xAxis" label="Year" gap="0.5">
            </igc-category-x-axis>
            <igc-numeric-y-axis  name="yAxis" minimum-value="20"
                title="Temperature (°C)">
            </igc-numeric-y-axis>

            <igc-range-area-series
                name="series1"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
                high-member-path="High"
                low-member-path="Low">
            </igc-range-area-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeRangeAreaSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeRangeAreaSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeRangeAreaSeries); return this;
    }

    private chart: IgcDataChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleRangeData.create();
    }
}