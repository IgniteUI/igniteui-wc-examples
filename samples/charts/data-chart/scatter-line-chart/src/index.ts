import { DataForGermanyItem, DataForGermany, DataForFranceItem, DataForFrance, DataForNorwayItem, DataForNorway } from './SampleData';

import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcScatterLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private scatterLineSeries1: IgcScatterLineSeriesComponent
    private scatterLineSeries2: IgcScatterLineSeriesComponent
    private scatterLineSeries3: IgcScatterLineSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var scatterLineSeries1 = this.scatterLineSeries1 = document.getElementById('ScatterLineSeries1') as IgcScatterLineSeriesComponent;
        var scatterLineSeries2 = this.scatterLineSeries2 = document.getElementById('ScatterLineSeries2') as IgcScatterLineSeriesComponent;
        var scatterLineSeries3 = this.scatterLineSeries3 = document.getElementById('ScatterLineSeries3') as IgcScatterLineSeriesComponent;

        chart.legend = this.legend
        scatterLineSeries1.xAxis = this.xAxis
        scatterLineSeries1.yAxis = this.yAxis
        scatterLineSeries1.dataSource = this.dataForGermany
        scatterLineSeries2.xAxis = this.xAxis
        scatterLineSeries2.yAxis = this.yAxis
        scatterLineSeries2.dataSource = this.dataForFrance
        scatterLineSeries3.xAxis = this.xAxis
        scatterLineSeries3.yAxis = this.yAxis
        scatterLineSeries3.dataSource = this.dataForNorway
   }

    private _dataForGermany: DataForGermany = null;
    public get dataForGermany(): DataForGermany {
        if (this._dataForGermany == null)
        {
            this._dataForGermany = new DataForGermany();
        }
        return this._dataForGermany;
    }
    
    private _dataForFrance: DataForFrance = null;
    public get dataForFrance(): DataForFrance {
        if (this._dataForFrance == null)
        {
            this._dataForFrance = new DataForFrance();
        }
        return this._dataForFrance;
    }
    
    private _dataForNorway: DataForNorway = null;
    public get dataForNorway(): DataForNorway {
        if (this._dataForNorway == null)
        {
            this._dataForNorway = new DataForNorway();
        }
        return this._dataForNorway;
    }
    
}

new Sample();
