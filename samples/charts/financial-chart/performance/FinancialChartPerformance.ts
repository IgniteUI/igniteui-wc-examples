import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-financial-chart id="chart" width="100%" height="100%"
        chart-type="Line"
        volume-type="Line"
        zoom-slider-type="None"
        marker-types="None"
        x-axis-mode="Ordinal"
        y-axis-mode="Numeric"
        y-axis-extent="60"
        thickness="2">
    </igc-financial-chart>
</div>
`;

export class FinancialChartPerformance extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartPerformance");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartPerformance); return this;
    }

    private chart: IgcFinancialChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = StocksUtility.GetStocks();
    }


}