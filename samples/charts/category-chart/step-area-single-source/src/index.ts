import { DataItem, Data } from './SampleData';

import { IgcCategoryChartModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcCategoryChartModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private chart: IgcCategoryChartComponent

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        chart.dataSource = this.data
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
