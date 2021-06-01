import { DataItem, Data } from './SampleData';

import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcNumericAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private polarAreaSeries1: IgcPolarAreaSeriesComponent
    private polarAreaSeries2: IgcPolarAreaSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarAreaSeries1 = this.polarAreaSeries1 = document.getElementById('PolarAreaSeries1') as IgcPolarAreaSeriesComponent;
        var polarAreaSeries2 = this.polarAreaSeries2 = document.getElementById('PolarAreaSeries2') as IgcPolarAreaSeriesComponent;

        chart.legend = this.legend
        polarAreaSeries1.angleAxis = this.angleAxis
        polarAreaSeries1.radiusAxis = this.radiusAxis
        polarAreaSeries1.dataSource = this.data
        polarAreaSeries2.dataSource = this.data
        polarAreaSeries2.angleAxis = this.angleAxis
        polarAreaSeries2.radiusAxis = this.radiusAxis
   }

    private _data: Data = null;
    public get data(): Data {
        if (this._data == null)
        {
            this._data = new Data();
        }
        return this._data;
    }
    
}

new Sample();
