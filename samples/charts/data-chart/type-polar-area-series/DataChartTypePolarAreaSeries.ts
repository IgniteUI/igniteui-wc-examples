import { SampleBase } from "../../../sample-base";
import { SamplePolarData } from '../utilities/SamplePolarData';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartPolarModule,
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
    <div class="chart" style="width: 100%; height: calc(100% - 35px)">
        <igc-data-chart id="chart"
            width="100%"
            height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            title-top-margin="10px"
            chart-title="SAIL CHART"
            subtitle="Wind Speed vs. Boat Speed">
            <igc-numeric-angle-axis name="angleAxis"
                start-angle-offset="-90"
                interval="30"
                minimum-value="0"
                maximum-value="360">
            </igc-numeric-angle-axis>
            <igc-numeric-radius-axis name="radiusAxis"
                inner-radius-extent-scale="0.1"
                radius-extent-scale="0.9"
                minimum-value="0"
                maximum-value="100"
                interval="25">
            </igc-numeric-radius-axis>
            <igc-polar-area-series
                name="series1"
                angle-member-path="Direction"
                radius-member-path="WindSpeed"
                radius-axis-name="radiusAxis"
                angle-axis-name="angleAxis"
                title="Wind Speed">
            </igc-polar-area-series>
            <igc-polar-area-series
                name="series2"
                angle-member-path="Direction"
                radius-member-path="BoatSpeed"
                radius-axis-name="radiusAxis"
                angle-axis-name="angleAxis"
                title="Boat Speed">
            </igc-polar-area-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypePolarAreaSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypePolarAreaSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypePolarAreaSeries); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SamplePolarData.create();

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
    }
}