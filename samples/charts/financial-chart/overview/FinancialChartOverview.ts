import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(
    IgcFinancialChartModule,
    IgcLegendModule
);

let templateHTML = `
<div class="sample-container">
    <div class="legend">
        <igc-legend id="legend"
            orientation="Horizontal">
        </igc-legend>
    </div>
    <div class="chart" style="height: calc(100% - 40px)">
        <igc-financial-chart id="chart" width="100%" height="100%"
            chart-type="Bar"
            zoom-slider-type="Bar"
            chart-title="Tesla vs Amazon"
            is-toolbar-visible="true"
            y-axis-mode="PercentChange" >
        </igc-financial-chart>
    </div>
</div>
`;

export class FinancialChartOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartOverview); return this;
    }

    private chart: IgcFinancialChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.isWindowSyncedToVisibleRange = true;

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, "Tesla (TSLA)"),
            StocksUtility.GetStocks(6, 10, "Amazon (AMZN)"),
        ];
        return data;
    }
}