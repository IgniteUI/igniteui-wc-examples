import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcColumnFragmentModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcValueOverlayModule } from 'igniteui-webcomponents-charts';
import { IgcFinalValueLayerModule } from 'igniteui-webcomponents-charts';
import { IgcCrosshairLayerModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcCrosshairLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcFinalValueLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcValueOverlayComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcColumnFragmentModule,
    IgcColumnSeriesModule,
    IgcValueOverlayModule,
    IgcFinalValueLayerModule,
    IgcCrosshairLayerModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
    <span class="option-item">Annotations: </span>
    <label class="option-item"><input id="finalValueInput" type="checkbox"></input>Final Value</label>
    <label class="option-item"><input id="crosshairsInput" type="checkbox"></input>Crosshairs</label>
    <!-- <label class="option-item"><input id="valueOverlayInput" type="checkbox"></input>Value Overlay </label> -->
    </div>
    <div class="chart" style="height: calc(100% - 40px)">
        <igc-data-chart id="chart" width="100%" height="100%"
        is-horizontal-zoom-enabled="true"
        is-vertical-zoom-enabled="true">
            <igc-category-x-axis id="xAxis" name="xAxis" interval="1"></igc-category-x-axis>
            <igc-numeric-y-axis id="yAxis" name="yAxis" interval="20" minimum-value="70" maximum-value="110"
            label-location="OutsideRight"></igc-numeric-y-axis>
            <igc-column-series name="series" x-axis-name="xAxis" y-axis-name="yAxis"
            value-member-path="temperature"></igc-column-series>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartAxisAnnotations extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartAxisAnnotations");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartAxisAnnotations); return this;
    }

    private chart: IgcDataChartComponent;
    public targetSeries: IgcColumnSeriesComponent;
    public crosshairLayer: IgcCrosshairLayerComponent;
    public finalValueLayer: IgcFinalValueLayerComponent;
    public valueOverlay: IgcValueOverlayComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        const xAxis = document.getElementById("xAxis") as IgcCategoryXAxisComponent;
        xAxis.formatLabel = this.formatDateLabel;

        this.valueOverlay = new IgcValueOverlayComponent();
        this.valueOverlay.name = "valueOverlay";
        this.valueOverlay.thickness = 3;
        this.valueOverlay.value = 85;
        this.valueOverlay.brush = "Orange";
        this.valueOverlay.isAxisAnnotationEnabled = true;
        this.valueOverlay.axisName = "yAxis";
        this.chart.series.add(this.valueOverlay);

        this.crosshairLayer = new IgcCrosshairLayerComponent();
        this.crosshairLayer.name = "crosshair";
        this.crosshairLayer.isAxisAnnotationEnabled = true;
        this.crosshairLayer.yAxisAnnotationInterpolatedValuePrecision = 0;
        this.chart.series.add(this.crosshairLayer);

        this.finalValueLayer = new IgcFinalValueLayerComponent();
        this.finalValueLayer.name = "finalValue";
        this.chart.series.add(this.finalValueLayer);

        const finalValueInput = document.getElementById("finalValueInput") as HTMLInputElement;
        finalValueInput.checked = true;
        finalValueInput.addEventListener("change", this.onFinalValueChange);

        const crosshairsInput = document.getElementById("crosshairsInput") as HTMLInputElement;
        crosshairsInput.checked = true;
        crosshairsInput.addEventListener("change", this.onCrosshairChange);

        /*const valueOverlayInput = document.getElementById("valueOverlayInput") as HTMLInputElement;
        valueOverlayInput.checked = true;
        valueOverlayInput.addEventListener("change", this.onValueOverlayChange);*/
    }

    public onFinalValueChange = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleFinalValues(isChecked);
    }

    public onValueOverlayChange = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleValueOverlay(isChecked);
    }

    public onCrosshairChange = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleCrosshairs(isChecked);
    }

    public toggleCrosshairs(isChecked: boolean) {
        this.toggleSeries(this.crosshairLayer, isChecked);
    }

    public toggleFinalValues(isChecked: boolean) {
        this.toggleSeries(this.finalValueLayer, isChecked);
    }

    public toggleValueOverlay(isChecked: boolean) {
        this.valueOverlay.isAxisAnnotationEnabled = isChecked;
        this.toggleSeries(this.valueOverlay, isChecked);
    }

    public toggleSeries(series: IgcSeriesComponent, isChecked: boolean) {
        if (isChecked) {
            this.chart.series.add(series);
        }
        else {
            this.chart.series.remove(series);
        }
    }

    public formatDateLabel(item: any): string {
        const months = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];
        return months[item.date.getMonth()];
    }

    getData(): any[] {
        const year: number = new Date().getFullYear();
        const data = [
            { temperature: 74, date: new Date(year, 0, 1) },
            { temperature: 74, date: new Date(year, 1, 1) },
            { temperature: 76, date: new Date(year, 2, 1) },
            { temperature: 78, date: new Date(year, 3, 1) },
            { temperature: 83, date: new Date(year, 4, 1) },
            { temperature: 87, date: new Date(year, 5, 1) },
            { temperature: 94, date: new Date(year, 6, 1) },
            { temperature: 97, date: new Date(year, 7, 1) },
            { temperature: 93, date: new Date(year, 8, 1) },
            { temperature: 86, date: new Date(year, 9, 1) },
            { temperature: 81, date: new Date(year, 10, 1) },
            { temperature: 79, date: new Date(year, 11, 1) },
        ];

        return data;
    }
}