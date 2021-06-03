import { DataItem, Data } from './SampleData';

import { IgcLegendModule, IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent, IgcDoughnutChartComponent, IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDoughnutChartModule
);

export class Sample {

    private legend: IgcItemLegendComponent
    private chart: IgcDoughnutChartComponent
    private series: IgcRingSeriesComponent

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcItemLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        var series = this.series = document.getElementById('series') as IgcRingSeriesComponent;

        series.dataSource = this.data
        series.legend = this.legend
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
