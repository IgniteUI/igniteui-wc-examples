import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-financial-chart id="chart" width="100%" height="100%"
        indicator-types="MoneyFlowIndex, MassIndex"
        indicator-thickness="2"
        indicator-negative-brushes="Red"
        indicator-brushes="Green, Blue"
        zoom-slider-type="None">
    </igc-financial-chart>
</div>
`;

export class FinancialChartIndicatorTypes extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartIndicatorTypes");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartIndicatorTypes); return this;
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