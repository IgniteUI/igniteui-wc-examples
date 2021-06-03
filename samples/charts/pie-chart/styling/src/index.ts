import { DataItem, Data } from './SampleData';

import { IgcPieChartModule, IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent, IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPieChartModule,
    IgcItemLegendModule
);

export class Sample {

    private legend: IgcItemLegendComponent
    private chart: IgcPieChartComponent

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcItemLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcPieChartComponent;

        chart.dataSource = this.data
        chart.legend = this.legend
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
