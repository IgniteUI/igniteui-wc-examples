import { SampleBase } from "../../../sample-base";
import { SampleScatterData } from "../utilities/SampleScatterData";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

import { IgcScatterContourSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterContourSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcValueBrushScaleModule } from 'igniteui-webcomponents-charts';
import { IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcLinearContourValueResolverModule } from 'igniteui-webcomponents-charts';
import { IgcLinearContourValueResolverComponent } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcScatterContourSeriesModule,
    IgcValueBrushScaleModule,
    IgcLinearContourValueResolverModule
);

let templateHTML = `
<div class="sample-container">
    <div className="options">
        <label class="option-label">Thickness: </label>
        <label class="option-value" id="thicknessLabel">
        </label>
        <input class="slider" id="thicknessSlider"
            type="range" min="1" max="10" step="1">
        </input>

        <label class="option-label">Contours: </label>
        <label class="option-value" id="contoursLabel">
        </label>
        <input class="slider" id="contoursSlider"
            type="range" min="1" max="15" step="1">
        </input>

    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            chart-title="MAGNETIC FIELD LINES"
            grid-mode="BeforeSeries">
            <igc-numeric-x-axis name="xAxis1" label-location="OutsideLeft"
                minimum-value="-180" maximum-value="180" interval="30" title="Longitude">
            </igc-numeric-x-axis>
            <igc-numeric-y-axis name="yAxis1" label-location="OutsideBottom"
                minimum-value="-90" maximum-value="90" interval="30"  title="Latitude">
            </igc-numeric-y-axis>

            <igc-numeric-x-axis name="xAxis2" label-location="OutsideTop"
                minimum-value="-180" maximum-value="180" interval="30">
            </igc-numeric-x-axis>
            <igc-numeric-y-axis name="yAxis2" label-location="OutsideRight"
                minimum-value="-90" maximum-value="90" interval="30" title="Latitude">
            </igc-numeric-y-axis>

            <igc-scatter-contour-series
                id="series"
                x-axis-name="xAxis1"
                y-axis-name="yAxis1"
                thickness="3"
                x-member-path="X"
                y-member-path="Y"
                value-member-path="Z">
            </igc-scatter-contour-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeScatterContourSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeScatterContourSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeScatterContourSeries); return this;
    }

    private chart: IgcDataChartComponent;
    private series: IgcScatterContourSeriesComponent;
    public thicknessLabel: HTMLLabelElement;
    public contoursLabel: HTMLLabelElement;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        const brushScale = new IgcValueBrushScaleComponent();
        brushScale.minimumValue = -2;
        brushScale.maximumValue = 2;
        brushScale.brushes = [
            "#8670CB", "#513E8C", "#003F5E",
            "#0C6B99", "#4AC4FF", "#B5CC2E",
            "#FFD034", "#FC8612", "#ED4840"
        ];
        this.series = document.getElementById("series") as IgcScatterContourSeriesComponent;
        this.series.fillScale = brushScale;

        this.thicknessLabel = document.getElementById("thicknessLabel") as HTMLLabelElement;
        this.thicknessLabel.textContent = "5";

        const thicknessSlider = document.getElementById("thicknessSlider") as HTMLInputElement;
        thicknessSlider.value = "5";
        thicknessSlider.addEventListener("change", this.onSeriesThicknessChanged);

        this.contoursLabel = document.getElementById("contoursLabel") as HTMLLabelElement;
        this.contoursLabel.textContent = "10";

        const contoursSlider = document.getElementById("contoursSlider") as HTMLInputElement;
        contoursSlider.value = "10";
        contoursSlider.addEventListener("change", this.onSeriesContoursChanged);
    }

    public onSeriesThicknessChanged = (e: any) => {
        const num: number = parseInt(e.target.value, 10);
        this.series.thickness = num;
        this.thicknessLabel.textContent = num.toString();
    }

    public onSeriesContoursChanged = (e: any) => {
        const num: number = parseInt(e.target.value, 10);

        if (this.series !== undefined) {
            const contours = new IgcLinearContourValueResolverComponent();
            contours.valueCount = num;
            this.series.valueResolver = contours;
        }
        this.contoursLabel.textContent = num.toString();
    }

    getData(): any[] {
        const data = SampleScatterData.create();
        return data;
    }
}