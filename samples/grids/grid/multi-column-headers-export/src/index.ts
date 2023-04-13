import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcWebGridModule, IgcWebGridToolbarModule } from 'igniteui-webcomponents-grids';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule, WebGridToolbarDescriptionModule } from 'igniteui-webcomponents-core';
//insert bindingImports
//end bindingImports

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcWebGridModule,
    IgcWebGridToolbarModule
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
            WebGridDescriptionModule.register(context);
            WebGridToolbarDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
