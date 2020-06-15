import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-financial-chart id="chart" width="100%" height="100%"
        chart-title="Tesla vs Amazon vs Microsoft"
        subtitle="Price Changes in Last 6 Months"
        chart-type="Line"
        zoom-slider-type="None"
        y-axis-mode="PercentChange"
        thickness="2">
    </igc-financial-chart>
</div>
`;

export class FinancialChartMultipleData extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartMultipleData");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartMultipleData); return this;
    }

    private chart: IgcFinancialChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, "Amazon (AMZN)"),
            StocksUtility.GetStocks(6, 10, "Tesla (TSLA)"),
            StocksUtility.GetStocks(6, 10, "Microsoft (MSFT)")
        ];
        return data;
    }
}