import { DataItem, Data } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcWaterfallSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private waterfallSeries1: IgcWaterfallSeriesComponent
    private waterfallSeries2: IgcWaterfallSeriesComponent

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var waterfallSeries1 = this.waterfallSeries1 = document.getElementById('WaterfallSeries1') as IgcWaterfallSeriesComponent;
        var waterfallSeries2 = this.waterfallSeries2 = document.getElementById('WaterfallSeries2') as IgcWaterfallSeriesComponent;

        xAxis.dataSource = this.data
        waterfallSeries1.xAxis = this.xAxis
        waterfallSeries1.yAxis = this.yAxis
        waterfallSeries1.dataSource = this.data
        waterfallSeries2.xAxis = this.xAxis
        waterfallSeries2.yAxis = this.yAxis
        waterfallSeries2.dataSource = this.data
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
