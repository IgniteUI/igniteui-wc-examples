
import { SampleDensityData } from './SampleDensityData';

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


export class DataChartTypeScatterDensitySeries {






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




        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleDensityData.create();

        this.series = document.getElementById('series') as IgcHighDensityScatterSeriesComponent;
        this.series.heatMaximum = this.seriesHeatMax;
        this.series.heatMinimum = this.seriesHeatMin;
        this.series.pointExtent = this.seriesPointExtent;
        this.series.useBruteForce = this.hdUseBruteForce;
        this.series.resolution = this.seriesResolution;

        this.heatMinLabel = document.getElementById('heatMinLabel') as HTMLSpanElement;
        this.heatMinLabel.innerText = 'Minimum Value: ' + this.seriesHeatMin.toString();

        const heatMinSlider = document.getElementById('heatMinSlider') as HTMLInputElement;
        heatMinSlider.value = this.seriesHeatMin.toString();
        heatMinSlider!.addEventListener('change', this.seriesMinChanged);

        this.heatMaxLabel = document.getElementById('heatMaxLabel') as HTMLSpanElement;
        this.heatMaxLabel.innerText = 'Maximum Value: ' + this.seriesHeatMax.toString();

        const heatMaxSlider = document.getElementById('heatMaxSlider') as HTMLInputElement;
        heatMaxSlider.value = this.seriesHeatMax.toString();
        heatMaxSlider!.addEventListener('change', this.seriesMaxChanged);

        this.seriesResLabel = document.getElementById('seriesResLabel') as HTMLSpanElement;
        this.seriesResLabel.innerText = 'Series Resolution: ' + this.seriesResolution.toString();

        const seriesResSlider = document.getElementById('seriesResSlider') as HTMLInputElement;
        seriesResSlider.value = this.seriesResolution.toString();
        seriesResSlider!.addEventListener('change', this.seriesResolutionChanged);

        this.pointExtentLabel = document.getElementById('pointExtentLabel') as HTMLSpanElement;
        this.pointExtentLabel.innerText = 'Point Extent: ' + this.seriesPointExtent.toString();

        const pointExtentSlider = document.getElementById('pointExtentSlider') as HTMLInputElement;
        pointExtentSlider.value = this.seriesPointExtent.toString();
        pointExtentSlider!.addEventListener('change', this.seriesExtentChanged);

        const bruteForceInput = document.getElementById('bruteForceInput') as HTMLInputElement;
        bruteForceInput.checked = this.hdUseBruteForce;
        bruteForceInput!.addEventListener('change', this.useBruteForceChanged);
    }

    disconnectedCallback() {
        this.chart.series.clear();
        this.series = null;
    }

    public seriesMinChanged = (e: any) => {
        this.seriesHeatMin = e.target.value;
        this.series.heatMinimum = this.seriesHeatMin;
        this.heatMinLabel.innerText = 'Minimum Value: ' + this.seriesHeatMin.toString();
    }

    public seriesMaxChanged = (e: any) => {
        this.seriesHeatMax = e.target.value;
        this.series.heatMaximum = this.seriesHeatMax;
        this.heatMaxLabel.innerText = 'Maximum Value: ' + this.seriesHeatMax.toString();
    }

    public seriesResolutionChanged = (e: any) => {
        this.seriesResolution = e.target.value;
        this.series.resolution = this.seriesResolution;
        this.seriesResLabel.innerText = 'Series Resolution: ' + this.seriesResolution.toString();
    }

    public seriesExtentChanged = (e: any) => {
        this.seriesPointExtent = e.target.value;
        this.series.pointExtent = this.seriesPointExtent;
        this.pointExtentLabel.innerText = 'Point Extent: ' + this.seriesPointExtent.toString();
    }

    public useBruteForceChanged = (e: any) => {
        this.hdUseBruteForce = e.target.checked;
        this.series.useBruteForce = this.hdUseBruteForce;
    }
}

let sample = new DataChartTypeScatterDensitySeries();