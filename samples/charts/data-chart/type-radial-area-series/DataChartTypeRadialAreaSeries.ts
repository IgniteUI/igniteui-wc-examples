import { SampleBase } from "../../../sample-base";
import { SampleRadialData } from "../utilities/SampleRadialData";

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartRadialCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartRadialModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartInteractivityModule,
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
    <div class="chart" style="height: calc(100% - 35px)">
        <igc-data-chart id="chart"
            chart-title="COMPANY FINANCES BY DEPARTMENT"
            width="100%"
            height="100%"
            grid-mode="BeforeSeries"
            brushes="#9FB328, #7446B9"
            outlines="#9FB328, #7446B9">
            <igc-category-angle-axis name="angleAxis" label="Department">
            </igc-category-angle-axis>
            <igc-numeric-radius-axis name="radiusAxis" inner-radius-extent-scale="0.1" minimum-value="0">
            </igc-numeric-radius-axis>
            <igc-radial-area-series
                name="series1"
                value-member-path="Budget"
                value-axis-name="radiusAxis"
                angle-axis-name="angleAxis"
                title="Budget">
            </igc-radial-area-series>
            <igc-radial-area-series
                name="series2"
                value-member-path="Spending"
                value-axis-name="radiusAxis"
                angle-axis-name="angleAxis"
                title="Spending">
            </igc-radial-area-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeRadialAreaSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeRadialAreaSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeRadialAreaSeries); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleRadialData.create();

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
    }
}