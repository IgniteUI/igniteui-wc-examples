import { SampleScatterData } from './SampleScatterData';
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

export class DataChartTypeScatterAreaSeries {

    private chart: IgcDataChartComponent;
    public colorScale: IgcCustomPaletteColorScaleComponent;
    public scaleMinLabel: HTMLLabelElement;
    public scaleMaxLabel: HTMLLabelElement;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.colorScale = new IgcCustomPaletteColorScaleComponent();
        this.colorScale.interpolationMode = ColorScaleInterpolationMode.InterpolateHSV;
        this.colorScale.minimumValue = -2;
        this.colorScale.maximumValue = 2;
        this.colorScale.palette = [
            '#8670CB', '#513E8C', '#003F5E',
            '#0C6B99', '#4AC4FF', '#B5CC2E',
            '#FFD034', '#FC8612', '#ED4840'
        ];
        const series = document.getElementById('series') as IgcScatterAreaSeriesComponent;
        series.colorScale = this.colorScale;

        const scaleModeSelect = document.getElementById('scaleModeSelect') as HTMLSelectElement;
        scaleModeSelect.value = 'InterpolateHSV';
        scaleModeSelect!.addEventListener('change', this.seriesScaleModeChanged);

        this.scaleMinLabel = document.getElementById('scaleMinLabel') as HTMLLabelElement;
        this.scaleMinLabel.textContent = '-2';

        const scaleMinSlider = document.getElementById('scaleMinSlider') as HTMLInputElement;
        scaleMinSlider.value = '-2';
        scaleMinSlider!.addEventListener('change', this.seriesScaleMinChanged);

        this.scaleMaxLabel = document.getElementById('scaleMaxLabel') as HTMLLabelElement;
        this.scaleMaxLabel.textContent = '2';

        const scaleMaxSlider = document.getElementById('scaleMaxSlider') as HTMLInputElement;
        scaleMaxSlider.value = '2';
        scaleMaxSlider!.addEventListener('change', this.seriesScaleMaxChanged);
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

let sample = new DataChartTypeScatterAreaSeries();
