import { SampleBase } from "../../../sample-base";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesComponent } from 'igniteui-webcomponents-charts';


import { SampleShapeData } from '../utilities/SampleShapeData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartShapeCoreModule,
    IgcDataChartShapeModule,
    IgcDataChartInteractivityModule,
    IgcScatterPolylineSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <igc-data-chart id="chart" width="100%" height="100%"
        is-horizontal-zoom-enabled="true"
        is-vertical-zoom-enabled="true"
        chart-title="House Floor Plan">
        <igc-numeric-x-axis name="xAxis" minimum-value="-1" maximum-value="11" interval="1">
        </igc-numeric-x-axis>
        <igc-numeric-y-axis name="yAxis" minimum-value="-1" maximum-value="11" interval="1">
        </igc-numeric-y-axis>

        <igc-scatter-polyline-series
            name="series1"
            x-axis-name="xAxis"
            y-axis-name="yAxis"
            shape-member-path="Points"
            title="House Outline"
            brush="Black"
            outline="Black">
        </igc-scatter-polyline-series>

    </igc-data-chart>
</div>
`;

export class DataChartTypeScatterPolylineSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeScatterPolylineSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeScatterPolylineSeries); return this;
    }

    private chart: IgcDataChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleShapeData.create();
    }

    public setSeries() {
        const series1 = new IgcScatterPolylineSeriesComponent();
        series1.shapeMemberPath = "Points";
        series1.title = "House Outline";
        series1.brush = "Black";
        series1.outline = "Black";
        series1.xAxisName = "xAxis";
        series1.yAxisName = "yAxis";

        this.chart.series.clear();
        this.chart.series.add(series1);
    }
}