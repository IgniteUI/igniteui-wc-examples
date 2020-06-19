import { SampleBase } from "../../../sample-base";

// data chart's modules:
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
// series' modules:
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcMoneyFlowIndexIndicatorModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleFinancialData } from '../utilities/SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcMoneyFlowIndexIndicatorModule
);

let templateHTML = `
<div class="sample-container">
    <igc-data-chart id="chart" width="100%" height="100%"
    is-horizontal-zoom-enabled="true"
    is-vertical-zoom-enabled="true">
        <igc-category-x-axis name="xAxisShared" label="Label"></igc-category-x-axis>
        <igc-numeric-y-axis  name="yAxisRight" label-location="OutsideRight"
        minimum-value="400" title="Stock Price ($)"
        maximum-value="700">
        </igc-numeric-y-axis>

        <igc-numeric-y-axis name="yAxisLeft" label-location="OutsideLeft"
        minimum-value="0" title="Money Flow Index"
        maximum-value="300"
        major-stroke-thickness="0">
        </igc-numeric-y-axis>

        <igc-money-flow-index-indicator
        name="series2"
        x-axis-name="xAxisShared"
        y-axis-name="yAxisLeft"
        display-type="Area"
        high-member-path="High"
        low-member-path="Low"
        close-member-path="Close"
        open-member-path="Open"
        volume-member-path="Volume">
        </igc-money-flow-index-indicator>

        <igc-financial-price-series
        name="series1"
        x-axis-name="xAxisShared"
        y-axis-name="yAxisRight"
        display-type="Candlestick"
        high-member-path="High"
        low-member-path="Low"
        close-member-path="Close"
        open-member-path="Open"
        volume-member-path="Volume">
        </igc-financial-price-series>
    </igc-data-chart>
</div>
`;

export class DataChartAxisSharing extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartAxisSharing");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartAxisSharing); return this;
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
        const data = SampleFinancialData.create();
        return data;
    }
}