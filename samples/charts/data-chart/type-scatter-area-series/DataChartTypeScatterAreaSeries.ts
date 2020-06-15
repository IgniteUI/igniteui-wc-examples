import { SampleBase } from "../../../sample-base";
import { SampleScatterData } from "../utilities/SampleScatterData";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcCustomPaletteColorScaleModule } from 'igniteui-webcomponents-charts';
import { IgcCustomPaletteColorScaleComponent } from 'igniteui-webcomponents-charts';
import { ColorScaleInterpolationMode } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcScatterAreaSeriesModule,
    IgcCustomPaletteColorScaleModule
);

let templateHTML = `
<div class="sample-container">
    <div className="options">
        <span class="option-label">Scale Mode: </span>
        <select id="scaleModeSelect">
            <option>Select</option>
            <option>InterpolateRGB</option>
            <option>InterpolateHSV</option>
        </select>
        <label class="option-label">Minimum: </label>
        <label class="option-value" id="scaleMinLabel">
        </label>
        <input class="slider" id="scaleMinSlider"
            type="range" min="-5" max="0" step="1">
        </input>

        <label class="option-label">Maximum: </label>
        <label class="option-value" id="scaleMaxLabel">
        </label>
        <input class="slider" id="scaleMaxSlider"
            type="range" min="0" max="5" step="1">
        </input>

    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            chart-title="MAGNETIC FIELD DISTRIBUTION"
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

            <igc-scatter-area-series
                id="series"
                x-axis-name="xAxis1"
                y-axis-name="yAxis1"
                x-member-path="X"
                y-member-path="Y"
                color-member-path="Z">
            </igc-scatter-area-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeScatterAreaSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeScatterAreaSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeScatterAreaSeries); return this;
    }

    private chart: IgcDataChartComponent;
    public colorScale: IgcCustomPaletteColorScaleComponent;
    public scaleMinLabel: HTMLLabelElement;
    public scaleMaxLabel: HTMLLabelElement;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.colorScale = new IgcCustomPaletteColorScaleComponent();
        this.colorScale.interpolationMode = ColorScaleInterpolationMode.InterpolateHSV;
        this.colorScale.minimumValue = -2;
        this.colorScale.maximumValue = 2;
        this.colorScale.palette = [
            "#8670CB", "#513E8C", "#003F5E",
            "#0C6B99", "#4AC4FF", "#B5CC2E",
            "#FFD034", "#FC8612", "#ED4840"
        ];
        const series = document.getElementById("series") as IgcScatterAreaSeriesComponent;
        series.colorScale = this.colorScale;

        const scaleModeSelect = document.getElementById("scaleModeSelect") as HTMLSelectElement;
        scaleModeSelect.value = "InterpolateHSV";
        scaleModeSelect.addEventListener("change", this.seriesScaleModeChanged);

        this.scaleMinLabel = document.getElementById("scaleMinLabel") as HTMLLabelElement;
        this.scaleMinLabel.textContent = "-2";

        const scaleMinSlider = document.getElementById("scaleMinSlider") as HTMLInputElement;
        scaleMinSlider.value = "-2";
        scaleMinSlider.addEventListener("change", this.seriesScaleMinChanged);

        this.scaleMaxLabel = document.getElementById("scaleMaxLabel") as HTMLLabelElement;
        this.scaleMaxLabel.textContent = "2";

        const scaleMaxSlider = document.getElementById("scaleMaxSlider") as HTMLInputElement;
        scaleMaxSlider.value = "2";
        scaleMaxSlider.addEventListener("change", this.seriesScaleMaxChanged);

    }

    public seriesScaleMinChanged = (e: any) => {
        const num: number = e.target.value.toString();
        this.colorScale.minimumValue = num;
        this.scaleMinLabel.textContent = num.toString();
    }

    public seriesScaleMaxChanged = (e: any) => {
        const num: number = e.target.value.toString();
        this.colorScale.maximumValue = num;
        this.scaleMaxLabel.textContent = num.toString();
    }

    public seriesScaleModeChanged = (e: any) => {
        const mode = e.target.value.toString();
        this.colorScale.interpolationMode = mode;
    }

    getData(): any[] {
        const data = SampleScatterData.create();
        return data;
    }
}