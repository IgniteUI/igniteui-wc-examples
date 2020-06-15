import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-financial-chart id="chart" width="100%" height="100%">

    </igc-financial-chart>
</div>
`;

export class FinancialChartHighVolume extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartHighVolume");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartHighVolume); return this;
    }

    private chart: IgcFinancialChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        const dateEnd = new Date(2020, 11, 1);
        const dateStart = new Date(1900, 1, 1);
        const yearStart = dateStart.getFullYear();
        const yearEnd = dateEnd.getFullYear();
        const data = StocksUtility.GetStocksBetween(dateStart, dateEnd, true, 60);

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = data;
        this.chart.chartTitle = "Stock Prices " + yearStart + "-" + yearEnd;
        this.chart.subtitle = StocksUtility.toShortString(data.length) + " data points";
    }


}