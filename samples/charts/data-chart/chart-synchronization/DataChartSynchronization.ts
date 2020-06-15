import { SampleBase } from "../../../sample-base";
import { SampleFinancialData } from '../utilities/SampleFinancialData';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="chart" style="height: 100%">
        <igc-data-chart id="chart1" width="100%" height="50%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            sync-channel="ChannelA"
            synchronize-horizontally="true"
            synchronize-vertically="true"
            subtitle="Google Stock Prices">

            <igc-category-x-axis name="xAxis" label="Label"></igc-category-x-axis>
            <igc-numeric-y-axis  name="yAxis" ></igc-numeric-y-axis>

            <igc-financial-price-series
                id="series1"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
                display-type="OHLC"
                high-member-path="High"
                low-member-path="Low"
                close-member-path="Close"
                open-member-path="Open"
                volume-member-path="Volume">
            </igc-financial-price-series>

        </igc-data-chart>

        <igc-data-chart id="chart2" width="100%" height="50%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            sync-channel="ChannelA"
            synchronize-horizontally="true"
            synchronize-vertically="true"
            subtitle="Amazon Stock Prices"
            subtitle-top-margin="10">

            <igc-category-x-axis name="xAxis" label="Label"></igc-category-x-axis>
            <igc-numeric-y-axis  name="yAxis" ></igc-numeric-y-axis>

            <igc-financial-price-series
                id="series1"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
                display-type="OHLC"
                high-member-path="High"
                low-member-path="Low"
                close-member-path="Close"
                open-member-path="Open"
                volume-member-path="Volume">
            </igc-financial-price-series>

        </igc-data-chart>
    </div>
</div>
`;

export class DataChartSynchronization extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartSynchronization");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartSynchronization); return this;
    }

    private chart1: IgcDataChartComponent;
    private chart2: IgcDataChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart1 = document.getElementById("chart1") as IgcDataChartComponent;
        this.chart1.dataSource = SampleFinancialData.create();

        this.chart2 = document.getElementById("chart2") as IgcDataChartComponent;
        this.chart2.dataSource = SampleFinancialData.create();
    }

}