import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcScatterLineSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { HealthDataForGermanyItem, HealthDataForGermany } from './HealthDataForGermany';
import { HealthDataForFranceItem, HealthDataForFrance } from './HealthDataForFrance';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private scatterLineSeries1: IgcScatterLineSeriesComponent
    private scatterLineSeries2: IgcScatterLineSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var scatterLineSeries1 = this.scatterLineSeries1 = document.getElementById('ScatterLineSeries1') as IgcScatterLineSeriesComponent;
        var scatterLineSeries2 = this.scatterLineSeries2 = document.getElementById('ScatterLineSeries2') as IgcScatterLineSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('dataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            scatterLineSeries1.xAxis = this.xAxis;
            scatterLineSeries1.yAxis = this.yAxis;
            scatterLineSeries1.dataSource = this.healthDataForGermany;
            scatterLineSeries2.xAxis = this.xAxis;
            scatterLineSeries2.yAxis = this.yAxis;
            scatterLineSeries2.dataSource = this.healthDataForFrance;
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

}

export function initialize() {
  return new Sample();
}