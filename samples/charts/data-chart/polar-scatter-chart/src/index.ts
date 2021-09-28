import { DataItem, Data } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarScatterSeriesComponent } from 'igniteui-webcomponents-charts';

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
    private polarScatterSeries1: IgcPolarScatterSeriesComponent
    private polarScatterSeries2: IgcPolarScatterSeriesComponent

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarScatterSeries1 = this.polarScatterSeries1 = document.getElementById('PolarScatterSeries1') as IgcPolarScatterSeriesComponent;
        var polarScatterSeries2 = this.polarScatterSeries2 = document.getElementById('PolarScatterSeries2') as IgcPolarScatterSeriesComponent;

        polarScatterSeries1.angleAxis = this.angleAxis
        polarScatterSeries1.radiusAxis = this.radiusAxis
        polarScatterSeries1.dataSource = this.data
        polarScatterSeries2.dataSource = this.data
        polarScatterSeries2.angleAxis = this.angleAxis
        polarScatterSeries2.radiusAxis = this.radiusAxis
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
