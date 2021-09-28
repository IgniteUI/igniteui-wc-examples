import { DataItem, Data } from './SampleData';
import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarLineSeriesComponent } from 'igniteui-webcomponents-charts';

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
    private polarLineSeries1: IgcPolarLineSeriesComponent
    private polarLineSeries2: IgcPolarLineSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarLineSeries1 = this.polarLineSeries1 = document.getElementById('PolarLineSeries1') as IgcPolarLineSeriesComponent;
        var polarLineSeries2 = this.polarLineSeries2 = document.getElementById('PolarLineSeries2') as IgcPolarLineSeriesComponent;

        chart.legend = this.legend
        polarLineSeries1.angleAxis = this.angleAxis
        polarLineSeries1.radiusAxis = this.radiusAxis
        polarLineSeries1.dataSource = this.data
        polarLineSeries2.dataSource = this.data
        polarLineSeries2.angleAxis = this.angleAxis
        polarLineSeries2.radiusAxis = this.radiusAxis
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
