
import { SampleScatterData } from './SampleScatterData';

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


export class DataChartTypeScatterContourSeries {


    
    
        

    private chart: IgcDataChartComponent;
    private series: IgcScatterContourSeriesComponent;
    public thicknessLabel: HTMLLabelElement;
    public contoursLabel: HTMLLabelElement;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        const brushScale = new IgcValueBrushScaleComponent();
        brushScale.minimumValue = -2;
        brushScale.maximumValue = 2;
        brushScale.brushes = [
            '#8670CB', '#513E8C', '#003F5E',
            '#0C6B99', '#4AC4FF', '#B5CC2E',
            '#FFD034', '#FC8612', '#ED4840'
        ];
        this.series = document.getElementById('series') as IgcScatterContourSeriesComponent;
        this.series.fillScale = brushScale;

        this.thicknessLabel = document.getElementById('thicknessLabel') as HTMLLabelElement;
        this.thicknessLabel.textContent = '5';

        const thicknessSlider = document.getElementById('thicknessSlider') as HTMLInputElement;
        thicknessSlider.value = '5';
        thicknessSlider.addEventListener('change', this.onSeriesThicknessChanged);

        this.contoursLabel = document.getElementById('contoursLabel') as HTMLLabelElement;
        this.contoursLabel.textContent = '10';

        const contoursSlider = document.getElementById('contoursSlider') as HTMLInputElement;
        contoursSlider.value = '10';
        contoursSlider.addEventListener('change', this.onSeriesContoursChanged);
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

let sample = new DataChartTypeScatterContourSeries();