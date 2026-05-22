import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcRangeBarSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { TemperatureRangeDataItem, TemperatureRangeData } from './TemperatureRangeData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcLegendModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private rangeBarSeries1: IgcRangeBarSeriesComponent
    private rangeBarSeries2: IgcRangeBarSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var rangeBarSeries1 = this.rangeBarSeries1 = document.getElementById('RangeBarSeries1') as IgcRangeBarSeriesComponent;
        var rangeBarSeries2 = this.rangeBarSeries2 = document.getElementById('RangeBarSeries2') as IgcRangeBarSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('dataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            yAxis.dataSource = this.temperatureRangeData;
            rangeBarSeries1.xAxis = this.xAxis;
            rangeBarSeries1.yAxis = this.yAxis;
            rangeBarSeries1.dataSource = this.temperatureRangeData;
            rangeBarSeries2.xAxis = this.xAxis;
            rangeBarSeries2.yAxis = this.yAxis;
            rangeBarSeries2.dataSource = this.temperatureRangeData;
        }
        this._bind();

    }

    private _temperatureRangeData: TemperatureRangeData = null;
    public get temperatureRangeData(): TemperatureRangeData {
        if (this._temperatureRangeData == null)
        {
            this._temperatureRangeData = new TemperatureRangeData();
        }
        return this._temperatureRangeData;
    }

}

new Sample();
