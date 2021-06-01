import { DataEuropeItem, DataEurope, DataAfricaItem, DataAfrica } from './SampleData';

import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private bubbleSeries2: IgcBubbleSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;
        var bubbleSeries2 = this.bubbleSeries2 = document.getElementById('BubbleSeries2') as IgcBubbleSeriesComponent;

        chart.legend = this.legend
        bubbleSeries1.xAxis = this.xAxis
        bubbleSeries1.yAxis = this.yAxis
        bubbleSeries1.dataSource = this.dataAfrica
        bubbleSeries2.xAxis = this.xAxis
        bubbleSeries2.yAxis = this.yAxis
        bubbleSeries2.dataSource = this.dataEurope
   }

    private _dataEurope: DataEurope = null;
    public get dataEurope(): DataEurope {
        if (this._dataEurope == null)
        {
            this._dataEurope = new DataEurope();
        }
        return this._dataEurope;
    }
    
    private _dataAfrica: DataAfrica = null;
    public get dataAfrica(): DataAfrica {
        if (this._dataAfrica == null)
        {
            this._dataAfrica = new DataAfrica();
        }
        return this._dataAfrica;
    }
    
}

new Sample();
