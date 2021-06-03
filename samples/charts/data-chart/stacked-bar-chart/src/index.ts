import { DataItem, Data, CalloutDataItem, CalloutData } from './SampleData';

import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartStackedModule, IgcStackedFragmentSeriesModule, IgcCalloutLayerModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcStackedBarSeriesComponent, IgcStackedFragmentSeriesComponent, IgcCalloutLayerComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule,
    IgcCalloutLayerModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private stackedBarSeries: IgcStackedBarSeriesComponent
    private s1: IgcStackedFragmentSeriesComponent
    private s2: IgcStackedFragmentSeriesComponent
    private s3: IgcStackedFragmentSeriesComponent
    private s4: IgcStackedFragmentSeriesComponent
    private calloutLayer: IgcCalloutLayerComponent

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var stackedBarSeries = this.stackedBarSeries = document.getElementById('StackedBarSeries') as IgcStackedBarSeriesComponent;
        var s1 = this.s1 = document.getElementById('s1') as IgcStackedFragmentSeriesComponent;
        var s2 = this.s2 = document.getElementById('s2') as IgcStackedFragmentSeriesComponent;
        var s3 = this.s3 = document.getElementById('s3') as IgcStackedFragmentSeriesComponent;
        var s4 = this.s4 = document.getElementById('s4') as IgcStackedFragmentSeriesComponent;
        var calloutLayer = this.calloutLayer = document.getElementById('CalloutLayer') as IgcCalloutLayerComponent;

        yAxis.dataSource = this.data
        stackedBarSeries.xAxis = this.xAxis
        stackedBarSeries.yAxis = this.yAxis
        stackedBarSeries.dataSource = this.data
        calloutLayer.dataSource = this.calloutData
   }

    private _data: Data = null;
    public get data(): Data {
        if (this._data == null)
        {
            this._data = new Data();
        }
        return this._data;
    }
    
    private _calloutData: CalloutData = null;
    public get calloutData(): CalloutData {
        if (this._calloutData == null)
        {
            this._calloutData = new CalloutData();
        }
        return this._calloutData;
    }
    
}

new Sample();
