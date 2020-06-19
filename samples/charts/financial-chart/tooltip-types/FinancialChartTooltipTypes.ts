import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ToolTipType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionLabel">Tooltip Type: </span>
        <select id="toolTipSelect">
            <option>Default</option>
            <option>Item</option>
            <option>Category</option>
            <option>None</option>
        </select>
    </div>
    <div class="chart" style="height: calc(100% - 40px); width="100%"">
        <igc-financial-chart id="chart" width="100%" height="100%"
            chart-type="Line"
            zoom-slider-type="None"
            y-axis-mode="PercentChange"
            thickness="2">
        </igc-financial-chart>
    </div>
</div>
`;

export class FinancialChartTooltipTypes extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartTooltipTypes");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartTooltipTypes); return this;
    }

    private chart: IgcFinancialChartComponent;
    public toolTipType: ToolTipType = ToolTipType.Default;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.toolTipType = this.toolTipType;

        let toolTipSelect = document.getElementById("toolTipSelect");
        toolTipSelect.addEventListener('change', this.onToolTipTypeChanged);
    }

    public onToolTipTypeChanged = (e: any) => {
        const type = e.target.value;
        switch (type) {
            case "Default":
                this.toolTipType = ToolTipType.Default;
            break;
            case "Item":
                this.toolTipType = ToolTipType.Item;
            break;
            case "Category":
                this.toolTipType = ToolTipType.Category;
            break;
            case "None":
                this.toolTipType = ToolTipType.None;
            break;
        }
        this.chart.toolTipType = this.toolTipType;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, "Tesla (TSLA)"),
            StocksUtility.GetStocks(6, 10, "Microsoft (MSFT)")
        ];
        return data;
    }
}