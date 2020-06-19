import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { FinancialChartVolumeType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <label class="optionLabel">Volume Type:</label>
        <select id="volumeTypeSelect">
            <option>Area</option>
            <option>Column</option>
            <option>Line</option>
            <option>None</option>
        </select>
    </div>
    <div class="chart" style="height: calc(100% - 40px)">
        <igc-financial-chart id="chart" width="100%" height="100%"
            y-axis-extent="60"
            volume-thickness="2"
            volume-brushes="rgba(136, 77, 255, 0.75)"
            volume-outlines="rgba(136, 77, 255, 1)"
            zoom-slider-type="None">
        </igc-financial-chart>
    </div>
</div>
`;

export class FinancialChartVolumeTypes extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartVolumeTypes");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartVolumeTypes); return this;
    }

    private chart: IgcFinancialChartComponent;
    public volumeType: FinancialChartVolumeType = FinancialChartVolumeType.Area;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = StocksUtility.GetStocks();
        this.chart.volumeType = this.volumeType;

        let volumeTypeSelect = document.getElementById("volumeTypeSelect");
        volumeTypeSelect.addEventListener('change', this.onVolumeTypeChanged);
    }

    public onVolumeTypeChanged = (e: any) =>{
        const type = e.target.value;
        switch (type) {
            case "Column":
                this.volumeType = FinancialChartVolumeType.Column;
            break;
            case "Area":
                this.volumeType = FinancialChartVolumeType.Area;
            break;
            case "Line":
                this.volumeType = FinancialChartVolumeType.Line;
            break;
            case "None":
                this.volumeType = FinancialChartVolumeType.None;
            break;
        }
        this.chart.volumeType = this.volumeType;
    }

}