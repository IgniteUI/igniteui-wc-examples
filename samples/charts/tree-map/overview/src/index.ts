import { DataItem, Data } from './SampleData';
import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcTreemapModule
);

export class Sample {

    private treemap: IgcTreemapComponent

    constructor() {
        var treemap = this.treemap = document.getElementById('treemap') as IgcTreemapComponent;

        treemap.dataSource = this.data
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
