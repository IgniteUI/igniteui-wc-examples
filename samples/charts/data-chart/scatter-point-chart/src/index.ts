import { DataEuropeItem, DataEurope, DataAfricaItem, DataAfrica } from './SampleData';
import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcScatterSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private scatterSeries1: IgcScatterSeriesComponent
    private scatterSeries2: IgcScatterSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var scatterSeries1 = this.scatterSeries1 = document.getElementById('ScatterSeries1') as IgcScatterSeriesComponent;
        var scatterSeries2 = this.scatterSeries2 = document.getElementById('ScatterSeries2') as IgcScatterSeriesComponent;

        chart.legend = this.legend
        scatterSeries1.xAxis = this.xAxis
        scatterSeries1.yAxis = this.yAxis
        scatterSeries1.dataSource = this.dataEurope
        scatterSeries2.xAxis = this.xAxis
        scatterSeries2.yAxis = this.yAxis
        scatterSeries2.dataSource = this.dataAfrica
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
