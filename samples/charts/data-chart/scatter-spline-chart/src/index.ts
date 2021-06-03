import { DataForGermanyItem, DataForGermany, DataForFranceItem, DataForFrance, DataForNorwayItem, DataForNorway } from './SampleData';

import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcScatterSplineSeriesComponent } from 'igniteui-webcomponents-charts';
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
    private scatterSplineSeries1: IgcScatterSplineSeriesComponent
    private scatterSplineSeries2: IgcScatterSplineSeriesComponent
    private scatterSplineSeries3: IgcScatterSplineSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var scatterSplineSeries1 = this.scatterSplineSeries1 = document.getElementById('ScatterSplineSeries1') as IgcScatterSplineSeriesComponent;
        var scatterSplineSeries2 = this.scatterSplineSeries2 = document.getElementById('ScatterSplineSeries2') as IgcScatterSplineSeriesComponent;
        var scatterSplineSeries3 = this.scatterSplineSeries3 = document.getElementById('ScatterSplineSeries3') as IgcScatterSplineSeriesComponent;

        chart.legend = this.legend
        scatterSplineSeries1.xAxis = this.xAxis
        scatterSplineSeries1.yAxis = this.yAxis
        scatterSplineSeries1.dataSource = this.dataForGermany
        scatterSplineSeries2.xAxis = this.xAxis
        scatterSplineSeries2.yAxis = this.yAxis
        scatterSplineSeries2.dataSource = this.dataForFrance
        scatterSplineSeries3.xAxis = this.xAxis
        scatterSplineSeries3.yAxis = this.yAxis
        scatterSplineSeries3.dataSource = this.dataForNorway
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
