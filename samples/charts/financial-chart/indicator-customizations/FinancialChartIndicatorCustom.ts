import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { IgcFinancialEventArgs } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartCustomIndicatorArgs } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-financial-chart id="chart" width="100%" height="100%"
        chart-type="candle"
        zoom-slider-type="none"
        custom-indicator-names="Custom Indicator (Price Changes)">
    </igc-financial-chart>
</div>
`;

export class FinancialChartIndicatorCustom extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartIndicatorCustom");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartIndicatorCustom); return this;
    }

    private chart: IgcFinancialChartComponent;

    constructor() {
        super();
        this.applyCustomIndicators = this.applyCustomIndicators.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = StocksUtility.GetStocks();
        this.chart.applyCustomIndicators = this.applyCustomIndicators;
    }

    public applyCustomIndicators(chart: IgcFinancialChartComponent, event: IgcFinancialChartCustomIndicatorArgs) {

        if (event.index === 0) {
            const info: IgcFinancialEventArgs = event.indicatorInfo;
            if (info === undefined) {
                console.log("indicatorInfo is undefined"); return;
            }

            const ds = info.dataSource;
            if (ds === undefined) {
                console.log("dataSource is undefined"); return;
            }
            if (ds.openColumn === undefined) {
                console.log("dataSource has no openColumn"); return;
            }
            if (ds.indicatorColumn.length === 0) {
                console.log("dataSource has no indicatorColumn"); return;
            }

            const prices = ds.openColumn;
            const priceStart = ds.openColumn[0];
            let min = Number.MAX_VALUE;
            let max = Number.MIN_VALUE;

            // calculating price changes using start price as reference
            for (let i = 0; i < ds.indicatorColumn.length; i++) {
                const priceChange = prices[i] - priceStart;
                const pricePercentage = (priceChange / priceStart) * 100;
                min = Math.min(min, pricePercentage);
                max = Math.max(max, pricePercentage);
                // setting values for indicator
                ds.indicatorColumn[i] = pricePercentage;
            }

            // setting min and max on data source
            ds.minimumValue = min;
            ds.maximumValue = max;

            console.log("custom indicator created between " + min + "  " + max);
        }
    }

}