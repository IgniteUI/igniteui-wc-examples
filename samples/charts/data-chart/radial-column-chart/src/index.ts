import { DataItem, Data } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialColumnSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartInteractivityModule,
    IgcLegendModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcCategoryAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private radialColumnSeries1: IgcRadialColumnSeriesComponent
    private radialColumnSeries2: IgcRadialColumnSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialColumnSeries1 = this.radialColumnSeries1 = document.getElementById('RadialColumnSeries1') as IgcRadialColumnSeriesComponent;
        var radialColumnSeries2 = this.radialColumnSeries2 = document.getElementById('RadialColumnSeries2') as IgcRadialColumnSeriesComponent;

        chart.legend = this.legend
        angleAxis.dataSource = this.data
        radialColumnSeries1.angleAxis = this.angleAxis
        radialColumnSeries1.valueAxis = this.radiusAxis
        radialColumnSeries1.dataSource = this.data
        radialColumnSeries2.angleAxis = this.angleAxis
        radialColumnSeries2.valueAxis = this.radiusAxis
        radialColumnSeries2.dataSource = this.data
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
