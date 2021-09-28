import { DataItem, Data } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarSplineAreaSeriesComponent } from 'igniteui-webcomponents-charts';

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
    private polarSplineAreaSeries1: IgcPolarSplineAreaSeriesComponent
    private polarSplineAreaSeries2: IgcPolarSplineAreaSeriesComponent

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarSplineAreaSeries1 = this.polarSplineAreaSeries1 = document.getElementById('PolarSplineAreaSeries1') as IgcPolarSplineAreaSeriesComponent;
        var polarSplineAreaSeries2 = this.polarSplineAreaSeries2 = document.getElementById('PolarSplineAreaSeries2') as IgcPolarSplineAreaSeriesComponent;

        polarSplineAreaSeries1.angleAxis = this.angleAxis
        polarSplineAreaSeries1.radiusAxis = this.radiusAxis
        polarSplineAreaSeries1.dataSource = this.data
        polarSplineAreaSeries2.dataSource = this.data
        polarSplineAreaSeries2.angleAxis = this.angleAxis
        polarSplineAreaSeries2.radiusAxis = this.radiusAxis
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
