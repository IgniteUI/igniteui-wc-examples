import { DataItem, Data, CalloutsItem, Callouts } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule, IgcAnnotationLayerProxyModule, IgcCalloutLayerModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcBarSeriesComponent, IgcCalloutLayerComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule,
    IgcAnnotationLayerProxyModule,
    IgcCalloutLayerModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private barSeries1: IgcBarSeriesComponent
    private calloutLayer1: IgcCalloutLayerComponent

    constructor() {
        var chart = this.chart = document.getElementById('Chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var barSeries1 = this.barSeries1 = document.getElementById('BarSeries1') as IgcBarSeriesComponent;
        var calloutLayer1 = this.calloutLayer1 = document.getElementById('CalloutLayer1') as IgcCalloutLayerComponent;

        yAxis.dataSource = this.data
        barSeries1.xAxis = this.xAxis
        barSeries1.yAxis = this.yAxis
        barSeries1.dataSource = this.data
        calloutLayer1.dataSource = this.callouts
    }

    private _data: Data = null;
    public get data(): Data {
        if (this._data == null)
        {
            this._data = new Data();
        }
        return this._data;
    }
    
    private _callouts: Callouts = null;
    public get callouts(): Callouts {
        if (this._callouts == null)
        {
            this._callouts = new Callouts();
        }
        return this._callouts;
    }
    



}

new Sample();
