import { DataItem, Data } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartCategoryCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcBarSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private barSeries1: IgcBarSeriesComponent

    constructor() {
        var chart = this.chart = document.getElementById('Chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var barSeries1 = this.barSeries1 = document.getElementById('BarSeries1') as IgcBarSeriesComponent;

        yAxis.dataSource = this.data
        barSeries1.xAxis = this.xAxis
        barSeries1.yAxis = this.yAxis
        barSeries1.dataSource = this.data
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
