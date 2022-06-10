import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcScatterSplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { HealthDataForGermanyItem, HealthDataForGermany } from './HealthDataForGermany';
import { HealthDataForFranceItem, HealthDataForFrance } from './HealthDataForFrance';
import { HealthDataForNorwayItem, HealthDataForNorway } from './HealthDataForNorway';

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

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var scatterSplineSeries1 = this.scatterSplineSeries1 = document.getElementById('ScatterSplineSeries1') as IgcScatterSplineSeriesComponent;
        var scatterSplineSeries2 = this.scatterSplineSeries2 = document.getElementById('ScatterSplineSeries2') as IgcScatterSplineSeriesComponent;
        var scatterSplineSeries3 = this.scatterSplineSeries3 = document.getElementById('ScatterSplineSeries3') as IgcScatterSplineSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend
            scatterSplineSeries1.xAxis = this.xAxis
            scatterSplineSeries1.yAxis = this.yAxis
            scatterSplineSeries1.dataSource = this.healthDataForGermany
            scatterSplineSeries2.xAxis = this.xAxis
            scatterSplineSeries2.yAxis = this.yAxis
            scatterSplineSeries2.dataSource = this.healthDataForFrance
            scatterSplineSeries3.xAxis = this.xAxis
            scatterSplineSeries3.yAxis = this.yAxis
            scatterSplineSeries3.dataSource = this.healthDataForNorway
        }
        this._bind();
    }

    private _healthDataForGermany: HealthDataForGermany = null;
    public get healthDataForGermany(): HealthDataForGermany {
        if (this._healthDataForGermany == null)
        {
            this._healthDataForGermany = new HealthDataForGermany();
        }
        return this._healthDataForGermany;
    }
    
    private _healthDataForFrance: HealthDataForFrance = null;
    public get healthDataForFrance(): HealthDataForFrance {
        if (this._healthDataForFrance == null)
        {
            this._healthDataForFrance = new HealthDataForFrance();
        }
        return this._healthDataForFrance;
    }
    
    private _healthDataForNorway: HealthDataForNorway = null;
    public get healthDataForNorway(): HealthDataForNorway {
        if (this._healthDataForNorway == null)
        {
            this._healthDataForNorway = new HealthDataForNorway();
        }
        return this._healthDataForNorway;
    }
    



}

new Sample();
