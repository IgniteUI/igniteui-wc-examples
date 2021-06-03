import { DataItem, Data } from './SampleData';

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorModule } from 'igniteui-webcomponents-grids';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcCategoryChartModule,
    IgcPropertyEditorModule
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
