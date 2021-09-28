import { DataItem, Data } from './SampleData';
import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialLineSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcCategoryAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private radialLineSeries1: IgcRadialLineSeriesComponent
    private radialLineSeries2: IgcRadialLineSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialLineSeries1 = this.radialLineSeries1 = document.getElementById('RadialLineSeries1') as IgcRadialLineSeriesComponent;
        var radialLineSeries2 = this.radialLineSeries2 = document.getElementById('RadialLineSeries2') as IgcRadialLineSeriesComponent;

        chart.legend = this.legend
        angleAxis.dataSource = this.data
        radialLineSeries1.angleAxis = this.angleAxis
        radialLineSeries1.valueAxis = this.radiusAxis
        radialLineSeries1.dataSource = this.data
        radialLineSeries2.dataSource = this.data
        radialLineSeries2.angleAxis = this.angleAxis
        radialLineSeries2.valueAxis = this.radiusAxis
    }

    private _data: Data = null;
    public get data(): Data {
        if (this._data == null)
        {
            this._data = new Data();
        }
        return this._data;
    }
    



}

new Sample();
