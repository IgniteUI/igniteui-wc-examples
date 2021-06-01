import { DataItem, Data } from './SampleData';

import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcRangeColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcLegendModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private series1: IgcRangeColumnSeriesComponent
    private series2: IgcRangeColumnSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcRangeColumnSeriesComponent;
        var series2 = this.series2 = document.getElementById('series2') as IgcRangeColumnSeriesComponent;

        chart.legend = this.legend
        xAxis.dataSource = this.data
        series1.xAxis = this.xAxis
        series1.yAxis = this.yAxis
        series1.dataSource = this.data
        series2.xAxis = this.xAxis
        series2.yAxis = this.yAxis
        series2.dataSource = this.data
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
