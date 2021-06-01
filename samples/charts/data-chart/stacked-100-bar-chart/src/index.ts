import { DataItem, Data } from './SampleData';

import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartStackedModule, IgcStackedFragmentSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcStacked100BarSeriesComponent, IgcStackedFragmentSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private stacked100BarSeries: IgcStacked100BarSeriesComponent
    private s1: IgcStackedFragmentSeriesComponent
    private s2: IgcStackedFragmentSeriesComponent
    private s3: IgcStackedFragmentSeriesComponent
    private s4: IgcStackedFragmentSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var stacked100BarSeries = this.stacked100BarSeries = document.getElementById('Stacked100BarSeries') as IgcStacked100BarSeriesComponent;
        var s1 = this.s1 = document.getElementById('s1') as IgcStackedFragmentSeriesComponent;
        var s2 = this.s2 = document.getElementById('s2') as IgcStackedFragmentSeriesComponent;
        var s3 = this.s3 = document.getElementById('s3') as IgcStackedFragmentSeriesComponent;
        var s4 = this.s4 = document.getElementById('s4') as IgcStackedFragmentSeriesComponent;

        chart.legend = this.legend
        yAxis.dataSource = this.data
        stacked100BarSeries.xAxis = this.xAxis
        stacked100BarSeries.yAxis = this.yAxis
        stacked100BarSeries.dataSource = this.data
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
