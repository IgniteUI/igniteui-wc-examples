import { SampleBase } from "../../sample-base";

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);

let templateHTML = `
<div class="sample-container">
<div class="options">
        <span class="optionLabel">Chart Type: </span>
        <select value="Line" id="chartType">
            <option>Auto</option>
            <option>Area</option>
            <option>Column</option>
            <option>Point</option>
            <option>Line</option>
            <option>Spline</option>
            <option>SplineArea</option>
            <option>StepArea</option>
            <option>StepLine</option>
            <option>Waterfall</option>
        </select>
        <span class="optionLabel"> Marker Type: </span>
        <select value="Circle" id="markersTypes">
            <option>Automatic</option>
            <option>Circle</option>
            <option>Triangle</option>
            <option>Pyramid</option>
            <option>Square</option>
            <option>Diamond</option>
            <option>Pentagon</option>
            <option>Hexagon</option>
            <option>Tetragram</option>
            <option>Pentagram</option>
            <option>Hexagram</option>
            <option>None</option>
        </select>
    </div>
    <igc-category-chart id="chart"
        width="100%"
        height="calc(100% - 35px)"
        chart-Title="Olympic Medals By Country"
        is-series-highlighting-enabled="true"
        chart-type="Line"
        marker-types="Circle"
        y-axis-minimum-value="0"
    </igc-category-chart>
</div>
`;

export class CategoryChartMarkers extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("CategoryChartMarkers");
    public static register(): any {
        window.customElements.define(this.htmlTagName, CategoryChartMarkers); return this;
    }

    private chart: IgcCategoryChartComponent;
    public data: any[];

    constructor() {
        super();
        this.onChartTypeChanged = this.onChartTypeChanged.bind(this);
        this.onMarkerTypeChanged = this.onMarkerTypeChanged.bind(this);
        this.initData();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;

        let chartType1 = document.getElementById("chartType");
        chartType1.addEventListener('change', this.onChartTypeChanged);

        let markersTypes1 = document.getElementById("markersTypes");
        markersTypes1.addEventListener('change', this.onMarkerTypeChanged);
    }

    public onChartTypeChanged = (e: any) => {
        const chartMode = e.target.value.toString();
        this.chart.chartType = chartMode;
    }

    public onMarkerTypeChanged = (e: any) => {
        const markers = e.target.value.toString();
        this.chart.markerTypes = markers;
    }

    public initData() {
        const usaMedals: any = [
            { Year: "1996", UnitedStates: 148 },
            { Year: "2000", UnitedStates: 142 },
            { Year: "2004", UnitedStates: 134 },
            { Year: "2008", UnitedStates: 131 },
            { Year: "2012", UnitedStates: 135 },
            { Year: "2016", UnitedStates: 146 }
        ];
        const chinaMedals: any = [
            { Year: "1996", China: 110 },
            { Year: "2000", China: 115 },
            { Year: "2004", China: 121 },
            { Year: "2008", China: 129 },
            { Year: "2012", China: 115 },
            { Year: "2016", China: 112 }
        ];
        const russiaMedals: any = [
            { Year: "1996", Russia: 95 },
            { Year: "2000", Russia: 91 },
            { Year: "2004", Russia: 86 },
            { Year: "2008", Russia: 65 },
            { Year: "2012", Russia: 77 },
            { Year: "2016", Russia: 88 }
        ];
        this.data = [usaMedals, chinaMedals, russiaMedals];
    }
}