import { DataItem, Data } from './SampleData';

import { IgcItemLegendModule, IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent, IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcItemLegendModule,
    IgcPieChartModule
);

export class Sample {

    private itemLegend: IgcItemLegendComponent
    private chart: IgcPieChartComponent

    constructor() {
        var itemLegend = this.itemLegend = document.getElementById('ItemLegend') as IgcItemLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcPieChartComponent;

        chart.dataSource = this.data
        chart.legend = this.itemLegend
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
