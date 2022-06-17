import { IgcDataChartCoreModule, IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcRangeAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { TemperatureRangeDataItem, TemperatureRangeData } from './TemperatureRangeData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private rangeAreaSeries1: IgcRangeAreaSeriesComponent
    private rangeAreaSeries2: IgcRangeAreaSeriesComponent

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var rangeAreaSeries1 = this.rangeAreaSeries1 = document.getElementById('RangeAreaSeries1') as IgcRangeAreaSeriesComponent;
        var rangeAreaSeries2 = this.rangeAreaSeries2 = document.getElementById('RangeAreaSeries2') as IgcRangeAreaSeriesComponent;

        this._bind = () => {
            xAxis.dataSource = this.temperatureRangeData
            rangeAreaSeries1.xAxis = this.xAxis
            rangeAreaSeries1.yAxis = this.yAxis
            rangeAreaSeries1.dataSource = this.temperatureRangeData
            rangeAreaSeries2.xAxis = this.xAxis
            rangeAreaSeries2.yAxis = this.yAxis
            rangeAreaSeries2.dataSource = this.temperatureRangeData
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
