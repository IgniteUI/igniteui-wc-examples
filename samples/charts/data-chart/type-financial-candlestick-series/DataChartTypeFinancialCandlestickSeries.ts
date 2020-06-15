import { SampleBase } from "../../../sample-base";
import { SampleFinancialData } from '../utilities/SampleFinancialData';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="chart" style="height: 100%">
        <igc-data-chart id="chart" width="100%" height="100%"
        is-horizontal-zoom-enabled="true"
        is-vertical-zoom-enabled="true">

            <igc-category-x-axis name="xAxis" label="Label"></igc-category-x-axis>
            <igc-numeric-y-axis  name="yAxis" ></igc-numeric-y-axis>

            <igc-financial-price-series
                id="series2"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
                display-type="Candlestick"
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

export class DataChartTypeFinancialCandlestickSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeFinancialCandlestickSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeFinancialCandlestickSeries); return this;
    }

    private chart: IgcDataChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleFinancialData.create();
    }
}