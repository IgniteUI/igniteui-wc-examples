import { SampleBase } from "../../sample-base";

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { TrendLineType } from 'igniteui-webcomponents-core';
import { SharedData } from "./SharedData";

ModuleManager.register(IgcCategoryChartModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
    <span class="optionLabel">Trend Line Type: </span>
    <select
        value="QuarticFit" id="trendLineSelect" >
        <option>LinearFit</option>
        <option>QuadraticFit</option>
        <option>CubicFit</option>
        <option>QuarticFit</option>
        <option>QuinticFit</option>
        <option>LogarithmicFit</option>
        <option>ExponentialFit</option>
        <option>PowerLawFit</option>
        <option>SimpleAverage</option>
        <option>ExponentialAverage</option>
        <option>ModifiedAverage</option>
        <option>CumulativeAverage</option>
        <option>WeightedAverage</option>
        <option>None</option>
    </select>
    </div>

    <igc-category-chart id="chart"
        width="100%"
        height="calc(100% - 45px)"
        chart-type="Point"
        marker-types="Circle"
        chart-title="Average Temperature over 2000 Years"
        trend-line-type="QuarticFit"
        trend-line-thickness="2"
        trend-line-period="20"
        y-axis-minimum-Value="0"
        y-axis-title="Temperature (C)"
        x-axis-title="Years">
    </igc-category-chart>
</div>
`;

export class CategoryChartTrendline extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("CategoryChartTrendline");
    public static register(): any {
        window.customElements.define(this.htmlTagName, CategoryChartTrendline); return this;
    }

    private chart: IgcCategoryChartComponent;
    public data: any[];

    constructor() {
        super();
        this.onTrendlineTypeChanged = this.onTrendlineTypeChanged.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcCategoryChartComponent;
        this.chart.dataSource = this.getData();

        let trendLineSelect = document.getElementById("trendLineSelect");
        trendLineSelect.addEventListener('click', this.onTrendlineTypeChanged);
    }

    public onTrendlineTypeChanged = (e: any) => {
        let value = e.target.value;
        this.chart.trendLineType = value;
    }

    public getData(): any[] {

        // generating average temperature for a few cities
        const eg: any = SharedData.getTemperatures(30, 0, 2000);
        const it: any = SharedData.getTemperatures(20, 0, 2000);
        const uk: any = SharedData.getTemperatures(10, 0, 2000);

        // setting data intent for Series Title
        uk.__dataIntents = {
            Value: ["SeriesTitle/London"]
        };
        it.__dataIntents = {
            Value: ["SeriesTitle/Rome"]
        };
        eg.__dataIntents = {
            Value: ["SeriesTitle/Cairo"]
        };
        return [eg, it, uk];
    }
}