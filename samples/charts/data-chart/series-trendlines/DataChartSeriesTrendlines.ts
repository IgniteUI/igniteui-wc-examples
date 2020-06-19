import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryTrendLineModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesComponent } from 'igniteui-webcomponents-charts';
import { TrendLineType } from 'igniteui-webcomponents-core';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleFinancialData } from '../utilities/SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcDataChartCategoryTrendLineModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="option-item">Trendline Type:</span>
        <select id="trendLineSelect">
            <option>None</option>
            <option>CubicFit</option>
            <option>CumulativeAverage</option>
            <option>ExponentialAverage</option>
            <option>ExponentialFit</option>
            <option>LinearFit</option>
            <option>LogarithmicFit</option>
            <option>ModifiedAverage</option>
            <option>PowerLawFit</option>
            <option>QuadraticFit</option>
            <option>QuarticFit</option>
            <option>QuinticFit</option>
            <option>SimpleAverage</option>
            <option>WeightedAverage</option>
        </select>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
        is-horizontal-zoom-enabled="true"
        is-vertical-zoom-enabled="true">

            <igc-category-x-axis name="xAxis" label="Label">
            </igc-category-x-axis>
            <igc-numeric-y-axis name="yAxis">
            </igc-numeric-y-axis>

            <igc-financial-price-series
                id="series1"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
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

export class DataChartSeriesTrendlines extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartSeriesTrendlines");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartSeriesTrendlines); return this;
    }

    private chart: IgcDataChartComponent;
    private series1: IgcFinancialPriceSeriesComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.series1 = document.getElementById("series1") as IgcFinancialPriceSeriesComponent;
        this.series1.trendLineType = TrendLineType.CubicFit;

        const trendLineSelect = document.getElementById("trendLineSelect") as HTMLSelectElement;
        trendLineSelect.value = "CubicFit";
        trendLineSelect.addEventListener("change", this.onTrendlineChange);
    }

    public onTrendlineChange = (e: any) => {
        let trendlineType: TrendLineType = TrendLineType.None;
        switch (e.target.value) {
            case "None":
                trendlineType = TrendLineType.None;
                break;
            case "CubicFit":
                trendlineType = TrendLineType.CubicFit;
                break;
            case "CumulativeAverage":
                trendlineType = TrendLineType.CumulativeAverage;
                break;
            case "ExponentialAverage":
                trendlineType = TrendLineType.ExponentialAverage;
                break;
            case "ExponentialFit":
                trendlineType = TrendLineType.ExponentialFit;
                break;
            case "LinearFit":
                trendlineType = TrendLineType.LinearFit;
                break;
            case "LogarithmicFit":
                trendlineType = TrendLineType.LogarithmicFit;
                break;
            case "ModifiedAverage":
                trendlineType = TrendLineType.ModifiedAverage;
                break;
            case "PowerLawFit":
                trendlineType = TrendLineType.PowerLawFit;
                break;
            case "QuadraticFit":
                trendlineType = TrendLineType.QuadraticFit;
                break;
            case "QuarticFit":
                trendlineType = TrendLineType.QuarticFit;
                break;
            case "QuinticFit":
                trendlineType = TrendLineType.QuinticFit;
                break;
            case "SimpleAverage":
                trendlineType = TrendLineType.SimpleAverage;
                break;
            case "WeightedAverage":
                trendlineType = TrendLineType.WeightedAverage;
                break;
        }
        this.series1.trendLineType = trendlineType;
    }

    getData(): any[] {
        const data = SampleFinancialData.create();
        return data;
    }
}