import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, TreemapDescriptionModule } from 'igniteui-webcomponents-core';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcTreemapModule
);

export class Sample {

    //insert bindingFields
    //end bindingFields

    constructor() {
        //insert bindingInit
        //end bindingInit

    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            TreemapDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
