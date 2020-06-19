import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { TrendLineType } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
    <label class="optionLabel">Trendline Type:</label>
    <select id="trendLineSelect">
        <option>QuinticFit</option>
        <option>CubicFit</option>
        <option>LinearFit</option>
        <option>QuarticFit</option>
        <option>ExponentialFit</option>
        <option>PowerLawFit</option>
        <option>LogarithmicFit</option>
        <option>CumulativeAverage</option>
        <option>ExponentialAverage</option>
        <option>SimpleAverage</option>
        <option>ModifiedAverage</option>
        <option>WeightedAverage</option>
        <option>None</option>
    </select>
    </div>

    <div class="chart" style="height: calc(100% - 40px)">
        <igc-financial-chart id="chart" width="100%" height="100%"
            trend-line-thickness="2"
            trend-line-period="10"
            trend-line-brushes="#8a58d6, #9fb328"
            brushes="#8a58d6, #9fb328"
            zoom-sliderType="None"
            chart-type="Line">
        </igc-financial-chart>
    </div>
</div>
`;

export class FinancialChartTrendlines extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartTrendlines");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartTrendlines); return this;
    }

    private chart: IgcFinancialChartComponent;
    public trendLineType: TrendLineType = TrendLineType.QuinticFit;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.trendLineType = this.trendLineType;

        let trendLineSelect = document.getElementById("trendLineSelect");
        trendLineSelect.addEventListener('change', this.onTrendlineChanged);
    }

    public onTrendlineChanged = (e: any) => {
        const type = e.target.value;
        switch (type) {
            case "CubicFit":
                this.trendLineType = TrendLineType.CubicFit;
            break;
            case "LinearFit":
                this.trendLineType = TrendLineType.LinearFit;
            break;
            case "QuinticFit":
                this.trendLineType = TrendLineType.QuinticFit;
            break;
            case "QuarticFit":
                this.trendLineType = TrendLineType.QuarticFit;
            break;
            case "ExponentialFit":
                this.trendLineType = TrendLineType.ExponentialFit;
            break;
            case "PowerLawFit":
                this.trendLineType = TrendLineType.PowerLawFit;
            break;
            case "LogarithmicFit":
                this.trendLineType = TrendLineType.LogarithmicFit;
            break;
            case "CumulativeAverage":
                this.trendLineType = TrendLineType.CumulativeAverage;
            break;
            case "ExponentialAverage":
                this.trendLineType = TrendLineType.ExponentialAverage;
            break;
            case "SimpleAverage":
                this.trendLineType = TrendLineType.SimpleAverage;
            break;
            case "ModifiedAverage":
                this.trendLineType = TrendLineType.ModifiedAverage;
            break;
            case "WeightedAverage":
                this.trendLineType = TrendLineType.WeightedAverage;
            break;
            case "None":
                this.trendLineType = TrendLineType.None;
            break;
        }
        this.chart.trendLineType = this.trendLineType;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, "Amazon (AMZN)"),
            StocksUtility.GetStocks(6, 10, "Microsoft (MSFT)")
        ];
        return data;
    }
}