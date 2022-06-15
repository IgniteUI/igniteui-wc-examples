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
    private series: IgcRangeAreaSeriesComponent

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var series = this.series = document.getElementById('series') as IgcRangeAreaSeriesComponent;

        this._bind = () => {
            xAxis.dataSource = this.temperatureRangeData
            series.xAxis = this.xAxis
            series.yAxis = this.yAxis
            series.dataSource = this.temperatureRangeData
            series.xAxis = this.xAxis
            series.yAxis = this.yAxis
            series.dataSource = this.temperatureRangeData
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
