import { SampleBase } from "../../sample-base";

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SharedData } from "./SharedData";

ModuleManager.register(IgcCategoryChartModule);

let templateHTML = `
<div class="sample-container">
<div class="options">
    <label class="optionLabel">Data Points: </label>
    <label class="optionValue" id="dataInfoLabel"> 500000 </label>
    <input id="dataPointsSlider" class="slider" type="range" min="10000" max="1000000" step="1000"
        value=500000 />
    <button id="DataGenerate">Generate Data</button>
</div>
    <igc-category-chart id="chart"
        width="100%"
        height="calc(100% - 45px)"
        chart-type="Line">
    </igc-category-chart>
</div>
`;

export class CategoryChartHighVolume extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("CategoryChartHighVolume");
    public static register(): any {
        window.customElements.define(this.htmlTagName, CategoryChartHighVolume); return this;
    }

    private chart: IgcCategoryChartComponent;
    public dataPoints: number = 500000;

    public dataInfo: string = SharedData.toShortString(this.dataPoints);
    public data: any[];
    private dataInfoLabel: HTMLLabelElement;

    constructor() {
        super();

        this.onDataPointsChanged = this.onDataPointsChanged.bind(this);
        this.onDataGenerateClick = this.onDataGenerateClick.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcCategoryChartComponent;
        this.chart.dataSource = SharedData.generateItems(0, this.dataPoints, true);

        let slider1 = document.getElementById("dataPointsSlider") as HTMLInputElement;
        slider1.addEventListener('change', this.onDataPointsChanged);

        let DataGenerate1 = document.getElementById("DataGenerate") as HTMLButtonElement;
        DataGenerate1.addEventListener('click', this.onDataGenerateClick);
    }

    public onDataPointsChanged = (e: any) => {
        this.dataPoints = e.target.value;
        const info = SharedData.toShortString(this.dataPoints);
        this.dataPoints = this.dataPoints;
        this.dataInfo = info;

        this.dataInfoLabel = document.getElementById("dataInfoLabel") as HTMLLabelElement;
        this.dataInfoLabel.textContent = this.dataPoints.toString();
    }

    public onDataGenerateClick = (e: any) => {
        if (this.dataPoints === undefined) {
            this.dataPoints = 10000;
        }
        this.generateData();
    }

    public generateData() {
        this.chart.dataSource = SharedData.generateItems(0, this.dataPoints, true);

    }
}