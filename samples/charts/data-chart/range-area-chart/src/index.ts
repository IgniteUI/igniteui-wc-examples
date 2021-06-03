import { DataItem, Data } from './SampleData';

import { IgcDataChartCoreModule, IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcRangeAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private series: IgcRangeAreaSeriesComponent

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var series = this.series = document.getElementById('series') as IgcRangeAreaSeriesComponent;

        xAxis.dataSource = this.data
        series.xAxis = this.xAxis
        series.yAxis = this.yAxis
        series.dataSource = this.data
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
