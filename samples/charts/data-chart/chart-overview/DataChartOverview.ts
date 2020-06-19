import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcSizeScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleScatterStats } from '../utilities/SampleScatterStats';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcBubbleSeriesModule,
    IgcNumberAbbreviatorModule,
    IgcLegendModule
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
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartOverview); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;

        this.populateChart();
    }

    public populateChart() {
        const data1 = SampleScatterStats.getCountriesWithLargePop();
        const data2 = SampleScatterStats.getCountriesWithSmallPop();

        this.chart.series.clear();
        this.createSeries(data1, "Large Countries");
        this.createSeries(data2, "Small Countries");
    }

    public createSeries(data: any, title: string) {
        const sizeScale = new IgcSizeScaleComponent();
        sizeScale.minimumValue = 10;
        sizeScale.maximumValue = 60;

        const id = "series" + this.chart.series.count;

        const series1 = new IgcBubbleSeriesComponent();
        series1.name = id;
        series1.title = title;
        series1.markerType = MarkerType.Circle;
        series1.dataSource = data;
        series1.showDefaultTooltip = true;
        series1.xMemberPath = "Population";
        series1.yMemberPath = "GdpTotal";
        series1.radiusMemberPath = "GdpPerCapita";
        series1.radiusScale = sizeScale;
        series1.labelMemberPath = "Name";
        series1.xAxisName = "xAxis";
        series1.yAxisName = "yAxis";

        this.chart.series.add(series1);
    }
}