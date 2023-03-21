import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';
import { CountyHierarchicalDataItem, CountyHierarchicalData } from './CountyHierarchicalData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcTreemapModule
);

export class Sample {

    private treemap: IgcTreemapComponent
    private _bind: () => void;

    constructor() {
        var treemap = this.treemap = document.getElementById('treemap') as IgcTreemapComponent;

        this._bind = () => {
            treemap.dataSource = this.countyHierarchicalData
        }
        this._bind();

    }

    private _countyHierarchicalData: CountyHierarchicalData = null;
    public get countyHierarchicalData(): CountyHierarchicalData {
        if (this._countyHierarchicalData == null)
        {
            this._countyHierarchicalData = new CountyHierarchicalData();
        }
        return this._countyHierarchicalData;
    }

}

new Sample();
