import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcRangeColumnSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { TemperatureRangeDataItem, TemperatureRangeData } from './TemperatureRangeData';

import { ModuleManager } from 'igniteui-webcomponents-core';

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
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private rangeColumnSeries1: IgcRangeColumnSeriesComponent
    private rangeColumnSeries2: IgcRangeColumnSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var rangeColumnSeries1 = this.rangeColumnSeries1 = document.getElementById('RangeColumnSeries1') as IgcRangeColumnSeriesComponent;
        var rangeColumnSeries2 = this.rangeColumnSeries2 = document.getElementById('RangeColumnSeries2') as IgcRangeColumnSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            xAxis.dataSource = this.temperatureRangeData;
            rangeColumnSeries1.xAxis = this.xAxis;
            rangeColumnSeries1.yAxis = this.yAxis;
            rangeColumnSeries1.dataSource = this.temperatureRangeData;
            rangeColumnSeries2.xAxis = this.xAxis;
            rangeColumnSeries2.yAxis = this.yAxis;
            rangeColumnSeries2.dataSource = this.temperatureRangeData;
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
