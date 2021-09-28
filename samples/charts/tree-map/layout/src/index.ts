import { DataItem, Data } from './SampleData';
import { IgcPropertyEditorModule } from 'igniteui-webcomponents-grids';
import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorDescriptionModule, TreemapDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-grids';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorModule,
    IgcTreemapModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorComponent
    private propertyEditorPropertyDescription: IgcPropertyEditorPropertyDescriptionComponent
    private treemap: IgcTreemapComponent

    constructor() {
        var propertyEditor = this.propertyEditor = document.querySelector('igc-property-editor') as IgcPropertyEditorComponent;
        var treemap = this.treemap = document.getElementById('treemap') as IgcTreemapComponent;

        propertyEditor.componentRenderer = this.renderer
        propertyEditor.target = this.treemap
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
