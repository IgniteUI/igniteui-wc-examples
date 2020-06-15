import { SampleBase } from "../../../sample-base";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcScatterLineSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';


import { SampleScatterStats } from '../utilities/SampleScatterStats';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcScatterLineSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <igc-data-chart id="chart" width="100%" height="100%"
    is-horizontal-zoom-enabled="true"
    is-vertical-zoom-enabled="true"
    chartTitle="GDP vs Population">

    <igc-numeric-x-axis name="xAxis"
        is-logarithmic="true"
        abbreviate-large-numbers="true"
        title="Population">
    </igc-numeric-x-axis>
    <igc-numeric-y-axis name="yAxis"
        is-logarithmic="true"
        abbreviate-large-numbers="true"
        title="Total GDP ($)">
    </igc-numeric-y-axis>

    <igc-scatter-line-series id="series1"
        marker-type="Circle"
        x-axis-name="xAxis"
        y-axis-name="yAxis"
        x-member-path="Population"
        y-member-path="GdpTotal"
        show-default-tooltip="true"
        title="Rich Countries">
    </igc-scatter-line-series>

    <igc-scatter-line-series id="series2"
        marker-type="Circle"
        x-axis-name="xAxis"
        y-axis-name="yAxis"
        x-member-path="Population"
        y-member-path="GdpTotal"
        show-default-tooltip="true"
        title="Poor Countries">
    </igc-scatter-line-series>

    </igc-data-chart>
</div>
`;

export class DataChartTypeScatterLineSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeScatterLineSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeScatterLineSeries); return this;
    }

    private chart: IgcDataChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;

        const series1 = document.getElementById("series1") as IgcScatterLineSeriesComponent;
        series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
        const series2 = document.getElementById("series2") as IgcScatterLineSeriesComponent;
        series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();

    }

    public setSeries(seriesType: string) {
        if (seriesType === "Line") {
            const series1 = new IgcScatterLineSeriesComponent();
            series1.title = "Rich Countries";
            series1.markerType = MarkerType.Circle;
            series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
            series1.showDefaultTooltip = true;
            series1.xMemberPath = "Population";
            series1.yMemberPath = "GdpTotal";
            series1.xAxisName = "xAxis";
            series1.yAxisName = "yAxis";

            const series2 = new IgcScatterLineSeriesComponent();
            series2.title = "Poor Countries";
            series2.markerType = MarkerType.Circle;
            series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();
            series2.showDefaultTooltip = true;
            series2.xMemberPath = "Population";
            series2.yMemberPath = "GdpTotal";
            series2.xAxisName = "xAxis";
            series2.yAxisName = "yAxis";

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        }
    }
}