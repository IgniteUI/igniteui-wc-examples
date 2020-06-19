import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcValueOverlayModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcValueOverlayModule
);

let templateHTML = `
<div class="sample-container">
    <div class="chart" style="height: 100%">
        <igc-data-chart id="chart" width="100%" height="100%"
        is-horizontal-zoom-enabled="true"
        is-vertical-zoom-enabled="true">

            <igc-category-x-axis name="xAxis" label="Label">
            </igc-category-x-axis>
            <igc-numeric-y-axis name="yAxis" minimum-value="0" maximum-value="10">
            </igc-numeric-y-axis>

            <igc-column-series name="series1" x-axis-name="xAxis" y-axis-name="yAxis" value-member-path="Value">
            </igc-column-series>

            <igc-value-overlay name="overlay1" axis-name="yAxis" value="2.0" thickness="5">
            </igc-value-overlay>
            <igc-value-overlay name="overlay2" axis-name="yAxis" value="3.6" thickness="5">
            </igc-value-overlay>
            <igc-value-overlay name="overlay3" axis-name="yAxis" value="5.8" thickness="5">
            </igc-value-overlay>
            <igc-value-overlay name="overlay4" axis-name="yAxis" value="1.0" thickness="5">
            </igc-value-overlay>
            <igc-value-overlay name="overlay5" axis-name="yAxis" value="8.0" thickness="5">
            </igc-value-overlay>
            <igc-value-overlay name="overlay6" axis-name="yAxis" value="7.0" thickness="5">
            </igc-value-overlay>
            <igc-value-overlay name="overlay7" axis-name="yAxis" value="5.0" thickness="5">
            </igc-value-overlay>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartValueOverlay extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartValueOverlay");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartValueOverlay); return this;
    }

    private chart: IgcDataChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();
    }

    getData(): any[] {
        const data = [
            { "Label": 1, "Value": 1.0 },
            { "Label": 2, "Value": 2.0 },
            { "Label": 3, "Value": 6.0 },
            { "Label": 4, "Value": 8.0 },
            { "Label": 5, "Value": 2.0 },
            { "Label": 6, "Value": 6.0 },
            { "Label": 7, "Value": 4.0 },
            { "Label": 8, "Value": 2.0 },
            { "Label": 9, "Value": 1.0 },
        ];

        return data;
    }
}