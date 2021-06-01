import { SampleData } from './SampleData';

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

    public data: any[] = SampleData.create();

}

new Sample();
