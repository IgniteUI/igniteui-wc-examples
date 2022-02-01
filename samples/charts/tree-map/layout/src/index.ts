import { DataItem, Data } from './SampleData';
import { IgcPropertyEditorModule } from 'igniteui-webcomponents-grids';
import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorDescriptionModule, TreemapDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorComponent } from 'igniteui-webcomponents-grids';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorModule,
    IgcTreemapModule
);

export class Sample {

    private propertyEditor1: IgcPropertyEditorComponent
    private treemap: IgcTreemapComponent

    constructor() {
        var propertyEditor1 = this.propertyEditor1 = document.getElementById('propertyEditor1') as IgcPropertyEditorComponent;
        var treemap = this.treemap = document.getElementById('treemap') as IgcTreemapComponent;

        propertyEditor1.componentRenderer = this.renderer
        propertyEditor1.target = this.treemap
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
    

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorDescriptionModule.register(context);
            TreemapDescriptionModule.register(context);
        }
        return this._componentRenderer
    }


}

new Sample();
