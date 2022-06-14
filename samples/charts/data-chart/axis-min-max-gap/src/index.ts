import { IgcDataChartCategoryModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcCategoryHighlightLayerComponent, IgcColumnSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { TemperatureAverageDataItem, TemperatureAverageData } from './TemperatureAverageData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private categoryHighlightLayer: IgcCategoryHighlightLayerComponent
    private columnSeries1: IgcColumnSeriesComponent
    private tooltips: IgcDataToolTipLayerComponent

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var categoryHighlightLayer = this.categoryHighlightLayer = document.getElementById('CategoryHighlightLayer') as IgcCategoryHighlightLayerComponent;
        var columnSeries1 = this.columnSeries1 = document.getElementById('columnSeries1') as IgcColumnSeriesComponent;
        var tooltips = this.tooltips = document.getElementById('Tooltips') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            xAxis.dataSource = this.temperatureAverageData
            columnSeries1.xAxis = this.xAxis
            columnSeries1.yAxis = this.yAxis
            columnSeries1.dataSource = this.temperatureAverageData
        }
        this._bind();
    }

    private _temperatureAverageData: TemperatureAverageData = null;
    public get temperatureAverageData(): TemperatureAverageData {
        if (this._temperatureAverageData == null)
        {
            this._temperatureAverageData = new TemperatureAverageData();
        }
        return this._temperatureAverageData;
    }
    



}

new Sample();
