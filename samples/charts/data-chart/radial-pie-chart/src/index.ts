import { DataItem, Data } from './SampleData';

import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialPieSeriesComponent } from 'igniteui-webcomponents-charts';
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
    private radialPieSeries1: IgcRadialPieSeriesComponent
    private radialPieSeries2: IgcRadialPieSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialPieSeries1 = this.radialPieSeries1 = document.getElementById('RadialPieSeries1') as IgcRadialPieSeriesComponent;
        var radialPieSeries2 = this.radialPieSeries2 = document.getElementById('RadialPieSeries2') as IgcRadialPieSeriesComponent;

        chart.legend = this.legend
        angleAxis.dataSource = this.data
        radialPieSeries1.angleAxis = this.angleAxis
        radialPieSeries1.valueAxis = this.radiusAxis
        radialPieSeries1.dataSource = this.data
        radialPieSeries2.dataSource = this.data
        radialPieSeries2.angleAxis = this.angleAxis
        radialPieSeries2.valueAxis = this.radiusAxis
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
