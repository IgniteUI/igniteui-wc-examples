import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksHistory } from "./StocksHistory";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-financial-chart id="chart" width="100%" height="100%"
        chart-type="Line"
        zoom-slider-type="None"
        chart-title="Tesla vs Amazon"
        subtitle="Between 2013 and 2017"
        y-axis-title="Closing Prices ($)"
        x-axis-title="Time Range (1-Day Interval)"
        thickness="2">
    </igc-financial-chart>
</div>
`;

export class FinancialChartTitles extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartTitles");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartTitles); return this;
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
            StocksHistory.getAmazon(),
            StocksHistory.getTesla()
        ];
        return data;
    }
}