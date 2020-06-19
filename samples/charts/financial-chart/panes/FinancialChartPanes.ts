import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-financial-chart id="chart" width="100%" height="100%"
        chart-type="Candle"
        zoom-slider-type="Candle"
        volume-type="Area"
        overlay-types="PriceChannel"
        overlay-brushes="rgba(5, 138, 0, 0.17)"
        overlay-outlines="rgba(5, 138, 0, 0.4)"
        overlay-thickness="1">
    </igc-financial-chart>
</div>
`;

export class FinancialChartPanes extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartPanes");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartPanes); return this;
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