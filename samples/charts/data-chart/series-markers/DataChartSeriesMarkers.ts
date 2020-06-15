import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLineSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcLineSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="option-label"> Marker Type: </span>
        <select id="markerSelect">
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
    <div class="chart" style="height: calc(100% - 45px)">
    <igc-data-chart id="chart" width="100%" height="100%"
    is-horizontal-zoom-enabled="true"
    is-vertical-zoom-enabled="true">

        <igc-category-x-axis name="xAxis" label="Year">
        </igc-category-x-axis>
        <igc-numeric-y-axis name="yAxis" minimum-value="0">
        </igc-numeric-y-axis>

        <igc-line-series id="series1" title="USA"
            value-member-path="USA"
            x-axis-name="xAxis"
            y-axis-name="yAxis">
        </igc-line-series>
        <igc-line-series  id="series2" title="China"
            value-member-path="China"
            x-axis-name="xAxis"
            y-axis-name="yAxis">
        </igc-line-series>
        <igc-line-series  id="series3" title="Russia"
            value-member-path="Russia"
            x-axis-name="xAxis"
            y-axis-name="yAxis">
        </igc-line-series>
    </igc-data-chart>
    </div>
</div>
`;

export class DataChartSeriesMarkers extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartSeriesMarkers");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartSeriesMarkers); return this;
    }

    private chart: IgcDataChartComponent;
    private series1: IgcLineSeriesComponent;
    private series2: IgcLineSeriesComponent;
    private series3: IgcLineSeriesComponent;
    public markerType: MarkerType = MarkerType.Circle;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.series1 = document.getElementById("series1") as IgcLineSeriesComponent;
        this.series1.markerType = this.markerType;
        this.series2 = document.getElementById("series2") as IgcLineSeriesComponent;
        this.series2.markerType = this.markerType;
        this.series3 = document.getElementById("series3") as IgcLineSeriesComponent;
        this.series3.markerType = this.markerType;

        const markerSelect = document.getElementById("markerSelect") as HTMLSelectElement;
        markerSelect.value = "Circle";
        markerSelect.addEventListener("change", this.onMarkerTypeChanged);
    }

    public onMarkerTypeChanged = (e: any) => {
        const markers = e.target.value.toString();
        switch (markers) {
            case "Automatic":
                this.markerType = MarkerType.Automatic;
                break;
            case "Circle":
                this.markerType = MarkerType.Circle;
                break;
            case "Triangle":
                this.markerType = MarkerType.Triangle;
                break;
            case "Pyramid":
                this.markerType = MarkerType.Pyramid;
                break;
            case "Square":
                this.markerType = MarkerType.Square;
                break;
            case "Diamond":
                this.markerType = MarkerType.Diamond;
                break;
            case "Pentagon":
                this.markerType = MarkerType.Pentagon;
                break;
            case "Hexagon":
                this.markerType = MarkerType.Hexagon;
                break;
            case "Tetragram":
                this.markerType = MarkerType.Tetragram;
                break;
            case "Pentagram":
                this.markerType = MarkerType.Pentagram;
                break;
            case "Hexagram":
                this.markerType = MarkerType.Hexagram;
                break;
            case "None":
                this.markerType = MarkerType.None;
                break;
        }

        this.series1.markerType = this.markerType;
        this.series2.markerType = this.markerType;
        this.series3.markerType = this.markerType;
    }

    getData(): any[] {
        const data =  [
            { Year: "1996", USA: 148, China: 110, Russia: 95 },
            { Year: "2000", USA: 142, China: 115, Russia: 91 },
            { Year: "2004", USA: 134, China: 121, Russia: 86 },
            { Year: "2008", USA: 131, China: 129, Russia: 65 },
            { Year: "2012", USA: 135, China: 115, Russia: 77 },
            { Year: "2016", USA: 146, China: 112, Russia: 88 }
        ];

        return data;
    }
}