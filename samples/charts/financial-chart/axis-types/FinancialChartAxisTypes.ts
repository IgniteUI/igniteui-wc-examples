import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { FinancialChartXAxisMode } from 'igniteui-webcomponents-charts';
import { FinancialChartYAxisMode } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <label class="optionLabel">X-Axis Mode:</label>
        <select id="xAxisSelect">
            <option>Time</option>
            <option>Ordinal</option>
        </select>
        <label class="optionLabel">Y-Axis Mode:</label>
        <select id="yAxisSelect">
            <option>PercentChange</option>
            <option>Numeric</option>
        </select>
    </div>
    <div class="chart" style="height: calc(100% - 40px)">
        <igc-financial-chart id="chart" width="100%" height="100%"
        chart-type="Bar"
        zoom-slider-type="Bar">
        </igc-financial-chart>
    </div>
</div>
`;

export class FinancialChartAxisTypes extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartAxisTypes");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartAxisTypes); return this;
    }

    private chart: IgcFinancialChartComponent;
    private xAxisMode = FinancialChartXAxisMode.Time;
    private yAxisMode = FinancialChartYAxisMode.PercentChange;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.xAxisMode = this.xAxisMode;
        this.chart.yAxisMode = this.yAxisMode;
        this.chart.isWindowSyncedToVisibleRange = true;

        let xAxisSelect = document.getElementById("xAxisSelect");
        xAxisSelect.addEventListener('change', this.onXAxisModeChanged);

        let yAxisSelect = document.getElementById("yAxisSelect");
        yAxisSelect.addEventListener('change', this.onYAxisModeChanged);
    }

    public onXAxisModeChanged = (e: any) => {
        const mode = e.target.value;
        if (mode === "Time") {
            this.xAxisMode = FinancialChartXAxisMode.Time;
        }
        else if (mode === "Ordinal") {
            this.xAxisMode = FinancialChartXAxisMode.Ordinal;
        }
        this.chart.xAxisMode = this.xAxisMode;
    }

    public onYAxisModeChanged = (e: any) => {
        const mode = e.target.value;
        if (mode === "PercentChange") {
            this.yAxisMode = FinancialChartYAxisMode.PercentChange;
        }
        else if (mode === "Numeric") {
            this.yAxisMode = FinancialChartYAxisMode.Numeric;
        }
        this.chart.yAxisMode = this.yAxisMode;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, "Amazon (AMZN)"),
            StocksUtility.GetStocks(6, 10, "Tesla (TSLA)"),
        ];
        return data;
    }
}