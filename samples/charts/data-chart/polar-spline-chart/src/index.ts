import { DataItem, Data } from './SampleData';

import { IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarSplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private angleAxis: IgcNumericAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private polarSplineSeries1: IgcPolarSplineSeriesComponent
    private polarSplineSeries2: IgcPolarSplineSeriesComponent

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarSplineSeries1 = this.polarSplineSeries1 = document.getElementById('PolarSplineSeries1') as IgcPolarSplineSeriesComponent;
        var polarSplineSeries2 = this.polarSplineSeries2 = document.getElementById('PolarSplineSeries2') as IgcPolarSplineSeriesComponent;

        polarSplineSeries1.angleAxis = this.angleAxis
        polarSplineSeries1.radiusAxis = this.radiusAxis
        polarSplineSeries1.dataSource = this.data
        polarSplineSeries2.dataSource = this.data
        polarSplineSeries2.angleAxis = this.angleAxis
        polarSplineSeries2.radiusAxis = this.radiusAxis
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
