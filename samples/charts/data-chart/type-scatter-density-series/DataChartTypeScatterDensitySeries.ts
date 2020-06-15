import { SampleBase } from "../../../sample-base";
import { SampleDensityData } from '../utilities/SampleDensityData';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcHighDensityScatterSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcHighDensityScatterSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisModule } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcHighDensityScatterSeriesModule,
    IgcNumericYAxisModule,
    IgcNumericXAxisModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="option-label" id="heatMinLabel">Minimum Value:</span>
        <input class="slider" id="heatMinSlider" type="range" min="0" max="30" step="1">
        </input>
        <span class="option-label" id="heatMaxLabel">Maximum Value:</span>
        <input class="slider" id="heatMaxSlider" type="range" min="0" max="30" step="1">
        </input>
        <span class="option-label" id="seriesResLabel">Series Resolution:</span>
        <input class="slider" id="seriesResSlider" type="range" min="0" max="10" step="1">
        </input>
        <span class="option-label" id="pointExtentLabel">Point Extent:</span>
        <input class="slider" id="pointExtentSlider" type="range" min="1" max="5" step="1">
        </input>
        <span class="option-label">Use Brute Force</span>
        <input class="checkbox" id="bruteForceInput" type="checkbox"></input>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true">

            <igc-numeric-x-axis name="xAxis" abbreviate-large-numbers="true">
            </igc-numeric-x-axis>
            <igc-numeric-y-axis name="yAxis" abbreviate-large-numbers="true">
            </igc-numeric-y-axis>

            <igc-high-density-scatter-series
                id="series"
                x-axis-name="xAxis"
                y-axis-name="yAxis"
                x-member-path="X"
                y-member-path="Y"
                heat-minimum-color="Blue"
                heat-maximum-color="Red"
                mouse-over-enabled="true"
                progressive-load="true"
                show-default-tooltip="true"
                title="High Density Data">
            </igc-high-density-scatter-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeScatterDensitySeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeScatterDensitySeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeScatterDensitySeries); return this;
    }

    private chart: IgcDataChartComponent;
    private series: IgcHighDensityScatterSeriesComponent;
    public seriesHeatMin = 1;
    public seriesHeatMax = 25;
    public seriesResolution = 3;
    public seriesPointExtent = 1;
    public hdUseBruteForce = false;

    public heatMinLabel: HTMLSpanElement;
    public heatMaxLabel: HTMLSpanElement;
    public seriesResLabel: HTMLSpanElement;
    public pointExtentLabel: HTMLSpanElement;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleDensityData.create();

        this.series = document.getElementById("series") as IgcHighDensityScatterSeriesComponent;
        this.series.heatMaximum = this.seriesHeatMax;
        this.series.heatMinimum = this.seriesHeatMin;
        this.series.pointExtent = this.seriesPointExtent;
        this.series.useBruteForce = this.hdUseBruteForce;
        this.series.resolution = this.seriesResolution;

        this.heatMinLabel = document.getElementById("heatMinLabel") as HTMLSpanElement;
        this.heatMinLabel.innerText = "Minimum Value: " + this.seriesHeatMin.toString();

        const heatMinSlider = document.getElementById("heatMinSlider") as HTMLInputElement;
        heatMinSlider.value = this.seriesHeatMin.toString();
        heatMinSlider.addEventListener("change", this.seriesMinChanged);

        this.heatMaxLabel = document.getElementById("heatMaxLabel") as HTMLSpanElement;
        this.heatMaxLabel.innerText = "Maximum Value: " + this.seriesHeatMax.toString();

        const heatMaxSlider = document.getElementById("heatMaxSlider") as HTMLInputElement;
        heatMaxSlider.value = this.seriesHeatMax.toString();
        heatMaxSlider.addEventListener("change", this.seriesMaxChanged);

        this.seriesResLabel = document.getElementById("seriesResLabel") as HTMLSpanElement;
        this.seriesResLabel.innerText = "Series Resolution: " + this.seriesResolution.toString();

        const seriesResSlider = document.getElementById("seriesResSlider") as HTMLInputElement;
        seriesResSlider.value = this.seriesResolution.toString();
        seriesResSlider.addEventListener("change", this.seriesResolutionChanged);

        this.pointExtentLabel = document.getElementById("pointExtentLabel") as HTMLSpanElement;
        this.pointExtentLabel.innerText = "Point Extent: " + this.seriesPointExtent.toString();

        const pointExtentSlider = document.getElementById("pointExtentSlider") as HTMLInputElement;
        pointExtentSlider.value = this.seriesPointExtent.toString();
        pointExtentSlider.addEventListener("change", this.seriesExtentChanged);

        const bruteForceInput = document.getElementById("bruteForceInput") as HTMLInputElement;
        bruteForceInput.checked = this.hdUseBruteForce;
        bruteForceInput.addEventListener("change", this.useBruteForceChanged);
    }

    disconnectedCallback() {
        this.chart.series.clear();
        this.series = null;
    }

    public seriesMinChanged = (e: any) => {
        this.seriesHeatMin = e.target.value;
        this.series.heatMinimum = this.seriesHeatMin;
        this.heatMinLabel.innerText = "Minimum Value: " + this.seriesHeatMin.toString();
    }

    public seriesMaxChanged = (e: any) => {
        this.seriesHeatMax = e.target.value;
        this.series.heatMaximum = this.seriesHeatMax;
        this.heatMaxLabel.innerText = "Maximum Value: " + this.seriesHeatMax.toString();
    }

    public seriesResolutionChanged = (e: any) => {
        this.seriesResolution = e.target.value;
        this.series.resolution = this.seriesResolution;
        this.seriesResLabel.innerText = "Series Resolution: " + this.seriesResolution.toString();
    }

    public seriesExtentChanged = (e: any) => {
        this.seriesPointExtent = e.target.value;
        this.series.pointExtent = this.seriesPointExtent;
        this.pointExtentLabel.innerText = "Point Extent: " + this.seriesPointExtent.toString();
    }

    public useBruteForceChanged = (e: any) => {
        this.hdUseBruteForce = e.target.checked;
        this.series.useBruteForce = this.hdUseBruteForce;
    }
}